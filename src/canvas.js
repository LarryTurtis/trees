class Canvas {
    constructor() {
       this.element = document.getElementById('main');
       this.ctx = this.element.getContext("2d");
       this.centerX = this.element.width / 2;
       this.centerY = this.element.height /2;
    }

    setWidth(width) {
        this.element.width = width;
        this.centerX = width / 2;
    }

    setHeight(height) {
        this.element.height = height;
        this.centerY = height / 2;
    }
};

export { Canvas }