/**
 * Created by BillLin on 2015/5/4.
 */
'use strict';
var AppDispatcher = require('../dispatcher/appDispatcher');
var HomeConstants = require('../constants/homeConstants');
var EventEmitter = require('events').EventEmitter;
var Service = require('../services/commonService');
var assign = require('object-assign');
var indexImages, categoryItems,articles={};
function getIndex(callback){
    if(indexImages){
        if(callback){
            callback();
        }
    }else{
        Service.request('api/home/homeimage','GET',{},(data)=>{
            indexImages=data;
            if(callback){
                callback();
            }
        });
    }
}
function getArticles(categoryId,id,index,callback){
    if (!articles[id] || !articles[id][index]) {
        Service.request('api/home/getarticles', 'POST', {id:id,categoryId:categoryId,index:index,size:5}, function (data) {
            var result = data.articles;
            if (!articles[id]) {
                articles[id] = {};
            }
            if (data.total !== null) {
                articles[id].totalPage = Math.ceil(parseInt(data.total) / 5);
            }
            articles[id][index] = result;
            callback();
        });
    } else if (articles[id][index]) {
        callback();
    }
}
function getCategoryItems(callback,name){
    if(categoryItems){
        if(callback){
            callback();
        }
    }else{
        Service.request('api/home/getcategoryItems','Post',{name:name},(data)=>{
            categoryItems=data;
            if(callback){
                callback();
            }
        });
    }
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
        case HomeConstants.GET_ARTICLES:
            getArticles(action.categoryId,action.id,action.index,()=>HomeStore.emitChange('getarticles'),action.name);
            break;
    }
});
module.exports = HomeStore;
