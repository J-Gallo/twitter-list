'use strict'

const redis = require('redis')
const bluebird = require('bluebird')

class RedisService {
  constructor (searchService) {
    if (process.env.NODE_ENV === 'production') {
      this.client = redis.createClient('//' + process.env.REDIS_HOST, {
        'password': process.env.REDIS_PASSWORD
      })
    } else {
      this.client = redis.createClient()
    }

    bluebird.promisifyAll(redis.RedisClient.prototype)
    bluebird.promisifyAll(redis.Multi.prototype)
  }

  /**
   * @name get
   * @description Get data from Redis
   * @param key {string}
  */
  get (key) {
    return this.client.getAsync(key).then((data) => {
      return data
    })
  }

  /**
   * @name set
   * @description Set data to Redis.
   * @param key {string}, value {string}, ttl {number}
  */
  set (key, value, ttl) {
    if (ttl) {
      this.client.set(key, value, 'EX', ttl)
    } else {
      this.client.set(key, value)
    }
  }

  del (key) {
    this.client.del(key)
  }
}

module.exports = RedisService
