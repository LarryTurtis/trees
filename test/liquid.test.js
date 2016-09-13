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
        it('should have property overflowStart', () => {
            expect(liquid.overflowStart).not.to.be.undefined;
        });
        it('should have property liquidLevel', () => {
            expect(liquid.liquidLevel).not.to.be.undefined;
        });
        it("should have property _levelLine", () => {
            expect(liquid._levelLine).to.exist;
        })
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

    describe("rotate", () => {
        let spy1;

        beforeEach(() => {
            spy1 = sinon.spy(liquid, "level");
        })

        it("should call level when changed", () => {
            liquid.rotate(1, liquid.center);
            expect(spy1.called).to.be.true;
        });
    });

    describe("liquidLevel", () => {
        let spy1;

        beforeEach(() => {
            spy1 = sinon.spy(liquid, "level");
        })

        it("should be zero by default", () => {
            liquid = new Liquid(container);
            expect(liquid.liquidLevel).to.equal(0);
        });
        it("should be settable and gettable", () => {
            liquid.liquidLevel = 1000;
            expect(liquid.liquidLevel).to.equal(1000);
        });
        it("should call level when changed", () => {
            liquid.liquidLevel = 1000;
            expect(spy1.called).to.be.true;
        });
        it("should update levelLine Y values when changed", () => {
            let oldLevelLine = liquid._levelLine;
            liquid.liquidLevel = 1000;
            expect(liquid._levelLine.start.y).not.to.equal(oldLevelLine.start.y);
            expect(liquid._levelLine.end.y).not.to.equal(oldLevelLine.end.y);
        });
        it("should throw an error if invalid value is provided", () => {
            expect(() => { liquid.liquidLevel = "abc"; }).to.throw(Error);
            expect(() => { liquid.liquidLevel = -1; }).to.throw(Error);
        })
    });

});