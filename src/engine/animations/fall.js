 function fall() {
     this.xSpeed *= 0.95;
     this.ySpeed *= 1.1;
     this.y += this.ySpeed;
     this.x += this.xSpeed;
 }

 export { fall };
