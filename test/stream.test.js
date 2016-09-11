import { Stream } from '../src/engine/complex/stream.js';

describe('Stream', () => {
    let stream;
    beforeEach(() => {
        stream = new Stream(100, 100, 300, 10);
    });
    describe('interface', () => {
        it('should exist', () => {
            expect(Stream).to.exist;
        });
        it('should create a new object', () => {
            expect(stream).to.exist;
            expect(stream.type).to.equal("Stream");
        });
    });
});
