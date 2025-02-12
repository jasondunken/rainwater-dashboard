import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { SondeAddComponent } from '../sonde-add/sonde-add.component';
import { SondeAddSensorComponent } from '../sonde-add-sensor/sonde-add-sensor.component';

import { Site } from '../../../../../../rainwater-server/src/site/site.entity';
import { SondeInfoComponent } from '../sonde-info/sonde-info.component';
import { SiteMetadataComponent } from '../site-metadata/site-metadata.component';

@Component({
    selector: 'app-site-info',
    imports: [
        SondeInfoComponent,
        SondeAddComponent,
        SondeAddSensorComponent,
        SiteMetadataComponent,
    ],
    templateUrl: './site-info.component.html',
    styleUrl: './site-info.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush, // new way to avoid unecessary component updates
})
export class SiteInfoComponent {
    @Input({ required: true }) site!: Site;

    selectedSonde: string | undefined = undefined;

    sondeSelected(event: any): void {
        this.selectedSonde = event.target.value;
    }
}
