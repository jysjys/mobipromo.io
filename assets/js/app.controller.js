"use strict";


angular.module("mobipromo").controller("SignUpController", ["$scope", "MainRemoteResource", "$state","md5", function($scope, MainRemoteResource, $state, md5) {
    $scope.signUpModel = {
        data:{
        },
        action:{
        }
    };
    var model = $scope.signUpModel;
    model.action.signUp = function signUp(signUpData){
        var singUp = {
            account: signUpData.account,
            email: signUpData.email,
            password: md5.createHash(signUp.password.trim())
        };
        console.log(JSON.stringify(signUp));
        $state.go("app.signup");
    };
}]).controller("ContentController", ["$scope", function($scope) {
}]).controller("IcoController", ["$scope", function($scope) {
    $scope.icoModel = {
        data:{},
        display:{
        },
        action:{
        }
    };
    var model = $scope.icoModel;
    model.action.getAccountIcoProcess = function getAccountIcoProcess(){
        var accountIco = {
            ico:[
                {
                    bankType:'eth',
                    amount: 2,
                    address: '0xa2eF9863F9bd037bfA2b645aCe5968c822641D46'
                },{
                    bankType:"btc",
                    amount: 1,
                    address: "1HwtQCDGktHgJX3LTjf132GAFoWgyY​Esdw"
                },{
                    bankType:"acc",
                    amount: 32000,
                    address: "0xa2eF9863F9bd037bfA2b645aCe5968c822641D46"
                }
            ]
        };
        var ico = {};
        for(var index = 0; index < accountIco.ico.length; ++index){
            var icoItem = accountIco.ico[index];
            switch (icoItem.bankType) {
                case 'eth':
                ico.eth = icoItem;
                break;
                case 'btc':
                ico.btc = icoItem;
                break;
                case 'acc':
                ico.acc = icoItem;
                break;
            }
        }
        model.data.ico = ico;
    };

    model.action.getAccountIcoProcess();
}]).controller("LoginController", ["$scope", "$rootScope", "MainRemoteResource", "$state","md5", function($scope, $rootScope, MainRemoteResource, $state, md5){
    $scope.signinModel = {
        loading: 0,
        account: '',
        password: ''
    };
    $scope.display = {};
    $scope.validSignInInfo = function validSignInInfo(){
        var infoIsValid = $scope.signinModel.account && $scope.signinModel.password;
        infoIsValid = infoIsValid && !$scope.signinModel.loading;
        return infoIsValid;
    };
    $scope.signin = function signIn(){
        var credentials = {
            username: $scope.signinModel.account,
            password: md5.createHash($scope.signinModel.password)
        };
        $scope.signinModel.loading++;
        MainRemoteResource.getToken(credentials).then(function(success){
            $state.go('app.subscribelist');
            $scope.signinModel.loading--;
            $scope.display.error = undefined;
        }).catch(function(error){
            console.log(error);
            $scope.signinModel.loading--;
            if(error && error.data && error.data.code){
                $scope.display.error = error.data;
            };
        });
    };
    $rootScope.icoEnv = {
        couldLogin:true,
        couldLogout:false,
        couldList:false,
        couldSubscribe:false
    };
}]);
