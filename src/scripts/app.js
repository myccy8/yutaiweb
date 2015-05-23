/**
 * Created by BillLin on 2015/3/31.
 */
'use strict';
var React = require('react');
if (window.getComputedStyle) {
    var Home = require('./components/home/home.react');

    var { Route, RouteHandler,DefaultRoute, Link,NotFoundRoute } = Router;

    var App = React.createClass({

        render: function () {
            return (
                <div>
                    <Nagigation/>
                    <div className="container">
                        <Menu/>
                        <RouteHandler/>
                        <Footer/>
                    </div>
                </div>
            );
        }
    });

    var routes = (
        <Route handler={App}>
            <DefaultRoute  handler={Home} />
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
