import { AfterViewChecked, Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[appScrollToBottom]',
})
export class ScrollToBottomDirective implements AfterViewChecked {
    constructor(private el: ElementRef) {}

    ngAfterViewChecked(): void {
        try {
            this.el.nativeElement.scrollTop =
                this.el.nativeElement.scrollHeight;
        } catch (err) {
            // we shouldn't ever get here
        }
    }
}
