import { addCars } from "./createCar.js";
import {
  currentPage,
  currentWinnerPage,
  carsPerPage,
  modifyCount,
  hundredCars,
  base,
  basePath,
  createQuery,
  stoppedCars,
  modifyCountWinners,
  winnerPerPage,
  countWinners,
} from "./variables.js";
import {
  counter,
  inputCarName,
  inputCarColor,
  winnerPost, winnersTotalBlock
} from "./pageElements.js";
import { removeWinnerFunc } from "./deleteCar";
import { makeRandomCar, makeRandomColor } from "./randomCars.js";
import { moveCar, stopCar, pauseCar } from "./racings";

const getGarage = async (queryParameters) => {
  const response = await fetch(
    `${base}${basePath.garage}${createQuery(queryParameters)}`
  );
  const cars = await response.json();
  return cars;
};

const basis = async () => {
  const cars = await getGarage([
    { key: "_page", value: currentPage },
    { key: "_limit", value: carsPerPage },
  ]);

  document.querySelectorAll(".racing-car-block").forEach((el) => el.remove());
  cars.forEach((el) => addCars(el.name, el.color, el.id));
  return cars;
};
const resultCountCar = async function () {
  const response = await fetch(
    `${base}${basePath.garage}${createQuery([{ key: "_page", value: "0" }])}`
  );
  const countCar = Number(response.headers.get("X-Total-Count"));
  counter.innerHTML = `Cars in garage: ${countCar}`;
  modifyCount(countCar);
  return countCar;
};
const deleteCar = async (id) => {
  const response = await fetch(`${base}${basePath.garage}/${id}`, {
    method: "DELETE",
  });
  try {
    if (!response.ok) throw new Error(response.statusText);
    const car = await response.json();
    resultCountCar();
    deleteWinner(id);
    return car;
  } catch (err) {
    console.log("Caught error: status 404 - car was not found in the garage");
  }
};

const deleteWinner = async (id) => {
  const response = await fetch(`${base}${basePath.winners}/${id}`, {
    method: "DELETE",
  });
  try {
    if (!response.ok) throw new Error(response.statusText);
    const car = await response.json();
    removeWinnerFunc(id);
    return car;
  } catch (err) {
    console.log("Caught error: status 404 - car was not found among winners");
  }
};

const generate100Cars = async () => {
  for (let car = 0; car <= hundredCars; car++) {
    const carItem = {
      name: makeRandomCar(),
      color: makeRandomColor(),
    };
    await fetch(`${base}${basePath.garage}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(carItem),
    })
      .then((response) => response.json())
      .then((carItem) => {
        addCars(carItem.name, carItem.color);
      });
    resultCountCar();
  }
  basis();
};

const generateOneCar = async () => {
  if (inputCarName.value === "") {
    inputCarName.value = "Car";
  }
  let car = {
    name: inputCarName.value,
    color: inputCarColor.value,
  };

  const response = await fetch(`${base}${basePath.garage}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(car),
  });
  const carData = await response.json();
  response.id = carData.id;
  addCars(carData.name, carData.color, carData.id);
  resultCountCar();
};

const updateCar = async (id, body) => {
  const response = await fetch(`${base}${basePath.garage}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  try {
    if (!response.ok) throw new Error(response.statusText);
    const updatedCar = await response.json();
    console.log(updatedCar);
    return updatedCar;
  } catch (err) {
    console.log("Caught error: status 404 - car was not found in the garage");
  }
};

const startEngine = async (id) => {
  winnerPost.innerHTML = "";
  try {
    const response = await fetch(
      `${base}${basePath.engine}${createQuery([
        { key: "id", value: id },
        { key: "status", value: "started" },
      ])}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      }
    );
    const car = await response.json();

    driveEngine(id);
    moveCar(id, car.velocity);
  } catch (err) {
    console.log("Car was not found");
  }
};

const startEngineAll = async (id) => {
  try {
    const response = await fetch(
      `${base}${basePath.engine}${createQuery([
        { key: "id", value: id },
        { key: "status", value: "started" },
      ])}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      }
    );
    const car = await response.json();
    moveCar(id, car.velocity);
    winnerPost.innerHTML = "";
    return car;
  } catch (err) {
    console.log("Car was not found");
  }
};

const stopEngine = async (id) => {
  const response = await fetch(
    `${base}${basePath.engine}${createQuery([
      { key: "id", value: id },
      { key: "status", value: "stopped" },
    ])}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    }
  );
  const stoppedVelocity = await response.json();
  console.log(stoppedVelocity);
  stoppedCars.push(id);
  stopCar(id);
  return stoppedVelocity;
};

const driveEngine = async (id) => {
  try {
    const response = await fetch(
      `${base}${basePath.engine}${createQuery([
        { key: "id", value: id },
        { key: "status", value: "drive" },
      ])}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      }
    );
    const success = await response.json();
    return success;
  } catch (err) {
    pauseCar(id);
    console.log("Car has been stopped suddenly. It's engine was broken down.");
  }
};

const updateWinner = async (id, time) => {
  const existingWinners = await getWinners();
  const winnerToUpdate = {
    wins: 0,
    time: time,
  };

  for (let existingWinner of existingWinners) {
    if (existingWinner.id == id) {
      winnerToUpdate.wins = existingWinner.wins += 1;
      if (existingWinner.time < winnerToUpdate.time) {
        winnerToUpdate.time = existingWinner.time;
      }

      const response = await fetch(`${base}${basePath.winners}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(winnerToUpdate),
      });
      try {
        if (!response.ok) throw new Error(response.statusText);
        const updatedWinner = await response.json();
        return updatedWinner;
      } catch (err) {
        console.log(
          "Caught error: status 404 - winner was not found in the garage"
        );
      }
    }
  }
};
const createWinner = async (id, time) => {
  try {
    const definedWinner = {
      id: id,
      wins: 1,
      time: time,
    };
    const response = await fetch(`${base}${basePath.winners}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(definedWinner),
    });
    const result = await response.json();
    return result;
  } catch (err) {
    console.log("Error: Insert failed, duplicate id");
  }
};

const getSingleWinner = async (id) => {
  const response = await fetch(`${base}${basePath.winners}/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const winner = await response.json();
  return winner;
};

const removeStoppedCarfromWinners = async (id, time) => {
  let existingWinner = await getSingleWinner(id);

  const winnerToRemove = {
    wins: 0,
    time: existingWinner.time,
  };
  let removeUpdatedWinner = await createWinner(id, time);
  if (!removeUpdatedWinner) {
    removeUpdatedWinner = await updateWinner(id, time);
  }

  for (let stoppedCar of stoppedCars) {
    if (stoppedCar == removeUpdatedWinner.id) {
      if (removeUpdatedWinner.wins > 1) {
        winnerToRemove.wins = removeUpdatedWinner.wins -= 1;
        winnerToRemove.time = existingWinner.time;
        await fetch(`${base}${basePath.winners}/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(winnerToRemove),
        });
      } else {
        deleteWinner(id);
      }
    }
  }
};

const getWinners = async (queryParameters) => {
  const response = await fetch(
    `${base}${basePath.winners}${createQuery([
      { key: "_limit", value: "10" },
      { key: "_page", value: currentWinnerPage },
    ])}`,
    {
      method: "GET",
    }
  );
  const winners = await response.json();
  const countWinner = Number(response.headers.get("X-Total-Count"));

  modifyCountWinners(countWinner);
  winnersTotalBlock.innerHTML = `Winners: ${countWinners} cars`;
  return winners;
};

const sortTimeASC = async () => {
  const response = await fetch(
    `${base}${basePath.winners}${createQuery([
      { key: "_limit", value: winnerPerPage },
      { key: "_page", value: currentWinnerPage },
      { key: "_sort", value: "time" },
      { key: "_order", value: "ASC" },
    ])}`,
    {
      method: "GET",
    }
  );
  const winners = await response.json();
  return winners;
};
const sortTimeDESC = async () => {
  const response = await fetch(
    `${base}${basePath.winners}${createQuery([
      { key: "_limit", value: winnerPerPage },
      { key: "_page", value: currentWinnerPage },
      { key: "_sort", value: "time" },
      { key: "_order", value: "DESC" },
    ])}`,
    {
      method: "GET",
    }
  );
  const winners = await response.json();
  return winners;
};

const sortWinsDESC = async () => {
  const response = await fetch(
    `${base}${basePath.winners}${createQuery([
      { key: "_limit", value: winnerPerPage },
      { key: "_page", value: currentWinnerPage },
      { key: "_sort", value: "wins" },
      { key: "_order", value: "DESC" },
    ])}`,
    {
      method: "GET",
    }
  );
  const winners = await response.json();
  return winners;
};
const sortWinsASC = async () => {
  const response = await fetch(
    `${base}${basePath.winners}${createQuery([
      { key: "_limit", value: winnerPerPage },
      { key: "_page", value: currentWinnerPage },
      { key: "_sort", value: "wins" },
      { key: "_order", value: "ASC" },
    ])}`,
    {
      method: "GET",
    }
  );
  const winners = await response.json();
  return winners;
};

export {
  basis,
  resultCountCar,
  deleteCar,
  deleteWinner,
  generate100Cars,
  generateOneCar,
  getGarage,
  updateCar,
  startEngine,
  startEngineAll,
  stopEngine,
  driveEngine,
  getSingleWinner,
  removeStoppedCarfromWinners,
  getWinners,
  createWinner,
  updateWinner,
  sortTimeASC,
  sortTimeDESC,
  sortWinsASC,
  sortWinsDESC,
};
