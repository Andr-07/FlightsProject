// const obj = require('./andrei')
const fs = require('fs')
const obj2 = require('./countries')
// console.log(obj.length)

// console.log(obj2)

// let arr = []
// let arr2 = ["ZSH", 'AAC']

let newObj = {}

for (let i = 0; i<obj2.length; i++){
    let key = obj2[i].name
    let value = obj2[i].code
    newObj[key] = value
}

let json = JSON.stringify(newObj)

// fs.writeFileSync('myjsonfileCountries.json', json, 'utf8')

// console.log(newObj)

let thisFile = fs.readFileSync("myjsonfileCountries.json");
var jsonContent = JSON.parse(thisFile);

// let arr = []
// let arr2 = ["ZSH", 'AAC']

// for (let i = 0; i < arr2.length; i++) {
    
// arr.push((jsonContent[arr2[i]]));

// }
console.log(jsonContent['Италия']);

// let thisFile = fs.readFileSync("myjsonfile.json");
// let jsonContent = JSON.parse(thisFile);

// function swap(json){
//     let ret = {};
//     for(let key in json){
//       ret[json[key]] = key;
//     }
//     return ret;
//   }

//   console.log(swap(jsonContent))

// let arr = []
// let arr2 = ["ZSH", 'AAC']

// for (let i = 0; i < arr2.length; i++) {
    
// arr.push((jsonContent[arr2[i]]));

// }
// console.log(jsonContent);