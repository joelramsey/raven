/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SourcesListComponent } from './sources-list.component';

describe('SourcesListComponent', () => {
  let component: SourcesListComponent;
  let fixture: ComponentFixture<SourcesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourcesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourcesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
