import { engine } from '../engine/engine.js';

function level7() {
    let shapes = engine.shapesRegistry;

    let wheel = new engine.client.WaterWheel(300,300,300,300);
   // wheel.color = "black";
    shapes.addToDynamicBackground(wheel);

    let rect = new engine.simples.Rectangle(0, 600, shapes.staticBackgroundCanvas.width, shapes.staticBackgroundCanvas.height - 600);
    rect.color = "blue";
    shapes.addToDynamicBackground(rect);

    wheel.callback = function() {
        this.rotate(0.4, this.center);
        this.shape.forEach(shape => {
        	if (shape.type === "Cup" && shape.y + shape.height > 620) {
        		shape.fill(1);
        	}
        })
    }
}


export { level7 };