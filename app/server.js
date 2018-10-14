
const http = require('http')
const config = require('./config.js')
const utils = require('./api/helpers/utils.js')
const router = require('./api/routers/router.js')
const viewRouter = require('./web/routers/router.js')


const server = http.createServer((req, res) =>{
  middleware(req, res)
})


const middleware = function (req, res) {
  let reqObject
  let body

  req.on('data', (data) =>{
    body = data
  })

  req.on('end', () =>{
    reqObject = utils.getRequestObject(req, body)
    const chosenHandler =  choseRouter(reqObject.path)
    chosenHandler(reqObject, (statusCode, response, contentType) =>{
      statusCode = typeof(statusCode) === 'number' ? statusCode : 400
      contentType = typeof(contentType) === 'string' ? contentType : 'json'
      let payload = ''

      if(contentType === 'json'){
        payload = typeof(response) === 'object' ? response : {}
        res.setHeader('Content-Type', `application/${contentType}`)
        payload = JSON.stringify(payload)
      }
      else if(contentType === 'html'){
        payload = typeof(response) === 'string' ? response : ''
        res.setHeader('Content-Type', `text/${contentType}`)
      }
      else if(contentType === 'favicon'){
        payload = typeof(response) !== 'undefined' ? response : ''
        res.setHeader('Content-Type', `image/x-icon`)
      }
      else if(contentType === 'css'){
        payload = typeof(response) !== 'undefined' ? response : ''
        res.setHeader('Content-Type', `text/css`)
      }
      else if(contentType === 'png'){
        payload = typeof(response) !== 'undefined' ? response : ''
        res.setHeader('Content-Type', `image/png`)
      }
      else if(contentType === 'jpg'){
        payload = typeof(response) !== 'undefined' ? response : ''
        res.setHeader('Content-Type', `image/jpg`)
      }
      else if(contentType === 'plain'){
        payload = typeof(response) !== 'undefined' ? response : ''
        res.setHeader('Content-Type', `text/plain`)
      }
      res.writeHead(statusCode)
      res.end(payload)
    })
  })
}

var choseRouter = function(path){
  let operationNames
  let myRouter
  let routeName = 'not found'
  if(path.indexOf(config.backend) >= 0){
    operationNames = Object.keys(router)
    myRouter = router
  }
  else{
    operationNames = Object.keys(viewRouter)
    myRouter = viewRouter
    if(path.indexOf('public/') > -1){
      return myRouter.public
    }
  }
  operationNames.map(name =>{
    if(path.indexOf(name) >= 0){
      routeName = name
    }
  })
  return myRouter[routeName]
}

var init = function(){
  server.listen(config.port, () =>{
    console.log(`<<< Server is listening in >>> ${config.port}`)
  })
}

module.exports = {
  init
}
