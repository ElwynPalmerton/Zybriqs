//Move this into its own file in utilities.

function drawElementsDuringSetup() {

  //Drawing dimmed elements.

  tempBG = color(230, 30, 30, 1)

  backgroundArray[0].displayDimmed();

  moverSystem.balls.forEach((ball) => {
    ball.displayDimmed();
  })

  liquids.forEach((liquid) => {
    liquid.displayDimmed(); //Liquid and reverseLiquid should be in the same array. See above?
    //liquid.displayRemoveButton();
  })

  reverseLiquids.forEach((reverseLiquid) => {
    reverseLiquid.displayDimmed();
  })

  for (let j = 0; j < blocks.length; j++) {
    blocks[j].displayDimmed();
  }

  if (drawButtonOn === true) {
    document.body.querySelector('canvas').style.cursor = "crosshair";
  }
}