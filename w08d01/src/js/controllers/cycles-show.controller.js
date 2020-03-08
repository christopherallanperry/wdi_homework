angular
  .module('allCycles')
  .controller('CyclesShowCtrl', CyclesShowCtrl);

CyclesShowCtrl.$inject = ['$http', '$state', '$stateParams'];

function CyclesShowCtrl($http, $state, $stateParams) {
  const vm = this;
  $http
    .get(`http://localhost:3000/api/cycles/${$stateParams.id}`)
    .then(response => {
      console.log(response.data);
      vm.cycle = response.data;
    });
}
