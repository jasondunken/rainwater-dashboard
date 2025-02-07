import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';

import { environment } from '../../environments/environment.development';

import {
    AddSondeDTO,
    CreateSiteDTO,
    PostError,
} from '../../../../rainwater-server/src/models/site.model';
import { Site } from '../../../../rainwater-server/src/site/site.entity';

@Injectable({
    providedIn: 'root',
})
export class SiteService {
    constructor(private http: HttpClient) {}

    getSites(): Observable<any> {
        return this.http
            .get<Site[]>(environment.API_URL + 'sites')
            .pipe(tap((sites) => this.parseSitesJSON(sites)));
    }

    getSite(siteId: string): Observable<any> {
        return this.http
            .get<Site>(`${environment.API_URL}sites/${siteId}`)
            .pipe(tap((site) => this.parseSiteJSON(site)));
    }

    createSite(site: CreateSiteDTO): Observable<any> {
        return this.http
            .post<Site>(environment.API_URL + 'sites', site)
            .pipe(tap((site) => this.parseSiteJSON(site)));
    }

    getSiteByLocationId(locationId: string): Observable<any> {
        return this.http
            .get<Site>(`${environment.API_URL}sites/location/${locationId}`)
            .pipe(tap((site) => this.parseSiteJSON(site)));
    }

    addSonde(addInfo: AddSondeDTO): Observable<any> {
        return this.http.post<Site | PostError>(
            environment.API_URL + 'sites/sonde',
            addInfo
        );
        // .pipe(
        //     tap((res) => {
        //         if (res.siteId) return this.parseSiteJSON(res);
        //         else return res;
        //     })
        // );
    }

    parseSitesJSON(sites: Site[]): Site[] {
        sites.forEach((site) => {
            site = this.parseSiteJSON(site);
        });
        return sites;
    }

    parseSiteJSON(site: Site): any {
        site.sondes = JSON.parse(site.sondes);
        return site;
    }
}
