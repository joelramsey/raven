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
              private _observableResultHandler: ObservableResultHandlerService) {
  }

  ngOnInit() {
    this._userDao.getUser().subscribe(
      user => this.user = user,
      (error: any) => {
        this._observableResultHandler.failure(error);
      }
    );
  }

  save() {
    this._userDao.updateUser(this.user).subscribe((user: UserDetails) => {
      this._observableResultHandler.success('User profile updated.');
    }, (error: any) => {
      this._observableResultHandler.failure(error);
    });
  }

  /**
   * Gets a display name for a user; based on first
   * name, but defaults to e-mail if no first name
   * exists.
   *
   * @returns {string}
   */
  get displayName() {

    if (this.user) {
      let displayName = this.user.firstName || this.user.uid;

      if (!displayName) {
        return '';
      }

      // If it ends in 's', only add apostrophe
      //
      if (displayName.lastIndexOf('s') === displayName.length - 1) {
        displayName += '\'';
      } else {
        displayName += '\'s';
      }

      return displayName;
    } else {
      return '';
    }
  }
}
