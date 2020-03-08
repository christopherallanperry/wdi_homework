angular
  .module('allCycles')
  .controller('CyclesDeleteCtrl', CyclesDeleteCtrl);

CyclesDeleteCtrl.$inject = ['$http', '$state', '$stateParams'];

function CyclesDeleteCtrl($http, $state, $stateParams) {
  return $http
    .delete(`http://localhost:3000/api/cycles/${$stateParams.id}`)
    .then(() => {
      $state.go('cyclesIndex');
    });
}
