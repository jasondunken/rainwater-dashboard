import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment.development';

import { CreateSiteDTO } from '../../../../rainwater-server/src/models/site.model';

@Injectable({
    providedIn: 'root',
})
export class SiteService {
    constructor(private http: HttpClient) {}

    getSites(): Observable<any> {
        return this.http.get(environment.API_URL + 'sites');
    }

    createSite(site: CreateSiteDTO): Observable<any> {
        return this.http.post(environment.API_URL + 'sites', site);
    }

    getSiteByLocationId(locationId: string): Observable<any> {
        return this.http.get(
            `${environment.API_URL}sites/location/${locationId}`
        );
    }

    getSiteMetadata(siteId: string): Observable<any> {
        return this.http.get(`${environment.API_URL}sites/${siteId}`);
    }
}
