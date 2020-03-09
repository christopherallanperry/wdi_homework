angular
  .module('allCycles')
  .controller('CyclesEditCtrl', CyclesEditCtrl);

CyclesEditCtrl.$inject = ['$http', '$state', '$stateParams'];

function CyclesEditCtrl($http, $state, $stateParams) {
  const vm = this;
  $http
    .get(`http://localhost:3000/api/cycles/${$stateParams.id}`)
    .then(response => {
      // console.log(response.data);
      vm.cycle = response.data;
    });
  vm.update = () => {
    return $http
      .put(`http://localhost:3000/api/cycles/${$stateParams.id}`, vm.cycle)
      .then(response => {
        // console.log(response);
        $state.go('cyclesIndex');
      });
  };
}
