import React from 'react'
import { Input, Form } from 'antd'

class MessageInput extends React.Component {

  handleChange = event => {
    const value = event.target.value
    const { onChange } = this.props
    onChange && onChange(value)
  }

  render () {
    return (
      <div className="eos-input-wrapper">
        <Form.Item>
          <Input
            placeholder="Message"
            onChange={this.handleChange}
          />
        </Form.Item>
      </div>
    )
  }
}

export default MessageInput
