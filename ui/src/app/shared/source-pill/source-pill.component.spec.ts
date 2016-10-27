/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SourcePillComponent } from './source-pill.component';

describe('SourcePillComponent', () => {
  let component: SourcePillComponent;
  let fixture: ComponentFixture<SourcePillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourcePillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourcePillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
