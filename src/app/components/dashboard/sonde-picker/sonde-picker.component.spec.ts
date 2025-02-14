import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SondePickerComponent } from './sonde-picker.component';

describe('SondePickerComponent', () => {
  let component: SondePickerComponent;
  let fixture: ComponentFixture<SondePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SondePickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SondePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
