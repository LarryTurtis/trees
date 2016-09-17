function collisionHandler(collision) {

    if (collision._o1.pour) {
       	collision._o1.pour.drops.splice(0, 20);
        collision._o2.fill(3);
    }
    if (collision._o2.pour) {
        collision._o2.pour.drops.splice(0, 20);
        collision._o1.fill(3);
    }
    collision.resolved = true;

}

export { collisionHandler }