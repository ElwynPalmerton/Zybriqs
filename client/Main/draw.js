function draw() {
  if (run) {
    if (mouseIsPressed) {
      readController();
      readPhysicsSliders()
    }


    backgroundArray[0].display();

    moverSystem.update();

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