const express = require('express');
const router = express.Router();
let fetch = require('node-fetch')
let arrCities = [];
let arrNameCities = [];

let token = "036ec1af1b5315f09124562304cc40f4";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Andrei' });
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
    console.log(arrNameCities)
  res.json();
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
  for (let i = 1; i < arrCities.length; i++) {
     resp = await fetch(`http://api.travelpayouts.com/v1/prices/cheap?origin=MOW&currency=rub&destination=${arrCities[i]}&depart_date=2019-06&token=${token}`)
     let fullJson = await resp.json();
     if (!isEmpty(fullJson.data)) {
    //  console.log(fullJson.data);
     arrFlights.push(fullJson.data)
     }
  }
  console.log(arrFlights);
  res.json(arrFlights);

})

module.exports = router;
