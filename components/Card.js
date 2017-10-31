import React from 'react'
import Link from 'next/link'

class Card extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const tweetColor = '#' + this.props.tweetData.user.profile_text_color
    const tweetId = '/tweet?id=' + this.props.tweetData.id
    const tweetAs = '/tweet/' + this.props.tweetData.id

    return (
      <Link prefetch href={tweetId} as={tweetAs}>
        <div className='twitter-card-container'>
          <div className='twitter-profile-picture'>
            <img src={this.props.tweetData.user.profile_pic} />
          </div>
          <div className='twitter-tweet-data'>
            <h3>{this.props.tweetData.user.screen_name}</h3>
            <p>{this.props.tweetData.text}</p>
          </div>
          <div className='twitter-tweet-social-container'>
            <div className='twitter-tweet-social'>
              <i className='fa fa-retweet' aria-hidden='true' />
              <span>{this.props.tweetData.retweet_count}</span>
            </div>
          </div>
          <style jsx>{`
            .twitter-card-container {
              width: 400px;
              padding: 30px;
              height: 150px;
              background-color: #FFF;
              color: ${tweetColor};
              border: 1px solid #e6ecf0;
              display: flex;
              position: relative;
            }
            .twitter-card-container:hover {
              background-color: #f5f8fa;
              cursor: pointer;
            }
            .twitter-profile-picture img{
              border-radius: 50%;
            }
            .twitter-tweet-data {
              margin: 0 0 0 20px;
            }
            .twitter-tweet-data h3 {
              margin-top: 0;
              margin-bottom: 0;
            }
            .twitter-tweet-data p {
              margin-top: 5px;
            }
            .twitter-tweet-social-container {
              position: absolute;
              bottom: 0;
              left: 0;
              width: 100%;
              height: 30px;
            }
            .twitter-tweet-social {
              display: inline-block;
              margin-left: 20px;
              color: #657786;  
            }
            .twitter-tweet-social:first-of-type {
              margin-left: 100px;
            }
            .twitter-tweet-social i {
              margin-left: 10px;
            }
            .twitter-tweet-social span {
              margin-left: 10px;
            }
          `}</style>
        </div>
      </Link>
    )
  }
}

export default Card
