import {
  generate100Cars,
  generateOneCar,
  stopEngine,
  sortTimeASC,
  sortTimeDESC,
  sortWinsASC,
  sortWinsDESC,
  basis,
  getWinners,
} from "./api.js";
import {
  titleGarage,
  titleWinners,
  garagePage,
  winnersPage,
  btnGenerateCars,
  btnCarCreate,
  inputCarColor,
  btnRace,
  btnReset,
  winnerPost,
  arrowTimeDown,
  arrowTimeUp,
  arrowWinsDown,
  arrowWinsUp,
  btnCarUpdate,
  pageButton,
  pageNext,
  pagePrev,
  winnersPageNext,
  winnersPageButton,
  winnersPagePrev,
} from "./pageElements.js";
import { updateCarFunc } from "./updateCar.js";
import {
  winnerArr,
  stoppedCars,
  count,
  modifyCurrentPage,
  currentPage,
  countWinners,
  currentWinnerPage,
  modifyCurrentWinnerPage,
} from "./variables.js";
import { createWinnerList, createSortedWinnerList } from "./racingResult.js";
import { getWinner } from "./racings.js";

function eventListeners() {
  titleGarage.addEventListener("click", () => {
    garagePage.classList.remove("hidden");
    winnersPage.classList.add("hidden");
  });
  titleWinners.addEventListener("click", () => {
    winnersPage.classList.remove("hidden");
    garagePage.classList.add("hidden");
    createWinnerList();
  });

  //cars generators
  btnGenerateCars.addEventListener("click", generate100Cars);

  inputCarColor.addEventListener("input", () => {
    inputCarColor.setAttribute("value", `${inputCarColor.value}`);
  });

  btnCarCreate.addEventListener("click", () => generateOneCar());

  // racings

  btnRace.addEventListener("click", async () => {
    btnRace.disabled = true;
    btnReset.disabled = false;
    winnerArr.length = 0;
    getWinner();
    stoppedCars.length = 0;
    winnerPost.classList.remove("no-winner");
    winnerPost.classList.add("winner");
  });

  btnReset.addEventListener("click", async () => {
    btnRace.disabled = false;
    btnReset.disabled = true;
    stoppedCars.length = 0;
    const cars = document.querySelectorAll(".racing-car-block");
    for (const car of cars) {
      stopEngine(car.id);
      winnerPost.classList.remove("winner");
      winnerPost.classList.add("no-winner");
    }
  });
  //sorting

  arrowTimeUp.addEventListener("click", async () => {
    const winners = await sortTimeASC();
    createSortedWinnerList(winners);
  });

  arrowTimeDown.addEventListener("click", async () => {
    const winners = await sortTimeDESC();
    createSortedWinnerList(winners);
  });

  arrowWinsUp.addEventListener("click", async () => {
    const winners = await sortWinsDESC();
    createSortedWinnerList(winners);
  });
  arrowWinsDown.addEventListener("click", async () => {
    const winners = await sortWinsASC();
    createSortedWinnerList(winners);
  });
  btnCarUpdate.addEventListener("click", updateCarFunc);

  pageNext.addEventListener("click", () => {
    btnRace.disabled = false;
    if (count < 7 || pageButton.innerHTML == Math.ceil(count / 7)) {
      pageNext.classList.add("disabled");
    } else {
      pageNext.classList.remove("disabled");
      modifyCurrentPage(currentPage + 1);
      pageButton.innerHTML = currentPage;
      basis();
    }
  });

  pagePrev.addEventListener("click", () => {
    btnRace.disabled = false;
    if (pageButton.innerHTML == 1) {
      pagePrev.classList.add("disabled");
    } else {
      pagePrev.classList.remove("disabled");
      modifyCurrentPage(currentPage - 1);
      pageButton.innerHTML = currentPage;
      basis();
    }
  });

  winnersPageNext.addEventListener("click", () => {
    if (
      countWinners <= 10 ||
      winnersPageButton.innerHTML == Math.ceil(countWinners / 7)
    ) {
      winnersPageNext.classList.add("disabled");
    } else {
      winnersPageNext.classList.remove("disabled");
      modifyCurrentWinnerPage(currentWinnerPage + 1);
      winnersPageButton.innerHTML = currentWinnerPage;
      getWinners();
      createWinnerList();
    }
  });

  winnersPagePrev.addEventListener("click", () => {
    if (winnersPageButton.innerHTML == 1) {
      winnersPagePrev.classList.add("disabled");
    } else {
      winnersPagePrev.classList.remove("disabled");
      modifyCurrentWinnerPage(currentWinnerPage - 1);
      winnersPageButton.innerHTML = currentWinnerPage;
      getWinners();
      createWinnerList();
    }
  });
}

export { eventListeners };
