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
        case "FallingDrop":
            dropOnDrop(drop, collision)
            break;
        case "Platform":
            dropOnPlatform(drop, collision)
        case "Splat":
            break;
    }
}


function dropOnDrop(drop, collision) {

}

function dropOnPlatform(drop, collision) {
    if (!collision.resolved) {
        collision.resolved = true;
        drop.y -= collision.overlap.y;
    }
    drop.slide(collision.o2)
}

export { collisionHandler }
