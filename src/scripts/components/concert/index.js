/**
 * Created by lindongdong on 2015/5/23.
 */
'use strict';
var React=require('react');
var Store=require('../../stores/homeStore');
var Action=require('../../actions/homeAction');
var Service=require('../../services/commonService');
var InfiniteScroll = require('react-infinite-scroll')(React);
var style=require('../../../styles/concert.css');
var Footer=require('../common/footer.react');
var c1=require('../../../images/icon1.png');
var c2=require('../../../images/icon2.png');
var c3=require('../../../images/icon3.png');
var pageIndex={};
var typeId=-1,current=-1;
var Music=React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },
    getInitialState(){
        return {
            data:{},
            totalPage: {},
            category:''
        };
    },
    componentWillMount(){
        Store.bind('getmusiccategory', this.getmusiccategory);
        Store.bind('getmusiclist', this.changeState);
        style.use();
    },
    componentWillUnmount(){
        pageIndex=0;
        Store.off('getmusiccategory', this.getmusiccategory);
        Store.off('getmusiclist', this.changeState);
        style.unuse();
    },
    componentDidMount() {
        Action.getMusicCategory();
    },
    setImage(arr,obj){
        for(var image of arr){
            obj.push('<a style="position:relative;top:0;left:0;overflow:hidden" href="'+image.Url+'"><img src="'+Service.filterUrl(image.ImagePath)+'" class="topimg"  /><p class="p-title">'+image.Title+'</p></a>');
        }
    },
    setCategory(flag){
        var data=Store.getMusicCategory();
        var temp=[<a  id="listall" className={current==-1?'current':''} onClick={()=>this.getMusicByCategory(-1,-1)}>全部</a>];
        var category=data.category||[];
        category.map((v,i)=>{
            temp.push(<a className={current==i?'current':''} onClick={()=>this.getMusicByCategory(v.concertCategoryId,i)} >{v.name}</a>)
        });
        this.setState({category:temp},()=>{
            if(flag) {
                var tag = '';
                var size = $(".top-l>a").size();
                if (size <= 6) {
                    $(".toggle").css("display", "none");
                } else {
                    $(".toggle").click(function () {
                        $(".top-l>a:gt(4)").toggle();
                        var rel = $(this).attr("rel");

                        if (rel == 0) {
                            $(this).html("更多>>").css("fontSize", "14px");
                            $(this).attr("rel", 1);
                        } else {
                            $(this).html("收起 ↑").css("fontSize", "14px");
                            $(this).attr("rel", 0);
                        }
                    }).trigger("click");
                }
                if (tag == '') {
                } else {
                    $(".top-l>a").each(function (idx, item) {
                        var html = $(item).html();
                        if (tag == html && size > 6) {
                            if (5 <= idx) {
                                $(".top-l>a:gt(4)").toggle();
                                $(".toggle").html("收起 ↑").css("fontSize", "14px");
                                $(".toggle").attr("rel", 0);
                            }
                        }
                    });
                }
            }
        });
    },
    getmusiccategory(){
        var data=Store.getMusicCategory();
        var images=data.images||[];
        var html= [];
        this.setImage(images,html);
        this.setImage(images,html);
        var i = 0,divs= '';
        for (; i < html.length; i++) {
            divs += '<div></div>'
        }
       this.setCategory(true);
        $('#carousel').html(divs).touchCarousel(
            {
                loop: 5000,
                pages:html,
                isFollow: true,
                dot1: '/files/images/event/dot2.png?r=20140926',
                dot2: '/files/images/event/dot1.png?r=20140926'
            }
        );
        this.changeRoute(0);
    },
    changeRoute(index) {
        Action.getMusicList(typeId, index);
    },
    getMusicByCategory(_typeId,index){
        current=index;
        typeId=_typeId;
        this.state.data[typeId]=[];
        this.state.totalPage[typeId]=0;
        this.changeRoute(0);
        this.setCategory();
    },
    changeState() {
        pageIndex[typeId]= pageIndex[typeId]||0;
        var musiclist=Store.getMusicList(typeId,pageIndex[typeId]);
        if(!this.state.data[typeId]){
            this.state.data[typeId]=[];
        }
        this.state.data[typeId]=this.state.data[typeId].concat(musiclist.list);
        this.state.totalPage[typeId]=musiclist.totalPage;
        this.forceUpdate();
    },
    loadMore() {
        pageIndex[typeId]= pageIndex[typeId]||0;
        setTimeout(function () {
            pageIndex[typeId]++;
            this.changeRoute(pageIndex[typeId]);
        }.bind(this), 100);
    },
    renderMusic(v,i){
        return <a onClick={()=>this.context.router.transitionTo(`/music/${v.id}`)} key={i}>
            <div className="block">
                <div className="leftimg"><img src={Service.filterUrl(v.image)} width="80" height="115"/></div>
                    <div className="rightimg">
                        <p style={{fontSize:'14px',minHeight:'55px',color:'#555'}}>{v.title}</p>
                        <table className="table">
                            <tr>
                                <td width="15" valign="top"><img src={c1} width="11" height="11"  /></td>
                                <td>
                                {v.time}
                                   </td>
                            </tr>
                            <tr>
                                <td valign="top"><img src={c3} width="11" height="12" /></td>
                                <td>
                                {v.address}</td>
                            </tr>
                            <tr>
                                <td valign="top"><img src={c2}  width="11" height="12"   /></td>
                                <td>{v.price}</td>
                            </tr>
                        </table>
                    </div>
                    <div className="clear"></div>
                </div>
            </a>;
    },
    render(){
        var flag=pageIndex<this.state.totalPage;
        var data=this.state.data[typeId]||[];
        return( <div id="react-paginate">
            <header>
                <p className="topimg" >
                    <div style={{position: 'relative',top:0,left:0}}>
                        <div className="indexSlideShow carousel" id="carousel" style={{overflow: 'hidden', margin:'0 auto',padding:0}}></div>
                        <div className="clear"></div>
                    </div>
                </p>
                <div className="toplist">
                    <div className="top-l">
                    {this.state.category}
                    </div>
                    <div className="top-r"><a href={void(0)} className="toggle" rel="0">收起 ↑</a></div>
                </div>
            </header>
            <section>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={this.loadMore}
                    hasMore={flag}
                    loader='<div>loading...</div>'>
                      {data.map(this.renderMusic)}
                </InfiniteScroll>
            </section>
            <Footer/>
        </div>);
    }
});
module.exports=Music;
