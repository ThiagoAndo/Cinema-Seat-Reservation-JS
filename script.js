window.addEventListener("load", function () {
  const stageL = this.document.getElementById("left");
  const stageR = this.document.getElementById("right");
  const middsile = this.document.getElementById("middsile");
  let seatReserved = [];
  const reserveButton = this.document.querySelector("#Mreserve");
  const forms = document.querySelector("#formContainer");
  let Fname = "";
  let Sname = "";
  let email = "";
  const blockSeats = this.document.getElementById("block");
  const confiBtn = this.document.getElementById("confirmbtn");
  const pScreen = this.document.getElementById("print");
  const download = document.querySelector("#print > button");
  const closeScreen = this.document.querySelector("#print > div");

  let label = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
  ];

  makeSeats(stageL, 0, 14, 13);
  makeSeats(stageR, 12, 14, 13);
  makeSeats(middsile, 3, 139, 7);

  //Start of making Seats=================================================

  function makeSeats(stage, Fnum, Snum, Tnum) {
    let i = 0;
    let sitNum = [];
    let count2 = 0;
    let count4 = 0;
    let condition1 = false;
    let condition2 = false;
    let condition3 = false;
    function evaluate(y) {
      switch (stage.id) {
        case "middsile":
          condition1 = y < 10;
          condition2 = count2 == 11;
          condition3 = y >= 10 && count2 < 10;

          break;
        default:
          condition1 = i == 0 && count2 < 4;
          condition2 = count2 == 4 && i >= 1;
          condition3 = i >= 1;
      }
    }
    if (stage.id != "middsile") {
      for (i; i < Snum; i++) {
        stage.innerHTML += "<div class='label'>" + `${label[i]}` + "</div>";
        makeSeatsPartTwo(3);
      }
    } else {
      makeSeatsPartTwo(140);
    }
    function makeSeatsPartTwo(num) {
      for (var y = 1; y <= num; y++) {
        count2++;
        evaluate(y);
        if (condition1) {
          stage.innerHTML +=
            "<div id=" +
            `${label[count4]}` +
            "-" +
            `${y + Fnum}` +
            " class = seats>" +
            "<p>" +
            `${y + Fnum}` +
            "</p>" +
            "</div>";
          sitNum.push(y + Fnum);
        }
        evaluate(y);
        if (condition2) {
          sitNum.push(sitNum[sitNum.length - 1] + Tnum);
          count4++;
          count2 = 1;
          stage.innerHTML +=
            "<div id=" +
            `${label[count4]}` +
            "-" +
            `${sitNum[sitNum.length - 1]}` +
            " class = seats><p>" +
            `${sitNum[sitNum.length - 1]}` +
            "</p></div>";
          evaluate(y);
        } else if (condition3) {
          sitNum.push(sitNum[sitNum.length - 1] + 1);
          stage.innerHTML +=
            "<div id=" +
            `${label[count4]}` +
            "-" +
            `${sitNum[sitNum.length - 1]}` +
            " class = seats><p>" +
            `${sitNum[sitNum.length - 1]}` +
            "</p></div>";
        }
      }
    }
  }

  //Start of making random Reserved seats=================================================

  (function () {
    let condition = true;
    let count3 = 0;
    var getSeat = "";
    position = ["#left", "#middsile", "#right"];
    for (var z = 0; z <= 70; z++) {
      if (count3 == 0 || count3 == 2) {
        randonSeat(50, count3);
      } else {
        randonSeat(120, count3);
      }
      count3++;
      if (count3 == 3) {
        count3 = 0;
      }
    }
    function randonSeat(num1, num2) {
      var getSeatNum = Math.round(Math.random() * num1) + 1;
      getSeat = document.querySelector(
        "#seating " +
          `${position[num2]}` +
          " div:nth-child(" +
          `${getSeatNum}` +
          ")"
      );
      condition = getSeat.getAttribute("class") != "label";
      if (condition) {
        getSeat.classList.remove("seats");
        getSeat.classList.add("reserved");
      }
    }
  })();

  //End of making random Reserved seats======================================

  //Start of Reserving Seats=================================================
  let seats = this.document.querySelectorAll(".seats");
  seats.forEach((seat) => {
    seat.addEventListener("click", changeClass);
  });

  function changeClass() {
    if (!this.value) {
      this.className = "clicked";
      this.value = 1;
    } else {
      this.className = "seats";
      this.value = undefined;
    }
  }

  reserveButton.onclick = function () {
    blockSeats.style.display = "block";
    forms.style.top = "30%";
    forms.style.opacity = 100;
    recordSeats();
  };

  function returnClicked() {
    return this.document.querySelectorAll(".clicked");
  }

  function recordSeats() {
    let clickedSeats = returnClicked();
    clickedSeats.forEach((seat) => {
      seatReserved.push(seat.getAttribute("id"));
    });
  }
  // Start of I want to change seats ===============================================
  const changeSit = document.querySelector("#formContainer h3 a");
  changeSit.onclick = (event) => {
    event.preventDefault();
    seatReserved = [];
    forms.style.top = "-100%";
    forms.style.opacity = 0;
    blockSeats.style.display = "none";
    let clickedSeats = returnClicked();
    clickedSeats.forEach((seat) => {
      seat.className = "seat";
    });
  };
  // End of I want to change seats ===============================================

  //Start of colecting data from the form ========================================

  confiBtn.onclick = () => {
    Fname = document.getElementById("Fname").value;
    Sname = document.getElementById("Sname").value;
    email = document.getElementById("email").value;

    document.querySelectorAll("input").forEach((input) => {
      input.value = "";
    });

    if (Fname && Sname && email) {
      forms.style.top = "-100%";
      forms.style.opacity = 0;
      makePerson();
      printScreen();
    }
  };
  //End of colecting data from the form ========================================

  //Start of making a object Person ============================================

  function PersoReservation(name, Surname, emailaddress, seatId) {
    this.Name = name;
    this.SurName = Surname;
    this.Email = emailaddress;
    this.Seat = seatId;
  }

  function makePerson() {
    person1 = new PersoReservation(Fname, Sname, email, seatReserved);
    alert("Hello " + `${person1.Name}` + " \n Thank you for your purchase!");
  }

  //End of making a object Person ============================================

  //Start of print receipt screen ============================================

  function printScreen() {
    pScreen.style.top = "30%";
    pScreen.style.opacity = 100;
    let changeToReserved = returnClicked();
    changeToReserved.forEach((seat) => {
      seat.className = "reserved";
      seat.removeEventListener("click", changeClass);
      console.log(seat.innerHTML);
    });
  }

  closeScreen.onclick = () => {
    pScreen.style.opacity = 0;
    blockSeats.style.display = "none";
    this.setTimeout(() => {
      pScreen.style.top = "-100px";
    }, 350);
  };

  download.onclick = () => {
    blockSeats.style.display = "none";
    var pdf = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "a5",
      putOnlyUsedFonts: true,
    });
    pdf.text("Receipt", 60, 20);
    pdf.text("Name: " + `${person1.Name}` + "", 20, 40);
    pdf.text("Surname: " + `${person1.SurName}` + "", 20, 50);
    pdf.text("Email: " + `${person1.Email}` + "", 20, 60);
    pdf.text("Seats: " + `${person1.Seat}` + "", 20, 70);
    pdf.save(`${person1.Name}` + "_receipt" + ".pdf");
  };

  //End of print receipt screen ============================================
});
