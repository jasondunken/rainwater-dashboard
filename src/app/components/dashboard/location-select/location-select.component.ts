import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationService } from '../../../services/location.service';

import { Location } from '../../../../../../rainwater-server/src/models/site.model';

@Component({
    selector: 'app-location-select',
    imports: [CommonModule],
    templateUrl: './location-select.component.html',
    styleUrl: './location-select.component.css',
})
export class LocationSelectComponent {
    @Output() selectedLocation = new EventEmitter<Location>();

    locations!: Location[];

    constructor(private locationService: LocationService) {
        this.locations = this.locationService.getLocations();
    }

    selectLocation(event: any): void {
        this.selectedLocation.emit(
            this.locations.find((location) => {
                return '1' == event.target.value;
            })
        );
    }
}
