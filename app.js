// const dropdowns = document.querySelectorAll(".dropdown");
// const fromCurr = document.getElementById("from");
// const toCurr = document.getElementById("to");
// const amountInput = document.querySelector("input[type='number']");
// const convertBtn = document.getElementById("convert-btn");
// const exchangeRateDisplay = document.getElementById("exchange-rate");

// const countryList = {
//   USD: "US",
//   INR: "IN",
//   EUR: "EU"
// };

// const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

// const populateDropdowns = () => {
//   dropdowns.forEach((dropdown) => {
//     for (let currCode in countryList) {
//       let newOption = document.createElement("option");
//       newOption.innerText = currCode;
//       newOption.value = currCode;
//       if (dropdown.name === "from" && currCode === "USD") {
//         newOption.selected = "selected";
//       } else if (dropdown.name === "to" && currCode === "INR") {
//         newOption.selected = "selected";
//       }
//       dropdown.appendChild(newOption);
//     }
//   });
// };

// const updateFlag = (element) => {
//   let currCode = element.value;
//   let countryCode = countryList[currCode];
//   let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
//   let img = element.parentElement.querySelector("img");
//   img.src = newSrc;
// };

// const updateExchangeRate = async () => {
//   let amountVal = amountInput.value;
//   if (amountVal === "" || amountVal < 1) {
//     amountVal = 1;
//     amountInput.value = "1";
//   }
//   const fromValue = fromCurr.value.toLowerCase();
//   const toValue = toCurr.value.toLowerCase();
//   const URL = `${BASE_URL}/${fromValue}/${toValue}.json`;
//   let response = await fetch(URL);
//   let data = await response.json();
//   let rate = data[toValue];
//   let finalAmount = (amountVal * rate).toFixed(2);
//   exchangeRateDisplay.innerText = `${amountVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
// };

// populateDropdowns();
// dropdowns.forEach((dropdown) => {
//   dropdown.addEventListener("change", (evt) => {
//     updateFlag(evt.target);
//   });
// });

// convertBtn.addEventListener("click", (evt) => {
//   evt.preventDefault();
//   updateExchangeRate();
// });

// window.addEventListener("load", () => {
//   updateExchangeRate();
// });
