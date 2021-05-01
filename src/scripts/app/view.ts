import {ProcessData} from "../types/ModelProcessData";

class View {
    private display = {
        gravity: document.querySelector('#gravity'),
        currentShapes: document.querySelector('#current-shapes'),
        currentShapesOccupied: document.querySelector('#current-shapes-occupied'),
        shapesPerSec: document.querySelector('#shapes-per-sec'),
        increaseShapes: document.querySelector('#increase-shapes'),
        decreaseShapes: document.querySelector('#decrease-shapes'),
        increaseGravity: document.querySelector('#increase-gravity'),
        decreaseGravity: document.querySelector('#decrease-gravity'),
        wrapper: document.querySelector('#screen-wrapper')
    };

    /**
     * @returns Interactive display buttons.
     */
    get buttons() {
        return {
            increaseShapes: this.display.increaseShapes,
            decreaseShapes: this.display.decreaseShapes,
            increaseGravity: this.display.increaseGravity,
            decreaseGravity: this.display.decreaseGravity
        }
    }

    /**
     * @returns Values display containers.
     */
    get values() {
        return {
            gravity: this.display.gravity,
            currentShapes: this.display.currentShapes,
            currentShapesOccupied: this.display.currentShapesOccupied,
            shapesPerSec: this.display.shapesPerSec
        }
    }

    /**
     * @returns DOM element to put PIXI screen into.
     */
    get wrapper() {
        return this.display.wrapper
    }

    /**
     * Function to process all view information, should be placed into PIXI ticker callback.
     * @param delta - delta time from PIXI ticker
     * @param processData - data from control process that you want to display
     */
    public loop(delta, processData): void {
        this.drawDisplay(processData);
    }

    /**
     * Function to update display values.
     * * @param processData - data from control process that you want to display
     */
    private drawDisplay(processData: ProcessData): void {
        this.display.currentShapes.innerHTML = String(processData.currentShapes);
        this.display.shapesPerSec.innerHTML = String(processData.shapesPerSecond);
        this.display.currentShapesOccupied.innerHTML = String(Math.floor(processData.currentShapesOccupied));
        this.display.gravity.innerHTML = String(processData.gravity);
    }

}

export default View;
