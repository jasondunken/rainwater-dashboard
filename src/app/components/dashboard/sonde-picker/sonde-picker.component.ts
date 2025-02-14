import {
    Component,
    EventEmitter,
    inject,
    Input,
    Output,
    signal,
} from '@angular/core';

import { SiteService } from '../../../services/site.service';

import { Site } from '../../../../../../rainwater-server/src/site/site.entity';

@Component({
    selector: 'app-sonde-picker',
    imports: [],
    templateUrl: './sonde-picker.component.html',
    styleUrl: './sonde-picker.component.css',
})
export class SondePickerComponent {
    @Input() site!: Site;
    @Input() selectedSonde!: string;
    @Output() sondeSelected = new EventEmitter<any>();

    private siteService = inject(SiteService);

    sondes = signal<string[]>([]);

    ngOnInit() {
        this.siteService.getSondes(this.site.id).subscribe((site) => {
            if (site.sondes?.length > 0) {
                this.sondes.set(site.sondes);
            }
        });
    }

    selectSondeEvent(event: any): void {
        this.selectSonde(event.target.value);
    }

    selectSonde(sondeId: string): void {
        this.sondeSelected.emit(sondeId);
    }

    addSonde(sondeId: string): void {
        this.sondes.set([...this.sondes(), sondeId]);
        this.selectedSonde = sondeId;
    }
}
