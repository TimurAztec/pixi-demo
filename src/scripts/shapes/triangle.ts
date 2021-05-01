import Shape from "./shape";

class Triangle extends Shape {

    constructor(x: number, y: number, sideLength: number, colour: number, outlineColour?: number) {
        super();
        this.square = (sideLength/4)*Math.sqrt(4*Math.pow(sideLength,2)-Math.pow(sideLength,2));

        this.lineStyle(2, outlineColour || colour);
        this.beginFill(colour);
        this.drawStar(0, 0, 3, sideLength, 0);
        this.endFill();
        this.position.x = x;
        this.position.y = y;
    }

}

export default Triangle;
