import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { environment } from '../../environments/environment.development';

import {
    AddSiteSondeDTO,
    CreateSiteDTO,
    UpdateSiteMetadataDTO,
} from '../../../../rainwater-server/src/models/site.model';
import { PostError } from '../../../../rainwater-server/src/models/response.model';

import {
    Site,
    SiteMetadata,
} from '../../../../rainwater-server/src/site/site.entity';

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

    getSiteMetadata(siteId: string): Observable<any> {
        return this.http.get<SiteMetadata>(
            `${environment.API_URL}sites/metadata/${siteId}`,
        );
    }

    putSiteMetadata(siteMetadata: UpdateSiteMetadataDTO): Observable<any> {
        return this.http.put<UpdateSiteMetadataDTO>(
            `${environment.API_URL}sites/metadata`,
            siteMetadata,
        );
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

    addSonde(addInfo: AddSiteSondeDTO): Observable<any> {
        return this.http.post<Site | PostError>(
            environment.API_URL + 'sites/sonde',
            addInfo,
        );
    }

    getSondes(siteId: string): Observable<any> {
        return this.getSite(siteId).pipe(
            tap((site) => {
                return [...site.sondes];
            }),
        );
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
