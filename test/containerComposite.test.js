import { Sprite } from '../src/engine/sprite.js';
import { ContainerComposite } from '../src/engine/complex/containers/containerComposite.js';

describe('Container Composite', () => {

    let x = 10;
    let y = 10;
    let width = 200;
    let height = 200;
    let tolerance = 0.01;

    let container;

    beforeEach(() => {
        container = new ContainerComposite(x, y, width, height);
    });

    describe('construction', () => {
        it('should exist', () => {
            expect(container).to.exist;
        });
        it("should have property liquidColor", () => {
            expect(container.liquidColor).not.to.be.undefined;
            expect(container.liquidColor).not.to.be.undefined;
        });
        it("should have property drain", () => {
            expect(container.drain).not.to.be.undefined;
        });
        it("should have property fill", () => {
            expect(container.fill).not.to.be.undefined;
        });
        it("should have property addShape", () => {
            expect(container.addShape).not.to.be.undefined;
        });
        it("should have property full", () => {
            expect(container.full).not.to.be.undefined;
        });
        it("should have property empty", () => {
            expect(container.empty).not.to.be.undefined;
        });
        it("should have property liquids", () => {
            expect(container.liquids).not.to.be.undefined;
            expect(container.liquids.length).to.equal(0);
        });
        it("should have property containers", () => {
            expect(container.containers).not.to.be.undefined;
            expect(container.containers.length).to.equal(0);
        });
        it("should have property overflowStart", () => {
            expect(container.overflowStart).not.to.be.undefined;
        });
        it("should have property activeOpeningEdge", () => {
            expect(container.activeOpeningEdge).not.to.be.undefined;
        });
        it("should have property pourWidth", () => {
            expect(container.pourWidth).not.to.be.undefined;
        });
    });
    describe("methods", () => {

        let sprite1;
        let sprite2;

        beforeEach(() => {
            sprite1 = new Sprite(x, y, 100, 100);
            sprite2 = new Sprite(x, y + 100, 100, 100);
            container.addShape(sprite1);
            container.addShape(sprite2);
        });

        describe("addShape", () => {
            it("should allow the client to add a shape to the composite", () => {
                expect(container.shape[0]).to.equal(sprite1);
            });

            it("should add the containers to the containers array", () => {
                expect(container.containers.length).to.equal(2);
                expect(container.containers[0]).to.equal(sprite1);
                expect(container.containers[1]).to.equal(sprite2);
            });
        });

        describe("levelLine", () => {

            let spy1;
            let spy2;
            let spy3;
            let liquids;

            beforeEach(() => {
                liquids = container.liquids;
                spy1 = sinon.spy(liquids[0], "level");
                spy2 = sinon.spy(liquids[1], "level");
                spy3 = sinon.spy(container, "handleOverflow");
            })

            it("should equal the container's Y value by default", () => {
                expect(container.levelLine).to.equal(y);
            });
            it("should be settable and gettable", () => {
                container.levelLine = 1000;
                expect(container.levelLine).to.equal(1000);
            });
            it("should check for overflow when changed", () => {
                container.levelLine = 1000;
                expect(spy1.called).to.be.true;
                expect(spy2.called).to.be.true;
                expect(spy3.called).to.be.true;
            });
            it("should throw an error if invalid value is provided", () => {
                expect(() => { container.levelLine = "abc"; }).to.throw(Error);
            });
        });

        describe("drain", () => {

            let spy1;
            let spy2;

            beforeEach(() => {
                spy1 = sinon.spy(container.liquids[0], "level");
                spy2 = sinon.spy(container.liquids[1], "level");
            });
            it("should be full by default", () => {
                expect(container.full).to.be.true;
                expect(container.empty).to.be.false;
            });
            it("should no longer be full after drain is called with positive number", () => {
                container.drain(10);
                expect(container.full).to.be.false;
                expect(container.empty).to.be.false;
            });
            it("should be full again if drained and refilled", () => {
                container.drain(10);
                container.fill(10);
                expect(container.full).to.be.true;
                expect(container.empty).to.be.false;
            });
            it("should trigger a level on the liquid", () => {
                container.drain(10);
                expect(spy1.called).to.be.true;
                expect(spy2.called).to.be.true;
            });
        });
        describe("fill", () => {

            let spy1;
            let spy2;

            beforeEach(() => {
                container.levelLine = container.y + container.height;
                spy1 = sinon.spy(container.liquids[0], "level");
                spy2 = sinon.spy(container.liquids[1], "level");
            });
            it("should be empty by default", () => {
                expect(container.empty).to.be.true;
                expect(container.full).to.be.false;
            });
            it("should no longer be empty after fill is called with positive number", () => {
                container.fill(20);
                expect(container.empty).to.be.false;
                expect(container.full).to.be.false;
            });
            it("should be empty if filled and drained", () => {
                container.fill(10);
                container.drain(10);
                expect(container.empty).to.be.true;
                expect(container.full).to.be.false;
            });
            it("should trigger a level on the liquid", () => {
                container.fill(10);
                expect(spy1.called).to.be.true;
                expect(spy2.called).to.be.true;
            });
        });

        describe("rotate", () => {

            let liquids;
            let spy1;
            let spy2;
            let spy3;

            beforeEach(() => {
                liquids = container.liquids;
                spy1 = sinon.spy(liquids[0], "level");
                spy2 = sinon.spy(liquids[1], "level");
                spy3 = sinon.spy(container, "handleOverflow")
                container.rotate(1, container.center);
            });
            it("should should level the liquids on rotate", () => {
                expect(spy1.called).to.be.true;
                expect(spy2.called).to.be.true;
                expect(spy3.called).to.be.true;
            });
        });

        describe("orientation", () => {
            beforeEach(() => {
                container = new ContainerComposite(x, y, width, height);
                sprite1 = new Sprite(x, y, width, height);
                container.addShape(sprite1);
                sprite1.openingIndex = 0;
                container.levelLine = container.y + container.height / 2;
            });
            it("should return the correct orientation I", () => {
                container.rotate(80, container.center);
                expect(container.orientation).to.equal("I");
            });
            it("should return the correct orientation IV", () => {
                container.rotate(170, container.center);
                expect(container.orientation).to.equal("IV");
            });
            it("should return the correct orientation III", () => {
                container.rotate(260, container.center);
                expect(container.orientation).to.equal("III");
            });
            it("should return the correct orientation II", () => {
                container.rotate(350, container.center);
                expect(container.orientation).to.equal("II");
            });
        })

        describe("activeOpeningEdge", () => {

            it("should be null by default", () => {
                expect(container.activeOpeningEdge).to.be.null;
            });

            it("should be defined if openingIndex is defined on a container", () => {
                sprite1.openingIndex = 1;
                expect(container.activeOpeningEdge).not.to.be.null;
                expect(typeof container.activeOpeningEdge.x).to.equal("number");
                expect(typeof container.activeOpeningEdge.y).to.equal("number");

            });

            it("should be null if invalid openingIndex is defined on a container", () => {
                sprite1.openingIndex = 100;
                expect(container.activeOpeningEdge).to.be.null;
            });

        });

        describe("overflowing", () => {
            it("should be false by default", () => {
                expect(container.overflowing).to.be.false;
            });
            it("should be true if any part of the container is overflowing", () => {
                sprite1.overflowing = true;
                expect(container.overflowing).to.be.true;
            });
            it("should be activated by the right combination of rotation", () => {
                sprite1.openingIndex = 0;
                container.levelLine = container.y + container.height / 4;
                container.rotate(95, container.center);
                expect(container.overflowing).to.be.true;
            });
        });

        describe("liquidTop", () => {
            it("should not be null if the container not empty", () => {
                container.levelLine = sprite1.y + 10;
                expect(container.empty).to.be.false;
                expect(container.liquidTop).not.to.be.null;
            });
        })

        describe("overflowStart", () => {

            it("should be null by default", () => {
                expect(container.overflowStart).to.be.null;
            });

            it("should be defined if liquid is overflowing", () => {
                sprite1.openingIndex = 0;
                container.levelLine = container.y + container.height / 4;
                container.rotate(95, container.center);
                expect(container.overflowStart).not.to.be.null;
                expect(typeof container.overflowStart.x).to.equal("number");
                expect(typeof container.overflowStart.y).to.equal("number");
            });

            it("should be null if invalid openingIndex is defined on a container", () => {
                sprite1.openingIndex = 100;
                container.levelLine = container.y + container.height / 4;
                container.rotate(95, container.center);
                expect(container.overflowStart).to.be.null;
            });
            it("should match liquidTop.end", () => {
                sprite1.openingIndex = 1;
                container.levelLine = sprite1.y + 10;
                expect(container.overflowStart.x).to.equal(container.liquidTop.end.x);
                expect(container.overflowStart.y).to.equal(container.liquidTop.end.y);
                sprite1.rotate(350, sprite1.center);
                expect(container.overflowStart.x).to.equal(container.liquidTop.end.x);
                expect(container.overflowStart.y).to.equal(container.liquidTop.end.y);
            });
        });

        describe("pourWidth", () => {

            it("should be null by default", () => {
                expect(container.pourWidth).to.be.null;
            });

            it("should be defined if liquid is overflowing", () => {
                sprite1.openingIndex = 0;
                container.levelLine = container.y + container.height / 4;
                container.rotate(95, container.center);
                expect(container.pourWidth).not.to.be.null;
                expect(typeof container.pourWidth).to.equal("number");

            });

            it("should be null if invalid openingIndex is defined on a container", () => {
                sprite1.openingIndex = 100;
                container.levelLine = container.y + container.height / 4;
                container.rotate(95, container.center);
                expect(container.pourWidth).to.be.null;
            });

        });
    });
});