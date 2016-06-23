import { requestData } from './network'
import { normalizeMerchantData, normalizeLinkData } from './process-data'

const recordsPerPage = 100
const startPageNumber = 1
const url = {
  products: `https://product-search.api.cj.com/v2/product-search`,

	// TODO: add ability to filter to URL
  merchants: (joined) => `https://advertiser-lookup.api.cj.com/v3/advertiser-lookup?advertiser-ids=${joined ? 'joined': 'notjoined'}&records-per-page=${recordsPerPage}&page-number=${startPageNumber}`,
  transactions: `https://commission-detail.api.cj.com/v3/commissions?date-type=event`,

	// TODO: add ability to filter to URL
  links: (websiteId, joined) => `https://link-search.api.cj.com/v3/link-search?website-id=${websiteId}&advertiser-ids=${joined ? 'joined': 'notjoined'}&records-per-page=${recordsPerPage}&page-number=${startPageNumber}`,
}

export function requestMerchants({ developerKey, joined }) {
	return new Promise(async function(resolve, reject) {
		try {
			let merchants = await requestData(url.merchants(joined), developerKey, 'advertisers', 'advertiser')
			resolve(normalizeMerchantData(merchants))
		} catch (err) {
			reject(err)
		}
	})
}

export function requestLinks({ developerKey, websiteId, joined }) {
	return new Promise(async function(resolve, reject) {
		try {
			let links = await requestData(url.links(websiteId, joined), developerKey, 'links', 'link')
			resolve(normalizeLinkData(links))
		} catch (err) {
			reject(err)
		}
	})
}
