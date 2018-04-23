
  console.log("Starship Troopers!!!");

  let playScreen = document.querySelector('.startScreen'),
  	  playButton = document.querySelector('#start'),
      content = document.querySelector('#gameplayArea'),
      imagePaths = ["images/cardFront.png",
                    "images/cardFront2.png",
                    "images/cardFront3.png",
                    "images/cardFront4.png",
                    "images/cardFront5.png",
                    "images/cardFront.png",
                    "images/cardFront2.png",
                    "images/cardFront3.png",
                    "images/cardFront4.png",
                    "images/cardFront5.png"
                    ],
      list = document.createElement("ul"),
      flip =[],
      matches = 0,
      score = 0,
      scoreArea = document.querySelector("#scoreCount"),
      lives = 5,
      gameOverMessage = document.querySelector('.typeEffect h1'),
      playAgain = document.querySelector('#playAgain'),
      lifeList = document.querySelector('.livesCon');


//function to reveal game play after clicking "play" on start screen
function beginGame() {
	playScreen.classList.add('showPiece');

}


//shuffle cards

var i = imagePaths.length, j, temp;

while(--i >= 0) {
    j = Math.floor(Math.random() * (i+1)); // Get random number ranging between 0 and i
    temp = imagePaths[j]; 
    imagePaths[j] = imagePaths[i];
    imagePaths[i] = temp;

    list.innerHTML += `<li><section class="container"><div class="card">
             <img src="images/cardBack.png" class="front">
             <img src="${imagePaths[i]}" alt="card" class="back">
             </div></section></li>`
}

content.appendChild(list);


let cards = Array.from(document.querySelectorAll('.card'));

lifeList.innerHTML += "x"+lives;
scoreArea.innerHTML = score;


//timer
var sec = 0; function pad ( val ) { return val > 9 ? val : "0" + val; } setInterval( function(){
   document.getElementById("seconds").innerHTML=pad(++sec%60);
   document.getElementById("minutes").innerHTML=pad(parseInt(sec/60,10)); }, 1000);

//flip card back over -> see the comment on line 72
function removeFlip() {
  this.classList.remove('flipped');
}

//flip card
function flipCard() {
	this.classList.add('flipped');

  flip.push(this); // push the whole div into the array

  checkCards(flip.length);
}

  function match() {

    if (flip[0].querySelector('.back').src != flip[1].querySelector('.back').src) {
      score -=5;
      scoreArea.innerHTML = score;//lose 5 pts for wrong guess
      lives--
      lifeList.innerHTML = "x"+lives;
      // if(lives ==0){
         gameOver();
      // }
      removeFlip.call(flip[0]); // or you can do it like this: removeFlip(flip[0]);
      removeFlip.call(flip[1]); // same as above -> but you'd have add card to the removeFlip function inside the round brackets

      flip = [];
      console.log(score);

    } if (flip[0].querySelector('.back').src == flip[1].querySelector('.back').src) {//empty array if match
      score +=20;
      scoreArea.innerHTML = score;//gain 20 pts for match
      matches++;
      flip = [];
      console.log(matches);
 
    
       // } if (matches == 4){
       //  gameOverMessage.innerHTML = "You Win! Congratulatios!";
        gameOver();
      }


  }

function checkCards(len) {
  gameOver();
  if(len===2){
    setTimeout(() => match(), 1500);
  }
  
}


function gameOver(){
  if(lives ==0){
    gameOverMessage.classList.remove('showPiece');
    playAgain.classList.remove('showPiece');
  }if (matches == 5){
    gameOverMessage.innerHTML = "You Win! Well Done Soldier!";
    gameOverMessage.classList.remove('showPiece');
    playAgain.classList.remove('showPiece');
  }
}


function resetGame(){
  cards.forEach(card => card.classList.remove('flipped'));
  gameOverMessage.classList.add('showPiece');
  playAgain.classList.add('showPiece');
  lives = 5;
  matches = 0;
  flip = [];
  sec = 0;
  score = 0;
  scoreArea.innerHTML = score;
  lifeList.innerHTML = "x"+lives;
}

playButton.addEventListener('click', beginGame);
playAgain.addEventListener('click', resetGame);
cards.forEach(card => card.addEventListener('click', flipCard));
