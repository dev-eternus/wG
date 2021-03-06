angular.module('nibs.claim', ['nibs.config'])

    // Routes
    .config(function ($stateProvider) {
        $stateProvider
            .state('app.claim', {
                url: "/claimform",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/claim.html",
                        controller: "ClaimController"
                    }
                }
            })
    })

    // Services
    .factory('Claim', function ($http, $rootScope) {
        return {
            create: function(theClaim) {
                return $http.post($rootScope.server.url + '/claims/', theClaim);
            }
        };
    })

    //Controllers
    .controller('ClaimController', function ($scope, $window, $ionicPopup, Claim, User) {
       

        $scope.claim = {};
        var wrapper = document.getElementById("signature-pad"),
        canvas = wrapper.querySelector("canvas"),
        signaturePad;
        function resizeCanvas() {
              var ratio = window.devicePixelRatio || 1;
              canvas.width = canvas.offsetWidth * ratio;
              canvas.height = canvas.offsetHeight * ratio;
              canvas.getContext("2d").scale(ratio, ratio);
        }

        window.onresize = resizeCanvas;
        resizeCanvas();
        signaturePad = new SignaturePad(canvas);
        
        $scope.clearSign=function(){
            signaturePad.clear();
        }
        
        $scope.submit = function () {
            
         if (signaturePad.isEmpty()) {
                  $ionicPopup.alert({title: 'Required', content: 'Please provide signature.'});
            }else {
                  var dataURL = signaturePad.toDataURL();
                  $scope.claim.signatureDataurl = dataURL;
                  Claim.create($scope.claim).success(function() {
                     $ionicPopup.alert({title: 'Thank You', content: 'Your Claim submitted successfully.'});
                     $scope.claim = {};
                     signaturePad.clear();
                });
            }
                
          
        };

    });
