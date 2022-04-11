const instance = 'https://norden.social'
const api = '/api/v1/instance/activity'
const apiURL = instance + api;
const today = new Date().getDay();

const response = fetch(apiURL)
.then(res => res.json())
.then(data => {
	if (today == 7) {
  	printStatus(data[1]);
  } else {
    printStatus(data[0]);
  }
 });
 
function printStatus(data) {
	console.log('Wir hatten diese Woche '+ data.logins + ' aktive Accounts und sind um ' + data.registrations + " gewachsen.");
}
