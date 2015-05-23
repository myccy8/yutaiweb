/**
 * Created by BillLin on 2015/3/31.
 */
"use strict";
var React = require('react');
var BaseUrl = 'http://192.168.8.45:9011/';
//var BaseUrl = 'http://fenrir:8011/';
$.support.cors = true;
var _request = function (url, type, data, success) {
    $.ajax({
        url: BaseUrl + url,
        type: type,
        data: data,
        dataType: "json",
        cache: false,
        success: success,
        error: function (e) {
            console.log(JSON.stringify(e));
        }
    });
};
var filterUrl = function (url) {
    //return 'http://fenrir:8081' + url;
    return  'http://192.168.8.45:9012' + url;
};
module.exports =
{
    request: _request,
    filterUrl: filterUrl,
    baseUrl: BaseUrl
};
