import { ComplexShape } from './complexShape.js';
import { complex } from './complex.js';
import { Liquid } from './liquid.js';

function decorateContainer(shape) {

    shape.type = (shape.type || "") + "Container";
    shape.opacity = 0.2;

    shape._liquid = new Liquid(shape);
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
        if (typeof amount !== 'number' || amount < 0) {
            throw new Error('Tried to use drain function with invalid amount.')
        }
        let remainder = amount - shape.liquid.height;

        shape.liquid.trimTop(amount);
        shape.empty = shape.liquid.height <= shape._minHeight;
        shape.full = shape.liquid.height >= shape.height;

        //return unused portion, if any, of amount
        return remainder > 0 ? remainder : 0;
    }

    shape.fill = function(amount) {
        if (typeof amount !== 'number' || amount < 0) {
            throw new Error('Tried to use drain function with invalid amount.')
        }
        let unfilled = shape.height - shape.liquid.height;
        let remainder = amount - unfilled;
        amount = remainder > 0 ? unfilled : amount;
        shape.liquid.growTop(amount);
        shape.empty = shape.liquid.height <= shape._minHeight;
        shape.full = shape.liquid.height >= shape.height;

        //return unused portion, if any, of amount
        return remainder > 0 ? remainder - shape._minHeight : 0;
    }

    return shape;
}


export { decorateContainer }
