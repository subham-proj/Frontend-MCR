function game(id, size) {
  const element = document.querySelector(id);
  const btn = document.querySelector("#start");

  const score = document.createElement("p");
  const highScore = document.createElement("p");

  score.id = "score";
  highScore.id = "highestScore";

  let currentScore = 0;
  let currentHigh = 0;

  displayScore(currentScore, currentHigh);

  const row = document.createElement("div");
  row.id = "row";

  for (let i = 0; i < size; i++) {
    const cell = document.createElement("div");
    cell.id = "cell" + i;
    cell.classList.add("box");
    cell.dataset.index = i;
    row.appendChild(cell);
  }

  element.appendChild(row);

  btn.addEventListener("click", blinkNow);

  element.addEventListener("click", onClick);

  element.dataset.interaction = 0;
  let total = 0;

  let running = false;

  function blinkNow() {
    running = true;
    btn.disabled = true;
    element.dataset.interaction = 0;
    total++;
    element.dataset.indexArray = generateIndex(total);
    let arr = element.dataset.indexArray.split(",");

    let i = 0;
    let blinkIntervals = setInterval(() => {
      const cell = document.querySelector("#cell" + arr[i]);
      cell.classList.add("blink");
      i++;

      setTimeout(() => {
        cell.classList.remove("blink");
      }, 1000);

      if (i === arr.length) {
        clearInterval(blinkIntervals);
      }
    }, 1500);

    setTimeout(() => {
      clearClassList();
      running = false;
    }, arr.length * 1500 + 1000);
  }

  function onClick(e) {
    const count = element.dataset.interaction;
    const ans = e.target.dataset.index;
    const cell = document.querySelector("#cell" + ans);
    const arr = element.dataset.indexArray.split(",");
    let correct = true;

    if (running) {
      correct = false;
      resetInstance(cell);
    }

    if (btn.disabled) {
      if (arr[count] === ans) {
        cell.classList.add("blink");

        setTimeout(() => {
          cell.classList.remove("blink");
        }, 500);

        element.dataset.interaction++;
      } else {
        correct = false;
        resetInstance(cell);
      }
    }

    if (correct) {
      if (Number(count) + 1 === arr.length) {
        if (currentScore >= currentHigh) {
          currentHigh++;
        }

        displayScore(++currentScore, currentHigh);
        blinkNow();
      }
    } else {
      currentScore = 0;
      displayScore(currentScore, currentHigh);
    }
  }

  function resetInstance(cell) {
    cell.classList.add("blinkRed");
    shake();

    setTimeout(() => {
      cell.classList.remove("blinkRed");
    }, 1000);

    btn.disabled = false;
    total = 0;
    element.dataset.interaction = 0;
    element.dataset.indexArray = "";
  }

  function shake() {
    element.classList.add("shake");

    setTimeout(() => {
      element.classList.remove("shake");
    }, 800);
  }

  function clearClassList() {
    for (let i = 0; i < size; i++) {
      const cell = document.querySelector("#cell" + i);
      cell.classList.remove("blink");
    }
  }

  function generateIndex(total) {
    let arr = [];
    while (total) {
      arr.push(getRandomInt(size));
      total--;
    }

    return arr;
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
}

function displayScore(score, highestScore) {
  document.getElementById("score").innerHTML = "Score : " + score;
  document.getElementById("highestScore").innerHTML =
    "Highest Score : " + highestScore;
}
