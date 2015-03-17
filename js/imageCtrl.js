(function(App){
	'use strict';

	App.ctrls.imageCtrl = function(state, el){
		var storage = new App.Storage();

		var img;

		if(state.params && state.params.name){
			img = new Image();
			// get img src from storage object
			img.src = storage.getByName(state.params.name)['img'];
			el.appendChild(img);
		}

	}
})(App);
