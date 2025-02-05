import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { environment } from '../../environments/environment.development';

import { MapService } from './map.service';

import { Location } from '../../../../rainwater-server/src/location/location.entity';

@Injectable({
    providedIn: 'root',
})
export class LocationService {
    constructor(private http: HttpClient, private mapService: MapService) {
        this.getLocations().subscribe();
    }

    getLocations(): Observable<any> {
        return this.http.get(environment.API_URL + 'locations').pipe(
            tap((locations) => {
                this.mapService.createMarkers(locations as Location[]);
            })
        );
    }

    getLocation(id: string): Observable<any> {
        return this.http.get(`${environment.API_URL}locations/${id}`);
    }
}
