# TWITTER LIST

## Preview URL

https://twitter-list.now.sh

## Development

* Clone repo
* npm install / yarn install)
* npm run dev

## Testing

* Setup environment variables in package.json:7
* npm test

## Coverage

![alt text](https://puu.sh/ybJxM/d7456e93f6.png)

## Linter

* npm run lint

## Technology stack

* ReactJS 
* NextJS for server render and styled components
* NodeJS (with Express framework)
* Now for deployment

## API Endpoints

* [GET] /api/search?searchTerm=
* [GET] /api/tweet/:id

## Components

* Autocomplete
* Card
* Head
* Header
* Loading
* Tweet

## Pages
* index
* search (list)
* tweet

## External dependencies

* Production dependencies
  * "bluebird": "^3.5.1",
  * "body-parser": "^1.18.1",
  * "classnames": "^2.2.5",
  * "express": "^4.14.0",
  * "next": "latest",
  * "node-cache": "^4.1.1",
  * "q": "^1.5.0",
  * "react": "^16.0.0",
  * "react-dom": "^16.0.0",
  * "redis": "^2.8.0",
  * "restler": "^3.4.0",
  * "styled-jsx": "^2.0.0",
  * "twitter": "^1.7.1",
  * "webpack": "^2.5.1"
* Development dependencies
  * "chai": "^4.1.2",
  * "chai-http": "^3.0.0",
  * "mocha": "^3.5.3",
  * "standard": "^10.0.3"
