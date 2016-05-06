function slide(platform) {
    if (platform.angle !== 0) {
        if (platform.angle < 0) this.xSpeed = -Math.abs(this.xSpeed);
        this.xSpeed *= 1.01
        var next = this.getPointOnLine(this.origin, this.xSpeed, platform.angle);
        this.x = next.x;
        this.y = next.y;
    }
}

export { slide };
