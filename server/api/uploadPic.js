const router = require('express').Router()
module.exports = router
const cloudinary = require('cloudinary')
const axios = require('axios')

router.post('/', (req, res, next) => {
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
