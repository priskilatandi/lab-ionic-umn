import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoverDetailPage } from './discover-detail.page';

describe('DiscoverDetailPage', () => {
  let component: DiscoverDetailPage;
  let fixture: ComponentFixture<DiscoverDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscoverDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscoverDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
