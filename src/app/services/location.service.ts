import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class LocationService {
    constructor(private http: HttpClient) {}

    getLocations(): Observable<any> {
        return this.http.get(environment.API_URL + 'location/test-locations');
    }
}
