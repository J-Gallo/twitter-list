const express = require('express')
const next = require('next')
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const bodyParser = require('body-parser')

const SearchController = require('./controllers/SearchController')
const SearchService = require('./services/SearchService')
const RedisService = require('./services/RedisService')
const RestConnector = require('./services/RestConnectorService')

const searchInstance = new SearchController(new SearchService(new RestConnector()), new RedisService())
const server = express()

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: false }))

server.get('/ping', (req, res) => {
  return res.send('pong')
})

server.get('/tweets', (req, res) => {
  const mergedQuery = Object.assign({}, req.query, req.params)

  return app.render(req, res, '/search', mergedQuery)
})

server.get('/tweet/:id', (req, res) => {
  const mergedQuery = Object.assign({}, req.query, req.params)

  return app.render(req, res, '/tweet', mergedQuery)
})

server.get('/api/search', (req, res) => searchInstance.getTweets(req, res))
server.get('/api/tweet/:id', (req, res) => searchInstance.getTweet(req, res))

server.get('*', (req, res) => {
  return handle(req, res)
})

app.prepare().then(() => {
  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})

module.exports = server
