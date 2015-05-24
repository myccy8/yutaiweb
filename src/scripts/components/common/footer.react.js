/**
 * Created by lindongdong on 2015/5/23.
 */
'use strict';
var React=require('react');
var Router = require('react-router');
var {  Link } = Router;
var Footer=React.createClass({

    render(){
        return(<footer>
            <p><Link to="/">返回首页</Link></p>
            <p>Copyright &copy; 2014 xiaozimeishi.com</p>
        </footer>);
    }
});
module.exports=Footer;
