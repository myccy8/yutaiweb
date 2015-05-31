/**
 * Created by lindongdong on 2015/5/23.
 */
'use strict';
var React=require('react');
var HomeAction=require('../../actions/homeAction');
var HomeStore=require('../../stores/homeStore');
var Service=require('../../services/commonService');
var Footer=require('../common/footer.react');
var style=require('../../../styles/musicdetail.css');
var c1=require('../../../images/icon1.png');
var c2=require('../../../images/icon2.png');
var c3=require('../../../images/icon3.png');
var open=require('../../../images/open.png');
var plus=require('../../../images/plus.png');
var isCheck=false;
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
        this.setState({music:music});
    },
    setCount(type){
        if(!isCheck) {
            var id = this.context.router.getCurrentParams().id;
            $(".message").eq(type).stop(false, true).fadeIn(1).animate({"bottom": "100%"}, 600,
                function () {
                    $('.message').eq(type).fadeOut(600, function () {
                        $(this).css("bottom", "0")
                    })
                });
            Service.request('api/home/setmusiclike', 'POST', {type: type, id: id}, (data)=> {
                isCheck = !isCheck;
                this.state.music.like = data[0];
                this.state.music.hate = data[1];
                this.forceUpdate();
            });
        }
    },
    render(){
        return (
            <div>
                <header>
                    <p className="topimg" ><img src={Service.filterUrl(this.state.music.contentImage)} className="topimg"  /></p>
                </header>
                <section>
                    <p style={{fontSize:'18px'}}>{this.state.music.title}</p>
                    <table className="table">
                        <tr>
                            <td width="15" valign="top"><img src={c1} width="11" height="11"  /></td>
                            <td>
                            {this.state.music.time}</td>
                        </tr>
                        <tr>
                            <td valign="top"><img src={c2}  width="11" height="12"   /></td>
                            <td> {this.state.music.price}</td>
                        </tr>
                        <tr>
                            <td valign="top"><img src={c3} width="11" height="12" /></td>
                            <td>
                                <a className="adr arrow" style={{marginLeft: 0, float:'left', color: '#555'}} href="" >
                                <span>{this.state.music.address}</span>
                                    <img src={open} width="16" />
                                </a>
                            </td>
                        </tr>

                    </table>
                    <p className="btn-go">
                        <a  className="go-left yu" onClick={()=>this.setCount(0)}>想去<span className="num"> {this.state.music.like}	</span>人<span className="message"><img src={plus} height="35" /></span></a>
                        <a  className="go-right yu" onClick={()=>this.setCount(1)}>去过<span className="num"> {this.state.music.hate}	</span>人<span className="message"><img src={plus} height="35" /></span></a>
                    </p>
                    <div className="clear"></div>
                    <article>
                        <p>活动详情:</p>
                        <div>{this.state.music.detail}</div>
                    </article>
                </section>
                <Footer/>
            </div>
        );
    }
});
module.exports=Detail;
