import { describe, beforeEach } from 'ava-spec'
import CommissionJunction from '../'

describe(`Commission Junction`, it => {
	let CJ

	beforeEach(() => {
		CJ = new CommissionJunction({
	    websiteId: '8047149',
	    developerKey: '0096faf5a7b2dc8b54316bebf1004320f3b4f895b4488616e546be299e4b7274485847f773ddbb0ea8cc64b1c9c6e9294ab57698f0dc05a272b82efbce9a3e6b09/6b5696499886e56381136a15d80ae1a581f6ed6fd3d3c8f94e372a1d892420f8a15efb2d1270ab2077c2fba582a92e7c742c74e900a2f253c733c81158911d45',
	  })
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
		expect.true(true)
	  let links = await CJ.getLinks()
	  console.log(links.length)
	})
})
