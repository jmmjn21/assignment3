

//responders
const responders = {}

responders.help = function(){
  console.log('You asked for help')
}

responders.exit = function(){
  console.log('You asked for exit')
}

responders.stats = function(){
  console.log('You asked for stats')
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
