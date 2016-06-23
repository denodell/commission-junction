export function normalizeAdvertiserData(merchants) {
  let pluralArrayValueFields = ['actions', 'linkTypes']
  let pluralActionArrayValueFields = ['commission']

  return merchants.map(merchant => {
    let out = {}

    for (let dataItem in merchant) {
      if (merchant.hasOwnProperty(dataItem)) {
        out[dataItem] = pluralArrayValueFields.includes(dataItem) ? merchant[dataItem][0][dataItem.replace(/s$/, '')] : merchant[dataItem][0]
      }
    }

		out.primaryCategory = {
			parent: out.primaryCategory.parent[0],
			child: out.primaryCategory.child[0],
		}

    out.actions = out.actions.map(action => {
			let commission = action.commission[0]
			let defaultCommission = commission.default[0]

			if (defaultCommission._) {
				commission.default = {
					value: defaultCommission._,
					type: defaultCommission.$.type,
				}
			} else {
				commission.default = {
					value: defaultCommission
				}
			}

			if (commission.itemlist) {
				commission.itemlist = commission.itemlist.map(item => ({
					value: item._,
					name: item.$.name,
					id: item.$.id,
				}))
			}

			return {
	      name: action.name[0],
	      type: action.type[0],
	      id: action.id[0],
	      commission,
			}
		})

    return out
  })
}

export function normalizeLinkData(links) {
	return links.map(link => {
    let out = {}
    for (let linkItem in link) {
      if (link.hasOwnProperty(linkItem)) {
        out[linkItem] = link[linkItem][0]
      }
    }
    return out
  })
}
