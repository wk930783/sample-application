import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftSidenavComponent } from './left-sidenav.component';

describe('LeftSidenavComponent', () => {
  let component: LeftSidenavComponent;
  let fixture: ComponentFixture<LeftSidenavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeftSidenavComponent]
    });
    fixture = TestBed.createComponent(LeftSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
