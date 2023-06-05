import { updateCar } from "./api.js";

let inputNameUpdate = document.querySelector(".input-car-update");
let inputColorUpdate = document.querySelector(".input-car-color-update");
let updateButton = document.querySelector(".btn-update-car");

function selectCar(carID, carName) {
  let activeBlock = document.getElementById(carID);
  let allActive = document.querySelectorAll(".active");
  allActive.forEach((i) => i.classList.remove("active"));
  activeBlock.classList.add("active");
  inputNameUpdate.value = carName;
  updateButton.removeAttribute("disabled");
}

const updateCarFunc = async () => {
  const carToChange = document.querySelector(".active");
  const carToChangeId = Number(carToChange.id);
  await updateCar(carToChangeId, {
    name: inputNameUpdate.value,
    color: inputColorUpdate.value,
  });
  let changeName = document.getElementById(`${carToChangeId}-name`);
  changeName.innerHTML = inputNameUpdate.value;
  let changeColor = document.getElementById(`${carToChangeId}-color`);
  changeColor.setAttribute("style", `color:${inputColorUpdate.value}`);
  updateButton.disabled = true;
  inputNameUpdate.value = "";
};

export { selectCar, updateCarFunc };
