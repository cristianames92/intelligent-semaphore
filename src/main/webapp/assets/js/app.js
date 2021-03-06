var app = angular.module('app', ['ngRoute','ngResource']);

app.run(['$rootScope','$interval',
    function($rootScope,$interval) {
        $rootScope.cargandoHttp=true;
        //$rootScope.splashes = splashes;
    }]);

app.config(function($routeProvider, $locationProvider, $httpProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider

        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'mainController'
        })

        .when('/app/bienvenida', {
            templateUrl: 'views/bienvenida.html',
            controller: 'bienvenidaController'
        })

        .when('/app/login', {
            templateUrl: 'views/login.html',
            controller: 'loginController'
        })

        .when('/app/registro', {
            templateUrl: 'views/registro.html',
            controller: 'registroController'
        })

        .when('/app/passrecovery', {
            templateUrl: 'views/passrecovery.html',
            controller: 'passrecoveryController'
        })

        .when('/app/editor', {
            templateUrl: 'views/editor.html',
            controller: 'editorController'
        })

        .when('/app/editor/:id', {
            templateUrl: 'views/editor.html',
            controller: 'editorController'
        })

        .when('/app/galeria', {
            templateUrl: 'views/galeria.html',
            controller: 'galeriaController'
        })

        .when('/app/reproductor/:id', {
            templateUrl: 'views/reproductor.html',
            controller: 'reproductorController'
        })

        .when('/app/reproductor/', {
            templateUrl: 'views/reproductor.html',
            controller: 'reproductorController'
        });
});

app.factory("Mapa", ["$resource",function($resource){
    return  $resource("/_ah/api/intelligentsemaphore/v1/map/:id", null,
        {
            'query': { method:'GET', isArray: false }
        });
}]);

app.factory("MapaUpdate", ["$resource",function($resource){
    return  $resource("/_ah/api/intelligentsemaphore/v1/mapState", null,
        {
            'query': { method:'GET', isArray: false }
        });
}]);

