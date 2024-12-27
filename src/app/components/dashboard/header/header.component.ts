import { Component } from '@angular/core';

import { AlertComponent } from '../alert/alert.component';

@Component({
    selector: 'app-header',
    imports: [AlertComponent],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
})
export class HeaderComponent {}
