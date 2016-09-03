import { Sprite } from '../src/engine/sprite.js';
import { ContainerComposite } from '../src/engine/complex/containerComposite.js';

describe('Container Composite', () => {

    let x = 1;
    let y = 2;
    let width = 3;
    let height = 4;
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

            it("should make the first added container the current liquid level shape", () => {
                expect(container.liquidLevelShape).to.equal(sprite1)
            });

            it("should add the containers to the containers array", () => {
                expect(container.containers.length).to.equal(2);
                expect(container.containers[0]).to.equal(sprite1);
                expect(container.containers[1]).to.equal(sprite2);
            });
            it("should make the added sprites into containers", () => {
                expect(sprite1.type).to.equal("Container");
                expect(sprite2.type).to.equal("Container");
            });
        });

        describe("fill", () => {

            let spy1;
            let spy2;

            beforeEach(() => {
                spy1 = sinon.spy(sprite1, "fill");
                spy2 = sinon.spy(sprite2, "fill");
            });
            it("container should be full by default", () => {
                expect(container.full).to.equal(true);
            });
            it("should throw an error if fill is called without a number", () => {
                expect(() => { container.fill("abc") }).to.throw(Error);
                expect(() => { container.fill() }).to.throw(Error);
                expect(() => { container.fill([]) }).to.throw(Error);
            });
            it("should no longer be full after fill is called with positive number", () => {
                container.fill(1);
                expect(container.full).to.be.false;
                expect(container.empty).to.be.false;
            });
            it("should call fill only on the first container when amount is less than first container height", () => {
                let amount = sprite1.height / 2;
                container.fill(amount);
                expect(spy1.called).to.be.true;
                expect(spy2.called).to.be.false;
            });
            it("should call fill on both containers when amount is greater than first container height", () => {
                let amount = sprite1.height * 2;
                container.fill(amount);
                expect(spy1.called).to.be.true;
                expect(spy2.called).to.be.true;
            });


        });
    });
});
