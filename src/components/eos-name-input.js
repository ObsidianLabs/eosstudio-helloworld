import React from 'react';
import { Input, Form, Popover } from 'antd'

class EosNameInput extends React.Component {
  state = {
    value: '',
    warning: false,
  }

  handleChange = event => {
    const { onChange } = this.props
    const newValue = event.target.value
    const matchedValue = newValue.match(/^[a-z]+[a-z1-5.]*/g)
    const value = matchedValue ? matchedValue.join('').substring(0, 12) : ''
    clearTimeout(this.timeout)
    if ((value.length === 12 && value.endsWith('.')) || (value.length !== newValue.length)) {
      this.handleWarning()
      return
    }
    this.setState({ value, warning: false })
    onChange && onChange(value)
  }

  handleWarning = async () => {
    const { onWarning } = this.props
    onWarning && onWarning()
    this.setState({ warning: true })
    await new Promise(resolve => {
      this.timeout = setTimeout(resolve, 5000)
    })
    this.setState({ warning: false })
  }

  render () {
    return (
      <div className="eos-input-wrapper">
        <Popover
          visible={this.state.warning}
          content={
            <React.Fragment>
              <div>Can only contain the characters <kbd>.abcdefghijklmnopqrstuvwxyz12345</kbd></div>
              <div>Must start with a letter</div>
              <div>Must not end in a dot</div>
            </React.Fragment>
          }
        >
          <Form.Item validateStatus={this.state.warning ? 'warning' : ''}>
            <Input
              placeholder="Account name"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </Form.Item>
        </Popover>
      </div>
    )
  }
}

export default EosNameInput
