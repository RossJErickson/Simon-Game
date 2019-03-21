/* jshint esversion: 6 */


/****************************Variable Set Up***********************************/


audioDict = {
  "red": new Audio("sounds/red.mp3"),
  "green": new Audio("sounds/green.mp3"),
  "blue": new Audio("sounds/blue.mp3"),
  "yellow": new Audio("sounds/yellow.mp3"),
  "wrong": new Audio("sounds/wrong.mp3")
};

for (var key in audioDict) {
  audioDict[key].volume = 0.6;
}

var sequence = [];
var currentPlace = -1;
var userMove = "";


/****************************Event Handlers************************************/


$(".btn").click(function() {
  buttonClick($(this));
  if (currentPlace >= 0) {
    makeMove($(this));
  }
});

$(document).keydown(beginGame);


/****************************Game Actions**************************************/


function beginGame() {
  currentPlace = 0;
  sequence = [];
  startNextLevel();
}

function startNextLevel() {
  sequence.push(selectNext());
  $(".main-title").text("Level "+sequence.length);
  playSequence();
}

function playSequence() {
  var i = 0;
  var replayingSequence = setInterval(
    function () {
      buttonClick(  $("."+sequence[i++])  );
    },
    666
  );
  setTimeout(function () {clearInterval(replayingSequence);}, (sequence.length+1)*666);
}


/****************************Player Agency************************************/


function buttonClick(targetButton) {
  audioDict[targetButton.attr("id")].play();
  targetButton.addClass("pressed");
  setTimeout(
    function(){
      targetButton.removeClass("pressed");
    },
    100
  );
}

function makeMove(targetButton) {
  userMove = targetButton.attr("id");
  resolveMove();
}

function resolveMove() {
  if (userMove !== sequence[currentPlace]) {
    audioDict.wrong.play();
    $(".main-title").text("Game Over");
    setTimeout(function() {
      $(".main-title").text("Press any key to start");
    }, 3000
    );
    $("body").addClass("game-over");
    setTimeout(
      function () {
        $("body").removeClass("game-over");
      },
      200
    );
    currentPlace = -1;
  }
  else {
    currentPlace++;
    if (currentPlace === sequence.length) {
      currentPlace = 0;
      startNextLevel();
    }
  }
}


/****************************Helper Functions**********************************/


function randomInt(upperBound) {
  // upper_bound exclusive
  return Math.floor(Math.random()*upperBound);
}

function selectNext() {
  var possibilities = [
    "red",
    "green",
    "blue",
    "yellow"
  ];
  return possibilities[randomInt(4)];
}
