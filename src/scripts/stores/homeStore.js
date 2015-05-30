/**
 * Created by BillLin on 2015/5/4.
 */
'use strict';
var AppDispatcher = require('../dispatcher/appDispatcher');
var HomeConstants = require('../constants/homeConstants');
var EventEmitter = require('events').EventEmitter;
var Service = require('../services/commonService');
var assign = require('object-assign');
var indexImages, categoryItems,articles={},articlesTop={},
    musicImages,musicCategory,musiclist={},music={};
var HomeStore = assign({}, EventEmitter.prototype, {
    getIndexImage() {
        return  indexImages;
    },
    getMusicCategory(){
      return {images:musicImages,category:musicCategory};
    },
    getMusicList(id,index){
        return {
            totalPage: musiclist[id].totalPage,
            list: musiclist[id][index]
        };
    },
    getMusic(id){
        return music[id];
    },
    getArticles(id,index){
        return {
            totalPage: articles[id].totalPage,
            list: articles[id][index],
            articlesTop:articlesTop[id]
        };
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
function getMusicList(id,index){
    if (!musiclist[id] || !musiclist[id][index]) {
        Service.request('api/home/getmusiclist', 'POST', {id:id,index:index,size:5}, function (data) {
            var result = data.data;
            if (!musiclist[id]) {
                musiclist[id] = {};
            }
            if (data.total !== null) {
                articles[id].totalPage = Math.ceil(parseInt(data.total) / 5);
            }
            musiclist[id][index] = result;
            HomeStore.emitChange('getmusiclist');
        });
    } else if (musiclist[id][index]) {
        HomeStore.emitChange('getmusiclist');
    }
}
function getMusicCategory(){
    if (!musicCategory) {
        Service.request('api/home/getmusiccategory', 'GET', {}, function (data) {
            musicImages=data.images;
            musicCategory=data.category;
            HomeStore.emitChange('getmusiccategory');
        });
    } else if (musicCategory) {
        HomeStore.emitChange('getmusiccategory');
    }
}
function getSingleMusic(id){
    if (!music[id]) {
        Service.request('api/home/getmusic/'+id, 'GET', {}, function (data) {
            music[id]=data;
            HomeStore.emitChange('getmusic');
        });
    } else {
        HomeStore.emitChange('getmusic');
    }
}
function getArticles(categoryItemName,id,index,callback){
    if (!articles[id] || !articles[id][index]) {
        Service.request('api/home/getarticles', 'POST', {id:id,categoryItemName:categoryItemName,index:index,size:5}, function (data) {
            var result = data.articles;
            articlesTop[id]={
                title:data.title,
                indexImage:data.indexImage,
                content:data.content,
                categoryImage:data.categoryImage,
                categoryName:data.categoryName
            };
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

AppDispatcher.register(function (action) {
    switch (action.actionType) {
        case HomeConstants.GET_INDEX:
            getIndex(()=>HomeStore.emitChange('getindex'));
            break;
        case HomeConstants.GET_CATEGORY_ITEMS:
            getCategoryItems(()=>HomeStore.emitChange('getcategoryitems'),action.name);
            break;
        case HomeConstants.GET_ARTICLES:
            getArticles(action.categoryItemName,action.id,action.index,()=>HomeStore.emitChange('getarticles'));
            break;
        case HomeConstants.GET_MUSIC:
           getMusicList(action.type,action.index);
            break;
        case HomeConstants.GET_MUSIC_CATEGORY:
           getMusicCategory();
            break;
        case HomeConstants.GET_SINGLE_MUSIC:
           getSingleMusic(action.id);
            break;
    }
});
module.exports = HomeStore;
