const express = require('express');
const router = express.Router();
let fetch = require('node-fetch')
let arrCities = [];
let arrNameCities = [];

let fullObj = {};
let token = "036ec1af1b5315f09124562304cc40f4";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('chooseCountry');
});

router.get('/yourtrip', function(req, res, next) {
  res.render('index');
});

// ​
router.post('/getCities', async function (req, res) {
  // let resp = await fetch(`http://api.travelpayouts.com/v1/prices/cheap?origin=MOW&destination=HKT&depart_date=2019-06&token=${token}`);
  let resp = await fetch('http://api.travelpayouts.com/data/ru/cities.json')
  // let json = await resp.json();
  let fullJson = await resp.json();
  for (let i = 0; i < fullJson.length; i++) {
    if ((fullJson[i].country_code == "NL") && (fullJson[i].name !== null)) {
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

router.post('/getFlights', async function (req,res){
  let resp;
  let arrFlights = [];
  let arrNewCities = [];
  for (let i = 1; i < arrCities.length; i++) {
     resp = await fetch(`http://api.travelpayouts.com/v1/prices/cheap?origin=MOW&currency=rub&destination=${arrCities[i]}&depart_date=2019-06&token=${token}`)
     let fullJson = await resp.json();
     if (!isEmpty(fullJson.data)) {
    //  console.log(fullJson.data);
     arrFlights.push(fullJson.data)
     arrNewCities.push(fullJson.code)
     }
  }
  console.log(arrFlights);
  res.json(arrFlights);

})

router.post('/formFlights', async function (req,res){
  let resp;
  let arrFlights = [];
  let arrNewCities = [];
  console.log(req.body.origin,req.body.depart_date)
  for (let i = 1; i < arrCities.length; i++) {
     resp = await fetch(`http://api.travelpayouts.com/v1/prices/cheap?origin=${req.body.origin}&currency=rub&destination=${arrCities[i]}&depart_date=${req.body.depart_date}&token=${token}`)
     let fullJson = await resp.json();
     if (!isEmpty(fullJson.data)) {
    //  console.log(fullJson.data);
     arrFlights.push(fullJson.data)
     arrNewCities.push(fullJson.code)
     }
  }
  console.log(arrFlights);

  const all = [];
        const name =[];
        for (let i = 0; i < arrFlights.length; i++) {
            for (let key in arrFlights[i]) {
                all[key] = arrFlights[i][key];
                name[i] = key
            }    
        }

        for (let i = 0; i < name.length; i++) {
            let priceArray = [];
            let airlineArray = [];
            let flightNumberArray = [];
            let departureArray = [];
            let returnArray = [];
            fullObj[name[i]] = {};
            for (let key in all[name[i]] ) {

                priceArray.push(all[name[i]][key].price)
                airlineArray.push(all[name[i]][key].airline)
                flightNumberArray.push(all[name[i]][key].flight_number)
                departureArray.push(all[name[i]][key].departure_at)
                returnArray.push(all[name[i]][key].return_at)

            }
            fullObj[name[i]].price = priceArray;
            fullObj[name[i]].airline = airlineArray;
            fullObj[name[i]].flight_number = flightNumberArray;
            fullObj[name[i]].departure_at = departureArray;
            fullObj[name[i]].return_at = returnArray;
          }

  res.json(fullObj);

})



module.exports = router;
