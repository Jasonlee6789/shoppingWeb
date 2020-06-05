window.addEventListener('load', function () {
    // this.alert(1);
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;

    focus.addEventListener('mouseenter', function () {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null;
    });
    focus.addEventListener('mouseleave', function () {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function () {
            arrow_r.click();
        }, 2000);
    });
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        li.setAttribute('index', i);
        ol.appendChild(li);
        li.addEventListener('click', function () {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            var index = this.getAttribute('index');
            num = index;
            circle = index;
            animate(ul, -index * focusWidth);
        });
    }
    ol.children[0].className = 'current';
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);


    var num = 0;
    var circle = 0;
    var flag = true;
    arrow_r.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function () {
                flag = true;
            });
            circle++;
            if (circle == ol.children.length) {
                circle = 0;
            }
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            ol.children[circle].className = 'current';
        }
    });
    arrow_l.addEventListener('click', function () {
        if (num == 0) {
            ul.style.left = -(ul.children.length - 1) * focusWidth + 'px';
            num = ul.children.length - 1;
        }
        num--;
        animate(ul, -num * focusWidth);
        circle--;
        // if (circle < 0) {
        //     circle = ol.children.length - 1;
        // }
        circle = circle < 0 ? ol.children.length - 1 : circle;
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    });

    var timer = this.setInterval(function () {
        arrow_r.click();
    }, 2000);
    //1.显示隐藏电梯导航
    var toolTop = $(".recom_hd").offset().top;

    $(window).scroll(function () {
        if ($(document).scrollTop() >= toolTop) {
            $(".fixedtool").fadeIn();
        } else {
            $(".fixedtool").fadeOut();
        }
        //4.左侧电梯导航当页面滚动到某个内容区域，可以添加或者删除红色类名
        $(".floor .w").each(function (i, ele) {
            if ($(document).scrollTop() >= $(ele).offset().top) {
                $(".fixedtool li").eq(i).addClass("current").siblings().removeClass();
            }

        })
    });
    //2.点击电梯导航页面可以滚动到相应内容区域
    $(".fixedtool li").click(function () {
        //当我每次点击小li,求去往的位置：选出对应索引号的内容去的盒子的.offset().top就是电梯要去的位置了
        var current = $(".floor .w").eq($(this).index()).offset().top;
        //添加页面滚动效果，注意是body html
        $("body, html").stop().animate({
            scrollTop: current
        });
    });
    //3.左侧电梯导航添加红色类名
    $(this).addClass("current").siblings().removeClass();
})