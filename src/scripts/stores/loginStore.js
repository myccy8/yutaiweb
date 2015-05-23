/**
 * Created by BillLin on 2015/5/4.
 */
'use strict';
var AppDispatcher = require('../dispatcher/appDispatcher');
var LoginConstants = require('../constants/homeConstants');
var EventEmitter = require('events').EventEmitter;
var Service = require('../services/commonService');
var assign = require('object-assign');
var tokenTemp = {};
function saveToken(token, callback) {
    Service.saveToken(token);
    tokenTemp = {token: token.authToken, userName: token.userName};
    if (callback) {
        callback();
    }
}
function removeToken(callback) {
    Service.removeToken();
    tokenTemp = {};
    if (callback) {
        callback();
    }
}
var LoginStore = assign({}, EventEmitter.prototype, {
    getToken() {
        if (!tokenTemp.token) {
            tokenTemp.token = Service.loadCookie('token');
        }
        return tokenTemp.token;
    },
    getUserName() {
        if (!tokenTemp.userName) {
            tokenTemp.userName = Service.loadCookie('userName');
        }
        return tokenTemp.userName;
    },
    emitChange(e) {
        this.emit(e);
    },
    bind(name, callback) {
        this.on(name, callback);
    },
    off(name, callback) {
        this.removeListener(name, callback);
    }
});
AppDispatcher.register(function (action) {
    switch (action.actionType) {
        case LoginConstants.LOGIN_SAVE_TOKEN:
            saveToken(action.token, function () {
                LoginStore.emitChange('saveToken');
            });
            break;
        case  LoginConstants.LOGOUT_REMOVE_TOKEN:
            removeToken(function () {
                LoginStore.emitChange('removeToken');
            });
            break;
    }
});
module.exports = LoginStore;
