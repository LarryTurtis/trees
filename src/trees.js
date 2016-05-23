/**
 * A SMALL utilities library using Underscore-like functions.
 * @return {Object}
 */
function trees() {

    return {
        random: random,
        randomColor: randomColor
    }

    /**
     * Returns a random number between min and max, inclusive
     * @param  {Number} min
     * @param  {Number} max
     */
    function random(min, max) {
        if (max == null) {
            max = min;
            min = 0;
        }
        return min + Math.floor(Math.random() * (max - min + 1));
    };

    /**
     * Returns a random hex color
     * @return {String} 
     */
    function randomColor() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    }

}

export { trees };
