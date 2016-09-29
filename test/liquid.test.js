import { Sprite } from '../src/engine/sprite.js';
import { Container } from '../src/engine/complex/containers/container.js';
import { Liquid } from '../src/engine/complex/containers/liquid.js';

let tolerance = 0.001;

describe('Liquid', () => {
    let liquid;
    let container;
    beforeEach(() => {
        container = Container(new Sprite(100, 100, 100, 100));
        container.openingIndex = 3;
        liquid = new Liquid(container);
        liquid.levelLine.y = 110;
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
        it("should have property levelLine", () => {
            expect(liquid.levelLine).not.to.be.undefined;
        })
        it("should throw an error if no parameter is supplied", () => {
            expect(() => { new Liquid() }).throws(Error);
        });
    });
    describe("construction", () => {
        it("should have a container", () => {
            expect(liquid.container).to.exist;
            expect(liquid.container).to.equal(container);
        });
        it("container should have lines", () => {
            expect(liquid.container.lines()).to.exist;
            expect(liquid.container.lines().length).to.equal(4);
        })
        it("container should have inner lines", () => {
            expect(liquid.container.innerLines).to.exist;
            expect(liquid.container.innerLines.length).to.equal(4);
        })
    })
    describe("level", () => {
        let oldLines;
        beforeEach(() => {
            oldLines = liquid.lines[0].end.x;
            container.rotate(10, container.center);
            liquid.level();
        });
        it("should update lines on container rotate", () => {
            expect(liquid.lines[0].end.x).not.to.equal(oldLines);
        });
        it("should correctly update the liquid lines", () => {
            container.rotate(10, container.center);
            expect(liquid.lines[0].start.x).to.be.closeTo(207.824, tolerance);
            expect(liquid.lines[0].start.y).to.be.closeTo(110, tolerance);
            expect(liquid.lines[0].end.x).to.be.closeTo(190.558, tolerance);
            expect(liquid.lines[0].end.y).to.be.closeTo(207.922, tolerance);
            expect(liquid.lines[1].start.x).to.be.closeTo(190.558, tolerance);
            expect(liquid.lines[1].start.y).to.be.closeTo(207.922, tolerance);
            expect(liquid.lines[1].end.x).to.be.closeTo(92.077, tolerance);
            expect(liquid.lines[1].end.y).to.be.closeTo(190.557, tolerance);
            expect(liquid.lines[2].start.x).to.be.closeTo(92.077, tolerance);
            expect(liquid.lines[2].start.y).to.be.closeTo(190.557, tolerance);
            expect(liquid.lines[2].end.x).to.be.closeTo(106.281, tolerance);
            expect(liquid.lines[2].end.y).to.be.closeTo(110, tolerance);
            expect(liquid.lines[3]).not.to.exist;
            expect(liquid.container.overflowing).to.be.true;
        });
        it("should correctly update overflowing", () => {
            container.rotate(25, container.center);
            expect(liquid.container.overflowing).to.be.true;
        })
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

    describe("levelLine", () => {
        let spy1;

        beforeEach(() => {
            spy1 = sinon.spy(liquid, "level");
        })

        it("should be zero by default", () => {
            liquid = new Liquid(container);
            expect(liquid.levelLine.start.y).to.equal(container.y);
            expect(liquid.levelLine.end.y).to.equal(container.y);
        });
        it("should be settable and gettable", () => {
            liquid.levelLine = 1000;
            expect(liquid.levelLine).to.equal(1000);
        });
        it("should not call level when changed", () => {
            liquid.levelLine = 1000;
            expect(spy1.called).to.be.false;
        });
        it("should update levelLine Y values when changed", () => {
            let oldLevelLine = liquid.levelLine.start.y;
            liquid.levelLine.y = 1000;
            expect(liquid.levelLine.start.y).not.to.equal(oldLevelLine);
            expect(liquid.levelLine.end.y).not.to.equal(oldLevelLine);
        });
    });

});