import { engine } from './engine/engine.js';
import { scenes } from './scenes/scenes.js';

function load() {
    scenes.mountains();
    scenes.clouds();
    scenes.spiral();
    //scenes.level1();
}


function initialize() {
    engine.go(load);
}

export { initialize };
