
const http = require('http')
const config = require('./config.js')
const utils = require('./api/helpers/utils.js')
const router = require('./routers/router.js')
const viewRouter = require('./routers/viewRouter.js')


const server = http.createServer((req, res) =>{
  middleware(req, res)
})

server.listen(config.port, () =>{
  console.log(`<<< Server is listening in >>> ${config.port}`)
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
  }
  operationNames.map(name =>{
    if(path.indexOf(name) >= 0){
      routeName = name
    }
  })
  return myRouter[routeName]
}
