import fetch from 'isomorphic-fetch'
import _ from 'lodash'
import { parseString as parseXML } from 'xml2js'

function xmlToJSON(xml) {
  return new Promise((resolve, reject) => {
    parseXML(xml, {
      trim: true,
      normalizeTags: true,
      normalize: true,
      explicitRoot: false,
      tagNameProcessors: [name => _.camelCase(name)],
    }, (err, json) => {
      if (err) {
        reject(err)
        return
      }

      resolve(json)
    })
  })
}

export function fetchXmlAsJson(url, headers) {
  return new Promise((resolve, reject) => {
    return fetch(url, { headers })
      .then(response => {
        if (!response.ok) {
          reject(response.statusText)
          return
        }
        return response
      })
      .then(response => response.text())
      .then(xmlToJSON)
      .then(data => resolve(data))
      .catch(reject)
  })
}

export async function fetchJson(url, headers) {
  let response = await fetch(url, { headers })
  return await response.json()
}
