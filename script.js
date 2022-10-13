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
    const findNeighbours = (arr) => {
      arr.map((item) => {
        arr.filter((fItem) => {
          item.row == fItem.row &&
            item.zone == fItem.zone &&
            item.seatNumber == fItem.seatNumber + 1;
        });
        console.log("I found something");
      });
    };

    findNeighbours(availableSeats);
  }
});

const findNeighbours = (arr) => {
  arr.map((item) => {
    arr.filter((fItem) => {
      item.row == fItem.row &&
        (item.zone == fItem.zone) & (item.seatNumber == fItem.seatNumber + 1);
    });
    console.log("I found something");
  });
};

/* const doIt = (arr) => {
  const a = myArr;
  const b = myArr;
  for (let i = 0; i < b.length; i++) {
    if (i == 0) {
      var left_neighbour = "";
    } else {
      var left_neighbour = a[i - 1];
    }
    if (i == b.length) {
      var right_neighbour = "";
    } else {
      var right_neighbour = a[i + 1];
    }
    if (left_neighbour !== "") {
      if (right_neighbour) {
        console.log(left_neighbour + "," + right_neighbour);
      } else {
        console.log(left_neighbour);
      }
    } else {
      if (right_neighbour) {
        console.log(right_neighbour);
      } else {
        console.log(left_neighbour);
      }
    }
  }
}; */

const doIt = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[i] == arr[i + j] + 1) {
        console.log("neighb2");
        console.log(arr[i], arr[i + j]);
      }
      for (let k = 0; k < arr.length; k++) {
        if (arr[i] == arr[i + j] + 1 && arr[i] == arr[i + k] + 2) {
          console.log("hey 3");
          console.log(arr[i], arr[i + j], arr[i + k]);
          for (let l = 0; l < arr.length; l++) {
            if (
              arr[i] == arr[i + j] + 1 &&
              arr[i] == arr[i + k] + 2 &&
              arr[i] == arr[i + l] + 3
            ) {
              console.log("hey 4");
              console.log(arr[i], arr[i + j], arr[i + k], arr[i + l]);
            }
          }
        }
      }
    }
  }
};

const myArr = [5, 6, 4, 16, 3, 14, 20, 21, 17, 7, 9, 18, 15];
console.log(doIt(myArr));
