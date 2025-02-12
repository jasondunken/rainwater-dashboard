import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment.development';

import { AddSondeSensorDTO } from '../../../../rainwater-server/src/models/sonde.model';

@Injectable({
    providedIn: 'root',
})
export class SondeService {
    constructor(private http: HttpClient) {}

    getAvailableSensors(): Observable<any> {
        return this.http.get(environment.API_URL + 'sondes/sensors');
    }

    addSensor(addInfo: AddSondeSensorDTO): Observable<any> {
        return this.http.post(environment.API_URL + 'sondes/sensor', addInfo);
    }
}
