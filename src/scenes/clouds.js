import { engine } from '../engine/engine.js';

let shapes = engine.shapesRegistry;

function createCloud() {
    let width = Math.floor(Math.random() * 250) + 50;
    let y = Math.floor(Math.random() * engine.canvas.height);
    let height = width / 4
    let cloud = new engine.complex.Cloud(-width, y, width, height, 0);
    cloud.color = "black";
    cloud.xSpeed = height / 50;
    cloud.collidable = false;
    shapes.add(cloud);
}

engine.callback = function() {
    shapes.forEach(shape => {
    	if (shape.type === "Cloud") {
    		shape.x += shape.xSpeed;
    	}
    })
}

function clouds() {
    setInterval(createCloud, 2000);
}


export { clouds };
