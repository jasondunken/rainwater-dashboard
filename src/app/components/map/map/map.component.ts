import { Component, OnInit } from '@angular/core';

import { LatLngExpression, Map } from 'leaflet';

import { MapService } from '../../../services/map.service';
import { LocationService } from '../../../services/location.service';

@Component({
    selector: 'app-map',
    imports: [],
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
    map: Map | undefined;
    locations: any = [];

    constructor(
        private locationService: LocationService,
        private mapService: MapService
    ) {}

    ngOnInit() {
        this.map = this.mapService.createMap('map');
    }

    getLocations() {
        this.map?.invalidateSize(true);
        this.locationService.getLocations().subscribe((response) => {
            this.locations = response;
            this.mapService.createMarkers(this.locations, this.map);
            if (this.locations) {
                this.flyTo([this.locations[0].lat, this.locations[0].lng]);
            }
        });
    }

    flyTo(latLng: LatLngExpression) {
        this.map?.flyTo(latLng, 18);
    }
}
