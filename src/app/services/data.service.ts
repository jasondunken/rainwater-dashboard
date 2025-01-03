import { Injectable, OnDestroy } from '@angular/core';

import { Subject, Observable } from 'rxjs';

import { DataImportService } from './data-import.service';

import { DataRow, SiteObj } from '../../../../rainwater-types/site.model';

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

    private rowsWithInvalidValues: string[] = [];

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
                this.validateNewData(newRows);
            }
        });
    }

    validateNewData(rows: DataRow[]): void {
        console.log('new data: ', rows);
        for (let row of rows) {
            if (this.hasMissingValues(row)) {
                this.rowsWithInvalidValues.push(row.id);
                console.log(
                    'rows with invalid values: ',
                    this.rowsWithInvalidValues
                );
                alert(`row has missing values: ${row.data}`);
            }
            this.currentSite.rows?.push(row.data);
        }
    }

    hasMissingValues(row: DataRow): boolean {
        // date, utc offset, and date w/offset are columns 0-2
        // sensor values are columns 3-...
        for (let i = 0; i < row.data.length; i++) {
            if (row.data[i] == undefined) {
                return true;
            }
        }
        return false;
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
