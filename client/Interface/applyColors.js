function applyColors() {

  let palette = bAndW;

  let colorPreset = document.querySelector("#colorPresets");
  let colorName = colorPreset.value;

  switch (colorName) {
    case "B&W":
      palette = bAndW;
      break;
    case "Rainbow":
      palette = rainbow;
      break;
    case "underwater":
      palette = underwater;
      break;
    case "acid":
      palette = acid;
      break;
    case "maraschino":
      palette = maraschino;
      break;
    default:
    // Do nothing.
  }


  balls.forEach((ball, i) => {
    let index = i % palette.balls.length;
    ball.color = Object.assign({}, palette.balls[index]);
  });

  liquids.forEach((l, i) => {
    let index = i % palette.drag.length;
    l.color = Object.assign({}, palette.drag[index]);
  });

  reverseLiquids.forEach((r, i) => {
    let index = i % palette.accel.length;
    r.color = Object.assign({}, palette.accel[index]);
  });

  blocks.forEach((b, i) => {
    let index = i % palette.blocks.length;
    b.color = Object.assign({}, palette.blocks[index]);
  });

  let bgObject = new backgroundObject(palette.backgroundColor[0]);
  backgroundArray[0] = bgObject;
}