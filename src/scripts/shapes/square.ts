import Shape from "./shape";

class Square extends Shape {

    constructor(x: number, y: number, sideLength: number, colour: number, outlineColour?: number) {
        super();
        this.square = Math.pow(sideLength, 2);

        this.lineStyle(2, outlineColour || colour);
        this.beginFill(colour);
        this.drawRect(0, 0, sideLength, sideLength);
        this.endFill();
        this.position.x = x;
        this.position.y = y;
    }

}

export default Square;
