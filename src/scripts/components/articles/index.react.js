/**
 * Created by lindongdong on 2015/5/23.
 */
'use strict';
var React=require('react');
var Store=require('../../stores/homeStore');
var Action=require('../../actions/homeAction');
var InfiniteScroll = require('react-infinite-scroll')(React);
var style=require('../../../styles/delicacy.css');
var pageIndex=0;
var Footer=React.createClass({
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
        Store.bind('getarticles', this.changeState);
        style.use();
    },
    componentWillUnmount(){
        pageIndex=0;
        Store.off('getarticles', this.changeState);
        style.unuse();
    },
    componentDidMount() {
        this.changeRoute(0);
    },
    changeRoute(index) {
        var id = this.context.router.getCurrentParams().id;
        var categoryId = this.context.router.getCurrentParams().categoryId;
        Action.getArtcles(categoryId,id, index);
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
        setTimeout(function () {
            pageIndex++;
            this.changeRoute(pageIndex);
        }.bind(this), 100);
    },
    renderArticles(v,i){
             return <div className="block" key={i}>
                 <div className="block-l"><a href={v.url}><img src={v.image} className="img" /></a></div>
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
                <div className="headerimg">
                    <img src={this.state.articlesTop.categoryImage} />
                    <p>{this.state.articlesTop.categoryName}</p>
                </div>
            </header>
            <section>
                <p><a ><img src={this.state.articlesTop.indexImage}  className="img" /></a></p>
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
        </div>);
    }
});
module.exports=Footer;
