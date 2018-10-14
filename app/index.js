
const myServer = require('./server.js')
const cli = require('./cli.js')

let app = {}

app.init = function(){
  myServer.init()

  setTimeout(() =>{
    cli.init()
  }, 50)
}


app.init()

module.exports = app
