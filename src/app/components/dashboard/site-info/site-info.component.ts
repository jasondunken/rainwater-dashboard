import { Component, Input } from '@angular/core';

import { SiteInformation } from '../../../../../../rainwater-types/site.model';

@Component({
    selector: 'app-site-info',
    imports: [],
    templateUrl: './site-info.component.html',
    styleUrl: './site-info.component.css',
})
export class SiteInfoComponent {
    @Input({ required: true }) siteInfo?: SiteInformation;
}
