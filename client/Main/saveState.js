function submitData() {

  let stateData = saveState();

  let stateJSON = JSON.stringify(stateData);

  const url = "/saveName";

  const data = {
    name: "Zybriqs5",
    state: stateJSON,
  };

  $.post(url, data, function (data, status) {
    console.log(`${data} and status is ${status}`);
    window.location.assign("/saveName");
  });
}

function submitSession() {

  let stateData = saveState();

  let stateJSON = JSON.stringify(stateData);

  const url = "/saveName";

  const data = {
    name: "Zybriqs5",
    state: stateJSON,
  };

  $.post(url, data, function (data, status) {
    console.log(`${data} and status is ${status}`);
  });
}


function saveState() {
  state = {};

  let ballColors = [];
  moverSystem.balls.forEach((ball, i) => {
    ballColors[i] = ball.color;
  });

  let blockArray = [];
  blocks.forEach((block, i) => {
    let aBlock = {
      color: block.color,
      start: {
        x: block.start.x,
        y: block.start.y,
      },
      end: {
        x: block.end.x,
        y: block.end.y,
      },
    };
    blockArray.push(aBlock);
  });

  let dragArray = [];
  liquids.forEach((l, i) => {
    let aLiquid = {
      color: l.color,
      start: {
        x: l.start.x,
        y: l.start.y,
      },
      end: {
        x: l.end.x,
        y: l.end.y,
      },
    };
    dragArray.push(aLiquid);
  });

  let accelArray = [];
  reverseLiquids.forEach((r, i) => {
    let aReverseLiquid = {
      color: r.color,
      start: {
        x: r.start.x,
        y: r.start.y,
      },
      end: {
        x: r.end.x,
        y: r.end.y,
      },
    };
    accelArray.push(aReverseLiquid);
  });


  state.balls = ballColors;
  state.blocks = blockArray;
  state.drag = dragArray;
  state.accel = accelArray;


  //backgroundArray[0] contains backgroundObject which contains the
  //backgroundColor. So, the code below takes the color from the backgroundobject held at backgroundArray[0], and puts
  //...the color object into the stateBackgroundArray.
  //So, state.backgroundColor contains an array which holds one
  //color object.

  let stateBackgroundArray = [];

  stateBackgroundArray.push(backgroundArray[0].color);

  state.backgroundColor = stateBackgroundArray;

  return state;
}