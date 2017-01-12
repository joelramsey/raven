/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EntityCardComponent } from './entity-card.component';

describe('EntityCardComponent', () => {
  let component: EntityCardComponent;
  let fixture: ComponentFixture<EntityCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
