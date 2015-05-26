/**
 * Created by lindongdong on 2015/5/23.
 */
'use strict';
var React=require('react');
var Router = require('react-router');
var InfiniteScroll = require('react-infinite-scroll')(React);
var {  Link } = Router;
var Footer=React.createClass({
    renderArticles(v,i){
             return <div className="block">
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
        var flag=this.props.pageIndex<this.props.totalPage;
        return( <div id="react-paginate">
            <InfiniteScroll
                pageStart={0}
                loadMore={this.props.loadMore}
                hasMore={flag}
                loader='<div>loading...</div>'>
                      {this.props.data.map(this.renderArticles)}
            </InfiniteScroll>
        </div>);
    }
});
module.exports=Footer;
