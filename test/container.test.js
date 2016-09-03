import { Sprite } from '../src/engine/sprite.js';
import { decorateContainer } from '../src/engine/complex/container.js';

describe('Container', () => {

    let x = 1;
    let y = 2;
    let width = 3;
    let height = 4;
    let tolerance = 0.01;

    let sprite;
    let container;

    beforeEach(() => {
        sprite = new Sprite(x, y, width, height);
    });

    describe('before decoration', () => {
        it('should exist', () => {
            expect(sprite).to.exist;
        });
        it("should not have property liquid", () => {
            expect(sprite.liquid).not.to.exist;
        });
        it("should not have property full", () => {
            expect(sprite.full).not.to.exist;
        });
        it("should not have property empty", () => {
            expect(sprite.empty).not.to.exist;
        });
        it("should not have property liquidColor", () => {
            expect(sprite.liquidColor).not.to.exist;
        });
        it("should not have property fill", () => {
            expect(sprite.fill).not.to.exist;
        });
    });
    describe('after decoration', () => {

        beforeEach(() => {
            decorateContainer(sprite);
        });

        it('should exist', () => {
            expect(sprite).to.exist;
        });
        it("should have property liquid", () => {
            expect(sprite.liquid).to.exist;
        });
        it("should have property full", () => {
            expect(sprite.full).to.exist;
        });
        it("should have property empty", () => {
            expect(sprite.empty).to.exist;
        });
        it("should have property liquidColor", () => {
            expect(sprite.liquidColor).to.exist;
        });
        it("should allow client to set liquid color correctly", () => {
            sprite.liquidColor = "orange";
            expect(sprite.liquidColor).to.equal("orange");
            expect(sprite.liquid.color).to.equal("orange");
        });
        it("should have property fill", () => {
            expect(sprite.fill).to.exist;
        });

        describe("Fill method", () => {
            it("should start out full", () => {
                expect(sprite.empty).to.be.false;
                expect(sprite.full).to.be.true;
            });
            it("should throw an error if fill amount is not a number", () => {
                expect(() => { sprite.fill("abc") }).to.throw(Error);
            });
            it("should still be full if fill method is called with 0", () => {
                sprite.fill(0);
                expect(sprite.full).to.be.true;
                expect(sprite.empty).to.be.false;
            });
            it("should still be full if fill method is called with a negative number", () => {
                sprite.fill(-1);
                expect(sprite.full).to.be.true;
                expect(sprite.empty).to.be.false;
            });
            it("should not be full if fill method is called with a positive number", () => {
                sprite.fill(1);
                expect(sprite.full).to.be.false;
                expect(sprite.empty).to.be.false;
            });
            it("should be empty if fill method is called with a positive number greater than liquid height", () => {
                let height = sprite.liquid.height + 1;
                sprite.fill(height);
                expect(sprite.full).to.be.false;
                expect(sprite.empty).to.be.true;
            });

        });
    });
});
