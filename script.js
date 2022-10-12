"use strict";

import theatreSeats from "./data.js";

const btnReserveRandomly = document.getElementById("btnReserveRandomly");
const btnReservedByInput = document.getElementById("btnReservedByInput");
const btnFindSeat = document.getElementById("findSeatsButton");
const inputNrOfReservedSeats = document.getElementById(
  "inputNrOfReservedSeats"
);
const availableSeatHeader = document.getElementById("availableSeatHeader");

const reservedSeatsOutputHeader = document.getElementById(
  "reservedSeatsOutputHeader"
);

const order = [3, 4, 5, 2, 6, 1, 7];
const abcOrder = ["a", "b", "c", "d", "e", "f", "g"];

const seats = [...theatreSeats];
const numberOfSeats = seats.length;

//coloring the seats

const addFrontendId = (arr) => {
  arr.map((item) => {
    item.frontendId = `${item.zone.slice(0, 3)}-${item.row}-${item.seatNumber}`;
  });
};

const addOrderId = (arr) => {
  arr.map((item) => {
    if (item.seatNumber === 3) {
      item.orderId = "a";
    }
    if (item.seatNumber === 4) {
      item.orderId = "b";
    }
    if (item.seatNumber === 5) {
      item.orderId = "c";
    }
    if (item.seatNumber === 2) {
      item.orderId = "d";
    }
    if (item.seatNumber === 6) {
      item.orderId = "e";
    }
    if (item.seatNumber === 1) {
      item.orderId = "f";
    }
    if (item.seatNumber === 7) {
      item.orderId = "g";
    }
  });
};

addFrontendId(seats);
addOrderId(seats);

console.log(seats);

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
let reservedSeats;
let availableSeats;
// reserve seats randomly
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

const findSeats = () => {
  availableSeats = seats.filter((item) => item.isAvailable);

  /* availableSeats.sort((seatA, seatB) => {
    if (seatA.price === seatB.price) {
      if (seatA.zone === seatB.zone) return seatA.row < seatB.row ? -1 : 1;
      return seatA.zone < seatB.zone ? -1 : 1;
    } else {
      return seatA.price < seatB.price ? -1 : 1;
    }
  }); */
  availableSeats.sort((seatA, seatB) => {
    if (seatA.price === seatB.price) {
      if (seatA.zone === seatB.zone) {
        if (seatA.row === seatB.row) {
          return seatA.orderId < seatB.orderId ? -1 : 1;
        } else {
          return seatA.row < seatB.row ? -1 : 1;
        }
      } else {
        return seatA.zone < seatB.zone ? -1 : 1;
      }
    } else {
      return seatA.price < seatB.price ? -1 : 1;
    }
  });
  return availableSeats;
};

console.log(findSeats());

const main = () => {
  reservingSeats();
  findSeats();
  console.log(availableSeats);
};

//sorting seats by rules

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
  //return availableSeats;
  console.log(availableSeats);
};
btnReserveRandomly.addEventListener("click", (e) => {
  e.preventDefault();
  main();
  findSeats();
  updateUI();
});

btnReservedByInput.addEventListener("click", (e) => {
  e.preventDefault();
  numberOfReservedSeats = inputNrOfReservedSeats.value;
  main();
  findSeats();
  updateUI();
});

btnFindSeat.addEventListener("click", (e) => {
  e.preventDefault();
  findSeats();
  updateUI();

  console.log("red button clicked");
  console.log(availableSeats);
  const inputNrOfSeats = document.getElementById("inputNrOfSeats").value;
  console.log(inputNrOfSeats);
  if (inputNrOfSeats < 1 || inputNrOfSeats > 4) {
    availableSeatHeader.innerText = "Please reserve ticket(s) for 1-4 person!";
  }
  if (inputNrOfSeats === 1) {
    console.log(availableSeats[0]);
    //return
    availableSeatHeader.innerText = availableSeats[0];
  }
  if (inputNrOfSeats === 2 || inputNrOfSeats === 3 || inputNrOfSeats === 4) {
    //find neighbour
    console.log(availableSeats);
  }
});

//console.log(findSeats());
