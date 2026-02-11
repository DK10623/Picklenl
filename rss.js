// Updated rss.js for integrating and fetching multiple RSS feeds

class RSSFeed {
    constructor(url) {
        this.url = url;
        this.feedData = [];
    }

    async fetchFeed() {
        const response = await fetch(this.url);
        const data = await response.text();
        this.parseFeed(data);
    }

    parseFeed(data) {
        // Parse the XML data here
        // Logic to convert XML to JSON and save to this.feedData
    }
}

class RSSManager {
    constructor(feeds) {
        this.feeds = feeds.map(url => new RSSFeed(url));
    }

    async fetchAllFeeds() {
        const fetchPromises = this.feeds.map(feed => feed.fetchFeed());
        await Promise.all(fetchPromises);
    }

    getAllFeedData() {
        return this.feeds.map(feed => feed.feedData);
    }
}

// Example usage:
const feeds = ['https://example.com/rss1', 'https://example.com/rss2'];
const rssManager = new RSSManager(feeds);
rssManager.fetchAllFeeds().then(() => {
    console.log(rssManager.getAllFeedData());
});
