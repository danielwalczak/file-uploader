(function(App){
	'use strict';

	var appEl = document.getElementById('app');

	var R = new App.Router();


	R.add({
			url: '/',
			html: '<h3>Upload file</h3>',
			ctrl: 'indexCtrl'
		})
		.add({
			url: '/photo',
			html: '<h3>Image</h3>',
			ctrl: 'imageCtrl'
		});

	R.init(appEl);
})(App);