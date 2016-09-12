import { Meniscus } from '../src/engine/complex/meniscus.js';

describe('Meniscus', () => {
    let meniscus;
    beforeEach(() => {
        meniscus = new Meniscus(100, 100, 300, 10);
    });
    describe('interface', () => {
        it('should exist', () => {
            expect(Meniscus).to.exist;
        });
        it('should create a new object', () => {
            expect(meniscus).to.exist;
            expect(meniscus.type).to.equal("Meniscus");
        });
    });
});
