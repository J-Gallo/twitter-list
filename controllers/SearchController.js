'use strict'

class SearchController {
  constructor (searchService, redisService) {
    this.searchService = searchService
    this.redisService = redisService
  }

  /**
   * @name getTweets
   * @description Get tweets from SearchService
   * @param req {object} res {object}
  */
  getTweets (req, res) {
    const searchTerm = req.query['query']

    this.redisService.get(searchTerm).then((data) => {
      if (data === 'null' || data == null || data === 'undefined') {
        // From API
        this.searchService.search(searchTerm).then((result) => {
          let cards = []
          result.statuses.forEach((tweet) => {
            const cardModel = {
              id: tweet.id_str,
              text: tweet.text,
              user: {
                screen_name: tweet.user.screen_name,
                profile_pic: tweet.user.profile_image_url_https,
                profile_text_color: tweet.user.profile_text_color
              },
              retweet_count: tweet.retweet_count
            }

            this.redisService.set(cardModel.id, JSON.stringify(cardModel), 300)
            cards.push(cardModel)
          })
          this.redisService.set(searchTerm, JSON.stringify(cards), 300)
          return res.json(cards)
        }).catch((err) => {
          if (err) {
            console.log(err)
          }
          return res.json({})
        })
      } else {
        // Data from cache
        return res.json(JSON.parse(data))
      }
    })
  }

  /**
   * @name getTweet
   * @description Get tweet from SearchService
   * @param req {object} res {object}
  */
  getTweet (req, res, next) {
    const tweetId = req.params.id

    this.redisService.get(tweetId).then((data) => {
      if (data === 'null' || data == null || data === 'undefined') {
        // Tweet not found, fetching from API
        this.searchService.getTweet(tweetId).then((tweet) => {
          const cardModel = {
            id: tweet.id_str,
            text: tweet.text,
            user: {
              screen_name: tweet.user.screen_name,
              profile_pic: tweet.user.profile_image_url_https,
              profile_text_color: tweet.user.profile_text_color
            },
            retweet_count: tweet.retweet_count
          }
          this.redisService.set(cardModel.id, JSON.stringify(cardModel), 300)
          return res.json(cardModel)
        }).catch((err) => {
          if (err) {
            console.log(err)
          }
          return res.json({})
        })
      } else {
        return res.json(JSON.parse(data))
      }
    })
  }
}

module.exports = SearchController
