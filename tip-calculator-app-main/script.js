const custom = document.getElementById("custom");
const reset = document.getElementById("reset");

function calculateTip(tip) {
  reset.style.backgroundColor = "#26c0ab";
  var billAmount = parseFloat(document.getElementById("bill").value);
  var people = document.getElementById("people").value;
  if (!checkBillAmount(billAmount)) {
    billAmount = 0;
  }

  if (people > 0) {
    var tipAmount = (billAmount * (tip / 100)) / people;
    var totalAmount = (billAmount + tipAmount) / people;

    document.getElementById("tipAmount").innerHTML = "$" + tipAmount.toFixed(2);
    document.getElementById("totalAmount").innerHTML =
      "$" + totalAmount.toFixed(2);
  } else {
    document.getElementById("error").textContent = "Can't be 0";
    document.getElementById("error").style.display = "block";
    document.getElementById("tipAmount").innerHTML = "$0.00";
    document.getElementById("totalAmount").innerHTML = "$0.00";
  }
}

function checkBillAmount(input) {
  var digitRegex = /^\d+$/;
  var floatRegex = /^\d+(\.\d+)?$/;

  if (digitRegex.test(input)) {
    return true;
  } else if (floatRegex.test(input)) {
    return true;
  } else {
    return false;
  }
}

custom.addEventListener("input", function () {
  customTips = parseInt(custom.value);
  calculateTip(customTips);
});

reset.addEventListener("click", () => {
  location.reload();
});
