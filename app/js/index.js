'use strict';

import { googleAPI } from './googleAPI';
import main from './htmlTemplate';


function getHistory(e) {
  e.preventDefault();
  let root = document.getElementById('root');
  
  
  const clientID = '_46e_moJOVW0GQNkZDWSFNlHJcq_cYjP';
  const authorize= `https://login.uber.com/oauth/v2/authorize?client_id=${ clientID }&response_type=code&redirect_uri=http://127.0.0.1:8080/main`;
  
  
  history.pushState('main', null, 'main');
  root.innerHTML = main;
  googleAPI();

  
  function getContent(file){
	if( file === 'main' ){
	  root.innerHTML = main;
	  googleAPI();
	} else if ( file === 'login' ){
	  window.location = authorize;
	}
  }
  
  
  window.addEventListener( 'click', function(e){
	if( e.target != e.currentTarget ){
	  e.preventDefault();
	  let data = e.target.getAttribute('href');
	  let url = data;
	  history.pushState(data, null, url);
	  getContent(url);
	  document.title = "uber | " + data;
	}
	e.stopPropagation();
  }, false );
  
  window.addEventListener('popstate', function(e){
	let character = e.state;
	
	if (character == null) {
	  document.title = defaultTitle;
	} else {
	  getContent(character);
	  document.title = "Ghostbuster | " + character;
	}
  })

};


window.addEventListener('load', getHistory);

