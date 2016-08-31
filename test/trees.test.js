import { trees } from '../src/trees.js';

describe('Trees', () => {
    describe('interface', () => {
        it('should have the right methods', () => {
            expect(trees.random).to.exist;
            expect(trees.randomColor).to.exist;
            expect(trees.posNeg).to.exist;
            expect(trees.getRGB).to.exist;
            expect(trees.setOpacity).to.exist;
            expect(trees.getCenterX).to.exist;
            expect(trees.getBezierDistance).to.exist;
            expect(trees.degToRad).to.exist;
            expect(trees.getAngle).to.exist;
            expect(trees.getDistance).to.exist;
            expect(trees.getPointOnLine).to.exist;
            expect(trees.copyPoint).to.exist;
        });
    });
});
