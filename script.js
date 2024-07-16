const dropdowns = document.querySelectorAll(".dropdown select");
const fromCurr = document.getElementById("from");
const toCurr = document.getElementById("to");
const amountInput = document.querySelector(".amount");
const convertBtn = document.getElementById("convert-btn");
const exchangeRateDisplay = document.getElementById("exchange-rate");

const countryList = {
    AED: "AE", AFN: "AF", XCD: "AG", ALL: "AL", AMD: "AM", ANG: "AN", AOA: "AO", AQD: "AQ", ARS: "AR",
    AUD: "AU", AZN: "AZ", BAM: "BA", BBD: "BB", BDT: "BD", XOF: "BE", BGN: "BG", BHD: "BH", BIF: "BI",
    BMD: "BM", BND: "BN", BOB: "BO", BRL: "BR", BSD: "BS", NOK: "BV", BWP: "BW", BYR: "BY", BZD: "BZ",
    CAD: "CA", CDF: "CD", XAF: "CF", CHF: "CH", CLP: "CL", CNY: "CN", COP: "CO", CRC: "CR", CUP: "CU",
    CVE: "CV", CYP: "CY", CZK: "CZ", DJF: "DJ", DKK: "DK", DOP: "DO", DZD: "DZ", ECS: "EC", EEK: "EE",
    EGP: "EG", ETB: "ET", EUR: "FR", FJD: "FJ", FKP: "FK", GBP: "GB", GEL: "GE", GGP: "GG", GHS: "GH",
    GIP: "GI", GMD: "GM", GNF: "GN", GTQ: "GT", GYD: "GY", HKD: "HK", HNL: "HN", HRK: "HR", HTG: "HT",
    HUF: "HU", IDR: "ID", ILS: "IL", INR: "IN", IQD: "IQ", IRR: "IR", ISK: "IS", JMD: "JM", JOD: "JO",
    JPY: "JP", KES: "KE", KGS: "KG", KHR: "KH", KMF: "KM", KPW: "KP", KRW: "KR", KWD: "KW", KYD: "KY",
    KZT: "KZ", LAK: "LA", LBP: "LB", LKR: "LK", LRD: "LR", LSL: "LS", LTL: "LT", LVL: "LV", LYD: "LY",
    MAD: "MA", MDL: "MD", MGA: "MG", MKD: "MK", MMK: "MM", MNT: "MN", MOP: "MO", MRO: "MR", MTL: "MT",
    MUR: "MU", MVR: "MV", MWK: "MW", MXN: "MX", MYR: "MY", MZN: "MZ", NAD: "NA", XPF: "NC", NGN: "NG",
    NIO: "NI", NPR: "NP", NZD: "NZ", OMR: "OM", PAB: "PA", PEN: "PE", PGK: "PG", PHP: "PH", PKR: "PK",
    PLN: "PL", PYG: "PY", QAR: "QA", RON: "RO", RSD: "RS", RUB: "RU", RWF: "RW", SAR: "SA", SBD: "SB",
    SCR: "SC", SDG: "SD", SEK: "SE", SGD: "SG", SKK: "SK", SLL: "SL", SOS: "SO", SRD: "SR", STD: "ST",
    SVC: "SV", SYP: "SY", SZL: "SZ", THB: "TH", TJS: "TJ", TMT: "TM", TND: "TN", TOP: "TO", TRY: "TR",
    TTD: "TT", TWD: "TW", TZS: "TZ", UAH: "UA", UGX: "UG", USD: "US", UYU: "UY", UZS: "UZ", VEF: "VE",
    VND: "VN", VUV: "VU", YER: "YE", ZAR: "ZA", ZMK: "ZM", ZWD: "ZW",
};

const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const populateDropdowns = () => {
  dropdowns.forEach((dropdown) => {
    for (let currCode in countryList) {
      let newOption = document.createElement("option");
      newOption.innerText = currCode;
      newOption.value = currCode;
      if (dropdown.name === "from" && currCode === "USD") {
        newOption.selected = "selected";
      } else if (dropdown.name === "to" && currCode === "INR") {
        newOption.selected = "selected";
      }
      dropdown.appendChild(newOption);
    }
  });
};

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

const updateExchangeRate = async () => {
  let amountVal = amountInput.value;
  if (amountVal === "" || amountVal < 1) {
    amountVal = 1;
    amountInput.value = "1";
  }
  const fromValue = fromCurr.value.toLowerCase();
  const toValue = toCurr.value.toLowerCase();
  const URL = `${BASE_URL}/${fromValue}/${toValue}.json`;

  console.log(`Fetching exchange rate from ${URL}`);
  
  try {
    let response = await fetch(URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    let data = await response.json();
    console.log('Data received:', data);
    let rate = data[toValue];
    let finalAmount = (amountVal * rate).toFixed(2);
    exchangeRateDisplay.innerText = `${amountVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    exchangeRateDisplay.innerText = 'Error fetching exchange rate';
  }
};

populateDropdowns();
dropdowns.forEach((dropdown) => {
  dropdown.addEventListener("change", (evt) => {
    updateFlag(evt.target);
    updateExchangeRate();
  });
});

convertBtn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});
