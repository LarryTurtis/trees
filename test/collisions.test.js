import { Pour } from '../src/engine/complex/pour.js';
import { Rectangle } from '../src/engine/simples/rectangle.js';
import { Container } from '../src/engine/complex/container.js';
import { updateCollisions } from '../src/engine/collisions/collisionDetection.js';
import { ShapesRegistry } from '../src/engine/shapesregistry.js';

let shapesRegistry = new ShapesRegistry();

describe('pour collisions', () => {
    let pour;
    let container;
    let rectangle;
    let spy;

    beforeEach(() => {
        pour = new Pour(100, 100, 100, 10);
        pour.collidable = true;
        rectangle = new Rectangle(100, 300, 200, 200);
        container = new Container(rectangle);
        rectangle.openingIndex = 1;
        shapesRegistry.add(container);
        shapesRegistry.add(pour)
    });

    it('should not have any collisions to start', () => {
        let collisions = updateCollisions(pour);
        expect(collisions.length).to.equal(0);
    });
});
