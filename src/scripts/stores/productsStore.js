/**
 * Created by BillLin on 2015/4/10.
 */
'use strict';
var AppDispatcher = require('../dispatcher/appDispatcher');
var ProductConstants = require('../constants/productConstants');
var EventEmitter = require('events').EventEmitter;
var Http = require('../services/commonService');
var assign = require('object-assign');
var products = {}, singleProduct = {}, productCategory = [];
function addProductCategory(callback) {
    if (productCategory.length === 0) {
        Http.request('Product/GetProductCategory', 'GET', {}, function (data) {
            productCategory = data.data.category;
            products.top=data.data.top;
            if (productCategory) {
                if (!products[productCategory[0].id]) {
                    products[productCategory[0].id] = {};
                }
                products[productCategory[0].id][0] = data.data.list;
            }
            if (data.data.total !== null) {
                products[productCategory[0].id].totalPage = Math.ceil(parseInt(data.data.total) / 5);
            }
            callback();
        });
    }else{
        callback();
    }
}
function addProducts(id, index, callback) {
    if (!products[id] || !products[id][index]) {
        Http.request(`Product/GetProducts/${id}/${index}`, 'GET', {}, function (data) {
            var result = data.data;
            if (!products[result.categoryId]) {
                products[result.categoryId] = {};
            }
            if (result.total !== null) {
                products[result.categoryId].totalPage = Math.ceil(parseInt(result.total) / 5);
            }
            products[result.categoryId][index] = result.products;
            callback();
        });
    } else if (products[id][index]) {
        callback();
    }
}
function addSingleProduct(id, callback) {
    if (!singleProduct[id]) {
        Http.request(`Product/GetProduct/${id}`, 'GET', {}, function (data) {
            singleProduct[id] = data.data;
            callback();
        });
    } else {
        callback();
    }
}
var ProductStore =  assign({}, EventEmitter.prototype,{
    getProducts(id, index) {
        if (id === 'default') {
            var keys = Object.keys(products);
            if (keys.length > 0) {
                return {totalPage: products[keys[0]].totalPage, list: products[keys[0]][index]};
            }
        }
        return {totalPage: products[id].totalPage, list: products[id][index]};
    },
    getProductCategory() {
        return productCategory;
    },
    getProductTop(){
      return products.top;
    },
    getSingleProduct(id) {
        return singleProduct[id];
    },
    emitChange(e) {
        this.emit(e);
    },
    bind(name,callback){
        this.on(name, callback);
    },
    off(name,callback){
        this.removeListener(name, callback);
    }
});
AppDispatcher.register(function (action) {
    switch (action.actionType) {
        case ProductConstants.PRODUCT_ADD_CATEGORY:
            addProductCategory(function () {
                ProductStore.emitChange('addProductCategory');
            });
            break;
        case  ProductConstants.PRODUCT_ADD_ITEMS:
            addProducts(action.id, action.index, function () {
                ProductStore.emitChange('addProducts');
            });
            break;
        case  ProductConstants.PRODUCT_ADD_SINGLE:
            addSingleProduct(action.id, function () {
                ProductStore.emitChange('addSingleProduct');
            });
            break;
    }
});
module.exports = ProductStore;
