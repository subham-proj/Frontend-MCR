function star(id, count, callback) {
  const element = document.querySelector(id);
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < count; i++) {
    const iElement = document.createElement("i");
    iElement.classList.add("fa");
    iElement.classList.add("fa-star-o");
    iElement.dataset.value = i + 1;
    fragment.appendChild(iElement);
  }

  element.appendChild(fragment);

  element.addEventListener("mouseover", onMouseOver);
  element.addEventListener("click", onClick);

  function onMouseOver(e) {
    const rating = e.target.dataset.value;
    fillColor(rating);
  }

  function onClick(e) {
    const rating = e.target.dataset.value;
    fillColor(rating);
    callback(rating);
  }

  function fillColor(total) {
    for (let i = 0; i < count; i++) {
      if (i < total) {
        element.children[i].classList.add("fa-star");
      } else {
        element.children[i].classList.remove("fa-star");
      }
    }
  }
}

function getStar(value) {
  document.getElementById("display-star").innerHTML = value;
}

star("#star", 5, getStar);
