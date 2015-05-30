/**
 * Created by lindongdong on 2015/5/23.
 */
'use strict';
var React=require('react');
var Store=require('../../stores/homeStore');
var Action=require('../../actions/homeAction');
var Service=require('../../services/commonService');
var InfiniteScroll = require('react-infinite-scroll')(React);
var style=require('../../../styles/concert.css.css');
var Footer=require('../common/footer.react');
var pageIndex={};
var typeId=-1;
var Articles=React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },
    getInitialState(){
        return {
            data: [],
            totalPage: 0,
            articlesTop:{}
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
    getmusiccategory(){
        var data=Store.getMusicCategory;
        var images=data.images;
        var category=data.category;
        this.changeRoute(0);
    },
    changeRoute(index) {
        Action.getMusicList(typeId, index);
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
