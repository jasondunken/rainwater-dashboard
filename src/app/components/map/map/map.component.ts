import { Component, OnInit } from '@angular/core';

import { MapService } from '../../../services/map.service';

@Component({
    selector: 'app-map',
    imports: [],
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
    constructor(private mapService: MapService) {}

    ngOnInit() {
        this.mapService.createMap('map');
    }
}
