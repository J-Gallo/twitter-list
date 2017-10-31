import React from 'react'

class Loading extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  render () {
    return (
      <div className='spinner'>
        <style jsx>{`
          @keyframes spinner {
            to {transform: rotate(360deg);}
          }
          .spinner:before {
            content: '';
            box-sizing: border-box;
            position: absolute;
            top: 50%;
            left: 50%;
            width: 20px;
            height: 20px;
            margin-top: 30px;
            border-radius: 50%;
            border-top: 2px solid #07d;
            border-right: 2px solid transparent;
            animation: spinner .6s linear infinite;
          }
        `}</style>
      </div>
    )
  }
}

export default Loading
