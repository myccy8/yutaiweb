/**
 * Created by lindongdong on 2015/5/23.
 */
'use strict';
var React=require('react');
var HomeAction=require('../../actions/homeAction');
var HomeStore=require('../../stores/homeStore');
var Service=require('../../services/commonService');
var style=require('../../../styles/delicacy.css');
var Footer=require('../common/footer.react');
var Home=React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },
    getInitialState(){
        return {content:''};
    },
    componentWillMount(){
        HomeStore.bind('getcategoryitems',this.changeState);
        style.use();
    },
    componentWillUnmount(){
        HomeStore.off('getcategoryitems',this.changeState);
        style.unuse();
    },
    componentDidMount(){
        HomeAction.getCategoryItems('美食攻略');
    },
    changeState(){
        var articles=HomeStore.getCategoryItems()||[],temp=[];
        articles.map((v,i)=>{
            temp.push(<article key={i}>
                <a style={{display: 'block',width:'100%'}} onClick={()=>this.context.router.transitionTo(`/articles/${v.categoryItemsId}`)}><img src={Service.filterUrl(v.categoryImage)} /> <p>{v.title}</p></a>
            </article>);
        });
        this.setState({content:temp});
    },
    render(){
        return (
            <div>
            <section>
                <article>
                    <a style={{display: 'block',width:'100%'}} href="http://m.topbooking.com"><img src="/images/topbooking.jpg" />
                     </a>
                </article>
            {this.state.content}
                </section>
                <Footer/>
                </div>
        );
    }
});
module.exports=Home;
