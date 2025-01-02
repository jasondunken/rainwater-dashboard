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
} from 'leaflet';

import { MapLocation } from '../../../../rainwater-types/site.model';

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

    private siteMarkerIds: string[] = [];

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

        this.baseMaps['Open Street Map'].addTo(this.map);

        control.layers(this.baseMaps, this.overlayMaps).addTo(this.map);
    }

    createMarkers(locations: MapLocation[]) {
        for (let location of locations) {
            // no leaflet id until element is created so tracking site ids
            // to prevent duplicate markers
            if (this.siteMarkerIds.includes(location.siteId)) {
                continue;
            }

            const site = marker([location.lat, location.lng], {
                title: 'awesome marker!',
                autoPan: true,
                draggable: true,
            }).bindPopup(`Site Id: ${location.siteId}`);
            if (location.icon) {
                site.setIcon(location.icon);
            }
            site.addTo(this.overlayMaps['Markers']);
            this.siteMarkerIds.push(location.siteId);
        }
        this.overlayMaps['Markers'].addTo(this.map);
    }

    flyTo(latLng: LatLngExpression) {
        this.map.flyTo(latLng, this.flyToZoom);
    }
}
