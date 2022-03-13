function chessBoard(id, row, col) {
  const element = document.querySelector(id);

  let seq = true;
  let black = "#000000";
  let highlight = "#EC3323";

  for (let i = 0; i < row; i++) {
    const eachRow = document.createElement("tr");
    eachRow.id = "row" + i;

    element.appendChild(eachRow);

    const eachCol = document.querySelector("#row" + i);
    for (let j = 0; j < col; j++) {
      const cell = document.createElement("td");
      cell.classList.add("box");
      cell.dataset.row = i;
      cell.dataset.col = j;

      if (seq) {
        if (j % 2 != 0) {
          cell.style.backgroundColor = black;
        }
      } else {
        if (j % 2 == 0) {
          cell.style.backgroundColor = black;
        }
      }
      eachCol.appendChild(cell);
    }

    if (seq) {
      seq = false;
    } else {
      seq = true;
    }
  }

  element.addEventListener("click", diagonalSelect);

  function diagonalSelect(e) {
    const i = e.target.dataset.row;
    const j = e.target.dataset.col;

    // top left
    let tempRow = i;
    let tempCol = j;
    for (let p = i; p >= 0; p--) {
      for (let q = j; q >= 0; q--) {
        if (tempCol === q && tempRow === p) {
          element.children[p].children[q].style.backgroundColor = highlight;
        }
      }

      tempRow--;
      tempCol--;
    }

    //top right
    tempCol = j;

    for (let p = i; p >= 0; p--) {
      for (let q = j; q < col; q++) {
        if (tempCol === q) {
          element.children[p].children[q].style.backgroundColor = highlight;
        }
      }
      tempCol++;
    }

    //bottom left
    tempCol = j;

    for (let p = i; p < row; p++) {
      for (let q = j; q >= 0; q--) {
        if (tempCol === q) {
          element.children[p].children[q].style.backgroundColor = highlight;
        }
      }
      tempCol--;
    }

    //bottom right
    tempRow = i;
    tempCol = j;

    for (let p = i; p < row; p++) {
      for (let q = j; q < col; q++) {
        if (tempCol === q && tempRow === p) {
          element.children[p].children[q].style.backgroundColor = highlight;
        }
      }
      tempCol++;
      tempRow++;
    }
  }
}
