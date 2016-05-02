import { GlobalCollisionRegistry } from './globalCollisionRegistry.js';
import { ShapesRegistry } from './shapesregistry.js';


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
    let response = new SAT.Response();


    //if (o1.type === "FallingDrop" && o2.type === "Arrow") debugger

    for (let i = 0; i < p1.length; i++) {

        //if we already have a collision, stop.
        if (response.overlapV.x || response.overlapV.y) break;

        //else search for a collision.
        for (let j = 0; j < p2.length; j++) {

            //assume two polygons by default
            let test = SAT.testPolygonPolygon;

            //if one or both SAT objects has a radius, change the test type.
            if (p1[i].r) test = SAT.testCirclePolygon;
            if (p2[j].r) test = SAT.testPolygonCircle;
            if (p1[i].r && p2[j].r) test = SAT.testCircleCircle;

            if (test(p1[i], p2[j], response)) {
                break;
            }
        }
    }

    //return collision test results.
    if (response.overlapV.x || response.overlapV.y) {
        return response.overlapV;
    } else {
        return false;
    }
}

function updateCollisions(shape) {
    let collisions = [];
    let shapesRegistry = new ShapesRegistry();
    let globalCollisionRegistry = new GlobalCollisionRegistry();
    shape.collidingWithPlatform = false;
    shapesRegistry.forEach(otherShape => {
        if (shape !== otherShape) {
            if (broadPhase(shape, otherShape)) {
                var overlap = narrowPhase(shape, otherShape);
                if (overlap) {
                    let collision = globalCollisionRegistry.add(shape, otherShape, overlap);
                    if (otherShape.type === "Rectangle") shape.collidingWithPlatform = true;
                    collisions.push(collision);

                } else {
                    globalCollisionRegistry.remove(shape, otherShape);
                }
            } else {
                globalCollisionRegistry.remove(shape, otherShape);
            }
        }
    });
    return collisions;
}

export { updateCollisions }
