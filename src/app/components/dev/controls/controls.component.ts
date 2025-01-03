import { Component } from '@angular/core';

import { DataService } from '../../../services/data.service';
import { LocationService } from '../../../services/location.service';
import { MapService } from '../../../services/map.service';
import { MapLocation } from '../../../../../../rainwater-types/site.model';

@Component({
    selector: 'app-controls',
    imports: [],
    templateUrl: './controls.component.html',
    styleUrl: './controls.component.css',
})
export class ControlsComponent {
    selectedSite: MapLocation = {
        siteId: '0',
        lat: 0,
        lng: 0,
        icon: undefined,
    };

    constructor(
        private locationService: LocationService,
        private mapService: MapService,
        private dataService: DataService
    ) {}

    getLocations() {
        const locations = this.locationService.getLocations();
        this.selectedSite = locations[0];
        this.mapService.createMarkers(locations);
    }

    getTestSite() {
        this.dataService.getSelectedSiteData(this.selectedSite.siteId);
        this.mapService.flyTo([this.selectedSite.lat, this.selectedSite.lng]);
    }

    pollServer() {
        this.dataService.pollForNewData();
    }

    addBadData() {
        this.dataService.addBadData();
    }

    toggleAlert() {
        this.dataService.toggleAlertStatus();
    }
}
