import main from './htmlTemplate';
// export function authorize() {
//     const clientID = '_46e_moJOVW0GQNkZDWSFNlHJcq_cYjP';
//     const URI = window.location;
//     controller();
//     window.addEventListener('hashchange', function () {
//         if(URI.hash !=="#main" && URI.hash !=="#login"){
//             window.location = URI+"#main";
//             controller();
//         } else if(URI.hash === "#login"){
//             controller();
//         }
//
//         console.log(login);
//     });
//
//
//     main.addEventListener('click', controller);
//     login.addEventListener('click', controller);
//     function controller() {
//         if (window.location.hash === '#main') {
//             let root = document.getElementById('root');
//              //root.innerHTML = htmlElement('get');
//             root.innerHTML = htmlElement();
//         } else if (window.location.hash === '#login') {
//             window.location = `https://login.uber.com/oauth/v2/authorize?client_id=${ clientID }&response_type=code&redirect_uri=http://127.0.0.1:8090/#main`;
//
//
//         } else if (window.location.hash.indexOf('#auth') > -1) {
//             // document.cookie = 'uber-login=' + window.location.hash;
//         }
//     }
// }

export function authorize() {
  let root = document.getElementById('root');
  history.pushState('main', null, 'main');
  root.innerHTML = main;
  // let main = document.querySelector('[href="main"]');
  // let login = document.querySelector('[href="login"]');
  //
  
  function updateText(content){
	
	root.innerHTML = content;
  }
  
  function requestContent(file){
      if(file === 'main'){
		root.innerHTML = main;
      }else if(file === 'login'){
		root.innerHTML = login;
      }
	
  }
  
  window.addEventListener('click', function(e){
	if(e.target != e.currentTarget){
	  e.preventDefault();
	  let data = e.target.getAttribute('href');
      let url = data;
	  //updateText(data);
	  //addCurrentClass(data);
	  history.pushState(data, null, url);
	  requestContent(url);
	  document.title = "Ghostbuster | " + data;
	}
	//e.stopPropagation();
  }, false);
  
  
}
