import { Component, EventEmitter, Input, model, Output } from '@angular/core';

import { MapComponent } from './components/map/map/map.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { DataImportService } from './services/data-import.service';
import { LocationService } from './services/location.service';
import { ControlsComponent } from './components/dev/controls/controls.component';

@Component({
    selector: 'app-root',
    imports: [MapComponent, DashboardComponent, ControlsComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent {
    // example custom 2-way binding
    // old way
    @Input({ required: true }) thing!: { this: string; type: string };
    @Output() thingChange = new EventEmitter<{ this: string; type: string }>();
    // v >= 17.2 new way
    // model returns a signal, access value with size(), update size.set() or size.update()
    size = model.required<{ ojbType: string }>();
    // end of example

    title = 'rainwater-dashboard';

    locations: any;

    constructor(private dataService: DataImportService) {}

    getTestData() {
        this.dataService.getTestData().subscribe();
    }
}
