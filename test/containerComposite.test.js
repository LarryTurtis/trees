import { Sprite } from '../src/engine/sprite.js';
import { ContainerComposite } from '../src/engine/complex/containerComposite.js';

describe('Container Composite', () => {

    let x = 0;
    let y = 0;
    let width = 300;
    let height = 400;
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
        it("should have property pouringFromPoint", () => {
            expect(container.pouringFromPoint).not.to.be.undefined;
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
            sprite1 = new Sprite(0, 0, 100, 100);
            sprite2 = new Sprite(0, 100, 100, 100);
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

        describe("drain", () => {

            let spy1;
            let spy2;

            it("should be full by default", () => {
                expect(container.full).to.be.true;
                expect(container.empty).to.be.false;
            });
            it("should no longer be full after drain is called with positive number", () => {
                container.drain(10);
                expect(container.full).to.be.false;
                expect(container.empty).to.be.false;
            });
        });
        describe("fill", () => {

            let spy1;
            let spy2;

            beforeEach(() => {
                container.liquidLevel = container.y + container.height;
            });
            it("should be empty by default", () => {
                expect(container.empty).to.be.true;
                expect(container.full).to.be.false;
            });
            it("should no longer be empty after fill is called with positive number", () => {
                container.fill(10);
                expect(container.empty).to.be.false;
                expect(container.full).to.be.false;
            });
        });

        describe("rotate", () => {

            let liquids;
            let spy1;
            let spy2;

            beforeEach(() => {
                liquids = container.liquids;
                spy1 = sinon.spy(liquids[0], "level");
                spy2 = sinon.spy(liquids[1], "level");
                container.rotate(1, container.center);
            });
            it("should should level the liquids on rotate", () => {
                expect(spy1.called).to.be.true;
                expect(spy2.called).to.be.true;
            });
        });

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

        describe("pouringFromPoint", () => {

            it("should be null by default", () => {
                expect(container.pouringFromPoint).to.be.null;
            });

            it("should be defined if liquid is pouring", () => {
                sprite1.openingIndex = 0;
                container.liquidLevel = container.y + container.height / 4;
                container.rotate(95, container.center);
                expect(container.pouringFromPoint).not.to.be.null;
                expect(typeof container.pouringFromPoint.x).to.equal("number");
                expect(typeof container.pouringFromPoint.y).to.equal("number");
            });

            it("should be null if invalid openingIndex is defined on a container", () => {
                sprite1.openingIndex = 100;
                container.liquidLevel = container.y + container.height / 4;
                container.rotate(95, container.center);
                expect(container.pouringFromPoint).to.be.null;
            });

            it("should be null if invalid liquidLevel is defined on a container", () => {
                sprite1.openingIndex = 100;
                container.liquidLevel = "abc";
                container.rotate(95, container.center);
                expect(container.pouringFromPoint).to.be.null;
            });

        });

        describe("pourWidth", () => {

            it("should be null by default", () => {
                expect(container.pourWidth).to.be.null;
            });

            it("should be defined if liquid is pouring", () => {
                sprite1.openingIndex = 0;
                container.liquidLevel = container.y + container.height / 4;
                container.rotate(95, container.center);
                expect(container.pourWidth).not.to.be.null;
                expect(typeof container.pourWidth).to.equal("number");

            });

            it("should be null if invalid openingIndex is defined on a container", () => {
                sprite1.openingIndex = 100;
                container.liquidLevel = container.y + container.height / 4;
                container.rotate(95, container.center);
                expect(container.pourWidth).to.be.null;
            });

            it("should be null if invalid liquidLevel is defined on a container", () => {
                sprite1.openingIndex = 100;
                container.liquidLevel = "abc";
                container.rotate(95, container.center);
                expect(container.pourWidth).to.be.null;
            });

        });
    });
});