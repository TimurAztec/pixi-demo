import Shape from "./shape";

class Ellipse extends Shape {

    constructor(x: number, y: number, width: number, height: number, colour: number, outlineColour?: number) {
        super();
        this.square = Math.PI * width * height;

        this.lineStyle(2, outlineColour || colour);
        this.beginFill(colour);
        this.drawEllipse(0, 0, width, height);
        this.endFill();
        this.position.x = x;
        this.position.y = y;
    }

}

export default Ellipse;
