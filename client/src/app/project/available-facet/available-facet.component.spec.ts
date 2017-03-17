import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableFacetComponent } from './available-facet.component';

describe('AvailableFacetComponent', () => {
  let component: AvailableFacetComponent;
  let fixture: ComponentFixture<AvailableFacetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailableFacetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableFacetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
