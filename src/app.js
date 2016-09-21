import { trees } from './trees.js';
import { engine } from './engine/engine.js';
import { scenes } from './scenes/scenes.js';

function load() {
    engine.levels.push(scenes.level0);
    engine.levels.push(scenes.level2);
    engine.levels.push(scenes.level3);
    engine.levels.push(scenes.level4);
    engine.levels.push(scenes.level5);
    engine.levels.push(scenes.level6);
    engine.levels.push(scenes.level7);
    engine.levels.push(scenes.level8);
    engine.levels.push(scenes.level9);
    scenes.level9();
}

Array.prototype.move = function(old_index, new_index) {
    if (new_index >= this.length) {
        var k = new_index - this.length;
        while ((k--) + 1) {
            this.push(undefined);
        }
    }
    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
}

engine.go(load);
