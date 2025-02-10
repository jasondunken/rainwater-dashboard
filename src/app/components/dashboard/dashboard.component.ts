import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Subscription } from 'rxjs';

import { HeaderComponent } from './header/header.component';
import { SiteCreateComponent } from './site-create/site-create.component';
import { SiteSelectComponent } from './site-select/site-select.component';
import { SiteInfoComponent } from './site-info/site-info.component';

//import { ScrollToBottomDirective } from '../../directives/scroll-to-bottom.directive';

import { MapService } from '../../services/map.service';
import { DataService } from '../../services/data.service';
import { SiteService } from '../../services/site.service';
import { LocationService } from '../../services/location.service';

import { Location } from '../../../../../rainwater-server/src/models/site.model';
import { Site } from '../../../../../rainwater-server/src/site/site.entity';

@Component({
    selector: 'app-dashboard',
    imports: [
        CommonModule,
        SiteInfoComponent,
        HeaderComponent,
        SiteSelectComponent,
        SiteCreateComponent,
        //ScrollToBottomDirective,
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
    selectedSite: Site | undefined;
    sites: Site[] = [];

    private alertSubscription: Subscription;
    alertStatus: boolean = false;

    private markerSubscription: Subscription;

    constructor(
        private dataService: DataService,
        private siteService: SiteService,
        private locationService: LocationService,
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
                this.locationSelected(location.id);
            });
    }

    ngOnInit() {
        this.siteService.getSites().subscribe((sites) => {
            this.sites = sites;
        });
    }

    locationSelected(locationId: string) {
        this.siteService.getSiteByLocationId(locationId).subscribe((site) => {
            this.selectedSite = site;
        });
    }

    siteSelected(siteId: any) {
        this.siteService.getSite(siteId).subscribe((site) => {
            this.selectedSite = site;

            this.locationService
                .getLocation(site.locationId)
                .subscribe((location: Location) => {
                    this.mapService.flyTo([location.lat, location.lng]);
                });
        });
    }

    ngOnDestroy(): void {
        this.alertSubscription.unsubscribe();
        this.markerSubscription.unsubscribe();
    }
}
