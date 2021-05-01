import Shape from "./shape";

class Pentagon extends Shape {

    constructor(x: number, y: number, sideLength: number, colour: number, outlineColour?: number) {
        super();
        this.square = Math.pow(sideLength, 2) * Math.sqrt(25 + (10 * Math.sqrt(5))) / 4

        this.lineStyle(2, outlineColour || colour);
        this.beginFill(colour);
        this.drawStar(0, 0, 5, sideLength, sideLength * 0.8);
        this.endFill();
        this.position.x = x;
        this.position.y = y;
    }

}

export default Pentagon;
