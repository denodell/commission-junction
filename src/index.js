import { requestAdvertisers, requestLinks, requestProducts, requestTransactions } from './utils'
//import dateFormat from 'dateformat'

const defaultOptions = {
  developerKey: '',
  websiteId: '',
}

export default class CommissionJunction {
  constructor(options) {
    this.options = Object.assign({}, defaultOptions, options)
  }

  getAdvertisers({
    joined = undefined,
    advertiserIds = [],
    advertiserName,
    keywords,
    mobileTrackingCertified,
  } = {}) {
    if (typeof joined !== 'undefined' || advertiserIds.length > 0) {
      return new Promise((resolve, reject) => {
        requestAdvertisers({
          joined,
          advertiserIds,
          developerKey: this.options.developerKey,
        }).then(resolve).catch(reject)
      })
    } else {
      return Promise.all([
        this.getAdvertisers({ joined: true }),
        this.getAdvertisers({ joined: false }),
      ])
      .then(resolvedPromises => resolvedPromises.reduce((previous, current) => previous.concat(current), []))
    }
  }

  // TODO
  getLinks({
    joined = true,
  } = {}) {
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
  getProducts() {

  }

  // TODO
  searchProducts() {

  }
}
