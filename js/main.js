const countrySelect = document.getElementById("country");
const stateSelect = document.getElementById("state");
const myForm = document.getElementById("myForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const contactInput = document.getElementById("contact");
const countryInput = document.getElementById("country");
const stateInput = document.getElementById("state");

fetch(
  "https://raw.githubusercontent.com/stefanbinder/countries-states/master/countries.json"
)
  .then((response) => response.json())
  .then((data) => {
    const option = document.createElement("option");
    option.value = "";
    option.text = "";
    countrySelect.appendChild(option);
    data.forEach((country) => {
      const option = document.createElement("option");
      option.value = country.name;
      option.text = country.name;
      countrySelect.appendChild(option);
    });
  });

countrySelect.addEventListener("change", () => {
  const selectedCountry = countrySelect.value;
  stateSelect.innerHTML = "";

  fetch(
    "https://raw.githubusercontent.com/stefanbinder/countries-states/master/countries.json"
  )
    .then((response) => response.json())
    .then((data) => {
      const country = data.find((c) => c.name === selectedCountry);
      const option = document.createElement("option");
      option.value = "";
      option.text = "";
      stateSelect.appendChild(option);
      if (country.name === selectedCountry) {
        country.states.forEach((state) => {
          const option = document.createElement("option");
          option.value = state.name;
          option.text = state.name;
          stateSelect.appendChild(option);
        });
      }
    });
});
function isFormEmpty(myForm) {
  // Get all the form elements
  var elements = myForm.elements;

  // Loop through all the elements
  for (var i = 0; i < elements.length; i++) {
    // If the element has a value, the form is not empty
    if (elements[i].value === "") {
      return true;
    }
  }
  return false;
}

function sendMessageToParent(msg) {
  window.parent.postMessage(msg, "*");
}

function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function isValidMobileNumber(number) {
  const regex = /^\d{10}$/;
  return regex.test(number);
}

myForm.addEventListener("submit", (event) => {
  if (isFormEmpty(myForm)) {
    event.preventDefault();
    if (stateSelect.value == "") {
      sendMessageToParent({ State: { error: "State is required" } });
    }
    if (countrySelect.value == "") {
      sendMessageToParent({ Country: { error: "Country is required" } });
    }

    if (!isValidMobileNumber(contactInput.value)) {
      sendMessageToParent({
        Contanct: { error: "Contact number should be of 10 digits" },
      });
    }
    if (!isValidEmail(emailInput.value)) {
      sendMessageToParent({ Email: { error: "Invalid email address" } });
    }
    if (nameInput.value.length < 4 || nameInput.value.length > 10) {
      sendMessageToParent({
        Name: { error: "Name should be between 4-10 characters" },
      });
    }
  } else {
    sendMessageToParent({ Success: "All fields are valid!" });
  }
});
