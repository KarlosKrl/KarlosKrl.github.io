"use strict";

//define global values
let leaderboardEasy = [
  { nume: "gicaE", scor: 5 },
  { nume: "ionut", scor: 1 },
  { nume: "maria", scor: 2 },
  { nume: "iulian", scor: 27 },
  { nume: "adrian", scor: 2 },
];
let leaderboardMedium = [
  { nume: "gicaM", scor: 5000 },
  { nume: "ionut", scor: 10 },
  { nume: "maria", scor: 200 },
  { nume: "iulian", scor: 270 },
  { nume: "adrian", scor: 20 },
];
let leaderboardHard = [
  { nume: "gicaH", scor: 5000 },
  { nume: "ionut", scor: 10 },
  { nume: "maria", scor: 200 },
  { nume: "iulian", scor: 270 },
  { nume: "adrian", scor: 20 },
];
let leaderboard;
let boolValue = true;
let uName;
let interval;
let dificulty;
let randomNumber;
let countTries = 10;
let tries = 10;
let auxScores = 0;
//create values
const divGame = document.querySelector(".div-game");
const containerLeaderboard = document.querySelector(".container-leaderboard");
const leaderboardButton = document.querySelector(".leaderboard-button");
const containerForm = document.querySelector(".container-form");
const form = document.querySelector("form");
const verifyButton = document.querySelector(".verify-button");
const inputValue = document.querySelector(".your-number");
const hints = document.querySelector(".hints");
const reset = document.querySelector(".reset-button");
const game = document.querySelector(".game");
const numberOfTries = document.querySelector(".number-of-tries");
const welcomeMesage = document.querySelector(".welcome-mesage");

// utilities
const showLeaderboard = function (arr, max) {
  for (let i = 0; i < max; i++) {
    let position = document.querySelector(`.position${i + 1}`);
    let name = document.querySelector(`.nume${i + 1}`);
    let puncte = document.querySelector(`.scor${i + 1}`);
    position.textContent = `${i + 1}.`;
    name.textContent = `${arr[i].nume}`;
    puncte.textContent = `${arr[i].scor} pt`;
  }
};

const setArray = function (dificulty) {
  dificulty === 1
    ? (leaderboard = leaderboardEasy)
    : dificulty === 2
    ? (leaderboard = leaderboardMedium)
    : (leaderboard = leaderboardHard);
};

// handlers

//form handler
form.addEventListener("submit", function (e) {
  e.preventDefault();

  //set username
  uName = document.querySelector("#username-input").value;
  // set interval
  const shortInterval = document.querySelector("#short-interval");
  const mediumInterval = document.querySelector("#medium-interval");
  const longInterval = document.querySelector("#long-interval");

  interval = shortInterval.checked ? shortInterval.value : interval;
  interval = mediumInterval.checked ? mediumInterval.value : interval;
  interval = longInterval.checked ? longInterval.value : interval;

  // set dificulty
  const easyDificulty = document.querySelector("#easy-dificulty");
  const mediumDificulty = document.querySelector("#medium-dificulty");
  const hardDificulty = document.querySelector("#hard-dificulty");

  dificulty = easyDificulty.checked ? +easyDificulty.value : dificulty;
  dificulty = mediumDificulty.checked ? +mediumDificulty.value : dificulty;
  dificulty = hardDificulty.checked ? +hardDificulty.value : dificulty;

  //asign value to randomNumber
  randomNumber = Math.floor(Math.random() * interval) + 1;

  //hide the form
  form.style.display = "none";

  //display the game
  game.style.display = "block";
  welcomeMesage.textContent = `Welcome ${uName}, find the secret code!`;

  //asign value to tries
  dificulty === 3 ? (tries -= 5) : tries;

  dificulty === 1
    ? (numberOfTries.style.display = "none")
    : (numberOfTries.textContent = `${tries}x💜`);

  setArray(dificulty);
});

//game handler
verifyButton.addEventListener("click", function () {
  auxScores++;
  //verify if is smaller
  if (+inputValue.value < +interval) {
    tries--;
    if (+inputValue.value < randomNumber) {
      hints.textContent = `The secret code is bigger than ${inputValue.value}.`;
      numberOfTries.textContent = `${tries}x💜`;
    }
    //verify if is bigger
    if (+inputValue.value > randomNumber) {
      hints.textContent = `The secret code is lower than ${inputValue.value}.`;
      numberOfTries.textContent = `${tries}x💜`;
    }

    //verify if is equal
    if (+inputValue.value === randomNumber) {
      hints.textContent = "You found the secret code🎉🎉🎉";
      inputValue.setAttribute("disabled", "");
      verifyButton.setAttribute("disabled", "");
      if (dificulty === 1) {
        leaderboardEasy.push({ nume: uName, scor: auxScores });
      }
      if (dificulty === 2) {
        leaderboardMedium.push({ nume: uName, scor: +tries * 100 });
      }
      if (dificulty === 3) {
        leaderboardHard.push({ nume: uName, scor: +tries * 100 });
      }
    }
  }
  if (+inputValue.value > +interval) {
    hints.textContent = `You can't put values bigger than ${interval}`;
  }
  if (+inputValue.value < 0) {
    hints.textContent = `You can't put values smaller than 0`;
  }
  //appear the retry button if the tries is 0
  if (tries === 0) {
    inputValue.setAttribute("disabled", "");
    verifyButton.setAttribute("disabled", "");
    reset.textContent = "Retry";
  }
  inputValue.focus();
  inputValue.value = " ";
});
// implement button for reset the game
reset.addEventListener("click", function () {
  dificulty === 2 ? (tries = 10) : (tries = 5);

  dificulty !== 1 ? (numberOfTries.textContent = `${tries}x💜`) : "";

  randomNumber = Math.floor(Math.random() * interval) + 1;
  inputValue.focus();
  inputValue.value = "";
  hints.textContent = "Find the secret code!";
  inputValue.removeAttribute("disabled");
  reset.textContent = "Reset";
  verifyButton.removeAttribute("disabled");
});
//button leaderboard
leaderboardButton.addEventListener("click", function () {
  let max = leaderboard.length < 5 ? leaderboard.length : 5;

  //bubble sort
  for (let i = 0; i < leaderboard.length; i++) {
    for (let j = 0; j < leaderboard.length - 1; j++) {
      let k = j + 1;
      if (leaderboard[j].scor < leaderboard[k].scor) {
        let aux = leaderboard[j];
        leaderboard[j] = leaderboard[k];
        leaderboard[k] = aux;
      }
    }
  }
  //show leaderboard
  if (dificulty === 1) {
    let leaderboardReverse = leaderboard.reverse();
    showLeaderboard(leaderboardReverse, max);
  } else {
    showLeaderboard(leaderboard, max);
  }

  //switch leaderboard display
  boolValue = !boolValue;
  if (!boolValue) {
    containerLeaderboard.style.display = "flex";
    divGame.style.display = "none";
  } else {
    containerLeaderboard.style.display = "none";
    divGame.style.display = "block";
  }
});
