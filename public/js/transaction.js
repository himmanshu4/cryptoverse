document.addEventListener('DOMContentLoaded', () => {
    const coinIDInput = document.getElementById('coinID');
    const currentPriceSpan = document.getElementById('currentPrice');
    const buyOrSellSelect = document.getElementById('buyOrSell');

    function fetchCurrentPrice() {
        const selectedCoin = coinIDInput.value;

        // Replace "your-backend-url" with the actual backend URL
        fetch(`/api/rates`)
            .then(response => response.json())
            .then(data => {
                currentPriceSpan.textContent = data[selectedCoin]?.usd||"Loading...";
            })
            .catch(error => {
                console.error('Error fetching current price:', error);
            });
    }

    coinIDInput.addEventListener('input', fetchCurrentPrice);

    // Initial fetch
    fetchCurrentPrice();

    // Set interval to periodically fetch current price
    setInterval(fetchCurrentPrice, 5000); // Fetch every 5 seconds

});
