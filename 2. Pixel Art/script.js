function pixelArt(id, row, col) {
  const element = document.querySelector(id);
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < row; i++) {
    const eachRow = document.createElement("tr");
    eachRow.id = "row" + i;

    element.appendChild(eachRow);

    let eachCol = document.querySelector("#row" + i);

    for (let j = 0; j < col; j++) {
      const cell = document.createElement("td");
      cell.classList.add("box");
      cell.dataset.row = i;
      cell.dataset.col = j;
      eachCol.appendChild(cell);
    }
  }

  const lastRow = document.createElement("tr");
  lastRow.id = "row" + col;
  element.appendChild(lastRow);

  let colors = document.querySelector("#row" + col);

  for (let i = 0; i < col; i++) {
    const cell = document.createElement("td");
    cell.classList.add("box");
    let thisColor = randomColor();
    cell.style.backgroundColor = thisColor;
    cell.dataset.colorCode = thisColor;
    colors.appendChild(cell);
  }

  colors.addEventListener("click", onColorSelect);

  element.addEventListener("mouseover", onMouseOver);
  element.addEventListener("click", changeColor);

  // creating random colors in hexcode
  function randomColor() {
    return (
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")
        .toUpperCase()
    );
  }

  let selectedColor = "#000000";

  function onMouseOver(e) {
    if (e.target.dataset.row < row && e.target.dataset.col < col) {
      if (!e.target.style.backgroundColor) {
        e.target.style.backgroundColor = selectedColor;
      } else {
        e.target.style.backgroundColor = "";
      }
    }
  }

  function onColorSelect(e) {
    selectedColor = e.target.dataset.colorCode.toString();
  }

  function changeColor(e) {
    console.log("cell->", e.target.dataset.row, e.target.dataset.col);
  }
}
