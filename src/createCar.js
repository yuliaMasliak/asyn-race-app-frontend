import { racingBlock } from "./pageElements.js";
import { startEngine, stopEngine } from "./api.js";
import { selectCar } from "./updateCar.js";
import { removeCarFunc } from "./deleteCar.js";

function addCars(carName, carColor, carID) {
  let racingCarBlock = document.createElement("div");
  racingCarBlock.classList.add("racing-car-block");
  racingCarBlock.setAttribute("id", `${carID}`);

  racingCarBlock.innerHTML = `
    <button id="select-button-${carID}" class="update-buttons">Update</button>
    <button id="delete-button-${carID}" class="update-buttons">Delete</button>

    <div class="play-buttons-${carID}">
    <input type="image" src="./images/stop.png" width="30" class="stop" id="stop-${carID}">
<input type="image" src="./images/play.png" width="30" class="play" id="play-${carID}">

    </div>
    <span class="car-status" id='${carID}-status'></span>
     <div class='car-model' id='${carID}-name'>${carName}</div>
     <div class="flex-car-flag">
     <div class='svg-car-icon' id='${carID}-color' style=color:${carColor} style='animation-fill-mode: forwards'>
     <svg xmlns="http://www.w3.org/2000/svg" width="80" viewBox="0 0 640 512" ><path d="M640 320V368C640 385.7 625.7 400 608 400H574.7C567.1 445.4 527.6 480 480 480C432.4 480 392.9 445.4 385.3 400H254.7C247.1 445.4 207.6 480 160 480C112.4 480 72.94 445.4 65.33 400H32C14.33 400 0 385.7 0 368V256C0 228.9 16.81 205.8 40.56 196.4L82.2 92.35C96.78 55.9 132.1 32 171.3 32H353.2C382.4 32 409.1 45.26 428.2 68.03L528.2 193C591.2 200.1 640 254.8 640 319.1V320zM171.3 96C158.2 96 146.5 103.1 141.6 116.1L111.3 192H224V96H171.3zM272 192H445.4L378.2 108C372.2 100.4 362.1 96 353.2 96H272V192zM525.3 400C527 394.1 528 389.6 528 384C528 357.5 506.5 336 480 336C453.5 336 432 357.5 432 384C432 389.6 432.1 394.1 434.7 400C441.3 418.6 459.1 432 480 432C500.9 432 518.7 418.6 525.3 400zM205.3 400C207 394.1 208 389.6 208 384C208 357.5 186.5 336 160 336C133.5 336 112 357.5 112 384C112 389.6 112.1 394.1 114.7 400C121.3 418.6 139.1 432 160 432C180.9 432 198.7 418.6 205.3 400z" /></svg></div>
     <div class="racing-flag"><img src="./images/flag.png" alt="racing-flag" id=flag-${carID}></div></div>
     <div class="racing-track"><img src="./images/track.png" alt="racing-track" id=track-${carID}></img></div>`;

  racingBlock.append(racingCarBlock);

  const updateCarBtn = document.getElementById(`select-button-${carID}`);
  updateCarBtn.addEventListener("click", () => selectCar(carID, carName));

  const selectBtn = document.getElementById(`delete-button-${carID}`);
  selectBtn.addEventListener("click", () => removeCarFunc(carID));
  const playBtn = document.querySelector(`#play-${carID}`);
  playBtn.addEventListener("click", () => startEngine(carID));

  const stopBtn = document.querySelector(`#stop-${carID}`);
  stopBtn.addEventListener("click", () => stopEngine(carID));
}

export { addCars };
