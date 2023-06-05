import { winnerPost, racingBlock } from "./pageElements.js";
import {
  startEngineAll,
  driveEngine,
  removeStoppedCarfromWinners,
} from "./api.js";

const moveCar = async (id, velocity) => {
  const track = document.getElementById(`track-${id}`);
  const finishPoint = track.getBoundingClientRect();
  document
    .getElementById(`${id}-color`)
    .animate(
      [
        { transform: "translate(0)" },
        { transform: `translate(${finishPoint.width - 100}px)` },
      ],
      {
        duration: Math.ceil(500000 / velocity),
        fill: "forwards",
      }
    );
  document.getElementById(`stop-${id}`).disabled = false;
  document.getElementById(`play-${id}`).disabled = true;
};

const stopCar = async (id) => {
  document
    .getElementById(`${id}-color`)
    .getAnimations()
    .forEach((anim) => anim.cancel());
  document.getElementById(`play-${id}`).disabled = false;
  document.getElementById(`stop-${id}`).disabled = true;
};

const pauseCar = async (id) => {
  document
    .getElementById(`${id}-color`)
    .getAnimations()
    .forEach((anim) => anim.pause());
};

const getWinner = async () => {
  let cars = document.querySelectorAll(".racing-car-block");
  const winner = {
    maxVelocity: 1,
    id: "",
  };
  const carsID = [];
  for (const car of cars) {
    carsID.push(car.id);
  }

  let promises = carsID.map(async (el) => {
    let racer = await startEngineAll(el);
    const success = await driveEngine(el);

    if (racer.velocity > winner.maxVelocity && success.success) {
      winner.maxVelocity = racer.velocity;
      winner.id = el;
      winner.time = Math.round(5000 / winner.maxVelocity);
    }
  });

  await Promise.any(promises);

  const carsName = document.querySelectorAll(".car-model");
  for (let carName of carsName) {
    if (carName.id.replace("-name", "") === winner.id) {
      winner.name = carName.innerHTML;
    }
  }

  winnerPost.classList.remove(".no-winner");
  winnerPost.innerHTML = `The Winner is ${winner.name} with time of ${winner.time} sec`;
  racingBlock.prepend(winnerPost);
  setTimeout(() => winnerPost.remove(), 5000);
  removeStoppedCarfromWinners(winner.id, winner.time);
  return winner;
};

export { moveCar, stopCar, pauseCar, getWinner };
