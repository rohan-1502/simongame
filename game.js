
var started = false;
var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "green", "yellow", "blue"];
var level = 0;

$(document).keypress(function() {

  if (!started) {
    $("h1").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function nextSequence() {

  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);
  started = false;

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("."+randomChosenColour).fadeOut(50).fadeIn();
  playSound(randomChosenColour);

}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel]===gamePattern[currentLevel]) {
    console.log("success");

    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
      },1000);
    }
  }
  else {
    console.log("wrong");
    var wrongAudio = new Audio("sounds/wrong.mp3");
    wrongAudio.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over, Press Any Key To Restart");
    startOver();
  }
}

function playSound(name) {
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("."+currentColour).addClass("pressed");
  setTimeout(function() {
    $("."+currentColour).removeClass("pressed");
  }, 90);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
