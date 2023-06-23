window.addEventListener("load", function () {
  //Start of making seats=========================================================
  let stageL = this.document.getElementById("left");
  let stageR = this.document.getElementById("right");
  let middsile = this.document.getElementById("middsile");
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
  let i = 0;
  let sitNum = [];
  let count2 = 0;

  //Seat Left============================================================:
  for (i; i < 14; i++) {
    stageL.innerHTML += "<div class='label'>" + `${label[i]}` + "</div>";

    for (var y = 1; y <= 3; y++) {
      count2++;
      if (i == 0 && count2 < 4) {
        stageL.innerHTML +=
          "<div id=" +
          `${label[i]}` +
          "-" +
          `${y}` +
          " class = seats>" +
          "<p>" +
          `${y}` +
          "</p>" +
          "</div>";
        sitNum.push(y);
      }

      if (count2 == 4 && i >= 1) {
        sitNum.push(sitNum[sitNum.length - 1] + 13);
        count2 = 1;
        stageL.innerHTML +=
          "<div id=" +
          `${label[i]}` +
          "-" +
          `${sitNum[sitNum.length - 1]}` +
          " class = seats><p>" +
          `${sitNum[sitNum.length - 1]}` +
          "</p></div>";
      } else if (i >= 1) {
        sitNum.push(sitNum[sitNum.length - 1] + 1);
        stageL.innerHTML +=
          "<div id=" +
          `${label[i]}` +
          "-" +
          `${sitNum[sitNum.length - 1]}` +
          " class = seats><p>" +
          `${sitNum[sitNum.length - 1]}` +
          "</p></div>";
      }
    }
  }

  //Seat Middle========================================================:

  sitNum = [];
  count2 = 0;
  i = 0;

  for (var y = 1; y <= 139; y++) {
    count2++;

    if (y < 10) {
      middsile.innerHTML +=
        "<div id=" +
        `${label[i]}` +
        "-" +
        `${y + 3}` +
        " class = seats>" +
        "<p>" +
        `${y + 3}` +
        "</p>" +
        "</div>";
      sitNum.push(y + 3);
    }

    if (count2 == 11) {
      i++;
      sitNum.push(sitNum[sitNum.length - 1] + 7);
      count2 = 1;
      middsile.innerHTML +=
        "<div id=" +
        `${label[i]}` +
        "-" +
        `${sitNum[sitNum.length - 1]}` +
        " class = seats><p>" +
        `${sitNum[sitNum.length - 1]}` +
        "</p></div>";
    } else if (y >= 10 && count2 < 10) {
      sitNum.push(sitNum[sitNum.length - 1] + 1);
      middsile.innerHTML +=
        "<div id=" +
        `${label[i]}` +
        "-" +
        `${sitNum[sitNum.length - 1]}` +
        " class = seats><p>" +
        `${sitNum[sitNum.length - 1]}` +
        "</p></div>";
    }
  }

  //Seat Right========================================================:

  sitNum = [];
  count2 = 0;
  i = 0;

  for (i; i < 14; i++) {
    stageR.innerHTML += "<div class='label'>" + `${label[i]}` + "</div>";

    for (var y = 1; y <= 3; y++) {
      count2++;
      if (i == 0 && count2 < 4) {
        stageR.innerHTML +=
          "<div id=" +
          `${label[i]}` +
          "-" +
          `${y + 12}` +
          " class = seats>" +
          "<p>" +
          `${y + 12}` +
          "</p>" +
          "</div>";
        sitNum.push(y + 12);
      }

      if (count2 == 4 && i >= 1) {
        sitNum.push(sitNum[sitNum.length - 1] + 13);
        count2 = 1;
        stageR.innerHTML +=
          "<div id=" +
          `${label[i]}` +
          "-" +
          `${sitNum[sitNum.length - 1]}` +
          " class = seats><p>" +
          `${sitNum[sitNum.length - 1]}` +
          "</p></div>";
      } else if (i >= 1) {
        sitNum.push(sitNum[sitNum.length - 1] + 1);
        stageR.innerHTML +=
          "<div id=" +
          `${label[i]}` +
          "-" +
          `${sitNum[sitNum.length - 1]}` +
          " class = seats><p>" +
          `${sitNum[sitNum.length - 1]}` +
          "</p></div>";
      }
    }
  }

  //Start of making random Reserved seats=================================================
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

  //Start of Reserving Seats=================================================

  let seats = this.document.querySelectorAll(".seats");

  seats.forEach((seat) => {
    seat.addEventListener("click", function () {
      recordSeat(this.getAttribute("id"));
      this.classList.remove("seats");
      this.classList.add("clicked");
    });
  });

  let seatReserved = [];
  let countReserved = 0;

  function recordSeat(seatID) {
    seatReserved.push(seatID);
  }

  let reserveButton = this.document.querySelector("#Mreserve");
  let forms = document.querySelector("#formContainer");
  let Fname = "";
  let Sname = "";
  let email = "";
  reserveButton.onclick = function () {
    forms.style.top = "30%";
    forms.style.opacity = 100;
  };

  let confiBtn = this.document.getElementById("confirmbtn");
  confiBtn.onclick = () => {
    changeSeatToReserved();
  };

  function changeSeatToReserved() {
    let changeToReserved = document.querySelectorAll(".clicked");
    changeToReserved.forEach((seat) => {
      seat.classList.remove("clicked");
      seat.classList.add("reserved");
    });

    Fname = document.getElementById("Fname").value;
    Sname = document.getElementById("Sname").value;
    email = document.getElementById("email").value;

    document.querySelectorAll("input").forEach((input) => {
      input.value = "";
    });

    forms.style.top = "-100%";
    forms.style.opacity = 0;

    makePerson();
    printScreen();
  }

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

  let pScreen = this.document.getElementById("print");
  function printScreen() {
    pScreen.style.top = "30%";
    pScreen.style.opacity = 100;
  }

  let closeScreen = this.document.querySelector("#print > div");

  closeScreen.onclick = () => {
    pScreen.style.opacity = 0;

    this.setTimeout(() => {
      pScreen.style.top = "-100px";
    }, 350);
  };

  let download = document.querySelector("#print > button");

  download.onclick = () => {
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
    pdf.addPage();
    pdf.save(`${person1.Name}` + "_receipt" + ".pdf");
  };
});
