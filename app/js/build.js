var index =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _googleAPI = __webpack_require__(3);

var _htmlTemplate = __webpack_require__(2);

var _htmlTemplate2 = _interopRequireDefault(_htmlTemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getHistory(e) {
	e.preventDefault();
	var root = document.getElementById('root');

	var clientID = '_46e_moJOVW0GQNkZDWSFNlHJcq_cYjP';
	var authorize = 'https://login.uber.com/oauth/v2/authorize?client_id=' + clientID + '&response_type=code&redirect_uri=http://127.0.0.1:8080/main';

	history.pushState('main', null, 'main');
	root.innerHTML = _htmlTemplate2.default;
	(0, _googleAPI.googleAPI)();

	function getContent(file) {
		if (file === 'main') {
			root.innerHTML = _htmlTemplate2.default;
			(0, _googleAPI.googleAPI)();
		} else if (file === 'login') {
			window.location = authorize;
		}
	}

	window.addEventListener('click', function (e) {
		if (e.target != e.currentTarget) {
			e.preventDefault();
			var data = e.target.getAttribute('href');
			var url = data;
			history.pushState(data, null, url);
			getContent(url);
			document.title = "uber | " + data;
		}
		e.stopPropagation();
	}, false);

	window.addEventListener('popstate', function (e) {
		var character = e.state;

		if (character == null) {
			document.title = defaultTitle;
		} else {
			getContent(character);
			document.title = "Ghostbuster | " + character;
		}
	});
};

window.addEventListener('load', getHistory);

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/*const htmlElement = (handler) => {
  return `<div class="container">
            				<form id="form" name="name" action="#">
        						<input id="from" type="text" name="from" placeholder="From"/>
       							<input id="to" type="text" name="to" placeholder="To"/>
        						<button id="submit" type="submit" name="submit" onclick="${handler}()">submit</button>
       							<label id="rideFrom">origin</label>
        						<label id="rideTo">destination</label>
        						<div id="estimate"><span>Cost: </span></div>
    						</form>
        			   </div>`;
};

export default htmlElement;*/

var main = "<div class=\"container\">\n            \t\t\t\t<form id=\"form\" name=\"name\" action=\"#\">\n        \t\t\t\t\t\t<input id=\"from\" type=\"text\" name=\"from\" placeholder=\"From\"/>\n       \t\t\t\t\t\t\t<input id=\"to\" type=\"text\" name=\"to\" placeholder=\"To\"/>\n        \t\t\t\t\t\t<button id=\"submit\" type=\"submit\" name=\"submit\">submit</button>\n       \t\t\t\t\t\t\t<label id=\"rideFrom\">origin</label>\n        \t\t\t\t\t\t<label id=\"rideTo\">destination</label>\n        \t\t\t\t\t\t<div id=\"estimate\"><span>Cost: </span></div>\n    \t\t\t\t\t\t</form>\n        \t\t\t   </div>";

exports.default = main;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var googleAPI = exports.googleAPI = function googleAPI() {

  var uberServerToken = 'prjYeXvwL9X_cnjwhb84nbHGWKVIcoLdEdKEBAN_'; //Zahar
  //const uberServerToken = 'kFh83ZNIJyw8MRf9PozqOLNBnZRcUVn9wiksEE8e';

  var headers = new Headers();
  headers.append('Authorization', 'Token ' + uberServerToken);
  headers.append('Accept-Language', 'en_US');
  headers.append('Content-Type', 'application/json');
  // headers.append('Access-Control-Allow-Origin', '*');
  // headers.append('Access-Control-Allow-Credentials', 'true');
  // headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  // headers.append('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  var submit = document.getElementById("submit");

  var autocompleteFrom = void 0;
  var autocompleteTo = void 0;

  var locationA = void 0;
  var locationB = void 0;

  var startLatitude = void 0;
  var startLongtitude = void 0;
  var endLatitude = void 0;
  var endLongtitude = void 0;

  var est = document.createElement('DIV');

  submit.addEventListener("click", function (event) {

    if (event) {
      event.preventDefault();

      fetch('https://api.uber.com/v1.2/estimates/price?start_latitude=' + startLatitude + '&start_longitude=' + startLongtitude + '&end_latitude=' + endLatitude + '&end_longitude=' + endLongtitude, { headers: headers }).then(function (response) {

        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' + response.status);
          return;
        }
        response.json().then(function (data) {

          for (var i in data) {
            est.innerHTML = data[i][0].estimate;
            var estimate = document.getElementById('estimate');
            estimate.appendChild(est);
          }
        });
      }).catch(function (err) {
        console.log('Fetch Error :-S', err);
      });
    }
  }, false);

  //init Map
  var directionsService = new google.maps.DirectionsService();
  var directionsDisplay = new google.maps.DirectionsRenderer();
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: { lat: 50.449831, lng: 30.523480 }
  });
  directionsDisplay.setMap(map);

  var onChangeHandler = function onChangeHandler() {

    calculateAndDisplayRoute(directionsService, directionsDisplay);
  };
  submit.addEventListener('click', onChangeHandler);

  //init autocomplete
  autocompleteFrom = new google.maps.places.Autocomplete(document.getElementById("from"));
  autocompleteTo = new google.maps.places.Autocomplete(document.getElementById("to"));

  google.maps.event.addListener(autocompleteFrom, 'place_changed', function () {

    var place = autocompleteFrom.getPlace();
    locationA = place.formatted_address;
    startLatitude = +place.geometry.location.lat();
    startLongtitude = +place.geometry.location.lng();
    document.getElementById('rideFrom').innerHTML = 'Origin: ' + locationA;
  });

  google.maps.event.addListener(autocompleteTo, 'place_changed', function () {

    var place = autocompleteTo.getPlace();
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

/***/ })
/******/ ]);
//# sourceMappingURL=build.js.map