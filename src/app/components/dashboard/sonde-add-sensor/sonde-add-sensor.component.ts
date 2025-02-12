import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    signal,
} from '@angular/core';
import { SondeService } from '../../../services/sonde.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-sonde-add-sensor',
    imports: [CommonModule],
    templateUrl: './sonde-add-sensor.component.html',
    styleUrl: './sonde-add-sensor.component.css',
})
export class SondeAddSensorComponent implements OnInit {
    @Input() selectedSonde!: string;
    @Output() sensorAdded = new EventEmitter<string>();

    availableSensors = signal<string[]>([]);

    constructor(private sondeService: SondeService) {}

    ngOnInit() {
        this.sondeService
            .getAvailableSensors()
            .subscribe((availableSensors) => {
                this.availableSensors.set(availableSensors);
            });
    }

    addSensor(event: any) {
        this.sondeService
            .addSensor({ UUID: this.selectedSonde, sensor: event.target.value })
            .subscribe((res) => {
                console.log('res:', res);
                this.sensorAdded.emit(event.target.value);
            });
    }
}
