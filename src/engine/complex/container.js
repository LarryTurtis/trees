import { ComplexShape } from './complexShape.js';
import { complex } from './complex.js';
import { Liquid } from './liquid.js';

function Container(shape) {

    shape.type = (shape.type || "") + "Container";


    /**
     * .overflowing
     * returns true if the container has a liquid
     * which is currently intersecting with the container's
     * opening, if it has one.
     */
    shape._overflowing = false;

    /**
     * .openingIndex
     * specifies whether this container has an opening 
     * and if so, where to find that opening line in the 
     * container.lines() array. If there is no opening, 
     * this property returns -1;
     *
     */
    shape._openingIndex = -1;

    Object.defineProperty(shape, 'overflowing', {
        get: function() {
            return this._overflowing;
        },
        set: function(overflowing) {
            this._overflowing = overflowing;
        }
    });

    Object.defineProperty(shape, 'openingIndex', {
        get: function() {
            return this._openingIndex;
        },
        set: function(openingIndex) {
            this._openingIndex = openingIndex;
        }
    });

    return shape;
}


export { Container }