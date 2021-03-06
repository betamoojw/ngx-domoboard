import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, UrlSegment } from '@angular/router';

import { Observable, Subject, zip } from 'rxjs';
import {
  takeUntil,
  finalize,
  take,
  tap,
  mergeMap,
  map,
  withLatestFrom
} from 'rxjs/operators';

import {
  DeviceOptionsService,
  DBService,
  PushSubscriptionService,
  DeviceIconService
} from '@nd/core/services';
import {
  Temp,
  Switch,
  DomoticzSettings,
  DomoticzColor,
  DomoticzResponse
} from '@nd/core/models';

import { environment } from 'environments/environment';

const isSwitch = (device: any): device is Switch =>
  device.SwitchType !== undefined;

const isTemp = (device: any): device is Temp => device.Temp !== undefined;

const noColor: DomoticzColor = {
  m: null,
  t: null,
  r: null,
  g: null,
  b: null,
  cw: null,
  ww: null
};

@Component({
  selector: 'nd-device-options',
  template: `
    <div
      *ngIf="device$ | async as device"
      class="options-container {{ appearanceState }}"
    >
      <div class="options--header-container">
        <div
          *ngIf="device.BatteryLevel !== 255"
          class="options--header-battery"
        >
          <nb-icon
            class="options--header-icons"
            icon="battery-outline"
          ></nb-icon>
          <span class="options--battery-level"
            >{{ device.BatteryLevel }} %</span
          >
        </div>
        <nb-icon
          class="options--header-icons options--header-close"
          icon="close-outline"
          (click)="onCloseClick()"
        >
        </nb-icon>
      </div>
      <div class="small-blocks">
        <nd-name
          [device]="device"
          [loading]="renameLoading"
          (nameClick)="onRenameClick($event)"
          class="col-xxxl-3 col-md-6 small-block"
        >
        </nd-name>

        <nd-device-icon
          [idx]="device.idx"
          [deviceIcon]="deviceIcon$ | async"
          (saveIconClick)="onSaveIconClick($event)"
          [loading]="iconLoading"
          class="col-xxxl-3 col-md-6 small-block"
        >
        </nd-device-icon>

        <nd-notifications
          *ngIf="notificationsSupport"
          [device]="device"
          [settings]="settings$ | async"
          (subscribeClick)="onSubscribeClick($event)"
          [isSubscribed]="isSubscribed$ | async"
          [loading]="pushLoading"
          class="col-xxxl-3 col-md-6 small-block"
        >
        </nd-notifications>

        <nd-dim-level
          *ngIf="(isDimmer$ | async) && device.Type !== 'Color Switch'"
          [device]="device"
          (levelSet)="onLevelSet($event)"
          class="col-xxxl-3 col-md-6 small-block"
        >
        </nd-dim-level>
      </div>

      <div class="big-blocks">
        <nd-color-picker
          *ngIf="device.Type === 'Color Switch'"
          [color]="color$ | async"
          [level]="level$ | async"
          (colorSet)="onColorSet(device.idx, $event)"
        >
        </nd-color-picker>

        <nd-history [device]="device"></nd-history>
      </div>
    </div>
  `,
  styleUrls: ['./device-options.component.scss']
})
export class DeviceOptionsComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();

  device$: Observable<Temp | Switch> = this.service.select<Temp | Switch>(
    'device'
  );

  color$: Observable<DomoticzColor> = this.service
    .select<string>('device', 'Color')
    .pipe(map((color: string) => (color ? JSON.parse(color) : noColor)));

  settings$ = this.dbService.select<DomoticzSettings>('settings');

  isSubscribed$: Observable<boolean> = this.dbService
    .select<any[]>('monitoredDevices')
    .pipe(
      withLatestFrom(this.device$),
      map(([monitoredDevices, device]) => {
        return !!monitoredDevices.find(dev => dev.idx === device.idx);
      })
    );

  deviceIcon$ = this.dbService.select<any[]>('deviceIcons').pipe(
    withLatestFrom(this.device$),
    map(([deviceIcons, device]) => {
      const record = deviceIcons.find(di => di.idx === device.idx);
      return record ? record.deviceIcon : '';
    })
  );

  renameLoading: boolean;

  pushLoading: boolean;

  iconLoading: boolean;

  notificationsSupport: boolean;

  appearanceState = 'appear';

  previousUrl: UrlSegment[] = this.router.getCurrentNavigation().extras.state
    .previousUrl;

  get isTemp$(): Observable<boolean> {
    return this.device$.pipe(map(device => isTemp(device)));
  }

  get isDimmer$(): Observable<boolean> {
    return this.device$.pipe(
      map(device => isSwitch(device) && device.SwitchType === 'Dimmer')
    );
  }

  get level$(): Observable<number> {
    return this.device$.pipe(map(device => isSwitch(device) && device.Level));
  }

  constructor(
    private service: DeviceOptionsService,
    private pushService: PushSubscriptionService,
    private dbService: DBService,
    private router: Router,
    private iconService: DeviceIconService
  ) {}

  ngOnInit() {
    this.device$
      .pipe(
        tap(device => {
          this.notificationsSupport =
            'Notification' in window &&
            isSwitch(device) &&
            (!environment.production || location.protocol === 'https:');
        }),
        take(1),
        takeUntil(this.unsubscribe$)
      )
      .subscribe();
  }

  onCloseClick() {
    this.appearanceState = 'disappear';
    this.router.navigate([`devices/${this.previousUrl[0].path}`]);
  }

  onRenameClick(device: Temp | Switch) {
    this.renameLoading = true;
    this.service
      .renameDevice(device.idx, device.Name)
      .pipe(
        take(1),
        finalize(() => (this.renameLoading = false)),
        takeUntil(this.unsubscribe$)
      )
      .subscribe();
  }

  async onSaveIconClick(event: any) {
    try {
      this.iconLoading = true;
      let msg: string;
      if (event.evaIcon) {
        msg = await this.iconService.addDeviceIcon(event.idx, event.evaIcon);
      } else {
        msg = await this.iconService.deleteDeviceIcon(event.idx);
      }
      console.log('😃 ' + msg);
      setTimeout(() => (this.iconLoading = false), 500);
    } catch (error) {
      console.error('⛔️ Could not save device icon', error);
    }
  }

  onSubscribeClick(event: any) {
    this.pushLoading = true;
    if (!event.isSubscribed) {
      try {
        this.pushService
          .subscribeToNotifications(event.device)
          .pipe(
            take(1),
            takeUntil(this.unsubscribe$),
            finalize(() => (this.pushLoading = false))
          )
          .subscribe();
      } catch (error) {
        console.error('🚫 Could not subscribe to notifications', error);
      }
    } else {
      this.pushService
        .stopSubscription(event.device)
        .pipe(
          take(1),
          finalize(() => (this.pushLoading = false)),
          takeUntil(this.unsubscribe$)
        )
        .subscribe();
    }
  }

  onLevelSet(device: Switch) {
    this.service
      .setDimLevel(device.idx, device.Level)
      .pipe(take(1), takeUntil(this.unsubscribe$))
      .subscribe();
  }

  onColorSet(idx: string, event: DomoticzColor) {
    this.service
      .setColorBrightness(idx, event)
      .pipe(
        tap((resp: DomoticzResponse<Switch>) => {
          if (resp.status === 'OK') {
            this.service.syncColor(event);
          }
        }),
        take(1),
        takeUntil(this.unsubscribe$)
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.service.clearStore();
  }
}
