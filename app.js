// Your Polygon API key
const apiKey = 'xTQoiheJiboP0JoncAulf8BfjEbyahVB';

// List of Magnificent 7 tickers
const mag7Tickers = ['AAPL', 'MSFT', 'AMZN', 'GOOGL', 'META', 'TSLA', 'NVDA'];

// Function to fetch stock prices for the MAG 7 companies
async function fetchMag7StockPrices() {
    try {
        // Get the ticker list container
        const tickerList = document.getElementById('ticker-list');
        tickerList.innerHTML = ''; // Clear any previous content

        for (let ticker of mag7Tickers) {
            // Fetch the stock price for each MAG 7 company
            const response = await fetch(`https://api.polygon.io/v2/aggs/ticker/${ticker}/prev?apiKey=${apiKey}`);
            const data = await response.json();

            if (data.results && data.results.length > 0) {
                const stockData = data.results[0];

                // Create a table row for each company
                const row = document.createElement('tr');

                // Create Ticker Name cell
                const tickerCell = document.createElement('td');
                tickerCell.textContent = ticker;
                row.appendChild(tickerCell);

                // Create Firm Name cell
                const firmCell = document.createElement('td');
                firmCell.textContent = getCompanyName(ticker);
                row.appendChild(firmCell);

                // Create Last Price cell (closing price)
                const priceCell = document.createElement('td');
                priceCell.textContent = `$${stockData.c.toFixed(2)}`; // Closing price
                row.appendChild(priceCell);

                // Append the row to the table
                tickerList.appendChild(row);
            }
        }
    } catch (error) {
        console.error('Error fetching MAG 7 stock prices:', error);
    }
}

// Helper function to get the company name by ticker symbol
function getCompanyName(ticker) {
    switch (ticker) {
        case 'AAPL':
            return 'Apple';
        case 'MSFT':
            return 'Microsoft';
        case 'AMZN':
            return 'Amazon';
        case 'GOOGL':
            return 'Alphabet (Google)';
        case 'META':
            return 'Meta';
        case 'TSLA':
            return 'Tesla';
        case 'NVDA':
            return 'Nvidia';
        default:
            return 'Unknown';
    }
}

// Fetch the MAG 7 stock prices when the page loads
fetchMag7StockPrices();
