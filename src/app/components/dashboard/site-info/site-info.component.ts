import {
    ChangeDetectionStrategy,
    Component,
    Input,
    signal,
    ViewChild,
} from '@angular/core';

import { SiteMetadataComponent } from '../site-metadata/site-metadata.component';
import { SondeAddComponent } from '../sonde-add/sonde-add.component';
import { SondeInfoComponent } from '../sonde-info/sonde-info.component';

import { Site } from '../../../../../../rainwater-server/src/site/site.entity';

@Component({
    selector: 'app-site-info',
    imports: [SondeInfoComponent, SondeAddComponent, SiteMetadataComponent],
    templateUrl: './site-info.component.html',
    styleUrl: './site-info.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush, // new way to avoid unecessary component updates
})
export class SiteInfoComponent {
    @Input() site!: Site;
    @ViewChild(SondeInfoComponent) sondeInfoComponent!: SondeInfoComponent;

    selectedSonde = signal<string>('');

    sondeSelected(sondeId: string): void {
        this.selectedSonde.set(sondeId);
    }

    sondeAdded(sondeId: string): void {
        this.sondeInfoComponent.sondeAdded(sondeId);
    }
}
