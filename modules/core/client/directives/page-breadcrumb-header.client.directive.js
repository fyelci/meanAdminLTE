(function () {
  'use strict';

  angular.module('core')
    .directive('pageBreadcrumbHeader', pageBreadcrumbHeaderFn);

  pageBreadcrumbHeaderFn.$inject = ['$rootScope', '$interpolate', '$state'];

  function pageBreadcrumbHeaderFn($rootScope, $interpolate, $state) {
    var directive = {
      restrict: 'E',
      templateUrl: '/modules/core/client/views/page-breadcrumb-header.client.view.html',
      controller: 'PageBreadcrumbHeaderController',
      controllerAs: 'vm',
      bindToController: {
        header: '=?'
      },
      link: link
    };

    return directive;

    function link(scope, element) {
      $rootScope.$on('$stateChangeSuccess', listener);

      function listener(event, toState) {
        var applicationCoreTitle = 'Home',
          separeteBy = ' / ';
        // if (toState.data && toState.data.pageTitle) {
        //   var stateTitle = $interpolate(toState.data.pageTitle)($state.$current.locals.globals);
        //   element.html(applicationCoreTitle + separeteBy + stateTitle);
        // } else {
        //   element.html(applicationCoreTitle);
        // }
      }
    }
  }
}());
