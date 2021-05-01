import Shape from "./shape";

class Circle extends Shape {

    constructor(x: number, y: number, radius: number, colour: number, outlineColour?: number) {
        super();
        this.square = Math.PI * Math.pow(radius, 2);

        this.lineStyle(2, outlineColour || colour);
        this.beginFill(colour);
        this.drawCircle(0, 0, radius);
        this.endFill();
        this.position.x = x;
        this.position.y = y;
    }

}

export default Circle;
