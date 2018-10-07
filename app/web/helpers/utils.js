
const config = require('../config.js')
const path = require('path')
const fs = require('fs')



var getTemplate = function(templateName, data, callback){
  templateName = typeof(templateName) === 'string' && templateName.length > 0 ? templateName : false
  data = typeof(data) === 'object'  && data != null ? data : {}
  if(templateName){
    let templateDir = path.join(__dirname, '../templates/')
    fs.readFile(templateDir + templateName + '.html', 'utf-8', (err, str) =>{
      if(!err && str && str.length > 0){
        callback(false, interpolate(str, data))
      }
      else {
        callback(true, `Template ${templateName} is not found`)
      }
    })
  }
  else{
    callback(true, `Template ${templateName} is not a valid template`)
  }
}


var addUniversaltemplate = function(str, data, callback){
  str = typeof(str) === 'string' && str.length > 0 ? str : ''
  data = typeof(data) === 'object'  && data != null ? data : {}

  getTemplate('_header', data, (err, headerString) =>{
    if(!err && headerString){
      getTemplate('_footer', data, (err, footerString) =>{
        if(!err && footerString){
          let fullString = headerString + str + footerString
          callback(false, fullString)
        }
        else{
          callback('Could not find the template')
        }
      })
    }
    else{
      callback('Could not find the template')
    }
  })
}


var interpolate = function(str, data){
  str = typeof(str) === 'string' && str.length > 0 ? str : ''
  data = typeof(data) === 'object'  && data != null ? data : {}

  for (var keyName in config.templateGlobals){
    if(config.templateGlobals.hasOwnProperty(keyName)){
      data['global.'+keyName] = config.templateGlobals[keyName]
    }
  }

  for(var key in data){
    if(data.hasOwnProperty(key) && typeof(data[key] === 'string')){
      var replace = data[key]
      var find = `{${key}}`
      str = str.replace(find, replace)
    }
  }

  return str

}

var getStaticAsset = function(fileName, callback){
  fileName = typeof(fileName) === 'string' && fileName.length > 0 ? fileName : false
  if(fileName){
    let publicDir = path.join(__dirname, '../public/')
    fs.readFile(publicDir + fileName, (err, data) =>{
      if(!err){
        callback(false, data)
      }
      else {
        callback(true, `File ${fileName} not found`)
      }
    })
  }
  else{
    callback(true, `File ${fileName} is not a valid file`)
  }
}


module.exports = {
  getTemplate,
  addUniversaltemplate,
  getStaticAsset
}
