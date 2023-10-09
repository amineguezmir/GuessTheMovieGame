// An array of objects, where each object represents a movie quote. Each object contains the quote text, the movie title, and a photo URL for an associated image.
var quotes = [
  {
    quote: "May the force be with you.",
    movie: "Star Wars",
    photo: "images/may-the-force-be-with-you-g9agwy2zmimulz3x.jpg",
  },
  {
    quote: "There's no place like home.",
    movie: "The Wizard of OZ",
    photo: "images/61B7IbRTDjL.jpg",
  },
  {
    quote:
      "My mama always said life was like a box of chocolates. You never know what you're gonna get.",
    movie: "Forrest Gump",
    photo: "images/fba8a649fa8819d81e0360c298701e27.jpg",
  },
  {
    quote: "I'll have what she's having.",
    movie: "When Harry met Sally",
    photo: "images/meg-ryan-2-6d065d6afa4a4b18a33cd5d5675bca76.jpg",
  },
  {
    quote: "keep your friends close, but your enemies closer.",
    movie: "The Godfather II",
    photo: "images/The_Godfather_Part_II.jpg",
  },
  {
    quote: "you talking to me?",
    movie: "Taxi Driver",
    photo: "images/Taxi_Driver.JPG",
  },
];
// A variable that stores the initial time limit for each question (in seconds).
var timeleft = 10;
// A variable that will hold the reference to the timer interval.
var timer;
// function updateTime(): A function that updates the displayed time based on the timeleft variable. It formats the time in minutes and seconds and updates the HTML element with id="starter" to display the formatted time.
function updateTime() {
  var minutes = Math.floor(timeleft / 60);

  var seconds = timeleft % 60;

  var formattedTime = minutes + ":";

  if (seconds < 10) {
    formattedTime += "0" + seconds;
  } else {
    formattedTime += seconds;
  }
  // this element will display the formatted time to the user.
  $("#starter").text(formattedTime);
}
// function startTimer(): A function that starts a countdown timer. It uses the setInterval function to decrement the timeleft variable every second. When the timer reaches 0, it displays buttons with id="a" and id="b", and it shows an alert indicating that time is up.
function startTimer() {
  timer = setInterval(function () {
    timeleft--;

    updateTime();

    if (timeleft <= 0) {
      clearInterval(timer);

      $("#a,#b").show();

      alert("TIME'S UP!!");

      timeleft = 10;

      updateTime();
    }
  }, 1000);
}
// function guess(): A function that hides buttons with id="a" and id="b", starts the timer with startTimer(), and fetches a random quote using getRandomQuote().
function guess() {
  $("#a,#b").hide();
  // This function call updates the displayed time on your webpage. It ensures that the time left for the current question is displayed correctly to the user.
  updateTime();
  getRandomQuote();
  startTimer();
}
// function resetGame(): A function called when the user makes a correct guess. It clears the quote display, resets the timer, updates the time display, fetches a new random quote, and restarts the game by calling guess().
function resetGame() {
  // : This line of code clears the content of the HTML element represented by $("h").this element is where i display the movie quote for the user to guess. By emptying it,  remove the previous quote, preparing it to display a new random quote.
  $("h").empty();
  //  This line of code stops the running countdown timer by clearing the interval identified by the timer variable. When the user makes a correct guess, you want to stop the timer so that it doesn't continue counting down during the reset.
  clearInterval(timer);
  timeleft = 10;
  updateTime();
  getRandomQuote();
  guess();
}
// var randomQu and var currentIndex: Variables to manage the randomization of quotes and keep track of the current quote index.
var randomQu = randomQ(quotes);
var currentIndex = 0;
//  A function that shuffles the order of elements in the array to randomize the quotes.
function randomQ(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
// A function that gets a random quote from the shuffled quotes array and displays it in an HTML element with id="h". It also sets a thick double border for styling.
function getRandomQuote() {
  if (currentIndex >= randomQu.length) {
    randomQu = randomQ(quotes);

    currentIndex = 0;
  }

  var randomQuote = randomQu[currentIndex];

  currentIndex++;
  // This line of code sets the HTML content of the element with the ID "h" to display the selected quote as an <h3> element. The class "a" is added to style the quote.
  $("#h")
    .html("<h3 class='a'>" + randomQuote.quote + "</h3")
    .css("border", "thick double #FF766C");
}
// this is a jQuery function that runs when the document is fully loaded. It sets up event handlers for radio button clicks and the "help" button.
$(document).ready(function () {
  // This line selects all <input> elements with the attribute type set to "radio" and attaches a click event handler to them.these radio buttons represent the user's choices for the movie associated with the current quote.
  $("input[type='radio']").click(function () {
    // This line retrieves the value of the radio button that is currently checked. It does this by selecting all radio buttons with the attribute name set to "drone"  and checking which one is currently checked. The val() function returns the value of the checked radio button.
    var radioValue = $("input[name='drone']:checked").val();

    if (radioValue === randomQu[currentIndex - 1].movie) {
      alert("WOOW!!correct guess,you're a cinephile");
      resetGame();
      // This line of code empties the content of the HTML element with the ID "h." This is done to remove the currently displayed quote after the user has guessed correctly.
      $("#h").empty();
      clearInterval(timer);
      timeleft = 10;
      updateTime();
      getRandomQuote();
      guess();
    }
  });
});
// When the "help" button with id="v2" is clicked, it searches for an image associated with the current movie quote and appends it to the HTML element with id="h"
$("#v2").on("click", function () {
  for (var i = 0; i < quotes.length; i++) {
    if (quotes[i].movie === randomQu[currentIndex - 1].movie) {
      var image = quotes[i].photo;
      $("#h").append(
        `<img class='h1' src='${image}' style='width:200px;height:150px'>`
      );
    }
  }
});
// Initially, buttons with id="a" and id="b" are shown, and the updateTime() and getRandomQuote() functions are called to set up the initial state of the game.
$("#a,#b").show();
updateTime();
getRandomQuote();
