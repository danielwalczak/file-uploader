(function(App){
	'use strict';

	App.ctrls.indexCtrl = function(state, el){
		// create files uploader
		var file, imageList, storage;

		file = new App.FileUp({onChange: afterFileInput})
		// add to view
		el.appendChild(file.el);
		
		// create image list container
		imageList = document.createElement('DIV');
		el.appendChild(imageList);
		
		// init storage
		storage = new App.Storage();
		// display all images
		imageList.innerHTML = createImages(storage.getAll()).innerHTML;
		// imageList.addEventListener('click', function(e) {
		// 	e.preventDefault();
		// 	if (event.target.tagName.toLowerCase() === 'img') {
		// 		console.log('click')
		// 	}
		// 	else if(event.target.tagName.toLowerCase() === 'a'){

		// 	}
		// });

		function afterFileInput(files){
			var newObjs = [];
			for(var i=0,len=files.length; i<len; i++){
				storage
					.add({
						name: files[i].name,
						img: files[i].img.src,
						thumb: createThumbnail(files[i].img)
					}, function(storeObj){
						newObjs.push(storeObj);
					});
			}
			// display new elements
			// appendNewNodes(createImages(newObjs).childNodes);
			if(newObjs.length > 0){
				imageList.innerHTML = createImages(newObjs).innerHTML + imageList.innerHTML
			}
		}

		function createImages(images){
			var node = document.createElement('DIV'),
				link, image;

			for(var key in images){
				// create anchor
				link = document.createElement('A');
				link.setAttribute('href', '#/photo?name='+images[key].name);
				// create img
				image = new Image();
				image.src = images[key].thumb;

				link.appendChild(image);
				node.appendChild(link);
			}

			// add to our container
			return node;
		}

		// function appendNewNodes(nodes){
		// 	console.log(nodes)
		// 	for(var i=0,len=nodes.length; i<len; i++){
		// 		imageList.appendChild(nodes[i])
		// 	}
		// }

		function createThumbnail(img){
			var canvas, ctx, dataUrl;
			canvas = document.createElement('CANVAS');
			canvas.width = 150;
			canvas.height = 150;

		    ctx = canvas.getContext('2d');
	        ctx.drawImage(img, 0, 0, 150,150);
	        dataUrl = canvas.toDataURL();

	        return dataUrl;
		}
	}
})(App);