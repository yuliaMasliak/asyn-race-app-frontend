import { basis, resultCountCar } from "./api.js";
import { eventListeners } from "./events.js";

import "../style.css";
import "./images/car.svg";
import "./images/flag.png";
import "./images/logo.png";
import "./images/play.png";
import "./images/stop.png";
import "./images/track.png";

//page switchers
function renderContent() {
  basis();
  resultCountCar();
  eventListeners();
}

renderContent();
