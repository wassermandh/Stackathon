const vision = require('@google-cloud/vision')

// function getMetaData(image) {

// }

async function getLabels(image) {
  let labelDescriptions = []
  // Imports the Google Cloud client library
  const client = new vision.ImageAnnotatorClient({
    keyFilename:
      '/Users/danielwasserman/Documents/FSA/Workshops/Senior_Phase/Stackathon/server/api/APIKey.json'
  })

  // Performs label detection on the image file
  const [result] = await client.labelDetection(image)
  const labels = result.labelAnnotations
  console.log('Labels:')
  labels.forEach(label => labelDescriptions.push(label.description))
  return labelDescriptions
}

module.exports = {getLabels}
