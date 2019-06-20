const router = require('express').Router()
const vision = require('@google-cloud/vision')

const exif = require('exif-parser')
const fs = require('fs')

const buffer = fs.readFileSync(
  '/Users/danielwasserman/Desktop/Yulong-River-3274s.jpg'
)
const parser = exif.create(buffer)
const result = parser.parse()

console.log(JSON.stringify(result, null, 2))

module.exports = router

// Imports the Google Cloud client library

// Creates a client
const client = new vision.ImageAnnotatorClient({
  keyFilename: 'server/api/APIKey.json'
})
// const fileName = 'Local image file, e.g. /path/to/image.png';

client
  .labelDetection(
    '/Users/danielwasserman/Desktop/58275490370__5E637EA4-FF51-4140-A145-BBCD1BE0C99A.JPG'
  )
  .then(results => {
    const labels = results[0].labelAnnotations

    console.log('Labels:')
    labels.forEach(label => console.log(label))
  })
  .catch(err => {
    console.error('ERROR:', err)
  })
