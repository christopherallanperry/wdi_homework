angular
  .module('allCycles')
  .controller('CyclesIndexCtrl', CyclesIndexCtrl);

CyclesIndexCtrl.$inject = ['$http'];

function CyclesIndexCtrl($http) {
  const vm = this;
  // vm.users = 'Hello';
  $http
    .get('http://localhost:3000/api/cycles')
    .then(response => {
      vm.cycles = response.data;
    });
}
