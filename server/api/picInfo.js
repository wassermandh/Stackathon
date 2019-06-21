const router = require('express').Router()
const {getLabels} = require('../metaDatafunctions')
var ExifImage = require('exif').ExifImage

module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const labels = await getLabels(req.body.image)
    // eslint-disable-next-line no-new
    new ExifImage({image: req.body.image}, function(error, exifData) {
      if (error) {
        next(error)
      }
      let response = {}
      response.make = exifData.image.Make
      response.model = exifData.image.Model
      response.DateTimeOriginal = exifData.exif.DateTimeOriginal
      response.lensModel = exifData.exif.LensModel
      response.gps = exifData.gps
      response.labels = labels
      res.send(response) // Do something with your data!
    })
  } catch (error) {
    next(error)
  }
})
