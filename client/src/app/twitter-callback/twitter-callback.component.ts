import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/Observable";
import { Http, Headers } from '@angular/http';

@Component({
  selector: 'rvn-twitter-callback',
  templateUrl: './twitter-callback.component.html',
  styleUrls: ['./twitter-callback.component.scss']
})
export class TwitterCallbackComponent implements OnInit {

  constructor(private http: Http) { }

  ngOnInit() {

    let current_url: string = location.toString();

    let data: any = {
      currentUrl: location.toString(),
      requestToken: localStorage.getItem('twRequestToken'),
      requestSecret: localStorage.getItem('twRequestSecret'),
    };

    let body = JSON.stringify(data);

    let headers = new Headers({ 'Content-Type': 'application/json' });

    let url = '/api/auth/twitter';

    // set here correct url in production for sending info to back end
    return this.http.post('http://localhost:3000' + url, body, { headers: headers })
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'))
      .subscribe(
        data => this.setLocalItems(data),
        error => console.log(error)
      );

  }

  setLocalItems(data){
    localStorage.setItem('accessToken', data['data']['access-token']);
    localStorage.setItem('client', data['data']['client']);
    localStorage.setItem('expiry', data['data']['expiry']);
    localStorage.setItem('tokenType', data['data']['token-type']);
    localStorage.setItem('uid', data['data']['uid']);
    window.opener.location.reload();
    window.close();
  }


}

}
