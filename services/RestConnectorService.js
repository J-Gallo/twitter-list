'use strict'

const restler = require('restler')
const Q = require('q')

class RestConnectorService {
  /**
   * @name get
   * @description GET HTTP Request
   * @param url {string}, options {object}
  */
  get (url, options) {
    const deferred = Q.defer()
    restler.get(url, options)
      .on('success', (rs) => deferred.resolve(rs))
      .on('fail', (err) => deferred.reject(err))
      .on('error', (err) => deferred.reject(err))
      .on('timeout', (err) => deferred.reject(err))

    return deferred.promise
  }

  /**
   * @name post
   * @description POST HTTP Request
   * @param url {string}, options {object}
  */
  post (url, options) {
    const deferred = Q.defer()
    restler.post(url, options)
      .on('success', (rs) => deferred.resolve(rs))
      .on('fail', (err) => deferred.reject(err))
      .on('error', (err) => deferred.reject(err))
      .on('timeout', (err) => deferred.reject(err))

    return deferred.promise
  }
}

module.exports = RestConnectorService
