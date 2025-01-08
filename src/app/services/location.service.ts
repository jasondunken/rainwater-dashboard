import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, tap } from 'rxjs';

import { environment } from '../../environments/environment.development';

import { MapService } from './map.service';

import { MapLocation } from '../../../../rainwater-types/site.model';

@Injectable({
    providedIn: 'root',
})
export class LocationService {
    private locations: MapLocation[] = [];

    constructor(private http: HttpClient, private mapService: MapService) {
        this.loadLocations().subscribe();
    }

    loadLocations(): Observable<any> {
        return this.http
            .get(environment.API_URL + 'location/test-locations')
            .pipe(
                tap((locations) => {
                    this.locations.push(...(locations as MapLocation[]));
                    this.mapService.createMarkers(this.locations);
                })
            );
    }

    getLocations(): MapLocation[] {
        return this.locations;
    }

    addLocation(location: MapLocation): void {
        this.http
            .post(environment.API_URL + 'location', location)
            .subscribe((res) => {
                console.log('res: ', res);
            });
    }
}
