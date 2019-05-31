const fs = require('fs')

let thisFile = fs.readFileSync("myjsonfile.json");
let jsonContent = JSON.parse(thisFile);

function swap(json){
    let ret = {};
    for(let key in json){
      ret[json[key]] = key;
    }
    return ret;
  }

let newJson = swap(jsonContent)

console.log(newJson['Москва'])