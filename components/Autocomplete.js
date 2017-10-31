import React from 'react'
import Router from 'next/router'

class Autocomplete extends React.Component {
  constructor (props) {
    super(props)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.handleChange = this.handleChange.bind(this)

    this.state = {
      value: ''
    }
  }

  handleKeyPress (event) {
    if (event.key === 'Enter') {
      if (this.props.onLoading) {
        this.props.onLoading('loading')
      }
      this.search()
    }
  }

  handleChange (event) {
    this.setState({
      value: event.target.value
    })
  }

  search () {
    const query = this.state.value
    Router.push('/search?searchTerm=' + query, '/tweets?searchTerm=' + query, { shallow: false })
  }

  render () {
    const autocompleteWidth = this.props.autocompleteWidth
    const iconColor = this.props.iconColor
    return (
      <div className='twitter-autocomplete-container'>
        <div className='twitter-autocomplete-form'>
          <input onKeyPress={this.handleKeyPress}
            value={this.state.value}
            onChange={this.handleChange}
            type='text'
            autoComplete='off'
            placeholder='Buscar'
            className='twitter-autocomplete'
            name='search'
          />
          <div className='twitter-search-button'>
            <i className='fa fa-search' aria-hidden='true' />
          </div>
        </div>
        <style jsx>{`
          .twitter-autocomplete-container {
            flex: auto;
          }
          .twitter-autocomplete-form {
              padding: 7px 5px;
              overflow: auto;
              height: 40px;
              width: ${autocompleteWidth};
              display: inline-block;
              display: flex;
              position: relative;
          }
          .twitter-autocomplete {
              padding: 5px 60px 5px 15px;
              border-radius: 3px;
              box-sizing: border-box;
              border: none;
              width: 100%;
              height: 35px;
              margin-top: 5px;
              font-size: 14px;
              background-color: #FFF;
              outline: 0 none;
              color: #000;
              flex: auto;
          }
          .twitter-search-button {
            flex: auto;
            position: absolute;
            right: 5px;
            top: 12px;
            height: 35px;
            width: 40px;
            text-align: center;
            border-radius: 0 3px 3px 0;
          }

          .twitter-search-button i {
            color: ${iconColor};
            cursor: pointer;
            max-height: 40%;
            vertical-align: -webkit-baseline-middle;
          }

          @media(max-width: 1000px) {
            .twitter-autocomplete-container {
              width: 100%;
              text-align: center;
            }

            .twitter-autocomplete-form {
              display: block;
              width: 100%;
              margin: 0;
              
            }
            .twitter-autocomplete {
              width: 300px;
            }
          }
        `}</style>
      </div>
    )
  }
}

export default Autocomplete
