import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { NotificationsService } from 'angular2-notifications/components';

@Injectable()
export class ObservableResultHandlerService {

  constructor(private _notificationService: NotificationsService) { }
  
  public success(response: any) {
    if (response instanceof Response) {
      try {
        this._notificationService.success('Success', response.json())
      } catch (e) {
        this._notificationService.success('Success', response.text())
      }
    } else {
      this._notificationService.success('Success', response)
    }
  }
  
  public failure(response: any) {
    if (response instanceof Response) {
      try {
        this._notificationService.success('Error', response.json())
      } catch (e) {
        this._notificationService.success('Error', response.text())
      }
    } else {
      this._notificationService.success('Error', response)
    }
    
  }
}
