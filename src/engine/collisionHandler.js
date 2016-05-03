function collisionHandler(collision) {
    switch (collision.o1.type) {
        case "FallingDrop":
            dropHandler(collision)
            break;
        case "Rectangle":
            console.log("rectangle")
            break;
        case "Arrow":
            console.log("arrow");
            break;
        case "Circle":
            console.log("circle");
            break;
    }

}

function dropHandler(collision) {

    let drop = collision.o1;
    let other = collision.o2;

    switch (other.type) {
        case "Rectangle":
            dropOnPlatform(drop, collision)
            break;
        case "Arrow":
            console.log("arrow")
            break;
    }
}


function dropOnDrop(drop, collision) {

}

function dropOnPlatform(drop, collision) {
    if (!collision.resolved) {
        collision.resolved = true;
        drop.xSpeed = collision.o2.angle / 5;
        drop.ySpeed = 3;
        drop.y -= collision.overlap.y;
    }
    drop.slide(collision.o2)
}

export { collisionHandler }
