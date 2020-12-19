const path = require('path')
const express = require('express')
const router = express.Router()

const home = require(path.join(__dirname, 'home'))

router.get(['/', '/t/:page'], home)

module.exports = router