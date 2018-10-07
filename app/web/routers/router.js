
const main = require('../controllers/main.js')


const routers = {
  '': main.index,
  'public': main.public,
  'favicon.ico': main.favicon
}

module.exports = routers
