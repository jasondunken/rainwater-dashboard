import { Component, OnDestroy, OnInit } from '@angular/core';
import {
    ReactiveFormsModule,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';

import { LocationService } from '../../../services/location.service';
import { MapService } from '../../../services/map.service';
import { LatLng, LatLngExpression } from 'leaflet';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-location-add',
    imports: [ReactiveFormsModule],
    templateUrl: './location-add.component.html',
    styleUrl: './location-add.component.css',
})
export class LocationAddComponent implements OnInit, OnDestroy {
    private mapClickSubscription: Subscription;

    constructor(
        private fb: UntypedFormBuilder,
        private locationService: LocationService,
        private mapService: MapService
    ) {
        this.mapClickSubscription = this.mapService
            .getMapClick()
            .subscribe((latlng: LatLng) => {
                this.updateLatLngFields(latlng);
            });
    }

    addLocationForm!: UntypedFormGroup;

    latlng!: LatLngExpression;

    ngOnInit() {
        this.addLocationForm = this.fb.group({
            siteId: [null, Validators.required],
            sondId: [null, Validators.required],
            lat: [0, Validators.required],
            lng: [0, Validators.required],
        });
    }

    updateLatLngFields(latLng: LatLng) {
        this.addLocationForm.get('lat')?.setValue(latLng.lat);
        this.addLocationForm.get('lng')?.setValue(latLng.lng);
    }

    addLocation() {
        if (this.addLocationForm.valid) {
            this.locationService.addLocation(this.addLocationForm.value);
        }
    }

    ngOnDestroy() {
        this.mapClickSubscription.unsubscribe();
    }
}
