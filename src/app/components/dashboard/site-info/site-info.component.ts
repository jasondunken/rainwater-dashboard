import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { SiteInformation } from '../../../../../../rainwater-server/src/models/site.model';

@Component({
    selector: 'app-site-info',
    imports: [],
    templateUrl: './site-info.component.html',
    styleUrl: './site-info.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush, // new way to avoid unecessary component updates
})
export class SiteInfoComponent {
    @Input({ required: true }) siteInfo?: SiteInformation;
}
