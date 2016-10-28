import { EventEmitter } from '@angular/core';
import { Source } from '../models/source.interface';

export class AbstractNewSourceComponent {

  public created:EventEmitter<Source> = new EventEmitter<Source>();
  public done:EventEmitter<boolean> = new EventEmitter<boolean>();
  public cancelled:EventEmitter<any> = new EventEmitter<any>();

  sources:Array<Source> = [];
}
