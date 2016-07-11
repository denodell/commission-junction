import { fetchXmlAsJson } from './fetch'
import _ from 'lodash'

function fetchDataPage(url, developerKey, pageNumber = 1) {
  url = url.replace(/page-number=(.)*$/g, `page-number=${pageNumber}`)
  return fetchXmlAsJson(url, { 'Authorization': `${developerKey}` })
}

export async function requestData(url, developerKey, rootNodeName, dataNodeName) {
  try {
    let outputData = []
    let totalMatched = 0
    let recordsReturned = 0
    let currentPageNumber = 1
    let totalPages = currentPageNumber
    let meta = {}
    let data = await fetchDataPage(url, developerKey)

    if (data.errorMessage) {
      throw data.errorMessage[0]
    }

    if (data[rootNodeName].length > 1) {
      outputData = outputData.concat(data[rootNodeName])
      outputData = outputData.map(data => {
        let out = Object.assign({}, data.$)
        delete data.$
        out = Object.assign({}, out, data)
        return out;
      })
      return Promise.resolve(outputData)
    } else {
      if (data[rootNodeName][0][dataNodeName]) {
        outputData = outputData.concat(data[rootNodeName][0][dataNodeName])
      }

      meta = data[rootNodeName][0].$
      totalMatched = +meta.totalMatched || totalMatched
      recordsReturned = +meta.recordsReturned || recordsReturned
      currentPageNumber = +meta.pageNumber || currentPageNumber
      totalPages = Math.ceil(totalMatched / recordsReturned) || totalPages

      if (!recordsReturned || currentPageNumber * recordsReturned >= totalMatched) {
        return Promise.resolve(outputData)
      } else {
        let dataPages = await Promise.all(_.range(2, totalPages + 1).map(pageNumber => fetchDataPage(url, developerKey, pageNumber)))
        dataPages.forEach(data => {
          if (data.errorMessage) {
            throw data.errorMessage[0]
          }

          outputData = outputData.concat(data[rootNodeName][0][dataNodeName])
        })
        return Promise.resolve(outputData)
      }
    }
  } catch (err) {
    throw new Error(err)
  }
}
