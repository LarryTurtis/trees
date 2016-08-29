import { trees } from '../src/trees.js';

describe('Trees', () => {
    let library = trees();
    describe('interface', () => {
        it('should have the right methods', () => {
            expect(library.random).to.exist;
            expect(library.randomColor).to.exist;
            expect(library.posNeg).to.exist;
            expect(library.getRGB).to.exist;
            expect(library.setOpacity).to.exist;
            expect(library.getCenterX).to.exist;
            expect(library.getBezierDistance).to.exist;
            expect(library.degToRad).to.exist;
            expect(library.getAngle).to.exist;
            expect(library.getDistance).to.exist;
            expect(library.getPointOnLine).to.exist;
            expect(library.copyPoint).to.exist;
        });
    });
});
