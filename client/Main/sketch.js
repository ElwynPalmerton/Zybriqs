//Zibriqs by Elwyn Palmerton
//

//Object variables:
const balls = [];
var qty = 3; //I can remove this after I change setup to just respond to the initialization object.
const reverseLiquids = [];
const liquids = [];
const backgroundArray = [];
var blocks = [];
let objectType;

//Display variables:
const dimAmt = 30;

//Force variabes;
let xOff = 0;
let friction; //Can this be a variable inside of the mover class???
let dragCoefficient = 0.01;
const acceleratorCoefficient = 0.01;
const gravityConstant = 0.05;
let gForce = 0.12; //gForce = 0.12
const minMass = 0.5;
const maxMass = 2.0;
//Wind Variables:
const windC = 0.05;
let intensityInput = 50;
let directionInput = 0;

//Grid parameters
var cnv;
const initWidth = 1000;
const initHeight = 800;
const minSize = 24;

//Interface variables
let infoPopup = true;
var drawButtonOn = false;
var removeButtonOn = false;
let zenMode = false;
let fullScreen = false;
var buttons = [];
var run = true;
var scl;
var gridActive = false;

function initializeCanvas(startWidth, startHeight, calcScale) {
  //Remove any canvas children in the canvasContainer.

  scl = calcScale(); //setScale is passed into initializeCanvas.

  cnv = createCanvas(startWidth * scl, startHeight * scl);

  let currentWidth = startWidth * scl;
  let btns = document.getElementsByClassName("buttons");

  // btns.style.width = currentWidth + "px";

  //cnv = createCanvas(startWidth, startHeight);
  let container = document.getElementById("canvasContainer");
  container.appendChild(cnv.elt);
}

function createResizeListener() {
  document.addEventListener("fullscreenchange", exitHandler);
  document.addEventListener("webkitfullscreenchange", exitHandler);
  document.addEventListener("mozfullscreenchange", exitHandler);
  document.addEventListener("MSFullscreenChange", exitHandler);

  function exitHandler() {
    if (fullScreen === false) {
      fullScreen = true;
      //console.log('reinitializing');
    } else if (fullScreen === true) {
      fullScreen = false;
      initializeCanvas(initWidth, initHeight, setScale3);
      if (run === false) {
        drawElementsDuringSetup();
      }
    }
  }
}
///////SETUP///////


function setup() {
  colorMode(HSB);

  //setup canvas.
  initializeCanvas(initWidth, initHeight, setScale3);
  createResizeListener();

  //Gets the params from the URL
  const urlParams = new URLSearchParams(window.location.search);
  savedZib = urlParams.get("savedZib");

  //zibState is the default object.
  let zibState = Object.assign({}, defaultObject2);

  if (savedZib) {
    //loadData calls initializeObjects.
    //Why does this work this way? Object assignment?
    //Why isn't it being over-ridden by the call to
    //initializeObjects(defaultObject2) below.
    let savedZybObject = loadData(savedZib);
    //Instead of calling initializeObjects from loadData, it should return the value.
    zibState = Object.assign({}, savedZybObject);
  } else {
    loadSessionState();  //Retrieves session data from '/saveName/session';
  }

  initializeObjects(empty);
  //Initialize the interface.
  makeButtons();
  createController();
  //Read the initial color values from the controller.
  readController();

  function addSessionUpdateListener() {
    let body = document.body;
    body.addEventListener("mouseup", () => {
      submitSession();   //This function is in saveState.
    });
  }
  addSessionUpdateListener();
}