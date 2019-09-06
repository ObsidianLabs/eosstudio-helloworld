import React from 'react'
import { Input, Form } from 'antd'

class EosPrivateKeyInput extends React.Component {

  state = {
    validateStatus: ''
  }

  handleChange = event => {
    const value = event.target.value
    const { onChange, validator } = this.props
    this.resetState()
    if (validator && validator(value)) {
      this.handleSuccess()
      onChange && onChange(value)
    } else if (!validator) {
      onChange && onChange(value)
    }
    onChange && onChange(value)
  }

  handleSuccess = () => {
    const { onSuccess } = this.props
    onSuccess && onSuccess()
    this.setState({ validateStatus: 'success' })
  }

  resetState = () => {
    this.setState({ validateStatus: '' })
  }

  render () {
    return (
      <div className="eos-input-wrapper">
        <Form.Item
          hasFeedback={this.state.validateStatus === 'success'}
          validateStatus={this.state.validateStatus}>
          <Input
            placeholder="Private key"
            onChange={this.handleChange}
            style={{
              paddingRight: '30px'
            }}
          />
        </Form.Item>
      </div>
    )
  }
}

export default EosPrivateKeyInput
