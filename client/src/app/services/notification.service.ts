import { Injectable } from '@angular/core';
import { NotifierNotificationOptions } from 'angular-notifier/lib/models/notifier-notification.model';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notificationOptions: NotifierNotificationOptions = {
    type: 'success',
    message: 'New product added successful'
  };

  constructor(
    private notifierService: NotifierService) { }

  success(text: string){
    this.notificationOptions = { type: 'success', message: text };
    this.notifierService.show(this.notificationOptions);
  }

  error(text: string){
    this.notificationOptions = { type: 'error', message: text };
    this.notifierService.show(this.notificationOptions);
  }

  warning(text: string){
    this.notificationOptions = { type: 'warning', message: text };
    this.notifierService.show(this.notificationOptions);
  }
  
  info(text: string){
    this.notificationOptions = { type: 'info', message: text };
    this.notifierService.show(this.notificationOptions);
  }
}
