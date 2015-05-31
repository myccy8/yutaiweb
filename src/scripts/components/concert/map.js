/**
 * Created by lindongdong on 2015/5/23.
 */
'use strict';
var React=require('react');
var HomeAction=require('../../actions/homeAction');
var HomeStore=require('../../stores/homeStore');
var style=require('../../../styles/map.css');
var Detail=React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },
    getInitialState(){
        return {music:{}};
    },
    componentWillMount(){
        HomeStore.bind('getmusic',this.changeState);
        style.use();
    },
    componentWillUnmount(){
        HomeStore.off('getmusic',this.changeState);
        style.unuse();
    },
    componentDidMount(){
        var id = this.context.router.getCurrentParams().id;
        HomeAction.getSingleMusic(id);
    },
    changeState(){
        var id = this.context.router.getCurrentParams().id;
        var music=HomeStore.getMusic(id);
        var latY = music.lat;
        var lngX = music.lng;

        var mapObj;
        var marker = new Array();
        var windowsArr = new Array();
        //基本地图加载
        function mapInit() {
            mapObj = new AMap.Map("map", {
                center:new AMap.LngLat(lngX, latY), //地图中心点
                level:16  //地图显示的比例尺级别
            });


            var markerOption = {
                map:mapObj,
                icon:"http://webapi.amap.com/images/marker_sprite.png",
                position:new AMap.LngLat(lngX, latY)
            };
            var mar = new AMap.Marker(markerOption);
            //marArray.push(mar);
            marker.push(new AMap.LngLat(lngX, latY));
        }
        $(document).ready(function(){setTimeout(function(){mapInit();}, 500);});

    },
    render(){
        return (
            <div>
        <div id="map"></div>
        <div id="mapDesc"></div>
                </div>
        );
    }
});
module.exports=Detail;
