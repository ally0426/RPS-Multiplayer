var computerChoices = ["r", "p", "s"];
              
// Creating variables to hold the number of wins, losses, and ties. They start at 0.
var wins = 0;
var losses = 0;
var ties = 0;

// This function is run whenever the user presses a key.
document.onkeyup = function(event) {

  // Determines which key was pressed.
  var userGuess = event.key;

  // Randomly chooses a choice from the options array. This is the Computer's guess.
  var computerGuess = computerChoices[Math.floor(Math.random() * computerChoices.length)];

  // Reworked our code from last step to use "else if" instead of lots of if statements.

  // This logic determines the outcome of the game (win/loss/tie), and increments the appropriate number
  if ((userGuess === "r") || (userGuess === "p") || (userGuess === "s")) {

    if ((userGuess === "r") && (computerGuess === "s")) {
      wins++;
    } else if ((userGuess === "r") && (computerGuess === "p")) {
      losses++;
    } else if ((userGuess === "s") && (computerGuess === "r")) {
      losses++;
    } else if ((userGuess === "s") && (computerGuess === "p")) {
      wins++;
    } else if ((userGuess === "p") && (computerGuess === "r")) {
      wins++;
    } else if ((userGuess === "p") && (computerGuess === "s")) {
      losses++;
    } else if (userGuess === computerGuess) {
      ties++;
    }

    // Creating a variable to hold our new HTML. Our HTML now keeps track of the user and computer guesses, and wins/losses/ties.
    var html =
      "<br><br>" +
      "<p>You chose: " + userGuess + "</p>" +
      "<p>The computer chose: " + computerGuess + "</p>" +
      "<p>wins: " + wins + "</p>" +
      "<p>losses: " + losses + "</p>" +
      "<p>ties: " + ties + "</p>";

    // Set the inner HTML contents of the #game div to our html string
    document.querySelector("#game").innerHTML = html;
  }
};


// Initialize Firebase
    // This is the code we copied and pasted from our app page
    // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB4jFCFQTtqZq-mjpy93GkzZmJW_h4_xZw",
    authDomain: "rps-multiplayer-game-ad35d.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-game-ad35d.firebaseio.com",
    projectId: "rps-multiplayer-game-ad35d",
    storageBucket: "",
    messagingSenderId: "528642204779"
  };
  firebase.initializeApp(config);

    // VARIABLES
    // --------------------------------------------------------------------------------

    // Get a reference to the database service
    var database = firebase.database();

    // FUNCTIONS + EVENTS
    // --------------------------------------------------------------------------------

    // On Click of Button
    $("#click-button").on("click", function() {

      // Add to clickCounter
      

      //  Store Click Data to Firebase in a JSON property called clickCount
      // Note how we are using the Firebase .set() method
      database.ref().set({
        winCount: wins,
        lossCount: losses,
        tiesCount: ties
      });
    });

    // MAIN PROCESS + INITIAL CODE
    // --------------------------------------------------------------------------------

    // Using .on("value", function(snapshot)) syntax will retrieve the data
    // from the database (both initially and every time something changes)
    // This will then store the data inside the variable "snapshot". We could rename "snapshot" to anything.
    database.ref().on("value", function(snapshot) {

      // Then we console.log the value of snapshot
      console.log(snapshot.val());

      // Then we change the html associated with the number.
      $("#click-value").text(snapshot.val().clickCount);

      // Then update the clickCounter variable with data from the database.
      clickCounter = snapshot.val().clickCount;

    // If there is an error that Firebase runs into -- it will be stored in the "errorObject"
    // Again we could have named errorObject anything we wanted.
    }, function(errorObject) {

      // In case of error this will print the error
      console.log("The read failed: " + errorObject.code);
    });

