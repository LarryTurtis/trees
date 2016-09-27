import { Trapezoid } from '../simples/trapezoid.js';

/**
 * A function to add random spots to an object
 * @param  {Sprite} container
 * @param  {Sprite} shape  
 * @param  {Number} density
 * @param  {Number} minSize
 * @param  {Number} maxSize
 * @param  {String} color  
 */
function polkaTrapezoids(container, density, minSize, maxSize, color) {

    for (let i = 0; i < density; i++) {
        let randomPoint1 = trees.getPointOnLine(container.a, trees.random(0, container.width), trees.getAngle(container.a, container.b));
        let randomPoint2 = trees.getPointOnLine(randomPoint1, trees.random(0, container.height), trees.getAngle(container.a, container.d));
        let x = randomPoint2.x;
        let y = randomPoint2.y;
        let size = trees.random(minSize, maxSize);
        let dot = new Trapezoid(x, y, size, size, trees.random(85,105), trees.random(85,105));
        dot.color = color;
        container.addShape(dot);
    }

}

export { polkaTrapezoids };
