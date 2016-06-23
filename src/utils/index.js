import { requestData } from './network'
import { normalizeAdvertiserData, normalizeLinkData } from './process-data'

const recordsPerPage = 100
const startPageNumber = 1

export function requestAdvertisers({ developerKey, joined }) {
  let url = (joined) => `https://advertiser-lookup.api.cj.com/v3/advertiser-lookup?advertiser-ids=${joined ? 'joined': 'notjoined'}&records-per-page=${recordsPerPage}&page-number=${startPageNumber}`

  return new Promise(async function(resolve, reject) {
    try {
      let advertisers = await requestData(url(joined), developerKey, 'advertisers', 'advertiser')
      resolve(normalizeAdvertiserData(advertisers))
    } catch (err) {
      reject(err)
    }
  })
}

export function requestLinks({ developerKey, websiteId, joined }) {
  let url = (websiteId, joined) => `https://link-search.api.cj.com/v3/link-search?website-id=${websiteId}&advertiser-ids=${joined ? 'joined': 'notjoined'}&records-per-page=${recordsPerPage}&page-number=${startPageNumber}`

  return new Promise(async function(resolve, reject) {
    try {
      let links = await requestData(url(websiteId, joined), developerKey, 'links', 'link')
      resolve(normalizeLinkData(links))
    } catch (err) {
      reject(err)
    }
  })
}

export function requestProducts({ developerKey, joined }) {
  let url = `https://product-search.api.cj.com/v2/product-search`
}

export function requestTransactions({ developerKey }) {
  let url = `https://commission-detail.api.cj.com/v3/commissions?date-type=event`
}
