import {Point} from './point.js';

function collisionDetection(o1, o2) {

	var p1 = new SAT.Polygon(new SAT.Vector(o1.d.x, o1.d.y), [
			  new SAT.Vector(o1.d.x, o1.d.y),
			  new SAT.Vector(o1.c.x, o1.c.y),
			  new SAT.Vector(o1.b.x, o1.b.y),
			  new SAT.Vector(o1.a.x, o1.a.y)
			]);

	var p2 = new SAT.Polygon(new SAT.Vector(o2.d.x, o2.d.y), [
			  new SAT.Vector(o2.d.x, o2.d.y),
			  new SAT.Vector(o2.c.x, o2.c.y),
			  new SAT.Vector(o2.b.x, o2.b.y),
			  new SAT.Vector(o2.a.x, o2.a.y)
			]);

	var response = new SAT.Response();

	SAT.testPolygonPolygon(p1, p2, response);

	if (response.overlapV.x || response.overlapV.y) {
		return response.overlapV;
	} else {
		return false;
	}

}


export {collisionDetection}
