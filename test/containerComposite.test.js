import { Sprite } from '../src/engine/sprite.js';
import { ContainerComposite } from '../src/engine/complex/containerComposite.js';

describe('Container Composite', () => {

    let x = 100;
    let y = 200;
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
            expect(container.liquidColor).to.exist;
        });
        it("should have property drain", () => {
            expect(container.drain).to.exist;
        });
        it("should have property fill", () => {
            expect(container.fill).to.exist;
        });
        it("should have property addShape", () => {
            expect(container.addShape).to.exist;
        });
        it("should have property full", () => {
            expect(container.full).to.exist;
        });
        it("should have property empty", () => {
            expect(container.empty).to.exist;
        });
        it("should have property containers", () => {
            expect(container.containers).to.exist;
            expect(container.containers.length).to.equal(0);
        });
    });
    describe("methods", () => {

        let sprite1;
        let sprite2;

        beforeEach(() => {
            sprite1 = new Sprite(0, 0, 100, 100);
            sprite2 = new Sprite(0, 0, 100, 200);
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
    });
});