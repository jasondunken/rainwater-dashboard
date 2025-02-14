import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { environment } from '../../environments/environment.development';

import { AddSondeSensorDTO } from '../../../../rainwater-server/src/models/sonde.model';
import { Sonde } from '../../../../rainwater-server/src/sonde/sonde.entity';

@Injectable({
    providedIn: 'root',
})
export class SondeService {
    constructor(private http: HttpClient) {}

    getSensorTypes(sondeId: string): Observable<any> {
        // TODO get available & default sensors by sonde type
        return this.http.get<string[]>(environment.API_URL + 'sondes/sensors');
    }

    getInstalledSensors(sondeId: string): Observable<any> {
        return this.http.get<string[]>(
            environment.API_URL + `sondes/sensors/${sondeId}`,
        );
    }

    addSensor(addInfo: AddSondeSensorDTO): Observable<any> {
        return this.http
            .post<any>(environment.API_URL + 'sondes/sensors', addInfo)
            .pipe(
                tap((response) => {
                    if (response.message) {
                        return response.message;
                    } else {
                        return this.parseSondeJSON(response);
                    }
                }),
            );
    }

    parseSondeJSON(sonde: Sonde): any {
        sonde.sensors = JSON.parse(sonde.sensors);
    }
}
