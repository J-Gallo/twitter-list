import Link from 'next/link'
import Autocomplete from './Autocomplete'
import React from 'react'

class Header extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false
    }

    this.handleLoading = this.handleLoading.bind(this)
  }

  handleLoading (value) {
    this.setState({
      loading: value
    })
  }

  render () {
    return (
      <header>
        <div className='twitter-wrapper'>
          <div className='twitter-logo'>
            <Link prefetch href='/index' as='/'>
              <span>TWITTER LIST</span>
            </Link>
          </div>
          <Autocomplete autocompleteWidth='600px' iconColor='#02b875' onLoading={this.handleLoading} />
        </div>
        <style jsx>{`
          header {
            position: relative;
            display: flex;
            width: 100%;
            height: 59px;
            top: 0;
            background-color: #02b875;
            z-index: 10;
          }
          .twitter-wrapper {
            max-width: 1100px;
            margin: auto;
            height: 100%;
            display: flex;
          }
          .twitter-logo {
            height: 100%;
            cursor: pointer;
            display: inline-block;
            flex: auto;
            margin-right: 20px;
          }
          .twitter-logo span {
            color: #FFF;
            font-size: 20px;
            line-height: 59px;
          }
          .twitter-actions {
            display: inline-block;
            float: right;
            margin-right: 10px;
          }

          @media(max-width: 1000px) {
            header {
              height: auto;
            }
            .twitter-logo {
              float: none;
              display: block
              text-align: center;
            }
            
            .twitter-actions {
              display: none;
            }
          }
        `}</style>
      </header>
    )
  }
}

export default Header
