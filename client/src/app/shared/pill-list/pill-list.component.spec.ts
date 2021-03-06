/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PillListComponent } from './pill-list.component';

describe('PillListComponent', () => {
  let component: PillListComponent;
  let fixture: ComponentFixture<PillListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PillListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PillListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
