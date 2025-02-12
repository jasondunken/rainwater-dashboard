import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, signal, Signal } from '@angular/core';
import {
    Site,
    SiteMetadata,
} from '../../../../../../rainwater-server/src/site/site.entity';
import { SiteService } from '../../../services/site.service';

@Component({
    selector: 'app-site-metadata',
    imports: [CommonModule],
    templateUrl: './site-metadata.component.html',
    styleUrl: './site-metadata.component.css',
})
export class SiteMetadataComponent implements OnInit {
    @Input() site!: Site;

    siteMetadata = signal<SiteMetadata | undefined>(undefined);

    constructor(private siteService: SiteService) {}

    ngOnInit() {
        this.siteService
            .getSiteMetadata(this.site.id)
            .subscribe((siteMetadata: SiteMetadata) => {
                this.siteMetadata.set(siteMetadata);
            });
    }
}
