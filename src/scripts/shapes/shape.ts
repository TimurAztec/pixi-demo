import * as PIXI from 'pixi.js';

class Shape extends PIXI.Graphics {
    public vx: number = 0;
    public vy: number = 0;
    public square: number;

    constructor() {
        super();
        this.interactive = true;
    }

    public process(): void {
        this.position.x += this.vx;
        this.position.y += this.vy;
    }

}

export default Shape;
