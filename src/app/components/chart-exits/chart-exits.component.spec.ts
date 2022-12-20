import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartExitsComponent } from './chart-exits.component';

describe('ChartExitsComponent', () => {
  let component: ChartExitsComponent;
  let fixture: ComponentFixture<ChartExitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartExitsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartExitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
