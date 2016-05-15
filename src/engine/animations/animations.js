import { fall } from './fall.js';
import { gravity } from './gravity.js';
import { scroll } from './scroll.js';
import { slide } from './slide.js';

let animations = {
	fall: fall,
	gravity: gravity,
	scroll: scroll,
	slide: slide
}

export { animations };