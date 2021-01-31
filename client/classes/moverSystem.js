class MoverSystem {
  constructor(balls) {
    this.balls = []
  }

  addBalls(balls) {
    for (let i = 0; i < balls.length; i++) {
      let ball = new Mover(random(initWidth), initHeight / 5, balls[i]);
      this.balls.push(ball);
    }
  }

  clear() {
    this.balls = [];
  }

  update() {

    this.balls.forEach(ball => {

      //Calculate wind.
      let wind = calculateWind();
      //calculateWind() is in Interface/physicsController - I should move this.

      //Make  function which just returns the wind value.
      ball.applyForce(wind);

      //Calculate gravity.
      var gravity = createVector(0, gForce); //This can be a global variable (unless it can be user modified?
      gravity.mult(ball.mass);
      ball.applyForce(gravity);

      //Calculate drag if it's in the liquid.   //Create Liquid and Reverse liquid in the same array.
      //It is only checking the first liquid, not the array.
      liquids.forEach((l) => {
        if (ball.isInside(l)) {
          ball.drag(l);
        }
      });

      //Calculate reverse drag
      //if it is in the reverseLiquid. //See above.
      reverseLiquids.forEach((rl) => {
        if (ball.isInside(rl)) {
          ball.drag(rl);
        }
      });

      //Check collides.

      blocks.forEach(block => {
        ball.collides(block);
      })

      //Update balls.
      ball.update();
      ball.checkEdges(initWidth, initHeight);

      //Display the balls, liquid, and reverseLiquid.
      ball.display();
    }) //End for loop.

  }

}