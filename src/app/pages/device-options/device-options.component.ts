import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { SwPush } from '@angular/service-worker';

import { Observable, Subject, merge, combineLatest, zip } from 'rxjs';
import { takeUntil, finalize, take, concatMap, tap, switchMap, withLatestFrom } from 'rxjs/operators';

import { DeviceOptionsService, DBService } from '@nd/core/services';
import { Temp, Switch, DomoticzSettings } from '@nd/core/models';
import { Api } from '@nd/core/enums/api.enum';

@Component({
  selector: 'nd-device-options',
  template: `
    <div *ngIf="(device$ | async) as device" class="options-container">
      <nb-icon class="close-icon" icon="close-outline"
        (click)="onCloseClick()">
      </nb-icon>
      <nd-name [device]="device$ | async" [loading]="renameLoading"
        (nameClick)="onRenameClick($event)">
      </nd-name>
      <nd-notifications [device]="device$ | async" [settings]="settings$ | async"
        [isSubscribed]="isSubscribed$ | async" (subscribeClick)="onSubscribeClick($event)"
        [pushEndpoint]="pushEndpoint$ | async">
      </nd-notifications>
    </div>
  `,
  styleUrls: ['./device-options.component.scss']
})
export class DeviceOptionsComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject();

  device$: Observable<Temp | Switch> = this.service.select<Temp | Switch>('device');

  isSubscribed$: Observable<boolean> = this.service.select<boolean>('isSubscribed');

  settings$ = this.dbService.select<DomoticzSettings>('settings');

  pushEndpoint$ = this.dbService.select<string>('pushEndpoint');

  renameLoading: boolean;

  readonly VAPID_PUBLIC_KEY = 'BG-zibiw-dk6bhrbwLMicGYXna-WwoNqsF8FLKdDUzqhOKvfrH3jYG-UnaYNss45AMDqfJC_GgskDpx8lycjQ0Y';

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private service: DeviceOptionsService<Temp | Switch>,
    private dbService: DBService,
    private swPush: SwPush
  ) { }

  ngOnInit() {
    this.dbService.syncPushSub(null);
    zip(
      this.route.paramMap,
      this.pushEndpoint$
    ).pipe(
      switchMap(([params, pushEndpoint]) => {
        return merge(
          this.service.getDevice(params.get('idx')),
          this.service.isSubscribed(params.get('idx'), pushEndpoint)
        );
      }),
      take(2)
    ).subscribe();
  }

  onCloseClick() {
    this.location.back();
  }

  onRenameClick(device: Temp | Switch) {
    this.renameLoading = true;
    this.service.renameDevice(device.idx, device.Name).pipe(
      take(1),
      finalize(() => this.renameLoading = false),
      takeUntil(this.unsubscribe$)
    ).subscribe();
  }

  async onSubscribeClick(event: any) {
    if (!event.isSubscribed) {
      try {
        const pushSub: PushSubscription =
          await this.swPush.requestSubscription({ serverPublicKey: this.VAPID_PUBLIC_KEY });
        const payload = {
          device: event.device,
          statusUrl: `${event.settings.ssl ? 'https' : 'http'}://` +
            `${event.settings.domain}:${event.settings.port}/${Api.device.replace('{idx}', event.device.idx)}`,
          sub: pushSub
        };
        this.service.subscribeToNotifications(payload).pipe(take(1)).subscribe();
        try {
          const msg = await this.dbService.addPushSub(pushSub.endpoint);
          this.dbService.syncPushSub(pushSub.endpoint);
          console.log(msg);
        } catch (error) {
          this.dbService.syncPushSub(null);
          console.log(error);
        }
      } catch (error) {
        console.error('Could not subscribe to notifications', error);
      }
    } else {
      this.service.stopSubscription(event.device.idx, event.pushEndpoint).pipe(take(1)).subscribe();
    }
  }

  ngOnDestroy() {
    this.service.clearStore();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
