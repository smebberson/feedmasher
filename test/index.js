var FeedParser = require('feedparser'),
	request = require('request'),
	util = require('util'),
	lib = require('../lib'),
	FeedMasher = require('../main');

new FeedMasher(['https://github.com/smebberson.atom',
	'https://api.twitter.com/1/statuses/user_timeline.rss?screen_name=smebberson',
	'http://feeds.delicious.com/v2/rss/smebberson'], function (err, articles) {

	if (err) {
		console.error(err);
		return;
	}

	articles.forEach(function (article) {
		console.log((article.title || article.description) + ' guid: ' + article.guid);
		console.log(article.pubDate || article.pubdate);
		console.log('-----');
	});

});