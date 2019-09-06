import React from 'react'
import { Button } from 'antd'

class MessageActions extends React.PureComponent {
  render() {
    const { onHiClick, onResetClick } = this.props
    return (
      <div className="actions-wrapper">
        <Button
          onClick={onHiClick}
          style={{ width: '80px'}}
        >
          Hi
        </Button>
        <Button
          onClick={onResetClick}
          style={{ width: '80px'}}
        >
          Reset
        </Button>
      </div>
    )
  }
}

export default MessageActions
