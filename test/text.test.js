import { Text } from '../src/engine/simples/text.js';

describe('Text', () => {
    let text;
    let value = "test";
    let size = 10;
    let x = 20;
    let y = 30;
    let font = "someFont";

    beforeEach(() => {
        text = new Text(value, x, y, size, font);
    });
    describe('interface', () => {
        it('should exist', () => {
            expect(Text).to.exist;
        });
        it('should create a new object', () => {
            expect(text).to.exist;
            expect(text.type).to.equal("Text");
        });
        it("should have a fontName property", () => {
            expect(text.fontName).to.exist;
            expect(text.fontName).to.equal(font);
        });
        it("should have a font property", () => {
            expect(text.font).to.exist;
            expect(text.font).to.equal(size + "px " + font);
        });
        it("should have a value property", () => {
            expect(text.value).to.exist;
            expect(text.value).to.equal(value);
        });
        it("should have a size property", () => {
            expect(text.size).to.exist;
            expect(text.size).to.equal(size);
        });
    });
    describe('methods', () => {
        it('should exist', () => {
            expect(Text).to.exist;
        });
        it("should allow changing the text", () => {
            text.value = "newTest"
            expect(text.value).to.equal("newTest");
        });
        it("should allow changing the size", () => {
            text.size = 20;
            expect(text.size).to.equal(20);
            expect(text.font).to.equal("20px " + font);
        });
        it("should allow changing the font", () => {
            text.font = "newFont";
            expect(text.fontName).to.equal("newFont");
            expect(text.font).to.equal(size + "px newFont");
        });
    });
});