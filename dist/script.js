let playerName = prompt("Whats Your Name?");
if (playerName == null || playerName == "") {
  document.querySelector(".playerName span").innerHTML = "Unknown";
} else {
  document.querySelector(".playerName span").innerHTML = playerName;
}

let score = 0;
let timeLeft = 240;
let gameOver = false;
let duration = 1000;
let matchedPairs = 0;
let totalPairs = 10;
let gameCards = document.querySelector("#game-cards");
let cards = Array.from(gameCards.children);
let orderRange = Array.from(Array(cards.length).keys());

swapIndex(orderRange);

cards.forEach((card, index) => {
  card.style.order = orderRange[index];
  card.addEventListener("click", function () {
    flipCards(card);
  });
});

function flipCards(selectedBlock) {
  selectedBlock.classList.add("flipped");
  let flippedCards = cards.filter((flippedBlock) =>
    flippedBlock.classList.contains("flipped")
  );

  if (flippedCards.length === 2) {
    stopClicking();
    checkSimilarCards(flippedCards[0], flippedCards[1]);
  }
}

function stopClicking() {
  gameCards.classList.add("no-clicking");
  setTimeout(() => {
    gameCards.classList.remove("no-clicking");
  }, duration);
}

function checkSimilarCards(firstBlock, secondBlock) {
  let triesElement = document.querySelector(".wrongTry span");
  let finalScore = document.querySelector(".score-label span");
  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
    firstBlock.classList.remove("flipped");
    secondBlock.classList.remove("flipped");
    firstBlock.classList.add("similar");
    secondBlock.classList.add("similar");
    finalScore.innerHTML = parseInt(finalScore.innerHTML) + 1;
    score++;
    matchedPairs++;
    document.getElementById("success").play();
    if (matchedPairs === totalPairs) {
      setTimeout(() => {
        alert(`Congratulations! You found all pairs. Final Score: ${score}`);
      }, 500);
    }
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

    setTimeout(() => {
      firstBlock.classList.remove("flipped");
      secondBlock.classList.remove("flipped");
    }, duration);

    document.getElementById("fail").play();
  }
}

function swapIndex(array) {
  let current = array.length;
  let tempStore;
  let random;

  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;
    tempStore = array[current];
    array[current] = array[random];
    array[random] = tempStore;
  }
  return array;
}
// Timer setup
function startTimer() {
  const timerLabel = document.querySelector(".time-label span");
  const timerInterval = setInterval(() => {
    if (gameOver) return;
    timeLeft--;
    timerLabel.textContent = `Time Left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      if (matchedPairs < totalPairs) {
        gameOver = true;
        setTimeout(() => {
          alert("Game Over! Time's up. Final Score: " + score);
          location.reload();
        }, 500);
      }
      else if (matchedPairs === totalPairs) {
        setTimeout(() => {
          alert(`Congratulations! You found all pairs. Final Score: ${score}`);
        }, 500);
      }
    }
    
  }, 1000);
}
startTimer();
