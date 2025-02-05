import {
    Component,
    EventEmitter,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
import {
    ReactiveFormsModule,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';

import { LatLng } from 'leaflet';

import { SiteService } from '../../../services/site.service';
import { MapService } from '../../../services/map.service';

@Component({
    selector: 'app-site-create',
    imports: [ReactiveFormsModule],
    templateUrl: './site-create.component.html',
    styleUrl: './site-create.component.css',
})
export class SiteCreateComponent implements OnInit, OnDestroy {
    private mapClickSubscription: Subscription;
    @Output() siteCreated = new EventEmitter<string>();

    addSiteForm!: UntypedFormGroup;

    statusMessage = '';

    constructor(
        private fb: UntypedFormBuilder,
        private siteService: SiteService,
        private mapService: MapService
    ) {
        this.mapClickSubscription = this.mapService
            .getMapClick()
            .subscribe((latlng: LatLng) => {
                this.updateLatLngFields(latlng);
            });
    }

    ngOnInit() {
        this.addSiteForm = this.fb.group({
            name: [null, Validators.required],
            lat: [null, Validators.required],
            lng: [null, Validators.required],
        });
    }

    updateLatLngFields(latLng: LatLng) {
        this.addSiteForm.get('lat')?.setValue(latLng.lat);
        this.addSiteForm.get('lng')?.setValue(latLng.lng);
    }

    createSite() {
        if (this.addSiteForm.valid) {
            this.siteService
                .createSite(this.addSiteForm.value)
                .subscribe((res) => {
                    if (res.id) {
                        this.siteCreated.emit(res.id);
                    } else {
                        this.statusMessage = 'Failed to create site!';
                    }
                });
        } else {
            this.statusMessage = 'All form fields are required!';
        }
    }

    ngOnDestroy() {
        this.mapClickSubscription.unsubscribe();
    }
}
