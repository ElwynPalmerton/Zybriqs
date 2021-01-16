function draw() {
  if (run) {
    if (mouseIsPressed) {
      readController();
      readPhysicsSliders()


    }

    backgroundArray[0].display();

    balls.forEach(ball => {

      //Calculate wind.
      let wind = calculateWind();
      //calculateWind() is in Interface/physicsController - I should move this.

      //Make  function which just returns the wind value.
      ball.applyForce(wind);

      //Calculate gravity.
      var gravity = createVector(0, gForce); //gForce is modified with the gravity slider.
      gravity.mult(ball.mass);
      ball.applyForce(gravity);

      //Calculate drag if it's in the liquid.   //Create Liquid and Reverse liquid in the same array.
      //It is only checking the first liquid, not the array.
      liquids.forEach((l) => {
        if (ball.isInside(l)) {
          ball.drag(l);
        }
      });

      //Calculate reverse drag i.e. acceleration.
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
      ball.display(); //Create an array of ballCols and pass in ballCols[x[.]
    }) //End for loop.

    //Color is just passed in to reverseLiquid so I can just create another set of sliders.
    //   // SO NICE that I refactored it so that I can do this!!!!

    liquids.forEach((liquid, i) => {
      liquid.display(); //Liquid and reverseLiquid should be in the same array. See above?
    });
    reverseLiquids.forEach((reverseLiquid) => {
      reverseLiquid.display();
    });

    blocks.forEach(block => {
      block.display();
    })


  }
} //End of draw loop.