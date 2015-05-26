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
    getArtcles(categoryId,id,index){
        AppDispatcher.dispatch({
            categoryId:categoryId,
            id:id,
            index:index,
            actionType:HomeConstants.GET_ARTICLES
        });
    }
};
module.exports = HomeActions;
