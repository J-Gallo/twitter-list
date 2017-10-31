import React from 'react'

class Tweet extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  render () {
    return (
      <div className='twitter-tweet-container'>
        <div className='twitter-header'>
          <div className='twitter-header-logo'>
            <img src={this.props.tweetData.user.profile_pic} />
          </div>
          <h1>{this.props.tweetData.user.screen_name}</h1>
        </div>
        <style jsx>{`
          .twitter-tweet-container {
            margin-top: 20px;
            width: 100%;
            height: 500px;
            background-color: gray;
          }
        `}</style>
      </div>
    )
  }
}

export default Tweet
