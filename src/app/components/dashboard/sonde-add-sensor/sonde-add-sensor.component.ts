import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { SondeService } from '../../../services/sonde.service';

import { Sonde } from '../../../../../../rainwater-server/src/sonde/sonde.entity';

@Component({
    selector: 'app-sonde-add-sensor',
    imports: [CommonModule],
    templateUrl: './sonde-add-sensor.component.html',
    styleUrl: './sonde-add-sensor.component.css',
})
export class SondeAddSensorComponent implements OnInit {
    @Input() selectedSonde!: string;
    @Output() sensorAdded = new EventEmitter<Sonde>();

    statusMessage = signal<string>('');
    availableSensors = signal<string[]>([]);

    constructor(private sondeService: SondeService) {}

    ngOnInit() {
        this.sondeService
            .getSensorTypes(this.selectedSonde)
            .subscribe((sensors) => {
                this.availableSensors.set(sensors.available);
            });
    }

    addSensor(event: any) {
        this.sondeService
            .addSensor({ UUID: this.selectedSonde, sensor: event.target.value })
            .subscribe((response) => {
                if (response.message) {
                    this.statusMessage.set(response.message);
                } else {
                    this.statusMessage.set('Sensor added successfully!');
                    this.sensorAdded.emit(response);
                }
            });
    }
}
