const router = require('express').Router()
const {User, Picture} = require('../db/models/index')
const {getLabels} = require('../metaDatafunctions')
var ExifImage = require('exif').ExifImage
const cloudinary = require('cloudinary')
const axios = require('axios')
const env = require('../../secrets')

module.exports = router

router.post('/picInfo', (req, res, next) => {
  try {
    const image = req.body[0].imagePath
    const type = image.slice(image.length - 3).toLowerCase()
    console.log(type)
    if (type !== 'jpg') {
      res.send({})
    } else {
      ExifImage({image}, function(error, exifData) {
        if (error) {
          next(error)
        }
        let response = {}
        if (!exifData) {
          res.send({})
        } else {
          response.make = exifData.image.Make
          response.model = exifData.image.Model
          response.DateTimeOriginal = exifData.exif.DateTimeOriginal
          response.lensModel = exifData.exif.LensModel
          response.gps = exifData.gps
          res.send(response) // Do something with your data!
        }
      })
    }
    // const labels = await getLabels(req.files.path)
    // eslint-disable-next-line no-new
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
    const {DateTimeOriginal, gps, make, model, url} = req.body.allImageInfo
    let latitude = null
    let longitude = null
    let address = null
    let GPSLatitude = null
    let GPSLatitudeRef = null
    let GPSLongitude = null
    let GPSLongitudeRef = null
    console.log(gps)
    if (gps) {
      GPSLatitude = gps.GPSLatitude
      GPSLatitudeRef = gps.GPSLatitudeRef
      GPSLongitude = gps.GPSLongitudeRef
      GPSLongitudeRef = gps.GPSLongitudeRef
    }

    if (GPSLatitude && GPSLongitude) {
      latitude = 0
      latitude =
        Number(GPSLatitude[0]) +
        Number(GPSLatitude[1] / 60) +
        Number(GPSLatitude[2] / 3600)
      if (GPSLatitudeRef === 'N') {
        latitude = 0 + latitude
      } else {
        latitude = 0 - latitude
      }
      longitude = 0
      longitude =
        Number(GPSLongitude[0]) +
        Number(GPSLongitude[1] / 60) +
        Number(GPSLongitude[2] / 3600)
      if (GPSLongitudeRef === 'E') {
        longitude = 0 + longitude
      } else {
        longitude = 0 - longitude
      }
      const locationData = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${Number(
          longitude
        )},${Number(latitude)}.json?access_token=${process.env.MAP_BOX_TOKEN}`
      )
      address = locationData.data.features[0].place_name
    }
    const newPic = await Picture.create({
      time: DateTimeOriginal,
      location: address,
      latDir: GPSLatitudeRef,
      latCoo: latitude,
      longDir: GPSLongitudeRef,
      longCoo: longitude,
      brand: make,
      model,
      url
    })
    const user = await User.findOne({
      where: {
        id: req.body.id
      }
    })
    await user.addPicture(newPic)
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

router.put('/updatePic', async (req, res, next) => {
  try {
    const pic = await Picture.findByPk(req.body.id)
    const {title, location, caption} = req.body
    if (title) {
      await pic.update({title: title})
    }
    if (location) {
      let newLoc = ''
      for (let i = 0; i < location.length; i++) {
        if (location[i] === ' ' || location[i] === ',') {
          newLoc += '%20'
        } else {
          newLoc += location[i]
        }
      }
      const {data} = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${newLoc}.json?access_token=${
          env.MAP_BOX_TOKEN
        }`
      )
      const long = data.features[0].center[0]
      const lat = data.features[0].center[1]
      await pic.update({location: location, latCoo: lat, longCoo: long})
    }
    if (caption) {
      await pic.update({caption: caption})
    }
    res.send(pic)
  } catch (err) {
    next(err)
  }
})

router.get('/:id/getMyPics', async (req, res, next) => {
  try {
    const pics = await Picture.findAll({
      where: {
        userId: req.params.id
      }
    })
    res.send(pics)
  } catch (err) {
    next(err)
  }
})
