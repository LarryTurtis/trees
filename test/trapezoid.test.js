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
                expect(() => { trapezoid = new Trapezoid(x, y, width, height, 60, 60); }).to.throw(Error);
                expect(() => { trapezoid = new Trapezoid(x, y, width, height, 160, 160); }).to.throw(Error);
            });
        });
    });

    describe("rotation", () => {
        describe("positive rotation around center", () => {
            beforeEach(() => {
                trapezoid.rotate(90, trapezoid.center);
            })
            it("should rotate the topLeft", () => {
                let point = { x: 350, y: 50 };
                checkPoint(trapezoid, "topLeft", point);
            });
            it("should rotate the topRight", () => {
                let point = { x: 350, y: 350 };
                checkPoint(trapezoid, "topRight", point);
            });
            it("should rotate the bottomLeft", () => {
                let point = { x: -50, y: 157.17967 };
                checkPoint(trapezoid, "bottomLeft", point);
            });
            it("should rotate the bottomRight", () => {
                let point = { x: -50, y: 242.82032 };
                checkPoint(trapezoid, "bottomRight", point);
            });
        });
        describe("negative rotation around center", () => {
            beforeEach(() => {
                trapezoid.rotate(-90, trapezoid.center);
            })
            it("should rotate the topLeft", () => {
                let point = { x: -50, y: 350 };
                checkPoint(trapezoid, "topLeft", point);
            });
            it("should rotate the topRight", () => {
                let point = { x: -50, y: 50 };
                checkPoint(trapezoid, "topRight", point);
            });
            it("should rotate the bottomLeft", () => {
                let point = { x: 350, y: 242.82032 };
                checkPoint(trapezoid, "bottomLeft", point);
            });
            it("should rotate the bottomRight", () => {
                let point = { x: 350, y: 157.17967 };
                checkPoint(trapezoid, "bottomRight", point);
            });
        });
        describe("positive rotation around arbitrary point", () => {
            beforeEach(() => {
                trapezoid.rotate(90, trapezoid.d);
            })
            it("should rotate the topLeft", () => {
                let point = { x: 400, y: 400 };
                checkPoint(trapezoid, "topLeft", point);
            });
            it("should rotate the topRight", () => {
                let point = { x: 400, y: 700 };
                checkPoint(trapezoid, "topRight", point);
            });
            it("should rotate the bottomLeft", () => {
                let point = { x: 0, y: 507.17967 };
                checkPoint(trapezoid, "bottomLeft", point);
            });
            it("should rotate the bottomRight", () => {
                let point = { x: 0, y: 592.82032 };
                checkPoint(trapezoid, "bottomRight", point);
            });
        });
        describe("negative rotation around arbitrary point", () => {
            beforeEach(() => {
                trapezoid.rotate(-90, trapezoid.d);
            })
            it("should rotate the topLeft", () => {
                let point = { x: -400, y: 400 };
                checkPoint(trapezoid, "topLeft", point);
            });
            it("should rotate the topRight", () => {
                let point = { x: -400, y: 100 };
                checkPoint(trapezoid, "topRight", point);
            });
            it("should rotate the bottomLeft", () => {
                let point = { x: 0, y: 292.82032 };
                checkPoint(trapezoid, "bottomLeft", point);
            });
            it("should rotate the bottomRight", () => {
                let point = { x: 0, y: 207.17967 };
                checkPoint(trapezoid, "bottomRight", point);
            });
        });
    });
});

function checkPoint(obj, key, value) {
    expect(obj[key].x).to.be.closeTo(value.x, 0.001);
    expect(obj[key].y).to.be.closeTo(value.y, 0.001);
}
