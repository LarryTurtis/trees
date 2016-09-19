function collisionHandler(collision) {
    if (collision._o1.y < collision._o2.y) {
        let removed = collision._o1.pourComposite.activePour.drops.splice(0, 1);
        if (removed.length) {
            let volume = Math.abs((removed[0].end.x - removed[0].start.x) / 10);
            collision._o2.fill(volume);
        }
    }
    if (collision._o2.y < collision._o1.y) {
        let removed = collision._o2.pourComposite.activePour.drops.splice(0, 1);
        if (removed.length) {
            let volume = Math.abs((removed[0].end.x - removed[0].start.x) / 10);
            collision._o1.fill(volume);
        }
    }
    collision.resolved = true;

}

export { collisionHandler }
