var twitchTvApp = angular
  .module("twitchTvApp", [])
  .config(function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist(["**"]);
  });

twitchTvApp.controller("twitchTvCtrl", function($scope, $http, $templateCache) {
  var twitchTvLinkBase = "https://www.twitch.tv/";
  $scope.channels = [
    {
      name: "freecodecamp"
    },
    {
      name: "terakilobyte"
    },
    {
      name: "habathcx"
    },
    {
      name: "RobotCaleb"
    },
    {
      name: "noobs2ninjas"
    },
    {
      name: "beohoff"
    },
    {
      name: "brunofin"
    },
    {
      name: "comster404"
    },
    {
      name: "ogamingsc2"
    }
  ];
  
  angular.forEach($scope.channels, function(value, key) {
    debugger;
    var twitchTvApiUrl =
      "https://wind-bow.gomix.me/twitch-api/streams/" + value.name;
    $.getJSON(twitchTvApiUrl + "?callback=?", function(data) {
      console.log(data);
      var channels = angular.copy($scope.channels);
      if (data.error) {
        channels[key].status = data.message;
      } else if (data.stream == null) {
        channels[key].link = twitchTvLinkBase + $scope.channels[key].name;
        channels[key].status = "Offline";
      } else {
        channels[key].online = true;
        channels[key].link = twitchTvLinkBase + data.stream.channel.name;
        channels[key].status = data.stream.channel.status;
        channels[key].name = data.stream.channel.display_name;
      }
      $scope.channels = angular.copy(channels);
      console.log($scope.channels);
      $scope.$apply();
    });
  });
});