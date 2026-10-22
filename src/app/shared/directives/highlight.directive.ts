import {
  Directive,
  ElementRef,
  Renderer2,
  inject,
  input,
} from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true,
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
  },
})
export class HighlightDirective {
  appHighlight = input('');

  private element = inject<ElementRef<HTMLElement>>(ElementRef);
  private renderer = inject(Renderer2);

  private originalBackground = '';

  onMouseEnter(): void {
    const host = this.element.nativeElement;

    this.originalBackground = host.style.backgroundColor;

    this.renderer.setStyle(
      host,
      'background-color',
      this.appHighlight() || '#fef9c3',
    );
  }

  onMouseLeave(): void {
    const host = this.element.nativeElement;

    if (this.originalBackground) {
      this.renderer.setStyle(
        host,
        'background-color',
        this.originalBackground,
      );
    } else {
      this.renderer.removeStyle(host, 'background-color');
    }
  }
}