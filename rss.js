async function fetchRSSFeed() {
    const feedUrl = "https://rss.com/blog.rss"; // Replace with the desired RSS feed URL
    const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`);
    const data = await response.json();

    const feedContainer = document.getElementById('rss-feed');
  
    if (data && data.items) {
        data.items.slice(0, 5).forEach(item => {
            const article = document.createElement('article');

            const title = document.createElement('h3');
            title.innerText = item.title;
            article.appendChild(title);

            const link = document.createElement('a');
            link.href = item.link;
            link.target = '_blank';
            link.innerText = 'Read more';
            article.appendChild(link);

            feedContainer.appendChild(article);
        });
    } else {
        feedContainer.innerText = 'No recent updates from RSS feed.';
    }
}

document.addEventListener('DOMContentLoaded', fetchRSSFeed);