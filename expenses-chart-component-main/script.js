getData();

// Fetch Data
function getData() {
  fetch("data.json")
    .then((data) => data.json())
    .then((json) => {
      const data = json;
      const days = document.querySelectorAll(".chart .day");
      const daysAmount = document.querySelectorAll(".chart .progress .amount");
      var total = document.getElementById('total');
      let amountArr = [];
      for (let i = 0; i < data.length; i++) {
        days.item(i).innerText = data[i]["day"];
        daysAmount.item(i).style.height = `${data[i]["amount"] + 30}px`;
        daysAmount.item(i).dataset.amount = `$${data[i]["amount"]}`;
        amountArr.push(data[i]["amount"]);
      }
      total.innerText = amountArr.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
      let max = amountArr.indexOf(Math.max(...amountArr));
      daysAmount.item(max).style.backgroundColor = `hsl(186, 34%, 60%)`;
      daysAmount.item(max).onmouseover = () =>
        (daysAmount.item(max).style.backgroundColor = `hsl(186, 34%, 70%)`);
      daysAmount.item(max).onmouseout = () =>
        (daysAmount.item(max).style.backgroundColor = `hsl(186, 34%, 60%)`);
    })
    .catch((err) => err);
}
