import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppExitsComponent } from './app-exits.component';

describe('AppExitsComponent', () => {
  let component: AppExitsComponent;
  let fixture: ComponentFixture<AppExitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppExitsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppExitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
