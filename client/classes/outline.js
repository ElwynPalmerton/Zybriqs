class Outline {
  constructor(start, end, color) {

    start.x = start.x / scl;
    start.y = start.y / scl;
    end.x = end.x / scl;
    end.y = end.y / scl;
    let assignColor = color || defaultColor;
    let thisColor = {};
    Object.assign(thisColor, assignColor);
    this.color = thisColor;

    this.start = start; //Vector.
    this.end = end; //Vector.

    this.width = Math.abs(this.start.x - this.end.x);
    this.height = Math.abs(this.start.y - this.end.y);

    if (this.start.x > this.end.x) {
      let tempX = this.start.x;
      this.start.x = this.end.x;
      this.end.x = tempX;
    }

    if (this.start.y > this.end.y) {
      let tempY = this.start.y;
      this.start.y = this.end.y;
      this.end.y = tempY;
    }
  }

  update(end) {
    this.end = end; //|| this.start;

    this.width = Math.abs(this.start.x - this.end.x);
    this.height = Math.abs(this.start.y - this.end.y);
  }

  displayDimmed(c, fColor) {
    //refactor to put all of the position stuff into the update function?
    //Make an if-then which does noFill() during setup and fill during run.
    let {
      h,
      s,
      l,
      a
    } = this.color;

    let p5Color = color(h, s - dimAmt, l, parseFloat(a));
    stroke(p5Color);
    strokeWeight(5);
    noFill();
    rect(
      this.start.x * scl,
      this.start.y * scl,
      this.width * scl,
      this.height * scl
    );
  }

  display() {
    let {
      h,
      s,
      l,
      a
    } = this.color;

    let p5Color = color(h, s, l, parseFloat(a));
    stroke(p5Color);
    strokeWeight(5);
    //fill(fColor);
    noFill();
    rect(
      this.start.x * scl,
      this.start.y * scl,
      this.width * scl,
      this.height * scl
    );
  }

  displayNumber(number) {
    textSize(16);
    noStroke();
    fill(20);
    textSize(16);
    text("b." + number, this.start.x * scl, this.start.y * scl);
  }

  displayRemoveButton() {
    const xBoxSize = 15;
    stroke(66, 7, 100, 1);
    strokeWeight(2);
    noFill();
    // noFill();
    rect(this.start.x * scl, this.start.y * scl, xBoxSize, xBoxSize);
    line(
      this.start.x * scl,
      this.start.y * scl,
      this.start.x * scl + xBoxSize,
      this.start.y * scl + xBoxSize
    );
    line(
      this.start.x * scl + xBoxSize,
      this.start.y * scl,
      this.start.x * scl,
      this.start.y * scl + xBoxSize
    );
  }
}