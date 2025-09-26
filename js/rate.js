const API_URL = "https://api.exchangerate-api.com/v4/latest/USD";
const tableBody = document.getElementById("rate-body");
const metaInfo = document.getElementById("meta-info");

fetch(API_URL)
    .then(res => res.json())
    .then(data => {
        const rates = data.rates;
        const base = data.base;
        const date = data.date;

        metaInfo.textContent = `Base Currency: ${base} | Date: ${date}`;

        for (const code in rates) {
            const rate = rates[code];
            const row = document.createElement("tr");

            const currencyCell = document.createElement("td");
            currencyCell.textContent = code;

            const rateCell = document.createElement("td");
            rateCell.textContent = rate;

            row.appendChild(currencyCell);
            row.appendChild(rateCell);
            tableBody.appendChild(row);
        }
    })
    .catch(() => {
        metaInfo.textContent = "Failed to load exchange rates.";
    });
