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

//create shallowArray
const seats = [...theatreSeats];
const numberOfSeats = seats.length;

//add helper Id's
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

//coloring the seats based on different price category
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

//order seats based on rules
const findSeats = () => {
  availableSeats = seats.filter((item) => item.isAvailable);

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

const main = () => {
  reservingSeats();
  findSeats();
};

//updateUI
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

//eventHandlers
btnReserveRandomly.addEventListener("click", (e) => {
  e.preventDefault();
  main();
  updateUI();
});

btnReservedByInput.addEventListener("click", (e) => {
  e.preventDefault();
  numberOfReservedSeats = inputNrOfReservedSeats.value;
  if (numberOfReservedSeats < 8 || numberOfReservedSeats > 41) {
    document.getElementById("reservedSeatsOutput").innerText =
      "Please enter a number between 8 and 41!";
  } else {
    main();
    updateUI();
  }
});

btnFindSeat.addEventListener("click", (e) => {
  e.preventDefault();
  findSeats();

  console.log("red button clicked");
  console.log(availableSeats);
  const inputNrOfSeats = document.getElementById("inputNrOfSeats").value;
  console.log(inputNrOfSeats);

  if (inputNrOfSeats < 1 || inputNrOfSeats > 4) {
    availableSeatHeader.innerText = "Please reserve ticket(s) for 1-4 person!";
  }

  if (inputNrOfSeats == 1) {
    availableSeatHeader.innerText = `Your seat is in the zone of: ${availableSeats[0].zone}, in the row: ${availableSeats[0].row}, on the ${availableSeats[0].seatNumber}th seat`;

    document.getElementById(availableSeats[0].frontendId).style.background =
      "grey";
    document.getElementById(availableSeats[0].frontendId).style.opacity = 1.5;
    document.getElementById("outputAvailableSeat").innerText = "";
  }

  if (inputNrOfSeats == 2) {
    console.log("input 2 clicked");
    for (let i = 0; i < availableSeats.length; i++) {
      for (let j = 0; j < availableSeats.length; j++) {
        if (
          Math.abs(
            availableSeats[i].seatNumber - availableSeats[i + j].seatNumber
          ) == 1 &&
          availableSeats[i].zone == availableSeats[i + j].zone &&
          availableSeats[i].row == availableSeats[i + j].row
        ) {
          console.log(availableSeats[i].seatNumber);
          console.log(availableSeats[i], availableSeats[i + j]);
          availableSeatHeader.innerText = `Your seat(s) are in the zone of: ${
            availableSeats[i].zone
          }, in the row: ${availableSeats[i].row}, on the ${
            availableSeats[i].seatNumber
          }th and ${availableSeats[i + j].seatNumber}th seat`;
          document.getElementById("outputAvailableSeat").innerText = "";
        }
      }
    }
  }
  if (inputNrOfSeats == 3) {
    console.log("input 3 clicked");
    for (let i = 0; i < availableSeats.length; i++) {
      for (let j = 0; j < availableSeats.length; j++) {
        for (let k = 0; k < availableSeats.length; k++) {
          if (
            Math.abs(
              availableSeats[i].seatNumber - availableSeats[i + j].seatNumber
            ) == 1 &&
            Math.abs(
              availableSeats[i].seatNumber - availableSeats[i + k].seatNumber
            ) == 2 &&
            /* Math.abs(
              availableSeats[i + j].seatNumber -
                availableSeats[i + k].seatNumber
            ) == 1 && */
            availableSeats[i].zone == availableSeats[i + j].zone &&
            availableSeats[i].zone == availableSeats[i + k].zone &&
            availableSeats[i].row == availableSeats[i + j].row &&
            availableSeats[i].row == availableSeats[i + k].row
          ) {
            console.log(
              availableSeats[i],
              availableSeats[i + j],
              availableSeats[i + k]
            );
            availableSeatHeader.innerText = `Your seat(s) are in the zone of: ${
              availableSeats[i].zone
            }, in the row: ${availableSeats[i].row}, on the ${
              availableSeats[i].seatNumber
            }th, ${availableSeats[i + j].seatNumber}th and the ${
              availableSeats[i + k].seatNumber
            } seat`;
            document.getElementById("outputAvailableSeat").innerText = "";
          }
        }
      }
    }
  }

  if (inputNrOfSeats == 4) {
    console.log("input 4 clicked");
    for (let i = 0; i < availableSeats.length; i++) {
      for (let j = 0; j < availableSeats.length; j++) {
        for (let k = 0; k < availableSeats.length; k++) {
          for (let l = 0; l < availableSeats.length; l++) {
            if (
              Math.abs(
                availableSeats[i].seatNumber - availableSeats[i + j].seatNumber
              ) == 1 &&
              Math.abs(
                availableSeats[i].seatNumber - availableSeats[i + k].seatNumber
              ) == 2 &&
              Math.abs(
                availableSeats[i + j].seatNumber -
                  availableSeats[i + k].seatNumber
              ) == 1 &&
              Math.abs(
                availableSeats[i + j].seatNumber -
                  availableSeats[i + l].seatNumber
              ) == 3 &&
              Math.abs(
                availableSeats[i + k].seatNumber -
                  availableSeats[i + l].seatNumber
              ) == 1 &&
              availableSeats[i].zone == availableSeats[i + j].zone &&
              availableSeats[i].zone == availableSeats[i + k].zone &&
              availableSeats[i].zone == availableSeats[i + l].zone &&
              availableSeats[i].row == availableSeats[i + j].row &&
              availableSeats[i].row == availableSeats[i + k].row &&
              availableSeats[i].row == availableSeats[i + l].row
            ) {
              console.log(
                availableSeats[i],
                availableSeats[i + j],
                availableSeats[i + k],
                availableSeats[i + l]
              );
              availableSeatHeader.innerText = `Your seat(s) are in the zone of: ${
                availableSeats[i].zone
              }, in the row: ${availableSeats[i].row}, on the ${
                availableSeats[i].seatNumber
              }th, ${availableSeats[i + j].seatNumber}th, ${
                availableSeats[i + k].seatNumber
              } and the ${availableSeats[i + l].seatNumber} seat`;
              document.getElementById("outputAvailableSeat").innerText = "";
            }
          }
        }
      }
    }
  } /*else {
    availableSeatHeader.innerText = "Sorry";
    document.getElementById("outputAvailableSeat").innerText = ""; 
  } */
});

const findNeighbours = (arr, input) => {
  let output;
  if (input === 1) {
    return arr[0];
  }
  if (input == 2) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        if (Math.abs(arr[i] - arr[i + j]) == 1) {
          output = [arr[i], arr[i + j]];
        }
      }
    }
    return output;
  }

  if (input == 3) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        for (let k = 0; k < arr.length; k++) {
          if (
            Math.abs(arr[i] - arr[i + j]) == 1 &&
            Math.abs(arr[i] - arr[i + k]) == 2 &&
            Math.abs(arr[i + j] - arr[i + k] == 1)
          ) {
            output = [arr[i], arr[i + j], arr[i + k]];
          }
        }
      }
    }
    return output;
  }

  if (input == 4) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        for (let k = 0; k < arr.length; k++) {
          for (let l = 0; l < arr.length; l++) {
            if (
              Math.abs(arr[i] - arr[i + j]) == 1 &&
              Math.abs(arr[i] - arr[i + k]) == 2 &&
              Math.abs(arr[i] - arr[i + l]) == 3 &&
              Math.abs(arr[i + j] - arr[i + k] == 1) &&
              Math.abs(arr[i + k] - arr[i + l] == 1)
            ) {
              output = [arr[i], arr[i + j], arr[i + k], arr[i + l]];
            }
          }
        }
      }
    }
    return output;
  }

  if ((output = " ")) {
    console.log("sorry");
  }
};

const myArr = [
  5, 4, 1025, 16, 3, 188, 1027, 1022, 14, 20, 21, 17, 1026, 1022, 1023, 6, 189,
  186, 7, 9, 18, 1024, 15, 187, 80, 190,
];

console.log(findNeighbours(myArr, 1));
console.log(findNeighbours(myArr, 2));
console.log(findNeighbours(myArr, 3));
console.log(findNeighbours(myArr, 4));
console.log(findNeighbours(myArr, 5));
/* const findNeighbours = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (Math.abs(arr[i] - arr[i + j]) == 1) {
        console.log(arr[i], arr[i + j]);
      }
      for (let k = 0; k < arr.length; k++) {
        if (
          Math.abs(arr[i] - arr[i + j]) == 1 &&
          Math.abs(arr[i] - arr[i + k]) == 2
        ) {
          console.log(arr[i], arr[i + j], arr[i + k]);
        }
        for (let l = 0; l < arr.length; l++) {
          if (
            Math.abs(arr[i] - arr[i + j]) == 1 &&
            Math.abs(arr[i] - arr[i + k]) == 2 &&
            Math.abs(arr[i] - arr[i + l]) == 3
          ) {
            console.log(arr[i], arr[i + j], arr[i + k], arr[i + l]);
          }
        }
      }
    }
  }
}; */
