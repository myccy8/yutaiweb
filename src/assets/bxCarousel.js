/*
 bxCarousel v1.0
 Plugin developed by: Steven Wanderski
 */

(function ($) {
    $.fn.bxCarousel = function (options) {
        var defaults = {//插件的默认设置
            move: 4,//move：每次滚动移动图片的数量，默认为4。
            display_num: 4,//display_num：展示图片的数量，默认为4。
            speed: 500,//speed：图片滚动速度，默认为500毫秒。
            margin: 0,//margin：图片间的间距，默认为0。
            auto: false,//auto：是否自动滚动，默认为false。
            auto_interval: 2000,//auto_interval：当设为自动滚动时，每次滚动的时间间隔（毫秒），默认为2000毫秒即2秒。
            auto_dir: 'next',//auto_dir：自动滚动的方向，默认为next，你可以试下prev。
            auto_hover: false,//auto_hover：滚动时，鼠标滑上图片时是否停止滚动，默认为false。
            next_text: 'next',
            next_image: '',//next_image：向右滚方向按钮图片，可以用CSS设置。
            prev_text: 'prev',
            prev_image: '',//prev_image：向左滚方向按钮图片，可以用CSS设置。
            controls: true//controls：是否显示左右滚动按钮图片，默认为true。
        };
        var options = $.extend(defaults, options);
        return this.each(function () {
            var $this = $(this);
            var li = $this.find('li');
            var first = 0;
            var fe = 0;
            var last = options.display_num - 1;
            var le = options.display_num - 1;
            var is_working = false; var j = '';
            var clicked = false; li.css({ 'float': 'left', 'listStyle': 'none', 'marginRight': options.margin });
            var ow = li.outerWidth(true);
            wrap_width = (ow * options.display_num) - options.margin;
            var seg = ow * options.move; $this.wrap('<div class="bx_container"></div>').width(999999);
            if (options.controls) {
                if (options.next_image != '' || options.prev_image != '') {
                    var controls = '<a href="" class="prev"><img src="' + options.prev_image + '"/></a><a href="" class="next"><img src="' + options.next_image + '"/></a>';
                }
                else {
                    var controls = '<a href="" class="prev">' + options.prev_text + '</a><a href="" class="next">' + options.next_text + '</a>';
                }
            }
            $this.parent('.bx_container').wrap('<div class="bx_wrap"></div>').css({ 'position': 'relative', 'width': wrap_width, 'overflow': 'hidden' }).before(controls);//显示左右滚动按钮图片,定义CSS的控制样式

            var w = li.slice(0, options.display_num).clone();
            var last_appended = (options.display_num + options.move) - 1;

            $this.empty().append(w);
            get_p();
            get_a();
            $this.css({
                'position': 'relative', 'left': -(seg)
            });
            $this.parent().siblings('.next').click(function () {
                slide_next();
                clearInterval(j);
                clicked = true;
                return false;
            });
            $this.parent().siblings('.prev').click(function () {
                slide_prev();
                clearInterval(j);
                clicked = true;
                return false;
            });
            if (options.auto) {
                start_slide();
                if (options.auto_hover && clicked != true) {
                    $this.find('li').live('mouseenter', function () {
                        if (!clicked) {
                            clearInterval(j);
                        }
                    }); $this.find('li').live('mouseleave', function () {
                        if (!clicked) {
                            start_slide();
                        }
                    });
                }
            }
            function start_slide() {
                if (options.auto_dir == 'next') {
                    j = setInterval(function () {
                        slide_next()
                    }, options.auto_interval);
                } else {
                    j = setInterval(function () {
                        slide_prev()
                    }, options.auto_interval);
                }
            }
            function slide_next() {
                if (!is_working) {
                    is_working = true;
                    set_pos('next');
                    $this.animate({
                        left: '-=' + seg
                    }, options.speed, function () {
                        $this.find('li').slice(0, options.move).remove();
                        $this.css('left', -(seg));
                        get_a(); is_working = false;
                    });
                }
            }
            function slide_prev() {
                if (!is_working) {
                    is_working = true;
                    set_pos('prev');
                    $this.animate({
                        left: '+=' + seg
                    }, options.speed, function () {
                        $this.find('li').slice(-options.move).remove(); $this.css('left', -(seg));
                        get_p();
                        is_working = false;
                    });
                }
            }
            function get_a() {
                var str = new Array();
                var lix = li.clone();
                le = last;
                for (i = 0; i < options.move; i++) {
                    le++
                    if (lix[le] != undefined) {
                        str[i] = $(lix[le]);
                    } else {
                        le = 0; str[i] = $(lix[le]);
                    }
                }
                $.each(str, function (index) {
                    $this.append(str[index][0]);
                });
            }
            function get_p() {
                var str = new Array();
                var lix = li.clone();
                fe = first; for (i = 0; i < options.move; i++) {
                    fe--
                    if (lix[fe] != undefined) {
                        str[i] = $(lix[fe]);
                    } else {
                        fe = li.length - 1; str[i] = $(lix[fe]);
                    }
                }
                $.each(str, function (index) {
                    $this.prepend(str[index][0]);
                });
            }
            function set_pos(dir) {
                if (dir == 'next') {
                    first += options.move;
                    if (first >= li.length) {
                        first = first % li.length;
                    }
                    last += options.move; if (last >= li.length) {
                        last = last % li.length;
                    }
                } else if (dir == 'prev') {
                    first -= options.move; if (first < 0) {
                        first = li.length + first;
                    }
                    last -= options.move; if (last < 0) {
                        last = li.length + last;
                    }
                }
            }
        });
    }
}
)(jQuery);
