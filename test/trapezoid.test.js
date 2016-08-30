import { Trapezoid } from '../src/engine/simples/trapezoid.js';

describe('Trapezoid', () => {
    
    let x = 1;
    let y = 2;
    let width = 3;
    let height = 4;
    let leftAngle = 7;
    let rightAngle = 8;

    let trapezoid;

    beforeEach(() => {
        trapezoid = new Trapezoid(x, y, width, height, 0, leftAngle, rightAngle);
    });

    describe('interface', () => {
        it('should exist', () => {
            expect(trapezoid).to.exist;
        });
        it('should have the right type', () => {
            expect(trapezoid.type).to.equal('Trapezoid');
        })
    });
});
