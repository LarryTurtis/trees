import { ShapesRegistry } from './shapesregistry.js';
import { updateCollisions } from './collisions/collisionDetection.js';
import { collisionHandler } from './collisions/collisionHandler.js';

let shapesRegistry = new ShapesRegistry();
let now;
let then = Date.now();
let delta;

function animate() {
    requestAnimationFrame(() => {
        animate();
    });

    now = Date.now();
    delta = now - then;

    if (delta > shapesRegistry._interval) {
        // update time stuffs

        // Just `then = now` is not enough.
        // Lets say we set fps at 10 which means
        // each frame must take 100ms
        // Now frame executes in 16ms (60fps) so
        // the loop iterates 7 times (16*7 = 112ms) until
        // delta > _interval === true
        // Eventually this lowers down the FPS as
        // 112*10 = 1120ms (NOT 1000ms).
        // So we have to get rid of that extra 12ms
        // by subtracting delta (112) % _interval (100).
        // Hope that makes sense.

        then = now - (delta % shapesRegistry._interval);

        // ... Code for Drawing the Frame ...
        if (shapesRegistry.length) {
            if (!shapesRegistry.blur) {
                shapesRegistry.dynamicBackgroundCanvas.ctx.clearRect(0, 0, shapesRegistry.dynamicBackgroundCanvas.width, shapesRegistry.dynamicBackgroundCanvas.height);
                shapesRegistry.dynamicForegroundCanvas.ctx.clearRect(0, 0, shapesRegistry.dynamicForegroundCanvas.width, shapesRegistry.dynamicForegroundCanvas.height);
            }

            shapesRegistry.dynamicShapes.forEach(shape => {
                // if (shape.boundary.a.x > shape.canvas.width.percent(110) || shape.boundary.b.x < -shape.canvas.width.percent(10)) {
                //     //shapesRegistry.remove(shape);
                //     return;
                // }

                // if (shape.boundary.a.y > shape.canvas.height.percent(110) || shape.boundary.d.y < -shape.canvas.height.percent(10)) {
                //     //shapesRegistry.remove(shape);
                //     return;
                // }

                let collisions = [];

                if (shape.animate) {
                    shape.animate();
                }
                if (shape.callback) {
                    shape.callback();
                }

                if (shape.collidable) {
                    collisions = updateCollisions(shape);
                    if (collisions.length) {
                        collisions.forEach(collisionHandler);
                    }
                }

                if (shape.visible) shape.draw(shape.canvas.ctx);
            });

        }


    }

}

export { animate }