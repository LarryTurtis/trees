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
        it("should have property 'overflowing'", () => {
            expect(container.overflowing).to.exist;
            expect(container.overflowing).to.be.false;
        });
        it("should have property openingIndex", () => {
            expect(container.openingIndex).to.exist;
            expect(container.openingIndex).to.equal(-1);
        });
        it("should have property bottomIndex", () => {
            expect(container.bottomIndex).to.exist;
            expect(container.bottomIndex).to.equal(-1);
        });
        it("should have property thickness", () => {
            expect(container.thickness).to.exist;
            expect(container.thickness).to.equal(0);
        });
        it("should throw an error if no parameter is supplied", () => {
            expect(() => { new Container() }).throws(Error);
        });
    });
    describe('construction', () => {
        it('should create an innerlines array', () => {
            expect(container.innerLines).to.exist;
            expect(container.innerLines.length).to.equal(4);

        });
    });
});