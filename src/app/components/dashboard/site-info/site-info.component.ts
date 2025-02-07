import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Site } from '../../../../../../rainwater-server/src/site/site.entity';
import { SondeAddComponent } from '../sonde-add/sonde-add.component';

@Component({
    selector: 'app-site-info',
    imports: [SondeAddComponent],
    templateUrl: './site-info.component.html',
    styleUrl: './site-info.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush, // new way to avoid unecessary component updates
})
export class SiteInfoComponent {
    @Input({ required: true }) site!: Site;
}
