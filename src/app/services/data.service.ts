import { Injectable, OnDestroy } from '@angular/core';

import { Subject, Observable, tap } from 'rxjs';

import { DataImportService } from './data-import.service';

import {
    DataRow,
    Location,
} from '../../../../rainwater-server/src/models/site.model';

import { Site } from '../../../../rainwater-server/src/site/site.entity';
import { Sonde } from '../../../../rainwater-server/src/sonde/sonde.entity';

@Injectable({
    providedIn: 'root',
})
export class DataService implements OnDestroy {
    private pollTimer!: ReturnType<typeof setInterval>;
    POLL_INTERVAL = 7000; // ms

    selectedSite!: Site;
    selectedSonde!: Sonde;

    private alertSubject = new Subject<any>();
    showBadDataAlert = false;

    private invalidRows: DataRow[] = [];

    constructor(private devData: DataImportService) {}

    getSiteData(location: Location): Observable<any> {
        return this.devData.getSiteData(location).pipe(
            tap((site) => {
                this.selectedSite = site as Site;
            }),
        );
    }

    pollForNewData(): void {
        this.pollTimer = setInterval(
            () => this.getNewData(),
            this.POLL_INTERVAL,
        );
    }

    getNewData(): void {
        // this.devData.getNewData().subscribe((newRows) => {
        //     console.log('newRows: ', newRows);
        //     if (newRows.length > 0 && this.selectedSite) {
        //         for (let row of newRows) {
        //             this.selectedSite.rows?.push(row.data);
        //             if (row.invalidValueIndices.length > 0) {
        //                 this.invalidRows.push(row);
        //                 this.showBadDataAlert = true;
        //                 this.alertSubject.next(this.showBadDataAlert);
        //             }
        //         }
        //     }
        // });
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

    // cleanup
    ngOnDestroy(): void {
        clearInterval(this.pollTimer);
    }
}
