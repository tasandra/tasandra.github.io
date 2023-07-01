const slider = document.getElementById("range");
var output = document.getElementById("demo");
const checkboxes = document.querySelectorAll("input[type=checkbox]");
const generateButton = document.getElementById("generate");
const barText = document.getElementById("bar-text");
const copy = document.getElementById("copy");
const password = document.querySelector("#password");
const copyText  = document.querySelector("#copy-text ");
output.innerHTML = slider.value;


// handle slider
slider.oninput = function () {
  output.innerHTML = this.value;
  var value = ((this.value - this.min) / (this.max - this.min)) * 100;
  this.style.background =
    "linear-gradient(to right, #a4ffaf 0%, #a4ffaf " +
    value +
    "%, #18171f " +
    value +
    "%, #18171f 100%)";
};

// array to handle checkboxes
let selected = [];
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("click", function () {
    const isFilterPresent = selected.includes(checkbox.value);
    if (this.checked) {
      if (!isFilterPresent) {
        selected.push(checkbox.value);
        showStrength(selected);
        copyText.style.opacity = '0';
      }
    } else {
      if (isFilterPresent) {
        var index = selected.indexOf(checkbox.value);
        if (index !== -1) {
          selected.splice(index, 1);
        }
        showStrength(selected);
        copyText.style.opacity = '0';
      }
    }
  });
});

// show strength base on checked options
function showStrength(selected, checked) {
  var listItem = document.querySelectorAll("ul > li");

  for (var i = 0; i < listItem.length; i++) {
    listItem[i].style.backgroundColor = "";
    listItem[i].style.borderStyle = "";
  }

  if (selected.length === 1) {
    barText.innerHTML = "too weak!";
    listItem[0].style.backgroundColor = "#f64a4a";
    listItem[0].style.borderStyle = "none";
  } else if (selected.length === 2) {
    barText.innerHTML = "weak";
    for (var i = 0; i < 2; i++) {
      listItem[i].style.backgroundColor = "#fb7c58";
      listItem[i].style.borderStyle = "none";
    }
  } else if (selected.length === 3) {
    barText.innerHTML = "medium";
    for (var i = 0; i < 3; i++) {
      listItem[i].style.backgroundColor = "#f8cd65";
      listItem[i].style.borderStyle = "none";
    }
  } else {
    barText.innerHTML = "strong";
    for (var i = 0; i < 4; i++) {
      listItem[i].style.backgroundColor = "#a4ffaf";
      listItem[i].style.borderStyle = "none";
    }
  }
}

// event on click on Generate button
generateButton.addEventListener("click", function () {
  var range = slider.value;
  var newPassword = generatePassword(range, selected);
  password.innerHTML = newPassword;
  password.style.opacity = '1';
  copyText.style.opacity = '0';
});

// generate password
function generatePassword(length, charTypes) {
  const charSets = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+~`|}{[]:;?><,./-=",
  };

  // Create an array to hold the selected character sets
  const selectedCharSets = [];

  // Iterate over the charTypes array and select the corresponding character sets
  for (const charType of charTypes) {
    if (charSets[charType]) {
      selectedCharSets.push(charSets[charType]);
    }
  }

  // Generate the password by randomly selecting characters from the selected character sets
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomCharSet =
      selectedCharSets[Math.floor(Math.random() * selectedCharSets.length)];
    const randomChar =
      randomCharSet[Math.floor(Math.random() * randomCharSet.length)];
    password += randomChar;
  }

  return password;
}

const copyContent = async () => {
  try {
    await navigator.clipboard.writeText(password.textContent);
    console.log("Content copied to clipboard");
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};

// Copy to Clipboard
copy.addEventListener('click', () => {
	copyContent();
  copyText.style.opacity = '1';
});
