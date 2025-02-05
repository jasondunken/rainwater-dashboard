import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, tap } from 'rxjs';

import { environment } from '../../environments/environment.development';

import { MapService } from './map.service';

import { Location } from '../../../../rainwater-server/src/models/site.model';

@Injectable({
    providedIn: 'root',
})
export class LocationService {
    private locations: Location[] = [];

    constructor(private http: HttpClient, private mapService: MapService) {
        this.loadLocations().subscribe();
    }

    loadLocations(): Observable<any> {
        return this.http.get(environment.API_URL + 'locations').pipe(
            tap((locations) => {
                console.log('locations:', locations);
                this.locations.push(...(locations as Location[]));
                this.mapService.createMarkers(this.locations);
            })
        );
    }

    getLocations(): Location[] {
        return this.locations;
    }

    addLocation(location: Location): void {
        this.http
            .post(environment.API_URL + 'location', location)
            .subscribe((res) => {
                console.log('res: ', res);
            });
    }
}
