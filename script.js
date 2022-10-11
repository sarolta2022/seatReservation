import seats from "./data.js";

const input = document.getElementById("input");
const output = document.getElementById("output");
const btnReserveRandomly = document.getElementById("btnReserveRandomly");
const order = [3, 4, 5, 2, 6, 1, 7];
const abcOrder = ["a", "b", "c", "d", "e", "f", "g"];
const theatreSeats = document.querySelectorAll("div.theatre-seats");
//coloring the seats

const addFrontendId = () => {
  seats.map((seat) => {
    seat.frontendId = `${seat.zone.slice(0, 3)}-${seat.row}-${seat.seatNumber}`;
  });
};

addFrontendId();

const colorseats = () => {
  seats.map((seat) => {
    if (seat.price === 1) {
      document.getElementById(seat.frontendId).style.background =
        "rgb(236, 72, 72)";
    }
    if (seat.price === 2) {
      document.getElementById(seat.frontendId).style.background = "goldenrod";
    }
    if (seat.price === 3) {
      document.getElementById(seat.frontendId).style.background =
        "rgb(95, 95, 197)";
    }
  });
};

colorseats();

// calculate the random number of reserved seats

const numberOfSeats = seats.length;

const numberOfReservedSeats = Math.floor(
  Math.random() * (numberOfSeats - numberOfSeats * 0.2 + 1) +
    numberOfSeats * 0.2
);

// reserve seats randomly
// create shallowArray, sort by shallowId, get the reserved seats and set availibility to false

const shallowSeats = [...seats];

const randomReservedSeats = () => {
  shallowSeats.map((shallowSeat) => {
    shallowSeat.shallowId = Math.random();
  });

  shallowSeats.sort((seatA, seatB) => {
    if (seatA.shallowId < seatB.shallowId) {
      return -1;
    }
  });
  for (let i = 0; i < numberOfReservedSeats; i++) {
    shallowSeats[i].isAvailable = false;
  }
  return shallowSeats;
};
randomReservedSeats();
const availableSeats = shallowSeats.filter((item) => item.isAvailable);
const updateUI = () => {
  document.getElementById("seatAvailabilityOutput").innerText =
    availableSeats.map(
      (avSeat) => ` ${avSeat.zone} ${avSeat.row} ${avSeat.seatNumber} `
    );
  availableSeats.map((avSeat) => {
    document.getElementById(avSeat.frontendId).style.opacity = 0.2;
  });
};

updateUI();

//sorting seats by rules

const findSeats = (arr, prop1, prop2, prop3, prop4) => {
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

console.log(findSeats());
