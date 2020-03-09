angular
  .module('allCycles')
  .controller('CyclesNewCtrl', CyclesNewCtrl);

CyclesNewCtrl.$inject = ['$http', '$state'];

function CyclesNewCtrl($http, $state) {
  const vm = this;
  vm.create = () => {
    return $http
      .post('http://localhost:3000/api/cycles', vm.cycle)
      .then(response => {
        $state.go('cyclesIndex');
      });
  };
}
