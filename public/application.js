document.addEventListener('DOMContentLoaded', event => {

    const getCities = document.querySelector('.getCities');
    const getFlights = document.querySelector('.getFlights');
    const container = document.querySelector('.container');

    getCities && getCities.addEventListener('click', async (e) => {
        e.preventDefault();
        console.log("+++++++++++++++");
        let res = await fetch('/getCities', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({

            })
            
        })
            const whatIget = await res.json();
            window.location.href = '/yourtrip'

        })
        
    getFlights && getFlights.addEventListener('click', async (e) => {
        e.preventDefault();
        console.log("+++++++++++++++");
        let res = await fetch('/getFlights', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                
            })
        })
        const whatIget = await res.json();        
        
        const all = [];
        const name =[];
        for (let i = 0; i < whatIget.length; i++) {
            for (let key in whatIget[i]) {
                all[key] = whatIget[i][key];
                name[i] = key
            }    
        }

        let fullObj = {};
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
        console.log(fullObj);

    })

    const formFlights = document.querySelector('#formFlights');
    const origin = document.querySelector('#origin');
    const destination = document.querySelector('#destination');
    const depart_date = document.querySelector('#depart_date');
    const return_date = document.querySelector('#return_date');
    // const container = document.querySelector('.container');

    formFlights && formFlights.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log("+++++++++++++++");
        let res = await fetch('/formFlights', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                origin: origin.value,
                destination: destination.value,
                depart_date: depart_date.value,
                return_date: return_date.value

            })
            
        })
            const fullObj = await res.json();
            console.log(fullObj)
            window.location.href = '/flights'


        })




})