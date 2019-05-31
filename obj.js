// const obj = require('./andrei')
const fs = require('fs')

// console.log(obj.length)



// let arr = []
// let arr2 = ["ZSH", 'AAC']

// let newObj = {}

// for (let i = 0; i<obj.length; i++){
//     let key = obj[i].code
//     let value = obj[i].name
//     newObj[key] = value
// }

// let json = JSON.stringify(newObj)

// fs.writeFileSync('myjsonfile.json', json, 'utf8')

// console.log(newObj)

let thisFile = fs.readFileSync("myjsonfile.json");
var jsonContent = JSON.parse(thisFile);

let arr = []
let arr2 = ["ZSH", 'AAC']

for (let i = 0; i < arr2.length; i++) {
    
arr.push((jsonContent[arr2[i]]));

}
console.log(arr);

