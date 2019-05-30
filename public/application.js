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
        // let whatIget2 = await whatIget.map(el=>el.data)
        console.log(whatIget) 
    })


})