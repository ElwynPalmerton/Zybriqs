function makeButtons() {
  let playButton = document.getElementById("newPlayButton");


  makePlayButton(playButton);
  makeBlockButton(playButton);
  makeDragButton(playButton);
  makeReverseDragButton(playButton);
  makeRemoveButton(playButton);
  makeAddBallsButton();
  makeRemoveBallsButton();
  //makeResetButtons();
  makeNumbersButtons(playButton);
  makeZenModeButtons()
  makeInfoButton();
  //makeFullscreenButtons()
  appendClassNames();
}

function lastActive() {
  return buttons.some((btn) => btn.className === "active");
}

/////PPP/////////
function keyPressed(e) {
  if (keyCode === 80) {
    e.preventDefault();
    //"P" - Makes all the balls move spasstically updward.
    console.log("pressed");
    let bounce = createVector(0, -1);

    for (let i = 0; i < qty; i++) {
      bounce.mult(balls[i].mass);
      balls[i].applyForce(bounce);
    }
  }

}


// function keyPressed(e) {
//   if (key = " ") {
//     e.preventDefault();
//     pausePlay();
//   }
// }



function play(playBtn) {
  run = true;
  playBtn.innerHTML = "<i class=\"fa fa-pause\"></i>";
  playBtn.className = "notActive";
  playBtn.classList.add("btn-row-1");
  clearDuplicates();
  loop();
}

function pause(playBtn) {
  run = false;
  playBtn.innerHTML = "<i class=\"fa fa-play\"></i>"
  playBtn.className = "paused";
  //createRemoveButtons();
  drawElementsDuringSetup(); //This function is in the listeners.js file.
  noLoop();
}

function pausePlay(pButton) {
  buttons.forEach(b => (b.className = "notActive"));

  clearDuplicates(); //Clears any identical duplicate objects.

  if (run === false) {
    play(pButton);
    drawButtonOn = false;
  } else {
    //It seems like this is working without the if statement to check "run" but I do use run elsewhere.
    pause(pButton);
  }
}


function makePlayButton(playButton) {

  playButton.innerHTML = "<i class=\"fa fa-pause\"></i>";

  let buttonContainer = document.getElementById('buttonContainer');
  // buttonContainer.appendChild(playButton);
  //If the "Draw Block" button is pressed the listeners for drawing blocks
  // (And adding newly created Outline objects to the blocks array) is activated.
  //Creating btn and btn2 and adding the eventlisteners should be wrapped in a separate function.
  playButton.addEventListener("click", e => {
    //If the play/resume button is hit it plays.
    //Also add stopPropagation.
    e.preventDefault();
    e.stopPropagation();
    pausePlay(playButton);
  });
}

function makeBlockButton(pButton) {
  let drawBlockButton = document.getElementById('newBlockButton');
  // buttonContainer.appendChild(drawBlockButton.elt);
  buttons.push(drawBlockButton);

  drawBlockButton.addEventListener('click', e => {
    e.stopPropagation();
    let current = drawBlockButton.className === "active";
    let lastActive = buttons.some((btn) => btn.className === "active");
    //Can I use the funciton which I wrote above instead.
    drawButtonOn = true;

    buttons.forEach(b => (b.className = "notActive"));
    if (run === true) {
      pause(pButton);
      drawBlockButton.className = "active";
    } else if (lastActive && !current && run === false) {
      drawBlockButton.className = "active";
    } else if (current && run === false) {
      drawButtonOn = false;
      play(pButton);
    } else {
      drawBlockButton.className = "active";
    }


    removeButtonOn = false;
    objectType = "Block"; //This should be passed in as an object instead of this.
    //...Then I would have to have it return the new object and push it to the correct array in here.
    listeners();
  });
}

function makeDragButton(pButton) {
  let drawDragButton = document.getElementById('newDragButton')
  buttons.push(drawDragButton);


  drawDragButton.addEventListener('click', (e) => {
    let current = drawDragButton.className === "active";
    let lastActive = buttons.some((btn) => btn.className === "active");

    buttons.forEach(b => (b.className = "notActive"));
    e.stopPropagation();
    drawButtonOn = true;
    //buttons.forEach(b => (b.className = "notActive"));
    if (run === true) {
      pause(pButton);
      drawDragButton.className = "active";
    } else if (lastActive && !current && run === false) {
      drawDragButton.className = "active";
    } else if (current && run === false) {
      drawButtonOn = false;
      play(pButton);
    } else {
      drawDragButton.className = "active";
    }

    removeButtonOn = false;
    objectType = "Drag";
    listeners();
  });
}

function makeReverseDragButton(pBtn) {
  let drawReverseDragButton = document.getElementById('newAcceleratorButton')
  buttons.push(drawReverseDragButton);
  drawReverseDragButton.addEventListener('click', (e) => {

    let current = drawReverseDragButton.className === "active";
    let lastActive = buttons.some((btn) => btn.className === "active");

    e.stopPropagation();
    resetButtons();
    drawButtonOn = true;
    //buttons.forEach(b => (b.className = "notActive")); //Clear function
    if (run === true) {
      pause(pBtn);
      drawReverseDragButton.className = "active";
    } else if (lastActive && !current && run === false) {
      drawReverseDragButton.className = "active";
    } else if (current && run === false) {
      drawButtonOn = false;
      play(pBtn);
    } else {
      drawReverseDragButton.className = "active";
    }

    //removeButtonOn = false; //Clear function.
    objectType = "Reverse Drag";
    listeners();
  });
}

function makeRemoveButton(pBtn) {
  let removeButton = document.getElementById('newRemoveButton')
  buttons.push(removeButton);
  removeButton.addEventListener('click', (e) => {

    let current = removeButton.className === "active";
    let lastActive = buttons.some((btn) => btn.className === "active");
    buttons.forEach(b => (b.className = "notActive"));
    e.stopPropagation();
    resetButtons();

    if (run === true) {
      pause(pBtn);
      removeButton.className = "active";
    } else if (lastActive && !current && run === false) {
      removeButton.className = "active";
    } else if (current && run === false) {
      play(pBtn);
    } else {
      removeButton.className = "active";
    }



    drawButtonOn = false; //Clear function.
    removeButtonOn = true;

    //I don't need this line for this function: objectType = "Reverse Drag";
    showRemoveButtons();
  });
}

function makeAddBallsButton() {
  let addBallsButton = document.getElementById('newAddBallButton');
  buttons.push(addBallsButton);
  resetButtons();
  addBallsButton.addEventListener('click', (e) => {
    e.stopPropagation();
    //addBallsButton.elt.className = "active";
    resetButtons();
    //addBallsButton.elt.className = "active";
    addBalls();
    updateSliders();
    drawElementsDuringSetup();
    //I don't need this line for this function: objectType = "Reverse Drag";
  });
}

function makeRemoveBallsButton() {
  let removeBallButton = document.getElementById('newRemoveBallButton')
  buttons.push(removeBallButton);
  resetButtons();



  removeBallButton.addEventListener('click', (e) => {

    //removeBallsButton.elt.className = "active";
    if (qty > 0) {
      removeBalls();
      updateSliders();
      drawElementsDuringSetup();
    } else {
      console.log('There are no balls to remove.');
    }
    //I don't need this line for this function: objectType = "Reverse Drag";
  });
}


function makeResetButtons() {
  let resetButton = createButton("Reset");
  buttonContainer.appendChild(resetButton.elt);
  buttons.push(resetButton.elt);
  resetButtons();
  resetButton.mouseClicked((e) => {
    e.stopPropagation();
    resetButton.elt.className = "active";
    removeAll();
    blocks.splice(0);
    liquids.splice(0);
    reverseLiquids.splice(0);
    balls.splice(0);
    //
    qty = 0;
    listeners();
    //I don't need this line for this function: objectType = "Reverse Drag";
  });
}


function makeNumbersButtons(pBtn) {
  let numbersButton = document.getElementById('newNumbersButton');
  buttons.push(numbersButton);
  numbersButton.addEventListener('click', (e) => {

    let current = numbersButton.className === "active";
    let lastActive = buttons.some((btn) => btn.className === "active");

    e.stopPropagation();
    resetButtons();

    if (run === true) {
      pause(pBtn);
      numbersButton.className = "active";
    } else if (lastActive && !current && run === false) {
      numbersButton.className = "active";
    } else if (current && run === false) {
      play(pBtn);
    } else {
      numbersButton.className = "active";
    }
    numbersButton.className = "active";
    if (run === true) {
      numbersButton.className = "notActive";
    }

    drawElementsDuringSetup()
    showNumbers();
    //I don't need this line for this function: objectType = "Reverse Drag";
  });
}


function makeInfoButton() {

  //infoPopup = true;
  let infoButton = document.getElementById('newInfoButton');
  infoButton.className = "notActive"
  //buttons.push(numbersButton);
  infoButton.addEventListener('click', (e) => {


    e.stopPropagation();
    //resetButtons();

    if (infoPopup === true) {
      infoPopup = false;
      infoButton.className = "notActive";
    } else if (infoPopup === false) {
      infoPopup = true;
      infoButton.className = "active";
    };

    console.log(infoButton.className);

  });

}



// document.addEventListener('keypress', e => {
//   console.log('hello');
// })

function makeZenModeButtons() {
  let zenButton = document.getElementById('newZenModeButton')
  buttons.push(zenButton);

  zenButton.addEventListener('click', (e) => {
    e.stopPropagation();
    let elem = document.querySelector('body');
    resetButtons();

    fullScreen = false;
    initializeCanvas(initWidth, initHeight, setScale);
    openFullScreen();

    function openFullScreen() {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        /* Firefox */
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        /* Chrome, Safari & Opera */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        /* IE/Edge */
        elem.msRequestFullscreen();
      }
    }
    //I don't need this line for this function: objectType = "Reverse Drag";
  });
}


function makeFullscreenButtons() {
  //I need to fix the background for this one too.
  //It also doesn't actually fullScreen because setScale is still being
  //...calculated for the height of the buttonDiv.
  let fullscreenButton = createButton("Fullscreen");
  buttonContainer.appendChild(fullscreenButton.elt);
  buttons.push(fullscreenButton.elt);

  fullscreenButton.mouseClicked((e) => {
    e.stopPropagation();
    fullScreen = true;
    let elt = document.querySelector('body');
    resetButtons();
    fullscreenButton.elt.className = "active";
    initializeCanvas(initWidth, initHeight, setScale);
    openFullScreen();

    function openFullScreen() {
      if (elt.requestFullscreen) {
        elt.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        /* Firefox */
        elt.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        /* Chrome, Safari & Opera */
        elt.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        /* IE/Edge */
        elt.msRequestFullscreen();
      }
    }
    //I don't need this line for this function: objectType = "Reverse Drag";
  });
}



function resetButtons() { //Change name to clearButtons();
  drawButtonOn = false; //Clear function.
  removeButtonOn = false; //Clear function.
  buttons.forEach(b => (b.className = "notActive")); //Clear function
}

//Make an "addAllButtons" function so that these don't all need to be referenced in setup();
//Also, that function can add them to the correct div and create the line-break.


function clearDuplicates() {
  //Removes any overlapping duplicate liquid objects.
  //For some reason, the event handlers sometimes register multiple clicks simultaneously and 
  //create multiple identical objects. I couldn't fix the event handlers so I put this in the clear
  //out the overlapping duplicatesl

  for (let i = liquids.length - 1; i >= 1; i--) {
    if (
      liquids[i].start.x === liquids[i - 1].start.x &&
      liquids[i].start.y === liquids[i - 1].start.y
    ) {
      liquids.splice(i, 1);
      //updateSliders();
      //removeDragBoxSelector();
    }
  }

  for (let i = reverseLiquids.length - 1; i >= 1; i--) {
    if (
      reverseLiquids[i].start.x === reverseLiquids[i - 1].start.x &&
      reverseLiquids[i].start.y === reverseLiquids[i - 1].start.y
    ) {
      reverseLiquids.splice(i, 1);
      // updateSliders();
      //removeAccelBoxSelector();
    }
  }

  for (let i = blocks.length - 1; i >= 1; i--) {
    if (
      blocks[i].start.x === blocks[i - 1].start.x &&
      blocks[i].start.y === blocks[i - 1].start.y
    ) {
      blocks.splice(i, 1);
      // updateSliders();
      //removeBlocks();
    }
  }
} //End of clearDuplicates();


function appendClassNames() {
  for (let i = 0; i < 4; i++) {
    buttons[i].classList.add("btn-row-1");
  }

  for (let i = 4; i < buttons.length; i++) {
    buttons[i].classList.add("btn-row-2");
  }

}