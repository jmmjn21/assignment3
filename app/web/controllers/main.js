
const utils = require('../helpers/utils.js')
const handlers = {}

handlers.index = function(reqObj, callback){
  const allowedMethod = ['get']
  if(allowedMethod.indexOf(reqObj.method) >= 0){

    let templateData = {
      'head.title': 'My title',
      'head.description': 'My description',
      'body.title': 'Hello body title',
      'body.class': 'index'
    }
    utils.getTemplate('index', templateData, (err, str) =>{
      if(!err && str){
        utils.addUniversaltemplate(str, templateData, (err, fullString) =>{
          if(!err){
            callback(200, fullString, 'html')
          }
          else{
            callback(400, undefined, 'html')
          }
        })
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
