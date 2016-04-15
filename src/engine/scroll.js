import { ShapesRegistry } from './shapesregistry.js'
import { Point } from './point.js';

let shapesRegistry = new ShapesRegistry();

let _scroll = new Point(0, 0);

function scroll(x, y) {
    if (x || y) {

    	let _old = _scroll;
        _scroll = new Point(x, y);
        let _diff = new Point(_scroll.x - _old.x, _scroll.y - _old.y);

        shapesRegistry.forEach(shape => {
            shape.x += _diff.x;
            shape.y += _diff.y;
        });
    }

    return _scroll;
};

export { scroll };