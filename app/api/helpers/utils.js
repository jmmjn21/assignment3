
const url = require('url')
const StringDecoder = require('string_decoder').StringDecoder
const crypto = require('crypto')
const config = require('../config.js')
const path = require('path')
const fs = require('fs')


var getRequestObject = function (req, data){
  const parsedUrl = url.parse(req.url, true)
  const path = parsedUrl.pathname.replace(/^\/+|\/+$/g,'')
  const method = req.method.toLowerCase()
  const queryParams = parsedUrl.query
  const pathParams = path.split('/')
  const headerParams = req.headers
  const decoder = new StringDecoder('utf-8', true)
  let body = ''
  data = typeof(data) !== 'undefined' ? data : ''
  body += decoder.write(data)

  let outputObject = {
    path: path,
    method: method,
    queryParams: queryParams,
    pathParams: pathParams,
    headerParams: headerParams,
    body: parseJsonToObj(body)
  }
  return outputObject
}

var hash = function(str){
  if(typeof(str) === 'string' && str.length > 0){
    let hash = crypto.createHmac('sha256', config.secret).update(str).digest('hex')
    return hash
  }
  else return false
}

var parseJsonToObj = function(str){
  try{
    var obj = JSON.parse(str)
    return obj
  }
  catch(err){
    return {}
  }
}

var validateRequiredField = function(obj, fields){
  let missing = []
  fields.map(field =>{
    if(Object.keys(obj).indexOf(field) === -1) missing.push(field)
  })
  return missing
}

var validateOptionalField = function(obj, fields, optionals){
return Object.keys(obj).filter(field =>{
    return fields.indexOf(field) == -1
  }).filter(field =>{
    return optionals.indexOf(field) == -1
  })
}

var validateFormatField = function(field, value){
  switch(field) {
    case 'name':
      if(typeof(value) === 'string' && value.trim().length > 0) return {result: true}
      else return {field: field, value: value, result: false}
    case 'email':
      if(typeof(value) === 'string' && value.trim().length > 0) return {result: true}
      else return {field: field, value: value, result: false}
    case 'street':
      if(typeof(value) === 'string' && value.trim().length > 0) return {result: true}
      else return {field: field, value: value, result: false}
    case 'password':
      if(typeof(value) === 'string' && value.trim().length > 0) return {result: true}
      else return {field: field, value: value, result: false}
    case 'id':
      if(typeof(value) === 'string' && value.trim().length === 20) return {result: true}
      else return {field: field, value: value, result: false}
    case 'extend':
      if(typeof(value) === 'boolean' && value === true) return {result: true}
      else return {field: field, value: value, result: false}
    case 'cart':
      if(typeof(value) === 'object') return {result: true}
      else return {field: field, value: value, result: false}
    case 'orders':
      if(typeof(value) === 'object') return {result: true}
      else return {field: field, value: value, result: false}
    default:
      return {result: true}
  }
}

var checkRequest = function(inputObj, required, optional){
  const missingArgs = validateRequiredField(inputObj, required)
  if(missingArgs.length === 0){
    const tooMuchArgs = validateOptionalField(inputObj, required, optional)
    if(tooMuchArgs.length === 0){
      const validationErrors = Object.keys(inputObj).map(field =>{
        return validateFormatField(field, inputObj[field])
      }).filter(validation =>{
        if(validation.result === false) return validation
      })
      if(validationErrors.length === 0){
        return {
          code: 200,
          message: `All validation passed`
        }
      }
      else{
        return {
          code: 400,
          message: `Bad Request, validation errors ${JSON.stringify(validationErrors)}`
        }
      }
    }
    else{
      return {
        code: 400,
        message: `Bad Request, too much arguments ${JSON.stringify(tooMuchArgs)}`
      }
    }
  }
  else{
    return {
      code: 400,
      message: `Bad Request, missing arguments ${JSON.stringify(missingArgs)}`
    }
  }
}

var createRandomString = function(strLength){
  strLength = typeof(strLength) === 'number' && strLength > 0 ? strLength : false
  if(strLength){
    let str = ''
    for(var i = 0; i<strLength; i++){
      let randomChar = config.possibleChar.charAt(Math.floor(Math.random() * config.possibleChar.length))
      str += randomChar
    }
    return str
  }
  else{
    return false
  }
}

var getTemplate = function(templateName, data, callback){
  templateName = typeof(templateName) === 'string' && templateName.length > 0 ? templateName : false
  data = typeof(data) === 'object'  && data != null ? data : {}
  if(templateName){
    let templateDir = path.join(__dirname, '../public/templates/')
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


module.exports = {
  getRequestObject,
  hash,
  parseJsonToObj,
  checkRequest,
  createRandomString,
  getTemplate,
  addUniversaltemplate
}
