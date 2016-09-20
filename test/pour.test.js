import { Pour } from '../src/engine/complex/pour.js';
import { Rectangle } from '../src/engine/simples/rectangle.js';
import { Container } from '../src/engine/complex/container.js';
import { updateCollisions } from '../src/engine/collisions/collisionDetection.js';

describe('Pour', () => {
    let pour;
    let container;
    beforeEach(() => {
        pour = new Pour({x: 100, y: 100}, 100);
    });
    describe('interface', () => {
        it('should exist', () => {
            expect(Pour).to.exist;
        });
        it('should create a new object', () => {
            expect(pour).to.exist;
            expect(pour.type).to.equal("Pour");
        });
    });
});
