const firstDiv = document.getElementById('Api');
const title = document.createElement('h1')
const button = document.createElement('button');
const h2 = document.createElement('h2');
const container = document.createElement('div');

const electron = require('electron');
// Importing the net Module from electron remote
const net = electron.remote.net;

button.className = 'button'

firstDiv.append(title);
firstDiv.append(button);
firstDiv.append(h2);

title.innerHTML = 'API';
button.innerHTML = 'Launch';


let astronauts = [];




button.addEventListener('click', (event) => {
    const request = net.request({
        method: 'GET',
        protocol: 'http:',
        hostname: 'api.open-notify.org',
        path: '/astros.json',
        redirect: 'follow'
    });
    request.on('response', (response) => {
        console.log(`STATUS: ${response.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(response.headers)}`);
  
        response.on('data', (chunk) => {
            console.log(`BODY: ${chunk}`)
            astronauts = JSON.parse(chunk);
            console.log(astronauts);
            h2.innerHTML = `${astronauts.number} Astronauts are currently in space`;
            astronauts.people.forEach((astronaut) => {
                firstDiv.append(container)
                container.innerHTML += `<li>${astronaut.name}</li>`
                console.log(astronaut.name);
            }
            );


        });
    });
    request.on('finish', () => {
        console.log('Request is Finished')
    });
    request.on('abort', () => {
        console.log('Request is Aborted')
    });
    request.on('error', (error) => {
        console.log(`ERROR: ${JSON.stringify(error)}`)
    });
    request.on('close', (error) => {
        console.log('Last Transaction has occured')
    });
    request.setHeader('Content-Type', 'application/json');
    request.end();
})

