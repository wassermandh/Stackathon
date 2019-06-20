const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/picInfo', require('./picInfo'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
