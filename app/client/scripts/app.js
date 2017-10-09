"use strict";

/**
 * @ngdoc overview
 * @name myApp
 * @description
 * # myApp
 *
 * Main module of the application.
 */
angular
  .module("myApp", [
    "ngAnimate",
    "ngResource",
    "ngRoute",
    "ngSanitize"
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "app/client/views/map.html",
        controller: "MapCtrl",
        controllerAs: "map"
      })
      .otherwise({
        redirectTo: "/"
      });
  });