import { describe, beforeEach } from 'ava-spec'
import CommissionJunction from '../'

describe(`Commission Junction`, it => {
	let CJ

	beforeEach(() => {
		CJ = new CommissionJunction({
			websiteId: '123456',
	    developerKey: '987654',
	  })
	})

	it('Joined Merchants', async expect => {
		let joinedMerchants = await CJ.getAdvertisers({ joined: true })
		expect.true(joinedMerchants.length > 0)

	})

	it.skip(`All advertisers = Joined advertisers + Not-joined advertisers`, expect => {
		return Promise.all([
			CJ.getAdvertisers({ joined: true }),
			CJ.getAdvertisers({ joined: false }),
			CJ.getAdvertisers()
		]).then((joinedAdvertisers, notJoinedAdvertisers, allAdvertisers) => {
			expect.true(allAdvertisers.length === joinedAdvertisers.length + notJoinedAdvertisers.length)
			expect.end()
		})
	})

	it(`Links`, async expect => {
	  let links = await CJ.getLinks()
		expect.true(links.length > 0)
	})
})
