const newsList = document.getElementById('news-list');

async function fetchCryptoNews() {
    try {
        const response = await fetch('https://cryptonews-api.com/api/v1/category?section=general&items=10&token=YOUR_API_KEY');
        const data = await response.json();
        displayNews(data.data);
    } catch (error) {
        console.error('Error fetching news:', error);
    }
}

function displayNews(news) {
    newsList.innerHTML = ''; // Clear the existing news
    news.forEach(article => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${article.title}</strong> - <a href="${article.url}" target="_blank">${article.source}</a>`;
        newsList.appendChild(li);
    });
}

// Fetch news when the page loads
fetchCryptoNews();
