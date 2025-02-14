import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

import { SiteService } from '../../../services/site.service';

import { Site } from '../../../../../../rainwater-server/src/site/site.entity';

@Component({
    selector: 'app-site-picker',
    imports: [CommonModule],
    templateUrl: './site-picker.component.html',
    styleUrl: './site-picker.component.css',
})
export class SitePickerComponent {
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
