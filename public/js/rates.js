document.addEventListener('DOMContentLoaded', () => {
    const cryptoTable = document.getElementById('cryptoTable');
    const cryptoList = document.getElementById('cryptoList');
    const cryptoHead = document.getElementById('currencies');
    function fetchCryptoRates() {
        fetch('/api/rates') // Replace with your API endpoint
            .then(response => response.json())
            .then(data => {
                updateCryptoTable(data);
            })
            .catch(error => {
                console.error('Error fetching crypto rates:', error);
            });
    }

    function updateCryptoTable(rates) {
        cryptoHead.innerHTML = '';
        cryptoList.innerHTML = '';
        const headRow = document.createElement('tr');
        headRow.innerHTML = '<th>Currencies</th>'
        for (const currency in Object.values(rates)[0]) {
            headRow.innerHTML += `<th>${currency.toUpperCase()}</th>`;
        }
        cryptoHead.appendChild(headRow);
        for (const coin in rates) {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${coin}</td>`;
            for (const fiat in rates[coin]) {
                row.innerHTML += `<td>${rates[coin][fiat]}`
            }
            cryptoList.appendChild(row);
        }
    }

    // Fetch rates initially and then set an interval to fetch rates every 5 seconds
    fetchCryptoRates();
    setInterval(fetchCryptoRates, 5000);
});
