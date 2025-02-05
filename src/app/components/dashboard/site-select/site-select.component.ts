import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

import { SiteObj } from '../../../../../../rainwater-server/src/models/site.model';
import { Site } from '../../../../../../rainwater-server/src/site/site.entity';

import { SiteService } from '../../../services/site.service';

@Component({
    selector: 'app-site-select',
    imports: [CommonModule],
    templateUrl: './site-select.component.html',
    styleUrl: './site-select.component.css',
})
export class SiteSelectComponent {
    @Output() selectedSite = new EventEmitter<string>();

    sites!: Site[];

    constructor(private siteService: SiteService) {
        this.siteService.getSites().subscribe((sites) => {
            this.sites = sites;
        });
    }

    selectSite(event: any): void {
        this.selectedSite.emit(event.target.value);
    }
}
