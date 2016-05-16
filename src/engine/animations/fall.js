 function fall() {
     this.xSpeed *= 0.95;
     this.ySpeed *= 1.1;
     this.y += this.ySpeed || 1;
     this.x += this.xSpeed || 0;
 }

 export { fall };
