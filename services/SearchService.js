'use strict'

const Twitter = require('twitter')
const Q = require('q')

class SearchService {
  constructor (restConnector) {
    this.restConnector = restConnector
    this.twitterClient = new Twitter({
      consumer_key: process.env.CONSUMER,
      consumer_secret: process.env.SECRET,
      bearer_token: process.env.BEARER
    })
  }

  /**
   * @name search
   * @description Fetch tweets from Twitter API filtered by searchTerm
   * @param searchTerm {string}
  */
  search (searchTerm) {
    const deferred = Q.defer()

    this.twitterClient.get('search/tweets.json?q=' + searchTerm + '&result_type=mixed', {}).then((data) => {
      deferred.resolve(data)
    }).catch((err) => {
      deferred.reject(err)
    })

    return deferred.promise
  }

   /**
   * @name getTweet
   * @description Fetch a single tweet from Twitter API filtered by ID
   * @param tweetId {string}
  */
  getTweet (tweetId) {
    const deferred = Q.defer()
    this.twitterClient.get('statuses/show.json?id=' + tweetId, {}).then((data) => {
      deferred.resolve(data)
    }).catch((err) => {
      deferred.reject(err)
    })

    return deferred.promise
  }
}

module.exports = SearchService
