/**
 * Created by lindongdong on 2015/5/31.
 */
/**
 * Created by lindongdong on 2015/5/23.
 */
'use strict';
var React=require('react');
var style=require('../../../styles/about.css');
var About=React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },
    componentWillMount(){
        style.use();
    },
    componentWillUnmount(){
        style.unuse();
    },
    componentDidMount(){
        jQuery.noConflict();
        $(function() {
            //平台、设备和操作系统
            var system = {
                win: false,
                mac: false,
                xll: false
            };
            //检测平台
            var p = navigator.platform;
            system.win = p.indexOf("Win") == 0;
            system.mac = p.indexOf("Mac") == 0;
            system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
            //跳转语句
            var event_tap = 'tap';
            if (system.win || system.mac || system.xll) {//转向后台登陆页面
                event_tap = "click";
            }
            var log = function(str) {
                $('.xg-log').append(str + '<br/>');
            };
            var changeDots = function(toactive) {
                var dots = $(".xg-dots .dot");
                $.each(dots, function(index, elem) {
                    if (index == toactive) {
                        $(elem).addClass('active');
                    } else {
                        $(elem).removeClass('active');
                    }
                });
            };
            changeDots(0);
//            var scene = document.getElementById('xg-about');
//            var parallax = new Parallax(scene);
            var HEIGHT = document.body.clientHeight, cur_page = 0;
//            log(window.screen.availHeight);
//            log(document.body.clientHeight);
//            log(document.body.offsetHeight);
//            log(document.body.scrollHeight);
//            log(window.screen.height);
            window.onresize = function() {
                HEIGHT = document.body.clientHeight;
                $('section').css('height', HEIGHT + 'px');
                gotoPage(cur_page);
            };
            var startX = 0, startY = 0;
            var PAGE_MAX = $('#xg-about section').size() - 1;
            $('section').css('height', HEIGHT + 'px');
            var addKeep = function() {
                $('#xg-about').addClass('keep');
            };
            var removeKeep = function() {
                $('#xg-about').removeClass('keep');
            };
            var gotoPage = function(index) {
                addKeep();
                setTimeout(removeKeep, 400);
                $('#xg-about').css('-webkit-transform', "translate3d(0," + (-index * HEIGHT) + "px,0)");
                $('#xg-about').css('transform', "translate3d(0," + (-index * HEIGHT) + "px,0)");
                changeDots(index);
                if (index == 5) {
                    $(".xg-dots").hide();
                } else {
                    $(".xg-dots").show();
                }
            };
            $(".xg-arrow-circle").on(event_tap, function() {
                cur_page++;
                gotoPage(cur_page);
            });
            $('#xg-about').on('touchstart', function(e) {
                var touch = e.touches[0];
                startY = touch.pageY;
                startX = touch.pageX;
            });
            $('#xg-about').on('touchend', function(e) {
                var touch = e.changedTouches[0];
                if (-cur_page * HEIGHT + touch.pageY - startY > 0 || -cur_page * HEIGHT + touch.pageY - startY < -PAGE_MAX * HEIGHT) {
                    gotoPage(cur_page);
                    return;
                }
                if (touch.pageY - startY > HEIGHT / 10) {/*goto prev*/
                    if (cur_page > 0) {
                        cur_page--;
                        gotoPage(cur_page);
                    }
                } else if (startY - touch.pageY > HEIGHT / 10) {/*goto next*/
                    if (cur_page < PAGE_MAX) {
                        cur_page++;
                        gotoPage(cur_page);
                    }
                } else {/*hold*/
                    gotoPage(cur_page);
                }
            });
            $('#xg-about').on('touchmove', function(e) {
                var touch = e.touches[0];
                e.preventDefault();
                $(this).css('-webkit-transform', "translate3d(0," + (-cur_page * HEIGHT + touch.pageY - startY) + "px,0)");
                $(this).css('transform', "translate3d(0," + (-cur_page * HEIGHT + touch.pageY - startY) + "px,0)");
            });
//            $('.xg-bgpic').on('load', function() {
//                $(this).hide();
//                //使用fadeIn特效
//                $(this).fadeIn("5000");
//            });
            var changeDots = function(toactive) {
                var dots = $(".dot");
                $.each(dots, function(index, elem) {
                    if (index == toactive) {
                        $(elem).addClass('active');
                    } else {
                        $(elem).removeClass('active');
                    }
                });
            };
            changeDots(0);
        });
    },
    render(){
        return(<div>
            <script type="text/javascript" src="/assets/zepto.js"></script>
        <div className="xg-log"></div>
        <div id="xg-about" className="keep" style={{webkitTransform: 'translate3d(0px, 0px, 0px)',transform: 'translate3d(0px, 0px, 0px)'}}>
        <section className="sec0" >
            <h2>Hi,大家好<br/>
                我是 上海小资美食</h2>
                <p style={{lineHeight:'1.5em',paddingBottom:'20px'}}>这里有10万跟你一样喜欢上海<br/>小资生活的人关注着我</p>
                <p>小资有能力做喜欢的事</p>
                <p><i>因为我们经济独立</i></p>
                <p>小资有自己的生活品味</p>
                <p><i>因为我们比谁都热爱生活</i></p>
                <p>小资也具备艺术鉴赏力</p>
                <p><i>因为文艺青年是我们的标签</i></p>
                <div className="xg-arrow-box">
                    <div className="xg-arrow-circle"><i className="icon-arrow-up"></i></div>
                </div>
            </section>

            <section className="sec1">
                <h2>致力于发现与分享上海最小资吃喝玩乐是我最大的工作</h2>
                <p style={{lineHeight:'1.5em',paddingBottom:'20px'}}>为小资的粉丝们<br/>探店、写稿、上图、送福利、办活动</p>

            <table align="center" width="85%">
                <tr>
                    <td width="50" valign="top">美食：</td>
                    <td align="left"><i>涵盖全上海最大范围、最新鲜热辣、最全面的美食资讯</i></td>
                </tr>
                <tr>
                    <td  valign="top">甜品：</td>
                    <td align="left"><i>寻找魔都最嗲的甜品、下午茶，找我就对了</i></td>
                </tr>
                <tr>
                    <td  valign="top">活动：</td>
                    <td align="left"><i>第一手信息，抢玩沪上最新、最in趣味活动</i></td>
                </tr>
                <tr>
                    <td  valign="top">周边：</td>
                    <td align="left"><i>近郊游、户外体验何去何从？我来告诉你</i></td>
                </tr>
                <tr>
                    <td  valign="top">其他：</td>
                    <td align="left"><i>更多精彩活动，只为丰富你的小资生活</i></td>
                </tr>
            </table>
        </section>

        <section className="sec2" style={{height: '756px',padding:'0 15px'}}>
        <h2>上海小资美食是一个新的聚点</h2>
        <p style={{lineHeight:'1.5em',paddingBottom:'30px'}}>随时随地在这里发现，魔都最IN餐厅美食、酒吧、酒店、甜品、电影、演出、夜生活</p>
        <p>商务合作<br/>QQ:2871364022/2319975300</p>
        </section>

        <section className="sec3" style={{height: '756px',padding:'0 15px'}}>
            <h2>建立一个小资美食的社群</h2>
            <p style={{lineHeight:'1.5em',paddingBottom:'30px'}}>你可能成不了艺术家，但你可以做一名最有品位的吃货。</p>
            <p>加入我们<br/>jobs@shanghaiwow.com</p>
        </section>

        <section className="sec4" style={{height: '756px',padding:'0 15px'}}>
        <h2>如果你也喜欢探索生活中那些小资情调的事物，或是发现有小资品质的商户和内容，还请记得关注我、推荐给我噢~</h2>
        <p style={{fontSize:'1.5em'}}>当然,好东西要记得分享给好盆友~</p>
            <p className="gz">关注微信：上海小资美食</p>
            <p><a >微信号：xiaozimeishi</a></p>
            <p><a ><img src="/files/images/about/qrcode.png?r=20140926" style={{background:'#fff'}} width="70" /></a></p>
            <p style={{marginTop:'30px'}}><a className="border" style={{border:'1px solid #fff',borderRadius:'2px',padding:'5px 12px'}} onClick={()=>this.context.router.transitionTo('/')}>返回首页</a></p>
        </section>
        </div>
        <div className="xg-dots" style={{webkitTransformOrigin: '0px 0px',opacity: 1, webkitTransform: 'scale(1, 1)'}}>
            <ol className="dots">
                <li className="dot active">0</li>
                <li className="dot">1</li>
                <li className="dot">2</li>
                <li className="dot">3</li>
                <li className="dot">4</li>
            </ol>
        </div>
            </div>);
    }
});
module.exports=About;
