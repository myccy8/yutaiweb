/**
 * Created by BillLin on 2015/5/4.
 */
'use strict';
var AppDispatcher = require('../dispatcher/appDispatcher');
var HomeConstants = require('../constants/homeConstants');
var EventEmitter = require('events').EventEmitter;
var Service = require('../services/commonService');
var assign = require('object-assign');
var indexImages = {}, categoryItems;
function getIndex(callback){
    Service.request('api/home/homeimage','GET',{},(data)=>{
        indexImages=data;
        if(callback){
            callback();
        }
    });
}
function getCategoryItems(callback,name){
    Service.request('api/home/getcategoryItems','Post',{name:name},(data)=>{
        categoryItems=data;
        if(callback){
            callback();
        }
    });
}
var HomeStore = assign({}, EventEmitter.prototype, {
    getIndexImage() {
       return  indexImages;
    },
    getCategoryItems(){
        return  categoryItems;
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
        case HomeConstants.GET_CATEGORY_ITEMS:
            getCategoryItems(()=>HomeStore.emitChange('getcategoryitems'),action.name);
            break;
    }
});
module.exports = HomeStore;
