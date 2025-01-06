import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Subscription } from 'rxjs';

import { SiteInfoComponent } from './site-info/site-info.component';
import { HeaderComponent } from './header/header.component';

import { DataService } from '../../services/data.service';

import { SiteObj } from '../../../../../rainwater-types/site.model';
import { LocationSelectComponent } from './location-select/location-select.component';
import { MapService } from '../../services/map.service';

@Component({
    selector: 'app-dashboard',
    imports: [
        CommonModule,
        SiteInfoComponent,
        HeaderComponent,
        LocationSelectComponent,
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
    private siteSubscription: Subscription;
    selectedSite: SiteObj | undefined;

    private alertSubscription: Subscription;
    alertStatus: boolean = false;

    private markerSubscription: Subscription;

    constructor(
        private dataService: DataService,
        private mapService: MapService
    ) {
        this.alertSubscription = this.dataService
            .getAlertStatus()
            .subscribe((alertStatus) => {
                this.alertStatus = alertStatus;
            });

        this.siteSubscription = this.dataService
            .siteDataUpdated()
            .subscribe((location) => {
                this.siteSelected(location);
            });

        this.markerSubscription = this.mapService
            .getMarkerEventSubject()
            .subscribe((location) => {
                this.siteSelected(location);
            });
    }

    siteSelected(location: any) {
        this.selectedSite = this.dataService.getSiteData(location);
    }

    ngOnDestroy(): void {
        this.alertSubscription.unsubscribe();
        this.siteSubscription.unsubscribe();
        this.markerSubscription.unsubscribe();
    }
}
