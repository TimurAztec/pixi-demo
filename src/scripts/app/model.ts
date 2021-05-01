import Shape from "../shapes/shape";

class Model {
    private shapesPerSec: number;
    private gravity: number;

    public shapes: Shape[] = [];

    /**
     * @returns The amount of shapes generated per second.
     */
    get shapesPerSecond(): number {
        return this.shapesPerSec;
    }

    /**
     * @returns Current falling speed of all shapes on the screen.
     */
    get gravityValue(): number {
        return this.gravity;
    }

    constructor() {
        this.shapesPerSec = 1;
        this.gravity = 1;
    }

    /**
     * Adds one shape to amount of shapes generated per second.
     */
    public increaseShapesPerSec(): void {
        this.shapesPerSec += 1;
    }

    /**
     * Takes away one shape from amount of shapes generated per second.
     */
    public decreaseShapesPerSec(): void {
        if ((this.shapesPerSec - 1) >= 0) {
            this.shapesPerSec -= 1
        }
    }

    /**
     * Increases falling speed of all shapes by 1 pixel per tick.
     */
    public increaseGravity(): void {
        this.gravity += 1;
    }

    /**
     * Decreases falling speed of all shapes by 1 pixel per tick.
     */
    public decreaseGravity(): void {
        if ((this.gravity - 1) >= 0) {
            this.gravity -= 1
        }
    }
}

export default Model;
