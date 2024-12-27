import { AfterViewInit, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteInfoComponent } from './site-info/site-info.component';

import { SiteObj } from '../../../../../rainwater-types/site.model';
import { DataImportService } from '../../services/data-import.service';
import { HeaderComponent } from './header/header.component';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-dashboard',
    imports: [CommonModule, SiteInfoComponent, HeaderComponent],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements AfterViewInit {
    private dataService = inject(DataImportService);
    private alertSubscription: Subscription;

    alertStatus: boolean = false;

    constructor() {
        this.alertSubscription = this.dataService
            .getAlertStatus()
            .subscribe((alertStatus) => {
                this.alertStatus = alertStatus;
                if (this.alertStatus) {
                    alert(
                        'Data integrity error. Email sent to testuser@email.edu'
                    );
                }
            });
    }

    toggleAlertStatus(): void {
        this.dataService.toggleAlertStatus();
    }

    ngOnDestroy(): void {
        this.alertSubscription.unsubscribe();
    }

    selectedSite: SiteObj | undefined;

    static pollTimer: ReturnType<typeof setInterval>;

    ngAfterViewInit() {
        DashboardComponent.pollTimer = setInterval(
            () => this.getNewData(),
            7000
        );
    }

    selectSite(siteId: string) {
        this.selectedSite = this.dataService.getSelectedSite();
    }

    siteSelected() {
        return this.selectedSite;
    }

    getNewData(): void {
        this.dataService.getNewData().subscribe((newRows) => {
            if (newRows) {
                console.log('new data: ', newRows);
                for (let row of newRows) {
                    this.selectedSite?.rows?.push(row.data);
                }
            }
        });
    }
}
