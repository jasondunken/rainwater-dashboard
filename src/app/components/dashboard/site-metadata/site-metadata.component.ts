import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
    Site,
    SiteMetadata,
} from '../../../../../../rainwater-server/src/site/site.entity';
import { SiteService } from '../../../services/site.service';
import {
    ReactiveFormsModule,
    UntypedFormBuilder,
    UntypedFormGroup,
} from '@angular/forms';

@Component({
    selector: 'app-site-metadata',
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './site-metadata.component.html',
    styleUrl: './site-metadata.component.css',
})
export class SiteMetadataComponent implements OnInit {
    @Input() site!: Site;

    siteMetadataForm!: UntypedFormGroup;
    updating = false;

    constructor(
        private siteService: SiteService,
        private fb: UntypedFormBuilder,
    ) {}

    ngOnInit() {
        this.siteService
            .getSiteMetadata(this.site.id)
            .subscribe((siteMetadata: SiteMetadata) => {
                this.siteMetadataForm.patchValue(siteMetadata);
            });

        this.siteMetadataForm = this.fb.group({
            code: [''],
            description: [''],
            elevation: [''],
            verticalDatum: [''],
            siteType: [''],
            siteNotes: [''],
            sourceLink: [''],
        });
        this.siteMetadataForm.disable();
    }

    saveMetadata() {
        if (!this.updating) {
            this.siteMetadataForm.enable();
            this.updating = true;
            return;
        }
        const updateInfo = {
            siteId: this.site.id,
            ...this.siteMetadataForm.value,
        };
        this.siteService.putSiteMetadata(updateInfo).subscribe();
        this.siteMetadataForm.disable();
        this.updating = false;
    }
}
