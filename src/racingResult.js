import { getGarage, getWinners } from "./api.js";
import { winnersPage, winnersPageButton } from "./pageElements.js";

const createWinnerList = async () => {
  let blocks = document.querySelectorAll(".winners-list-to-add");
  for (let el of blocks) {
    el.remove();
  }
  let allWinners = await getWinners();
  const allCars = await getGarage();

  for (let racer of allCars) {
    for (let winner of allWinners) {
      if (racer.id == winner.id) {
        let winnerToTheList = document.createElement("div");
        winnerToTheList.classList.add("winners-list-to-add");
        winnerToTheList.id = `winners-list-to-add-${racer.id}`;

        winnerToTheList.innerHTML = `
    <div class='winner-number'></div>
    <div class='winner-brand'>${racer.name}
    <div class='svg-car-icon-winner'  style=color:${racer.color} style='animation-fill-mode: forwards'>
    <svg xmlns="http://www.w3.org/2000/svg" width="40" viewBox="0 0 640 512" ><path d="M640 320V368C640 385.7 625.7 400 608 400H574.7C567.1 445.4 527.6 480 480 480C432.4 480 392.9 445.4 385.3 400H254.7C247.1 445.4 207.6 480 160 480C112.4 480 72.94 445.4 65.33 400H32C14.33 400 0 385.7 0 368V256C0 228.9 16.81 205.8 40.56 196.4L82.2 92.35C96.78 55.9 132.1 32 171.3 32H353.2C382.4 32 409.1 45.26 428.2 68.03L528.2 193C591.2 200.1 640 254.8 640 319.1V320zM171.3 96C158.2 96 146.5 103.1 141.6 116.1L111.3 192H224V96H171.3zM272 192H445.4L378.2 108C372.2 100.4 362.1 96 353.2 96H272V192zM525.3 400C527 394.1 528 389.6 528 384C528 357.5 506.5 336 480 336C453.5 336 432 357.5 432 384C432 389.6 432.1 394.1 434.7 400C441.3 418.6 459.1 432 480 432C500.9 432 518.7 418.6 525.3 400zM205.3 400C207 394.1 208 389.6 208 384C208 357.5 186.5 336 160 336C133.5 336 112 357.5 112 384C112 389.6 112.1 394.1 114.7 400C121.3 418.6 139.1 432 160 432C180.9 432 198.7 418.6 205.3 400z" /></svg></div></div>
    <div  class='winner-wins' id=winner-wins-${winner.id}>${winner.wins}</div>
    <div class='winner-time'>${winner.time}</div>
    `;
        winnersPage.append(winnerToTheList);
        winnersCounter();
      }
    }
  }
};

const createSortedWinnerList = async (winners) => {
  let blocks = document.querySelectorAll(".winners-list-to-add");
  for (let el of blocks) {
    el.remove();
  }
  const allCars = await getGarage();
  winners.forEach((winner) => {
    for (let racer of allCars) {
      if (racer.id == winner.id) {
        let sortedWinnerToTheList = document.createElement("div");
        sortedWinnerToTheList.classList.add("winners-list-to-add");
        sortedWinnerToTheList.id = `winners-list-to-add-${racer.id}`;
        sortedWinnerToTheList.innerHTML = `
    <div class='winner-number'></div>
    <div class='winner-brand'>${racer.name}
    <div class='svg-car-icon-winner'  style=color:${racer.color} style='animation-fill-mode: forwards'>
    <svg xmlns="http://www.w3.org/2000/svg" width="40" viewBox="0 0 640 512" ><path d="M640 320V368C640 385.7 625.7 400 608 400H574.7C567.1 445.4 527.6 480 480 480C432.4 480 392.9 445.4 385.3 400H254.7C247.1 445.4 207.6 480 160 480C112.4 480 72.94 445.4 65.33 400H32C14.33 400 0 385.7 0 368V256C0 228.9 16.81 205.8 40.56 196.4L82.2 92.35C96.78 55.9 132.1 32 171.3 32H353.2C382.4 32 409.1 45.26 428.2 68.03L528.2 193C591.2 200.1 640 254.8 640 319.1V320zM171.3 96C158.2 96 146.5 103.1 141.6 116.1L111.3 192H224V96H171.3zM272 192H445.4L378.2 108C372.2 100.4 362.1 96 353.2 96H272V192zM525.3 400C527 394.1 528 389.6 528 384C528 357.5 506.5 336 480 336C453.5 336 432 357.5 432 384C432 389.6 432.1 394.1 434.7 400C441.3 418.6 459.1 432 480 432C500.9 432 518.7 418.6 525.3 400zM205.3 400C207 394.1 208 389.6 208 384C208 357.5 186.5 336 160 336C133.5 336 112 357.5 112 384C112 389.6 112.1 394.1 114.7 400C121.3 418.6 139.1 432 160 432C180.9 432 198.7 418.6 205.3 400z" /></svg></div></div>
    <div  class='winner-wins' id=winner-wins-${winner.id}>${winner.wins}</div>
    <div class='winner-time'>${winner.time}</div>
    `;
        getWinners();
        winnersPage.append(sortedWinnerToTheList);
      }
    }
  });
  winnersCounter();
};

async function winnersCounter() {
  let count = 1;
  let counter = 1;
  let winnerNumbers = document.querySelectorAll(".winner-number");
  for (let number of winnerNumbers) {
    if (winnersPageButton.innerHTML == 1) {
      number.innerHTML = count;
      count += 1;
    } else {
      number.innerHTML = (currentWinnerPage - 1) * winnerPerPage + counter;
      counter++;
    }
  }
}

export { createWinnerList, createSortedWinnerList, winnersCounter };
