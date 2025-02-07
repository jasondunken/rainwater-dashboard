import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
    ReactiveFormsModule,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';

import { SiteService } from '../../../services/site.service';

import { AddSondeDTO } from '../../../../../../rainwater-server/src/models/site.model';
import { Site } from '../../../../../../rainwater-server/src/site/site.entity';

@Component({
    selector: 'app-sonde-add',
    imports: [ReactiveFormsModule],
    templateUrl: './sonde-add.component.html',
    styleUrl: './sonde-add.component.css',
})
export class SondeAddComponent implements OnInit {
    @Input() site!: Site;
    @Output() sondeAdded = new EventEmitter<string>();

    addSondeForm!: UntypedFormGroup;

    statusMessage = '';

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
            const addSondeInfo: AddSondeDTO = {
                siteId: this.site.id,
                sondeId: this.addSondeForm.value.sondeID,
            };
            this.siteService.addSonde(addSondeInfo).subscribe((res) => {
                if (res.message) {
                    this.statusMessage = res.message;
                } else {
                    this.statusMessage = 'Sonde added successfully!';
                    this.sondeAdded.emit(this.addSondeForm.value.sondeID);
                }
            });
        } else {
            this.statusMessage = 'All form fields are required!';
        }
    }
}
