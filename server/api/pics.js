const router = require('express').Router()
const {User, Picture} = require('../db/models/index')
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

router.post('/storePic', async (req, res, next) => {
  try {
    const {DateTimeOriginal, gps, make, model, url} = req.body
    let latitude = 0
    let longitude = 0
    const {GPSLatitude, GPSLatitudeRef, GPSLongitude, GPSLongitudeRef} = gps
    if (GPSLatitude && GPSLongitude) {
      latitude =
        Number(GPSLatitude[0]) +
        Number(GPSLatitude[1] / 60) +
        Number(GPSLatitude[2] / 3600)
      if (GPSLatitudeRef === 'N') {
        latitude = 0 + latitude
      } else {
        latitude = 0 - latitude
      }
      longitude =
        Number(GPSLongitude[0]) +
        Number(GPSLongitude[1] / 60) +
        Number(GPSLongitude[2] / 3600)
      if (GPSLongitudeRef === 'E') {
        longitude = 0 + longitude
      } else {
        longitude = 0 - longitude
      }
    }
    const newPic = await Picture.create({
      time: DateTimeOriginal,
      latDir: GPSLatitudeRef,
      latCoo: latitude,
      longDir: GPSLongitudeRef,
      longCoo: longitude,
      brand: make,
      model,
      url
    })
    res.send(newPic)
  } catch (err) {
    next(err)
  }
})

router.get('/getPics', async (req, res, next) => {
  try {
    const pics = await Picture.findAll()
    res.send(pics)
  } catch (err) {
    next(err)
  }
})

router.put('/deletePic', async (req, res, next) => {
  try {
    const pic = await Picture.findByPk(req.body.id)
    await pic.destroy()
    res.send('success!')
  } catch (err) {
    next(err)
  }
})
