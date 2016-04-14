function collisionHandler(collision) {

    switch (collision.o1.type) {
        case "FallingDrop":
            dropHandler(collision)
            break;
        case "Platform":
            break;
        case "Splat":
            break;
    }

}

function dropHandler(collision) {

    let drop = collision.o1;
    let other = collision.o2;

    switch (other.type) {
        case "Platform":
            dropOnPlatform(drop, collision)
    }
}


function dropOnDrop(drop, collision) {

}

function dropOnPlatform(drop, collision) {
    if (!collision.resolved) {
        collision.resolved = true;
        drop.xSpeed = collision.o2.angle / 5;
        drop.ySpeed = 3;
        drop.y -= Math.abs(collision.overlap.y) - 1;
    }
       drop.slide(collision.o2)
}

export { collisionHandler }
