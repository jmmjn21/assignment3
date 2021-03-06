
//Services
const main = require('../controllers/main.js')
const users = require('../controllers/users.js')
const tokens = require('../controllers/tokens.js')
const menus = require('../controllers/menus.js')
const orders = require('../controllers/orders.js')


const routers = {
  'api/hello': main.hello,
  'notFound': main.notFound,
  //Services
  'api/users': users.users,
  'api/tokens': tokens.tokens,
  'api/menus': menus.menus,
  'api/orders': orders.orders
}

module.exports = routers
