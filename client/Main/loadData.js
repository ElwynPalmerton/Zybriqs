
function loadData(zibID) {
  const url = "/restore";

  let requestData = {
    zibID: zibID,
  };

  $.post(url, requestData, function (data, status) {
    newStateJSON = JSON.parse(data);
    console.log("Loading state in loadData: ", newStateJSON);
    if (newStateJSON) {
      console.log('new state');
      initializeObjects(newStateJSON);
      submitSession(); //Sends the session data to the server (saveState.js.)
    } else {
      initializeObjects(defaultObject2);
    }
    return newStateJSON;
  })
}


function reset() {
  initializeObjects(defaultObject2);
}


function loadSessionState() {
  //This is called from setup() in Sketch.js.
  // if the user is not logged in it should return the default object.
  const url = '/saveName/session';

  $.get(url, function (data) {
    if (data) {
      newSessionState = JSON.parse(data);
      initializeObjects(newSessionState);
    }
  })
}