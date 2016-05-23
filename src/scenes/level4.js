import { engine } from '../engine/engine.js';

function octopus() {
    let shapes = engine.shapesRegistry;
    let octopus = new engine.complex.Octopus(300, 300, 300, 300, 0);
    octopus.color = "black";
    shapes.add(octopus);
}


export { octopus };
