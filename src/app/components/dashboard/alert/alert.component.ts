import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Subscription } from 'rxjs';

import { DataImportService } from '../../../services/data-import.service';

@Component({
    selector: 'app-alert',
    imports: [CommonModule],
    templateUrl: './alert.component.html',
    styleUrl: './alert.component.css',
})
export class AlertComponent implements OnDestroy {
    private alertStatus: Subscription;

    showAlert: boolean = false;

    constructor(private dataService: DataImportService) {
        this.alertStatus = this.dataService
            .getAlertStatus()
            .subscribe((status) => {
                this.showAlert = status;
            });
    }

    ngOnDestroy(): void {
        this.alertStatus.unsubscribe();
    }
}
