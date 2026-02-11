const Parser = require('rss-parser');
const feedConfig = require('./feedConfig.js');

const parser = new Parser({
  timeout: 10000,
  headers: {
    'User-Agent': 'PickleNL-Aggregator/1.0'
  }
});

async function fetchFeed(feed) {
  try {
    console.log(`Fetching feed: ${feed.name}`);
    const parsed = await parser.parseURL(feed.url);
    return {
      success: true,
      feedName: feed.name,
      items: parsed.items || []
    };
  } catch (error) {
    console.error(`Failed to fetch ${feed.name}: ${error.message}`);
    return {
      success: false,
      feedName: feed.name,
      items: [],
      error: error.message
    };
  }
}

async function aggregateFeeds() {
  const enabledFeeds = feedConfig.filter(feed => feed.enabled);
  
  if (enabledFeeds.length === 0) {
    console.warn('No enabled feeds found in configuration');
    return [];
  }

  // Fetch all feeds in parallel
  const results = await Promise.all(
    enabledFeeds.map(feed => fetchFeed(feed))
  );

  // Combine all items
  const allItems = [];
  for (const result of results) {
    if (result.success && result.items.length > 0) {
      result.items.forEach(item => {
        allItems.push({
          title: item.title || 'Untitled',
          link: item.link || '',
          pubDate: item.pubDate || item.isoDate || new Date().toISOString(),
          content: item.contentSnippet || item.content || '',
          source: result.feedName,
          guid: item.guid || item.link || `${result.feedName}-${item.title}`
        });
      });
    }
  }

  // Deduplicate by guid
  const seen = new Set();
  const deduped = allItems.filter(item => {
    if (seen.has(item.guid)) {
      return false;
    }
    seen.add(item.guid);
    return true;
  });

  // Sort by date (newest first)
  deduped.sort((a, b) => {
    const dateA = new Date(a.pubDate);
    const dateB = new Date(b.pubDate);
    return dateB - dateA;
  });

  // Limit to most recent 50 items
  const limited = deduped.slice(0, 50);

  console.log(`Aggregated ${limited.length} items from ${results.filter(r => r.success).length} feeds`);
  
  return limited;
}

module.exports = aggregateFeeds;
