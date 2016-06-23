Commission Junction API Helper Methods
--------------------------------------

Contains utilities to simplify interaction with the Commission Junction Affiliate Marketing Network APIs. Provides support for the following data types:

 - Merchants
 - Links
 - Products
 - Transactions

## Install

```
npm i affiliate-networks --save
```

## Usage

```
var CJ = new AffiliateNetwork.CommissionJunction({
  websiteId: '123456'
})
```

### Merchants

Get merchants linked to the websiteId

```
CJ.getJoinedMerchants()
```

Get merchants not linked to the websiteId

```
CJ.getNotJoinedMerchants()
```

Get all merchants in the Commission Junction system

```
CJ.getAllMerchants()
```

All three services return an array of merchant objects like the following:

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
}]
```

### Links

Get links linked to the websiteId

```
CJ.getLinks()
```

### Voucher Codes

Get voucher codes linked to the websiteId

```
CJ.getLinks()
```

### Transactions

Get transactions linked to the websiteId

```
CJ.getTransactions()
```

Get transactions linked to the websiteId since a specific date/time

```
CJ.getTransactionsSince(dateTime)
```

### Products

Get products by merchants linked to the websiteId

```
CJ.getProducts()
```

Get products by a specific merchant

```
CJ.getProductsByMerchantID('78901')
```

Search products by merchants linked to the websiteId

```
CJ.searchProducts(searchTerm)
```

Search products by a specific merchant

```
CJ.searchProductsByMerchantID(searchTerm, '78901')
```
