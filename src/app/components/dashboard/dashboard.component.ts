import { AfterViewInit, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Subscription } from 'rxjs';

import { SiteInfoComponent } from './site-info/site-info.component';
import { HeaderComponent } from './header/header.component';

import { DataImportService } from '../../services/data-import.service';

import { SiteObj } from '../../../../../rainwater-types/site.model';

@Component({
    selector: 'app-dashboard',
    imports: [CommonModule, SiteInfoComponent, HeaderComponent],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements AfterViewInit {
    static pollTimer: ReturnType<typeof setInterval>;

    private dataService = inject(DataImportService);
    selectedSite: SiteObj | undefined;

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

    ngAfterViewInit(): void {
        DashboardComponent.pollTimer = setInterval(
            () => this.getNewData(),
            7000
        );
    }

    selectSite(siteId: string): void {
        this.selectedSite = this.dataService.getSelectedSite();
    }

    siteSelected(): SiteObj | undefined {
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

    toggleAlertStatus(): void {
        this.dataService.toggleAlertStatus();
    }

    ngOnDestroy(): void {
        this.alertSubscription.unsubscribe();
    }
}
