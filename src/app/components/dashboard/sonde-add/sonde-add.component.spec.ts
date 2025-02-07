import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SondeAddComponent } from './sonde-add.component';

describe('SondeAddComponent', () => {
  let component: SondeAddComponent;
  let fixture: ComponentFixture<SondeAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SondeAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SondeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
