import { Component, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataImportService } from '../../../services/data-import.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-alert',
    imports: [CommonModule],
    templateUrl: './alert.component.html',
    styleUrl: './alert.component.css',
})
export class AlertComponent implements OnDestroy {
    private dataService = inject(DataImportService);
    private alertSubscription: Subscription;

    showAlert = false;

    constructor() {
        this.alertSubscription = this.dataService
            .getAlertStatus()
            .subscribe((alertStatus) => {
                this.showAlert = alertStatus;
                if (this.showAlert) {
                    alert(
                        'Data integrity error. Email sent to testuser@email.edu'
                    );
                }
            });
    }

    ngOnDestroy(): void {
        this.alertSubscription.unsubscribe();
    }
}
