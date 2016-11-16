import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

@Component({
  selector: 'rvn-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  public showMessage: boolean = false;
  
  constructor() { }

  ngOnInit() {
    Observable.of(true).delay(1000).subscribe((value) => this.showMessage = value);
  }

}
