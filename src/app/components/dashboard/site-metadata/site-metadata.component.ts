import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SiteInformation } from '../../../../../../rainwater-server/src/models/site.model';

@Component({
    selector: 'app-site-metadata',
    imports: [CommonModule],
    templateUrl: './site-metadata.component.html',
    styleUrl: './site-metadata.component.css',
})
export class SiteMetadataComponent {
    siteInfo: SiteInformation | undefined;
}
