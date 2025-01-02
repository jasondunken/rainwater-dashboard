import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Subscription } from 'rxjs';

import { SiteInfoComponent } from './site-info/site-info.component';
import { HeaderComponent } from './header/header.component';

import { DataService } from '../../services/data.service';

import { SiteObj } from '../../../../../rainwater-types/site.model';

@Component({
    selector: 'app-dashboard',
    imports: [CommonModule, SiteInfoComponent, HeaderComponent],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
    private siteSubscription: Subscription;
    selectedSite: SiteObj | undefined;

    private alertSubscription: Subscription;
    alertStatus: boolean = false;

    constructor(private dataService: DataService) {
        this.alertSubscription = this.dataService
            .getAlertStatus()
            .subscribe((alertStatus) => {
                this.alertStatus = alertStatus;
            });

        this.siteSubscription = this.dataService
            .siteDataUpdated()
            .subscribe((site) => {
                this.selectedSite = site;
            });
    }

    ngOnDestroy(): void {
        this.alertSubscription.unsubscribe();
        this.siteSubscription.unsubscribe();
    }
}
