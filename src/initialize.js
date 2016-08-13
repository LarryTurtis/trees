import { engine } from './engine/engine.js';
import { scenes } from './scenes/scenes.js';

function load() {
    engine.levels.push(scenes.level0);
    engine.levels.push(scenes.level1);
    engine.levels.push(scenes.level2);
    engine.levels.push(scenes.level3);
    engine.levels.push(scenes.level4);
    engine.levels.push(scenes.level5);
    engine.levels.push(scenes.level6);
    engine.levels.push(scenes.level7);
    scenes.level8();
}


function initialize() {
    engine.go(load);
}

export { initialize };
