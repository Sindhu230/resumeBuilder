const express = require('express')
const user = require('../controllers/UserController')
const router = express.Router()
const resume = require('../controllers/ResumeController')
const { authMiddleware } = require('../controllers/UserController')
const { authMiddlewareR } = require('../controllers/ResumeController')

router.post('/register', user.register)

router.patch('/update', user.update)

router.post('/login', user.login)

router.get('/profile', authMiddleware, function (req, res) {
  res.json({ 'access': true })
})

module.exports = router
