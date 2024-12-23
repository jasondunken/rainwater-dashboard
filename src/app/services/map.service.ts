import { Injectable } from '@angular/core';

import {
    map,
    circle,
    latLng,
    marker,
    polygon,
    tileLayer,
    control,
    Map,
} from 'leaflet';

@Injectable({
    providedIn: 'root',
})
export class MapService {
    constructor() {}

    createMap(elementId: string) {
        const dLat = 33.95817804679789;
        const dLng = -83.37995409965515;
        const dZoom = 13;

        const options = {
            zoom: dZoom,
            center: latLng(dLat, dLng),
        };

        const mapInstance = map(elementId, options);

        const baseLayers = {
            'Open Street Map': tileLayer(
                'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                { maxZoom: 18, attribution: '...' }
            ).addTo(mapInstance),
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
        const featureLayers = {
            'Big Circle': circle([46.95, -122], { radius: 5000 }),
            'Big Square': polygon([
                [46.8, -121.55],
                [46.9, -121.55],
                [46.9, -121.7],
                [46.8, -121.7],
            ]),
            marker: marker([46.95, -122], {
                title: 'awesome marker!',
                autoPan: true,
                draggable: true,
            }).bindPopup('I am bound!'),
        };

        const baseMaps = {
            'Open Street Map': baseLayers['Open Street Map'],
            'OSM Humanitarian': baseLayers['OSM Humanitarian'],
            'OSM Mapnik': baseLayers['OSM Mapnik'],
            None: baseLayers['None'],
        };

        const overlayMaps = {
            'Big Circle': featureLayers['Big Circle'],
            'Big Square': featureLayers['Big Square'],
            Marker: featureLayers['marker'],
        };

        const layerControl = control
            .layers(baseMaps, overlayMaps)
            .addTo(mapInstance);

        return mapInstance;
    }

    createMarkers(locations: any[], map: Map | undefined) {
        if (!map) {
            console.log('undefined map element!');
            return;
        }
        console.log('creating markers for: ', locations);
        for (let location of locations) {
            marker([location.lat, location.lng], {
                title: 'awesome marker!',
                autoPan: true,
            })
                .bindPopup(`SiteId: ${location.siteId}`)
                .addTo(map);
        }
    }
}
