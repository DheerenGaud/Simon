let userClickedPattern=[];
let level=0;
var started = false;
let buttonColours=["red","blue","green","yellow"]
let gamePattern=[];
let randomNumber;
let randomChosenColour;


$(".rule").slideUp();
function nextSequence(){
    let n=Math.random();
    n=n*4;
    randomNumber=Math.floor(n);
    randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    var crash = new Audio("./sounds/"+randomChosenColour+".mp3");
    crash.play();
    level++;
    if(level!==0){
        $("h1").text("Level "+level);
    }
}

$(".btn").click(function(){
   let userChosenColour=this.id
   userClickedPattern.push(userChosenColour+"");
   console.log(userClickedPattern)
   playSound(userChosenColour);
   animatePress(userChosenColour);
   checkAnswer(userClickedPattern.length-1)
})

function playSound(name){
    var crash = new Audio("./sounds/"+name+".mp3");
    crash.play();
}
function animatePress(animatePress){
       $("#"+animatePress).addClass("pressed");
       setTimeout(()=>{
           $("#"+animatePress).removeClass("pressed");
       },100)
}

$(document).keypress(function() {
    if (!started) {
          level=0;
    $("body").removeClass("game-over")
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });
function checkAnswer(currentLevel){
   if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    console.log("succes")
    if(userClickedPattern.length===gamePattern.length){
        setTimeout(function () {
            userClickedPattern = [];
            nextSequence();
          }, 1000);
    }
   }
   else{
    console.log("wrong")
     playSound("wrong")
     reStart();
     setTimeout(function () {
        $("body").addClass("game-over")
        $("#level-title").text("Game Over, Press Any Key to Restart Or Start");
      }, 200);
   }
}
function reStart(){

    userClickedPattern = [];
    started=false;
    $(".Sbtn").show();
}

$(".Rbtn").click(function(){
    $(".rule").slideToggle();
})
$(".Sbtn").click(function() {
    console.log("hellow")
    if (!started) {
        level=0;
        $("body").removeClass("game-over")
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
    $(".Sbtn").hide();
})
