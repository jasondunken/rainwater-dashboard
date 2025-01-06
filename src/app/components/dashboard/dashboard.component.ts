import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Subscription } from 'rxjs';

import { HeaderComponent } from './header/header.component';
import { SiteInfoComponent } from './site-info/site-info.component';
import { LocationSelectComponent } from './location-select/location-select.component';

import { DataService } from '../../services/data.service';
import { MapService } from '../../services/map.service';

import { SiteObj } from '../../../../../rainwater-types/site.model';
import { ScrollToBottomDirective } from '../../directives/scroll-to-bottom.directive';

@Component({
    selector: 'app-dashboard',
    imports: [
        CommonModule,
        SiteInfoComponent,
        HeaderComponent,
        LocationSelectComponent,
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
        this.selectedSite = this.dataService.getSiteData(location);
        this.mapService.flyTo([location.lat, location.lng]);
    }

    ngOnDestroy(): void {
        this.alertSubscription.unsubscribe();
        this.markerSubscription.unsubscribe();
    }
}
