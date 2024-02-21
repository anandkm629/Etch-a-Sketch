const container = document.querySelector(".container");
const buttonsContainer = document.querySelector(".buttons-container");

function makeGrid(size) {
  for (i = 0; i < size; i++) {
    const row = document.createElement("div");
    row.className = "row";
    container.appendChild(row);

    for (j = 0; j < size; j++) {
      const col = document.createElement("div");
      col.className = "col";
      row.appendChild(col);
      col.style.width = `${400 / size}px`;
      col.style.height = `${400 / size}px`;
      col.style.backgroundColor = "white";
      col.addEventListener("mouseover", function () {
        col.style.backgroundColor = "black";
      });
    }
  }
}

const resetButton = document.createElement("button");
resetButton.textContent = "Clear Board";
resetButton.className = "button";
buttonsContainer.appendChild(resetButton);
resetButton.addEventListener("click", () => {
  clearBoard();
});

const setGridSize = document.createElement("button");
let isRandomColor = false;

setGridSize.textContent = "New Grid Size";
setGridSize.className = "button";
buttonsContainer.appendChild(setGridSize);
setGridSize.addEventListener("click", () => {
  setNewGridSize();
});

const randomColorButton = document.createElement("button");
randomColorButton.textContent = "Random Color";
randomColorButton.className = "button";
buttonsContainer.appendChild(randomColorButton);
randomColorButton.addEventListener("click", () => {
  isRandomColor = !isRandomColor; // Toggle the flag
  randomColor();
});

function randomColor() {
  const cols = document.querySelectorAll(".col");
  cols.forEach((col) => {
    col.removeEventListener("mouseover", setBlack);
    col.removeEventListener("mouseover", setRandomColor);

    if (isRandomColor) {
      col.addEventListener("mouseover", setRandomColor);
      randomColorButton.textContent = "Black Color";
    } else {
      col.addEventListener("mouseover", setBlack);
      randomColorButton.textContent = "Random Color";
    }
  });
}

function setRandomColor() {
  let randomColor = Math.floor(Math.random() * 16777215).toString(16);
  this.style.backgroundColor = "#" + randomColor;
}

function setBlack() {
  this.style.backgroundColor = "black";
}

function clearBoard() {
  const cols = document.querySelectorAll(".col");
  cols.forEach((col) => (col.style.backgroundColor = "white"));
}

function setNewGridSize() {
  container.innerHTML = "";
  let newSize = prompt("Enter new grid size");

  if (newSize > 100) {
    alert("Please enter a number less than 100");
    newSize = prompt("Enter new grid size");
    makeGrid(newSize);
  } else if (newSize <= 0) {
    alert("Please enter a number greater than 0");
    newSize = prompt("Enter new grid size");
    makeGrid(newSize);
  } else if (isNaN(newSize)) {
    alert("Please enter a number");
    newSize = prompt("Enter new grid size");
    makeGrid(newSize);
  } else {
    makeGrid(newSize);
  }
}

makeGrid(16);