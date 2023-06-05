import { basis, deleteCar, resultCountCar, deleteWinner } from "./api.js";

const removeCarFunc = async (id) => {
  await deleteCar(id);
  document.getElementById(id).remove();
  resultCountCar();
  basis();
};

const removeWinnerFunc = async (id) => {
  try {
    await deleteWinner(id);
    document.getElementById(`winners-list-to-add-${id}`).remove();
  } catch (er) {
    console.log("This car was not winner yet");
  }
};

export { removeCarFunc, removeWinnerFunc };
