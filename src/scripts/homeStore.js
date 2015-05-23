/**
 * Created by BillLin on 2015/5/4.
 */
'use strict';
var AppDispatcher = require('dispatcher/appDispatcher');
var HomeConstants = require('constants/homeConstants');
var EventEmitter = require('events').EventEmitter;
var Service = require('services/commonService');
var assign = require('object-assign');
var indexImages = {};
function getIndex(callback){
    Service.request('api/homeimage','GET',{},(data)=>{

        alert(data);
    });
}
var HomeStore = assign({}, EventEmitter.prototype, {
    getIndexImage() {
       return  indexImages;
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
        case HomeConstants.GET_INDEX:
            getIndex(()=>HomeStore.emitChange('getindex'));
            break;
    }
});
module.exports = HomeStore;
