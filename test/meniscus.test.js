import { Meniscus } from '../src/engine/complex/containers/meniscus.js';
import { Point } from "../src/engine/point.js";

describe('Meniscus', () => {
    let meniscus;
    beforeEach(() => {
        let end = new Point(0, 0);
        meniscus = new Meniscus(100, 100, 300, 10, end);
    });
    describe('interface', () => {
        it('should exist', () => {
            expect(Meniscus).to.exist;
        });
        it('should create a new object', () => {
            expect(meniscus).to.exist;
            expect(meniscus.type).to.equal("Meniscus");
        });
        it("should throw an error if an end is not supplied", () => {
            expect(() => {new Meniscus(100, 100, 300, 10)}).to.throw(Error);
        })
    });
});
