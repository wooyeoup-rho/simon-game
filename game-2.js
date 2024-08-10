var gamePattern = [];
var userClickedPattern = [];
var userClickCount = 0;
var gameStarted = false;
var gameLevel = 0;
var buttonColors = ["red", "blue", "green", "yellow"];

//Options
var pattern = true;

$(document).ready(function() {
    $("body").css("-webkit-user-select", "none");
    $("body").css("-moz-user-select", "none");
    $("body").css("-ms-user-select", "none");
    $("body").css("user-select", "none");
    $(".row").hide();
});

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    console.log(gamePattern);
    playSequence();
    $("h1").text("Level " + ++gameLevel);

    userClickCount = 0;
}

function playSequence() {
    for (var i=0; i < gamePattern.length; i++) {
        playButton(i);
    }
}

function playButton(i) {
    setTimeout(function() {
        animatePress(gamePattern[i]);
        playSound(gamePattern[i]);
    }, 300 * i);
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
    $("h1").html("Game Over.<br>Press any key to restart");
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

    $(".option").show();
    $(".row").hide();
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
        $(".option").hide();
        $(".row").show();
        startGame();
    }
});

function startGame() {
    setTimeout(function() {
        nextSequence();
    }, 1000);
}

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

/* Options */
$(".option-button").on("click", function() {
    $("#options-btn").toggle("hide");
    $("#option-menu").toggle("hide");
    $("#changelog-btn").toggle("hide");
    $("#manual-btn").toggle("hide");
});

$("#pattern-button").on("click", function() {
    if ($("#pattern-button").hasClass("easy")) {
        $("#pattern-button").removeClass("easy");
        $("#pattern-button").addClass("hard");
        $("#pattern-text").text("HIDE");
        pattern = false;
    } else {
        $("#pattern-button").removeClass("hard");
        $("#pattern-button").addClass("easy");
        $("#pattern-text").text("SHOW");
        pattern = true;
    }
});

/* Changelog */
$(".changelog-button").on("click", function() {
    $("#options-btn").toggle("hide");
    $("#changelog-menu").toggle("hide");
    $("#changelog-btn").toggle("hide");
    $("#manual-btn").toggle("hide");
});

/* Manual */
$(".manual-button").on("click", function() {
    $("#options-btn").toggle("hide");
    $("#manual-menu").toggle("hide");
    $("#manual-btn").toggle("hide");
    $("#changelog-btn").toggle("hide");
});