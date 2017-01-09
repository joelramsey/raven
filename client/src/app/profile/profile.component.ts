import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';

import { UserDetails } from '../shared/models/index';
import { UserDaoService, ObservableResultHandlerService } from '../shared/services/index';

@Component({
  selector: 'rvn-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  /**
   * Current user. Initializes to empty.
   */
  user:UserDetails = null;
  

  constructor(private _userDao: UserDaoService,
              private _errorHandler: ObservableResultHandlerService) {
  }

  ngOnInit() {
    this._userDao.getUser().subscribe(
      user => this.user = user,
      (error: any) => {
        this._errorHandler.failure(error);
      }
    );
  }
}
