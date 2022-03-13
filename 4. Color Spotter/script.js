function spotter(id, size, score, callback) {
  const element = document.querySelector(id);

  makeGrid(size);
  callback(score);

  element.addEventListener("click", validateSelection);

  function validateSelection(e) {
    const selectedRow = e.target.dataset.row;
    const selectedCol = e.target.dataset.col;

    const correctRow = element.dataset.row;
    const correctCol = element.dataset.col;

    if (selectedRow == correctRow && selectedCol == correctCol) {
      makeGrid(++size);
      callback(++score);
    } else {
      element.classList.add("shake");

      setTimeout(() => {
        element.classList.remove("shake");
        makeGrid(4);
        callback(0);
      }, 800);
    }
  }

  function makeGrid(size) {
    removeAllChildNodes(element);
    let { color, oddColor } = getRandomColors();
    element.dataset.row = getRandomInt(size);
    element.dataset.col = getRandomInt(size);
    for (let i = 0; i < size; i++) {
      const eachRow = document.createElement("tr");
      eachRow.id = "row" + i;
      element.appendChild(eachRow);

      const eachCol = document.querySelector("#row" + i);

      for (let j = 0; j < size; j++) {
        const cell = document.createElement("td");
        cell.classList.add("box");
        cell.dataset.row = i;
        cell.dataset.col = j;

        if (element.dataset.row == i && element.dataset.col == j) {
          cell.style.backgroundColor = oddColor;
        } else {
          cell.style.backgroundColor = color;
        }

        eachCol.appendChild(cell);
      }
    }
  }

  function removeAllChildNodes(domElement) {
    while (domElement.firstChild) {
      domElement.removeChild(domElement.firstChild);
    }
  }

  function getRandomColors() {
    var ratio = 0.618033988749895;

    var hue = (Math.random() + ratio) % 1;
    var saturation = Math.round(Math.random() * 100) % 85;
    var lightness = Math.round(Math.random() * 100) % 85;

    var color =
      "hsl(" +
      Math.round(360 * hue) +
      "," +
      saturation +
      "%," +
      lightness +
      "%)";
    var oddColor =
      "hsl(" +
      Math.round(360 * hue) +
      "," +
      saturation +
      "%," +
      (lightness + 5) +
      "%)";

    return {
      color,
      oddColor,
    };
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
}
