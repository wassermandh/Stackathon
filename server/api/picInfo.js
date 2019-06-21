const router = require('express').Router()
const {getLabels} = require('../metaDatafunctions')
var ExifImage = require('exif').ExifImage

module.exports = router

router.post('/', (req, res, next) => {
  try {
    const image = req.body[0].imagePath
    // const labels = await getLabels(req.files.path)
    // eslint-disable-next-line no-new
    new ExifImage({image}, function(error, exifData) {
      if (error) {
        next(error)
      }
      let response = {}
      response.make = exifData.image.Make
      response.model = exifData.image.Model
      response.DateTimeOriginal = exifData.exif.DateTimeOriginal
      response.lensModel = exifData.exif.LensModel
      response.gps = exifData.gps
      res.send(response) // Do something with your data!
    })
  } catch (error) {
    next(error)
  }
})
