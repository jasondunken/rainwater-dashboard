import { Injectable, OnDestroy } from '@angular/core';

import { Subject, Observable } from 'rxjs';

import { DataImportService } from './data-import.service';

import {
    DataRow,
    MapLocation,
    SiteObj,
} from '../../../../rainwater-types/site.model';

@Injectable({
    providedIn: 'root',
})
export class DataService implements OnDestroy {
    private siteLoaded = new Subject<any>();
    currentSite!: SiteObj;

    private alertSubject = new Subject<any>();
    showBadDataAlert = false;

    private pollTimer!: ReturnType<typeof setInterval>;
    POLL_INTERVAL = 7000; // ms

    private invalidRows: DataRow[] = [];

    constructor(private devData: DataImportService) {}

    getSiteData(location: MapLocation): SiteObj {
        this.currentSite = this.devData.getSiteData(location);
        return this.currentSite;
    }

    pollForNewData(): void {
        this.pollTimer = setInterval(
            () => this.getNewData(),
            this.POLL_INTERVAL
        );
    }

    getNewData(): void {
        this.devData.getNewData().subscribe((newRows) => {
            console.log('newRows: ', newRows);
            if (newRows.length > 0 && this.currentSite) {
                for (let row of newRows) {
                    this.currentSite.rows?.push(row.data);
                    if (row.invalidValueIndices.length > 0) {
                        this.invalidRows.push(row);
                        this.showBadDataAlert = true;
                        this.alertSubject.next(this.showBadDataAlert);
                    }
                }
            }
        });
    }

    addBadData() {
        this.devData.addBadData().subscribe((res) => {
            console.log('added bad data? ', res);
        });
    }

    // signals/observables
    getAlertStatus(): Observable<any> {
        return this.alertSubject.asObservable();
    }

    toggleAlertStatus(): void {
        this.showBadDataAlert = !this.showBadDataAlert;
        this.alertSubject.next(this.showBadDataAlert);
    }

    siteDataUpdated(): Observable<any> {
        return this.siteLoaded.asObservable();
    }

    getSelectedSiteData(id: string) {
        this.currentSite = this.devData.getSelectedSite();
        this.siteLoaded.next(this.currentSite);
    }

    // cleanup
    ngOnDestroy(): void {
        clearInterval(this.pollTimer);
    }
}
