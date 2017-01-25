import { trees } from './trees.js';
import { engine } from './engine/engine.js';
import { scenes } from './scenes/scenes.js';

function load() {
    scenes.level0();
}

engine.go(load);
