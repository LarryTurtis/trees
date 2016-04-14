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
        drop.xSpeed = 1;
        drop.ySpeed = 3;
        drop.y += collision.overlap.y;
    }
       drop.slide(collision.o2)
}

export { collisionHandler }
