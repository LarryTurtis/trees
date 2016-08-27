import { Sprite } from "../src/engine/sprite.js";

describe("Sprite", function() {

    let sprite;

    let x = 1;
    let y = 2;
    let width = 3;
    let height = 4;

    beforeEach(function() {
        sprite = new Sprite(x, y, width, height);
    })

    describe("interface", () => {
        it("should exist", () => {
            expect(Sprite).to.exist;
        });
        it("should create an object", () => {
            expect(sprite).to.exist;
        });
        it("should have an x", () => {
            expect(sprite.x).to.exist;
            expect(sprite.x).to.equal(1);
        });
        it("should have a y", () => {
            expect(sprite.y).to.exist;
            expect(sprite.y).to.equal(2);
        });
        it("should have a width", () => {
            expect(sprite.width).to.exist;
            expect(sprite.width).to.equal(3);
        });
        it("should have a height", () => {
            expect(sprite.height).to.exist;
            expect(sprite.height).to.equal(4);
        });
        it("should have an angle of zero when no angle is supplied", () => {
            expect(sprite.angle).to.exist;
            expect(sprite.angle).to.equal(0);
        });
        it("should have the correct angle when supplied", () => {
            sprite = new Sprite(x, y, width, height, 10);
            expect(sprite.angle).to.equal(10);
        })
    });
    describe("construction", () => {
        it("should have a color", () => {
            expect(sprite.color).to.exist;
            expect(sprite.color).to.equal("transparent");
        });
        it("should not have a line color if not supplied", () => {
            expect(sprite.lineColor).to.be.null;
        });
        it("should have a line color if supplied", () => {
            sprite.lineColor = "red";
            expect(sprite.lineColor).to.exist;
            expect(sprite.lineColor).to.equal("red");
        });
        it("should have a line width of 1 on initialization", () => {
            expect(sprite.lineWidth).to.exist;
            expect(sprite.lineWidth).to.equal(1);
        });
        it("should not be collidable", () => {
            expect(sprite.collidable).to.be.false;
        });
        it("should not be colliding with anything", () => {
            expect(sprite.collidingWith).to.be.null;
        });
        it("should not have an id", () => {
            expect(sprite.id).to.be.null;
        });
        it("should not show bounding boxes by default", () => {
            expect(sprite.showBoundingBox).to.be.false;
        });
    });
    describe("member functions", () => {
        describe("draw", () => {
            let ctx = {};

            it("should exist", () => {
                expect(sprite.draw).to.exist;
                expect(sprite.draw).to.be.a.function;
            });
            beforeEach(() => {
                sprite.draw(ctx);
            })
            it("should set fillStyle by default", () => {
                expect(ctx.fillStyle).to.exist;
                expect(ctx.fillStyle).to.equal(sprite.color);
            });
            it("should set strokeStyle by default", () => {
                expect(ctx.strokeStyle).to.equal(sprite.lineColor);
            });
            it("should set lineWidth by default", () => {
                expect(ctx.lineWidth).to.exist;
                expect(ctx.lineWidth).to.equal(sprite.lineWidth);
            });
            it("should set lineJoin by default", () => {
                expect(ctx.lineJoin).to.exist;
                expect(ctx.lineJoin).to.equal("miter");
            });
        });
        describe("rotate", () => {
            it("should exist", () => {
                expect(sprite.rotate).to.exist;
                expect(sprite.rotate).to.be.a.function;
            });
            describe("positive rotation around center", () => {
                beforeEach(() => {
                    sprite.rotate(90, sprite.center);
                })
                it("should rotate the origin", () => {
                    let point = { x: 4.5, y: 2.5 };
                    checkPoint(sprite, "origin", point);
                });
                it("move x and y to the new origin", () => {
                    let point = { x: 4.5, y: 2.5 };
                    expect(sprite.x).to.equal(point.x);
                    expect(sprite.y).to.equal(point.y);
                });
                it("should rotate point a", () => {
                    let point = { x: 4.5, y: 2.5 };
                    checkPoint(sprite, "a", point);
                });
                it("should rotate point b", () => {
                    let point = { x: 4.5, y: 5.5 };
                    checkPoint(sprite, "b", point);
                });
                it("should rotate point c", () => {
                    let point = { x: 0.5, y: 5.5 };
                    checkPoint(sprite, "c", point);
                });
                it("should rotate point d", () => {
                    let point = { x: 0.5, y: 2.5 };
                    checkPoint(sprite, "d", point);
                });
                it("should rotate the center", () => {
                    let point = { x: 2.5, y: 4 };
                    checkPoint(sprite, "center", point);
                });
                describe("boundaries", () => {
                    it("should update boundary a", () => {
                        let point = { x: 0.5, y: 2.5 };
                        checkPoint(sprite.boundary, "a", point);
                    });
                    it("should update boundary b", () => {
                        let point = { x: 4.5, y: 2.5 };
                        checkPoint(sprite.boundary, "b", point);
                    });
                    it("should update boundary c", () => {
                        let point = { x: 4.5, y: 5.5 };
                        checkPoint(sprite.boundary, "c", point);
                    });
                    it("should update boundary d", () => {
                        let point = { x: 0.5, y: 5.5 };
                        checkPoint(sprite.boundary, "d", point);
                    });
                });
            });
            describe("negative rotation around center", () => {
                beforeEach(() => {
                    sprite.rotate(-90, sprite.center);
                })
                it("should rotate the origin", () => {
                    let point = { x: 0.5, y: 5.5 };
                    checkPoint(sprite, "origin", point);
                });
                it("move x and y to the new origin", () => {
                    let point = { x: 0.5, y: 5.5 };
                    expect(sprite.x).to.equal(point.x);
                    expect(sprite.y).to.equal(point.y);
                });
                it("should rotate point a", () => {
                    let point = { x: 0.5, y: 5.5 };
                    checkPoint(sprite, "a", point);
                });
                it("should rotate point b", () => {
                    let point = { x: 0.5, y: 2.5 };
                    checkPoint(sprite, "b", point);
                });
                it("should rotate point c", () => {
                    let point = { x: 4.5, y: 2.5 };
                    checkPoint(sprite, "c", point);
                });
                it("should rotate point d", () => {
                    let point = { x: 4.5, y: 5.5 };
                    checkPoint(sprite, "d", point);
                });
                it("should rotate the center", () => {
                    let point = { x: 2.5, y: 4 };
                    checkPoint(sprite, "center", point);
                });
                describe("boundaries", () => {
                    it("should update boundary a", () => {
                        let point = { x: 0.5, y: 2.5 };
                        checkPoint(sprite.boundary, "a", point);
                    });
                    it("should update boundary b", () => {
                        let point = { x: 4.5, y: 2.5 };
                        checkPoint(sprite.boundary, "b", point);
                    });
                    it("should update boundary c", () => {
                        let point = { x: 4.5, y: 5.5 };
                        checkPoint(sprite.boundary, "c", point);
                    });
                    it("should update boundary d", () => {
                        let point = { x: 0.5, y: 5.5 };
                        checkPoint(sprite.boundary, "d", point);
                    });
                });
            });
        });
    });
    describe("Points", () => {
        it("should have an 'a' point", () => {
            expect(sprite.a).to.exist;
        });
        it("should have point 'a' in the upper left corner", () => {
            let point = { "x": x, "y": y };
            checkPoint(sprite, "a", point);
        });
        it("should have a 'b' point", () => {
            expect(sprite.b).to.exist;
        });
        it("should have point 'b' in the upper right corner", () => {
            let point = { "x": x + width, "y": y };
            checkPoint(sprite, "b", point);
        });
        it("should have a 'c' point", () => {
            expect(sprite.c).to.exist;
        });
        it("should have point 'c' in the lower right corner", () => {
            let point = { "x": x + width, "y": y + height };
            checkPoint(sprite, "c", point);
        });
        it("should have a 'd' point", () => {
            expect(sprite.d).to.exist;
        });
        it("should have point 'd' in the lower left corner", () => {
            let point = { "x": x, "y": y + height };
            checkPoint(sprite, "d", point);
        });
        it("should have a center point", () => {
            expect(sprite.center).to.exist;
        });
        it("should have the center in the center", () => {
            let point = { "x": x + width / 2, "y": y + height / 2 };
            checkPoint(sprite, "center", point);
        });
    });
});

function checkPoint(obj, key, value) {
    expect(obj[key].x).to.equal(value.x);
    expect(obj[key].y).to.equal(value.y);
}