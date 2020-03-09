angular
  .module('allCycles')
  .config(Router);

Router.$inject = [
  '$stateProvider',
  '$urlRouterProvider',
  '$locationProvider'
];

function Router($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('cyclesIndex', {
      url: '/cycles',
      templateUrl: '/js/views/cycles/index.html',
      controller: 'CyclesIndexCtrl as cyclesIndex'
    })
    .state('cyclesNew', {
      url: '/cycles/new',
      templateUrl: '/js/views/cycles/new.html',
      controller: 'CyclesNewCtrl as cyclesNew'
    })
    .state('cyclesEdit', {
      url: '/cycles/edit/:id',
      templateUrl: '/js/views/cycles/edit.html',
      controller: 'CyclesEditCtrl as cyclesEdit'
    })
    .state('cyclesShow', {
      url: '/cycles/show/:id',
      templateUrl: 'js/views/cycles/show.html',
      controller: 'CyclesShowCtrl as cyclesShow'
    })
    .state('cyclesDelete', {
      url: '/cycles/delete/:id',
      controller: 'CyclesDeleteCtrl as cyclesDelete'
    });

  $urlRouterProvider.otherwise('/cycles');
}
