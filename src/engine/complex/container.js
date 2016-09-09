import { ComplexShape } from './complexShape.js';
import { complex } from './complex.js';
import { Liquid } from './liquid.js';

function Container(shape) {

    shape.type = (shape.type || "") + "Container";


    /**
     * .pouring
     * returns true if the container has a liquid
     * which is currently intersecting with the container's
     * opening, if it has one.
     */
    shape._pouring = false;

    /**
     * .openingIndex
     * specifies whether this container has an opening 
     * and if so, where to find that opening line in the 
     * container.lines() array. If there is no opening, 
     * this property returns -1;
     *
     */
    shape._openingIndex = -1;

    Object.defineProperty(shape, 'pouring', {
        get: function() {
            return this._pouring;
        },
        set: function(pouring) {
            this._pouring = pouring;
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