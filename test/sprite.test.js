import { Sprite } from "../src/engine/sprite.js";

describe("Sprite", function() {

    let sprite;

    let x = 1;
    let y = 2;
    let width = 3;
    let height = 4;

    beforeEach(function() {
        sprite = new Sprite(x, y, width, height);
    });

    afterEach(function() {
        sprite = new Sprite(x, y, width, height);
    });

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
    });
    describe("construction", () => {
        it("should initialize to zero if any arguments are missing", () => {
            sprite = new Sprite();
            expect(sprite.width).to.equal(0);
            expect(sprite.height).to.equal(0);
            expect(sprite.x).to.equal(0);
            expect(sprite.y).to.equal(0);
        });
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
            describe("positive rotation around arbitrary point", () => {
                beforeEach(() => {
                    sprite.rotate(90, sprite.c);
                })
                it("should rotate the origin", () => {
                    let point = { x: 8, y: 3 };
                    checkPoint(sprite, "origin", point);
                });
                it("move x and y to the new origin", () => {
                    let point = { x: 8, y: 3 };
                    expect(sprite.x).to.be.closeTo(point.x, 0.001);
                    expect(sprite.y).to.be.closeTo(point.y, 0.001);
                });
                it("should rotate point a", () => {
                    let point = { x: 8, y: 3 };
                    checkPoint(sprite, "a", point);
                });
                it("should rotate point b", () => {
                    let point = { x: 8, y: 6 };
                    checkPoint(sprite, "b", point);
                });
                it("should rotate point c", () => {
                    let point = { x: 4, y: 6 };
                    checkPoint(sprite, "c", point);
                });
                it("should rotate point d", () => {
                    let point = { x: 4, y: 3 };
                    checkPoint(sprite, "d", point);
                });
                it("should rotate the center", () => {
                    let point = { x: 6, y: 4.5 };
                    checkPoint(sprite, "center", point);
                });
                describe("boundaries", () => {
                    it("should update boundary a", () => {
                        let point = { x: 4, y: 3 };
                        checkPoint(sprite.boundary, "a", point);
                    });
                    it("should update boundary b", () => {
                        let point = { x: 8, y: 3 };
                        checkPoint(sprite.boundary, "b", point);
                    });
                    it("should update boundary c", () => {
                        let point = { x: 8, y: 6 };
                        checkPoint(sprite.boundary, "c", point);
                    });
                    it("should update boundary d", () => {
                        let point = { x: 4, y: 6 };
                        checkPoint(sprite.boundary, "d", point);
                    });
                });
            });
        });
        describe("change width on non-rotated sprite", () => {
            let addedWidth = 10;
            it("should correctly change the width", () => {
                sprite.width += addedWidth;
                expect(sprite.width).to.equal(width + addedWidth);
            });
            it("should not change point a", () => {
                let oldX = sprite.a.x;
                let oldY = sprite.a.y;
                sprite.width += addedWidth;
                checkPoint(sprite, "a", { x: oldX, y: oldY });
            });
            it("should not change point d", () => {
                let oldX = sprite.d.x;
                let oldY = sprite.d.y;
                sprite.width += addedWidth;
                checkPoint(sprite, "d", { x: oldX, y: oldY });
            });
            it("should change point b", () => {
                let oldX = sprite.b.x;
                let oldY = sprite.b.y;
                sprite.width += addedWidth;
                checkPoint(sprite, "b", { x: oldX + addedWidth, y: oldY });
            });
            it("should change point c", () => {
                let oldX = sprite.c.x;
                let oldY = sprite.c.y;
                sprite.width += addedWidth;
                checkPoint(sprite, "c", { x: oldX + addedWidth, y: oldY });
            });
            it("should not change boundary a", () => {
                let oldX = sprite.boundary.a.x;
                let oldY = sprite.boundary.a.y;
                sprite.width += addedWidth;
                checkPoint(sprite.boundary, "a", { x: oldX, y: oldY });
            });
            it("should not change boundary d", () => {
                let oldX = sprite.boundary.d.x;
                let oldY = sprite.boundary.d.y;
                sprite.width += addedWidth;
                checkPoint(sprite.boundary, "d", { x: oldX, y: oldY });
            });
            it("should change boundary b", () => {
                let oldX = sprite.boundary.b.x;
                let oldY = sprite.boundary.b.y;
                sprite.width += addedWidth;
                checkPoint(sprite.boundary, "b", { x: oldX + addedWidth, y: oldY });
            });
            it("should change boundary c", () => {
                let oldX = sprite.boundary.c.x;
                let oldY = sprite.boundary.c.y;
                sprite.width += addedWidth;
                checkPoint(sprite.boundary, "c", { x: oldX + addedWidth, y: oldY });
            });
            it("should update the sprite's center", () => {
                let oldX = sprite.center.x;
                let oldY = sprite.center.y;
                sprite.width += addedWidth;
                checkPoint(sprite, "center", { x: oldX + addedWidth / 2, y: oldY });
            })
        });
        describe("change width on rotated sprite", () => {
            let addedWidth = 10;
            beforeEach(() => {
                sprite.rotate(90, sprite.center);
            })
            it("should correctly change the width", () => {
                sprite.width += addedWidth;
                expect(sprite.width).to.equal(width + addedWidth);
            });
            it("should not change point a", () => {
                let oldX = sprite.a.x;
                let oldY = sprite.a.y;
                sprite.width += addedWidth;
                checkPoint(sprite, "a", { x: oldX, y: oldY });
            });
            it("should not change point d", () => {
                let oldX = sprite.d.x;
                let oldY = sprite.d.y;
                sprite.width += addedWidth;
                checkPoint(sprite, "d", { x: oldX, y: oldY });
            });
            it("should change point b", () => {
                sprite.width += addedWidth;
                checkPoint(sprite, "b", { x: 4.5, y: 15.5 });
            });
            it("should change point c", () => {
                sprite.width += addedWidth;
                checkPoint(sprite, "c", { x: 0.5, y: 15.5 });
            });
            it("should change boundary a", () => {
                sprite.width += addedWidth;
                checkPoint(sprite.boundary, "a", { x: 0.5, y: 2.5 });
            });
            it("should change boundary d", () => {
                sprite.width += addedWidth;
                checkPoint(sprite.boundary, "d", { x: 0.5, y: 15.5 });
            });
            it("should change boundary b", () => {
                let oldY = sprite.boundary.b.y;
                sprite.width += addedWidth;
                checkPoint(sprite.boundary, "b", { x: 4.5, y: oldY });
            });
            it("should change boundary c", () => {
                sprite.width += addedWidth;
                checkPoint(sprite.boundary, "c", { x: 4.5, y: 15.5 });
            });
            it("should update the sprite's center", () => {
                let oldX = sprite.center.x;
                let oldY = sprite.center.y;
                sprite.width += addedWidth;
                checkPoint(sprite, "center", { x: 2.5, y: 9 });
            })
        });
        describe("change height on non-rotated sprite", () => {
            let addedHeight = 10;
            it("should correctly change the height", () => {
                sprite.height += addedHeight;
                expect(sprite.height).to.equal(height + addedHeight);
            });
            it("should not change point a", () => {
                let oldX = sprite.a.x;
                let oldY = sprite.a.y;
                sprite.height += addedHeight;
                checkPoint(sprite, "a", { x: oldX, y: oldY });
            });
            it("should change point d", () => {
                let oldX = sprite.d.x;
                let oldY = sprite.d.y;
                sprite.height += addedHeight;
                checkPoint(sprite, "d", { x: oldX, y: oldY + addedHeight });
            });
            it("should not change point b", () => {
                let oldX = sprite.b.x;
                let oldY = sprite.b.y;
                sprite.height += addedHeight;
                checkPoint(sprite, "b", { x: oldX, y: oldY });
            });
            it("should change point c", () => {
                let oldX = sprite.c.x;
                let oldY = sprite.c.y;
                sprite.height += addedHeight;
                checkPoint(sprite, "c", { x: oldX, y: oldY + addedHeight });
            });
            it("should not change boundary a", () => {
                let oldX = sprite.boundary.a.x;
                let oldY = sprite.boundary.a.y;
                sprite.height += addedHeight;
                checkPoint(sprite.boundary, "a", { x: oldX, y: oldY });
            });
            it("should change boundary d", () => {
                let oldX = sprite.boundary.d.x;
                let oldY = sprite.boundary.d.y;
                sprite.height += addedHeight;
                checkPoint(sprite.boundary, "d", { x: oldX, y: oldY + addedHeight });
            });
            it("should not change boundary b", () => {
                let oldX = sprite.boundary.b.x;
                let oldY = sprite.boundary.b.y;
                sprite.height += addedHeight;
                checkPoint(sprite.boundary, "b", { x: oldX, y: oldY });
            });
            it("should change boundary c", () => {
                let oldX = sprite.boundary.c.x;
                let oldY = sprite.boundary.c.y;
                sprite.height += addedHeight;
                checkPoint(sprite.boundary, "c", { x: oldX, y: oldY + addedHeight });
            });
            it("should update the sprite's center", () => {
                let oldX = sprite.center.x;
                let oldY = sprite.center.y;
                sprite.height += addedHeight;
                checkPoint(sprite, "center", { x: oldX, y: oldY + addedHeight / 2 });
            })
        });
        describe("change height on rotated sprite", () => {
            let addedHeight = 10;
            beforeEach(() => {
                sprite.rotate(90, sprite.center);
            })
            it("should correctly change the height", () => {
                sprite.height += addedHeight;
                expect(sprite.height).to.equal(height + addedHeight);
            });
            it("should not change point a", () => {
                let oldX = sprite.a.x;
                let oldY = sprite.a.y;
                sprite.height += addedHeight;
                checkPoint(sprite, "a", { x: oldX, y: oldY });
            });
            it("should change point d", () => {
                let oldX = sprite.d.x;
                let oldY = sprite.d.y;
                sprite.height += addedHeight;
                checkPoint(sprite, "d", { x: -9.5, y: oldY });
            });
            it("should change point b", () => {
                sprite.height += addedHeight;
                checkPoint(sprite, "b", { x: 4.5, y: 5.5 });
            });
            it("should change point c", () => {
                sprite.height += addedHeight;
                checkPoint(sprite, "c", { x: -9.5, y: 5.5 });
            });
            it("should change boundary a", () => {
                sprite.height += addedHeight;
                checkPoint(sprite.boundary, "a", { x: -9.5, y: 2.5 });
            });
            it("should change boundary d", () => {
                sprite.height += addedHeight;
                checkPoint(sprite.boundary, "d", { x: -9.5, y: 5.5 });
            });
            it("should change boundary b", () => {
                let oldY = sprite.boundary.b.y;
                sprite.height += addedHeight;
                checkPoint(sprite.boundary, "b", { x: 4.5, y: oldY });
            });
            it("should change boundary c", () => {
                sprite.height += addedHeight;
                checkPoint(sprite.boundary, "c", { x: 4.5, y: 5.5 });
            });
            it("should update the sprite's center", () => {
                let oldX = sprite.center.x;
                let oldY = sprite.center.y;
                sprite.height += addedHeight;
                checkPoint(sprite, "center", { x: -2.5, y: 4 });
            })
        });
        describe("change x on non-rotated sprite", () => {
            let addedX = 10;
            it("should correctly change the x", () => {
                sprite.x += addedX;
                expect(sprite.x).to.equal(x + addedX);
            });
            it("should change point a", () => {
                let oldX = sprite.a.x;
                let oldY = sprite.a.y;
                sprite.x += addedX;
                checkPoint(sprite, "a", { x: oldX + addedX, y: oldY });
            });
            it("should change point d", () => {
                let oldX = sprite.d.x;
                let oldY = sprite.d.y;
                sprite.x += addedX;
                checkPoint(sprite, "d", { x: oldX + addedX, y: oldY });
            });
            it("should change point b", () => {
                let oldX = sprite.b.x;
                let oldY = sprite.b.y;
                sprite.x += addedX;
                checkPoint(sprite, "b", { x: oldX + addedX, y: oldY });
            });
            it("should change point c", () => {
                let oldX = sprite.c.x;
                let oldY = sprite.c.y;
                sprite.x += addedX;
                checkPoint(sprite, "c", { x: oldX + addedX, y: oldY });
            });
            it("should change boundary a", () => {
                let oldX = sprite.boundary.a.x;
                let oldY = sprite.boundary.a.y;
                sprite.x += addedX;
                checkPoint(sprite.boundary, "a", { x: oldX + addedX, y: oldY });
            });
            it("should change boundary d", () => {
                let oldX = sprite.boundary.d.x;
                let oldY = sprite.boundary.d.y;
                sprite.x += addedX;
                checkPoint(sprite.boundary, "d", { x: oldX + addedX, y: oldY });
            });
            it("should change boundary b", () => {
                let oldX = sprite.boundary.b.x;
                let oldY = sprite.boundary.b.y;
                sprite.x += addedX;
                checkPoint(sprite.boundary, "b", { x: oldX + addedX, y: oldY });
            });
            it("should change boundary c", () => {
                let oldX = sprite.boundary.c.x;
                let oldY = sprite.boundary.c.y;
                sprite.x += addedX;
                checkPoint(sprite.boundary, "c", { x: oldX + addedX, y: oldY });
            });
            it("should update the sprite's center", () => {
                let oldX = sprite.center.x;
                let oldY = sprite.center.y;
                sprite.x += addedX;
                checkPoint(sprite, "center", { x: oldX + addedX, y: oldY });
            })
        });
        describe("change x on rotated sprite", () => {
            let addedX = 10;
            beforeEach(() => {
                sprite.rotate(90, sprite.center);
            })
            it("should correctly change the x", () => {
                sprite.x += addedX;
                expect(sprite.x).to.equal(14.5);
            });
            it("should not change the y", () => {
                let oldY = sprite.y;
                sprite.x += addedX;
                expect(sprite.y).to.equal(oldY);
            });
            it("should change point a", () => {
                let oldY = sprite.a.y;
                sprite.x += addedX;
                checkPoint(sprite, "a", { x: 14.5, y: oldY });
            });
            it("should change point d", () => {
                let oldY = sprite.d.y;
                sprite.x += addedX;
                checkPoint(sprite, "d", { x: 10.5, y: oldY });
            });
            it("should change point b", () => {
                let oldY = sprite.b.y;
                sprite.x += addedX;
                checkPoint(sprite, "b", { x: 14.5, y: oldY });
            });
            it("should change point c", () => {
                let oldY = sprite.c.y;
                sprite.x += addedX;
                checkPoint(sprite, "c", { x: 10.5, y: oldY });
            });
            it("should change boundary a", () => {
                let oldY = sprite.boundary.a.y;
                sprite.x += addedX;
                checkPoint(sprite.boundary, "a", { x: 10.5, y: oldY });
            });
            it("should change boundary d", () => {
                let oldY = sprite.boundary.d.y;
                sprite.x += addedX;
                checkPoint(sprite.boundary, "d", { x: 10.5, y: oldY });
            });
            it("should change boundary b", () => {
                let oldY = sprite.boundary.b.y;
                sprite.x += addedX;
                checkPoint(sprite.boundary, "b", { x: 14.5, y: oldY });
            });
            it("should change boundary c", () => {
                let oldY = sprite.boundary.c.y;
                sprite.x += addedX;
                checkPoint(sprite.boundary, "c", { x: 14.5, y: oldY });
            });
            it("should update the sprite's center", () => {
                let oldY = sprite.center.y;
                sprite.x += addedX;
                checkPoint(sprite, "center", { x: 12.5, y: oldY });
            })
        });
        describe("change y on non-rotated sprite", () => {
            let addedY = 10;
            it("should correctly change the y", () => {
                sprite.y += addedY;
                expect(sprite.y).to.equal(y + addedY);
            });
            it("should change point a", () => {
                let oldX = sprite.a.x;
                let oldY = sprite.a.y;
                sprite.y += addedY;
                checkPoint(sprite, "a", { x: oldX, y: oldY + addedY });
            });
            it("should change point d", () => {
                let oldX = sprite.d.x;
                let oldY = sprite.d.y;
                sprite.y += addedY;
                checkPoint(sprite, "d", { x: oldX, y: oldY + addedY });
            });
            it("should not change point b", () => {
                let oldX = sprite.b.x;
                let oldY = sprite.b.y;
                sprite.y += addedY;
                checkPoint(sprite, "b", { x: oldX, y: oldY + addedY });
            });
            it("should change point c", () => {
                let oldX = sprite.c.x;
                let oldY = sprite.c.y;
                sprite.y += addedY;
                checkPoint(sprite, "c", { x: oldX, y: oldY + addedY });
            });
            it("should change boundary a", () => {
                let oldX = sprite.boundary.a.x;
                let oldY = sprite.boundary.a.y;
                sprite.y += addedY;
                checkPoint(sprite.boundary, "a", { x: oldX, y: oldY + addedY });
            });
            it("should change boundary d", () => {
                let oldX = sprite.boundary.d.x;
                let oldY = sprite.boundary.d.y;
                sprite.y += addedY;
                checkPoint(sprite.boundary, "d", { x: oldX, y: oldY + addedY });
            });
            it("should change boundary b", () => {
                let oldX = sprite.boundary.b.x;
                let oldY = sprite.boundary.b.y;
                sprite.y += addedY;
                checkPoint(sprite.boundary, "b", { x: oldX, y: oldY + addedY });
            });
            it("should change boundary c", () => {
                let oldX = sprite.boundary.c.x;
                let oldY = sprite.boundary.c.y;
                sprite.y += addedY;
                checkPoint(sprite.boundary, "c", { x: oldX, y: oldY + addedY });
            });
            it("should update the sprite's center", () => {
                let oldX = sprite.center.x;
                let oldY = sprite.center.y;
                sprite.y += addedY;
                checkPoint(sprite, "center", { x: oldX, y: oldY + addedY });
            })
        });
        describe("change y on rotated sprite", () => {
            let addedY = 10;
            beforeEach(() => {
                sprite.rotate(90, sprite.center);
            })
            it("should correctly change the y", () => {
                sprite.y += addedY;
                expect(sprite.y).to.equal(12.5);
            });
            it("should change point a", () => {
                let oldX = sprite.a.x;
                let oldY = sprite.a.y;
                sprite.y += addedY;
                checkPoint(sprite, "a", { x: oldX, y: 12.5 });
            });
            it("should change point d", () => {
                let oldX = sprite.d.x;
                let oldY = sprite.d.y;
                sprite.y += addedY;
                checkPoint(sprite, "d", { x: oldX, y: 12.5 });
            });
            it("should change point b", () => {
                let oldX = sprite.b.x;
                sprite.y += addedY;
                checkPoint(sprite, "b", { x: oldX, y: 15.5 });
            });
            it("should change point c", () => {
                let oldX = sprite.c.x;
                sprite.y += addedY;
                checkPoint(sprite, "c", { x: oldX, y: 15.5 });
            });
            it("should change boundary a", () => {
                let oldX = sprite.boundary.a.x;
                sprite.y += addedY;
                checkPoint(sprite.boundary, "a", { x: oldX, y: 12.5 });
            });
            it("should change boundary d", () => {
                let oldX = sprite.boundary.d.x;
                sprite.y += addedY;
                checkPoint(sprite.boundary, "d", { x: oldX, y: 15.5 });
            });
            it("should change boundary b", () => {
                let oldX = sprite.boundary.b.x;
                sprite.y += addedY;
                checkPoint(sprite.boundary, "b", { x: oldX, y: 12.5 });
            });
            it("should change boundary c", () => {
                let oldX = sprite.boundary.c.x;
                sprite.y += addedY;
                checkPoint(sprite.boundary, "c", { x: oldX, y: 15.5 });
            });
            it("should update the sprite's center", () => {
                let oldX = sprite.center.x;
                let oldY = sprite.center.y;
                sprite.y += addedY;
                checkPoint(sprite, "center", { x: oldX, y: 14 });
            })
        });
        describe("trimTop on non-rotated sprite", () => {
            let amount = 2;
            it("should remove the specified amount from the height", () => {
                sprite.trimTop(amount);
                expect(sprite.height).to.equal(height - amount);
            });
            it("should not change the x", () => {
                let oldX = sprite.x;
                sprite.trimTop(amount);
                expect(sprite.x).to.be.closeTo(oldX, 0.00001);
            });
            it("should offset the Y coordinate", () => {
                let oldY = sprite.y;
                sprite.trimTop(amount);
                expect(sprite.y).to.be.closeTo(oldY + amount, 0.00001);
            });
            it("should change point a", () => {
                let oldX = sprite.a.x;
                let oldY = sprite.a.y;
                sprite.trimTop(amount);
                checkPoint(sprite, "a", { x: oldX, y: oldY + amount });
            });
            it("should change point b", () => {
                let oldX = sprite.b.x;
                let oldY = sprite.b.y;
                sprite.trimTop(amount);
                checkPoint(sprite, "b", { x: oldX, y: oldY + amount });
            });
            it("should not change point c", () => {
                let oldX = sprite.c.x;
                let oldY = sprite.c.y;
                sprite.trimTop(amount);
                checkPoint(sprite, "c", { x: oldX, y: oldY });
            });
            it("should not change point d", () => {
                let oldX = sprite.d.x;
                let oldY = sprite.d.y;
                sprite.trimTop(amount);
                checkPoint(sprite, "d", { x: oldX, y: oldY });
            });
        });
        describe("trimTop on rotated sprite", () => {
            let amount = 2;
            beforeEach(() => {
                sprite.rotate(10, sprite.center)
            })
            it("should remove the specified amount from the height", () => {
                sprite.trimTop(amount);
                expect(sprite.height).to.equal(height - amount);
            });
            it("should change the x", () => {
                let oldX = sprite.x;
                sprite.trimTop(amount);
                expect(sprite.x).to.not.equal(oldX);
            });
            it("should change the y", () => {
                let oldY = sprite.y;
                sprite.trimTop(amount);
                expect(sprite.y).to.not.equal(oldY);
            });
            it("should not change point c", () => {
                let oldX = sprite.c.x;
                let oldY = sprite.c.y;
                sprite.trimTop(amount);
                checkPoint(sprite, "c", { x: oldX, y: oldY });
            });
            it("should not change point d", () => {
                let oldX = sprite.d.x;
                let oldY = sprite.d.y;
                sprite.trimTop(amount);
                checkPoint(sprite, "d", { x: oldX, y: oldY });
            });
        });
        describe("wasClicked", () => {
            let aX;
            let aY;
            beforeEach(() => {
                aX = sprite.a.x + 1;
                aY = sprite.a.y + 1;
            });
            it("should return the sprite if mouseX is within a and b and mouseY is within a and d", () => {
                expect(sprite.wasClicked(aX, aY)).to.equal(sprite);
            })
            it("should return null if point a.x is less than mouse x", () => {
                aX = sprite.a.x - 1;
                expect(sprite.wasClicked(aX, aY)).to.be.null;
            });
            it("should return null if point b.x is greater than mouse x", () => {
                aX = sprite.b.x + 1;
                expect(sprite.wasClicked(aX, 0)).to.be.null;
            });
            it("should return null if point a.y is less than mouse y", () => {
                aY = sprite.a.y - 1;
                expect(sprite.wasClicked(aX, aY)).to.be.null;
            });
            it("should return null if point b.x is greater than mouse x", () => {
                aY = sprite.d.y + 1;
                expect(sprite.wasClicked(aX, 0)).to.be.null;
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
    expect(obj[key].x).to.be.closeTo(value.x, 0.00001);
    expect(obj[key].y).to.be.closeTo(value.y, 0.00001);
}
