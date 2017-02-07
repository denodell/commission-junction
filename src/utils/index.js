import { requestData } from './network'
import { normalizeAdvertiserData, normalizeLinkData, normalizeTransactionData, normalizeTransactionItemData } from './process-data'

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

export function requestLinks({ developerKey, websiteId, joined, vouchersOnly = false }) {
	let url = (websiteId, joined) => `https://link-search.api.cj.com/v3/link-search?website-id=${websiteId}&advertiser-ids=${joined ? 'joined': 'notjoined'}&records-per-page=${recordsPerPage}&page-number=${startPageNumber}`

	return new Promise(async function(resolve, reject) {
		try {
			let links = await requestData(url(websiteId, joined), developerKey, 'links', 'link')
			const output = normalizeLinkData(links)
			resolve(vouchersOnly ? output.filter(link => !!link.couponCode) : output)
		} catch (err) {
			reject(err)
		}
	})
}

export async function requestTransactions({
	developerKey,
	websiteId,
	startDate = new Date(Date.now() - (365 * 1000 * 60 * 60 * 24)), // 365 days ago
	endDate = new Date(),	// now
}) {
	const dateRangeInDays = (endDate - startDate ) / (1000 * 60 * 60 * 24)
	const numberOf30DayRanges = Math.ceil(dateRangeInDays / 30)
	let index = 0
	let promises = []

	for (; index < numberOf30DayRanges; index = index + 1) {
		const startDateToUse = new Date(startDate.getTime() + (index * (30 * 1000 * 60 * 60 * 24)))
		let endDateToUse = new Date(startDate.getTime() + ((index + 1) * (30 * 1000 * 60 * 60 * 24)))
		if (endDateToUse > endDate) {
			endDateToUse = endDate
		}
		const startDateISO = startDateToUse.toISOString().split('T')[0]
		const endDateISO = endDateToUse.toISOString().split('T')[0]

		const url = `https://commission-detail.api.cj.com/v3/commissions?date-type=event&website-ids=${websiteId}&start-date=${startDateISO}&end-date=${endDateISO}`
		promises.push(requestData(url, developerKey, 'commissions', 'commission'))
	}

	const resultsData = await Promise.all(promises)
	return resultsData.map(result => normalizeTransactionData(result)).reduce((prev, curr) => prev.concat(curr), [])
}

export function requestTransactionItems({ developerKey, websiteId, originalActionIds = [] }) {
	let url = `https://commission-detail.api.cj.com/v3/item-detail/${originalActionIds.join(',')}`

	if (originalActionIds.length === 0) {
		return Promise.resolve([])
	}

	return new Promise(async function(resolve, reject) {
		try {
			let transactionItems = await requestData(url, developerKey, 'itemDetails')
			resolve(normalizeTransactionItemData(transactionItems))
		} catch (err) {
			reject(err)
		}
	})
}

export function requestProducts({ developerKey, joined }) {
	let url = `https://product-search.api.cj.com/v2/product-search`
}
