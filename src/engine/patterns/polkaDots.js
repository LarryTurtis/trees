/**
 * A function to add random spots to an object
 * @param  {Sprite} container
 * @param  {Sprite} shape  
 * @param  {Number} density
 * @param  {Number} minSize
 * @param  {Number} maxSize
 * @param  {String} color  
 */
function polkaDots(container, shape, density, minSize, maxSize, color) {

    for (let i = 0; i < density; i++) {
        let x = trees.random(container.a.x, container.b.x);
        let y = trees.random(container.a.y, container.d.y);
        let size = trees.random(minSize, maxSize);
        let dot = new shape(x, y, size, size);
        dot.color = color;
        container.addShape(dot);
    }

}

export { polkaDots };
