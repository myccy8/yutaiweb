/**
 * Created by BillLin on 2015/5/4.
 */
'use strict';
var AppDispatcher = require('../dispatcher/appDispatcher');
var HomeConstants = require('../constants/homeConstants');
var HomeActions = {
    getIndex(){
        AppDispatcher.dispatch({
            actionType:HomeConstants.GET_INDEX
        });
    },
    getCategoryItems(name){
        AppDispatcher.dispatch({
            name:name,
            actionType:HomeConstants.GET_CATEGORY_ITEMS
        });
    },
    getMusicList(type,index){
        setTimeout(()=>{
            AppDispatcher.dispatch({
                type:type,
                index:index,
                actionType:HomeConstants.GET_MUSIC
            });
        },1);

    },
    getSingleMusic(id){
        AppDispatcher.dispatch({
            id:id,
            actionType:HomeConstants.GET_SINGLE_MUSIC
        });
    },
    getMusicCategory(){
        AppDispatcher.dispatch({
            actionType:HomeConstants.GET_MUSIC_CATEGORY
        });
    },
    getArtcles(categoryId,id,index){
        AppDispatcher.dispatch({
            categoryItemName:categoryId,
            id:id,
            index:index,
            actionType:HomeConstants.GET_ARTICLES
        });
    }
};
module.exports = HomeActions;
