import { Component, Input, OnInit, signal } from '@angular/core';
import {
    ReactiveFormsModule,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';

import { SiteService } from '../../../services/site.service';

import { Site } from '../../../../../../rainwater-server/src/site/site.entity';
import { AddSondeDTO } from '../../../../../../rainwater-server/src/models/site.model';

@Component({
    selector: 'app-sonde-add',
    imports: [ReactiveFormsModule],
    templateUrl: './sonde-add.component.html',
    styleUrl: './sonde-add.component.css',
})
export class SondeAddComponent implements OnInit {
    @Input() site!: Site;
    statusMessage = signal<string>('');

    addSondeForm!: UntypedFormGroup;

    constructor(
        private fb: UntypedFormBuilder,
        private siteService: SiteService
    ) {}

    ngOnInit() {
        this.addSondeForm = this.fb.group({
            sondeID: [null, Validators.required],
        });
    }

    addSonde() {
        if (this.addSondeForm.valid) {
            this.statusMessage.set('');
            const addSondeInfo: AddSondeDTO = {
                siteId: this.site.id,
                sondeId: this.addSondeForm.value.sondeID,
            };
            this.siteService.addSonde(addSondeInfo).subscribe((res) => {
                console.log('res:', res);
                if (res.message) {
                    console.log('res.message:', res);
                    this.statusMessage.set(res.message);
                } else {
                    console.log('res.no-message:', res);
                    this.statusMessage.set('Sonde added successfully!');
                }
            });
        } else {
            this.statusMessage.set('Sonde ID is required!');
        }
    }
}
