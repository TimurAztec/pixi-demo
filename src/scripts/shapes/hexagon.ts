import Shape from "./shape";

class Hexagon extends Shape {

    constructor(x: number, y: number, sideLength: number, colour: number, outlineColour?: number) {
        super();
        this.square = 6 * (Math.sqrt(3)/4) * Math.pow(sideLength, 2);

        this.lineStyle(2, outlineColour || colour);
        this.beginFill(colour);
        this.drawStar(0, 0, 6, sideLength, sideLength * 0.85);
        this.endFill();
        this.position.x = x;
        this.position.y = y;
    }

}

export default Hexagon;
