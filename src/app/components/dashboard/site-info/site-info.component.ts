import { AfterViewInit, Component, Input } from '@angular/core';

import { DataImportService } from '../../../services/data-import.service';

import { SiteInformation } from '../../../../../../rainwater-types/site.model';

@Component({
    selector: 'app-site-info',
    imports: [],
    templateUrl: './site-info.component.html',
    styleUrl: './site-info.component.css',
})
export class SiteInfoComponent implements AfterViewInit {
    @Input() siteInfo?: SiteInformation;

    constructor(private dataService: DataImportService) {}

    ngAfterViewInit(): void {
        console.log('selctedSite: ', this.siteInfo);
    }
}
