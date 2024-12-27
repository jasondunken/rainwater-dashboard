import { DestroyRef, inject, Injectable, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Observer, Subject, tap } from 'rxjs';

import { environment } from '../../environments/environment.development';

import {
    DataRow,
    SiteObj,
    SiteInformation,
} from '../../../../rainwater-types/site.model';

@Injectable({
    providedIn: 'root',
})
export class DataImportService {
    private destroyRef = inject(DestroyRef);

    siteData: SiteObj | undefined = undefined;

    private alertSubject = new Subject<any>();
    showBadDataAlert = false;

    constructor(private http: HttpClient) {
        this.getTestData().subscribe();

        // Here is an example of effect w/ cleanup
        effect((onCleanup) => {
            const timer = setTimeout(() => {
                console.log(`See code for example of 'effect' w/ cleanup`);
            }, 1000);
            onCleanup(() => {
                clearTimeout(timer);
            });
        });
        // end of example
    }

    // this is just here as an example
    newWayObjCleanupExample() {
        const timeout = setInterval(() => console.log('interval!'), 3000);
        // new way to cleanup instead of ngOnDestroy
        this.destroyRef.onDestroy(() => {
            clearInterval(timeout);
        });
    }
    // end of example

    getTestData(): Observable<any> {
        return this.http.get(environment.API_URL + 'data/test-data/').pipe(
            tap((data) => {
                this.siteData = data as SiteObj;
                console.log('returned siteObj: ', this.siteData);
            })
        );
    }

    getSelectedSite(): SiteObj | undefined {
        return this.siteData;
    }

    getNewData(): Observable<any> {
        return this.http.get(environment.API_URL + 'data/');
    }

    getAlertStatus(): Observable<any> {
        return this.alertSubject.asObservable();
    }

    toggleAlertStatus(): void {
        this.showBadDataAlert = !this.showBadDataAlert;
        this.alertSubject.next(this.showBadDataAlert);
    }
}
