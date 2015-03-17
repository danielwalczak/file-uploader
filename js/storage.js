(function(App){
    'use strict';

    // Factory wchich is singleton 
    App.Storage = (function() {

        // do we have an existing instance?
        if (typeof Storage.instance === 'object') {
            return Storage.instance;
        }


        var storage = function (){
            var items;

            items = JSON.parse(localStorage.getItem('images')) || {};

            // add to colection
            function addSingleItem(obj, callback){
                // add if doesn't exist 
                if(!items.hasOwnProperty(obj.name)){
                    items[obj.name] = obj;
                    // immediately tell that we add this
                    callback(obj);
                    // image cant be to large for localstorage
                    try{
                        save();
                    } catch(e){
                        alert('image cant be saved');
                    }
                }
                else {
                    return;
                }
            }

            function save(){
                localStorage.setItem('images', JSON.stringify(items));
            }

            function getByName(name){
                if(items.hasOwnProperty(name)){
                    return(items[name])
                }
            }

            function getAll(){
                return items;
            }

            return {
                getByName: getByName,
                getAll: getAll,
                add: addSingleItem
            }
        };

        // cache
        Storage.instance = new storage();

        /* Export object
        /============================================================================*/
        return Storage.instance;
    });
})(App);