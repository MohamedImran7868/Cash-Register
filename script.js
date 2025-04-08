var price = 1.87;
var cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];
var message = document.getElementById("change-due");
var purchase = document.getElementById("purchase-btn");

purchase.addEventListener("click", function () {
  var cash = parseFloat(document.getElementById("cash").value);
  message.innerHTML = "";

  if (cash < price) {
    alert("Customer does not have enough money to purchase the item");

    message.innerHTML =
      "Customer does not have enough money to purchase the item";
  } else if (cash === price) {
    message.innerHTML = "No change due - customer paid with exact cash";
  } else {
    calculate(cash);
  }
});

const calculate = (cash) => {
  var balance = parseFloat((cash - price).toFixed(2));

  var curr = [
    ["ONE HUNDRED", 100],
    ["TWENTY", 20],
    ["TEN", 10],
    ["FIVE", 5],
    ["ONE", 1],
    ["QUARTER", 0.25],
    ["DIME", 0.1],
    ["NICKEL", 0.05],
    ["PENNY", 0.01],
  ];

  var totalCid = parseFloat(
    cid.reduce((sum, denom) => sum + denom[1], 0).toFixed(2)
  );

  if (balance > totalCid) {
    message.innerHTML = "STATUS: INSUFFICIENT_FUNDS";
    return;
  }

  var changeArr = [];
  curr.forEach((denom) => {
    var denomName = denom[0];
    var denomValue = denom[1];

    var available = cid.find((c) => c[0] === denomName)[1];
    var amountUsed = 0;

    while (balance >= denomValue && available >= denomValue) {
      balance = parseFloat((balance - denomValue).toFixed(2));
      available = parseFloat((available - denomValue).toFixed(2));
      amountUsed += denomValue;
    }

    cid.find((c) => c[0] === denomName)[1] = available;

    if (amountUsed > 0) {
      changeArr.push([denomName, amountUsed]);
    }
  });

  var totalAfterTransaction = parseFloat(
    cid.reduce((sum, denom) => sum + denom[1], 0).toFixed(2)
  );

  if (balance > 0) {
    message.innerHTML = "STATUS: INSUFFICIENT_FUNDS";
    return;
  }

  if (totalAfterTransaction === 0) {
    message.innerHTML =
      "STATUS: CLOSED " +
      changeArr.map((c) => `${c[0]}: $${c[1].toFixed(2)}`).join(" ");
  } else {
    message.innerHTML =
      "STATUS: OPEN<br>" +
      changeArr.map((c) => `${c[0]}: $${c[1].toFixed(2)}`).join("<br>");
  }
};
