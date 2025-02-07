import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteMetadataComponent } from './site-metadata.component';

describe('SiteMetadataComponent', () => {
  let component: SiteMetadataComponent;
  let fixture: ComponentFixture<SiteMetadataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteMetadataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiteMetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
