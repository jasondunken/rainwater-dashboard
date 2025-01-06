import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationService } from '../../../services/location.service';

import { MapLocation } from '../../../../../../rainwater-types/site.model';

@Component({
    selector: 'app-location-select',
    imports: [CommonModule],
    templateUrl: './location-select.component.html',
    styleUrl: './location-select.component.css',
})
export class LocationSelectComponent {
    @Output() selectedLocation = new EventEmitter<MapLocation>();

    locations!: MapLocation[];

    constructor(private locationService: LocationService) {
        this.locations = this.locationService.getLocations();
    }

    selectLocation(event: any): void {
        this.selectedLocation.emit(
            this.locations.find((location) => {
                return location.siteId == event.target.value;
            })
        );
    }
}
