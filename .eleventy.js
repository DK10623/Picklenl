module.exports = function(eleventyConfig) {
  // Copy CNAME file for custom domain
  eleventyConfig.addPassthroughCopy("CNAME");
  
  // Copy .nojekyll file to disable Jekyll processing on GitHub Pages
  eleventyConfig.addPassthroughCopy(".nojekyll");
  
  // Copy static assets
  eleventyConfig.addPassthroughCopy("src/assets");
  
  // Add custom collection for aggregated RSS items
  eleventyConfig.addCollection("aggregatedItems", async function(collectionApi) {
    const aggregateFeeds = require('./src/_data/aggregateFeeds.js');
    return await aggregateFeeds();
  });

  // Add date filter
  eleventyConfig.addFilter("date", function(date, format) {
    let d;
    if (date === "now" || !date) {
      d = new Date();
    } else {
      d = new Date(date);
    }
    
    if (isNaN(d)) return date;
    
    const months = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"];
    
    if (format === "%B %d, %Y") {
      return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
    } else if (format === "%Y-%m-%d") {
      return d.toISOString().split('T')[0];
    } else if (format === "%a, %d %b %Y %H:%M:%S %z") {
      return d.toUTCString();
    } else if (format === "%Y") {
      return d.getFullYear().toString();
    }
    return d.toLocaleDateString();
  });

  // Add truncate filter
  eleventyConfig.addFilter("truncate", function(str, length) {
    if (!str) return "";
    if (str.length <= length) return str;
    return str.substring(0, length) + "...";
  });

  // Add escape filter for XML
  eleventyConfig.addFilter("escape", function(str) {
    if (!str) return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    templateFormats: ["html", "njk", "md", "11ty.js"]
  };
};
