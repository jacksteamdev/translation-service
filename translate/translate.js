// const fs = require('fs')
const googleTranslateApi = require('./../gta-hack/google-translation-api.js')

let translateParagraph = paragraph => {
  return googleTranslateApi(paragraph, {to: 'es'}).then(res => {
    return res.text.replace(/(\d:)\s\s?(\d)/g, '$1$2')
                   .replace(/\u2014/g, '\u2013')
                   .replace(/\bya\b/g, 'y a')
  }).catch((err) => {
    console.log(`There was a problem with this paragraph:`)
    console.log(`"${paragraph}"`)
    throw err
  })
}

let validString = string => {
  return typeof string === 'string' && string !== ''
}

let cleanString = string => {
  return string.replace(/yy|hh/g, '').trim()
}

let translate = (paragraphs) => {
  if (paragraphs.constructor !== Array) {
    return Promise.reject('Data is not an array')
  }

  let transformed = paragraphs.filter(validString)
                              .map(cleanString)
                              .map(translateParagraph)

  return Promise.all(transformed)
                .catch((err) => {
                  err.message = `"${err.code}" from google-translate-api`
                  throw err
                })
}

module.exports = {translate}
