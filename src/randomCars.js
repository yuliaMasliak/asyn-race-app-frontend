import { colorCount, carBrands, carModels } from "./variables.js";

const makeRandomCar = () => {
  let carBrand = carBrands[Math.floor(Math.random() * carBrands.length)];
  let carModel = carModels[Math.floor(Math.random() * carModels.length)];
  return `${carBrand} ${carModel}`;
};
const makeRandomColor = () => {
  let signs = "0123456789ABCDEF";
  let randomColor = "#";
  for (let col = 0; col < colorCount; col++) {
    randomColor += signs[Math.floor(Math.random() * signs.length)];
  }
  return randomColor;
};

export { makeRandomCar, makeRandomColor };
