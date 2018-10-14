

var verticalSpace = function(lines){
  lines = typeof(lines) === 'number' && lines > 0 ? lines : 1
  for(var i = 0; i<lines; i++){
    console.log('')
  }
}

var horizontalLine = function(){
  let width = process.stdout.columns
  let line = ''
  for(var i = 0; i < width; i++){
    line+='-'
  }
  console.log(line)
}

var centered = function(str){
  str = typeof(str) === 'string' && str.trim().length > 0 ? str.trim() : ''
  let width = process.stdout.columns

  let leftPadding = Math.floor((width - str.length) / 2)
  let line = ''
  for(var i =0;i<leftPadding;i++){
    line+=' '
  }
  line+= str
  console.log(line)
}


module.exports = {
  verticalSpace,
  horizontalLine,
  centered
}
