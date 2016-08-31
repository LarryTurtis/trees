import { Sprite } from '../src/engine/sprite.js';
import { ComplexShape } from '../src/engine/complex/complexShape.js';

describe.only('ComplexShape', () => {

    let x = 1;
    let y = 2;
    let width = 3;
    let height = 4;
    let tolerance = 0.01;

    let complexShape;

    beforeEach(() => {
        complexShape = new ComplexShape(x, y, width, height);
    });

    describe('interface', () => {
        it('should exist', () => {
            expect(complexShape).to.exist;
        });
        it('should have the right type', () => {
            expect(complexShape.type).to.equal('ComplexShape');
        });
        it("should have a shape array", () => {
            expect(complexShape.shape).to.exist;
            expect(complexShape.shape).to.be.an.array;
            expect(complexShape.shape.length).to.equal(0);
        });
    });

    describe("member functions", () => {

        let childShape;

        beforeEach(() => {
            childShape = new Sprite();
        });

        describe("addShape", () => {

            it("should exist", () => {
                expect(complexShape.addShape).to.exist;
            });
            it("should create a relativeX property on the child shape", () => {
                expect(childShape.relativeX).to.be.undefined;
                complexShape.addShape(childShape);
                expect(childShape.relativeX).to.be.defined;
                expect(childShape.relativeX).to.be.a('number');
                expect(childShape.relativeX).not.to.be.NaN;
            });
            it("should create a relativeY property on the child shape", () => {
                expect(childShape.relativeY).to.be.undefined;
                complexShape.addShape(childShape);
                expect(childShape.relativeY).to.be.defined;
                expect(childShape.relativeY).to.be.a('number');
                expect(childShape.relativeY).not.to.be.NaN;
            });
            it("should create a relativeHeight property on the child shape", () => {
                expect(childShape.relativeHeight).to.be.undefined;
                complexShape.addShape(childShape);
                expect(childShape.relativeHeight).to.be.defined;
                expect(childShape.relativeHeight).to.be.a('number');
                expect(childShape.relativeHeight).not.to.be.NaN;
            });
            it("should create a relativeWidth property on the child shape", () => {
                expect(childShape.relativeWidth).to.be.undefined;
                complexShape.addShape(childShape);
                expect(childShape.relativeWidth).to.be.defined;
                expect(childShape.relativeWidth).to.be.a('number');
                expect(childShape.relativeWidth).not.to.be.NaN;
            });
            describe("relative calculations", () => {
                let size = 5;
                let childShape2;

                beforeEach(() => {
                    childShape2 = new Sprite(size, size, size, size);
                    complexShape.addShape(childShape2);
                });
                it("should have the right relativeX", () => {
                    expect(childShape2.relativeX).to.equal((size - x) / width);
                });
                it("should have the right relativeY", () => {
                    expect(childShape2.relativeY).to.equal((size - y) / height);
                });
                it("should have the right relativeWidth", () => {
                    expect(childShape2.relativeWidth).to.equal(size / width);
                });
                it("should have the right relativeHeight", () => {
                    expect(childShape2.relativeHeight).to.equal(size / height);
                });
            });
            it("should add the child shape to the parent shape array", () => {
                complexShape.addShape(childShape);
                expect(complexShape.shape.length).to.equal(1);
                expect(complexShape.shape[0]).to.equal(childShape);
            });
            it("should not allow adding the same child shape twice", function() {
                complexShape.addShape(childShape);
                expect(() => complexShape.addShape(childShape)).to.throw(Error);
            });
        });
        describe("other functions", () => {

            let childShape1;
            let childShape2;
            let childShape3;

            let cs1Size = 12;
            let cs2Size = 8;
            let cs3Size = 5;

            beforeEach(() => {
                childShape1 = new Sprite(cs1Size, cs1Size, cs1Size, cs1Size);
                childShape2 = new Sprite(cs2Size, cs2Size, cs2Size, cs2Size);
                childShape3 = new Sprite(cs3Size, cs3Size, cs3Size, cs3Size);
                complexShape.addShape(childShape1);
                complexShape.addShape(childShape2);
                complexShape.addShape(childShape3);
            });

            describe("removeShape", () => {
                it("should exist", () => {
                    expect(complexShape.removeShape).to.exist;
                });
                it("should remove the shape from the shape array", () => {
                    expect(complexShape.shape.length).to.equal(3);
                    complexShape.removeShape(childShape2);
                    expect(complexShape.shape.length).to.equal(2);
                });
            });

            describe("color", () => {
                it("should set the color on all child shapes", () => {
                    childShape1.color = "red";
                    childShape2.color = "white";
                    childShape3.color = "blue";
                    complexShape.color = "brown";
                    expect(childShape1.color).to.equal("brown");
                    expect(childShape2.color).to.equal("brown");
                    expect(childShape3.color).to.equal("brown");
                });
            });
            describe("lineColor", () => {
                it("should set the lineColor on all child shapes", () => {
                    childShape1.lineColor = "red";
                    childShape2.lineColor = "white";
                    childShape3.lineColor = "blue";
                    complexShape.lineColor = "brown";
                    expect(childShape1.lineColor).to.equal("brown");
                    expect(childShape2.lineColor).to.equal("brown");
                    expect(childShape3.lineColor).to.equal("brown");
                });
            });
            describe("collidable", () => {
                it("should set the collidable on all child shapes", () => {
                    childShape1.collidable = false;
                    childShape2.collidable = false;
                    childShape3.collidable = false;
                    complexShape.collidable = true;
                    expect(childShape1.collidable).to.equal(true);
                    expect(childShape2.collidable).to.equal(true);
                    expect(childShape3.collidable).to.equal(true);
                });
            });
            describe("wasClicked", () => {
                it("should call wasClicked on all child shapes", () => {
                    childShape1.wasClicked = sinon.spy();
                    childShape2.wasClicked = sinon.spy();
                    childShape3.wasClicked = sinon.spy();
                    complexShape.wasClicked();
                    expect(childShape1.wasClicked.called).to.equal(true);
                    expect(childShape2.wasClicked.called).to.equal(true);
                    expect(childShape3.wasClicked.called).to.equal(true);
                });
                it("should call wasClicked with mouse params", () => {
                    let x = 3;
                    let y = 4;
                    childShape1.wasClicked = sinon.spy();
                    childShape2.wasClicked = sinon.spy();
                    childShape3.wasClicked = sinon.spy();
                    complexShape.wasClicked(x, y);
                    expect(childShape1.wasClicked.calledWith(x, y)).to.equal(true);
                    expect(childShape2.wasClicked.calledWith(x, y)).to.equal(true);
                    expect(childShape3.wasClicked.calledWith(x, y)).to.equal(true);
                });
            });
            describe("rotate", () => {
                it("should set rotate all child shapes", () => {
                    childShape1.x = 10;
                    childShape2.x = 10;
                    childShape3.x = 10;
                    complexShape.rotate(10, complexShape.center);
                    expect(childShape1.x).not.to.equal(10);
                    expect(childShape2.x).not.to.equal(10);
                    expect(childShape2.x).not.to.equal(10);
                });
            });
            describe("change x", () => {
                it("should move x correctly for all child shapes", () => {
                    childShape1.x = 10;
                    childShape2.x = 20;
                    childShape3.x = 30;
                    complexShape.x = 25;
                    expect(complexShape.x).to.be.closeTo(25, tolerance);
                    expect(childShape1.x).to.be.closeTo(34, tolerance);
                    expect(childShape2.x).to.be.closeTo(44, tolerance);
                    expect(childShape3.x).to.be.closeTo(54, tolerance);
                });
            });
            describe("change y", () => {
                it("should move y correctly for all child shapes", () => {
                    childShape1.y = 10;
                    childShape2.y = 20;
                    childShape3.y = 30;
                    complexShape.y = 25;
                    expect(complexShape.y).to.be.closeTo(25, tolerance);
                    expect(childShape1.y).to.be.closeTo(33, tolerance);
                    expect(childShape2.y).to.be.closeTo(43, tolerance);
                    expect(childShape3.y).to.be.closeTo(53, tolerance);
                });
            });
            describe("change width", () => {
                it("should adjust width correctly for all child shapes", () => {
                    complexShape.width = 25;
                    expect(childShape1.width).to.be.closeTo(100, tolerance);
                    expect(childShape2.width).to.be.closeTo(66.66, tolerance);
                    expect(childShape3.width).to.be.closeTo(41.66, tolerance);
                });
                it("should adjust x correctly for all child shapes", () => {
                    complexShape.width = 25;
                    expect(childShape1.x).to.be.closeTo(92.66, tolerance);
                    expect(childShape2.x).to.be.closeTo(59.33, tolerance);
                    expect(childShape3.x).to.be.closeTo(34.33, tolerance);
                });
            });
            describe("change height", () => {
                it("should adjust height correctly for all child shapes", () => {
                    complexShape.height = 25;
                    expect(childShape1.height).to.be.closeTo(75, tolerance);
                    expect(childShape2.height).to.be.closeTo(50, tolerance);
                    expect(childShape3.height).to.be.closeTo(31.25, tolerance);
                });
                it("should adjust y correctly for all child shapes", () => {
                    complexShape.height = 25;
                    expect(childShape1.y).to.be.closeTo(64.5, tolerance);
                    expect(childShape2.y).to.be.closeTo(39.5, tolerance);
                    expect(childShape3.y).to.be.closeTo(20.75, tolerance);
                });
            });
        });
    });
});