import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SondeAddSensorComponent } from './sonde-add-sensor.component';

describe('SondeAddSensorComponent', () => {
  let component: SondeAddSensorComponent;
  let fixture: ComponentFixture<SondeAddSensorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SondeAddSensorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SondeAddSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
