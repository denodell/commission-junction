import { requestMerchants, requestLinks } from './utils'
//import dateFormat from 'dateformat'

const defaultOptions = {
  developerKey: '',
  websiteId: '',
}

export default class CommissionJunction {
  constructor(options) {
    this.options = Object.assign({}, defaultOptions, options)
  }

  getJoinedMerchants() {
    return new Promise((resolve, reject) => {
      requestMerchants({
        joined: true,
        developerKey: this.options.developerKey,
      }).then(resolve).catch(reject)
    })
  }

  getNotJoinedMerchants() {
    return new Promise((resolve, reject) => {
      requestMerchants({
        joined: false,
        developerKey: this.options.developerKey,
      }).then(resolve).catch(reject)
    })
  }

  getAllMerchants() {
    return Promise.all([
      this.getJoinedMerchants(),
      this.getNotJoinedMerchants(),
    ])
    .then(resolvedPromises => resolvedPromises.reduce((previous, current) => previous.concat(current), []))
  }

  // TODO
  getLinks({ joined = true }) {
    return new Promise((resolve, reject) => {
      requestLinks({
        joined,
        websiteId: this.options.websiteId,
        developerKey: this.options.developerKey,
      }).then(resolve).catch(reject)
    })
  }

  // TODO
  getVoucherCodes() {

  }

  // TODO
  getTransactions() {

  }

  // TODO
  getTransactionsSince(dateTime) {

  }

  // TODO
  getProducts() {

  }

  // TODO
  getProductsByMerchantID(merchantId) {

  }

  // TODO
  searchProducts(searchTerm) {

  }

  // TODO
  searchProductsByMerchantID(searchTerm, merchantId) {

  }
}
