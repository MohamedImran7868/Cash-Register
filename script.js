var price = 0.00;
var cid = [
  ["5 sen", 1.05],
  ["10 sen", 2.10],
  ["20 sen", 3.20],
  ["50 sen", 4.50],
  ["RM 1", 45],
  ["RM 5", 55],
  ["RM 10", 60],
  ["RM 20", 80],
  ["RM 50", 200],
  ["RM 100", 400]
];

var message = document.getElementById("change-due");
var totalMessage = document.getElementById("total-message");
var purchaseBtn = document.getElementById("purchase-btn");

updateDrawerDisplay();

purchaseBtn.addEventListener("click", function(e) {
  e.preventDefault();
  price = parseFloat(document.getElementById("total").value);
  var cash = parseFloat(document.getElementById("cash").value);
  message.innerHTML = "";
  totalMessage.innerHTML = "";

  if (isNaN(cash)) {
    message.innerHTML = "Please enter a valid number";
    return;
  } else if (isNaN(price)){
    totalMessage.innerHTML = "Please enter a valid number greater than 0.00 and a multiple of 5";
    return;
  }

  if (cash < price) {
    message.innerHTML = "Customer does not have enough money to purchase the item";
  } else if (cash === price) {
    message.innerHTML = "No change due - customer paid with exact cash";
  }
  else {
    var balance = parseFloat((cash - price).toFixed(2));
    if (Math.abs(balance % 0.05) > 0.001) {
      alert("The balance cannot be given accurately with the available denominations. (Note we don't have 1 sen. Make sure the amount and total ends with 5 or 0)");
      return;
    }
    calculateChange(cash);
  }
});

function calculateChange(cash) {
  var balance = parseFloat((cash - price).toFixed(2));
  var originalCid = JSON.parse(JSON.stringify(cid));
  
  var currencyUnits = [
    ["RM 100", 100],
    ["RM 50", 50],
    ["RM 20", 20],
    ["RM 10", 10],
    ["RM 5", 5],
    ["RM 1", 1],
    ["50 sen", 0.5],
    ["20 sen", 0.2],
    ["10 sen", 0.1],
    ["5 sen", 0.05]
  ];

  var totalCid = parseFloat(cid.reduce((sum, denom) => sum + denom[1], 0).toFixed(2));

  if (balance > totalCid) {
    message.innerHTML = "STATUS: INSUFFICIENT_FUNDS";
    return;
  }

  var changeArr = [];
  
  currencyUnits.forEach(unit => {
    var unitName = unit[0];
    var unitValue = unit[1];
    var available = cid.find(c => c[0] === unitName)[1];
    var amountUsed = 0;

    while (balance >= unitValue && available >= unitValue) {
      balance = parseFloat((balance - unitValue).toFixed(2));
      available = parseFloat((available - unitValue).toFixed(2));
      amountUsed += unitValue;
    }

    if (amountUsed > 0) {
      changeArr.push([unitName, amountUsed]);
      cid.find(c => c[0] === unitName)[1] = available;
    }
  });

  if (balance > 0) {
    cid = originalCid;
    message.innerHTML = "STATUS: INSUFFICIENT_FUNDS";
    return;
  }

  updateDrawerDisplay();
  
  if (cid.reduce((sum, denom) => sum + denom[1], 0) === 0) {
    message.innerHTML = "STATUS: CLOSED<br>" + 
      changeArr.map(c => `${c[0]}: $${c[1].toFixed(2)}`).join("<br>");
  } else {
    message.innerHTML = "STATUS: OPEN<br>" + 
      changeArr.map(c => `${c[0]}: $${c[1].toFixed(2)}`).join("<br>");
  }
}

function updateDrawerDisplay() {
  document.getElementById("5sen").textContent = `RM ${cid[0][1].toFixed(2)}`;
  document.getElementById("10sen").textContent = `RM ${cid[1][1].toFixed(2)}`;
  document.getElementById("20sen").textContent = `RM ${cid[2][1].toFixed(2)}`;
  document.getElementById("50sen").textContent = `RM ${cid[3][1].toFixed(2)}`;
  document.getElementById("RM1").textContent = `RM ${cid[4][1].toFixed(2)}`;
  document.getElementById("RM5").textContent = `RM ${cid[5][1].toFixed(2)}`;
  document.getElementById("RM10").textContent = `RM ${cid[6][1].toFixed(2)}`;
  document.getElementById("RM20").textContent = `RM ${cid[7][1].toFixed(2)}`;
  document.getElementById("RM50").textContent = `RM ${cid[8][1].toFixed(2)}`;
  document.getElementById("RM100").textContent = `RM ${cid[9][1].toFixed(2)}`;
}