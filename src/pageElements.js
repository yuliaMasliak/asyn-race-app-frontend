import { currentPage, currentWinnerPage } from "./variables";

let logo = document.createElement("div");
logo.classList.add("logo");
logo.innerHTML = '<img src="./images/logo.png" alt="logo" >';

//title button
let titleGarage = document.createElement("button");
titleGarage.classList.add("btn-title-garage");
titleGarage.innerHTML = "To Garage";

let titleWinners = document.createElement("button");
titleWinners.classList.add("btn-title-winners");
titleWinners.innerHTML = "To Winners";

//Garage page, inputs blocks

let garagePage = document.createElement("div");
garagePage.classList.add("garage-page");
let userBlock = document.createElement("div");
userBlock.classList.add(".user-block");

let createCarBlock = document.createElement("div");
createCarBlock.classList.add(".create-car-block");

let inputCarName = document.createElement("input");
inputCarName.classList.add("input-car-create");
inputCarName.setAttribute("type", "text");
inputCarName.onfocus = () => {
  inputCarName.value = "";
};

let inputCarColor = document.createElement("input");
inputCarColor.classList.add("input-car-color-create");
inputCarColor.setAttribute("type", "color");
inputCarColor.setAttribute("value", "#e66465");

let btnCarCreate = document.createElement("button");
btnCarCreate.classList.add("btn-create-car");
btnCarCreate.innerHTML = "create";

let updateCarblock = document.createElement("div");
updateCarblock.classList.add(".update-car-block");
let inputCarUpdate = document.createElement("input");
inputCarUpdate.classList.add("input-car-update");
inputCarUpdate.setAttribute("type", "text");

let inputCarColorUpdate = document.createElement("input");
inputCarColorUpdate.classList.add("input-car-color-update");
inputCarColorUpdate.setAttribute("type", "color");
inputCarColorUpdate.setAttribute("value", "#97E265");

let btnCarUpdate = document.createElement("button");
btnCarUpdate.classList.add("btn-update-car");
btnCarUpdate.innerHTML = "update";
btnCarUpdate.disabled = true;

let btnGenerateCars = document.createElement("button");
btnGenerateCars.classList.add("btn-generte-car");
btnGenerateCars.innerHTML = "generate <br>+100 cars";

let btnRace = document.createElement("button");
btnRace.classList.add("btn-race-car");
btnRace.innerHTML = "Start race";
let btnReset = document.createElement("button");
btnReset.classList.add("btn-reset-car");
btnReset.innerHTML = "Reset race";
let divGeneralBtns = document.createElement("div");

let counter = document.createElement("div");
counter.classList.add("count");

//Winners page

let winnersPage = document.createElement("div");
winnersPage.classList.add("winners-page");
winnersPage.classList.add("hidden");

let winnersList = document.createElement("div");
winnersList.classList.add("winners-list");

let winnersListNumber = document.createElement("div");
winnersListNumber.classList.add("winner-number-main");
winnersListNumber.innerHTML = "#";
let winnersListBrand = document.createElement("div");
winnersListBrand.classList.add("winner-brand");
winnersListBrand.innerHTML = "Car Brand";
let winnersListWins = document.createElement("div");
winnersListWins.classList.add("winner-wins");
winnersListWins.innerHTML = "Wins";

let winnersListTime = document.createElement("div");
winnersListTime.classList.add("winner-time");
winnersListTime.innerHTML = "Best<br>time (sec)";

//cars racing block

let racingBlock = document.createElement("div");
racingBlock.classList.add("racing-block");

let winnerPost = document.createElement("div");
winnerPost.classList.add("winner");

//sorting

let arrowWinsUp = document.createElement("button");
arrowWinsUp.classList.add("arrow-btn");
arrowWinsUp.id = "up-arrow-wins";
arrowWinsUp.innerHTML = "&#8595";

let arrowWinsDown = document.createElement("button");
arrowWinsDown.classList.add("arrow-btn");
arrowWinsDown.id = "down-arrow-wins";
arrowWinsDown.innerHTML = "&#8593";

let arrowTimeUp = document.createElement("button");
arrowTimeUp.classList.add("arrow-btn");
arrowTimeUp.id = "up-arrow-time";
arrowTimeUp.innerHTML = "&#8595";

let arrowTimeDown = document.createElement("button");
arrowTimeDown.classList.add("arrow-btn");
arrowTimeDown.id = "down-arrow-time";
arrowTimeDown.innerHTML = "&#8593";

// pagination

const pageButton = document.createElement("button");
pageButton.setAttribute("id", "page-button");
pageButton.innerHTML = currentPage;

const pagePrev = document.createElement("button");
pagePrev.setAttribute("id", "prev-button");
pagePrev.innerHTML = "Prev";

const pageNext = document.createElement("button");
pageNext.setAttribute("id", "next-button");
pageNext.innerHTML = "Next";

let paginationContainer = document.createElement("nav");

//winners page pagination content
let winnersPageButton = document.createElement("button");
winnersPageButton.setAttribute("id", "winners-page-button");

let winnersPagePrev = document.createElement("button");
winnersPagePrev.setAttribute("id", "winners-prev-button");
winnersPagePrev.innerHTML = "Prev";

let winnersPageNext = document.createElement("button");
winnersPageNext.setAttribute("id", "winners-next-button");
winnersPageNext.innerHTML = "Next";

let winnersPaginationContainer = document.createElement("nav");

let winnersTotalBlock = document.createElement("div");

winnersPageButton.innerHTML = currentWinnerPage;

function renderPageElements() {
  document.body.append(logo);
  document.body.append(titleGarage, titleWinners);
  createCarBlock.append(inputCarName, inputCarColor, btnCarCreate);
  updateCarblock.append(inputCarUpdate, inputCarColorUpdate, btnCarUpdate);
  divGeneralBtns.append(btnGenerateCars, btnRace, btnReset);
  userBlock.append(createCarBlock, updateCarblock, divGeneralBtns, counter);

  garagePage.append(userBlock);

  winnersListWins.append(arrowWinsUp, arrowWinsDown);
  winnersListTime.append(arrowTimeUp, arrowTimeDown);

  winnersList.append(
    winnersListNumber,
    winnersListBrand,
    winnersListWins,
    winnersListTime
  );

  garagePage.append(racingBlock);

  paginationContainer.appendChild(pagePrev);
  paginationContainer.appendChild(pageButton);
  paginationContainer.appendChild(pageNext);
  racingBlock.append(paginationContainer);

  winnersPaginationContainer.appendChild(winnersPagePrev);
  winnersPaginationContainer.appendChild(winnersPageButton);
  winnersPaginationContainer.appendChild(winnersPageNext);

  winnersPage.append(winnersTotalBlock);
  winnersPage.append(winnersPaginationContainer);
  winnersPage.append(winnersList);
  document.body.append(winnersPage);

  document.body.append(garagePage, winnersPage);
}
renderPageElements();

export {
  winnersPagePrev,
  winnersPageButton,
  winnersPageNext,
  arrowTimeDown,
  arrowTimeUp,
  arrowWinsDown,
  arrowWinsUp,
  titleGarage,
  titleWinners,
  garagePage,
  winnersPage,
  racingBlock,
  counter,
  btnGenerateCars,
  btnCarCreate,
  btnCarUpdate,
  inputCarColor,
  btnRace,
  btnReset,
  winnerPost,
  inputCarName,
  winnersList,
  winnersListTime,
  winnersListWins,
  pageButton,
  pageNext,
  pagePrev,
  winnersTotalBlock,
};
