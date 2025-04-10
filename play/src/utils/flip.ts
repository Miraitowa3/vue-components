interface ElementLocation {
    left: number;
    top: number;
}

export default class Filp {
    private el: string;
    private elements: HTMLElement[];
    private startLocation: ElementLocation[];
    private lastLocation: ElementLocation[];

    constructor({ el }: { el: string }) {
        this.el = el;
        this.elements = Array.from(this.getElement(el)[0].children) as HTMLElement[];
        this.startLocation = this.getLocation(this.elements);
        this.lastLocation = [];
    }

    private getElement(el: string): HTMLElement[] {
        return Array.from(document.querySelectorAll(el)) as HTMLElement[];
    }

    public start(): void {
        this.elements = Array.from(this.getElement(this.el)[0].children) as HTMLElement[];

        this.startLocation = this.getLocation(this.elements);
    }

    public last(): void {
        this.lastLocation = this.getLocation(this.elements);
    }

    public play(): void {
        nextTick(() => {
            this.last();
            this.invert();
        });
    }

    private invert(): void {
        const diff = this.startLocation.map((first, index) => {
            const last = this.lastLocation[index];
            return {
                left: first.left - last.left,
                top: first.top - last.top,
            };
        });

        this.elements.forEach((element, index) => {
            const { left, top } = diff[index];
            element.animate(
                [
                    {
                        transform: `translate(${left}px, ${top}px)`,
                    },
                    {
                        transform: "none",
                    },
                ],
                {
                    duration: 600,
                    easing: `cubic-bezier(0.33, 1, 0.68, 1)`,
                },
            );
        });
    }

    private getLocation(elements: HTMLElement[]): ElementLocation[] {
        return elements.map((el) => {
            const rect = el.getBoundingClientRect();
            return {
                left: rect.left,
                top: rect.top,
            };
        });
    }
}
