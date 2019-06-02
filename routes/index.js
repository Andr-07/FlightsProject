const express = require('express');
const router = express.Router();
let fetch = require('node-fetch')

let token = process.env.TOKEN;
// console.log(">>>>>>>>>>>",token);

let arrCities = [];
let arrNameCities = [];
let arrNewCities = [];
const fs = require('fs')
let globalCountry;

let fullObj = {};
let namesCity;

/* GET home page. */
router.get('/', function(req, res, next) {
  arrCities =[];
  res.render('chooseCountry');
});

router.get('/contact', function(req, res, next) {
  res.render('contact');
});

router.get('/yourtrip', function(req, res, next) {
  res.render('index', {title: globalCountry});
});


// ​
router.post('/getCities', async function (req, res) {

  // let resp = await fetch(`http://api.travelpayouts.com/v1/prices/cheap?origin=MOW&destination=HKT&depart_date=2019-06&token=${token}`);
  let resp = await fetch('http://api.travelpayouts.com/data/ru/cities.json')
  // let json = await resp.json();
  console.log(req.body.inputDestination);
  globalCountry = req.body.inputDestination;
  let thisFile = fs.readFileSync("myjsonfileCountries.json");
  let jsonContent = JSON.parse(thisFile);
  let codeOfCountry = jsonContent[req.body.inputDestination]
  
  let fullJson = await resp.json();
  for (let i = 0; i < fullJson.length; i++) {
    if ((fullJson[i].country_code === codeOfCountry) && (fullJson[i].name !== null)) {
        arrCities.push(fullJson[i].code)
        arrNameCities.push(fullJson[i].name)
    }
  }
  
  // console.log(arrNameCities)
  res.json(arrCities);
});

function isEmpty(obj) {
  for(var key in obj) {
    if(obj.hasOwnProperty(key))
    return false;
  }
  return true;
}


router.post('/formFlights', async function (req,res){
  fullObj = {};
  let resp;
  let arrFlights = [];

  let thisFile = fs.readFileSync("myjsonfile.json");
  let jsonContent = JSON.parse(thisFile);

  function swap(json){
      let ret = {};
      for(let key in json){
        ret[json[key]] = key;
      }
      return ret;
    }

    let origin = swap(jsonContent)
    

  // let arrNewCities = [];
  // console.log(req.body.origin,req.body.depart_date)
  console.log(req.body.return_date);
  for (let i = 1; i < arrCities.length; i++) {
    resp = await fetch(`http://api.travelpayouts.com/v1/prices/cheap?origin=${origin[req.body.origin]}&currency=rub&destination=${arrCities[i]}&depart_date=${req.body.depart_date}&return_date=${req.body.return_date}&token=${token}`)
    let fullJson = await resp.json();
    if (!isEmpty(fullJson.data)) {
      //  console.log(fullJson.data);
     arrFlights.push(fullJson.data)
     arrNewCities.push(fullJson.name)
    }
  }
  // console.log(arrFlights);

  const all = [];
         namesCity =[];
        for (let i = 0; i < arrFlights.length; i++) {
          for (let key in arrFlights[i]) {
            all[key] = arrFlights[i][key];
                namesCity[i] = key
              }    
            }

            console.log(namesCity)
            
            for (let i = 0; i < namesCity.length; i++) {
              let priceArray = [];
            let airlineArray = [];
            let flightNumberArray = [];
            let departureArray = [];
            let returnArray = [];
            fullObj[namesCity[i]] = {};
            for (let key in all[namesCity[i]] ) {
              
                priceArray.push(all[namesCity[i]][key].price)
                airlineArray.push(all[namesCity[i]][key].airline)
                flightNumberArray.push(all[namesCity[i]][key].flight_number)
                departureArray.push(all[namesCity[i]][key].departure_at)
                returnArray.push(all[namesCity[i]][key].return_at)

            }
            fullObj[namesCity[i]].price = priceArray;
            fullObj[namesCity[i]].airline = airlineArray;
            fullObj[namesCity[i]].flight_number = flightNumberArray;
            fullObj[namesCity[i]].departure_at = departureArray;
            fullObj[namesCity[i]].return_at = returnArray;
          }
          
  res.json(fullObj);
  
})
router.get('/flights', function(req, res, next) {

let thisFile = fs.readFileSync("myjsonfile.json");
var jsonContent = JSON.parse(thisFile);

let arrNames = [];
let cheapPrice = [];

for (let i = 0; i < Object.keys(fullObj).length; i++) {
arrNames.push(jsonContent[Object.keys(fullObj)[i]]);
}

for (let i = 0; i < namesCity.length; i++) {
  fullObj[namesCity[i]].price.sort();
  cheapPrice.push(fullObj[namesCity[i]].price[0])
  // cheapPrice.sort();
}

// for (let j = 0; j < cheapPrice.length; j++) {
//   cheapPrice[j].sort();  
// }

// console.log('>>>>>>>>>',cheapPrice[0])

  res.render('flights', {city:fullObj, name:arrNames, cheapPrice:cheapPrice, arrCities:Object.keys(fullObj) });
});

router.get('/flights/:id', function(req, res, next) {
  let id = req.params.id;
  let onecity = fullObj[id];

  let thisFile = fs.readFileSync("myjsonfile.json");
  let jsonContent = JSON.parse(thisFile);
  let oneName = jsonContent[id]

  // console.log(onecity.price);

  arrCities =[];

  res.render('oneCity', {onecity:onecity, name:oneName})
});





module.exports = router;
