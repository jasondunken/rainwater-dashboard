import { DestroyRef, inject, Injectable, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment.development';

import { Location } from '../../../../rainwater-server/src/models/site.model';

@Injectable({
    providedIn: 'root',
})
export class DataImportService {
    private destroyRef = inject(DestroyRef);

    constructor(private http: HttpClient) {
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

    getSiteData(location: Location): Observable<any> {
        return this.http.get(
            environment.API_URL + `data/test-data/${location}`
        );
    }

    getSondeData(id: string): Observable<any> {
        return this.http.get(`${environment.API_URL}/data/${id}`);
    }

    getNewData(): Observable<any> {
        return this.http.get(environment.API_URL + 'data/');
    }

    addBadData(): Observable<any> {
        console.log('client add bad data!');
        return this.http.get(environment.API_URL + 'data/add-bad');
    }
}
