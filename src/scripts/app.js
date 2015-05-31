/**
 * Created by BillLin on 2015/3/31.
 */
'use strict';
var React = require('react');
var Router=require('react-router');
var Home=require('./components/home/home.react');
var Delicacy=require('./components/delicacy/index.react');
var Articles=require('./components/articles/index.react');
var Music=require('./components/concert/index');
var MusicDetail=require('./components/concert/detail');
var AboutUs=require('./components/aboutus/index');
var Map=require('./components/concert/map');
if (window.getComputedStyle) {
    var Home = require('./components/home/home.react');

    var { Route, RouteHandler,DefaultRoute, Link,NotFoundRoute } = Router;

    var App = React.createClass({

        render: function () {
            return (
                <div>
                        <RouteHandler/>
                </div>
            );
        }
    });

    var routes = (
        <Route handler={App}>
            <DefaultRoute  handler={Home} />
            <Route name="delicacy" path="/delicacy" handler={Delicacy}/>
            <Route name="music" path="/music" handler={Music}/>
            <Route name="musicDetail" path="/music/:id" handler={MusicDetail}/>
            <Route name="map" path="/map/:id" handler={Map}/>
            <Route name="articles" path="/articles/:categoryItemName/:id" handler={Articles}/>
            <Route name="aboutus" path="/aboutus" handler={AboutUs}/>
        </Route>
    );
    if (!window.applicationCache) {
        Router.run(routes, function (Handler) {
            React.render(<Handler/>, document.getElementById('YutaiContent'));
        });
    } else {
        Router.run(routes, Router.HistoryLocation, function (Handler) {
            React.render(<Handler/>, document.getElementById('YutaiContent'));
        });
    }
}else{
    React.render(<div>sdfsdf</div>, document.getElementById('YutaiContent'));
}
