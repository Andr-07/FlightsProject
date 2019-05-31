document.addEventListener('DOMContentLoaded', event => {

    const yourDestination = document.querySelector('#yourDestination');
    const inputDestination = document.querySelector('#destination');

    const container = document.querySelector('.container');
    
    yourDestination && yourDestination.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log("+++++++++++++++");
        let res = await fetch('/getCities', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                inputDestination: inputDestination.value
            })
            
        })
            const whatIget = await res.json();
            window.location.href = '/yourtrip'

        })


    const formFlights = document.querySelector('#formFlights');
    const origin = document.querySelector('#origin');
    const depart_date = document.querySelector('#depart_date');
    const return_date = document.querySelector('#return_date');
    // const container = document.querySelector('.container');

    formFlights && formFlights.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log("+++++++++++++++");
        container.innerHTML=`<div class="text-center">
        Подождите, пожалуйста...  
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div> `
        let res = await fetch('/formFlights', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                origin: origin.value,
                depart_date: depart_date.value,
                return_date: return_date.value

            })
            
        })
            const fullObj = await res.json();
            console.log(fullObj)
            window.location.href = '/flights'

        })




})