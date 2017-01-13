import { Injectable } from '@angular/core';

function getWindow(): any {
  return window;
}

function getDocument(): any {
  return document;
}

@Injectable()
export class WindowRefService {

  constructor() { }
  
  get nativeWindow(): any {
    return getWindow();
  }
  
  get nativeDocument(): any {
    return getDocument();
  }

}
