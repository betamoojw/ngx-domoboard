import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, tap, pluck, map } from 'rxjs/operators';

import { DataService } from './data.service';
import { DBService } from './db.service';

import { DomoticzResponse, Switch, Temp } from '@nd/core/models';
import { Api } from '@nd/core/enums/api.enum';
import { environment } from 'environments/environment';

interface State<T> {
  device: T;
  isSubscribed: boolean;
}

const pushApi = {
  server: environment.pushServer,
  monitor: '/monitor-device',
  stop: '/stop-monitoring',
  isMonitoring: '/is-monitoring'
};

const isSwitch = (device: any): device is Switch => device.SwitchType !== undefined;
const isTemp = (device: any): device is Temp =>
  device.Temp !== undefined || device.Humidity !== undefined;

@Injectable({providedIn: 'root'})
export class DeviceOptionsService<T> extends DataService {

  initialState: State<T> = {
    device: {} as T,
    isSubscribed: false
  };

  private subject = new BehaviorSubject<State<T>>(this.initialState);
  store = this.subject.asObservable().pipe(
    distinctUntilChanged((x, y) => JSON.stringify(x) === JSON.stringify(y))
  );

  constructor(
    httpClient: HttpClient,
    dbService: DBService
  ) {
    super(httpClient, dbService);
  }

  select<T1>(...name: string[]): Observable<T1> {
    return this.store.pipe(pluck(...name));
  }

  getDevice(idx: string): Observable<DomoticzResponse<T>> {
    return this.get<DomoticzResponse<T>>(Api.device.replace('{idx}', idx)).pipe(
      tap((resp: DomoticzResponse<T>) => !!resp ? this.subject.next({
        ...this.subject.value, device: resp.result[0]
      }) : this.clearStore())
    );
  }

  renameDevice(idx: string, name: string): Observable<DomoticzResponse<any>> {
    return this.get<DomoticzResponse<any>>(Api.renameDevice.replace('{idx}', idx).replace('{name}', name));
  }

  isSubscribed(idx: string, pushEndpoint: string): Observable<any> {
    const device = this.subject.value.device;
    return this.httpClient.post<boolean>(`${pushApi.server}${pushApi.isMonitoring}`,
      {
        idx: idx,
        pushEndpoint: pushEndpoint
      }
      ).pipe(
        tap((resp: any) => {
          if (resp.status === 'OK') {
            this.syncIsSubscribed(resp.isMonitoring);
          }
        })
      );
  }

  subscribeToNotifications(payload: any): Observable<any> {
    return this.httpClient.post(`${pushApi.server}${pushApi.monitor}`, payload).pipe(
      tap((resp: any) => {
        if (resp.status === 'OK') {
          this.syncIsSubscribed(true);
        }
      })
    );
  }

  stopSubscription(idx: string, pushEndpoint: string): Observable<any> {
    return this.httpClient.post<boolean>(`${pushApi.server}${pushApi.stop}`, {
      idx: idx,
      pushEndpoint: pushEndpoint
    }).pipe(
      tap((resp: any) => {
        if (resp.status === 'OK') {
          this.syncIsSubscribed(false);
        }
      })
    );
  }

  syncIsSubscribed(isSubscribed: boolean) {
    this.subject.next({
      ...this.subject.value, isSubscribed: isSubscribed
    });
  }

  clearStore() {
    this.subject.next(this.initialState);
  }

}
