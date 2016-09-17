function collisionHandler(collision) {
console.log(collision.overlap.y);
    if (collision._o1.y < collision._o2.y) {
        collision._o1.pour.drops.splice(0, 5);
        collision._o2.fill(1);
    }
    if (collision._o2.y < collision._o1.y) {
        collision._o2.pour.drops.splice(0, 5);
        collision._o1.fill(1);
    }
    collision.resolved = true;

}

export { collisionHandler }