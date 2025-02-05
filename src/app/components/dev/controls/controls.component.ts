import { Component } from '@angular/core';

import { DataService } from '../../../services/data.service';

@Component({
    selector: 'app-controls',
    imports: [],
    templateUrl: './controls.component.html',
    styleUrl: './controls.component.css',
})
export class ControlsComponent {
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
