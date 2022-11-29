import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAppetizerComponent } from './app-appetizer.component';

describe('AppAppetizerComponent', () => {
  let component: AppAppetizerComponent;
  let fixture: ComponentFixture<AppAppetizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppAppetizerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppAppetizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
