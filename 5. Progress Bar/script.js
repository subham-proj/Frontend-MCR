function progressBar(id) {
  const element = document.querySelector(id);
  const bar = document.createElement("div");
  const progress = document.createElement("div");
  bar.id = "bar";
  progress.id = "progress";

  bar.appendChild(progress);
  element.dataset.count = 0;

  const btn = document.createElement("button");
  btn.id = "btn";
  btn.innerText = "Run";

  element.appendChild(bar);
  element.appendChild(btn);

  element.children[1].addEventListener("click", incrementCounter);

  let click = true;
  function incrementCounter() {
    element.dataset.count++;

    if (click) {
      startProgress();
      click = false;
    }
    startTimer();
    btn.innerText = "Run  " + element.dataset.count;
  }

  function startProgress() {
    let width = 0;
    const progressBar = document.querySelector("#progress");

    const timer = setInterval(move, 30);

    function move() {
      if (width < 100) {
        width++;
        progressBar.style.width = width + "%";
      } else {
        progressBar.style.width = 0;
        clearInterval(timer);
      }
    }
  }

  function startTimer() {
    setInterval(() => {
      if (element.dataset.count - 1 >= 1) {
        startProgress();
        btn.innerText = "Run  " + element.dataset.count--;
      } else {
        btn.innerText = "Run";
      }
    }, 3000);
  }
}
