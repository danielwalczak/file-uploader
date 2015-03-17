(function(App){
	'use strict';

	App.ctrls.imageCtrl = function(state, el){
		var storage = new App.Storage();

		var img, link;

		// create back link
		link = document.createElement('a');
		link.href = '#/';
		link.innerText = 'go back';
		link.style.display = 'block';
		link.style.marginBottom = '15px';
		// append link to view
		el.appendChild(link);

		if(state.params && state.params.name){
			img = new Image();
			// get img src from storage object
			img.src = storage.getByName(state.params.name)['img'];
			el.appendChild(img);
		}

	}
})(App);
