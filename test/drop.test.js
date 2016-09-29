import { Drop } from '../src/engine/complex/containers/drop.js';

describe('Drop', () => {

    let drop;
    let x = 100;
    let y = 100;
    let width = 300;
    let height = 10;

    beforeEach(() => {
        drop = new Drop({ x: x, y: y }, 300);
    });
    describe('interface', () => {
        it('should exist', () => {
            expect(Drop).to.exist;
        });
        it('should create a new object', () => {
            expect(drop).to.exist;
            expect(drop.type).to.equal("Drop");
        });
        it('should modify width correctly', () => {
            expect(drop.width).to.equal(width);
            expect(drop.start.x).to.equal(x);
            expect(drop.end.x).to.equal(x + width);
            drop.width = 10;
            expect(drop.width).to.equal(10);
            expect(drop.start.x).to.equal(x);
            expect(drop.end.x).to.equal(x + 10);
        });
        it('should modify y correctly', () => {
            expect(drop.y).to.equal(y);
            expect(drop.start.y).to.equal(y);
            expect(drop.end.y).to.equal(y);
            drop.y = 10;
            expect(drop.y).to.equal(10);
            expect(drop.start.y).to.equal(10);
            expect(drop.end.y).to.equal(10);
        });
    });
});