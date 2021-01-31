function addOptions(objects) {

  let numberSelector = document.getElementById("numberSelector");

  while (numberSelector.options.length > 0) {
    numberSelector.innerHTML = "";
    numberSelector.options.remove(0);
  }

  for (let i = 0; i < objects.length; i++) {
    let option = new Option(i + 1, i);
    numberSelector.appendChild(option);
  }
}

function createController() {

  let objectSelect = document.getElementById('objectSelector');
  let numberSel = document.getElementById('numberSelector');

  let obj = objectSelect.value;
  let objArray = getObjectArray(obj);
  addOptions(objArray);

  if (objArray.length > 0) {
    modifySliders(objArray[numberSel.value].color);
  } else {
    modifySliders();
  }
} //End of createController.


function readSliders(objectNumber) {

  let numberSelector = document.getElementById('numberSelector');
  let objectSelector = document.getElementById('objectSelector');


  let hSlider = document.querySelector(".combinedSliders .hSlider");

  hSlider.addEventListener("input", () => {
    objectNumber = numberSelector.value;
    let objects = getObjectArray(objectSelector.value);
    objects[objectNumber].color.h = hSlider.value;
  });


  let sSlider = document.querySelector(".combinedSliders .sSlider");

  sSlider.addEventListener("input", () => {
    objectNumber = numberSelector.value;
    let objects = getObjectArray(objectSelector.value);
    objects[objectNumber].color.s = sSlider.value;
  });

  let lSlider = document.querySelector(".combinedSliders .lSlider");

  lSlider.addEventListener("input", () => {
    objectNumber = numberSelector.value;
    let objects = getObjectArray(objectSelector.value);
    objects[objectNumber].color.l = lSlider.value;
  });

  let aSlider = document.querySelector(".combinedSliders .aSlider");

  aSlider.addEventListener("input", () => {
    objectNumber = numberSelector.value;
    let objects = getObjectArray(objectSelector.value);
    objects[objectNumber].color.a = aSlider.value;
  });
}


function readController() {
  //Gets the type of object being modified.
  let objectSelector = document.getElementById('objectSelector');
  let objects = getObjectArray(objectSelector.value);

  //Gets the number of the object
  let objectNumber = 0;
  objectNumber = numberSelector.value;

  readSliders(objectNumber, objects)
}


function modifySliders(newColor) {
  if (newColor === undefined) {
    newColor = {
      h: 180,
      s: 50,
      l: 50,
      a: .5
    }
  }

  let hSlider = document.querySelector(".combinedSliders .hSlider");
  let sSlider = document.querySelector(".combinedSliders .sSlider");
  let lSlider = document.querySelector(".combinedSliders .lSlider");
  let aSlider = document.querySelector(".combinedSliders .aSlider");

  hSlider.value = newColor.h;
  sSlider.value = newColor.s;
  lSlider.value = newColor.l;
  aSlider.value = newColor.a;
}


function updateSliders() {

  createController();

  let objectSelector = document.getElementById('objectSelector');
  let objects = getObjectArray(objectSelector.value);
  let objectNumber = 0;
  objectNumber = numberSelector.value;

  if (objects.length > 0) {
    modifySliders(objects[objectNumber].color);
  } else {
    modifySliders();
  }
}


function updateSliders2() {
  //updateSliders2 is the same as updateSliders() except that
  //... it does NOT call createController() because there was
  //... an issue where it would reset to the first object selection every time.

  // createController();
  let objectSelector = document.getElementById('objectSelector');

  let objects = getObjectArray(objectSelector.value);

  let objectNumber = 0;
  objectNumber = numberSelector.value;
  if (objects.length > 0) {
    modifySliders(objects[objectNumber].color);
  } else {
    modifySliders();
  }
}


function getObjectArray(obj) {
  let objArray = [];
  if (obj === "Balls") {
    objArray = moverSystem.balls;
  } else if (obj === "Drag") {
    objArray = liquids;
  } else if (obj === "Accelerator") {
    objArray = reverseLiquids;
  } else if (obj === "Blocks") {
    objArray = blocks;
  } else if (obj === "Background") {
    objArray = backgroundArray;
  }
  return objArray;
}