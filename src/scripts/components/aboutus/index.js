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
            <h2>Hi,大家好<br/></h2>
            <p><i>这里是 魔都上海</i></p>
                <p><i>很高兴在这里与大家见面</i></p>
                <p>小资也具备艺术鉴赏力</p>
                <p><i>这里有跟你一样喜欢魔都上海的人关注着我们</i></p>
                <div className="xg-arrow-box">
                    <div className="xg-arrow-circle"><i className="icon-arrow-up"></i></div>
                </div>
            </section>

            <section className="sec1">
                <h2>魔都上海</h2>

            <table align="center" width="85%">
                <tr>
                    <td align="left"><i>魔都领先的生活资讯类自媒体大号</i></td>
                </tr>
                <tr>
                    <td align="left"><i>致力于发现和分享魔都最In的吃喝玩乐、新闻资讯等</i></td>
                </tr>
                <tr>
                    <td align="left"><i>全心全意为魔都上海的粉丝们</i></td>
                </tr>
                <tr>
                    <td align="left"><i>送上第一手新闻资讯、城中故事、美食探店、写稿、办活动、送福利</i></td>
                </tr>
            </table>
        </section>

        <section className="sec2" style={{height: '756px',padding:'1px 15px'}}>
            <table align="center" width="95%" style={{margin: '90px auto'}}>
                <tr>
                    <td align="left"><i>如果你也喜欢探索生活中那些充满情调的事物</i></td>
                </tr>
                <tr>
                    <td align="left"><i>如果你也想成为一名全方面、有品位的吃货</i></td>
                </tr>
                <tr>
                    <td align="left"><i>如果你也擅长发现一些有品质的商户和内容</i></td>
                </tr>
                <tr>
                    <td align="left"><i>那么，请记得一定要告诉我、推荐给我哟</i></td>
                </tr>
                        <tr>
                            <td align="left"><i>因为，魔都上海也是你们每一位最忠实的粉丝！</i></td>
                        </tr>
                        <tr>
                            <td align="left"><i>投稿合作</i></td>
                        </tr>
                        <tr>
                            <td align="left"><i>QQ：616615025</i></td>
                        </tr>
                        <tr>
                            <td align="left"><i>微信：liuwenju88</i></td>
                        </tr>
            </table>
            <p style={{marginTop:'30px'}}><a className="border" style={{border:'1px solid #fff',borderRadius:'2px',padding:'5px 12px'}} onClick={()=>this.context.router.transitionTo('/')}>返回首页</a></p>
        </section>
        </div>
        <div className="xg-dots" style={{webkitTransformOrigin: '0px 0px',opacity: 1, webkitTransform: 'scale(1, 1)'}}>
            <ol className="dots">
                <li className="dot active">0</li>
                <li className="dot">1</li>
                <li className="dot">2</li>
            </ol>
        </div>
            </div>);
    }
});
module.exports=About;
