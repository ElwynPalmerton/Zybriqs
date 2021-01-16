function listeners() {
  //listeners gets called from the makeBlockButton and the MakeDragButton
  drawElementsDuringSetup();

  let startRect, endRect;
  noStroke();
  fill(200);
  let first = false;
  var isDrawing = false;

  function onMouseDown() {
    if (drawButtonOn) {
      isDrawing = true;
      startRect = createVector(mouseX, mouseY).copy();
    }
  }

  let cnv = document.getElementById("canvasContainer");
  cnv.addEventListener("mousedown", onMouseDown);

  cnv.addEventListener("mousemove", () => {
    if (isDrawing === true) {
      endRect = createVector(mouseX, mouseY);

      drawElementsDuringSetup();

      if (endRect.x >= width) endRect.x = width - 1;
      if (endRect.x <= 0) endRect.x = 1;
      if (endRect.y >= height) endRect.y = height - 1;
      if (endRect.y <= 0) endRect.y = 1;
      makeRectangle(startRect, endRect); // args are vectors.
    }
  });

  cnv.addEventListener("mouseup", () => {
    //This is being called even if the isDrawing is already false.
    //...which means that startRect does not currently have a value.
    //...Which means which means that I should check to see if isDrawing
    //... is... already... false?

    isDrawing = false;
    if (
      startRect.x > 0 &&
      startRect.y > 0 &&
      startRect.x < width &&
      startRect.y < height &&
      endRect.x > 0 &&
      endRect.y > 0 &&
      endRect.x < width &&
      endRect.y < height
    ) {
      //Instead of "Outline" the class type should be a varible which is passed in from listeners.


      //Snap to grid.
      if (gridActive) {
        let gridSize = 25;
        gridSize *= scl;

        startRect.x = parseInt(startRect.x);

        let offset = startRect.x % gridSize;
        //25 is the value of gridSize in the background class.

        if (offset <= gridSize / 2) {
          startRect.x -= offset;
        } else {
          startRect.x += gridSize - offset;
        }

        endRect.x = parseInt(endRect.x);

        let offsetXEnd = endRect.x % gridSize;

        if (offsetXEnd <= gridSize / 2) {
          endRect.x -= offsetXEnd;
        } else {
          endRect.x += gridSize - offsetXEnd;
        }

        startRect.y = parseInt(startRect.y);

        let offsetYStart = startRect.y % gridSize;

        if (offsetYStart <= gridSize / 2) {
          startRect.y -= offsetYStart;
        } else {
          startRect.y += gridSize - offsetYStart;
        }

        endRect.y = parseInt(endRect.y);

        let offsetYEnd = endRect.y % gridSize;

        if (offsetYEnd <= gridSize / 2) {
          endRect.y -= offsetYEnd;
        } else {
          endRect.y += gridSize - offsetYEnd;
        }
      }

      //End of snap-to-grid

      if (run === false) {
        //Only lets it add blocks when the program is paused.

        if (objectType === "Drag") {
          let newLiquid = new Liquid(
            startRect,
            endRect,
            dragCoefficient,
            defaultDragColor,
            "a"
          );
          if (newLiquid.width > minSize && newLiquid.height > minSize) {
            liquids.push(newLiquid);
            clearDuplicates();
            createController();
            updateSliders2();
            //addDragBox();
          }
        } else if (objectType === "Block") {
          let block = new Outline(startRect, endRect, initBlockColors[0]);
          blocks.push(block);
          clearDuplicates();
          createController();
          updateSliders2();
        } else if (objectType === "Reverse Drag") {
          let newAccelerator = new Liquid(
            startRect,
            endRect,
            -dragCoefficient,
            defaultAccelColor,
            "d"
          );
          if (
            newAccelerator.width > minSize &&
            newAccelerator.height > minSize
          ) {
            reverseLiquids.push(newAccelerator);
            clearDuplicates();
            createController();
            updateSliders2();
          }
        }
        drawElementsDuringSetup(); //This function is in the file utilities/drawDuringSetup();
      }
    } //End of if stmt which checsk the edges of the box.
  }); //End event listener ('mouseup').
} //End listeners().