import { Injectable, OnDestroy } from '@angular/core';

import { Subject, Observable } from 'rxjs';

import { DataImportService } from './data-import.service';

import {
    DataRow,
    InvalidDataRow,
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

    private invalidValues: InvalidDataRow[] = [];

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
            if (newRows && this.currentSite) {
                this.validateNewData(newRows);
            }
        });
    }

    validateNewData(rows: DataRow[]): void {
        console.log('new data: ', rows);
        for (let row of rows) {
            const invalidValueIndeices: number[] = this.indexMissingValues(row);

            if (invalidValueIndeices.length > 0) {
                const invalidRow: InvalidDataRow = {
                    id: row.id,
                    data: row.data,
                    invalidValueIndices: invalidValueIndeices,
                };
                this.invalidValues.push(invalidRow);
                console.log('rows with invalid values: ', this.invalidValues);
                // alert(`row has missing values: ${row.data}`);
                this.showBadDataAlert = true;
                this.alertSubject.next(this.showBadDataAlert);
            }
            this.currentSite.rows?.push(row.data);
        }
    }

    indexMissingValues(row: DataRow): number[] {
        // date, utc offset, and date w/offset are columns 0-2
        // sensor values are columns 3-...

        // CURRENTLY ONLY LOOKS FOR 'undefined' VALUES
        // TODO: check for out of range or other non valid values
        const invalidValuesIndices: number[] = [];
        for (let i = 0; i < row.data.length; i++) {
            if (row.data[i] == undefined) {
                invalidValuesIndices.push(i);
            }
        }
        return invalidValuesIndices;
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
