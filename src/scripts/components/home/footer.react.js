/**
 * Created by lindongdong on 2015/5/23.
 */
    'use strict';
var React=require('react');
var msgl=require('../../../images/msgl.png');
var lydj=require('../../../images/lydj.png');
var zlyc=require('../../../images/zlyc.png');
var xzkf=require('../../../images/xzkf.png');
var xxyl=require('../../../images/xxyl.png');
var gywm=require('../../../images/gywm.png');
var Router = require('react-router');
var {  Link } = Router;
var Footer=React.createClass({

    render(){
       return(<footer>
           <div className="table-cell">
               <p className="pl"><Link to="delicacy"><img src={msgl} height="27" style={{marginTop:'3px',align:'middle'}} /><br/>美食攻略</Link></p>
               <p className="pl"><Link to="articles"  params={{'id':1,categoryItemName:'旅游度假'}}><img src={lydj} height="23" style={{marginTop:'7px',align:'middle'}} /><br/>旅游度假</Link></p>
           </div>
           <div  className="table-cell">
               <p className="pm"><Link to="music"><img src={zlyc} height="20"style={{marginTop:'10px',align:'middle'}}/><br/>展览演出</Link></p>
               <p className="pm"><a href="/cafe-app"><img src={xzkf}  height="23" style={{marginTop:'7px',align:'middle'}} /><br/>小资咖啡</a></p>
           </div>
           <div  className="table-cell">
               <p className="pr"><Link to="articles"  params={{'id':1,categoryItemName:'休闲娱乐'}}><img src={xxyl}  height="21"style={{marginTop:'9px',align:'middle'}} /><br/>休闲娱乐</Link></p>
               <p className="pr"><Link to="aboutus"><img src={gywm} height="19"style={{marginTop:'11px',align:'middle'}} /><br/>关于我们</Link></p>
           </div>
       </footer>);
    }
});
module.exports=Footer;
