import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-sensor-info',
    imports: [],
    templateUrl: './sensor-info.component.html',
    styleUrl: './sensor-info.component.css',
})
export class SensorInfoComponent {
    @Input() selectedSensor!: string;
}
