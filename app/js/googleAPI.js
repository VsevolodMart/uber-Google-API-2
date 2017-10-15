export let googleAPI = function () {
  
  
  const uberServerToken = 'prjYeXvwL9X_cnjwhb84nbHGWKVIcoLdEdKEBAN_'; //Zahar
  //const uberServerToken = 'kFh83ZNIJyw8MRf9PozqOLNBnZRcUVn9wiksEE8e';
  
  const headers = new Headers();
  headers.append('Authorization', `Token ${uberServerToken}`);
  headers.append('Accept-Language', 'en_US');
  headers.append('Content-Type', 'application/json');
  // headers.append('Access-Control-Allow-Origin', '*');
  // headers.append('Access-Control-Allow-Credentials', 'true');
  // headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  // headers.append('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  
  let submit = document.getElementById("submit");
  
  let autocompleteFrom;
  let autocompleteTo;
  
  let locationA;
  let locationB;
  
  let startLatitude;
  let startLongtitude;
  let endLatitude;
  let endLongtitude;
  
  let est = document.createElement('DIV');
  
  submit.addEventListener( "click", function (event) {
  
	if(event){
	  event.preventDefault();
	  
	  fetch('https://api.uber.com/v1.2/estimates/price?start_latitude=' + startLatitude +
		'&start_longitude=' + startLongtitude +
		'&end_latitude=' + endLatitude +
		'&end_longitude=' + endLongtitude,
		{headers}
	  ).then(
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
		).catch(function(err) {
		  console.log('Fetch Error :-S', err);
		});
	}
  }, false);
  
  
  
  //init Map
  let directionsService = new google.maps.DirectionsService;
  let directionsDisplay = new google.maps.DirectionsRenderer;
  let map = new google.maps.Map(document.getElementById('map'), {
	zoom: 14,
	center: {lat: 50.449831, lng: 30.523480}
  });
  directionsDisplay.setMap(map);
  
  let onChangeHandler = function() {
	
	calculateAndDisplayRoute(directionsService, directionsDisplay);
  };
  submit.addEventListener('click', onChangeHandler);
  
  
  //init autocomplete
  autocompleteFrom = new google.maps.places.Autocomplete(document.getElementById("from"));
  autocompleteTo = new google.maps.places.Autocomplete(document.getElementById("to"));
  
  
  google.maps.event.addListener(autocompleteFrom, 'place_changed', function () {
	
	let place = autocompleteFrom.getPlace();
	locationA = place.formatted_address;
	startLatitude = +place.geometry.location.lat();
	startLongtitude = +place.geometry.location.lng();
	document.getElementById('rideFrom').innerHTML = 'Origin: ' + locationA;
	
  });
  
  google.maps.event.addListener(autocompleteTo, 'place_changed', function () {
	
	let place = autocompleteTo.getPlace();
	locationB = place.formatted_address;
	endLatitude = +place.geometry.location.lat();
	endLongtitude = +place.geometry.location.lng();
	document.getElementById('rideTo').innerHTML = 'Destination: ' + locationB;
  });
  
  
  function calculateAndDisplayRoute(directionsService, directionsDisplay) {
	directionsService.route({
	  origin: locationA,
	  destination: locationB,
	  travelMode: 'DRIVING'
	}, function (response, status) {
	  if (status === 'OK') {
		directionsDisplay.setDirections(response);
	  } else {
		window.alert('Directions request failed due to ' + status);
	  }
	});
  }
  
};
