import { trees } from './trees.js';
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
    engine.levels.push(scenes.level8);
    engine.levels.push(scenes.level9);
    scenes.level0();
}

engine.go(load);
