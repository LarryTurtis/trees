import { Sprite } from '../src/engine/sprite.js';
import { Liquid } from '../src/engine/complex/liquid.js';

describe('Liquid', () => {
    let liquid;
    let container;
    beforeEach(() => {
        container = new Sprite(100, 100, 100, 100);
        liquid = new Liquid(container);
        liquid.liquidLevel = 110;
    });
    describe('interface', () => {
        it('should exist', () => {
            expect(Liquid).to.exist;
        });
        it('should create a new object', () => {
            expect(liquid).to.exist;
            expect(liquid.type).to.equal("Liquid");
        });
        it('should have property pouringFromPoint', () => {
            expect(liquid.pouringFromPoint).not.to.be.undefined;
        });
        it("should throw an error if no parameter is supplied", () => {
            expect(() => { new Liquid() }).throws(Error);
        });
    });
    describe("level", () => {
        let oldLines;
        beforeEach(() => {
            oldLines = container.lines();
            container.rotate(10, container.center);
            liquid.level();
        });
        it("should update lines on container rotate", () => {
            expect(liquid.lines[0].end.x).not.to.equal(oldLines[0].end.x);
        });
    });
});