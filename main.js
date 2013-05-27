"use strict";

var BinaryHeap = require('./lib').BinaryHeap,
	request = require('request'),
	FeedParser = require('feedparser'),
	async = require('async');


function FeedMasher (feeds, callback, comparator) {

	this.feeds = feeds || [];
	this.callback = callback;
	this.articles = new BinaryHeap(comparator || FeedMasher.comparator);

	this.init();
	this.process();

}

FeedMasher.prototype.init = function () {

	this.articles = new BinaryHeap(FeedMasher.comparator);

};

FeedMasher.prototype.process = function () {

	var self = this;

	async.eachSeries(self.feeds, function (feed, callback) {

		request(feed)
		.pipe(new FeedParser())
		.on('article', function (article) {
			self.articles.push(article);
		})
		.on('end', callback);

	}, function () {

		self.callback(null, self.articles.toArray());

	});

};

FeedMasher.comparator = function (article) {
	return article.pubDate || article.pubdate;
};

exports = module.exports = FeedMasher;