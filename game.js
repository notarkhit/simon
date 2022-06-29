var buttonColors = ["red", "blue", "green", "yellow"]

var gamePattern = []

var userClickedPattern =[]

var gameStart = false

var level = 0

$(document).keypress( () => {
  if(!gameStart){
    $("#level-title").text("level " + level)
    nextSequence()
    started = true
  }
})

$(".btn").click( (e) => {
  var userChosenColor = e.target.id
  userClickedPattern.push(userChosenColor)
  playSound(userChosenColor)
  animatePress(userChosenColor)
  checkAnswer(userClickedPattern.length - 1)
  // console.log(userClickedPattern)
})

// * startOver 
function startOver(){
  level = 0
  gamePattern = []
  userClickedPattern = []
  gameStart = false

}

// * checkAnswer
function checkAnswer(currentLevel) {

  //  console.log(userClickedPattern[currentLevel] + " === " + gamePattern[currentLevel] ) 

  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){

    console.log("success")

      if(userClickedPattern.length === gamePattern.length ) {

        setTimeout(() => {
          nextSequence()
        }, 1000);

      }
  } else {
    console.log("wrong")

    $("#level-title").text("Game Over, Press Any Key to Restart")
    $("body").addClass("game-over")

    setTimeout(() => {
      $("body").removeClass("game-over")
    }, 200);
    
    startOver()
  }
  
}


// * nextSequence
function nextSequence(){

  userClickedPattern = []

  level++;
  $("#level-title").text("level " + level)

  var randomNumber = Math.floor(Math.random()*4)
  var randomChosenColor = buttonColors[randomNumber]

  gamePattern.push(randomChosenColor)

  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100)
  playSound(randomChosenColor)
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed")
  
  setTimeout( () => {
    $("#" + currentColor).removeClass("pressed")
  },100)
}

