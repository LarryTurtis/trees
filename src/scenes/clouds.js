import { engine } from '../engine/engine.js';

let shapes = engine.shapesRegistry;

function rand() {
    return Math.floor(Math.random() * 255) + 1;
}

function createCloud(x) {
    let width = Math.floor(Math.random() * 250) + 50;
    x = x || -width;
    let y = Math.floor(Math.random() * engine.canvas.height);
    let height = width / 4
    let cloud = new engine.complex.Cloud(x, y, width, height, 0);
    let opacity = 1 - width / 300;
    cloud.color = "rgba(0,0,0, " + opacity + ")";
    cloud.xSpeed = height / 1000;
    cloud.ySpeed = 3;
    cloud.collidable = false;
    cloud.callback = function() {
        this.x += this.xSpeed;
    }
    shapes.add(cloud);
}


function clouds() {
    for (let i = 0; i < 25; i++) {
        createCloud(Math.random() * engine.canvas.width);
    }
    //setInterval(createCloud, 10000);
}


export { clouds };
