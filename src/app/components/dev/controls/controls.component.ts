import { Component } from '@angular/core';

import { DataService } from '../../../services/data.service';
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

    constructor(private dataService: DataService) {}

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
