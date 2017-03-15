import { Component, OnInit, Input, style, transition, trigger, animate, state } from '@angular/core';

@Component({
  selector: 'rvn-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
  animations: [
    trigger('contentState', [
      transition('void => *', [
        style({
          height: 0,
          opacity: 0
        }),
        animate('150ms ease-in'),
      ]),
      transition('* => void', animate('150ms ease-out', style({
        height: 0,
        opacity: 0
      })))
    ]),
    trigger('expandedState', [
      state('expanded', style({
        transform: 'rotate(90deg)'
      })),
      state('collapsed',   style({
        transform: 'rotate(0deg)'
      })),
      transition('expanded => collapsed', animate('100ms ease-in')),
      transition('collapsed => expanded', animate('100ms ease-out'))
    ])
  ]
})
export class AccordionComponent implements OnInit {

  public Positions = {
    BEFORE: 'before',
    AFTER: 'after'
  };

  @Input() title: string;
  @Input() maxContentHeight: string;
  @Input() minContentHeight: string;
  @Input() iconPosition: string = this.Positions.BEFORE;
  @Input() visible = false;


  constructor() { }

  public ngOnInit() {
  }

  public toggle() {
    this.visible = !this.visible;
  }

  get expandedState() {
    return this.visible ? 'expanded' : 'collapsed';
  }

  get titleClass() {
    return 'accordion-title ' + this.iconPosition;
  }
}
