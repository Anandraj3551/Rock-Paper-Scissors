// Prevent animation on load
setTimeout(() => {
  document.body.classList.remove("preload");
}, 500);

// DOM
const btnRules = document.querySelector(".rules-btn");
const btnClose = document.querySelector(".close-btn");
const modalRules = document.querySelector(".modal");

const CHOICES = [
  {
    name: "paper",
    beats: "rock",
  },
  {
    name: "scissors",
    beats: "paper",
  },
  {
    name: "rock",
    beats: "scissors",
  },
];
const choiceButtons = document.querySelectorAll(".choice-btn");
const gameDiv = document.querySelector(".game");
const resultsDiv = document.querySelector(".results");
const resultDivs = document.querySelectorAll(".results__result");

const resultWinner = document.querySelector(".results__winner");
const resultText = document.querySelector(".results__text");

const playAgainBtn = document.querySelector(".play-again");

const scoreNumber = document.querySelector(".score__number");
const scoreNumber2 = document.querySelector(".score__number2");

let userScore = 0;
let aiScore = 0;

// Game Logic
choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const choiceName = button.dataset.choice;
    const choice = CHOICES.find((choice) => choice.name === choiceName);
    choose(choice);
  });
});

function choose(choice) {
  const aichoice = aiChoose();
  displayResults([choice, aichoice]);
  displayWinner([choice, aichoice]);
}

function aiChoose() {
  const rand = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[rand];
}

function displayResults(results) {
  resultDivs.forEach((resultDiv, idx) => {
    setTimeout(() => {
      resultDiv.innerHTML = `
        <div class="choice ${results[idx].name}">
          <img src="images/icon-${results[idx].name}.svg" alt="${results[idx].name}" />
        </div>
      `;
    }, idx * 1000);
  });

  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");
}

function displayWinner(results) {
  setTimeout(() => {
    const userWins = isWinner(results);
    const aiWins = isWinner(results.reverse());

    if (userWins) {
      resultText.innerText = "you win";
      resultDivs[0].querySelector(".choice").classList.add("winner");
      keepScore(1, 0);
    } else if (aiWins) {
      resultText.innerText = "you lose";
      resultDivs[1].querySelector(".choice").classList.add("winner");
      keepScore(0, 1);
    } else {
      resultText.innerText = "tie up";
    }
    resultWinner.classList.remove("hidden");
    resultsDiv.classList.add("show-winner");
  }, 1000);
}

function isWinner(results) {
  return results[0].beats === results[1].name;
}

function keepScore(userPoint, aiPoint) {
  userScore += userPoint;
  aiScore += aiPoint;
  scoreNumber.innerText = userScore;
  scoreNumber2.innerText = aiScore;
}

// Play Again
playAgainBtn.addEventListener("click", () => {
  gameDiv.classList.remove("hidden");
  resultsDiv.classList.add("hidden");

  resultDivs.forEach((resultDiv) => {
    resultDiv.innerHTML = "";
    resultDiv.querySelector(".choice")?.classList.remove("winner");
  });

  resultText.innerText = "";
  resultWinner.classList.add("hidden");
  resultsDiv.classList.remove("show-winner");
});

// Show/Hide Rules
btnRules.addEventListener("click", () => {
  modalRules.classList.add("show-modal");
});

btnClose.addEventListener("click", () => {
  modalRules.classList.remove("show-modal");
});

modalRules.addEventListener("click", (e) => {
  if (e.target === modalRules) {
    modalRules.classList.remove("show-modal");
  }
});
