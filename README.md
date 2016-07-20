Commission Junction API Helper Methods
--------------------------------------

_Warning: ALPHA release - unstable API and feature incomplete_

Contains utilities to simplify interaction with the Commission Junction Affiliate Marketing Network APIs.

Provides support for the following data types:

 - Merchants
 - Links
 - Products
 - Transactions

Bear in mind that some calls may take a little while to return if they contain a large data set. This is because we do multiple API calls to get all pages of data, which we then stitch together in the output for your benefit.

## Prerequisites

 - Node.js / NPM
 - Commission Junction Website ID
 - Commission Junction Web Service Developer Key

## Install

```
npm i commission-junction --save
```

## Usage

```
var CJ = new CommissionJunction({
  websiteId: '123456',
  developerKey: '987654'
})
```

### Advertisers

Get a list of all advertisers in the Commission Junction system

```
CJ.getAdvertisers()
```

Get a list of all advertisers linked to your Website ID

```
CJ.getAdvertisers({
  joined: true
})
```

Get a list of all advertisers not linked to your Website ID

```
CJ.getAdvertisers({
  joined: false
})
```

Get a list of specific advertisers by their unique IDs (CID)

```
CJ.getAdvertisers({
  advertiserIds: ['1826327', ...]
})
```

#### Advertiser Data Structure Output Example

```
[{
  "advertiserId": "1826327",
  "accountStatus": "Active",
  "sevenDayEpc": "15.49",
  "threeMonthEpc": "4.62",
  "language": "en",
  "advertiserName": "UK2NET web hosting",
  "programUrl": "http://www.uk2.net",
  "relationshipStatus": "joined",
  "mobileTrackingCertified": "true",
  "networkRank": "1",
  "primaryCategory": {
    "parent": "Online Services",
    "child": "Web Hosting/Servers"
  },
  "performanceIncentives": "true",
  "actions": [
    {
      "name": "Online Sale",
      "type": "advanced sale",
      "id": "309262",
      "commission": {
        "itemlist": [
          {
            "value": "3.00%",
            "name": "UK2 Domains",
            "id": "23565"
          }
        ],
        "default": {
          "value": "30.00%"
        }
      }
    }
  ],
  "linkTypes": [
    "Text Link",
    "Banner",
    "OtherDeepLink",
    "DeepLink",
    "Advanced Link",
    "AutoMoneyDeepLink"
  ]
}, {
  ...
}]
```

### Links

Get links & voucher codes linked to the websiteId

```
CJ.getLinks()
```

### Commssions

Get commission transactions linked to the websiteId

```
CJ.getTransactions()
```

Get commission item detail related to a specific commission transaction(s)

```
CJ.getTransactionItems({ originalActionIds: ['123456'] })
```

### Products - TODO

Get products by advertisers linked to the websiteId

```
CJ.getProducts()
```

Get products by a specific advertiser

```
CJ.getProductsByMerchantID('78901')
```

Search products by advertisers linked to the websiteId

```
CJ.searchProducts(searchTerm)
```

Search products by a specific advertiser

```
CJ.searchProductsByMerchantID(searchTerm, '78901')
```

## Test

```
npm test
```
