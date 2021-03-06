/**
 * Created by lindongdong on 2015/5/23.
 */
'use strict';
var React=require('react');
var Store=require('../../stores/homeStore');
var Action=require('../../actions/homeAction');
var Service=require('../../services/commonService');
var InfiniteScroll = require('react-infinite-scroll')(React);
var style=require('../../../styles/article.css');
var Footer=require('../common/footer.react');
var pageIndex=0;
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
        var categoryItemName = this.context.router.getCurrentParams().categoryItemName;
        Action.getArtcles(categoryItemName,id, index);
    },
    changeState() {
        var categoryItemName = this.context.router.getCurrentParams().categoryItemName;
        var articles = Store.getArticles(categoryItemName, pageIndex);
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
                <div className="headerimg">
                    <img src={Service.filterUrl(this.state.articlesTop.categoryImage)} />
                    <p>{this.state.articlesTop.categoryName}</p>
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
                loader={<div>loading...</div>}>
                      {this.state.data.map(this.renderArticles)}
            </InfiniteScroll>
                </section>
            <Footer/>
        </div>);
    }
});
module.exports=Articles;
