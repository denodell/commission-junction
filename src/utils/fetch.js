import fetch from 'isomorphic-fetch'
import _ from 'lodash'
import { parseString as parseXML } from 'xml2js'
import fs from 'fs'

let exported = {}

function xmlToJSON(xml) {
  return new Promise((resolve, reject) => {
    parseXML(xml, {
      trim: true,
      normalizeTags: true,
      normalize: true,
      explicitRoot: false,
      tagNameProcessors: [name => _.camelCase(name)],
      attrNameProcessors: [name => _.camelCase(name)],
    }, (err, json) => {
      if (err) {
        reject(err)
        return
      }

      resolve(json)
    })
  })
}

function fetchXml(url, headers) {
  return fetch(url, { headers })
    .then(response => {
      if (!response.ok) {
        throw response.statusText
      }
      return response
    })
    .then(response => response.text())
}

function fetchXmlAsJson(url, headers) {
  return new Promise((resolve, reject) => {
    return exported.fetchXml(url, headers)
      .then(xmlToJSON)
      .then(data => resolve(data))
      .catch(reject)
  })
}

function fetchJson(url, headers) {
  return fetch(url, {headers})
    .then(response => {
      if (!response.ok) {
        throw response.statusText
        return
      }
      return response
    })
    .then(response => response.json())
}

module.exports = exported = {
  fetchXml,
  fetchXmlAsJson,
  fetchJson,
}
