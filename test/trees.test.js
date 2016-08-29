import { trees } from '../src/trees.js';

describe('Trees', () => {
    let library = trees();
    describe('interface', () => {
        it('should have getMinX', () => {
            expect(library.getMinX).to.exist;
        });
    });

    describe('getMinX', () => {
        it("should return the point with the lowest x", () => {
            let points = [
                { id: "a", x: 1 },
                { id: "b", x: 2 },
                { id: "c", x: 3 },
                { id: "d", x: 4 },
                { id: "e", x: 5 },
            ];
            expect(library.getMinX(points).id).to.equal("a");
            points.reverse();
            expect(library.getMinX(points).id).to.equal("a");
            points.pop();
            expect(library.getMinX(points).id).to.equal("b");
        });
    })
});
