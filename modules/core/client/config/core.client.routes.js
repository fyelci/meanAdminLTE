(function () {
  'use strict';

  angular
    .module('core.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function routeConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.rule(function ($injector, $location) {
      var path = $location.path();
      var hasTrailingSlash = path.length > 1 && path[path.length - 1] === '/';

      if (hasTrailingSlash) {
        // if last character is a slash, return the same url without the slash
        var newPath = path.substr(0, path.length - 1);
        $location.replace().path(newPath);
      }
    });

    // Redirect to 404 when route not found
    $urlRouterProvider.otherwise(function ($injector, $location) {
      $injector.get('$state').transitionTo('not-found', null, {
        location: false
      });
    });

    $stateProvider
      .state('main', {
        abstract: true,
        views: {
          'mainMenu': {
            templateUrl: '/modules/core/client/views/header.client.view.html',
            controller: 'HeaderController',
            controllerAs: 'vm'
          },
          '': {},
          'footer': {
            templateUrl: '/modules/core/client/views/footer.client.view.html',
            controller: 'FooterController',
            controllerAs: 'vm'
          }
        }
      })
      .state('home', {
        parent: 'main',
        url: '/',
        'views' : {
          '@': {
            templateUrl: '/modules/core/client/views/home.client.view.html',
            controller: 'HomeController',
            controllerAs: 'vm'
          }
        }
      })
      .state('not-found', {
        parent: 'main',
        url: '/not-found',
        'views' : {
          '@': {
            templateUrl: '/modules/core/client/views/404.client.view.html',
            controller: 'ErrorController',
            controllerAs: 'vm'
          }
        },
        params: {
          message: function($stateParams) {
            return $stateParams.message;
          }
        },
        data: {
          ignoreState: true,
          pageTitle: 'Not Found'
        }
      })
      .state('bad-request', {
        parent: 'main',
        url: '/bad-request',
        'views' : {
          '@': {
            templateUrl: '/modules/core/client/views/400.client.view.html',
            controller: 'ErrorController',
            controllerAs: 'vm'
          }
        },
        params: {
          message: function($stateParams) {
            return $stateParams.message;
          }
        },
        data: {
          ignoreState: true,
          pageTitle: 'Bad Request'
        }
      })
      .state('forbidden', {
        parent: 'main',
        url: '/forbidden',
        'views' : {
          '@': {
            templateUrl: '/modules/core/client/views/403.client.view.html'
          }
        },
        data: {
          ignoreState: true,
          pageTitle: 'Forbidden'
        }
      });
  }
}());
