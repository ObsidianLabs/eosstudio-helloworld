import { Api, JsonRpc } from 'eosjs'
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig'

class EosjsClient {
  constructor (privateKey, endpoint) {
    this.privateKey = privateKey
    this.endpoint = endpoint || 'https://jovial-poitras.api.dfuse.dev'
  }

  set privateKey(value) {
    if (!value) {
      return
    }
    try {
      this.signatureProvider = new JsSignatureProvider([value])
      this._updateApi()
    } catch (error) {
      // console.log(error);
    }
  }

  set endpoint(value) {
    if (!value) {
      return
    }
    this.rpc = new JsonRpc(value)
    this._updateApi()
  }

  _updateApi() {
    if (!this.rpc || !this.signatureProvider) {
      this.api = undefined
      return
    }
    this.api = new Api({
      rpc: this.rpc,
      signatureProvider: this.signatureProvider,
    });
  }

  transact(...args) {
    if (!this.api) {
      throw new Error('Private key or Endpoint is not set properly.')
    }
    return this.api.transact(...args)
  }

  getTableRows(...args) {
    if (!this.rpc) {
      return new Error('Endpoint not set.')
    }
    return this.rpc.get_table_rows(...args)
  }

  isPrivateKeyValid(value) {
    try {
      new JsSignatureProvider([value])
      return true
    } catch (error) {
      return false
    }
  }
}

export default EosjsClient
