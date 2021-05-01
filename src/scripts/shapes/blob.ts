import Shape from "./shape";

class GraphicsBlob extends Shape {

    constructor(x: number, y: number, width: number, height: number, colour: number, outlineColour?: number) {
        super();
        this.square = (Math.PI * Math.pow(width, 2))/2;

        this.lineStyle(2, outlineColour || colour);
        this.beginFill(colour);
        // In school I had C mark at geometry, so I drew a slice of a circle instead of a blob.
        this.arc(0, 0, width, 0.6, 3.6);
        this.endFill();
        this.position.x = x;
        this.position.y = y;
    }

}

export default GraphicsBlob;
