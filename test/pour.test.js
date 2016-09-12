import { Pour } from '../src/engine/complex/pour.js';

describe('Pour', () => {
    let pour;
    beforeEach(() => {
        pour = new Pour(100, 100, 300, 10);
    });
    describe('interface', () => {
        it('should exist', () => {
            expect(Pour).to.exist;
        });
        it('should create a new object', () => {
            expect(pour).to.exist;
            expect(pour.type).to.equal("Pour");
        });
    });
});
