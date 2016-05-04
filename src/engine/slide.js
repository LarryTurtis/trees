function slide(platform) {
    if (this.angle < platform.angle) {
        this.angle += this.ySpeed;
        if (this.angle > platform.angle) this.angle = platform.angle;
    }
    if (this.angle > platform.angle) {
        this.angle -= this.ySpeed;
        if (this.angle < platform.angle) this.angle = platform.angle;
    }
    this.transformOrigin = platform.angle < 0 ? this.c : this.d;
    this.angle = platform.angle;
    this.transformOrigin = this.center;

    if (platform.angle !== 0) {
        if (platform.angle < 0) this.xSpeed = -Math.abs(this.xSpeed);
        this.xSpeed *= 1.01
        var next = this.getPointOnLine(this.origin, this.xSpeed, platform.angle);
        this.x = next.x;
        this.y = next.y;
    }
}

export { slide };
