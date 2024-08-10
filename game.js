var gamePattern = [];
var userClickedPattern = [];
var userClickCount = 0;
var gameStarted = false;
var gameLevel = 0;
var buttonColors = ["red", "blue", "green", "yellow"];

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    animatePress(randomChosenColour);
    playSound(randomChosenColour);
    $("h1").text("Level " + ++gameLevel);

    userClickCount = 0;
}

function checkAnswer(chosenColour) {
    if (chosenColour != gamePattern[userClickCount] && gameStarted) {
        gameOver();
    }

    userClickCount++;

    if (userClickCount == gamePattern.length) {
        setTimeout(function() {
            nextSequence();
        }, 1000);
    }
}

function gameOver() {
    $("h1").text("Game Over.\nPress any key to restart");
    $("body").addClass("game-over");
    playSound("wrong");

    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);

    gameStarted = false;
    userClickCount = 0;
    gameLevel = 0;
    gamePattern = [];
    userClickedPattern = [];
}

$(".btn").on("click", function(event) {
    var userChosenColour = event.target.id;
    animatePress(userChosenColour)
    playSound(userChosenColour);
    userClickedPattern.push(userChosenColour);
    checkAnswer(userChosenColour);
});

$(document).on("keypress", function(event) {
    if (!gameStarted) {
        gameStarted = true;
        $("h1").text("Level " + gameLevel);
        nextSequence();
    }
});

function playSound(name) {
    var audioElement = document.createElement('audio');
    var src = "./sounds/" + name + ".mp3";
    audioElement.setAttribute('src', src);
    audioElement.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}