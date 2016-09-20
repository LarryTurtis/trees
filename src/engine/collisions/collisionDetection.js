import { GlobalCollisionRegistry } from './globalCollisionRegistry.js';
import { ShapesRegistry } from '../shapesregistry.js';


function broadPhase(o1, o2) {
    if (o1.boundary.a.x <= o2.boundary.b.x &&
        o1.boundary.b.x >= o2.boundary.a.x &&
        o1.boundary.a.y <= o2.boundary.d.y &&
        o1.boundary.d.y >= o2.boundary.a.y) {
        return true;
    }
}

function narrowPhase(o1, o2) {
    let collision = false;
    let p1 = o1.createSATObject();
    let p2 = o2.createSATObject();
    let maxOverlap;
    let response;
    if (p1 && p2) {
        for (let i = 0; i < p1.length; i++) {

            for (let j = 0; j < p2.length; j++) {

                response = new SAT.Response();
                //assume two polygons by default
                let test = SAT.testPolygonPolygon;

                //if one or both SAT objects has a radius, change the test type.
                if (p1[i].r) test = SAT.testCirclePolygon;
                if (p2[j].r) test = SAT.testPolygonCircle;
                if (p1[i].r && p2[j].r) test = SAT.testCircleCircle;
                if (test(p1[i], p2[j], response)) {
                    if (!maxOverlap || maxOverlap.overlap < response.overlap) maxOverlap = response;
                }
            }
        }
    }

    //return collision test results.
    if (maxOverlap) {
        return maxOverlap.overlapV;
    } else {
        return false;
    }
}
    let shapesRegistry = new ShapesRegistry();
    let globalCollisionRegistry = new GlobalCollisionRegistry();

function updateCollisions(shape) {
    let collisions = [];
    shape.collidingWithPlatform = false;
    shapesRegistry.forEach(otherShape => {
        if (shape !== otherShape) {
            // if (broadPhase(shape, otherShape)) {
            var overlap = narrowPhase(shape, otherShape);
            if (overlap) {
                let collision = globalCollisionRegistry.add(shape, otherShape, overlap);
                collisions.push(collision);

            } else {
                globalCollisionRegistry.remove(shape, otherShape);
            }
            // } else {
            //     globalCollisionRegistry.remove(shape, otherShape);
            // }
        }
    });
    return collisions;
}

export { updateCollisions }