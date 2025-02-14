import { Component, Input, signal, ViewChild } from '@angular/core';

import { SondeAddSensorComponent } from '../sonde-add-sensor/sonde-add-sensor.component';
import { SondePickerComponent } from '../sonde-picker/sonde-picker.component';

import { SondeService } from '../../../services/sonde.service';

import { Site } from '../../../../../../rainwater-server/src/site/site.entity';
import { Sonde } from '../../../../../../rainwater-server/src/sonde/sonde.entity';
import { SensorInfoComponent } from '../sensor-info/sensor-info.component';

@Component({
    selector: 'app-sonde-info',
    imports: [
        SondePickerComponent,
        SondeAddSensorComponent,
        SensorInfoComponent,
    ],
    templateUrl: './sonde-info.component.html',
    styleUrl: './sonde-info.component.css',
})
export class SondeInfoComponent {
    @Input() site!: Site;
    @ViewChild(SondePickerComponent)
    sondePickerComponent!: SondePickerComponent;

    defaultSensors = signal<string[]>([]);
    installedSensors = signal<string[]>([]);

    selectedSonde = signal<string>('');
    selectedSensor = signal<string>('');

    constructor(private sondeService: SondeService) {}

    sondeAdded(sondeId: string) {
        this.sondePickerComponent.addSonde(sondeId);
        this.sondeSelected(sondeId);
    }

    sondeSelected(sondeId: string) {
        this.selectedSonde.set(sondeId);
        this.getSensors(sondeId);
    }

    getSensors(sondeId: string) {
        this.sondeService.getSensorTypes(sondeId).subscribe((sensors) => {
            this.defaultSensors.set(sensors.default);
        });

        this.sondeService.getInstalledSensors(sondeId).subscribe((sensors) => {
            this.installedSensors.set(sensors);
        });
    }

    getSensorInfo(sensorId: string) {
        this.selectedSensor.set(sensorId);
    }

    sensorAdded(sonde: Sonde) {
        this.installedSensors.set([...sonde.sensors]);
    }
}
