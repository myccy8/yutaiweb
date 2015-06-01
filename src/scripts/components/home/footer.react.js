/**
 * Created by lindongdong on 2015/5/23.
 */
    'use strict';
var React=require('react');
var md=require('../../../images/md.png');
var ms=require('../../../images/ms.png');
var zlyc=require('../../../images/zlyc.png');
var fl=require('../../../images/fl.png');
var us=require('../../../images/us.png');
var jd=require('../../../images/jd.png');
var Router = require('react-router');
var {  Link } = Router;
var Footer=React.createClass({

    render(){
       return(<footer>
           <div className="table-cell">
               <p className="pl"><Link to="articles" params={{'id':1,categoryItemName:'魔都资讯'}}><img src={md} height="27" style={{marginTop:'3px',align:'middle'}} /><br/>魔都资讯</Link></p>
               <p className="pm"><Link to="articles" params={{'id':1,categoryItemName:'粉丝福利'}}><img src={fl}  height="23" style={{marginTop:'7px',align:'middle'}} /><br/>粉丝福利</Link></p>
           </div>
           <div  className="table-cell">
               <p className="pl"><Link to="delicacy"><img src={ms} height="27" style={{marginTop:'3px',align:'middle'}} /><br/>人气美食</Link></p>
               <p className="pr"><Link to="aboutus"><img src={us} height="19"style={{marginTop:'11px',align:'middle'}} /><br/>了解我们</Link></p>

           </div>
           <div  className="table-cell">
               <p className="pm"><Link to="music"><img src={zlyc} height="20"style={{marginTop:'10px',align:'middle'}}/><br/>展览演出</Link></p>
               <p className="pl"><Link to="articles"  params={{'id':1,categoryItemName:'景点推荐'}}><img src={jd} height="23" style={{marginTop:'7px',align:'middle'}} /><br/>景点推荐</Link></p>
           </div>
       </footer>);
    }
});
module.exports=Footer;
