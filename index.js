"use strict";
const uberServerToken = 'prjYeXvwL9X_cnjwhb84nbHGWKVIcoLdEdKEBAN_';

const headers = new Headers();
headers.append('Authorization', `Token ${uberServerToken}`);
headers.append('Accept-Language', 'en_US');
headers.append('Content-Type', 'application/json');

let submit = document.getElementById("submit");

let placeSearch;
let autocomplete;
let autocomplete2;

let form;
let from;
let to;

let rideFrom = document.getElementById('rideFrom');
let rideTO = document.getElementById('rideTo');

let geodata;

let startLatitude;
let startLongtitude;
let endLatitude;
let endLongtitude;

console.log(startLongtitude);

let geoArr = [];

let body = document.querySelector('.body');
let est = document.createElement('DIV');


function toComputeCoordinates(){
  from = autocomplete.split(", ");
  to = autocomplete2.split(", ");
  startLatitude = from[0];
  startLongtitude = from[1];
  endLatitude = to[0];
  endLongtitude = to[1];
  
  console.log(startLatitude);
}

submit.addEventListener("click", function (event) {
  console.log(startLongtitude);
  console.log('df');
  if(event){
    event.preventDefault();
	 /*from = document.getElementById('autocomplete').value;
	 to = document.getElementById('autocomplete2').value;*/
	/*toComputeCoordinates();*/
	console.log(startLongtitude);
 
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
			console.log(data);
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



 var map, marker;

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
	console.log(startLatitude);
	console.log(startLongtitude);
	
	initMap()
  });
  
  google.maps.event.addListener(autocomplete2, 'place_changed', function() {
	
	let place = autocomplete2.getPlace();
	let location = "Destination: " + place.formatted_address + "<br/>";
	endLatitude = +place.geometry.location.lat();
	endLongtitude = +place.geometry.location.lng();
	document.getElementById('rideTo').innerHTML = location;
	console.log(endLatitude);
	console.log(endLongtitude);
	initMap()
  });
  
};






//let map;
/*function initMap() {
  let uluru = {lat: 50.485696, lng: 30.595194};
  map = new google.maps.Map(document.getElementById('map'), {
	center: uluru,
	zoom: 20
  });
  let marker = new google.maps.Marker({
	position: uluru,
	map: map
  });

  
  let defaultBounds = new google.maps.LatLngBounds(
	new google.maps.LatLng(-33.8902, 151.1759),
	new google.maps.LatLng(-33.8474, 151.2631));

  let input = document.getElementById('from');
  let options = {
	bounds: defaultBounds,
	types: ['address']
  };

  autocomplete = new google.maps.places.Autocomplete(from, options);

}*/


/*


function initAutocomplete(autocomplete, autocomplete2) {
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  autocomplete = new google.maps.places.Autocomplete(
	/!** @type {!HTMLInputElement} *!/
	(document.getElementById('autocomplete')), {
	  types: ['geocode']
	});
  
  // When the user selects an address from the dropdown, populate the address
  // fields in the form.
  autocomplete.addListener('place_changed', function() {
	fillInAddress(autocomplete, "");
  });
  
  autocomplete2 = new google.maps.places.Autocomplete(
	/!** @type {!HTMLInputElement} *!/
	(document.getElementById('autocomplete2')), {
	  types: ['geocode']
	});
  autocomplete2.addListener('place_changed', function() {
	fillInAddress(autocomplete2, "2");
  });
}



function fillInAddress(autocomplete, unique) {
  // Get the place details from the autocomplete object.
  let place = autocomplete.getPlace();
  for (let component in componentForm) {
	if (!!document.getElementById(component + unique)) {
	  document.getElementById(component + unique).value = '';
	  document.getElementById(component + unique).disabled = false;
	}
  }
  
  // Get each component of the address from the place details
  // and fill the corresponding field on the form.
  for (let i = 0; i < place.address_components.length; i++) {
	let addressType = place.address_components[i].types[0];
	if (componentForm[addressType] && document.getElementById(addressType + unique)) {
	  let val = place.address_components[i][componentForm[addressType]];
	  document.getElementById(addressType + unique).value = val;
	}
  }
  google.maps.event.addDomListener(window, "load", initAutocomplete);
}






function geolocate(autocomplete) {
  
  if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(function(position) {
	  let geolocation = {
		lat: position.coords.latitude,
		lng: position.coords.longitude
	  };
	  let circle = new google.maps.Circle({
		center: geolocation,
		radius: position.coords.accuracy
	  });
	  //autocomplete.setBounds(circle.getBounds());
	});
  }
}

var geocoder;
var map;
function initialize() {
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(-34.397, 150.644);
  var mapOptions = {
	zoom: 8,
	center: latlng
  }
  map = new google.maps.Map(document.getElementById('map'), mapOptions);
}

function codeAddress() {
  var address = document.getElementById('address').value;
  geocoder.geocode( { 'address': address}, function(results, status) {
	if (status == 'OK') {
	  map.setCenter(results[0].geometry.location);
	  var marker = new google.maps.Marker({
		map: map,
		position: results[0].geometry.location
	  });
	} else {
	  alert('Geocode was not successful for the following reason: ' + status);
	}
  });
}
*/






