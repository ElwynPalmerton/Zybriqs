function addBalls() {
  const defaultBallColor = {
    h: random(360),
    s: 35,
    l: 100,
    a: 0.5
  };


  let ball = new Mover(random(width), height / 5, defaultBallColor);
  moverSystem.balls.push(ball);
  qty++;
}



function removeBalls() {
  moverSystem.balls.pop();
  qty--;


  updateSliders2();

}