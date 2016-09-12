import { Drop } from '../src/engine/complex/drop.js';

describe('Drop', () => {
    let pour;
    beforeEach(() => {
        pour = new Drop(100, 100, 300, 10);
    });
    describe('interface', () => {
        it('should exist', () => {
            expect(Drop).to.exist;
        });
        it('should create a new object', () => {
            expect(pour).to.exist;
            expect(pour.type).to.equal("Drop");
        });
    });
});
