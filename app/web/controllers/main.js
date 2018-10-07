
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

handlers.favicon = function(reqObj, callback){
  const allowedMethod = ['get']
  if(allowedMethod.indexOf(reqObj.method) >= 0){
    utils.getStaticAsset('favicon.ico', (err, data) =>{
      if(!err){
        callback(200, data, 'favicon')
      }
      else{
        callback(500)
      }
    })
  }
  else{
    callback(405, undefined, 'html')
  }
}


handlers.public = function(reqObj, callback){
  const allowedMethod = ['get']
  if(allowedMethod.indexOf(reqObj.method) >= 0){
    let trimmedAssetName = reqObj.path.replace('public/', '').trim()
    if(trimmedAssetName.length > 0){
      utils.getStaticAsset(trimmedAssetName, (err, data) =>{
        if(!err){
          let contentType = 'plain'
          if(trimmedAssetName.indexOf('.css') >= 0){
            contentType = 'css'
          }
          if(trimmedAssetName.indexOf('..png') >= 0){
            contentType = 'png'
          }
          if(trimmedAssetName.indexOf('..jpg') >= 0){
            contentType = 'jpg'
          }
          if(trimmedAssetName.indexOf('.css') >= 0){
            contentType = 'css'
          }
          if(trimmedAssetName.indexOf('.ico') >= 0){
            contentType = 'favicon'
          }
          callback(200, data, contentType)
        }
        else{
          callback(404)
        }
      })
    }
    else{
      callback(404)
    }
  }
  else{
    callback(405, undefined, 'html')
  }
}


module.exports = handlers
