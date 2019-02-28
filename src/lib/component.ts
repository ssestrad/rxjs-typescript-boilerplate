import { sanitize } from 'dompurify';

export interface ComponentConstructor {
  className?: string;
  elementType?: string;
}

export default class Component<T extends HTMLElement = HTMLDivElement> {
  public $element: T;
  public children: Component<T>[];
  private displayType: string | null;

  public constructor({ elementType = 'div', className = 'component' }: ComponentConstructor = {}) {
    this.$element = document.createElement(elementType) as T;
    this.$element.className = className;
    this.children = [];
    this.displayType = this.$element.style.display;
  }

  public add(component: Component<T>): void {
    this.$element.appendChild(component.$element);
    this.children.push(component);
  }

  public remove(component: Component<T>): void {
    const index: number = this.children.indexOf(component);
    if (index < 0) {
      throw new Error('Cannot remove component.');
    }
    this.children.splice(index, 1);
    this.$element.removeChild(component.$element);
  }

  public clear(): void {
    while (this.children.length) {
      const child: Component<T> | undefined = this.children.pop();
      if (child) this.$element.removeChild(child.$element);
    }
  }

  public show(displayType?: string): void {
    const display: string = displayType || this.displayType || 'block';
    this.$element.style.display = display === 'none' ? 'block' : display;
  }

  public hide(): void {
    this.displayType = this.$element.style.display;
    this.$element.style.display = 'none';
  }

  public updateText(text: string): void {
    this.$element.innerText = text;
  }

  public updateHtml(html: string): void {
    this.$element.innerHTML = sanitize(html);
  }
}
