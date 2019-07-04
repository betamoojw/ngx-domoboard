import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { SwPush } from '@angular/service-worker';

import { Temp, Switch, DomoticzSettings } from '@nd/core/models';
import { Api } from '@nd/core/enums/api.enum';
import { PushNotificationsService } from '@nd/core/services/push-notifications.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'nd-notifications',
  template: `
    <div class="notifs-container">
      <span class="title">{{ title }}</span>
      <div *ngIf="(isSubscribed$ | async) as isSubscribed" class="btn-container">
        <button nbButton status="primary" (click)="onSubscribeClick(isSubscribed)">
          {{ !isSubscribed ? 'Subscribe' : 'Unsubscribe' }}
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./push-notifications.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PushNotificationsComponent {

  @Input() device: Switch;

  @Input() settings: DomoticzSettings;

  isSubscribed$ = this.service.isSubscribed();

  title = 'PUSH NOTIFICATIONS:';

  readonly VAPID_PUBLIC_KEY = 'BG-zibiw-dk6bhrbwLMicGYXna-WwoNqsF8FLKdDUzqhOKvfrH3jYG-UnaYNss45AMDqfJC_GgskDpx8lycjQ0Y';

  constructor(
    private swPush: SwPush,
    private service: PushNotificationsService
  ) { }

  onSubscribeClick(isSubscribed: boolean) {
    if (!isSubscribed) {
      this.swPush.requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY
      })
      .then(sub => {
        const payload = {
          device: this.device,
          statusUrl: `${this.settings.ssl ? 'https' : 'http'}://` +
            `${this.settings.domain}:${this.settings.port}/${Api.device.replace('{idx}', this.device.idx)}`,
          sub: sub
        };
        this.service.subscribeToNotifications(payload).pipe(take(1)).subscribe();
      })
      .catch(err => console.error('Could not subscribe to notifications', err));
    } else {
      this.service.stopSubscription().pipe(take(1)).subscribe();
    }
  }

}
