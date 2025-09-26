const fromCurrency = document.getElementById('from-currency');
const toCurrency = document.getElementById('to-currency');
const amountInput = document.getElementById('amount');
const result = document.getElementById('result');
const swapBtn = document.getElementById('swap');

let rates = {};
let base = 'USD';

const currencyNames = {
    AED: 'United Arab Emirates Dirham',
    AFN: 'Afghan Afghani',
    ALL: 'Albanian Lek',
    AMD: 'Armenian Dram',
    ANG: 'Netherlands Antillean Guilder',
    AOA: 'Angolan Kwanza',
    ARS: 'Argentine Peso',
    AUD: 'Australian Dollar',
    AWG: 'Aruban Florin',
    AZN: 'Azerbaijani Manat',
    BAM: 'Bosnia and Herzegovina Convertible Mark',
    BBD: 'Barbadian Dollar',
    BDT: 'Bangladeshi Taka',
    BGN: 'Bulgarian Lev',
    BHD: 'Bahraini Dinar',
    BIF: 'Burundian Franc',
    BMD: 'Bermudian Dollar',
    BND: 'Brunei Dollar',
    BOB: 'Bolivian Boliviano',
    BRL: 'Brazilian Real',
    BSD: 'Bahamian Dollar',
    BTN: 'Bhutanese Ngultrum',
    BWP: 'Botswana Pula',
    BYN: 'Belarusian Ruble',
    BZD: 'Belize Dollar',
    CAD: 'Canadian Dollar',
    CDF: 'Congolese Franc',
    CHF: 'Swiss Franc',
    CLP: 'Chilean Peso',
    CNY: 'Chinese Yuan',
    COP: 'Colombian Peso',
    CRC: 'Costa Rican Colon',
    CUP: 'Cuban Peso',
    CVE: 'Cape Verdean Escudo',
    CZK: 'Czech Koruna',
    DJF: 'Djiboutian Franc',
    DKK: 'Danish Krone',
    DOP: 'Dominican Peso',
    DZD: 'Algerian Dinar',
    EGP: 'Egyptian Pound',
    ERN: 'Eritrean Nakfa',
    ETB: 'Ethiopian Birr',
    EUR: 'Euro',
    FJD: 'Fijian Dollar',
    FKP: 'Falkland Islands Pound',
    FOK: 'Faroese Krona',
    GBP: 'British Pound Sterling',
    GEL: 'Georgian Lari',
    GGP: 'Guernsey Pound',
    GHS: 'Ghanaian Cedi',
    GIP: 'Gibralter Pound',
    GMD: 'Gambian Dalasi',
    GNF: 'Guinean Franc',
    GTQ: 'Guatemalan Quetzal',
    GYD: 'Guyanese Dollar',
    HKD: 'Hong Kong Dollar',
    HNL: 'Honduran Lempira',
    HRK: 'Croatian Kuna',
    HTG: 'Haitian Gourde',
    HUF: 'Hungarian Forint',
    IDR: 'Indonesian Rupiah',
    ILS: 'Israeli New Shekel',
    IMP: 'Isle of Man Pound',
    INR: 'Indian Rupee',
    IQD: 'Iraqi Dinar',
    IRR: 'Iranian Rial',
    ISK: 'Icelandic Krona',
    JEP: 'Jersey Pound',
    JMD: 'Jamaican Dollar',
    JOD: 'Jordanian Dinar',
    JPY: 'Japanese Yen',
    KES: 'Kenyan Shilling',
    KGS: 'Kyrgyzstani Som',
    KHR: 'Cambodian Riel',
    KID: 'Kiribati Dollar',
    KMF: 'Comorian Franc',
    KRW: 'South Korean Won',
    KWD: 'Kuwaiti Dinar',
    KYD: 'Cayman Islands Dollar',
    KZT: 'Kazakhstani Tenge',
    LAK: 'Lao Kip',
    LBP: 'Lebanese Pound',
    LKR: 'Sri Lankan Rupee',
    LRD: 'Liberian Dollar',
    LSL: 'Lesotho Loti',
    LYD: 'Libyan Dinar',
    MAD: 'Moroccan Dirham',
    MDL: 'Moldovan Leu',
    MGA: 'Malagasy Ariary',
    MKD: 'Macedonian Denar',
    MMK: 'Myanmar Kyat',
    MNT: 'Mongolian Tugrik',
    MOP: 'Macanese Pataca',
    MRU: 'Mauritanian Ouguiya',
    MUR: 'Mauritian Rupee',
    MVR: 'Maldivian Rufiyaa',
    MWK: 'Malawian Kwacha',
    MXN: 'Mexican Peso',
    MYR: 'Malaysian Ringgit',
    MZN: 'Mozambican Metical',
    NAD: 'Namibian Dollar',
    NGN: 'Nigerian Naira',
    NIO: 'Nicaraguan Córdoba',
    NOK: 'Norwegian Krone',
    NPR: 'Nepalese Rupee',
    NZD: 'New Zealand Dollar',
    OMR: 'Omani Rial',
    PAB: 'Panamanian Balboa',
    PEN: 'Peruvian Sol',
    PGK: 'Papua New Guinean Kina',
    PHP: 'Philippine Peso',
    PKR: 'Pakistani Rupee',
    PLN: 'Polish Zloty',
    PYG: 'Paraguayan Guarani',
    QAR: 'Qatari Riyal',
    RON: 'Romanian Leu',
    RSD: 'Serbian Dinar',
    RUB: 'Russian Ruble',
    RWF: 'Rwandan Franc',
    SAR: 'Saudi Riyal',
    SBD: 'Solomon Islands Dollar',
    SCR: 'Seychellois Rupee',
    SDG: 'Sudanese Pound',
    SEK: 'Swedish Krona',
    SGD: 'Singapore Dollar',
    SHP: 'Saint Helena Pound',
    SLE: 'Sierra Leonean Leone',
    SLL: 'Sierra Leonean Leone',
    SOS: 'Somali Shilling',
    SRD: 'Surinamese Dollar',
    SSP: 'South Sudanese Pound',
    STN: 'Sao Tome and Principe Dobra',
    SYP: 'Syrian Pound',
    SZL: 'Swazi Lilangeni',
    THB: 'Thai Baht',
    TJS: 'Tajikistani Somoni',
    TMT: 'Turkmenistani Manat',
    TND: 'Tunisian Dinar',
    TOP: 'Tongan Paanga',
    TRY: 'Turkish Lira',
    TTD: 'Trinidad and Tobago Dollar',
    TVD: 'Tuvaluan Dollar',
    TWD: 'New Taiwan Dollar',
    TZS: 'Tanzanian Shilling',
    UAH: 'Ukrainian Hryvnia',
    UGX: 'Ugandan Shilling',
    USD: 'United States Dollar',
    UYU: 'Uruguayan Peso',
    UZS: 'Uzbekistani Som',
    VES: 'Venezuelan Bolivar',
    VND: 'Vietnamese Dong',
    VUV: 'Vanuatu Vatu',
    WST: 'Samoan Tala',
    XAF: 'Central African CFA Franc',
    XCD: 'East Caribbean Dollar',
    XCG: 'Gold',
    XDR: 'Special Drawing Rights',
    XOF: 'West African CFA Franc',
    XPF: 'CFP Franc',
    YER: 'Yemeni Rial',
    ZAR: 'South African Rand',
    ZMW: 'Zambian Kwacha',
    ZWL: 'Zimbabwean Dollar',
};

function fetchRates() {
    fetch('https://api.exchangerate-api.com/v4/latest/USD')
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Failed to load rates');
            }
            return response.json();
        })
        .then(function (data) {
            rates = data.rates;
            base = data.base;
            Dropdowns();
            convertCurrency();
        })
        .catch(function (error) {
            result.textContent = "Error: " + error.message;
        });
}


function CurrencyLabel(code) {
    const name = currencyNames[code] || 'Unknown Currency';
    return `${code} - ${name}`;
}

function Dropdowns() {
  const codes = Object.keys(rates);

  for (let i = 0; i < codes.length; i++) {
    const code = codes[i];
    const label = CurrencyLabel(code);

    const option1 = document.createElement("option");
    const option2 = document.createElement("option");

    option1.value = code;
    option1.textContent = label;

    option2.value = code;
    option2.textContent = label;

    fromCurrency.appendChild(option1);
    toCurrency.appendChild(option2);
  }

  fromCurrency.value = "USD";
  toCurrency.value = "PKR";
}


function convertCurrency() {
    const amount = parseFloat(amountInput.value);
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (isNaN(amount) || amount <= 0) {
        result.textContent = 'Please enter a valid amount.';
        return;
    }

    if (!rates[from] || !rates[to]) {
        result.textContent = 'Currency not supported.';
        return;
    }

    const usdAmount = amount / rates[from];
    const converted = (usdAmount * rates[to]).toFixed(2);
    result.textContent = `Converted Amount: ${converted} ${to}`;
}

swapBtn.addEventListener('click', () => {
    [fromCurrency.value, toCurrency.value] = [toCurrency.value, fromCurrency.value];
    convertCurrency();
});

amountInput.addEventListener('input', convertCurrency);
fromCurrency.addEventListener('change', convertCurrency);
toCurrency.addEventListener('change', convertCurrency);

fetchRates();