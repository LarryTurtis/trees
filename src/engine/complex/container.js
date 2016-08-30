import { ComplexShape } from './complexShape.js';
import { complex } from './complex.js';

function decorateContainer(shape) {

    shape.type = shape.type + "Container";
    shape.opacity = 0.2;

    shape._liquid = new shape.constructor(shape.x, shape.y, shape.width, shape.height, 0, shape.leftAngle, shape.rightAngle);
    shape._liquid.angle = shape.angle;
    shape._liquid.type = "Liquid";
    shape._full = false;
    shape._empty = false;

    Object.defineProperty(shape, 'liquid', {
        get: function() {
            return this._liquid;
        },
        set: function(liquid) {
            this._liquid = liquid;
        }
    });

    Object.defineProperty(shape, 'liquidColor', {
        get: function() {
            return this._liquidColor;
        },
        set: function(liquidColor) {
            this._liquidColor = liquidColor;
            shape.liquid.color = liquidColor;
        }
    });

    Object.defineProperty(shape, 'color', {
        get: function() {
            return this._color;
        },
        set: function(color) {
            this._color = trees.setOpacity(color, shape.opacity);
        }
    });

    Object.defineProperty(shape, 'full', {
        get: function() {
            return this._full;
        },
        set: function(full) {
            this._full = full;
        }
    });

    Object.defineProperty(shape, 'empty', {
        get: function() {
            return this._empty;
        },
        set: function(empty) {
            this._empty = empty;
        }
    });

    shape.fill = function(amount) {
        if (shape.liquid.height <= 0) {
            shape.empty = true;
        }

        if (shape.liquid.height >= shape.height) {
            shape.full = true;
        }
        shape.liquid.trimTop(amount);
    }

    return shape;
}


export { decorateContainer }
