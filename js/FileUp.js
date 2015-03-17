(function(App){
	'use strict';

	// App library returned from closure
	App.FileUp = (function(settings) {
		var fileUpEl, onChange;

		if(settings.hasOwnProperty('onChange') === true){
			onChange = settings.onChange;
		}

		// create container for inputs
		fileUpEl = document.createElement('DIV');
		fileUpEl.appendChild(createFileInput());
		fileUpEl.appendChild(createDropZone());

		// <input type="file" name="files[]" multiple />
		function createFileInput(){
			var file = document.createElement('INPUT');

			file.setAttribute('type', 'file');
			file.setAttribute('name', 'files[]');
			file.setAttribute('multiple', '');

			// Setup the change listeners.
			file.addEventListener('change', handleFileSelect, false);
			return file;
		}

		// <div id="drop_zone">Drop files here</div>
		function createDropZone(){
			var dropZone = document.createElement('DIV');
			dropZone.setAttribute('id', 'drop-zone');
			dropZone.textContent = 'Drop files here';

			// Setup the DragAndDrop listeners.
			dropZone.addEventListener('dragover', handleDragOver, false);
			dropZone.addEventListener('drop', handleFileSelect, false);
			return dropZone;
		}

		function handleFileSelect(e) {
		    e.stopPropagation();
		    e.preventDefault();

		    var files = e.target.files || e.dataTransfer.files, // FileList object
		    	images = [],
		    	counter = 0;

		    // files is a FileList of File objects. List some properties.
		    var output = [];
		    for (var i = 0, f; f = files[i]; i++) {
		    	readImage(f)
			    	.then(function(image){
		    			images.push(image);
		    			counter++;
		    			if(counter === files.length){
						    onChange && onChange(images);
		    			}
		    		},function(){
		    			counter++;
		    			if(counter === files.length){
						    onChange && onChange(images);
		    			}
		    		});
		    }

		}

		function readImage(file) {
	  		return new Promise(function(resolve, reject){
			    var reader = new FileReader();

			    reader.readAsDataURL(file);
			    reader.onload = function(_file) {
				    var image  = new Image();
			        image.src    = _file.target.result; // url.createObjectURL(file);
			        image.onload = function() {
			            var w = this.width,
			                h = this.height,
			                t = file.type, // ext only: // file.type.split('/')[1],
			                n = file.name,
			                s = ~~(file.size/1024) +'KB';
			            resolve({
			            	name: file.name,
			            	img: image
			            });
			            // $('#uploadPreview').append('<img src="'+ this.src +'"> '+w+'x'+h+' '+s+' '+t+' '+n+'<br>');
			        };
			        image.onerror= function() {
			        	reject('error '+ file.type)
			            alert('Invalid file type: '+ file.type);
			        };
				};
	  		});
	    };

	     function handleDragOver(e) {
			e.stopPropagation();
			e.preventDefault();
			e.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
		}

		return {
			el: fileUpEl
		}
	});
})(App);
