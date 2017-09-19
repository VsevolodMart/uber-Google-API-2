"use strict";
const uberServerToken = 'prjYeXvwL9X_cnjwhb84nbHGWKVIcoLdEdKEBAN_';

const headers = new Headers();
headers.append('Authorization', `Token ${uberServerToken}`);
headers.append('Accept-Language', 'en_US');
headers.append('Content-Type', 'application/json');

let submit = document.getElementById("submit");

let autocomplete;
let autocomplete2;

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
  initMap();
  initAutocomplete();
}

let map, marker;

function initMap() {
  
  let uluru = {lat: startLatitude || endLatitude || 50.449831, lng: startLongtitude || endLongtitude|| 30.523480};
  map = new google.maps.Map(document.getElementById('map'), {
	center: uluru,
	zoom: 14
  });
  marker = new google.maps.Marker({
	position: uluru,
	map: map
  });
}

function initAutocomplete() {
  autocomplete = new google.maps.places.Autocomplete(document.getElementById("from"));
  autocomplete2 = new google.maps.places.Autocomplete(document.getElementById("to"));
  
  google.maps.event.addListener(autocomplete, 'place_changed', function() {
	
	let place = autocomplete.getPlace();
	let location = "Origin: " + place.formatted_address + "<br/>";
	startLatitude = +place.geometry.location.lat();
	startLongtitude = +place.geometry.location.lng();
	document.getElementById('rideFrom').innerHTML = location;
	initMap()
  });
  
  google.maps.event.addListener(autocomplete2, 'place_changed', function() {
	
	let place = autocomplete2.getPlace();
	let location = "Destination: " + place.formatted_address + "<br/>";
	endLatitude = +place.geometry.location.lat();
	endLongtitude = +place.geometry.location.lng();
	document.getElementById('rideTo').innerHTML = location;
	initMap()
  });
}




