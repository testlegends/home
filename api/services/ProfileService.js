/**
 * ProfileService
 *
 * @module      :: Service
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/05/08
 */

var Q = require('q');

module.exports = (function(){

    function profile (userId, render) {
        var result = { userId: userId };

        getUser(result)
            .then(getAppsAuthorizedId)
            .then(getAppsAuthorized)
            .then(getAppsCreated)
            .then(render)
            .done();
    }

    function getUser (result) {
        var deferred = Q.defer();

        User.findOne({
            id: result.userId
        }).done(function(err, user){
            result.user = user;
            deferred.resolve(result);
        });

        return deferred.promise;
    }

    function getAppsAuthorizedId (result) {
        var deferred = Q.defer();

        AuthCode.find({
            userId: result.userId
        }).done(function(err, codes){
            // TODO get latest auth code (last accessed)
            result.clientIds = _.uniq(_.pluck(codes, 'clientId'));
            deferred.resolve(result);
        });

        return deferred.promise;
    }

    function getAppsAuthorized (result) {
        var deferred = Q.defer();

        Client.find({
            id: result.clientIds
        }).done(function(err, apps) {
            result.appsAuthorized = apps;
            deferred.resolve(result);
        });

        return deferred.promise;
    }

    function getAppsCreated (result) {
        var deferred = Q.defer();

        Client.find({
            userId: result.userId
        }).done(function(err, apps) {
            result.appsCreated = apps;
            deferred.resolve(result);
        });

        return deferred.promise;
    }

    return {
        get: profile
        // TODO revoke access, update created apps etc.
    };

})();
