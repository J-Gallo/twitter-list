import React from 'react'
import HeadTag from '../components/Head'
import Autocomplete from '../components/Autocomplete'
import Loading from '../components/Loading'

class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      search: '',
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
      <div className='twitter-container'>
        <HeadTag />
        <div className='twitter-logo'>
          <h1>Twitter List</h1>
        </div>
        <div className='twitter-autocomplete-container'>
          <Autocomplete iconColor='#02b875' autocompleteWidth='500px' onLoading={this.handleLoading} />
        </div>
        <div className='twitter-loading'>
          <div className={this.state.loading}>
            <Loading />
          </div>
        </div>
        <style jsx>{`
          .twitter-loading {
            visibility: hidden
          }

          .twitter-loading .loading {
            visibility: visible
          }
          
          h1 {
            color: #02b875;
            font-size: 60px;
          }
          .twitter-container {
            text-align: center;
            width: 1000px;
            margin: 162px auto;
          }
          .twitter-autocomplete-container {
            margin: auto;
            width: 500px;
          }
        `}</style>
        <style global jsx>{`
          body {
            margin: 0;
            padding: 0;
            background-color: #e6ecf0;
            font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
          }
        `}</style>
      </div>
    )
  }
}

export default Home
