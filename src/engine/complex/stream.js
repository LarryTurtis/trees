import { ComplexShape } from './complexShape.js'
import { Hose } from './hose.js'

class Stream extends ComplexShape {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.type = "Stream";
        let stream = new Hose(x, y, width, height);
        this.addShape(stream);
        this.pourTimer;
        this.stopTimer;
    }

    fill(amount) {
        this.shape.forEach(shape => {
            shape.fill(amount);
        })
    }

    drain(amount) {
        this.shape.forEach(shape => {
            shape.drain(amount);
        })
    }

    pour() {

        clearInterval(this.stopTimer);
        this.stopTimer = null;

        if (!this.pourTimer) {
            this.pourTimer = setInterval(() => {
                console.log("pouring");
                if (!this.full) {
                    this.fill(1);
                } else {
                    clearInterval(this.pourTimer);
                    this.pourTimer = null;
                }
            }, 50);
        }
    }

    stopPour() {

        clearInterval(this.pourTimer);
        this.pourTimer = null;

        if (!this.stopTimer) {
            this.stopTimer = setInterval(() => {
                console.log("not pouring");
                if (!this.empty) {
                    this.drain(1);
                } else {
                    clearInterval(this.stopTimer);
                    this.stopTimer = null;
                }
            }, 50);
        }
    }

    get full() {
        let full = true;
        this.shape.forEach(shape => {
            full = full && shape.full;
        });
        return full;
    }

    get empty() {
        let empty = true;
        this.shape.forEach(shape => {
            empty = empty && shape.empty;
            console.log(empty);
        });
        return empty;
    }


    addStream() {
        let stream = new Hose(this.lines[0].start.x, this.lines[0].start.y, this.distanceToBottom, 10);
        stream.rotate(90, stream.center);
        this.addShape(stream);
    }
}

export { Stream }