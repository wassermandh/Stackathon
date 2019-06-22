const router = require('express').Router()
const {getLabels} = require('../metaDatafunctions')
var ExifImage = require('exif').ExifImage
const cloudinary = require('cloudinary')
const axios = require('axios')

module.exports = router

router.post('/picInfo', (req, res, next) => {
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

router.post('/uploadPic', (req, res, next) => {
  try {
    const values = Object.values(req.files)
    const promises = values.map(image => cloudinary.uploader.upload(image.path))
    Promise.all(promises).then(results => {
      results[0].imagePath = values[0].path
      res.json(results)
    })
  } catch (err) {
    next(err)
  }
})
