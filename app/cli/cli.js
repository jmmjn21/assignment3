
const readline = require('readline')
const util = require('util')
const debug = util.debuglog('cli')
const events = require('events')

class _events extends events{}

let e = new _events()

const responders = require('./responders/main.js')

const cli = {}


//handlers
e.on('man', (str) =>{
  responders.help()
})

e.on('help', (str) =>{
  responders.help()
})

e.on('exit', (str) =>{
  responders.exit()
})

e.on('stats', (str) =>{
  responders.stats()
})

e.on('list users', (str) =>{
  responders.listUsers()
})

e.on('more user info', (str) =>{
  responders.moreUserInfo(str)
})

e.on('list checks', (str) =>{
  responders.listChecks(str)
})

e.on('more check info', (str) =>{
  responders.moreCheckInfo(str)
})

e.on('list logs', (str) =>{
  responders.listLogs()
})

e.on('more logs info', (str) =>{
  responders.moreLogInfo(str)
})


cli.processInput = function(str){
  str = typeof(str) === 'string' && str.trim().length > 0 ? str.trim() : false
  if(str){
    //codify the user isntruction
    let input = [
      'man',
      'help',
      'exit',
      'stats',
      'list users',
      'more user info',
      'list checks',
      'more check info',
      'list logs',
      'more logs info'
    ]

    let match = false
    let counter = 0
    input.some((input) =>{
      if(str.toLowerCase().indexOf(input) > -1){
        match = true
        //Emit an event
        e.emit(input, str)
        return true
      }
    })

    //if not match tell the user
    if(!match){
      console.log('The command doesnt exist')
    }
  }
}

cli.init = function(){
  console.log('The CLI is running')
  let _interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: ''
  })

  _interface.prompt()

  _interface.on('line', (str =>{
    cli.processInput(str)

    //Re initialize the prompt
    _interface.prompt()
  }))

  //if the user stop the cli
  _interface.on('close', () =>{
    process.exit(0)
  })
}


module.exports = cli