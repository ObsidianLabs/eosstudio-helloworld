import React from 'react';
import 'assets/styles/app.scss';

import { message } from 'antd';
import EosNameInput from 'components/eos-name-input'
import EosPrivateKeyInput from 'components/eos-private-key-input'
import MessageInput from 'components/message-input'
import MessageDisplay from 'components/message-display'
import MessageActions from 'components/message-actions'
import EosjsClient from 'lib/eos'

class App extends React.Component {

  state = {
    name: '',
    message: '',
    messageFromBlockchain: ''
  }

  componentWillMount() {
    this.client = new EosjsClient()
    this.interval = setInterval(async () => {
      if (!this.state.name) {
        this.setState({ messageFromBlockchain: '' })
        return
      }
      try {
        const result = await this.client.getTableRows({
          json: true,
          code: this.state.name,
          scope: this.state.name,
          table: 'messages',
          lower_bound: this.state.name,
          limit: 1,
        })
        const messageFromBlockchain = result.rows[0].text
        this.setState({ messageFromBlockchain })
      } catch (error) {
        this.setState({ messageFromBlockchain: '' })
      }
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  handleNameChange = value => {
    this.setState({ name: value })
  }

  handleWarning = () => {
    console.log('warning');
  }

  handlePrivateKeyChange = value => {
    this.client.privateKey = value
  }

  handleMessageChange = value => {
    this.setState({
      message: value
    })
  }

  handleHi = () => {
    try {
      this.client.transact({
        actions: [{
          account: this.state.name,
          name: 'hi',
          authorization: [{
            actor: this.state.name,
            permission: 'active',
          }],
          data: {
            from: this.state.name,
            message: this.state.message
          },
        }]
      }, {
        blocksBehind: 3,
        expireSeconds: 30,
      })
    } catch (error) {
      message.error(error.message)
    }
  }

  handleReset = () => {
    try {
      this.client.transact({
        actions: [{
          account: this.state.name,
          name: 'drop',
          authorization: [{
            actor: this.state.name,
            permission: 'active',
          }],
          data: {},
        }]
      }, {
        blocksBehind: 3,
        expireSeconds: 30,
      })
    } catch (error) {
      message.error(error.message)
    }
  }

  render () {
    return (
      <div className="app">
        <div className="app-body">
          <MessageDisplay message={this.state.messageFromBlockchain}/>
          <EosNameInput
            onChange={this.handleNameChange}
            onWarning={this.handleWarning}
          />
          <EosPrivateKeyInput
            onChange={this.handlePrivateKeyChange}
            validator={this.client.isPrivateKeyValid}
          />
          <MessageInput
            onChange={this.handleMessageChange}
          />
          <MessageActions onHiClick={this.handleHi} onResetClick={this.handleReset}/>
        </div>
      </div>
    )
  }
}

export default App;
