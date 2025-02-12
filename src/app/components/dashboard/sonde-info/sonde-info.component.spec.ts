import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SondeInfoComponent } from './sonde-info.component';

describe('SondeInfoComponent', () => {
  let component: SondeInfoComponent;
  let fixture: ComponentFixture<SondeInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SondeInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SondeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
