"use strict";


angular.module("mobipromo").controller("SignUpController", ["$scope", "MainRemoteResource", "$state","md5", function($scope, MainRemoteResource, $state, md5) {
    $scope.signUpModel = {
        data:{
            loading: 0
        },
        action:{
        }
    };

    $scope.countries = [
        {name:'中国',id:'cn'},
        {name:'中国香港',id:'hk'},
        {name:'其他国家',id:'other'}];
    
    var model = $scope.signUpModel;
    model.action.signUp = function signUp(signUpData){
        
        var signUp = {
            account: signUpData.account,
            email: signUpData.email,
            password: md5.createHash((signUpData.password || "").trim()),
            accountType:"email",
            firstName:signUpData.firstName,
            lastName:signUpData.lastName,
            country:signUpData.country,
            idCardNumber:signUpData.idCardNumber,
            phone:signUpData.phone
        };
        console.log(JSON.stringify(signUp));
        $scope.signUpModel.data.loading++;
        MainRemoteResource.accountResource.signUpAccount({}, signUp).$promise.then(function(success){
            $state.go('app.signin');
            $scope.signUpModel.data.loading--;
        }).catch(function(error){
            console.log(error);
            $scope.signUpModel.data.loading--;
            if(error && error.data && error.data.code){
                $scope.display.error = error.data;
            };
        });
    };
    model.action.validate = function validate(){
        let isOk = model.data.account && model.data.account.trim().length> 5;//account ok
        isOk = isOk && model.data.email; //email ok
        isOk = isOk && model.data.password && model.data.password.trim().length > 8;//&& model.data.password == model.data.confirm;// password ok;
        return isOk;
    };
}]).controller("ContentController", ["$scope", function($scope) {
}]).controller("IcoController", ["$scope", "MainRemoteResource", "$state", function($scope, MainRemoteResource, $state) {
    $scope.icoModel = {
        data:{},
        display:{
        },
        action:{
        }
    };
    var model = $scope.icoModel;

    model.action.getAccountIcoProcess = function getAccountIcoProcess(){
        MainRemoteResource.accountResource.getAccountIco().$promise.then(function(success){
            var accountIco = success.data;
            var ico = {};
            for(var index = 0; index < accountIco.length; ++index){
                var icoItem = accountIco[index];
                switch (icoItem.bankType) {
                    case 'ETH':
                    ico.eth = icoItem;
                    break;
                    case 'BTC':
                    ico.btc = icoItem;
                    break;
                    case 'acc':
                    ico.acc = icoItem;
                    break;
                }
            }
            model.data = ico;
            // alert(model.data.btc.bankAddress);
        }).catch(function(error){
            console.log(error);
            $state.go('app.signin');
        })
    };

    model.action.getAccountIcoProcess();
}]).controller("LoginController", ["$scope", "$rootScope", "MainRemoteResource", "$state","md5", function($scope, $rootScope, MainRemoteResource, $state, md5){
    $scope.signinModel = {
        data:{
            loading: 0,
            account: '',
            password: ''
        }
    };
    $scope.display = {};
    $scope.validSignInInfo = function validSignInInfo(){
        var infoIsValid = $scope.signinModel.data.account && $scope.signinModeldata.data.password;
        infoIsValid = infoIsValid && !$scope.signinModel.data.loading;
        return infoIsValid;
    };
    $scope.gotoSignUp = function gotoSignUp(){
        $state.go('app.signup');
    }
    $scope.signIn = function signIn(){
        var credentials = {
            username: $scope.signinModel.data.account,
            password: md5.createHash($scope.signinModel.data.password)
        };
        $scope.signinModel.data.loading++;
        MainRemoteResource.getToken(credentials).then(function(success){
            $state.go('app.ico');
            $scope.signinModel.data.loading--;
            $scope.display.error = undefined;
        }).catch(function(error){
            console.log(error);
            $scope.signinModel.data.loading--;
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
