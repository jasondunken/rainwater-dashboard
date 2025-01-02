import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, tap } from 'rxjs';

import { environment } from '../../environments/environment.development';
import { MapLocation } from '../../../../rainwater-types/site.model';

@Injectable({
    providedIn: 'root',
})
export class LocationService {
    private locations: MapLocation[] = [];

    constructor(private http: HttpClient) {
        this.loadLocations().subscribe();
    }

    loadLocations(): Observable<any> {
        return this.http
            .get(environment.API_URL + 'location/test-locations')
            .pipe(
                tap((locations) => {
                    this.locations = locations as MapLocation[];
                })
            );
    }

    getLocations(): MapLocation[] {
        return this.locations;
    }
}
