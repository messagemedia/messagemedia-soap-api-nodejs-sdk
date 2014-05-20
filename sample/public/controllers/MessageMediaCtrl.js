angular.module('messageMedia', []);

function MessageMediaCtrl($scope, $http, $window, $timeout) {

  // Initialise scope
  $scope.showDebug = true;
  $scope.selectedOperation = 'checkUser';
  $scope.loading = false;
  $scope.apiRequest = {
    userId : "",
    password : ""
  };
  $scope.apiResponse = {};

  // Statistics
  $scope.stats = {};
  $scope.stats.currTransTime = {
    'timeoutObj' : null,
    'runningTime' : null,
    'startTime' : null
  };

  if (sessionStorage.rememberAuth === 'true') {
    $scope.apiRequest.userId = sessionStorage.userId;
    $scope.apiRequest.password = sessionStorage.password;
    $scope.rememberAuth = true;
  }

  $scope.$watch('apiRequest.userId', function() {
    if (!sessionStorage.rememberAuth) {
      return;
    }
    sessionStorage.userId = $scope.apiRequest.userId;
  });

  $scope.$watch('apiRequest.password', function() {
    if (!sessionStorage.rememberAuth) {
      return;
    }
    sessionStorage.password = $scope.apiRequest.password;
  });

  $scope.resetAuth = function() {
    if (!$scope.rememberAuth) {
      sessionStorage.userId = "";
      sessionStorage.password = "";
      sessionStorage.rememberAuth = false;
    } else {
      sessionStorage.userId = $scope.apiRequest.userId;
      sessionStorage.password = $scope.apiRequest.password;
      sessionStorage.rememberAuth = true;
    }
  }

  $scope.submit = function() {
    if ($scope.loading) {
      return;
    }

    $scope.stats.currTransTime.startTime = new Date();
    $scope.stats.currTransTime.timeoutObj = $timeout(function() {
      $scope.stats.currTransTime.runningTime = (new Date())
          - $scope.stats.currTransTime.startTime;
    }, 250);

    $scope.loading = true;
    $http.post('/api/' + $scope.selectedOperation, $scope.apiRequest).success(
        function(data, status, headers, config) {
          $timeout.cancel($scope.stats.currTransTime.timeoutObj);
          $scope.stats.currTransTime.runningTime = (new Date())
              - $scope.stats.currTransTime.startTime;
          // this callback will be called asynchronously
          // when the response is available
          $scope.apiResponse = data;
          $scope.loading = false;
        }).error(
        function(data, status, headers, config) {
          $timeout.cancel($scope.stats.currTransTime.timeoutObj);
          $scope.stats.currTransTime.runningTime = (new Date())
              - $scope.stats.currTransTime.startTime;
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          $window.alert("Request Failed.");
          $scope.loading = false;
        });
  };

  $scope.resetRequest = function() {
    $scope.apiRequest = {
      userId : $scope.apiRequest.userId,
      password : $scope.apiRequest.password
    };
  };

  $scope.resetResponse = function() {
    $scope.apiResponse = {};
  };

  $scope.resetStats = function() {
    $scope.stats.currTransTime = {};
  };
}