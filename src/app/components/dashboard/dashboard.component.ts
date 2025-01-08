import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Subscription } from 'rxjs';

import { HeaderComponent } from './header/header.component';
import { SiteInfoComponent } from './site-info/site-info.component';
import { LocationSelectComponent } from './location-select/location-select.component';
import { LocationAddComponent } from './location-add/location-add.component';

import { ScrollToBottomDirective } from '../../directives/scroll-to-bottom.directive';

import { MapService } from '../../services/map.service';
import { DataService } from '../../services/data.service';

import { SiteObj } from '../../../../../rainwater-types/site.model';

@Component({
    selector: 'app-dashboard',
    imports: [
        CommonModule,
        SiteInfoComponent,
        HeaderComponent,
        LocationSelectComponent,
        LocationAddComponent,
        ScrollToBottomDirective,
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
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

        this.markerSubscription = this.mapService
            .getMarkerEventSubject()
            .subscribe((location) => {
                this.siteSelected(location);
            });
    }

    siteSelected(location: any) {
        this.dataService.getSiteData(location).subscribe((site) => {
            this.selectedSite = site;
            this.mapService.flyTo([location.lat, location.lng]);
        });
    }

    ngOnDestroy(): void {
        this.alertSubscription.unsubscribe();
        this.markerSubscription.unsubscribe();
    }
}
