import { Injectable, OnDestroy } from '@angular/core';

import { Subject, Observable } from 'rxjs';

import { DataImportService } from './data-import.service';

import { SiteObj } from '../../../../rainwater-types/site.model';

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

    constructor(private devData: DataImportService) {}

    pollForNewData(): void {
        this.pollTimer = setInterval(
            () => this.getNewData(),
            this.POLL_INTERVAL
        );
    }

    getNewData(): void {
        this.devData.getNewData().subscribe((newRows) => {
            if (newRows && this.currentSite) {
                console.log('new data: ', newRows);
                for (let row of newRows) {
                    this.currentSite.rows?.push(row.data);
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
