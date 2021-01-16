function readPhysicsSliders() {
  readGravitySlider();
  readWindSliders();
  readDragSlider();
  //readAcceleratorSlider();
} //End readPhysicsSliders.


function readDragSlider() {

  //const gravityFactor = 8
  //Refactor this so that it does negative gravity.
  let dragSlider = document.getElementById('drag');

  dragSlider.addEventListener("input", () => {
    let dragFactor = map(dragSlider.value, 0, 100, 0, dragCoefficient * 3); //100 should be a constant value.

    liquids.forEach(l => {
      l.c = dragFactor;
    })

    //The 10 here should also be a constant.
  });
}

function readAcceleratorSlider() {

  //const gravityFactor = 8
  //Refactor this so that it does negative gravity.
  let acceleratorSlider = document.getElementById('accelerator');

  acceleratorSlider.addEventListener("input", () => {
    let acceleratorFactor = map(acceleratorSlider.value, 0, 100, 0, -acceleratorCoefficient * 5); //100 should be a constant value.
    console.log(acceleratorFactor);
    reverseLiquids.forEach(rl => {
      rl.c = acceleratorFactor;
    })

    //The 10 here should also be a constant.
  });
}


function readGravitySlider() {

  const gravityFactor = 8
  //Refactor this so that it does negative gravity.
  let gravity = document.getElementById('gravity');

  gravity.addEventListener("input", () => {
    let gFactor = gravity.value / 100; //100 should be a constant value.
    gForce = gravityConstant * gFactor * gravityFactor; //The 10 here should also be a constant.
  });
}


function readWindSliders() {

  let windForceSlider = document.getElementById('windForce');
  let windDirectionSlider = document.getElementById('direction');

  windForceSlider.addEventListener('input', () => {
    intensityInput = windForceSlider.value;
  })

  windDirectionSlider.addEventListener('input', () => {
    directionInput = windDirectionSlider.value;
  })
}

function calculateWind() {

  //The intensity input should be scaled.
  let intensityScale = 0.05;
  let dScale = 0.1;

  xOff += 0.01;

  let windFactor = map(noise(xOff), 0, 1, -windC, windC);

  //I could calculate windFactor first and put that into noise instead of windC.

  let windSpeed = windFactor * intensityInput * intensityScale;

  //The intensity input should be scaled.

  //let windForce = intensityInput * windFactor;
  let directionScale = intensityInput * windC;

  let directionAddend = directionInput / 100 * directionScale;
  //Change the input values to -100, 100.
  let windVectorX = windSpeed + directionAddend * dScale;

  var windVector = createVector(windVectorX, 0.0);


  return windVector;
}