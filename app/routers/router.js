
//Services
const main = require('../api/controllers/main.js')
const users = require('../api/controllers/users.js')
const tokens = require('../api/controllers/tokens.js')
const menus = require('../api/controllers/menus.js')
const orders = require('../api/controllers/orders.js')


const routers = {
  'hello': main.hello,
  'notFound': main.notFound,
  //Services
  'users': users.users,
  'tokens': tokens.tokens,
  'menus': menus.menus,
  'orders': orders.orders
}

module.exports = routers
