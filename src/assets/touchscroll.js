(function($){
    /**
     *css3 Touch Scroll
     *
     * @author: zhangnan
     *
     * @param   {Object}    options;
     * @config   {zepto}     options.$el            //外围容器 选择器或者element
     * @config   {array}     options.pages          //填充每一页的内容 Element || string || function
     * @config   {Number}    options.animTime    //动画时间，默认为500
     * @config   {Function}  options.beforechange //动画完成之前回调函数
     * @config   {Function}  options.afterchange //动画完成之后回调函数
     * @isFollow {Boolean}  obtions.isFollow     //是否跟随,默认false
     * @isFollow {Boolean}  obtions.loop     //自动循环的时间/ms
     *
     *
     *
     *
     */

    var TouchScroll=function(options){
        this.$el= $(options.$el);
        this.options= $.extend(arguments.callee.defaultData, options);
        this.options._lazyLoad= !this.options.loop && this.options.lazyLoad;
        this._wrapLeftIndex= this.options._wrapLeftIndex;
        this._curIndex= this.options._curIndex;
        this._initContainer();
        this._initNodes();
        this._init();
    };
    var $support = {
        transform3d: ('WebKitCSSMatrix' in window),
        touch: ('ontouchstart' in window)
    };

    TouchScroll.defaultData= {
        isFollow: false,
        animTime: 500,
        _curIndex: 0,       //当前索引
        _wrapLeftIndex: 0,      //是外围动画节点的移动单位距离
        loop: 0,
        loopDir: 1,
        pages: [],
        lazyLoad: false,
        beforechange: function(_self){
            //console.log('berore');
            _self.setIndicator(_self._curIndex);
        },
        afterchange: function(){
            //console.log('afterchange');
        },
    }

    $.extend(TouchScroll.prototype,{

        _init:function(){
            var self=this;
            self.touchEnabled= true;
            addEventListener('onorientationchange' in window ? 'orientationchange' : 'resize', function(e){
            });
            this.options.isFollow ? this.initTouchFollow() : this.initTouch();

            if(this.options.loop){
                var dirfoo= self.loopDir > 0 ? 'toLeft' : 'toRight';
                (self.autoLoop= function(){
                    self.timeout= setTimeout(function(){
                        self[dirfoo]();
                    }, self.options.loop)
                })();
            }
            this.$container[0].addEventListener('webkitTransitionEnd', self, false);
            return this;
        },

        _initContainer: function(){
            this.$el.css({'overflow': 'hidden'});
            this._contentWidth= this.$el[0].clientWidth;
        },

        _initNodes: function(){
            var i= 0, nodes, length, left, contentWidth= this._contentWidth, self= this,
                reg= /<\//g,
                html= this.$el.html();

            if(this.options._lazyLoad)
                reg= /<\//;
            html= html.replace(reg, function($a){
                return self.getpage(i++)+$a
            });
            this.$el.html('<div  style="display: -webkit-box;-webkit-user-select: none;-webkit-transition: -webkit-transform '+this.options.animTime+'ms cubic-bezier(0, 0, 0.25, 1)">'+
            html
            +
            '</div>');
            nodes= this.nodes= (this.$container= this.$el.children()).children();

            this.maxIndex= (length= this.nodesLength= nodes.length) -1;
            var bestDest= Math.ceil(length/2);
            var nodesAry= self._nodes=[];
            nodes.each(function(index, node){
                left= index< bestDest ? index :  -(length- index);
                nodesAry.push({node: node, left: left, index: index});
                node.style.cssText+= ';-webkit-transform: translate(-'+(index)+'00%, 0) translate3d('+left*contentWidth+'px, 0px, 0px); width: 100%;';
            })
            nodesAry.sort(function(a, b){
                return a.left- b.left;
            });
        },

        _setNodesTranslate: function(dir){
            var into,
                out,
                bestLeft,
                nodes= this._nodes,
                node,
                contentWidth= this._contentWidth,
                maxIndex=this.nodesLength-1,
                curIndex= this._curIndex,
                curpage;
            if(dir==0)
                return;
            if(dir<0){
                into= 'unshift';
                out= 'pop';
                bestLeft= nodes[0].left -1;
            }else{
                into= 'push';
                out= 'shift';
                bestLeft= nodes[maxIndex].left+ 1;
            }
            node= nodes[out]();
            node.left= bestLeft;
            nodes[into](node);
            node.node.style.cssText= node.node.style.cssText.replace(/translate3d\(([-\d]+)px/g, 'translate3d\('+
            bestLeft* contentWidth
            +'px');
            if(this.options._lazyLoad){
                curpage= this.nodes[curIndex];
                !curpage.firstElementChild && (curpage.innerHTML= this.getpage(curIndex));
            }
        },

        toLeft: function(dir){

            this.move(-1);
        },

        toRight: function(){
            this.move(1);
        },

        toCurrent: function(){
            this.move(0);
        },

        getpage: function(index){
            var page= this.options.pages[index];
            return $.isFunction(page) ? page() : page instanceof Element ? page.outerHTML : page;
        },


        handleEvent: function(e){
            if(e.type==='webkitTransitionEnd'){
                this.options.afterchange(this._curIndex);
                this.touchEnabled= true;
                this.options.loop && this.autoLoop();
            }
        },

        move: function(dir){
            var left= this._wrapLeftIndex= this._wrapLeftIndex-dir, res;
            this._curIndex= (res= this._curIndex+ dir) < 0 ? this.maxIndex : res > this.maxIndex ? 0 : res;
            this._setNodesTranslate(dir);
            this.options.beforechange(this);
            this.setLeft(left * this._contentWidth);

        },

        setIndicator: function(_curIndex) {
            if(document.querySelector("#indexSlideShow_dot")) {
                $("#indexSlideShow_dot img").attr('src', this.options.dot1);
                _curIndex = $("#indexSlideShow_dot img")[_curIndex] ? _curIndex : (_curIndex - 2);
                $("#indexSlideShow_dot img")[_curIndex].src = this.options.dot2;
            }
        },

        setLeft: function(left){
            this.$container.css({'-webkit-transform': 'translate3d('+ left +'px, 0px, 0px)'});
        },

        setAnimTime: function(time){
            this.$container.css('-webkit-transition', '-webkit-transform '+time+'ms cubic-bezier(0, 0, 0.25, 1)');
        },

        touchEv:(function(){
            var isTouchPad = (/hp-tablet/gi).test(navigator.appVersion),
                hasTouch='ontouchstart' in window && !isTouchPad;
            return {
                hasTouch:hasTouch,
                START_EV:hasTouch ? 'touchstart' : 'mousedown',
                MOVE_EV:hasTouch ? 'touchmove' : 'mousemove',
                END_EV:hasTouch ? 'touchend' : 'mouseup'
            }
        })(),
        //不跟随动画注册
        initTouch:function(){
            var now=null,
                touch={},
                self=this,
                timeout,
                touchEv=this.touchEv;
            this.$el.bind(touchEv.START_EV,function(e){
                if(!self.touchEnabled)
                    return ;

                var touches = $support.touch ? event.changedTouches[0] : event;
                if(touches.length!==1)
                    return ;
                //      self.stopLoop();
                touch.x1= touches.clientX;
                touch.y1= touches.clientY;


                timeout=setTimeout(function(){
                    timeout=null;
                },400);
            }).bind(touchEv.MOVE_EV,function(e){

                if(!self.touchEnabled)
                    return ;
                if(timeout){
                    var touches = $support.touch ? event.changedTouches[0] : event;
                    touch.x2= touches.clientX;
                    touch.y2= touches.clientY;
                    dir=self.swipeDirection(touch.x1,touch.x2,touch.y1,touch.y2);
                    if(dir=='Left' || dir=='Right')
                        e.preventDefault();
                }
            })
            $(document).bind(touchEv.END_EV,function(e){
                if(!self.touchEnabled)
                    return;
                if(timeout && touch.x2 && Math.abs(touch.x1 - touch.x2) > 5){
                    self.touchEnabled= false;
                    if(dir=='Left'){
                        self.toRight();
                    }else if(dir=='Right'){
                        self.toLeft();
                    }
                };
                touch={};
            });
            return this;
        },
        //跟随动画注册
        initTouchFollow:function(){
            var touchEv=this.touchEv,
                self=this,
                scrolling=null,
                startX=0,
                startY=0,
                moveX=0,
                moveY=0,
                baseX=0,
                distX,
                newX,
            //  startTime,
                dir=0,
                currentLeft= 0,
                transX;

            this.$el.bind(touchEv.START_EV,function(e){
                var touches = $support.touch ? event.changedTouches[0] : event;
                if(!self.touchEnabled && touches.length!=1)
                    return ;
                if(!touchEv.hasTouch)
                    e.preventDefault();
                self.setAnimTime(0);
//          self.timeout=null;
                clearTimeout(self.timeout);

                scrolling=true;
                moveRead=false;
                startX=touches.clientX;
                startY=touches.clientY;
                baseX=startX;
                newX= self._wrapLeftIndex* self._contentWidth;
                //startTime=e.timeStamp;
                dir=0;

            }).bind(touchEv.MOVE_EV,function(e){
                var touches = $support.touch ? event.changedTouches[0] : event;
                if(!scrolling || !self.touchEnabled)
                    return ;
                var moveX=touches.clientX,
                    moveY=touches.clientY;
                if(moveRead){
                    distX=moveX-baseX;
                    self.setLeft(newX+=distX);
                    dir= distX>0 ? 1 : -1;
                    baseX=moveX;
                }else{
                    var changeX=Math.abs(moveX-startX),
                        changeY=Math.abs(moveY-startY);
                    if((changeX/changeY)>1){
                        e.preventDefault();
                        e.stopPropagation();
                        moveY= null;
                        moveRead=true;
                    }else if(changeY>5){
                        scrolling=false;
                        moveY= null;
                        self.setAnimTime(self.options.animTime);
                    }
                };
            });

            $(document).bind(touchEv.END_EV,function(e){
                self.timeout=null;
                clearTimeout(self.timeout);

                if(!scrolling || !self.touchEnabled)
                    return ;
                self.touchEnabled= false;
                scrolling=false;
                transX = baseX-startX;
                self.setAnimTime(self.options.animTime);
                if(transX > 50){
                    self.toLeft(null, 300);
                }else if(transX < -50){
                    self.toRight(null, 300);
                }else{
                    self.toCurrent(100);
                }
                scrolling=
                    startX=
                        startY=
                            moveX=
                                moveY=
                                    baseX=
                                        distX=
                                            newX=
                                                dir=
                                                    transX=null;
            }).bind(touchEv.START_EV, function(e){
//           self.stopLoop();
            })
            return this;
        },

        swipeDirection:function(x1, x2, y1, y2){
            var xDelta = Math.abs(x1 - x2), yDelta = Math.abs(y1 - y2)
            return xDelta >= yDelta ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down');
        },
    });

    $.fn.touchCarousel=function(options){
        options.$el = this;
        var instance = new TouchScroll(options);
        return instance ;
    }

})(jQuery);
