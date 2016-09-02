import { Trapezoid } from '../src/engine/simples/trapezoid.js';

describe('Trapezoid', () => {

    let x = 0;
    let y = 0;
    let width = 300;
    let height = 400;
    let leftAngle = 75;
    let rightAngle = 75;

    let trapezoid;

    beforeEach(() => {
        trapezoid = new Trapezoid(x, y, width, height, leftAngle, rightAngle);
    });

    describe('interface', () => {
        it('should exist', () => {
            expect(trapezoid).to.exist;
        });
        it('should have the right type', () => {
            expect(trapezoid.type).to.equal('Trapezoid');
        });
        it("should have a leftAngle", () => {
            expect(trapezoid.leftAngle).to.exist;
            expect(trapezoid.leftAngle).to.equal(leftAngle);
        });
        it("should have a rightAngle", () => {
            expect(trapezoid.rightAngle).to.exist;
            expect(trapezoid.rightAngle).to.equal(rightAngle);
        });
    });
    describe("construction", () => {
        describe("when left angle is acute", () => {
            beforeEach(() => {
                trapezoid = new Trapezoid(x, y, width, height, 75, 90);
            });
            it("angles should be correct", () => {
                expect(trapezoid.topLeft.x).to.be.lessThan(trapezoid.topRight.x);
                expect(trapezoid.topLeft.x).to.be.lessThan(trapezoid.bottomLeft.x);
                expect(trapezoid.topLeft.y).to.be.lessThan(trapezoid.bottomLeft.y);
                expect(trapezoid.topLeft.y).to.be.lessThan(trapezoid.bottomRight.y);
                expect(trapezoid.topLeft.y).to.equal(trapezoid.topRight.y);
            });
        });
        describe("when left angle is obtuse", () => {
            beforeEach(() => {
                trapezoid = new Trapezoid(x, y, width, height, 100, 90);
            });
            it("angles should be correct", () => {
                expect(trapezoid.topLeft.x).to.be.lessThan(trapezoid.topRight.x);
                expect(trapezoid.topLeft.x).to.be.greaterThan(trapezoid.bottomLeft.x);
                expect(trapezoid.topLeft.y).to.be.lessThan(trapezoid.bottomLeft.y);
                expect(trapezoid.topLeft.y).to.be.lessThan(trapezoid.bottomRight.y);
                expect(trapezoid.topLeft.y).to.equal(trapezoid.topRight.y);
            });
        });
        describe("when right angle is acute", () => {
            beforeEach(() => {
                trapezoid = new Trapezoid(x, y, width, height, 90, 75);
            });
            it("angles should be correct", () => {
                expect(trapezoid.topRight.x).to.be.greaterThan(trapezoid.topLeft.x);
                expect(trapezoid.topRight.x).to.be.greaterThan(trapezoid.bottomRight.x);
                expect(trapezoid.topRight.y).to.be.lessThan(trapezoid.bottomLeft.y);
                expect(trapezoid.topRight.y).to.be.lessThan(trapezoid.bottomRight.y);
                expect(trapezoid.topRight.y).to.equal(trapezoid.topLeft.y);
            });
        });
        describe("when right angle is obtuse", () => {
            beforeEach(() => {
                trapezoid = new Trapezoid(x, y, width, height, 90, 100);
            });
            it("angles should be correct", () => {
                expect(trapezoid.topRight.x).to.be.greaterThan(trapezoid.topLeft.x);
                expect(trapezoid.topRight.x).to.be.lessThan(trapezoid.bottomRight.x);
                expect(trapezoid.topRight.y).to.be.lessThan(trapezoid.bottomLeft.y);
                expect(trapezoid.topRight.y).to.be.lessThan(trapezoid.bottomRight.y);
                expect(trapezoid.topRight.y).to.equal(trapezoid.topLeft.y);
            });
        });
        describe("When angles are too sharp or not sharp enough to make trapezoid", () => {
            it("should throw an error", () => {
                expect(() => {trapezoid = new Trapezoid(x, y, width, height, 60, 60);}).to.throw(Error);
                expect(() => {trapezoid = new Trapezoid(x, y, width, height, 160, 160);}).to.throw(Error);
            });
        });

    });
});
