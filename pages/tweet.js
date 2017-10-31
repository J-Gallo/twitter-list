import React from 'react'
import HeadTag from '../components/Head'
import Header from '../components/Header'
import Card from '../components/Card'
import fetch from 'isomorphic-fetch'
import Error from 'next/error'
import config from '../config'

class Items extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      search: ''
    }
  }

  static async getInitialProps ({req, query}) {
    let id
    let tweet

    if (process.env.NODE_ENV === 'production') {
      this.baseUrl = config()('production')
    } else {
      this.baseUrl = config()('dev')
    }

    if (req) {
      id = req.params.id
    } else {
      id = query.id
    }

    if (id && id !== '') {
      const responseJson = await fetch(this.baseUrl + '/api/tweet/' + id)
      tweet = await responseJson.json()
    }

    return {tweet: tweet}
  }

  render () {
    if (!this.props.tweet) {
      return <Error statusCode='404' />
    }
    return (
      <div>
        <HeadTag />
        <Header />
        <div className='twitter-container'>
          <Card tweetData={this.props.tweet} />
        </div>
        <style jsx> {`
          .twitter-container {
            max-width: 1000px;
            min-width: 1000px;
            min-height: 100px;
            margin: 20px auto;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
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
