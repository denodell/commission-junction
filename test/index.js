import { describe, beforeEach } from 'ava-spec'
import sinon from 'sinon'
import fetchLib from '../dist/utils/fetch'
import CommissionJunction from '../'
import fs from 'fs'

describe(`Commission Junction`, it => {
	let CJ

	beforeEach(() => {
		CJ = new CommissionJunction({
			websiteId: '123456',
			developerKey: '987654',
		})
	})

	it('Joined Merchants', async expect => {
		let xmlData = fs.readFileSync('./mock-data/merchants.xml', 'utf-8')
		sinon.stub(fetchLib, 'fetchXml').returns(Promise.resolve(xmlData))

		let joinedMerchants = await CJ.getAdvertisers({ joined: true })
		expect.true(joinedMerchants.length > 0)
		expect.deepEqual(joinedMerchants[0], {
			advertiserId: '1515487',
			accountStatus: 'Active',
			sevenDayEpc: '15.92',
			threeMonthEpc: '19.76',
			language: 'en',
			advertiserName: 'hothair',
			programUrl: 'http://www.hothair.co.uk',
			relationshipStatus: 'joined',
			mobileTrackingCertified: true,
			networkRank: '1',
			primaryCategory: {
				parent: 'Clothing/Apparel',
				child: 'Women\'s',
			},
			performanceIncentives: false,
			actions: [{
				name: 'Hotair Online Sale',
				type: 'sale',
				id: '302695',
				commission: {
					default: {
						value: '10.00%',
					},
				},
			}, {
				name: 'Naturalimagewigs Online Sale',
				type: 'sale',
				id: '333193',
				commission: {
					default: {
						value: '10.00%',
					},
				},
			}],
			linkTypes: [
				'Text Link',
				'Banner',
				'OtherDeepLink',
				'DeepLink',
				'AutoMoneyDeepLink',
			],
		})

		fetchLib.fetchXml.restore()
	})

	it(`Links`, async expect => {
		let xmlData1 = fs.readFileSync('./mock-data/links-1.xml', 'utf-8')
		let xmlData2 = fs.readFileSync('./mock-data/links-2.xml', 'utf-8')
		let xmlData3 = fs.readFileSync('./mock-data/links-3.xml', 'utf-8')
		let xmlData4 = fs.readFileSync('./mock-data/links-4.xml', 'utf-8')
		let xmlData5 = fs.readFileSync('./mock-data/links-5.xml', 'utf-8')
		let xmlData6 = fs.readFileSync('./mock-data/links-6.xml', 'utf-8')
		let xmlData7 = fs.readFileSync('./mock-data/links-7.xml', 'utf-8')
		let xmlData8 = fs.readFileSync('./mock-data/links-8.xml', 'utf-8')
		let xmlData9 = fs.readFileSync('./mock-data/links-9.xml', 'utf-8')
		let xmlData10 = fs.readFileSync('./mock-data/links-10.xml', 'utf-8')
		let xmlData11 = fs.readFileSync('./mock-data/links-11.xml', 'utf-8')
		let xmlData12 = fs.readFileSync('./mock-data/links-12.xml', 'utf-8')
		let xmlData13 = fs.readFileSync('./mock-data/links-13.xml', 'utf-8')
		let xmlData14 = fs.readFileSync('./mock-data/links-14.xml', 'utf-8')
		let xmlData15 = fs.readFileSync('./mock-data/links-15.xml', 'utf-8')

		let fetchXml = sinon.stub(fetchLib, 'fetchXml')
		fetchXml.withArgs(sinon.match(url => /page\-number\=1$/.test(url))).returns(Promise.resolve(xmlData1))
		fetchXml.withArgs(sinon.match(url => /page\-number\=2$/.test(url))).returns(Promise.resolve(xmlData2))
		fetchXml.withArgs(sinon.match(url => /page\-number\=3$/.test(url))).returns(Promise.resolve(xmlData3))
		fetchXml.withArgs(sinon.match(url => /page\-number\=4$/.test(url))).returns(Promise.resolve(xmlData4))
		fetchXml.withArgs(sinon.match(url => /page\-number\=5$/.test(url))).returns(Promise.resolve(xmlData5))
		fetchXml.withArgs(sinon.match(url => /page\-number\=6$/.test(url))).returns(Promise.resolve(xmlData6))
		fetchXml.withArgs(sinon.match(url => /page\-number\=7$/.test(url))).returns(Promise.resolve(xmlData7))
		fetchXml.withArgs(sinon.match(url => /page\-number\=8$/.test(url))).returns(Promise.resolve(xmlData8))
		fetchXml.withArgs(sinon.match(url => /page\-number\=9$/.test(url))).returns(Promise.resolve(xmlData9))
		fetchXml.withArgs(sinon.match(url => /page\-number\=10$/.test(url))).returns(Promise.resolve(xmlData10))
		fetchXml.withArgs(sinon.match(url => /page\-number\=11$/.test(url))).returns(Promise.resolve(xmlData11))
		fetchXml.withArgs(sinon.match(url => /page\-number\=12$/.test(url))).returns(Promise.resolve(xmlData12))
		fetchXml.withArgs(sinon.match(url => /page\-number\=13$/.test(url))).returns(Promise.resolve(xmlData13))
		fetchXml.withArgs(sinon.match(url => /page\-number\=14$/.test(url))).returns(Promise.resolve(xmlData14))
		fetchXml.withArgs(sinon.match(url => /page\-number\=15$/.test(url))).returns(Promise.resolve(xmlData15))

		let links = await CJ.getLinks()
		expect.true(links.length > 0)
		expect.deepEqual(links[0], {
			advertiserId: '4308809',
			advertiserName: 'Vax',
			category: 'home appliances',
			clickCommission: '0.0',
			creativeHeight: 40,
			creativeWidth: 150,
			language: 'en',
			leadCommission: '',
			linkCodeHtml: '<a href="http://www.jdoqocy.com/click-8047149-11838994-1414750050000"><img src="http://www.awltovhc.com/image-8047149-11838994-1414750050000" width="150" height="40" alt="" border="0"/></a>',
			linkCodeJavascript: '<form name="CJ11838994X1" method="POST" style="margin:0px;display:inline" action="http://www.dpbolvw.net/click"><input type="hidden" name="aid" value="11838994"/><input type="hidden" name="pid" value="8047149"/><input type="hidden" name="lastUpdatedDate" value="1414750050000"/><a href="javascript:CJ11838994X1.submit();"><img src="http://www.ftjcfx.com/image-8047149-11838994-1414750050000" width="150" height="40" alt="" border="0"/></a></form>',
			description: 'Vax - You\'re Home logo',
			destination: 'http://ad.doubleclick.net/clk;282413677;109249367;q?http://www.vax.co.uk',
			linkId: '11838994',
			linkName: '150x40 Vax Logo',
			linkType: 'Banner',
			performanceIncentive: 'true',
			promotionEndDate: '',
			promotionStartDate: '',
			promotionType: '',
			couponCode: '',
			relationshipStatus: 'joined',
			saleCommission: '3.00%',
			sevenDayEpc: '84.04',
			threeMonthEpc: '57.00',
			clickurl: 'http://www.jdoqocy.com/click-8047149-11838994-1414750050000',
		})

		fetchLib.fetchXml.restore()
	})

	it(`Transactions`, async expect => {
		let xmlData = fs.readFileSync('./mock-data/transactions.xml', 'utf-8')
		sinon.stub(fetchLib, 'fetchXml').returns(Promise.resolve(xmlData))

		let transactions = await CJ.getTransactions()
		expect.true(transactions.length > 0)
		expect.deepEqual(transactions[0], {
			actionStatus: 'new',
			actionType: 'lead',
			aid: '12345678',
			commissionId: '1234567890',
			country: '',
			eventDate: new Date("Sat May 08 2010 17:08:55 GMT+0200 (CEST)"),
			lockingDate: new Date("Thu Jun 10 2010 02:00:00 GMT+0200 (CEST)"),
			orderId: '123456',
			original: true,
			originalActionId: '1234567890',
			postingDate: new Date("Sat May 08 2010 19:01:22 GMT+0200 (CEST)"),
			websiteId: '1234567',
			cid: '1234567',
			advertiserName: 'Merchant',
			commissionAmount: 0,
			orderDiscount: 0,
			sid: 'unique-user-id',
			saleAmount: 0,
		})

		fetchLib.fetchXml.restore()
	})

	it(`Transaction Items`, async expect => {
		let xmlData = fs.readFileSync('./mock-data/transaction-items.xml', 'utf-8')
		sinon.stub(fetchLib, 'fetchXml').returns(Promise.resolve(xmlData))

		let transactionItems = await CJ.getTransactionItems({
			originalActionIds: ['1537520', '1537521'],
		})

		expect.true(transactionItems.length > 0)
		expect.is(transactionItems[0].originalActionId, '1537520')
		expect.deepEqual(transactionItems[0].items, [{
			sku: '2842154',
			quantity: 1,
			postingDate: new Date("Thu Dec 11 2014 02:32:09 GMT+0100 (CET)"),
			commissionId: '18775604',
			saleAmount: 10,
			discount: 0,
			publisherCommission: 0.8,
		}])

		fetchLib.fetchXml.restore()
	})
})
