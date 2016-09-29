import { LevelLine } from '../src/engine/complex/containers/levelLine.js';

describe('LevelLine', function() {
    describe('interface', function() {
        it('should exist', function() {
            expect(LevelLine).to.exist;
        });
        it('should throw an error without a y position', function() {
            expect(() => new LevelLine()).to.throw(Error);
        });
        it('should create a new object', function() {
            let levelLine = new LevelLine(0)
            expect(levelLine).to.exist;
        });
        it('should create two points', function() {
            let levelLine = new LevelLine(10);
            expect(levelLine.start).to.exist;
            expect(levelLine.start.x).to.equal(-2000);
            expect(levelLine.start.y).to.equal(10);
            expect(levelLine.end).to.exist;
            expect(levelLine.end.x).to.equal(2000);
            expect(levelLine.end.y).to.equal(10);
        });
        it("should allow y value to be changed", () => {
            let levelLine = new LevelLine(10);
            levelLine.y = 100;
            expect(levelLine.start.y).to.equal(100);
            expect(levelLine.end.y).to.equal(100);
        });
        it("should allow rotation", () => {
            let levelLine = new LevelLine(10);
            levelLine.rotate(90, levelLine.start);
            expect(levelLine.start.x).to.equal(-2000);
            expect(levelLine.start.y).to.equal(10);
            expect(levelLine.end.x).to.be.closeTo(-2000, 0.001);
            expect(levelLine.end.y).to.equal(4010);
        });
    });
});