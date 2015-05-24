/**
 * Created by lindongdong on 2015/5/23.
 */
'use strict';
var React=require('react');
var HomeAction=require('../../actions/homeAction');
var HomeStore=require('../../s/HomeStore');
var Service=require('../../services/commonService');
var style=require('../../../styles/main.css');
var Footer=require('./footer.react');
var Home=React.createClass({
    getInitialState(){
        return {content:''};
    },
    componentWillMount(){
        HomeStore.bind('getindex',this.changeState);
        style.use();
    },
    componentWillUnmount(){
        HomeStore.off('getindex',this.changeState);
        style.unuse();
    },
    componentDidMount(){
        HomeAction.getIndex();
    },
    componentDidUpdate(){
        if(document.getElementById("slide_01")){
            var slide_01 = new ScrollPic();
            slide_01.scrollContId   = "slide_01"; //内容容器ID
            slide_01.dotListId      = "slide_01_dot";//点列表ID
            slide_01.dotOnClassName = "selected";
            slide_01.arrLeftId      = "sl_left"; //左箭头ID
            slide_01.arrRightId     = "sl_right";//右箭头ID
            slide_01.frameWidth     = 300;
            slide_01.pageWidth      = 300;
            slide_01.upright        = false;
            slide_01.speed          = 10;
            slide_01.space          = 30;
            slide_01.initialize(); //初始化
        }
    },
    changeState(){
        var images=HomeStore.getIndexImage()||[],temp=[];
        images.map((v,i)=>{
              temp.push(<div className="mod_01" key={i}>
                  <a href={v.Url}>
                      <img src={Service.filterUrl(v.ImagePath)}/>
                          <dl className="dl">
                              <dt>{v.Title}</dt>
                              <dd>{v.Content}</dd>
                          </dl>
                      </a>
                  </div>);

        });
        this.setState({content:temp});
    },
    render(){
        return (
            <div>
            <header>
            <div className="scroll">
                <div className="slide_01" id="slide_01">
                {this.state.content}
                </div>
            </div>
            <div className="dotModule_new">
                <div id="slide_01_dot"></div>
            </div>
        </header>
                <Footer/>
            </div>
        );
    }
});
module.exports=Home;
