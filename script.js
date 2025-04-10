var price = 3.26;
var cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];

var message = document.getElementById("change-due");
var purchaseBtn = document.getElementById("purchase-btn");

updateDrawerDisplay();

purchaseBtn.addEventListener("click", function(e) {
  e.preventDefault();
  var cash = parseFloat(document.getElementById("cash").value);
  message.innerHTML = "";

  if (isNaN(cash)) {
    message.innerHTML = "Please enter a valid number";
    return;
  }

  if (cash < price) {
    alert("Customer does not have enough money to purchase the item");
    message.innerHTML = "Customer does not have enough money to purchase the item";
  } else if (cash === price) {
    message.innerHTML = "No change due - customer paid with exact cash";
  } else {
    calculateChange(cash);
  }
});

function calculateChange(cash) {
  var balance = parseFloat((cash - price).toFixed(2));
  var originalCid = JSON.parse(JSON.stringify(cid));
  
  var currencyUnits = [
    ["ONE HUNDRED", 100],
    ["TWENTY", 20],
    ["TEN", 10],
    ["FIVE", 5],
    ["ONE", 1],
    ["QUARTER", 0.25],
    ["DIME", 0.1],
    ["NICKEL", 0.05],
    ["PENNY", 0.01]
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
  document.getElementById("pennies").textContent = cid[0][1].toFixed(2);
  document.getElementById("nickels").textContent = cid[1][1].toFixed(2);
  document.getElementById("dimes").textContent = cid[2][1].toFixed(2);
  document.getElementById("quarters").textContent = cid[3][1].toFixed(2);
  document.getElementById("ones").textContent = cid[4][1].toFixed(2);
  document.getElementById("fives").textContent = cid[5][1].toFixed(2);
  document.getElementById("tens").textContent = cid[6][1].toFixed(2);
  document.getElementById("twenties").textContent = cid[7][1].toFixed(2);
  document.getElementById("hundreds").textContent = cid[8][1].toFixed(2);
}