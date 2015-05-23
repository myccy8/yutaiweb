/**
 * Created by lindongdong on 2015/5/23.
 */
'use strict';
var React=require('react');
var HomeAction=require('../../actions/homeAction');
var HomeStore=require('../../stores/homeStore');
var Service=require('../../services/commonService');
var Home=React.createClass({
    componentWillMount(){
        HomeStore.bind('getindex',this.changeState);
    },
    componentWillUnmount(){
        HomeStore.off('getindex',this.changeState);
    },
    changeState(){

    },
    render(){
        return (<header>
            <div class="scroll">
                <div class="slide_01" id="slide_01">
                </div>
            </div>
        </header>
        );
    }
});
module.exports=Home;
