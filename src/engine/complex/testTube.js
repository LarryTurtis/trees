import { simples } from '../simples/simples.js';
import { ContainerComposite } from './containerComposite.js';

class TestTube extends ContainerComposite {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.type = "TestTube";

        let lip = new simples.Rectangle(this.x + this.width / 4, this.y, this.width / 2, this.height / 20);
        lip.openingIndex = 0;
        this.addShape(lip);
        this.lip = lip;
        let bodyWidth = this.width / 2.5;
        let body = new simples.Rectangle(trees.getCenterX(bodyWidth, this), this.y + lip.height, bodyWidth, this.height - this.height / 20);
        body.bottomIndex = 2;
        this.addShape(body);
    }

}

export { TestTube }