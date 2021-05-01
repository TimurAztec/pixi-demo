import View from "./view";
import Model from "./model";
import * as PIXI from "pixi.js";
import {SCREEN_SIZES, SHAPE_SIZES, SHAPE_TYPES, STATIC_COLORS} from "../utils/enums";
import {ProcessData} from "../types/ModelProcessData";
import {ShapeCreationData} from "../types/ShapeCreationData";
import utils from "../utils/utils";
import Circle from "../shapes/circle";
import Square from "../shapes/square";
import Triangle from "../shapes/triangle";
import Pentagon from "../shapes/pentagon";
import Hexagon from "../shapes/hexagon";
import Ellipse from "../shapes/ellipse";
import GraphicsBlob from "../shapes/blob";

class Control {

    private view: View;
    private model: Model;

    private secondsCounter: number = 0;
    private app: PIXI.Application;

    /**
     * Initializes (starts) application.
     */
    public init(): void {
        this.view = new View();
        this.model = new Model();
        this.assignEvents();
    }

    /**
     * Assigns model functions to view elements and starts PIXI ticker.
     */
    private assignEvents(): void {
        this.view.buttons.increaseShapes.addEventListener('click', () => {
            this.model.increaseShapesPerSec()
        });
        this.view.buttons.decreaseShapes.addEventListener('click', () => {
            this.model.decreaseShapesPerSec()
        });
        this.view.buttons.increaseGravity.addEventListener('click', () => {
            this.model.increaseGravity()
        });
        this.view.buttons.decreaseGravity.addEventListener('click', () => {
            this.model.decreaseGravity()
        });

        this.initApp(this.view.wrapper).add((dt) => {
            this.view.loop(dt, this.process());
        });
    }

    /**
     * @param appWrapper - HTML element to put screen into.
     * Initializes PIXI application.
     * @returns app PIXI.Ticker
     */
    private initApp(appWrapper): PIXI.Ticker {
        this.app = new PIXI.Application({
            width: SCREEN_SIZES.WIDTH,
            height: SCREEN_SIZES.HEIGHT,
            antialias: true,
            transparent: false,
            resolution: 1
        });
        this.app.stage.interactive = true;
        this.app.stage.buttonMode = true;
        this.app.stage.addChild(this.genBackGround());
        appWrapper.appendChild(this.app.view);
        return this.app.ticker;
    }

    /**
     * Processes application stuff and returns info for view.
     * @returns view update data
     */
    public process(): ProcessData {
        let currentShapesOccupied = 0;
        this.model.shapes.forEach((shape) => {
            shape.vy = this.model.gravityValue;
            currentShapesOccupied += shape.square;
            shape.process();
            if (shape.position.y > this.app.view.height) this.destroy(shape);
        });
        this.shapesGenHandler()
        return {
            currentShapesOccupied,
            shapesPerSecond: this.model.shapesPerSecond,
            currentShapes: this.model.shapes.length,
            gravity: this.model.gravityValue
        };
    }

    /**
     * Handles shapes generation to generate them necessary amount per second.
     */
    private shapesGenHandler(): void {
        this.secondsCounter += 1;
        if (Math.floor(this.secondsCounter) >= Math.floor(60/this.model.shapesPerSecond)) {
            this.createShape({});
            this.secondsCounter = 0;
        }
    }

    /**
     * @param data - shape options.
     * Creates shape and adds it to application stage.
     */
    private createShape(data: ShapeCreationData): void {
        const w = data.width || utils.randomValue(SHAPE_SIZES.MAX, SHAPE_SIZES.MIN);
        const h = data.height || utils.randomValue(SHAPE_SIZES.MAX, SHAPE_SIZES.MIN);
        const c1 = data.color1 || utils.randomColorCode();
        const c2 = data.color2 || utils.randomColorCode();
        const types = Object.values(SHAPE_TYPES);
        let newShape;
        switch (data.type || types[utils.randomValue(types.length, 0)]) {
            case SHAPE_TYPES.CIRCLE:
                newShape = new Circle(data.x || utils.randomValue(this.app.view.width - w * 2, w * 2), data.y || 0, w/2, c1, c2);
                break;
            case SHAPE_TYPES.SQUARE:
                newShape = new Square(data.x || utils.randomValue(this.app.view.width - w * 2, w * 2), data.y || 0, w, c1, c2);
                break;
            case SHAPE_TYPES.TRIANGLE:
                newShape = new Triangle(data.x || utils.randomValue(this.app.view.width - w * 2, w * 2), data.y || 0, w/2, c1, c2);
                break;
            case SHAPE_TYPES.PENTAGON:
                newShape = new Pentagon(data.x || utils.randomValue(this.app.view.width - w * 2, w * 2), data.y || 0, w/2, c1, c2);
                break;
            case SHAPE_TYPES.HEXAGON:
                newShape = new Hexagon(data.x || utils.randomValue(this.app.view.width - w * 2, w * 2), data.y || 0, w/2, c1, c2);
                break;
            case SHAPE_TYPES.ELLIPSE:
                newShape = new Ellipse(data.x || utils.randomValue(this.app.view.width - w * 2, w * 2), data.y || 0, w/2, h/2, c1, c2);
                break;
            case SHAPE_TYPES.BLOB:
                newShape = new GraphicsBlob(data.x || utils.randomValue(this.app.view.width - w * 2, w * 2), data.y || 0, w/2, h/2, c1, c2);
                break;
        }
        newShape.on('pointerdown', (e) => {
            this.destroy(newShape);
            let color1 = utils.randomColorCode(); let color2 = utils.randomColorCode();
            this.model.shapes.forEach((shape) => {
                if (newShape.constructor.name == shape.constructor.name) {
                    this.createShape({type: shape.constructor.name, x: shape.x, y: shape.y, width: shape.width, height: shape.height, color1, color2});
                    this.destroy(shape);
                }
            })
        });
        this.model.shapes.push(newShape);
        this.app.stage.addChild(newShape);
    }

    /**
     * @param shape - shape that you want to delete from the stage.
     * Destroys shape.
     */
    private destroy(shape): void {
        this.model.shapes.splice(this.model.shapes.indexOf(shape), 1);
        this.app.stage.removeChild(shape);
    }

    /**
     * Creates background for application stage to process click events on shapes free space.
     */
    private genBackGround(): PIXI.Graphics {
        let background = new PIXI.Graphics();
        background.beginFill(STATIC_COLORS.BLACK);
        background.drawRect(0, 0, SCREEN_SIZES.WIDTH, SCREEN_SIZES.HEIGHT);
        background.endFill();
        background.interactive = true;
        background.buttonMode = false;
        background.name = 'background';
        background.on('pointerdown', (e) => {
            this.createShape({x: e.data.global.x, y: e.data.global.y});
        });
        return background;
    }
}

export default Control;
