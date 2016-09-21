import { simples } from '../simples/simples.js';

function randomSpotsOnCircle(container) {

    let spots = [];
    for (let i = 0; i < 20; i++) {
        let location = randomCirclePoint(container.center, container.radius);
        let radius = randomRadius(location, container);
        let spot = new simples.Circle(location.x, location.y, radius, radius);

        let safe = true;
        spots.forEach(s => {

            let spotLeft = spot.center.x - spot.radius;
            let spotRight = spot.center.x + spot.radius;
            let spotTop = spot.center.y - spot.radius;
            let spotBottom = spot.center.y + spot.radius;

            let sLeft = s.center.x - s.radius;
            let sRight = s.center.x + s.radius;
            let sTop = s.center.y - s.radius;
            let sBottom = s.center.y + s.radius;

            if (spotLeft < sRight &&
                spotRight > sLeft &&
                spotTop < sBottom &&
                spotBottom > sTop) {
                safe = false;
            }
        });

        if (safe) {
            spots.push(spot);
        }
    }

    return spots;
}

function randomRadius(location, container) {
    let angle = trees.getAngle(container.center, location);
    let edge = trees.getPointOnLine(container.center, container.radius, angle)
    let max = trees.getDistance(location, edge) / 2;
    let min = container.radius / 6 > max ? max : container.radius / 6;
    return Math.floor(Math.random() * (max - min)) + min;
}

function randomCirclePoint(center, radius) {
    let a = 2 * Math.PI * Math.random();
    let r = Math.sqrt(Math.random());
    let x = (radius * r) * Math.cos(a) + center.x;
    let y = (radius * r) * Math.sin(a) + center.y;
    return { x: x, y: y }
}

export { randomSpotsOnCircle }