import { ComplexShape } from './complexShape.js';
import { complex } from './complex.js';

function decorateContainer(shape) {

    shape.type = (shape.type || "") + "Container";
    shape.opacity = 0.2;

    shape._liquid = new shape.constructor(shape.x, shape.y, shape.width, shape.height, shape.leftAngle, shape.rightAngle);
    shape._liquid.type = "Liquid";
    shape._full = true;
    shape._empty = false;
    shape._liquidColor = "transparent";

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

    shape.drain = function(amount) {
        if (typeof amount !== 'number') {
            throw new Error('Tried to use drain function with invalid amount.')
        }
        let remainder = amount - shape.liquid.height;

        shape.liquid.trimTop(amount);
        shape.empty = shape.liquid.height <= 0;
        shape.full = shape.liquid.height >= shape.height;

        //return unused portion, if any, of amount
        return remainder > 0 ? remainder : 0;
    }

    shape.fill = function(amount) {
        return this.drain(-amount);
    }

    return shape;
}


export { decorateContainer }
