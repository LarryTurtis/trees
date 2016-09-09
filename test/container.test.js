import { Sprite } from '../src/engine/sprite.js';
import { Container } from '../src/engine/complex/container.js';

describe('Container', () => {
    let container;
    let shape;

    beforeEach(() => {
        shape = new Sprite(100, 100, 100, 100);
        container = new Container(shape);
    });
    describe('interface', () => {
        it('should exist', () => {
            expect(Container).to.exist;
        });
        it('should create a new object', () => {
            expect(container).to.exist;
            expect(container.type).to.equal("Container");
        });
        it("should have property 'pouring'", () => {
            expect(container.pouring).to.exist;
            expect(container.pouring).to.be.false;
        });
        it("should have property openingIndex", () => {
            expect(container.openingIndex).to.exist;
            expect(container.openingIndex).to.equal(-1);
        });
        it("should throw an error if no parameter is supplied", () => {
            expect(() => { new Container() }).throws(Error);
        });
    });
});