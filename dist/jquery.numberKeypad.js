/* == jquery keypad plugin == Version: 1.0.1, License: MIT License (MIT) */
var $padActive = false; // is active keypad visible :: global

(function ($) {
    $.fn.numberKeypad = function (options) {
        let $this = this;
        let $wrapper; // parent container

        return $this.each(function (i, elem) {
            let self = $(elem);
            //var strItem = '';
            let settings = $.extend({
                wrap: 'body',
                arrKeys: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
                login: false, // custom page style :: padding
                isRandom: true, // Random Keypad
                cancel: null,   // cancle시 콜백
                callback: null, // ok시 콜백
                limit: 100,     // 자리 수 제한
            }, options);

            // parent container bind
            $wrapper = $(settings.wrap);

            // create keypad element string
            let draw = function (keys, isRandom) {
                let target = keys;

                // 랜덤으로 키를 섞어서 그릴 경우 키 배열을 랜덤하게 섞는다
                if (isRandom === true) {
                    target.sort(function () {
                        return 0.5 - Math.random();
                    });
                }
                let strItem = '';
                target.forEach(function (e, i) {
                    if (i % 3 === 0) {
                        strItem += '<div class="item d-flex justify-content-between">'
                    }

                    // back button 위치 고정
                    if (i === 9) {
                        strItem += '<a href="javascript:;" class="back"><span>x</span></a>';
                    }
                    strItem += '<a href="javascript:;" class="n">' + e + '</a>'
                    // ok button 위치 고정
                    if (i === 9) {
                        strItem += '<a href="javascript:;" class="ok">OK</a>';
                    }

                    if (i % 3 === 2) {
                        strItem += '</div>'
                    }
                });

                return strItem;
            }
            let strItem = draw(settings.arrKeys, settings.isRandom);

            let makeUnqId = ID(); // insert attribute unique for data-id
            let $keyItems = $(strItem);
            let $keypad = $("<div>", {
                'class': "keypad",
                'data-idx': makeUnqId
            }).appendTo($wrapper);

            // append items in keypad layer
            $keypad.html($keyItems);

            // mobile fake hover
            $keypad.find("a").on('touchstart mouseenter', function () {
                $(this).addClass('hover');
            }).on('touchend mouseleave', function () {
                $(this).removeClass('hover');
            }).on('click', function () {
                $(this).mouseleave();
            });

            // click number event
            $keypad.find("a.n").on("click", function (e) {
                e.preventDefault();

                // 제한된 자리만큼 입력이 이미 되었으면 더 이상 붙이지 않는다.
                if (self.val().length < settings.limit) {
                    self.val(self.val() + $(this).text());
                }
            });

            // click back event
            $keypad.find("a.back").on("click", function (e) {
                e.preventDefault();
                self.val(self.val().slice(0, self.val().length - 1));
            });

            // click ok event
            $keypad.find("a.ok").on("click", function (e) {
                e.preventDefault();

                if (settings.login) {
                    $wrapper.css("padding-bottom", '40px');
                } else {
                    $wrapper.css("padding-bottom", 0);
                }
                $keypad.fadeOut(200, function () {
					$padActive = false;
                    $(this).find(".keypad").hide();
                });

                // 완료시 콜백이 지정되어 있다면 콜백 함수 호출
                if (typeof $(settings.callback) === 'function') {
                    $(settings.callback)();
                }
            });

            // set responsive position
            $.fn_reposition = function (el, isOpen) {
                let $el = $(el);
                let $idx = $el.data('idx');
                let $keyWrap = $("div.keypad[data-idx='" + $idx + "']");

                if (!isOpen) {
                    fnSetKeypadHeight($el, $keyWrap);
                    return;
                } else {
                    // after focusing, init keypad
                    $(settings.wrap +">div.keypad").hide();
                }
                if ($(window).width() < 768) {
                    if ($keyWrap.is(":visible") || isOpen) {
                        if (isOpen) {
                            $keyWrap.show();
                            fnSetKeypadHeight($el, $keyWrap);
                        }
                    }
                } else {
                    if ($keyWrap.is(":visible") || isOpen) {
                        if (isOpen) {
                            $keyWrap.show();
                            fnSetKeypadHeight($el, $keyWrap);
                        } else {
                            if (settings.login) {
                                $wrapper.css("padding-bottom", '40px');
                            } else {
                                $wrapper.css("padding-bottom", 0);
                            }
                        }
                    }
                }
            }

            // window resize event :: debounce reposition
            $(window).resize(debounce(function () {
                $.fn_reposition(self);
            }));


            /* dom click > keypad hide */
            let handler = function(event){
                // if the target is a descendent of container do nothing
                if($(event.target).is("input, .keypad, .keypad *")) return;

                // remove event handler from document
                // $(document).off("click", handler);

                // dostuff
                $("div.keypad").hide();
                // keypad가 사라질 때 호출하여야 할 콜백이 있으면 호출하도록 지정
                if (typeof $(settings.cancel) === 'function') {
                    $(settings.cancel)();
                }
            }

            $(document).on("click", handler);

            // input focus event
            self.attr("readonly", true)
                .attr("data-idx", makeUnqId)
                .on("focus", function () {
                    $padActive = true;
                    $.fn_reposition(self, true);
                    self.blur();
                });

            function fnSetKeypadHeight($el, $keyWrap) {
                let os = $el.offset();
                let os_t = os.top;
                let os_l = os.left;

                if (!$padActive) return;
                if ($(window).width() < 768) {
                    $keyWrap.css({
                        top: 'auto',
                        left: 'calc(50% - 125px)'
                    }).addClass('on');

                    let $getPb = $keyWrap.height() - ($wrapper.height() - os_t) + ($el.outerHeight() * 2);
                    if ($getPb > 0) {
                        $wrapper.css("padding-bottom", $getPb);
                    }
                    $('html, body').stop().animate({
                        scrollTop: os_t - ($el.outerHeight() * 2)
                    }, 300);
                } else {
                    //$keyWrap.css("height", $wrapper.height());
                    $keyWrap.css({
                        top: os_t + $el.outerHeight() + 10,
                        left: (settings.login) ? os_l - ($keyWrap.width() / 2) : os_l - 10
                    }).addClass('on');
                }
            }
        });
    };

    let debounce = function (func) {
        var timer;
        return function (event) {
            if (timer) clearTimeout(timer);
            timer = setTimeout(func, 300, event);
        };
    }

    let ID = function () {
        // Math.random should be unique because of its seeding algorithm.
        // Convert it to base 36 (numbers + letters), and grab the first 9 characters
        // after the decimal.
        return '_' + Math.random().toString(36).substr(2, 9);
    };
}(jQuery));
