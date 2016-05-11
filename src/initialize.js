import { engine } from './engine/engine.js';
import { scenes } from './scenes/scenes.js';

function load() {

    scenes.clouds();
    //scenes.octopus();

}

function initialize() {
    engine.go(load);
}

export { initialize };
