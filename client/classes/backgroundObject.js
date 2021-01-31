class backgroundObject {

  constructor(color) {

    color.a = parseFloat(color.a);
    //Color variables.
    let assignColor = color || defaultColor;
    let thisColor = {};
    Object.assign(thisColor, assignColor);
    this.color = thisColor;
  }

  display() {
    let backgroundColor = this.color;
    // c.a = parseInt(c.a);
    // console.log("Background color alpha: ", backgroundColor.a)
    let p5bgColor = color(backgroundColor.h, backgroundColor.s, backgroundColor.l, parseFloat(backgroundColor.a));
    background(p5bgColor);
  }


  displayDimmed() {

    function drawGrid() {

      let gridSize = 25;
      //Calculate gridSize as an even interval?
      stroke(0, 0, 100, 0.1);
      strokeWeight(1);
      noFill();

      for (let i = 0; i <= initHeight; i = i + gridSize) {
        line(0, i * scl, initWidth * scl, i * scl);
      }

      for (let i = 0; i <= initWidth; i = i + gridSize) {
        line(i * scl, 0, i * scl, initHeight * scl);
      }
    }



    let {
      h,
      s,
      l,
      a
    } = this.color;

    //let p5Color = color(h, s - dimAmt, l, parseFloat(a));
    let p5Color = color(h, s - dimAmt, l, a);
    background(p5Color);

    if (gridActive === true) {
      drawGrid();
    }
  }

}