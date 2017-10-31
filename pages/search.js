import React from 'react'
import HeadTag from '../components/Head'
import Header from '../components/Header'
import Card from '../components/Card'
import fetch from 'isomorphic-fetch'
import config from '../config'

class Items extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      search: ''
    }
  }

  static async getInitialProps ({req, query}) {
    let q
    let tweets = []

    if (process.env.NODE_ENV === 'production') {
      this.baseUrl = config()('production')
    } else {
      this.baseUrl = config()('dev')
    }

    if (req) {
      q = req.query['searchTerm']
    } else {
      q = query.searchTerm
    }

    if (q && q !== '') {
      const responseJson = await fetch(this.baseUrl + '/api/search?query=' + q)
      tweets = await responseJson.json()
    }

    return {tweets: tweets}
  }

  render () {
    return (
      <div>
        <HeadTag />
        <Header />
        <div className='twitter-container'>
          {this.props.tweets.length > 0 &&
            <div className='twitter-card-container'>
              {this.props.tweets.map((tweet, i) => {
                return (
                  <div key={i}>
                    <Card tweetData={tweet} />
                  </div>
                )
              })}
            </div>
          }
          {this.props.tweets.length === 0 &&
            <div className='twitter-not-found'>
              <i className='fa fa-meh-o' aria-hidden='true' />
              <span>No encontramos ningun resultado para tu busqueda </span>
            </div>
          }
        </div>
        <style jsx>{`
          .twitter-not-found {
            text-align: center;
            width: 1000px;
            margin-top: 100px;    
          }
          .twitter-not-found i {
            font-size: 120px;
            display: block;
            color: #657786;
            margin-bottom: 20px;
          }
          .twitter-not-found span {
            font-size: 24px;
            color: #657786;
          }

          .twitter-container, .twitter-card-container {
            max-width: 1000px;
            min-width: 1000px;
            min-height: 100px;
            margin: 0px auto;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
          }

          @media(max-width: 1000px) {
            .twitter-container {
              width: 100%;
              min-width: 0;
              margin-top: 0;
            }
            .twitter-card-container {
              width: 100%;
            }
          }
        `}</style>
        <style global jsx>{`
          body {
            margin: 0;
            padding: 0;
            background-color: #e6ecf0;
            font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif;
          }
        `}</style>
      </div>
    )
  }
}

export default Items
