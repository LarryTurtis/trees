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
    var p1 = new SAT.Polygon(new SAT.Vector(0, 0), [
        new SAT.Vector(o1.d.x, o1.d.y),
        new SAT.Vector(o1.c.x, o1.c.y),
        new SAT.Vector(o1.b.x, o1.b.y),
        new SAT.Vector(o1.a.x, o1.a.y)
    ]);

    var p2 = new SAT.Polygon(new SAT.Vector(0, 0), [
        new SAT.Vector(o2.d.x, o2.d.y),
        new SAT.Vector(o2.c.x, o2.c.y),
        new SAT.Vector(o2.b.x, o2.b.y),
        new SAT.Vector(o2.a.x, o2.a.y)
    ]);

    var response = new SAT.Response();

    var collision = SAT.testPolygonPolygon(p1, p2, response);

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
                    if (otherShape.type === "Platform") shape.collidingWithPlatform = true;
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
