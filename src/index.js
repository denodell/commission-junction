import 'babel-polyfill'
import 'source-map-support/register'
import { requestAdvertisers, requestLinks, requestProducts, requestTransactions, requestTransactionItems } from './utils'
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
      return requestAdvertisers({
        joined,
        advertiserIds,
        developerKey: this.options.developerKey,
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
    return requestLinks({
      joined,
      websiteId: this.options.websiteId,
      developerKey: this.options.developerKey,
    })
  }

  getTransactions() {
    return requestTransactions({
      websiteId: this.options.websiteId,
      developerKey: this.options.developerKey,
    })
  }

  getTransactionItems({
    originalActionIds = [],
  } = {}) {
    return requestTransactionItems({
      websiteId: this.options.websiteId,
      developerKey: this.options.developerKey,
      originalActionIds,
    })
  }

  // TODO
  getProducts() {

  }

  // TODO
  searchProducts() {

  }
}
