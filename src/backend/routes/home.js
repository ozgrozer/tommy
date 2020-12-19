const path = require('path')
const defaults = require(path.join(__dirname, '..', 'defaults'))

const home = (req, res) => {
  res.render('app', {
    defaults: {
      appName: defaults.appName
    }
  })
}

module.exports = home
