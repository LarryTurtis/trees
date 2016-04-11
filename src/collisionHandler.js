function collisionHandler(collision) {

    switch (collision.o1.type) {
        case "FallingDrop":
            dropHandler(collision)
            break;
        case "Platform":
            platformHandler(collision)
            break;
        case "Splat":
            break;
    }

}

function dropHandler(collision) {
    switch (collision.o2.type) {
        case "FallingDrop":
            dropOnDrop(collision.o1, collision)
            break;
        case "Platform":
            dropOnPlatform(collision.o1, collision)
        case "Splat":
            break;
    }
}

function platformHandler(collision) {
    switch (collision.o2.type) {
        case "FallingDrop":
            dropOnPlatform(collision.o2, collision)
            break;
        case "Platform":
            break;
        case "Splat":
            break;
    }
}

function dropOnDrop(drop, collision) {

}

function dropOnPlatform(drop, collision) {
    drop.collidingWith = "Platform";
    if (!collision.resolved) {
        collision.resolved = true;
        drop.y -= collision.overlap.y;
    }
    drop.slide(collision.o2)
}

export { collisionHandler }
