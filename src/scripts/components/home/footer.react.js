/**
 * Created by lindongdong on 2015/5/23.
 */
var React=require('react');
var msgl=require('../../../images/msgl.png');
var lydj=require('../../../images/lydj.png');
var zlyc=require('../../../images/zlyc.png');
var xzkf=require('../../../images/xzkf.png');
var xxyl=require('../../../images/xxyl.png');
var gywm=require('../../../images/gywm.png');
var Footer=React.createClass({

    render(){
       return(<footer>
           <div className="table-cell">
               <p className="pl"><a href="/wechat/article/category"><img src={msgl} height="27" style={{marginTop:'3px',align:'middle'}} /><br/>美食攻略</a></p>
               <p className="pl"><a href="/wechat/article/index/tag/%E6%97%85%E6%B8%B8%E5%BA%A6%E5%81%87"><img src={lydj} height="23" style={{marginTop:'7px',align:'middle'}} /><br/>旅游度假</a></p>
           </div>
           <div  className="table-cell">
               <p className="pm"><a href="/wechat/event"><img src={zlyc} height="20"style={{marginTop:'10px',align:'middle'}}/><br/>展览演出</a></p>
               <p className="pm"><a href="/cafe-app"><img src={xzkf}  height="23" style={{marginTop:'7px',align:'middle'}} /><br/>小资咖啡</a></p>
           </div>
           <div  className="table-cell">
               <p className="pr"><a href="/wechat/article/index/tag/%E4%BC%91%E9%97%B2%E5%A8%B1%E4%B9%90"><img src={xxyl}  height="21"style={{marginTop:'9px',align:'middle'}} /><br/>休闲娱乐</a></p>
               <p className="pr"><a href="/wechat/about"><img src={gywm} height="19"style={{marginTop:'11px',align:'middle'}} /><br/>关于我们</a></p>
           </div>
       </footer>);
    }
});
module.exports=Footer;
