import React from 'react'

class MessageDisplay extends React.PureComponent {
  render() {
    const { message } = this.props
    return (
      <div>
        <h1>Hello {message}</h1>
      </div>
    )
  }
}

export default MessageDisplay
