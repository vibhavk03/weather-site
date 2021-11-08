console.log('Client side JavaScript file is loaded.');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input'); // we have defined search input in index.hbs
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => { // e is for event
    // using this method prevents the page refreshing when we submit
    e.preventDefault();
    // value in search bar
    const location = search.value;
    
    messageOne.textContent='loading..';
    messageTwo.textContent='';

    fetch('/weather?address=' + encodeURIComponent(location)).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            messageOne.textContent=data.error;
            // console.log(data.error);
        } else {
            messageOne.textContent=data.location;
            messageTwo.textContent=data.forecastData;
            // console.log(data.location);
            // console.log(data.forecastData);
        }
    })    
})

})

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     })
// })

// fetch('http://localhost:3000/weather?address=' + encodeURIComponent(location)).then((response)
// as we are using heroku also, we'll remove localhost line and put only weather