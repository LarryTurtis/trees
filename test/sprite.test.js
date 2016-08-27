import { Sprite } from '../src/engine/sprite.js';

describe('Sprite', function() {
    describe('interface', function() {
        it('should exist', function() {
            expect(Sprite).to.exist;
        });
        it('should create an object', function() {
        	let sprite = new Sprite();
        	expect(sprite).to.not.exist;
        })
    });
});
