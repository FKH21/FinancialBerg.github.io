// Your Polygon API key
const apiKey = 'xTQoiheJiboP0JoncAulf8BfjEbyahVB';

let nextUrl = null; // To store the next page URL

// Function to fetch all tickers with pagination support
async function fetchAllTickers(url = `https://api.polygon.io/v3/reference/tickers?apiKey=${apiKey}`) {
    try {
        const response = await fetch(url);
        const data = await response.json();

        // Get the ticker list container
        const tickerList = document.getElementById('ticker-list');

        // Loop through the tickers and display them
        data.results.forEach(ticker => {
            const listItem = document.createElement('li');
            listItem.textContent = ticker.ticker;
            listItem.style.cursor = 'pointer';
            listItem.style.color = 'white';
            listItem.style.textDecoration = 'underline';

            // Add click event listener to fetch news for the selected ticker
            listItem.addEventListener('click', () => fetchNews(ticker.ticker));

            tickerList.appendChild(listItem);
        });

        // Save the next URL if there's more data
        nextUrl = data.next_url;

        // If there are more tickers, show the Load More button
        const loadMoreButton = document.getElementById('load-more');
        if (nextUrl) {
            loadMoreButton.style.display = 'block';
        } else {
            loadMoreButton.style.display = 'none';
        }
    } catch (error) {
        console.error('Error fetching tickers:', error);
    }
}

// Function to fetch news based on the ticker
async function fetchNews(ticker) {
    try {
        const response = await fetch(`https://api.polygon.io/v2/reference/news?ticker=${ticker}&apiKey=${apiKey}`);
        const data = await response.json();

        // Get the news list container
        const newsList = document.getElementById('news-list');
        newsList.innerHTML = ''; // Clear existing news

        // Loop through the news articles and create list items
        data.results.forEach(article => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = article.article_url;
            link.target = '_blank'; // Open the link in a new tab
            link.textContent = article.title;
            link.style.color = 'white';
            link.style.textDecoration = 'none';

            listItem.appendChild(link);
            newsList.appendChild(listItem);
        });
    } catch (error) {
        console.error(`Error fetching news for ${ticker}:`, error);
    }
}

// Add event listener for Load More button
document.getElementById('load-more').addEventListener('click', () => {
    if (nextUrl) {
        fetchAllTickers(nextUrl);
    }
});

// Fetch initial tickers when the page loads
fetchAllTickers();
