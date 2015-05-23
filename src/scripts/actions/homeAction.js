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
    }
};
module.exports = HomeActions;
