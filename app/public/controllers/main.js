
const utils = require('../../helpers/utils.js')
const handlers = {}

handlers.index = function(reqObj, callback){
  const allowedMethod = ['get']
  if(allowedMethod.indexOf(reqObj.method) >= 0){
    utils.getTemplate('index', (err, str) =>{
      if(!err && str){
        callback(200, str, 'html')
      }
      else{
        callback(400, undefined, 'html')
      }
    })
  }
  else{
    callback(405, undefined, 'html')
  }
}


module.exports = handlers
