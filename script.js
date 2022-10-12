"use strict";

import theatreSeats from "./data.js";

const input = document.getElementById("input");
const output = document.getElementById("output");
const btnReserveRandomly = document.getElementById("btnReserveRandomly");
const btnReservedByInput = document.getElementById("btnReservedByInput");
const inputNrOfReservedSeats = document.getElementById(
  "inputNrOfReservedSeats"
);
const availableSeatHeader = document.getElementById("availableSeatHeader");

const reservedSeatsOutputHeader = document.getElementById(
  "reservedSeatsOutputHeader"
);

const order = [3, 4, 5, 2, 6, 1, 7];
const abcOrder = ["a", "b", "c", "d", "e", "f", "g"];
const theatreSeatsBlabla = document.querySelectorAll("div.theatre-seats");

const seats = [...theatreSeats];
const numberOfSeats = seats.length;

//coloring the seats

const addFrontendId = (arr) => {
  arr.map((item) => {
    item.frontendId = `${item.zone.slice(0, 3)}-${item.row}-${item.seatNumber}`;
  });
};

addFrontendId(seats);

const colorSeats = (arr) => {
  arr.map((item) => {
    if (item.price === 1) {
      document.getElementById(item.frontendId).style.background =
        "rgb(236, 72, 72)";
    }
    if (item.price === 2) {
      document.getElementById(item.frontendId).style.background = "goldenrod";
    }
    if (item.price === 3) {
      document.getElementById(item.frontendId).style.background =
        "rgb(95, 95, 197)";
    }
  });
};

colorSeats(seats);

// calculate the random number of reserved seats

let numberOfReservedSeats = Math.floor(
  Math.random() * (numberOfSeats - numberOfSeats * 0.2 + 1) +
    numberOfSeats * 0.2
);

// reserve seats randomly

let reservedSeats;
let availableSeats;

const reservingSeats = () => {
  seats.map((seat) => {
    seat.randomId = Math.random();
  });

  seats.sort((seatA, seatB) => {
    if (seatA.randomId < seatB.randomId) {
      return -1;
    }
  });
  for (let i = 0; i < numberOfReservedSeats; i++) {
    seats[i].isAvailable = false;
  }
  return seats;
};

//sorting seats by rules

const findSeats = () => {
  availableSeats = seats.filter((item) => item.isAvailable);
  console.log(availableSeats);
  availableSeats.sort((seatA, seatB) => {
    if (seatA.price === seatB.price) {
      if (seatA.zone === seatB.zone) return seatA.row < seatB.row ? -1 : 1;
      return seatA.zone < seatB.zone ? -1 : 1;
    } else {
      return seatA.price < seatB.price ? -1 : 1;
    }
  });

  return availableSeats;
};

findSeats();

const updateUI = () => {
  reservedSeats = seats.filter((item) => !item.isAvailable);
  availableSeats = seats.filter((item) => item.isAvailable);
  reservedSeatsOutputHeader.innerText = "Reserved seats: ";
  document.getElementById("reservedSeatsOutput").innerText = reservedSeats.map(
    (resSeat) => ` ${resSeat.zone} ${resSeat.row} ${resSeat.seatNumber} `
  );

  availableSeatHeader.innerText = "Available seat(s): ";
  document.getElementById("outputAvailableSeat").innerText = availableSeats.map(
    (resSeat) => ` ${resSeat.zone} ${resSeat.row} ${resSeat.seatNumber} `
  );
  reservedSeats.map((resSeat) => {
    document.getElementById(resSeat.frontendId).style.opacity = 0.2;
  });
};

btnReserveRandomly.addEventListener("click", (e) => {
  e.preventDefault();
  reservingSeats();
  updateUI();
});

btnReservedByInput.addEventListener("click", (e) => {
  e.preventDefault();
  numberOfReservedSeats = inputNrOfReservedSeats.value;
  reservingSeats();
  updateUI();
});

//console.log(findSeats());
