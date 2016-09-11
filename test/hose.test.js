import { Hose } from '../src/engine/complex/hose.js';

describe('Hose', () => {
    let hose;
    beforeEach(() => {
        hose = new Hose(100, 100, 300, 10);
    });
    describe('interface', () => {
        it('should exist', () => {
            expect(Hose).to.exist;
        });
        it('should create a new object', () => {
            expect(hose).to.exist;
            expect(hose.type).to.equal("Hose");
        });
    });
});
