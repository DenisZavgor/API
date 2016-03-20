(function () {
  'use strict';

  angular
    .module('levelUpAngular')
    .service('toDoModel', ToDoModel);

function ToDoModel($http, $q){
	console.log('hello');
	var items = [];

	this.getAllItems = function(){
		return $http({
		method:'GET',
		url:'http://localhost:4001/fruites'
	}).then(function (response){
		return response.data;
	}, function(reject){
      console.log(reject);
	});
};
//---------------------------------------------
	this.sendData = function(newData){
		return $http({
		method:'POST',
		url:'http://localhost:4001/fruites',
		data: {fruite: newData}
	}).then(function (response){
		return response.data;
	}, function(reject){
		console.log(reject);
	})
	};
//-----------------------------------------------
	this.dellData = function(id){
		return $http({
		method:'DELETE',
		url:'http://localhost:4001/fruites/'+id,
		}).then(function (response){
		return response.data;
	}, function(reject){
		console.log(reject);
	})
	};


}

})();