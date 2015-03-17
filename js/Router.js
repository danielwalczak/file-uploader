(function(App){
	'use strict';

	// App library returned from closure
	App.Router = (function() {

		var routes = {},
			defaultUrl = '/',
			defaultEl = null, // el which is container for the view html
			current;

	  	function add(route){
	  		routes[route.url] = route;

	  		return this;
	  	}

	  	function init(initialEl){
	  		defaultEl = initialEl;
	  		window.addEventListener('hashchange', hashChange, false);
	  		if(location.hash !== '')
	  			hashChange();
			else
		  		changeUrl(defaultUrl);
	  	};

	  	function hashChange(){
	  		var stateName = location.hash.slice(1),
		  		split = null;

	  		// split params from url
	  		if(stateName.indexOf('?') !== -1){
	  			split = stateName.split('?')
	  			stateName = split[0];
	  		}

	  		if (routes.hasOwnProperty(stateName) === true){
	  			if(!!split){
	  				// add to state params
	  				routes[stateName].params = getParams(split[1]);
	  			}
		  		current = routes[stateName];
		  		changeState(current);
	  		}
	  		else
	  			changeUrl(defaultUrl);
	  	}

	  	function changeState(state){
	  		// inject html
				console.log(state.html)
	  		defaultEl.innerHTML = state.html;
	  		// initialize controller function
	  		// if(typeof state.ctrl === 'function')
  			App.ctrls[state.ctrl](state, defaultEl);
	  	}

	  	function go(stateName){
	  		var url = states[stateName].url;
	  		changeUrl(url);

	  		return this;
	  	}

	  	function changeUrl(url){
	  		location.hash = '#'+url;
	  	}

	  	function getParams(string){
	  		var parts, params = {};

		    parts = string.split('&');

		    for (var i = 0; i < parts.length; i++) {
		        var nv = parts[i].split('=');
		        if (!nv[0]) continue;
		        params[nv[0]] = nv[1] || true;
		    }
		    return params;
	  	}

	    /* Export object
	    /============================================================================*/
	    return {
	    	init: init,
	        add: add,
	        go: go
	    }
	});
})(App);
