"use strict";
const uberServerToken = 'prjYeXvwL9X_cnjwhb84nbHGWKVIcoLdEdKEBAN_';
const headers = new Headers();
headers.append('Authorization', `Token ${uberServerToken}`);
headers.append('Accept-Language', 'en_US');
headers.append('Content-Type', 'application/json');

let submit = document.getElementById("submit");

let autocomplete;
let autocomplete2;

let location1;
let location2;

let startLatitude;
let startLongtitude;
let endLatitude;
let endLongtitude;

let est = document.createElement('DIV');
submit.addEventListener("click", function (event) {
  if(event){
	event.preventDefault();
	fetch('https://api.uber.com/v1.2/estimates/price?start_latitude='+ startLatitude +
	  '&start_longitude=' + startLongtitude +
	  '&end_latitude='+ endLatitude +
	  '&end_longitude=' + endLongtitude,
	  {headers}
	)
	  .then(
		function(response) {
		  if (response.status !== 200) {
			console.log('Looks like there was a problem. Status Code: ' +
			  response.status);
			return;
		  }
		  response.json().then(function(data) {
			for(let i in data){
			  est.innerHTML = data[i][0].estimate;
			  let estimate = document.getElementById('estimate');
			  estimate.appendChild(est);
			}
		  });
		}
	  )
	  .catch(function(err) {
		console.log('Fetch Error :-S', err);
	  });
  }
}, false);

function initialize() {
  initAutocomplete();
  initMap();
}

let directionsService;
let directionsDisplay;
function initMap() {
   directionsService = new google.maps.DirectionsService;
   directionsDisplay = new google.maps.DirectionsRenderer;
  let map = new google.maps.Map(document.getElementById('map'), {
	zoom: 14,
	center: {lat: 50.449831, lng: 30.523480}
  });
  directionsDisplay.setMap(map);
  
  let onChangeHandler = function() {
	
	calculateAndDisplayRoute(directionsService, directionsDisplay);
  };
  submit.addEventListener('click', onChangeHandler);
}




function initAutocomplete() {
  autocomplete = new google.maps.places.Autocomplete(document.getElementById("from"));
  autocomplete2 = new google.maps.places.Autocomplete(document.getElementById("to"));
  
  
  
  google.maps.event.addListener(autocomplete, 'place_changed', function() {
	
	let place = autocomplete.getPlace();
	let location = place.formatted_address;
	startLatitude = +place.geometry.location.lat();
	startLongtitude = +place.geometry.location.lng();
	document.getElementById('rideFrom').innerHTML = 'Origin: ' + location;
	location1 = location
  });
  
  google.maps.event.addListener(autocomplete2, 'place_changed', function() {
	
	let place = autocomplete2.getPlace();
	let location = place.formatted_address;
	endLatitude = +place.geometry.location.lat();
	endLongtitude = +place.geometry.location.lng();
	document.getElementById('rideTo').innerHTML = 'Destination: ' + location;
	location2 = location;
  });
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  directionsService.route({
	origin: location1,
	destination: location2,
	travelMode: 'DRIVING'
  }, function(response, status) {
	if (status === 'OK') {
	  directionsDisplay.setDirections(response);
	} else {
	  window.alert('Directions request failed due to ' + status);
	}
  });
}

/*google.maps.event.addDomListener(window, 'load', initialize);*/


