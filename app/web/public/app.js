
var app = {}

app.config = {
  'sessionToken': false
}


//AJAX Client
app.client = {}

app.client.request = function(headers, path, method, queryString, payload, callback){
  headers = typeof(headers) === 'object' && headers != null ? headers : {}
  path = typeof(path) === 'string' ? path : '/'
  method = typeof(method) === 'string' && ['GET', 'POST', 'PUT', 'DELETE'].indexOf(method) > -1 ? method.toUpperCase() : 'GET'
  queryString = typeof(queryString) === 'object' && queryString != null ? queryString : {}
  payload = typeof(payload) === 'object' && payload != null ? payload : {}
  calbback = typeof(callback) === 'function' ? callback : false

  let requestUrl = `${path}?`
  let count = 0
  for(var key in queryString){
    if(queryString.hasOwnProperty(key)){
      count ++
      if(count > 1){
        requestUrl += '&'
      }
      requestUrl += `${key}=${queryString[key]}`
    }
  }
  let xhr = new XMLHttpRequest()
  xhr.open(method, requestUrl, true)
  xhr.setRequestHeader('Content-Type', 'application/json')
  for(var key in headers){
    if(headers.hasOwnProperty(key)){
      xhr.setRequestHeader(key, headers[key])
    }
  }

  if(app.config.sessionToken){
    xhr.setRequestHeader("token", app.config.sessionToken.id)
  }

  //When de request come back
  xhr.onreadystatechange = function(){
    if(xhr.readyState === XMLHttpRequest.DONE){
      let statusCode = xhr.status
      let response = xhr.responseText

      if(callback){
        try{
          let parsedResponse = JSON.parse(response)
          callback(statusCode, parsedResponse)
        }
        catch(e){
          callback(statusCode, false)
        }
      }
    }
  }

  //Send the payload as json
  let payloadString = JSON.stringify(payload)
  xhr.send(payloadString)
}
