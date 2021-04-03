
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];

var started = false;

var level = 0;

$("*").keydown(function(){

    if(!started){
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }
  });

$(".btn").click(function() {

    var userChosenColor = $(this).attr("id");
   
    userClickedPattern.push(userChosenColor);
  
    /* console.log(userClickedPattern); */

    playSound(userChosenColor);

    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
  
  });

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]){
        console.log("Success");

        if(userClickedPattern.length == gamePattern.length){
        setTimeout(() => {
           nextSequence();
        }, 1000);
        }
    }
    else {
        playSound("wrong");
        $("*").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");
        setTimeout(() => {
            $("*").removeClass("game-over");
        }, 200);
        startOver();
    }
}

function startOver(){
    started = false;
    gamePattern.length = 0;
    level = 0;
}


function nextSequence() { 

    userClickedPattern.length = 0;

    level ++;

    $("h1").text("Level " + level);

    var randomNumber = Math.round(Math.random() * 3);

    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("button." + randomChosenColor).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);

} 

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");

    audio.play();
}

function animatePress(currentColor){

    $("#" + currentColor).addClass("pressed");

    setTimeout(() => {
        $("#" + currentColor).removeClass("pressed");
    }, 100);

/*     console.log(currentColor); */
}

