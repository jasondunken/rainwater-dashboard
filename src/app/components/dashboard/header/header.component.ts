import { Component, inject } from '@angular/core';
import { AlertComponent } from '../alert/alert.component';
import { DataImportService } from '../../../services/data-import.service';

@Component({
    selector: 'app-header',
    imports: [AlertComponent],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
})
export class HeaderComponent {
    private dataService = inject(DataImportService);

    toggleAlert(): void {
        this.dataService.toggleAlertStatus();
    }
}
