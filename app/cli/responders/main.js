

const helper = require('../helpers/utils.js')
const os = require('os')
const v8 = require('v8')

//responders
const responders = {}

responders.help = function(){
  const commands = {
    'man': 'Show help page',
    'help': 'Alias of the man command',
    'exit': 'Kill the clie and the rest of the application',
    'stats': 'Get stadistics',
    'list users': 'Show a list all the register and deleted user on the system',
    'more user info --{userId}': 'Show the user detail',
    'list checks --up --down': 'Show the checks of the system',
    'more check info --{checkId}': 'Show the details of the speceific check',
    'list logs': 'Show all the logs',
    'more logs info --{fileName}': 'Show details of the speceified logs file name'
  }
  //Show a hedaer for the help page
  helper.horizontalLine()
  helper.centered('CLI MANUAL')
  helper.horizontalLine()
  helper.verticalSpace(2)

  //Show each command followed by the explanation
  for(var key in commands){
    if(commands.hasOwnProperty(key)){
      let value = commands[key]
      let line = '\x1b[33m'+key+'\x1b[0m'
      let padding = 60 - line.length
      for(var i = 0; i < padding; i++){
        line+=' '
      }
      line+=value
      console.log(line)
      helper.verticalSpace()
    }
  }

  helper.verticalSpace(1)
  helper.horizontalLine()
}

responders.exit = function(){
  process.exit(0)
}

responders.stats = function(){
  let stats = {
    'Load average': os.loadavg().join(' '),
    'CPU Count': os.cpus().length,
    'Free Memory': os.freemem(),
    'Current Malloced Memory': v8.getHeapStatistics().malloced_memory,
    'Peak Malloced Memory': v8.getHeapStatistics().peak_malloced_memory,
    'Allocated Heap Used (%)': Math.round((v8.getHeapStatistics().used_heap_size / v8.getHeapStatistics().total_heap_size) * 100),
    'Avaliable heap Allocated (%)': Math.round((v8.getHeapStatistics().total_heap_size / v8.getHeapStatistics().heap_size_limit) * 100),
    'Uptime': os.uptime() + ' Seconds'
  }

  //Show a hedaer for the stats page
  helper.horizontalLine()
  helper.centered('SYSTEM STATISTICS')
  helper.horizontalLine()
  helper.verticalSpace(2)

  for(var key in stats){
    if(stats.hasOwnProperty(key)){
      let value = stats[key]
      let line = '\x1b[33m'+key+'\x1b[0m'
      let padding = 60 - line.length
      for(var i = 0; i < padding; i++){
        line+=' '
      }
      line+=value
      console.log(line)
      helper.verticalSpace()
    }
  }

}

responders.listUsers = function(){
  console.log('You asked for list Users')
}

responders.moreUserInfo = function(str){
  console.log('You asked for user '+str)
}

responders.listChecks = function(str){
  console.log('You asked for list checks '+str)
}
responders.moreCheckInfo = function(str){
  console.log('You asked for more check info '+str)
}

responders.listLogs = function(){
  console.log('You asked for list logs')
}

responders.moreLogInfo = function(str){
  console.log('You asked for more logs info '+str)
}


module.exports = responders
