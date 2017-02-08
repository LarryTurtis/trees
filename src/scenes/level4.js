import { engine } from '../engine/engine.js';

function level4() {
    let shapes = engine.shapesRegistry;
    let octopus = new engine.client.Octopus(300, 300, 300, 300);
    octopus.color = "black";
    shapes.addToDynamicBackground(octopus);
}


export { level4 };