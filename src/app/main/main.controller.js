(function () {
  'use strict';

  angular
    .module('levelUpAngular')
    .controller('MainController', MainController);


  function MainController($scope, $filter, toDoModel) {
    var vm = this;

    vm.items = [];

    toDoModel.getAllItems()
    .then(function(response){
      vm.items = response;
    }, function (reject){
      console.log(reject);
    });



     //toDoModel.sendData({name:'test', completed:true});
    //  .then(function(response){
    //   vm.items = response;
    // }, function (reject){
    //   console.log(reject);
    // });

    vm.statusFilter = {};
    vm.newTodo = null;
    vm.date = Date.now();
    vm.status = '';

    $scope.$watch(function () {
      return vm.items;
    }, function () {
      vm.remainingCount = $filter('filter')(vm.items, { completed: false }).length;
      vm.completedCount = vm.items.length - vm.remainingCount;
      vm.allCompleted = !vm.remainingCount;
    }, true);


    vm.addItem = function () {
      var model = {
        name: vm.newTodo,
        completed: false,
        id: generateId()
      };

      vm.items.push(model);
//--------------------------------------
      // vm.items.Data(model);
      toDoModel.sendData(model)
        .then(function(response){
          vm.items = response;
        }, function (reject){
          console.log(reject);
        });
//--------------------------------------
      vm.newTodo = null;
    };

    vm.deleteItem = function (item) {
      toDoModel.dellData(vm.items.indexOf(item))
        .then(function(response){
          vm.items = response;
        }, function (reject){
          console.log("Service enable");
        });

    };

    vm.toggleCompleted = function () {
      vm.remainingCount = toCountComleted();
    };

    vm.changeFilter = function (filter) {//active, completed, ili pusto
      vm.status = filter;

      vm.statusFilter = (vm.status === 'active')
        ? { completed: false }
        : (vm.status === 'completed')
        ? { completed: true }
        : {};
    };

    vm.markAll = function (completed) {
      completed = !completed;
      vm.items.forEach(function (item) {
        if (item.completed !== completed) {
          item.completed = completed;

        }
        vm.toggleCompleted();
      });
    };

    vm.clearCompleted = function () {
      vm.items = vm.items.filter(function (item) {
        return !item.completed;
      })
    };

    function generateId() {
      return Math.floor((1 + Math.random()) * 0x10000);
    }

    function toCountComleted () {
     return $filter('filter')(vm.items, { completed: false }).length;
    }
  }
})();
