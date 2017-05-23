import {
  Component, OnInit, EventEmitter, transition, animate, style,
  state, trigger, Output
} from '@angular/core';

import { MdDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { RegisterDialogComponent } from '../../register/register-dialog.component';


@Component({
  selector: 'rvn-landing',
  templateUrl: 'landing.component.html',
  styleUrls: ['landing.component.scss'],
  animations: [
    trigger('animateCarousel', [
      state('in', style({opacity: 1})),
      transition(':enter', [
        style({opacity: 0}),
        animate('400ms 400ms')
      ]),
      transition(':leave', [
        animate(400, style({opacity: 0}))
      ])
    ])
  ]
})
export class LandingComponent implements OnInit {

  @Output() registered: EventEmitter<any> = new EventEmitter<any>();

  currentCarouselSlide = 0;
  carouselSlideTimeout = 1000 * 3; // 6 seconds

  carouselTextList = [
    "DISCOVER source material with dynamic and constantly adaptive searches.",
    "EVALUATE source material quickly with interactive displays.",
    "UNDERSTAND source material with powerful visualizations.",
    "DETERMINE new or PROVE existing conclusions from source material.",
    "RAVEN SCHOLAR: UNLIKE ANYTHING YOU'VE EVER SEEN"
  ];

  constructor(private _dialog: MdDialog) {
  }

  ngOnInit() {

    // Trigger carousel rotation
    //
    Observable
      .interval(this.carouselSlideTimeout)
      .subscribe(() => {

        // Check if current carousel is subject to incrementing. If not, reset.
        //
        if (this.currentCarouselSlide + 1 < this.carouselTextList.length) {
          this.currentCarouselSlide += 1;
        } else {
          this.currentCarouselSlide = 0;
        }
      });
  }

  public register() {
    this._dialog.open(RegisterDialogComponent)
      .afterClosed()
      .subscribe(success => {
        if (success) {
          this.registered.emit();
        }
      });
  }
}
