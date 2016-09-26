import { ShapesRegistry } from './shapesregistry.js';

let shapesRegistry = new ShapesRegistry();

function drawStaticShapes() {

    requestAnimationFrame(() => {
        if (shapesRegistry.length) {
            if (!shapesRegistry.blur) {
                shapesRegistry.staticBackgroundCanvas.ctx.clearRect(0, 0, shapesRegistry.staticBackgroundCanvas.width, shapesRegistry.staticBackgroundCanvas.height);
                shapesRegistry.staticForegroundCanvas.ctx.clearRect(0, 0, shapesRegistry.staticForegroundCanvas.width, shapesRegistry.staticForegroundCanvas.height);
            }

            shapesRegistry.forEach(shape => {
                if (shape.boundary.a.x > shape.canvas.width.percent(110) || shape.boundary.b.x < -shape.canvas.width.percent(10)) {
                    //shapesRegistry.remove(shape);
                    return;
                }

                if (shape.boundary.a.y > shape.canvas.height.percent(110) || shape.boundary.d.y < -shape.canvas.height.percent(10)) {
                    //shapesRegistry.remove(shape);
                    return;
                }

                if (shape.visible) shape.draw(shape.canvas.ctx);
            });

        }
    });


}

export { drawStaticShapes }