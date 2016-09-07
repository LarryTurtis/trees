import { Line } from '../src/engine/line.js';

describe('Line', function() {
    describe('interface', function() {
        it('should exist', function() {
            expect(Line).to.exist;
        });
        it('should create a new object', function() {
            let line = new Line()
            expect(line).to.exist;
        });
        it('should create two points', function() {
            let line = new Line("start", "end");
            expect(line.start).to.exist;
            expect(line.start).to.equal("start");
            expect(line.end).to.exist;
            expect(line.end).to.equal("end");
        });
    });
});
