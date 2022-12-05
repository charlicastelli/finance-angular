import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoFinanceComponent } from './info-finance.component';

describe('InfoFinanceComponent', () => {
  let component: InfoFinanceComponent;
  let fixture: ComponentFixture<InfoFinanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoFinanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
