import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteSelectComponent } from './site-picker.component';

describe('SiteSelectComponent', () => {
    let component: SiteSelectComponent;
    let fixture: ComponentFixture<SiteSelectComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SiteSelectComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(SiteSelectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
