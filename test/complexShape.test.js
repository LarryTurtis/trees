import { ComplexShape } from '../src/engine/complex/complexShape.js';

describe('ComplexShape', () => {
    
    let x = 1;
    let y = 2;
    let width = 3;
    let height = 4;

    let complexShape;

    beforeEach(() => {
        complexShape = new ComplexShape(x, y, width, height);
    });

    describe('interface', () => {
        it('should exist', () => {
            expect(complexShape).to.exist;
        });
        it('should have the right type', () => {
            expect(complexShape.type).to.equal('ComplexShape');
        })
    });
});
