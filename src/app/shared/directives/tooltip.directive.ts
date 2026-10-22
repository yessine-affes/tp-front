import {
  Directive,
  ElementRef,
  OnDestroy,
  Renderer2,
  inject,
  input,
} from '@angular/core';

@Directive({
  selector: '[appTooltip]',
  standalone: true,
  host: {
    '(mouseenter)': 'showTooltip()',
    '(mouseleave)': 'hideTooltip()',
  },
})
export class TooltipDirective implements OnDestroy {
  appTooltip = input('');

  private element = inject<ElementRef<HTMLElement>>(ElementRef);
  private renderer = inject(Renderer2);

  private tooltip: HTMLElement | null = null;
  private originalPosition = '';

  showTooltip(): void {
    const text = this.appTooltip();

    if (!text.trim() || this.tooltip) {
      return;
    }

    const host = this.element.nativeElement;

    this.originalPosition = host.style.position;
    this.renderer.setStyle(host, 'position', 'relative');

    const bubble = this.renderer.createElement('span') as HTMLElement;
    const content = this.renderer.createText(text);

    this.renderer.setAttribute(bubble, 'role', 'tooltip');

    this.renderer.setStyle(bubble, 'position', 'absolute');
    this.renderer.setStyle(bubble, 'top', '100%');
    this.renderer.setStyle(bubble, 'left', '0');
    this.renderer.setStyle(bubble, 'margin-top', '6px');
    this.renderer.setStyle(bubble, 'z-index', '50');
    this.renderer.setStyle(bubble, 'width', 'max-content');
    this.renderer.setStyle(bubble, 'max-width', 'min(280px, 80vw)');
    this.renderer.setStyle(bubble, 'padding', '8px 12px');
    this.renderer.setStyle(bubble, 'border-radius', '6px');
    this.renderer.setStyle(bubble, 'background-color', '#0f172a');
    this.renderer.setStyle(bubble, 'color', '#ffffff');
    this.renderer.setStyle(bubble, 'font-size', '12px');
    this.renderer.setStyle(bubble, 'white-space', 'normal');
    this.renderer.setStyle(bubble, 'overflow-wrap', 'anywhere');
    this.renderer.setStyle(bubble, 'pointer-events', 'none');

    this.renderer.appendChild(bubble, content);
    this.renderer.appendChild(host, bubble);

    this.tooltip = bubble;
  }

  hideTooltip(): void {
    if (!this.tooltip) {
      return;
    }

    const host = this.element.nativeElement;

    this.renderer.removeChild(host, this.tooltip);
    this.tooltip = null;

    if (this.originalPosition) {
      this.renderer.setStyle(host, 'position', this.originalPosition);
    } else {
      this.renderer.removeStyle(host, 'position');
    }
  }

  ngOnDestroy(): void {
    this.hideTooltip();
  }
}