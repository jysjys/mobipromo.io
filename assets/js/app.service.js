"ues strict";

var mobi = angular.module("mobipromo");

mobi.service("MainRemoteResource",["$resource", "$http",'ULStorageService', '$q','HttpBuffer', function($resource, $http, ULStorageService, $q, HttpBuffer) {
    return {
        accountResource: $resource("/app/signup/:accountId", {},{
            signUpAccount: { method:"POST", isArray:false },
            resetPassword: { method:"PUT", params:{accountId:-1}, isArray:false }
        })
    };
}]).factory('AuthTokenInterceptor',["ULStorageService", "$q","HttpBuffer", "$rootScope", function(ULStorageService, $q, HttpBuffer, $rootScope){
    return {
        request: function(config){
            config.headers = config.headers || {};
            var token = ULStorageService.get('token');
            var needToken = config.url.indexOf("wifiauth/authed") > -1;
            if(needToken){
                config.headers.Authorization = 'Bearer ' + (token && token.access_token);
            }
            return config;
        },
        responseError: function(response){
            var config = response.config || {};
            var errorMsg = response.data && response.data.error ? response.data.error.toLowerCase() : '';
            switch (response.status) {
            case 401:
                if(ULStorageService.hasValidRefreshToken()) {
                    var deferred = $q.defer();
                    HttpBuffer.append(config, deferred);
                    $rootScope.$broadcast('event:auth-refreshToken', response);
                    return deferred.promise;
                }else{
                    ULStorageService.remove("token");
                    $rootScope.$broadcast('event:auth-loginRequired', response);
                };
                return $q.reject(response);
            case 403:
                $rootScope.$broadcast('event:auth-forbidden', response);
                break;
            }
            return $q.reject(response);
        }
    };
}]).factory('ULStorageService', ["localStorageService", function(localStorageService){
    return {
        get: function(key){
            return localStorageService.get(key);
        },
        set: function(key, obj){
            return localStorageService.set(key, obj);
        },
        remove: function(key){
            return localStorageService.remove(key);
        },
        hasValidRefreshToken: function(){
            var token = this.getToken();
            return token && token.expires_at && token.expires_at > new Date().getTime();
        },
        getToken: function(){
            return this.get('token');
        }
    };
}]).factory("HttpBuffer", ["$injector", function($injector){
    var buffer = [];

    function retryHttpRequest(config, deferred, $http) {
        function successCallback(response) {
            deferred.resolve(response);
        };
        function errorCallback(response) {
            deferred.reject(response);
        };
        $http && $http(config).then(successCallback, errorCallback);
    }

    return {
        append: function(config, deferred) {
            buffer.push({
                config: config,
                deferred: deferred
            });
        },
        rejectAll: function(reason) {
            if (reason) {
                for (var i = 0; i < buffer.length; ++i) {
                    buffer[i].deferred.reject(reason);
                }
            }
            buffer.length = 0;
        },
        retryAll: function(updater, $http) {
            for (var i = 0; i < buffer.length; ++i) {
                retryHttpRequest((updater && updater(buffer[i].config)) || buffer[i].config, buffer[i].deferred, $http);
            }
            buffer.length = 0;
        }
    };
    
}]);

