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
var pageIndex={};
var typeId=-1,current=0;
var Articles=React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },
    getInitialState(){
        return {
            data: [],
            totalPage: 0,
            articlesTop:{},
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
    getmusiccategory(){
        var data=Store.getMusicCategory();
        var images=data.images||[];
        var category=data.category||[];
        var html= [],temp=[<a  id="listall" className="" onClick={()=>this.getMusicByCategory(-1)}>全部</a>];
        this.setImage(images,html);
        this.setImage(images,html);
        var i = 0,divs= '';
        for (; i < html.length; i++) {
            divs += '<div></div>'
        }
       for(var item of category){
           temp.push(<a onClick={()=>this.getMusicByCategory(item.concertCategoryId)} >{item.name}</a>)
       }
        this.setState({category:temp},()=>{
            var tag = '';
                var size=$(".top-l>a").size();
                if(size<=6){
                    $(".toggle").css("display","none");
                } else {
                    $(".toggle").click(function(){
                        $(".top-l>a:gt(4)").toggle();
                        var rel=$(this).attr("rel");

                        if(rel==0){
                            $(this).html("更多>>").css("fontSize","14px");
                            $(this).attr("rel",1);
                        }else{
                            $(this).html("收起 ↑").css("fontSize","14px");
                            $(this).attr("rel",0);
                        }
                    }).trigger("click");
                }
                if (tag == '') {
                } else {
                    $(".top-l>a").each(function(idx,item){
                        var html=$(item).html();
                        if(tag==html && size>6){
                            if (5 <= idx) {
                                $(".top-l>a:gt(4)").toggle();
                                $(".toggle").html("收起 ↑").css("fontSize","14px");
                                $(".toggle").attr("rel",0);
                            }
                        }
                    });
                }
        });
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
    getMusicByCategory(typeId){

    },
    changeState() {
        var id = this.context.router.getCurrentParams().id;
        var articles = Store.getArticles(id, pageIndex);
        this.setState({
            data: this.state.data.concat(articles.list),
            totalPage: articles.totalPage,
            articlesTop:articles.articlesTop
        });
    },
    loadMore() {
        pageIndex[typeId]= pageIndex[typeId]||0;
        setTimeout(function () {
            pageIndex[typeId]++;
            this.changeRoute(pageIndex[typeId]);
        }.bind(this), 100);
    },
    renderArticles(v,i){
        return <div className="block" key={i}>
            <div className="block-l"><a href={v.url}><img src={Service.filterUrl(v.image)} className="img" /></a></div>
            <div className="block-r">
                <dl>
                    <dt><a style={{color: '#000000;'}} href={v.url}>{v.title}</a></dt>
                    <dd>{v.detail}</dd>
                </dl>
            </div>
        </div>;
    },
    render(){
        var flag=pageIndex<this.state.totalPage;
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
                <p><a ><img src={Service.filterUrl(this.state.articlesTop.indexImage)}  className="img" /></a></p>
                <article>
                    <dl>
                        <dt><a style={{color: '#000000',fontSize:'1.25em'}}>{this.state.articlesTop.title}</a></dt>
                        <dd>{this.state.articlesTop.content}</dd>
                    </dl>
                </article>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={this.loadMore}
                    hasMore={flag}
                    loader='<div>loading...</div>'>
                      {this.state.data.map(this.renderArticles)}
                </InfiniteScroll>
            </section>
            <Footer/>
        </div>);
    }
});
module.exports=Articles;
