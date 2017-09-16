"use strict";
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

let body = document.querySelector('.body');
let est = document.createElement('DIV');

function toComputeCoordinates(){
  from = from.split(", ");
  to = to.split(", ");
  startLatitude = from[0];
  startLongtitude = from[1];
  endLatitude = to[0];
  endLongtitude = to[1];
  
  console.log(startLatitude);
}



submit.addEventListener("click", function (event) {
  console.log('tesxt');
  if(event){
	from = document.forms["form"].elements["from"].value;
	to = document.forms["form"].elements["to"].value;
	toComputeCoordinates();
	
	
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
		  
		  // Examine the text in the response
		  response.json().then(function(data) {
			console.log(data);
			for(let i in data){
			  // let h = data[i][0].estimate;
			  // console.log(h);
			  
			  est.innerHTML = data[i][0].estimate;
			  body.appendChild(est);
			  
			}
			// estimate.innerText = data;
			// // console.log(data[0].estimate);
			// body.appendChild(estimate);
		  });
		}
	  )
	  .catch(function(err) {
		console.log('Fetch Error :-S', err);
	  });
	
  }
}, false);

