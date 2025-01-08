import { Injectable } from '@angular/core';

import {
    map,
    latLng,
    marker,
    tileLayer,
    control,
    Map,
    LatLngExpression,
    LayerGroup,
    LatLng,
} from 'leaflet';

import { MapLocation } from '../../../../rainwater-types/site.model';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class MapService {
    map!: Map;

    flyToZoom = 18;

    private baseLayers = {
        'Open Street Map': tileLayer(
            'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            { maxZoom: 18, attribution: '...' }
        ),
        'OSM Humanitarian': tileLayer(
            'http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
            { maxZoom: 18, attribution: '...' }
        ),
        'OSM Mapnik': tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: '...',
        }),
        None: tileLayer(''),
    };

    private baseMaps = {
        'Open Street Map': this.baseLayers['Open Street Map'],
        'OSM Humanitarian': this.baseLayers['OSM Humanitarian'],
        'OSM Mapnik': this.baseLayers['OSM Mapnik'],
        None: this.baseLayers['None'],
    };

    private overlayMaps = {
        Markers: new LayerGroup(),
    };

    private lastMapClick: LatLng = latLng(0, 0);
    private mapClickSubject = new Subject<LatLng>();

    private siteMarkerIds: string[] = [];

    private markerSubscription = new Subject<any>();

    constructor() {}

    createMap(elementId: string) {
        const dLat = 33.95817804679789;
        const dLng = -83.37995409965515;
        const dZoom = 13;

        const options = {
            zoom: dZoom,
            center: latLng(dLat, dLng),
        };

        this.map = map(elementId, options);
        this.map.on('click', (event) => this.handleMapClick(event));

        this.baseMaps['Open Street Map'].addTo(this.map);

        control.layers(this.baseMaps, this.overlayMaps).addTo(this.map);
    }

    createMarkers(locations: MapLocation[]) {
        interface MarkerOptions extends L.MarkerOptions {
            location?: MapLocation;
        }

        for (let location of locations) {
            // no leaflet id until element is created so tracking site ids
            // to prevent duplicate markers
            if (this.siteMarkerIds.includes(location.siteId)) {
                continue;
            }

            const markerOptions: MarkerOptions = {
                location: location,
                title: `Site Id: ${location.siteId}`,
                autoPan: true,
                draggable: true,
            };

            const site = marker(
                [location.lat, location.lng],
                markerOptions
            ).bindPopup(
                `Site Id: ${location.siteId}<br/>Sond Id: ${location.sondeId}`
            );

            site.on('click', (event) => {
                this.handleMarkerClick(event);
            });
            site.addTo(this.overlayMaps['Markers']);
            this.siteMarkerIds.push(location.siteId);
        }
        this.overlayMaps['Markers'].addTo(this.map);
    }

    handleMapClick(event: any): void {
        this.lastMapClick = event.latlng;
        this.mapClickSubject.next(this.lastMapClick);
    }

    getMapClick(): Subject<any> {
        return this.mapClickSubject;
    }

    handleMarkerClick(event: any) {
        this.markerSubscription.next(event.target.options.location);
    }

    getMarkerEventSubject(): Subject<any> {
        return this.markerSubscription;
    }

    flyTo(latLng: LatLngExpression) {
        this.map.invalidateSize(); // needed to correctly center location on map (because map is resized after map component is initialized).
        this.map.flyTo(latLng, this.flyToZoom);
    }
}
