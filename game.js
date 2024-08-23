var gamePattern = [];
var userClickedPattern = [];
var userClickCount = 0;
var gameStarted = false;
var gameLevel = 0;
var buttonColors = ["red", "blue", "green", "yellow"];

//Options
var pattern = true;
var interval = 300;
var sound = true;
var highScore = 0;

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

    if (pattern) {
        playSequence();
    } else {
        playLast();
    }

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
        if (sound) {
            playSound(gamePattern[i]);
        }
    }, interval * i);
}

function playLast() {
    setTimeout(function() {
        animatePress(gamePattern[gamePattern.length-1]);
        if (sound) {
            playSound(gamePattern[gamePattern.length-1]);
        }
    }, interval);
}

function checkAnswer(chosenColour) {
    if (chosenColour != gamePattern[userClickCount] && gameStarted) {
        gameOver();
    }

    userClickCount++;

    if (userClickCount == gamePattern.length) {
        if (gamePattern.length > highScore) {
            highScore = gamePattern.length;
        }

        setTimeout(function() {
            nextSequence();
        }, 1000);
    }
}

function gameOver() {
    $("h1").html("Game Over.<br>Press any key to restart");
    $("#high-score").text("Highscore: " + highScore);
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
    $("#high-score").toggle("hide");
    $("#options-btn").toggle("hide");
    $("#changelog-btn").toggle("hide");
    $("#manual-btn").toggle("hide");
}

$(".btn").on("click", function(event) {
    var userChosenColour = event.target.id;
    animatePress(userChosenColour)
    if (sound) {
        playSound(userChosenColour);
    }
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

    $("#high-score").toggle("hide");
    $("#options-btn").toggle("hide");
    $("#changelog-btn").toggle("hide");
    $("#manual-btn").toggle("hide");
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

$("#interval-button").on("click", function() {
    if ($("#interval-button").hasClass("hard")) {
        $("#interval-button").removeClass("hard");
        $("#interval-button").addClass("easy");
        $("#interval-text").text("500");
        interval = 500;
    } else if ($("#interval-button").hasClass("easy")) {
        $("#interval-button").removeClass("easy");
        $("#interval-button").addClass("medium");
        $("#interval-text").text("300");
        interval = 300;
    } else {
        $("#interval-button").removeClass("medium");
        $("#interval-button").addClass("hard");
        $("#interval-text").text("100");
        interval = 100;

        // Also turns sound off. Would need a smoother short sound for such high playback.
        $("#sound-button").removeClass("easy");
        $("#sound-button").addClass("hard");
        $("#sound-text").text("OFF");
        sound = false;
    }
});

$("#sound-button").on("click", function() {
    if ($("#sound-button").hasClass("easy")) {
        $("#sound-button").removeClass("easy");
        $("#sound-button").addClass("hard");
        $("#sound-text").text("OFF");
        sound = false;
    } else if ($("#sound-button").hasClass("hard") && interval != 100) {
        $("#sound-button").removeClass("hard");
        $("#sound-button").addClass("easy");
        $("#sound-text").text("ON");
        sound = true;
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