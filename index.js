
  const uberServerToken = 'prjYeXvwL9X_cnjwhb84nbHGWKVIcoLdEdKEBAN_';
  
  const headers = new Headers();
  headers.append('Authorization', `Token ${uberServerToken}`);
  headers.append('Accept-Language', 'en_US');
  headers.append('Content-Type', 'application/json');
  
  let submit = document.forms["form"].elements["submit"];


  let form = document.getElementById('form');
  let from;
  let to;
  let startLatitude;
  let startLongtitude;
  let endLatitude;
  let endLongtitude;

  submit.addEventListener("click", function (event) {
	if(event){
	   from = document.forms["form"].elements["from"].value;
	   to = document.forms["form"].elements["to"].value;
	  toComputeCoordinates();
	}
  }, false);
  function toComputeCoordinates(){
	from = from.split(", ");
	to = to.split(", ");
	startLatitude = from[0];
	startLongtitude = from[1];
	endLatitude = to[0];
	endLongtitude = to[1];
	console.log(startLatitude);
	console.log(startLongtitude);
	console.log(endLatitude);
	console.log(endLongtitude);
  }
  
  fetch('https://api.uber.com/v1.2/estimates/price?start_latitude=37.7752315&start_longitude=-122.418075&end_latitude=37.7752415&end_longitude=-122.518075', {headers})
	.then(
	  function(response) {
		if (response.status !== 200) {
		  console.log('Looks like there was a problem. Status Code: ' +
			response.status);
		  return;
		  
		}
		
		// Examine the text in the response
		response.json().then(function(data) {
		  console.log(data);
		});
	  }
	)
	.catch(function(err) {
	  console.log('Fetch Error :-S', err);
	});
