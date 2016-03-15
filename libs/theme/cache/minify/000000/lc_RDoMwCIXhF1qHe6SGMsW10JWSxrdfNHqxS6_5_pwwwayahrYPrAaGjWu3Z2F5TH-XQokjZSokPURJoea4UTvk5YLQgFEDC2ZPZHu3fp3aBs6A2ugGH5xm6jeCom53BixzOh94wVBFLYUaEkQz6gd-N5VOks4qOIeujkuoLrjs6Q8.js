/* ALL THE SCRIPTS IN THIS FILE ARE MADE BY KROWNTHEMES.COM AND ARE LICENSED UNDER ENVATO'S REGULAR/EXTENDED LICENSE --- REDISTRIBUTION IS NOT ALLOWED! */
(function (a) {
    a(document).ready(function () {
        function x() {
            a(".rbStats.pie").each(function () {
                if (!T && D) {
                    var b = function (a, b, c) {
                        q = 0;
                        clearInterval(l);
                        y.stop();
                        var g = 0, e = b / a;
                        y.start(5);
                        l = setInterval(function () {
                            q += .0025;
                            g = Math.floor(100 * q * e);
                            q >= a / 100 && (y.stop(), clearInterval(l), q = 0);
                            d.text(g)
                        }, 5);
                        f.stop().fadeOut(100).text(c).fadeIn(100)
                    }, c = a(this);
                    c.addClass("initialized");
                    if (1 == p) {
                        var g = 170;
                        width = 16;
                        radius = 69
                    } else g = 220, width = 26, radius = 84;
                    c.find(".circles").remove();
                    c.append('<div class="circles"><span class="pieBack"></span><canvas class="pieFront" width="' + g + '" height="' + g + '"></canvas></div>');
                    var e = a(this).children("ul").children("li"), d = a(this).children(".holder").children("p"), f = a(this).children(".holder").children("h5"), c = a(this).find(".pieFront")[0], y = new ProgressCircle({
                        canvas: c,
                        minRadius: radius,
                        arcWidth: width,
                        gapWidth: 2,
                        centerX: g / 2,
                        centerY: g / 2,
                        infoLineLength: 200,
                        horizLineLength: 50,
                        infoLineBaseAngle: Math.PI / 6,
                        infoLineAngleInterval: Math.PI / 8
                    }), l, q = 0, h = 0;
                    y.addEntry({
                        fillColor: "#DBDBDB", progressListener: function () {
                            return q
                        }
                    });
                    b(parseInt(e.eq(0).data("percent")), parseInt(e.eq(0).data("value")), e.eq(0).find("h5").text());
                    a(this).children(".buttons").children(".btnPrev").click(function () {
                        h = 0 > h - 1 ? e.length - 1 : h - 1;
                        b(parseInt(e.eq(h).data("percent")), parseInt(e.eq(h).data("value")), e.eq(h).find("h5").text());
                        return !1
                    });
                    a(this).children(".buttons").children(".btnNext").click(function () {
                        h = h + 1 >= e.length ? 0 : h + 1;
                        b(parseInt(e.eq(h).data("percent")), parseInt(e.eq(h).data("value")), e.eq(h).find("h5").text());
                        return !1
                    })
                }
            })
        }

        function U() {
            w.addClass("opened");
            a(".reactive").removeClass("reactive");
            n.stop().animate({backgroundColor: themeObjects.mainColor, borderColor: themeObjects.mainColor}, 100);
            K.each(function () {
                "block" != N.css("display") ? a(this).css({
                    width: 1,
                    display: "inline-block"
                }).stop().animate({width: a(this).data("width")}, 200) : a(this).stop().animate({height: a(this).data("height")}, 200)
            })
        }

        function V() {
            w.removeClass("opened");
            n.stop().animate({backgroundColor: n.data("baseBack"), borderColor: n.data("baseBorder")}, 100);
            K.each(function () {
                a(this).hasClass("active") || ("block" != N.css("display") ? a(this).stop().animate({width: 0}, 100, function () {
                    a(this).css("display", "none")
                }) : a(this).stop().animate({height: 0}, 100))
            })
        }

        function fa(b) {
            "block" != E.children(".responsive").css("display") && 0 < b.children("ul").length && b.children("ul").stop().slideDown(200, function () {
                a(this).css("overflow", "visible")
            })
        }

        function z() {
            addComment = {
                moveForm: function (b, c, d, f) {
                    var y = this.I(b);
                    b = this.I(d);
                    var l = this.I("cancel-comment-reply-link"), q = this.I("comment_parent"), h = this.I("comment_post_ID");
                    if (y && b && l && q) {
                        this.respondId = d;
                        f = f || !1;
                        this.I("wp-temp-form-div") || (d = document.createElement("div"), d.id = "wp-temp-form-div", d.style.display = "none", b.parentNode.insertBefore(d, b));
                        h && f && (h.value = f);
                        q.value = c;
                        l.style.display = "";
                        a("html,body").animate({scrollTop: a("#reply-title").offset().top}, 500, "easeInQuad");
                        l.onclick = function () {
                            var a = addComment, b = a.I("wp-temp-form-div"), c = a.I(a.respondId);
                            if (b && c)return a.I("comment_parent").value = "0", b.parentNode.insertBefore(c, b), b.parentNode.removeChild(b), this.style.display = "none", this.onclick = null, !1
                        };
                        try {
                            this.I("comment").focus()
                        } catch (k) {
                        }
                        return !1
                    }
                }, I: function (a) {
                    return document.getElementById(a)
                }
            };
            var b = a("#comment-form");
            b.prepend('<div id="comment-status"></div>');
            var c = a("#comment-status");
            b.submit(function () {
                var g = b.serialize();
                c.html("<p>" + themeObjects.commentProcess + "</p>");
                var e = b.prop("action");
                a.ajax({
                    type: "post", url: e, data: g, error: function (a, b, g) {
                        c.html('<p class="wdpajax-error">' + themeObjects.commentError + "</p>")
                    }, success: function (a, b) {
                        c.html('<p class="ajax-success">' + themeObjects.commentSuccess + "</p>")
                    }
                });
                return !1
            });
            setTimeout(function () {
                a(".rev.blank.fullwidth .tp-bullets.simplebullets").find(".bullet").append("<span></span>")
            }, 100);
            a(".flexslider").flexslider({
                animation: "slide",
                direction: "horizontal",
                easing: "easeInSine",
                keyboard: !0,
                slideshowSpeed: 5E3,
                animationSpeed: 500,
                slideshow: !0,
                randomize: !1,
                video: !0,
                pauseOnHover: !0,
                smoothHeight: !1,
                start: function (b) {
                    b.css("height", "auto");
                    a(window).trigger("resize")
                }
            });
            a("audio,video").each(function () {
                a(this);
                a(this).mediaelementplayer({
                    alwaysShowControls: !0,
                    autosizeProgress: !1,
                    iPadUseNativeControls: !1,
                    iPhoneUseNativeControls: !1,
                    AndroidUseNativeControls: !1,
                    enableKeyboard: !1,
                    pluginPath: themeObjects.base + "/js/mediaelement/"
                })
            });
            a(".video-embedded").append('<div class="mejs-overlay-play"><div class="mejs-overlay-button"></div></div>').find(".mejs-overlay-play").click(function (b) {
                var c = a(this).closest(".video-embedded");
                if (!c.hasClass("loading")) {
                    var d = c.data("href"), f = c.data("id");
                    c.append('<div class="css-loader"></div><a href="#" class="close-iframe close-btn-special"></a><iframe id="video-frame-' + f + '" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' + (W.hasClass("ie") ? ' allowtransparency="true"' : "") + "></iframe>").addClass("loading").find(".close-iframe").click(function () {
                        a(this).closest(".video-embedded").removeClass("loading").find("iframe, .close-iframe").remove()
                    });
                    a("#video-frame-" + f).prop("src", d).load(function () {
                        a(this).animate({opacity: 1}, 200).siblings(".css-loader").remove()
                    })
                }
                b.preventDefault()
            });
            a("#comments-title").click(function () {
                a(this).hasClass("closed") ? (a(this).removeClass("closed"), a(this).addClass("opened"), a(this).text(a(this).data("hide") + " (" + a(this).data("no") + ")"), a("#commentsShow").stop().slideDown(300, "easeInQuad"), a("html,body").animate({scrollTop: a(this).offset().top}, 500, "easeInQuad")) : (a(this).removeClass("opened"), a(this).addClass("closed"), a(this).text(a(this).data("show") + " (" + a(this).data("no") + ")"), a("#commentsShow").stop().slideUp(300))
            });
            a(".rbAccordion").each(function () {
                var b = a(this).hasClass("toggle") ? !0 : !1, c = a(this).children("section"), d = "-1" == a(this).data("opened") ? null : c.eq(parseInt(a(this).data("opened")));
                null != d && (d.addClass("opened"), d.children("div").slideDown(0));
                a(this).children("section").children("h4").click(function () {
                    $this = a(this).parent();
                    b || null == d || (d.removeClass("opened"), d.children("div").stop().slideUp(300));
                    $this.hasClass("opened") && b ? ($this.removeClass("opened"), $this.children("div").stop().slideUp(300)) : $this.hasClass("opened") || (d = $this, $this.addClass("opened"), $this.children("div").stop().slideDown(300))
                })
            });
            a("img.alignleft, img.alignright, img.aligncenter").parent("a").each(function () {
                a(this).attr("class", "fancybox fancybox-thumb " + a(this).children("img").attr("class"))
            });
            (0 < a(".fancybox").length || 0 < a('div[id*="attachment"]').length) && a('.fancybox, div[id*="attachment"] > a').fancybox({
                padding: 0,
                margin: 50,
                aspectRatio: !0,
                scrolling: "no",
                mouseWheel: !1,
                openMethod: "zoomIn",
                closeMethod: "zoomOut",
                nextEasing: "easeInQuad",
                prevEasing: "easeInQuad"
            }).append("<span></span>");
            a(".rbStats.bars, .ie8 .rbStats.pie").each(function () {
                $bar = a(this).children("ul").children("li").children("p");
                $bar.html("<span>" + a(this).data("value") + "<span>");
                $bar.children("span").each(function () {
                    a(this).animate({width: a(this).parent().parent().data("percent") + "%"}, 1E3 * Math.random() + 1E3, "easeInQuad")
                })
            });
            a(".rbTabs").each(function () {
                var b = a(this).children(".titles").children("li"), c = a(this).children(".contents").children("div"), d = b.eq(0), f = c.eq(0);
                d.addClass("opened");
                b.find("a").prop("href", "#").unbind("click");
                b.click(function () {
                    d.removeClass("opened");
                    d = a(this);
                    d.addClass("opened");
                    f.stop().slideUp(200);
                    f = c.eq(a(this).index());
                    f.stop().delay(200).slideDown(200);
                    return !1
                })
            })
        }

        function ga(a) {
            var c = a.find(".id-widget-year").text(), g = a.find(".id-widget-day").text();
            a = a.find(".id-widget-month").text();
            a = a.replace("January", "01");
            a = a.replace("February", "02");
            a = a.replace("March", "03");
            a = a.replace("April", "04");
            a = a.replace("May", "05");
            a = a.replace("June", "06");
            a = a.replace("July", "07");
            a = a.replace("August", "08");
            a = a.replace("September", "09");
            a = a.replace("October", "10");
            a = a.replace("November", "11");
            a = a.replace("December", "12");
            return a + "/" + g + "/" + c.replace("20", "")
        }

        a("#scripts").append('\x3c!-- this chunk of code was added by js for design purposes --\x3e<span id="rTablet"></span><span id="rMobile"></span><span id="rMini"></span><span id="rNormal"></span>');
        var O = a("body"), W = a("html"), T = a("html").hasClass("ie8"), P = "ontouchstart"in window, N = a("#rMobile"), X = a("#rTablet"), Y = a("#rNormal"), p = 0;
        W.removeClass("no-js");
        P && a("html").removeClass("no-touch");
        "block" == Y.css("display") ? p = 0 : "block" == X.css("display") && (p = 1);
        a(window).bind("resize", function () {
            "block" == Y.css("display") && 0 != p ? (p = 0, x()) : "block" == X.css("display") && 1 != p ? (p = 1, x()) : "block" == N.css("display") && 2 != p && (p = 2, x())
        });
        x();
        var D = !1;
        0 < a(".rbStats.pie").length && (!D && a(window).scrollTop() > a(".rbStats.pie").offset().top - a(window).height() + 150 && (D = !0, x()), a(window).scroll(function () {
            !D && a(window).scrollTop() > a(".rbStats.pie").offset().top - a(window).height() + 150 && (D = !0, x())
        }));
        if (O.hasClass("page-template-template-blog-modern-php") || 0 < a(".rbPosts.modern.jxtrue").length) {
            var ia = function (b) {
                document.location.hash = "#/";
                L && Q(F);
                k.text("").addClass("loading");
                r = !1;
                var c = A.last();
                w.addClass("disabled").animate({opacity: .4}, 50);
                A.animate({height: 0}, 100, "linear", function () {
                    a(this).prop("id") == c.prop("id") && ("*" != b ? A = ha.find(b) : (M = 1, t = kItems = parseInt(themeObjects.blogPage), R = Math.ceil(B.length / kItems), A = B.slice(0, t)), A.delay(500).animate({height: 60}, 100, "easeOutQuad", function () {
                        w.removeClass("disabled").animate({opacity: 1}, 50)
                    }));
                    setTimeout(function () {
                        "*" != b ? (k.removeClass("loading").text(k.data("less")), k.parent().addClass("nomore"), r = !1) : (k.removeClass("loading").text(k.data("more")), k.parent().removeClass("nomore"), r = !0)
                    }, 1E3)
                })
            }, Z = function (b) {
                a("html,body").animate({scrollTop: b.offset().top}, 300, "easeInQuad");
                b.addClass("opened");
                b.append('<span class="preloader"></span>');
                b.find("span.preloader").delay(350).animate({height: 150}, 150, function () {
                    a.ajax({
                        url: b.find("a").prop("href") + (0 < b.find("a").prop("href").indexOf("?") ? "&m=true" : "?m=true"),
                        dataType: "html"
                    }).done(function (c) {
                        b.css("min-height", "210px").find("span.preloader").fadeOut(100, function () {
                            a(this).remove();
                            b.append(a(c).find("#pContent"));
                            b.find("#pContent").stop().delay(350).slideDown(500, "easeInSine", function () {
                                G = !0;
                                b.css("min-height", "0");
                                if (0 < a(this).find(".flexslider").length) {
                                    var c = a(this).find(".slides").children("li").eq(0).children("img");
                                    c[0].complete ? z() : c.load(function () {
                                        z()
                                    })
                                } else z()
                            })
                        })
                    })
                })
            }, Q = function (b) {
                b.find("#pContent").stop().slideUp(300, "easeInQuad", function () {
                    a(this).parent().removeClass("opened");
                    a(this).remove();
                    G = !0
                })
            }, aa = function (a) {
                if ("link" == a.data("type")) {
                    if (newW = window.open(a.prop("href")), window.focus)return newW.focus(), !1
                } else $article = a.parent(), document.location.hash = "#/" + a.data("slug"), G && ($article.hasClass("opened") ? (L = G = !1, F = null, Q($article), document.location.hash = "#/") : (G = !1, L ? (setTimeout(function () {
                    Z($article)
                }, 500), Q(F), F = $article) : (L = !0, F = $article, setTimeout(function () {
                    Z($article)
                }, 1))))
            }, G = !0, L = !1, F = null, B = a("article.post"), ha = a(".postsContainer.modern");
            a(".postsContainer.modern").find("article a").click(function () {
                a(this).parent().css("height", "auto");
                aa(a(this));
                return !1
            });
            var H = document.location.hash.slice(2, document.location.hash.length), u = null;
            "" != H && (a("article a").each(function () {
                a(this).data("slug") == H && (u = a(this))
            }), null != u ? aa(u) : document.location.hash = "#/");
            var r = !0;
            0 < a(".pagination").find(".nav-prev").length && a(".pagination").find(".nav-prev").prop("href");
            var k = a("a.morePosts span"), M = 1, t = kItems = parseInt(themeObjects.blogPage), R = Math.ceil(B.length / kItems), A = B.slice(0, t);
            a(".postsContainer.modern").find("a.morePosts").click(function () {
                r && (r = !1, k.text("").addClass("loading"), setTimeout(function () {
                    if (M < R) {
                        var b = 0;
                        $slicedPosts = B.slice(t, t + kItems);
                        $slicedPosts.each(function () {
                            a(this).height(0).delay(50 * b++).animate({height: 60}, 100, "easeOutQuad")
                        });
                        M++;
                        t += kItems;
                        A = B.slice(0, t);
                        M < R ? (k.removeClass("loading").text(k.data("more")), setTimeout(function () {
                            r = !0
                        }, 1E3)) : (k.removeClass("loading").text(k.data("less")), k.parent().addClass("nomore"), r = !1)
                    } else k.removeClass("loading").text(k.data("less")), k.parent().addClass("nomore"), r = !1
                }, 500));
                return !1
            })
        }
        var w = a("#filter"), n = w.children("ul"), K = n.children("li"), I = !0;
        n.data("baseBorder", n.css("borderLeftColor"));
        n.data("baseBack", n.css("backgroundColor"));
        K.each(function () {
            a(this).css("display", "inline");
            a(this).data("width", a(this).width() + 1);
            a(this).data("height", 20);
            a(this).hasClass("active") || (a(this).css("width", 0), a(this).css("display", "none"))
        });
        P ? w.click(function () {
            a(this).hasClass("disabled") || I && U();
            return !1
        }) : w.hover(function () {
            a(this).hasClass("disabled") || I && U()
        }, function () {
            V()
        });
        a("#portfolio").find("#items").children("li");
        K.children("a").click(function () {
            if (!a(this).parent().parent().hasClass("disabled") && !a(this).hasClass("direct") && (I && !a(this).parent().hasClass("active") && (n.find(".active").removeClass("active"), a(this).parent().addClass("active"), a(this).parent().addClass("reactive"), I = !1, V(), setTimeout(function () {
                    I = !0
                }, 1E3), a(this).parent().parent().hasClass("portfolioFilter") ? (a("#portfolio #items").isotope({filter: a(this).data("filter")}), J && ba()) : ia(a(this).data("filter"))), !P))return !1
        });
        if (O.hasClass("page-template-template-portfolio-php") || 0 < a(".portfolio.atrue").length) {
            var ba = function () {
                m.delay(350).animate({opacity: 0}, 500, function () {
                    a(this).remove()
                });
                v.delay(350).animate({height: 0, opacity: 0, marginBottom: 0}, 500, function () {
                    C = !0;
                    J = !1
                });
                document.location.hash = "#/";
                return !1
            }, ca = function (b) {
                C && S(a(b.target).prop("href"), a(b.target).data("slug"));
                return !1
            }, ea = function (b) {
                J || a("html,body").animate({scrollTop: v.offset().top - da}, 300, "easeInQuad");
                J = !0;
                v.addClass("loading").css("display", "block").delay(400).animate({
                    height: 60,
                    marginBottom: 50,
                    opacity: 1
                }, 300, function () {
                    a.ajax({url: b, dataType: "html"}).done(function (b) {
                        function g(a) {
                            a ? (z(), setTimeout(function () {
                                e()
                            }, 1E3)) : d == f && (z(), setTimeout(function () {
                                e()
                            }, 1E3))
                        }

                        function e() {
                            v.animate({height: m.outerHeight()}, 1E3).removeClass("loading");
                            m.delay(300).animate({opacity: 1}, 500, "linear", function () {
                                C = !0
                            })
                        }

                        m = a(b).find("#projectDetails");
                        v.append(m);
                        v.css("overflow", "hidden");
                        var d = 0, f = m.find("img").length;
                        0 < f ? m.find("img").each(function () {
                            a(this)[0].complete ? (d++, g(!1)) : a(this).load(function () {
                                d++;
                                g(!1)
                            })
                        }) : g(!0);
                        m.find(".btnPrev").on("click", ca);
                        m.find(".btnNext").on("click", ca);
                        m.find(".btnClose").on("click", ba)
                    })
                })
            }, S = function (b, c) {
                document.location.hash = "#/" + c;
                C && (C = !1, J ? (a("html,body").animate({scrollTop: v.offset().top - da}, 300, "easeInQuad"), m.delay(350).animate({opacity: 0}, 500, function () {
                    a(this).remove()
                }), v.delay(350).animate({height: 60}, 500, function () {
                    a(this).addClass("loading");
                    ea(b)
                })) : ea(b))
            };
            a("#items").imagesLoaded(function () {
                a("#items").isotope({
                    itemSelector: ".item",
                    layoutMode: "fitRows",
                    animationOptions: {duration: 1E3, easing: "easeInQuint"}
                })
            });
            var C = !0, J = !1, da = O.hasClass("page-template-template-portfolio-php") ? 80 : 40;
            a(".portfolio.atrue, #portfolio.atrue").find(".item a").click(function () {
                C && S(a(this).prop("href"), a(this).data("slug"));
                return !1
            });
            var v = a("#folioDetails"), m = null, H = document.location.hash.slice(2, document.location.hash.length), u = null;
            "" != H && (a(".item a").each(function () {
                a(this).data("slug") == H && (u = a(this))
            }), null != u ? S(u.prop("href"), u.data("slug")) : document.location.hash = "#/")
        } else 0 < a(".rbProjects").length && a(".rbProjects #items").imagesLoaded(function () {
            a(".rbProjects #items").isotope({
                itemSelector: ".item",
                layoutMode: "fitRows",
                animationOptions: {duration: 1E3, easing: "easeInQuint"}
            })
        });
        var E = a("#menu");
        E.find("li").each(function () {
            $submenu = a(this).children("ul");
            if (0 < $submenu.length) {
                var b = 180;
                $submenu.css("display", "block");
                $submenu.children("li").each(function () {
                    a(this).addClass("menuFix");
                    a(this).width() > b && (b = a(this).width());
                    a(this).removeClass("menuFix")
                });
                $submenu.css("display", "none").width(b);
                $submenu.find("ul").css("left", b)
            }
        });
        E.find("li").hover(function () {
            fa(a(this))
        }, function () {
            var b = a(this);
            "block" != E.children(".responsive").css("display") && 0 < b.children("ul").length && b.children("ul").stop().slideUp(100)
        });
        E.children(".responsive").click(function () {
            a(this).hasClass("opened") ? (a(this).removeClass("opened"), a(menu).children("ul").stop().slideUp(300)) : (a(this).addClass("opened"), a(menu).children("ul").stop().slideDown(400))
        });
        z();
        a("a.popup").click(function () {
            var b = window.open(a(this).prop("href"), a(this).data("name"), a(this).data("height"), a(this).data("width"));
            window.focus && b.focus();
            return !1
        });
        a(".ch").append('<span class="hover"><span class="circle">\x3c!-- added by js --\x3e</span></span>');
        a("input, textarea").each(function () {
            a(this).hasClass("submit") || "submit" == a(this).prop("type") || "button" == a(this).prop("type") || "form_pay" == a(this).parent().parent().prop("id") || a(this).data("value", a(this).val()).focus(function () {
                a(this).addClass("focusInput");
                a(this).val() == a(this).data("value") ? a(this).val("") : a(this).select()
            }).blur(function () {
                a(this).removeClass("focusInput");
                "" == a(this).val() && a(this).val(a(this).data("value"))
            })
        });
        a(".ignitiondeck .grid_wrap").parent().attr("class", "clearfix");
        a(".id-widget-wrap, .id-widget.id-mini.ignitiondeck").each(function () {
            var b = a(this).find(".id-product-title:not(:empty)");
            a(this).find(".progress-percentage:not(:empty)");
            var c = a(this).find(".id-progress-raised:not(:empty)"), g = a(this).find(".id-product-funding:not(:empty)"), e = a(this).find(".id-product-total:not(:empty)");
            a(this).find(".id-product-days:not(:empty)");
            var d = a(this).find(".id-widget-date:not(:empty)"), f = "";
            0 < c.length && (f = '<div class="c-holder"><span class="product-goal" style="clear:both;">' + c.text().replace(" ", "") + '</span><span class="helper">' + themeObjects.idText2 + "</span></div>", c.html(f));
            0 < g.length && (g.text(g.text() + " "), c = g.text().match(/\$|K\u010d|Kr|\u20ac|Ft|\u20aa|\u00a5|RM|\u20b1|z\u0142|\u00a3|Fr|kr|\u0e3f|\u20a4|R$/, ""), f = g.text().match(/(\d.+?\s)/, ""), f = '<div class="c-holder"><span class="product-goal" style="clear:both;">' + (null != c && "" != c[0] ? c[0] : "") + (null != f && "" != f[0] ? f[0] : "") + '</span><span class="helper">' + themeObjects.idText3 + "</span></div>", g.html(f));
            0 < e.length && (f = '<div class="c-holder"><span style="clear:both;">' + e.text() + '</span><span class="helper">' + themeObjects.idText4 + "</span></div>", e.html(f));
            0 < d.length && (f = '<div class="c-holder"><div style="clear:both;">' + ga(d) + '</div><span class="helper">' + themeObjects.idText5 + "</span></div>", d.html(f));
            a(this).find(".c-holder").wrapAll('<div class="wrap1 clearfix">');
            a(this).find(".c-holder:nth-child(odd)").addClass("c1");
            a(this).find(".c-holder:nth-child(even)").addClass("c2");
            a(this).find(".product-wrapper, .id-product-proposed-end, .wrap1").wrapAll('<div class="miniF">');
            a(this).find(".btn-container, .id-product-description, .id-product-levels").wrapAll('<div class="id-widget-wrap nofloat">');
            b.attr("class", "product-name");
            a(this).find(".img_cur").attr("class", "product-image-container");
            a(this).attr("class", "id-widget-wrap nofloat");
            a(this).find("div.id-widget.ignitiondeck").removeClass("ignitiondeck");
            a(".level-binding:odd").find(".level-group").addClass("odd");
            0 >= a(this).find(".id-product-levels").children("*").length && a(this).find(".id-product-levels").remove();
            a(".id-product-description:empty").remove();
            a('a.level-binding[href=".idc_lightbox"]').click(function () {
                a(".idc-dropdown .select-replace").text(a(this).find(".id-level-title span").text().slice(0, -1))
            })
        });
        a(".grid_wrap").find(".grid_item").click(function () {
            window.location.href = a(this).find(".learn-more-button").attr("href")
        }).attr("style", "");
        a(".id-widget-wrap, .id-widget.id-mini.ignitiondeck").css("display", "block");
        0 < a(".grid_wrap").length && a(".grid_wrap").imagesLoaded(function () {
            a(".grid_wrap").isotope({
                itemSelector: ".grid_item",
                layoutMode: "fitRows",
                animationOptions: {duration: 1E3, easing: "easeInQuint"}
            })
        });
        T || a(".miniF .progress-percentage").each(function () {
            var b = a(this), c = parseInt(b.text());
            b.text("").css("textIndent", "0");
            b.append('<p></p><div class="circles full"><span class="pieBack"></span><canvas class="pieFront" width="56" height="56"></canvas></div>');
            a(this).parent().append('<span class="helper h1">' + themeObjects.idText1 + "</span>");
            var g = b.find("p"), b = a(this).find(".pieFront")[0], e = new ProgressCircle({
                canvas: b,
                minRadius: 1,
                arcWidth: 26,
                gapWidth: 0,
                centerX: 0,
                centerY: 0,
                infoLineLength: 200,
                horizLineLength: 50,
                infoLineBaseAngle: Math.PI / 6,
                infoLineAngleInterval: Math.PI / 8
            }), d, f = 0;
            e.addEntry({
                fillColor: themeObjects.mainColor, progressListener: function () {
                    return f
                }
            });
            (function (a) {
                f = 0;
                clearInterval(d);
                e.stop();
                e.start(5);
                d = setInterval(function () {
                    f += .0025;
                    g.text(Math.round(100 * f) + "%");
                    f >= a / 100 && (e.stop(), clearInterval(d), f = 0)
                }, 5)
            })(c)
        });
        a(".rbPosts.classic").each(function () {
            var b = a(this).children(".holder").children("article"), c = parseInt(a(this).data("no")), g = 1, e = Math.ceil(b.length / c), d = 0, f = !0;
            a(this).find(".btnNext").on("click", function (a) {
                if (f && g < e) {
                    f = !1;
                    for (var l = d; l < d + c; l++)b.eq(l).stop().fadeOut(250), b.eq(l + c).stop().delay(250).fadeIn(250);
                    g++;
                    d += c;
                    setTimeout(function () {
                        f = !0
                    }, 600)
                }
                a.preventDefault()
            });
            a(this).find(".btnPrev").on("click", function (a) {
                if (f && 1 < g) {
                    f = !1;
                    for (var e = d; e < d + c; e++)b.eq(e).stop().fadeOut(250), b.eq(e - c).stop().delay(250).fadeIn(250);
                    g--;
                    d -= c;
                    setTimeout(function () {
                        f = !0
                    }, 600)
                }
                a.preventDefault()
            });
            a(this).find(".buttons").css("marginTop", -parseInt(a(this).prev(".sectionTitle").css("marginBottom")))
        });
        a(".rbProjects").each(function () {
            a(this).find(".btnAll").css("marginTop", -parseInt(a(this).prev(".sectionTitle").css("marginBottom")))
        });
        jQuery("#form_pay #level_select").addClass("nostyle");
        jQuery("select:not(.nostyle)").styledSelect();
        a(".rbTwitter.rotenabled").each(function () {
            var b = a(this).children("ul").children("li"), c = 0;
            setInterval(function () {
                b.eq(c).fadeOut(250);
                ++c == b.length && (c = 0);
                b.eq(c).delay(260).fadeIn(300)
            }, 6E3)
        });
        a("#top").click(function () {
            a("html,body").animate({scrollTop: 0}, 500, "easeInQuad");
            return !1
        });
        a(".post.format-link").find(".pTitle").prop("target", "_blank");
        a(".rbForm").each(function () {
            function b(a) {
                a.removeClass("contactErrorBorder");
                l.fadeOut()
            }

            var c = a(this).find("form"), g = a(this).find(".name"), e = a(this).find(".email"), d = a(this).find(".subject"), f = a(this).find(".message"), k = a(this).find(".successMessage"), l = a(this).find(".errorMessage");
            g.focus(function () {
                b(a(this))
            });
            e.focus(function () {
                b(a(this))
            });
            d.focus(function () {
                b(a(this))
            });
            f.focus(function () {
                b(a(this))
            });
            c.submit(function () {
                function b(a) {
                    a.val(a.data("value"));
                    a.addClass("contactErrorBorder");
                    l.fadeIn()
                }

                var h = !0, m = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                if (3 > g.val().length || g.val() == g.data("value"))b(g), h = !1;
                "" != e.val() && e.val() != e.data("value") && m.test(e.val()) || (b(e), h = !1);
                if (5 > f.val().length || f.val() == f.data("value"))b(f), h = !1;
                a(this).hasClass("full") && (3 > d.val().length || d.val() == d.data("value")) && (b(d), h = !1);
                h && (c.fadeOut(), a.ajax({
                    type: c.prop("method"),
                    url: c.prop("action"),
                    data: c.serialize(),
                    success: function () {
                        k.fadeIn()
                    }
                }));
                return !1
            })
        });
        document.cookie = "dpi=" + (1 < window.devicePixelRatio) + "; expires=1 Aug 2020";
        a(".rbSocial li").click(function () {
            var b = a(this).find("a");
            "" == b.prop("target") && b.prop("target", "_self");
            window.open(b.prop("href"), b.prop("target"));
            return !1
        });
        a("html").hasClass("no-csstransitions") && (a(".tone #items a").each(function () {
            var b = a(this), c = a(this).find(".caption"), g = a(this).find("h3"), e = a(this).find("img"), d = a(this).css("marginTop"), f = c.css("paddingTop"), k = c.outerHeight(), l = c.css("backgroundColor"), m = c.css("borderBottomColor"), h = g.css("color");
            a(this).addClass("iehover");
            setTimeout(function () {
                var a = b.css("marginTop"), n = c.css("paddingTop"), p = c.outerHeight(), r = c.css("backgroundColor"), t = c.css("borderBottomColor"), u = g.css("color");
                b.removeClass("iehover");
                e.css("opacity", .8);
                b.hover(function () {
                    b.stop().animate({marginTop: a}, 250, "linear");
                    c.stop().animate({paddingTop: n, height: p, backgroundColor: r, borderColor: t}, 250, "linear");
                    g.stop().animate({color: u}, 250, "linear");
                    e.stop().animate({opacity: 1}, 250, "linear")
                }, function () {
                    b.stop().animate({marginTop: d}, 250, "linear");
                    c.stop().animate({paddingTop: f, height: k, backgroundColor: l, borderColor: m}, 250, "linear");
                    g.stop().animate({color: h}, 250, "linear");
                    e.stop().animate({opacity: .8}, 250, "linear")
                })
            }, 1)
        }), a(".ttwo #items a").each(function () {
            var b = a(this), c = a(this).find(".caption"), g = c.css("paddingTop");
            a(this).addClass("iehover");
            setTimeout(function () {
                var a = c.css("paddingTop");
                b.removeClass("iehover");
                c.css("opacity", 0);
                b.hover(function () {
                    c.stop().animate({paddingTop: a, opacity: 1}, 250, "linear")
                }, function () {
                    c.stop().animate({paddingTop: g, opacity: 0}, 250, "linear")
                })
            }, 1)
        }));
        a("body").hasClass("woocommerce-page") && (a(".woocommerce-result-count, .woocommerce-ordering").appendTo("#pageTitle").fadeIn(0), a(".price_slider_wrapper").on("slidecreate", function (b, c) {
            a(this).fadeIn(0);
            a(this).find("a").addClass("noa")
        }), a("ul.products").imagesLoaded(function () {
            a("ul.products").isotope({itemSelector: ".product", layoutMode: "fitRows"})
        }), a(".product_list_widget a").prepend('<span class="imgCover"></span>'), a(".product").find(".summary").find(".star-rating").addClass("visible").appendTo(a(".product").find(".summary").find(".star-rating").prev("div").css("position", "relative")), a("ul.products").find("a.add_to_cart_button").click(function () {
            document.location.href = a(this).prop("href");
            return !1
        }), a(".woocommerce-ordering").find(".select-replace").text(a(".woocommerce-ordering").find("option:selected").text()));
        "1" == themeObjects.wooCommerce23 && (a("div.quantity:not(.buttons_added), td.quantity:not(.buttons_added)").append('<input type="button" value="+" class="plus" />').prepend('<input type="button" value="-" class="minus" />'), a(document).on("click", ".plus, .minus", function () {
            var b = a(this).closest(".quantity").find(".qty"), c = parseFloat(b.val()), g = parseFloat(b.attr("max")), e = parseFloat(b.attr("min")), d = b.attr("step");
            c && "" !== c && "NaN" !== c || (c = 0);
            if ("" === g || "NaN" === g)g = "";
            if ("" === e || "NaN" === e)e = 0;
            if ("any" === d || "" === d || void 0 === d || "NaN" === parseFloat(d))d = 1;
            a(this).is(".plus") ? g && (g == c || c > g) ? b.val(g) : b.val(c + parseFloat(d)) : e && (e == c || c < e) ? b.val(e) : 0 < c && b.val(c - parseFloat(d));
            b.trigger("change")
        }))
    });
    a(window).load(function () {
        a("body").hasClass("page-template-template-portfolio-php") && setTimeout(function () {
            a("#portfolio #items").isotope({
                itemSelector: ".item",
                layoutMode: "fitRows",
                animationOptions: {duration: 1E3, easing: "easeInQuint"}
            })
        }, 1E3)
    })
})(jQuery);
;
/*!
 * MediaElement.js
 * HTML5 <video> and <audio> shim and player
 * http://mediaelementjs.com/
 *
 * Creates a JavaScript object that mimics HTML5 MediaElement API
 * for browsers that don't understand HTML5 or can't play the provided codec
 * Can play MP4 (H.264), Ogg, WebM, FLV, WMV, WMA, ACC, and MP3
 *
 * Copyright 2010-2013, John Dyer (http://j.hn)
 * License: MIT
 *
 */
var mejs = mejs || {};
mejs.version = "2.13.1";
mejs.meIndex = 0;
mejs.plugins = {
    silverlight: [{
        version: [3, 0],
        types: ["video/mp4", "video/m4v", "video/mov", "video/wmv", "audio/wma", "audio/m4a", "audio/mp3", "audio/wav", "audio/mpeg"]
    }],
    flash: [{
        version: [9, 0, 124],
        types: ["video/mp4", "video/m4v", "video/mov", "video/flv", "video/rtmp", "video/x-flv", "audio/flv", "audio/x-flv", "audio/mp3", "audio/m4a", "audio/mpeg", "video/youtube", "video/x-youtube"]
    }],
    youtube: [{version: null, types: ["video/youtube", "video/x-youtube", "audio/youtube", "audio/x-youtube"]}],
    vimeo: [{
        version: null, types: ["video/vimeo",
            "video/x-vimeo"]
    }]
};
mejs.Utility = {
    encodeUrl: function (a) {
        return encodeURIComponent(a)
    }, escapeHTML: function (a) {
        return a.toString().split("&").join("&amp;").split("<").join("&lt;").split('"').join("&quot;")
    }, absolutizeUrl: function (a) {
        var b = document.createElement("div");
        b.innerHTML = '<a href="' + this.escapeHTML(a) + '">x</a>';
        return b.firstChild.href
    }, getScriptPath: function (a) {
        for (var b = 0, c, d = "", e = "", f, g, h = document.getElementsByTagName("script"), l = h.length, j = a.length; b < l; b++) {
            f = h[b].src;
            c = f.lastIndexOf("/");
            if (c > -1) {
                g = f.substring(c +
                1);
                f = f.substring(0, c + 1)
            } else {
                g = f;
                f = ""
            }
            for (c = 0; c < j; c++) {
                e = a[c];
                e = g.indexOf(e);
                if (e > -1) {
                    d = f;
                    break
                }
            }
            if (d !== "")break
        }
        return d
    }, secondsToTimeCode: function (a, b, c, d) {
        if (typeof c == "undefined")c = false; else if (typeof d == "undefined")d = 25;
        var e = Math.floor(a / 3600) % 24, f = Math.floor(a / 60) % 60, g = Math.floor(a % 60);
        a = Math.floor((a % 1 * d).toFixed(3));
        return (b || e > 0 ? (e < 10 ? "0" + e : e) + ":" : "") + (f < 10 ? "0" + f : f) + ":" + (g < 10 ? "0" + g : g) + (c ? ":" + (a < 10 ? "0" + a : a) : "")
    }, timeCodeToSeconds: function (a, b, c, d) {
        if (typeof c == "undefined")c = false; else if (typeof d ==
            "undefined")d = 25;
        a = a.split(":");
        b = parseInt(a[0], 10);
        var e = parseInt(a[1], 10), f = parseInt(a[2], 10), g = 0, h = 0;
        if (c)g = parseInt(a[3]) / d;
        return h = b * 3600 + e * 60 + f + g
    }, convertSMPTEtoSeconds: function (a) {
        if (typeof a != "string")return false;
        a = a.replace(",", ".");
        var b = 0, c = a.indexOf(".") != -1 ? a.split(".")[1].length : 0, d = 1;
        a = a.split(":").reverse();
        for (var e = 0; e < a.length; e++) {
            d = 1;
            if (e > 0)d = Math.pow(60, e);
            b += Number(a[e]) * d
        }
        return Number(b.toFixed(c))
    }, removeSwf: function (a) {
        var b = document.getElementById(a);
        if (b && /object|embed/i.test(b.nodeName))if (mejs.MediaFeatures.isIE) {
            b.style.display =
                "none";
            (function () {
                b.readyState == 4 ? mejs.Utility.removeObjectInIE(a) : setTimeout(arguments.callee, 10)
            })()
        } else b.parentNode.removeChild(b)
    }, removeObjectInIE: function (a) {
        if (a = document.getElementById(a)) {
            for (var b in a)if (typeof a[b] == "function")a[b] = null;
            a.parentNode.removeChild(a)
        }
    }
};
mejs.PluginDetector = {
    hasPluginVersion: function (a, b) {
        var c = this.plugins[a];
        b[1] = b[1] || 0;
        b[2] = b[2] || 0;
        return c[0] > b[0] || c[0] == b[0] && c[1] > b[1] || c[0] == b[0] && c[1] == b[1] && c[2] >= b[2] ? true : false
    },
    nav: window.navigator,
    ua: window.navigator.userAgent.toLowerCase(),
    plugins: [],
    addPlugin: function (a, b, c, d, e) {
        this.plugins[a] = this.detectPlugin(b, c, d, e)
    },
    detectPlugin: function (a, b, c, d) {
        var e = [0, 0, 0], f;
        if (typeof this.nav.plugins != "undefined" && typeof this.nav.plugins[a] == "object") {
            if ((c = this.nav.plugins[a].description) && !(typeof this.nav.mimeTypes != "undefined" && this.nav.mimeTypes[b] && !this.nav.mimeTypes[b].enabledPlugin)) {
                e = c.replace(a, "").replace(/^\s+/, "").replace(/\sr/gi, ".").split(".");
                for (a = 0; a < e.length; a++)e[a] = parseInt(e[a].match(/\d+/), 10)
            }
        } else if (typeof window.ActiveXObject != "undefined")try {
            if (f = new ActiveXObject(c))e = d(f)
        } catch (g) {
        }
        return e
    }
};
mejs.PluginDetector.addPlugin("flash", "Shockwave Flash", "application/x-shockwave-flash", "ShockwaveFlash.ShockwaveFlash", function (a) {
    var b = [];
    if (a = a.GetVariable("$version")) {
        a = a.split(" ")[1].split(",");
        b = [parseInt(a[0], 10), parseInt(a[1], 10), parseInt(a[2], 10)]
    }
    return b
});
mejs.PluginDetector.addPlugin("silverlight", "Silverlight Plug-In", "application/x-silverlight-2", "AgControl.AgControl", function (a) {
    var b = [0, 0, 0, 0], c = function (d, e, f, g) {
        for (; d.isVersionSupported(e[0] + "." + e[1] + "." + e[2] + "." + e[3]);)e[f] += g;
        e[f] -= g
    };
    c(a, b, 0, 1);
    c(a, b, 1, 1);
    c(a, b, 2, 1E4);
    c(a, b, 2, 1E3);
    c(a, b, 2, 100);
    c(a, b, 2, 10);
    c(a, b, 2, 1);
    c(a, b, 3, 1);
    return b
});
mejs.MediaFeatures = {
    init: function () {
        var a = this, b = document, c = mejs.PluginDetector.nav, d = mejs.PluginDetector.ua.toLowerCase(), e, f = ["source", "track", "audio", "video"];
        a.isiPad = d.match(/ipad/i) !== null;
        a.isiPhone = d.match(/iphone/i) !== null;
        a.isiOS = a.isiPhone || a.isiPad;
        a.isAndroid = d.match(/android/i) !== null;
        a.isBustedAndroid = d.match(/android 2\.[12]/) !== null;
        a.isBustedNativeHTTPS = location.protocol === "https:" && (d.match(/android [12]\./) !== null || d.match(/macintosh.* version.* safari/) !== null);
        a.isIE = c.appName.toLowerCase().match(/trident/gi) !==
        null;
        a.isChrome = d.match(/chrome/gi) !== null;
        a.isFirefox = d.match(/firefox/gi) !== null;
        a.isWebkit = d.match(/webkit/gi) !== null;
        a.isGecko = d.match(/gecko/gi) !== null && !a.isWebkit && !a.isIE;
        a.isOpera = d.match(/opera/gi) !== null;
        a.hasTouch = "ontouchstart"in window && window.ontouchstart != null;
        a.svg = !!document.createElementNS && !!document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect;
        for (c = 0; c < f.length; c++)e = document.createElement(f[c]);
        a.supportsMediaTag = typeof e.canPlayType !== "undefined" || a.isBustedAndroid;
        try {
            e.canPlayType("video/mp4")
        } catch (g) {
            a.supportsMediaTag = false
        }
        a.hasSemiNativeFullScreen = typeof e.webkitEnterFullscreen !== "undefined";
        a.hasNativeFullscreen = typeof e.requestFullscreen !== "undefined";
        a.hasWebkitNativeFullScreen = typeof e.webkitRequestFullScreen !== "undefined";
        a.hasMozNativeFullScreen = typeof e.mozRequestFullScreen !== "undefined";
        a.hasMsNativeFullScreen = typeof e.msRequestFullscreen !== "undefined";
        a.hasTrueNativeFullScreen = a.hasWebkitNativeFullScreen || a.hasMozNativeFullScreen || a.hasMsNativeFullScreen;
        a.nativeFullScreenEnabled = a.hasTrueNativeFullScreen;
        if (a.hasMozNativeFullScreen)a.nativeFullScreenEnabled = document.mozFullScreenEnabled; else if (a.hasMsNativeFullScreen)a.nativeFullScreenEnabled = document.msFullscreenEnabled;
        if (a.isChrome)a.hasSemiNativeFullScreen = false;
        if (a.hasTrueNativeFullScreen) {
            a.fullScreenEventName = "";
            if (a.hasWebkitNativeFullScreen)a.fullScreenEventName = "webkitfullscreenchange"; else if (a.hasMozNativeFullScreen)a.fullScreenEventName = "mozfullscreenchange"; else if (a.hasMsNativeFullScreen)a.fullScreenEventName =
                "MSFullscreenChange";
            a.isFullScreen = function () {
                if (e.mozRequestFullScreen)return b.mozFullScreen; else if (e.webkitRequestFullScreen)return b.webkitIsFullScreen; else if (e.hasMsNativeFullScreen)return b.msFullscreenElement !== null
            };
            a.requestFullScreen = function (h) {
                if (a.hasWebkitNativeFullScreen)h.webkitRequestFullScreen(); else if (a.hasMozNativeFullScreen)h.mozRequestFullScreen(); else a.hasMsNativeFullScreen && h.msRequestFullscreen()
            };
            a.cancelFullScreen = function () {
                if (a.hasWebkitNativeFullScreen)document.webkitCancelFullScreen();
                else if (a.hasMozNativeFullScreen)document.mozCancelFullScreen(); else a.hasMsNativeFullScreen && document.msExitFullscreen()
            }
        }
        if (a.hasSemiNativeFullScreen && d.match(/mac os x 10_5/i)) {
            a.hasNativeFullScreen = false;
            a.hasSemiNativeFullScreen = false
        }
    }
};
mejs.MediaFeatures.init();
mejs.HtmlMediaElement = {
    pluginType: "native", isFullScreen: false, setCurrentTime: function (a) {
        this.currentTime = a
    }, setMuted: function (a) {
        this.muted = a
    }, setVolume: function (a) {
        this.volume = a
    }, stop: function () {
        this.pause()
    }, setSrc: function (a) {
        for (var b = this.getElementsByTagName("source"); b.length > 0;)this.removeChild(b[0]);
        if (typeof a == "string")this.src = a; else {
            var c;
            for (b = 0; b < a.length; b++) {
                c = a[b];
                if (this.canPlayType(c.type)) {
                    this.src = c.src;
                    break
                }
            }
        }
    }, setVideoSize: function (a, b) {
        this.width = a;
        this.height = b
    }
};
mejs.PluginMediaElement = function (a, b, c) {
    this.id = a;
    this.pluginType = b;
    this.src = c;
    this.events = {};
    this.attributes = {}
};
mejs.PluginMediaElement.prototype = {
    pluginElement: null,
    pluginType: "",
    isFullScreen: false,
    playbackRate: -1,
    defaultPlaybackRate: -1,
    seekable: [],
    played: [],
    paused: true,
    ended: false,
    seeking: false,
    duration: 0,
    error: null,
    tagName: "",
    muted: false,
    volume: 1,
    currentTime: 0,
    play: function () {
        if (this.pluginApi != null) {
            this.pluginType == "youtube" ? this.pluginApi.playVideo() : this.pluginApi.playMedia();
            this.paused = false
        }
    },
    load: function () {
        if (this.pluginApi != null) {
            this.pluginType != "youtube" && this.pluginApi.loadMedia();
            this.paused =
                false
        }
    },
    pause: function () {
        if (this.pluginApi != null) {
            this.pluginType == "youtube" ? this.pluginApi.pauseVideo() : this.pluginApi.pauseMedia();
            this.paused = true
        }
    },
    stop: function () {
        if (this.pluginApi != null) {
            this.pluginType == "youtube" ? this.pluginApi.stopVideo() : this.pluginApi.stopMedia();
            this.paused = true
        }
    },
    canPlayType: function (a) {
        var b, c, d, e = mejs.plugins[this.pluginType];
        for (b = 0; b < e.length; b++) {
            d = e[b];
            if (mejs.PluginDetector.hasPluginVersion(this.pluginType, d.version))for (c = 0; c < d.types.length; c++)if (a == d.types[c])return "probably"
        }
        return ""
    },
    positionFullscreenButton: function (a, b, c) {
        this.pluginApi != null && this.pluginApi.positionFullscreenButton && this.pluginApi.positionFullscreenButton(Math.floor(a), Math.floor(b), c)
    },
    hideFullscreenButton: function () {
        this.pluginApi != null && this.pluginApi.hideFullscreenButton && this.pluginApi.hideFullscreenButton()
    },
    setSrc: function (a) {
        if (typeof a == "string") {
            this.pluginApi.setSrc(mejs.Utility.absolutizeUrl(a));
            this.src = mejs.Utility.absolutizeUrl(a)
        } else {
            var b, c;
            for (b = 0; b < a.length; b++) {
                c = a[b];
                if (this.canPlayType(c.type)) {
                    this.pluginApi.setSrc(mejs.Utility.absolutizeUrl(c.src));
                    this.src = mejs.Utility.absolutizeUrl(a);
                    break
                }
            }
        }
    },
    setCurrentTime: function (a) {
        if (this.pluginApi != null) {
            this.pluginType == "youtube" ? this.pluginApi.seekTo(a) : this.pluginApi.setCurrentTime(a);
            this.currentTime = a
        }
    },
    setVolume: function (a) {
        if (this.pluginApi != null) {
            this.pluginType == "youtube" ? this.pluginApi.setVolume(a * 100) : this.pluginApi.setVolume(a);
            this.volume = a
        }
    },
    setMuted: function (a) {
        if (this.pluginApi != null) {
            if (this.pluginType == "youtube") {
                a ? this.pluginApi.mute() : this.pluginApi.unMute();
                this.muted = a;
                this.dispatchEvent("volumechange")
            } else this.pluginApi.setMuted(a);
            this.muted = a
        }
    },
    setVideoSize: function (a, b) {
        if (this.pluginElement.style) {
            this.pluginElement.style.width = a + "px";
            this.pluginElement.style.height = b + "px"
        }
        this.pluginApi != null && this.pluginApi.setVideoSize && this.pluginApi.setVideoSize(a, b)
    },
    setFullscreen: function (a) {
        this.pluginApi != null && this.pluginApi.setFullscreen && this.pluginApi.setFullscreen(a)
    },
    enterFullScreen: function () {
        this.pluginApi != null && this.pluginApi.setFullscreen && this.setFullscreen(true)
    },
    exitFullScreen: function () {
        this.pluginApi != null && this.pluginApi.setFullscreen &&
        this.setFullscreen(false)
    },
    addEventListener: function (a, b) {
        this.events[a] = this.events[a] || [];
        this.events[a].push(b)
    },
    removeEventListener: function (a, b) {
        if (!a) {
            this.events = {};
            return true
        }
        var c = this.events[a];
        if (!c)return true;
        if (!b) {
            this.events[a] = [];
            return true
        }
        for (i = 0; i < c.length; i++)if (c[i] === b) {
            this.events[a].splice(i, 1);
            return true
        }
        return false
    },
    dispatchEvent: function (a) {
        var b, c, d = this.events[a];
        if (d) {
            c = Array.prototype.slice.call(arguments, 1);
            for (b = 0; b < d.length; b++)d[b].apply(null, c)
        }
    },
    hasAttribute: function (a) {
        return a in
            this.attributes
    },
    removeAttribute: function (a) {
        delete this.attributes[a]
    },
    getAttribute: function (a) {
        if (this.hasAttribute(a))return this.attributes[a];
        return ""
    },
    setAttribute: function (a, b) {
        this.attributes[a] = b
    },
    remove: function () {
        mejs.Utility.removeSwf(this.pluginElement.id);
        mejs.MediaPluginBridge.unregisterPluginElement(this.pluginElement.id)
    }
};
mejs.MediaPluginBridge = {
    pluginMediaElements: {}, htmlMediaElements: {}, registerPluginElement: function (a, b, c) {
        this.pluginMediaElements[a] = b;
        this.htmlMediaElements[a] = c
    }, unregisterPluginElement: function (a) {
        delete this.pluginMediaElements[a];
        delete this.htmlMediaElements[a]
    }, initPlugin: function (a) {
        var b = this.pluginMediaElements[a], c = this.htmlMediaElements[a];
        if (b) {
            switch (b.pluginType) {
                case "flash":
                    b.pluginElement = b.pluginApi = document.getElementById(a);
                    break;
                case "silverlight":
                    b.pluginElement = document.getElementById(b.id);
                    b.pluginApi = b.pluginElement.Content.MediaElementJS
            }
            b.pluginApi != null && b.success && b.success(b, c)
        }
    }, fireEvent: function (a, b, c) {
        var d, e;
        if (a = this.pluginMediaElements[a]) {
            b = {type: b, target: a};
            for (d in c) {
                a[d] = c[d];
                b[d] = c[d]
            }
            e = c.bufferedTime || 0;
            b.target.buffered = b.buffered = {
                start: function () {
                    return 0
                }, end: function () {
                    return e
                }, length: 1
            };
            a.dispatchEvent(b.type, b)
        }
    }
};
mejs.MediaElementDefaults = {
    mode: "auto",
    plugins: ["flash", "silverlight", "youtube", "vimeo"],
    enablePluginDebug: false,
    httpsBasicAuthSite: false,
    type: "",
    pluginPath: mejs.Utility.getScriptPath(["mediaelement.js", "mediaelement.min.js", "mediaelement-and-player.js", "mediaelement-and-player.min.js"]),
    flashName: "flashmediaelement.swf",
    flashStreamer: "",
    enablePluginSmoothing: false,
    enablePseudoStreaming: false,
    pseudoStreamingStartQueryParam: "start",
    silverlightName: "silverlightmediaelement.xap",
    defaultVideoWidth: 480,
    defaultVideoHeight: 270,
    pluginWidth: -1,
    pluginHeight: -1,
    pluginVars: [],
    timerRate: 250,
    startVolume: 0.8,
    success: function () {
    },
    error: function () {
    }
};
mejs.MediaElement = function (a, b) {
    return mejs.HtmlMediaElementShim.create(a, b)
};
mejs.HtmlMediaElementShim = {
    create: function (a, b) {
        var c = mejs.MediaElementDefaults, d = typeof a == "string" ? document.getElementById(a) : a, e = d.tagName.toLowerCase(), f = e === "audio" || e === "video", g = f ? d.getAttribute("src") : d.getAttribute("href");
        e = d.getAttribute("poster");
        var h = d.getAttribute("autoplay"), l = d.getAttribute("preload"), j = d.getAttribute("controls"), k;
        for (k in b)c[k] = b[k];
        g = typeof g == "undefined" || g === null || g == "" ? null : g;
        e = typeof e == "undefined" || e === null ? "" : e;
        l = typeof l == "undefined" || l === null || l === "false" ?
            "none" : l;
        h = !(typeof h == "undefined" || h === null || h === "false");
        j = !(typeof j == "undefined" || j === null || j === "false");
        k = this.determinePlayback(d, c, mejs.MediaFeatures.supportsMediaTag, f, g);
        k.url = k.url !== null ? mejs.Utility.absolutizeUrl(k.url) : "";
        if (k.method == "native") {
            if (mejs.MediaFeatures.isBustedAndroid) {
                d.src = k.url;
                d.addEventListener("click", function () {
                    d.play()
                }, false)
            }
            return this.updateNative(k, c, h, l)
        } else if (k.method !== "")return this.createPlugin(k, c, e, h, l, j); else {
            this.createErrorMessage(k, c, e);
            return this
        }
    },
    determinePlayback: function (a, b, c, d, e) {
        var f = [], g, h, l, j = {
            method: "",
            url: "",
            htmlMediaElement: a,
            isVideo: a.tagName.toLowerCase() != "audio"
        }, k;
        if (typeof b.type != "undefined" && b.type !== "")if (typeof b.type == "string")f.push({
            type: b.type,
            url: e
        }); else for (g = 0; g < b.type.length; g++)f.push({type: b.type[g], url: e}); else if (e !== null) {
            l = this.formatType(e, a.getAttribute("type"));
            f.push({type: l, url: e})
        } else for (g = 0; g < a.childNodes.length; g++) {
            h = a.childNodes[g];
            if (h.nodeType == 1 && h.tagName.toLowerCase() == "source") {
                e = h.getAttribute("src");
                l = this.formatType(e, h.getAttribute("type"));
                h = h.getAttribute("media");
                if (!h || !window.matchMedia || window.matchMedia && window.matchMedia(h).matches)f.push({
                    type: l,
                    url: e
                })
            }
        }
        if (!d && f.length > 0 && f[0].url !== null && this.getTypeFromFile(f[0].url).indexOf("audio") > -1)j.isVideo = false;
        if (mejs.MediaFeatures.isBustedAndroid)a.canPlayType = function (m) {
            return m.match(/video\/(mp4|m4v)/gi) !== null ? "maybe" : ""
        };
        if (c && (b.mode === "auto" || b.mode === "auto_plugin" || b.mode === "native") && !(mejs.MediaFeatures.isBustedNativeHTTPS &&
            b.httpsBasicAuthSite === true)) {
            if (!d) {
                g = document.createElement(j.isVideo ? "video" : "audio");
                a.parentNode.insertBefore(g, a);
                a.style.display = "none";
                j.htmlMediaElement = a = g
            }
            for (g = 0; g < f.length; g++)if (a.canPlayType(f[g].type).replace(/no/, "") !== "" || a.canPlayType(f[g].type.replace(/mp3/, "mpeg")).replace(/no/, "") !== "") {
                j.method = "native";
                j.url = f[g].url;
                break
            }
            if (j.method === "native") {
                if (j.url !== null)a.src = j.url;
                if (b.mode !== "auto_plugin")return j
            }
        }
        if (b.mode === "auto" || b.mode === "auto_plugin" || b.mode === "shim")for (g =
                                                                                        0; g < f.length; g++) {
            l = f[g].type;
            for (a = 0; a < b.plugins.length; a++) {
                e = b.plugins[a];
                h = mejs.plugins[e];
                for (c = 0; c < h.length; c++) {
                    k = h[c];
                    if (k.version == null || mejs.PluginDetector.hasPluginVersion(e, k.version))for (d = 0; d < k.types.length; d++)if (l == k.types[d]) {
                        j.method = e;
                        j.url = f[g].url;
                        return j
                    }
                }
            }
        }
        if (b.mode === "auto_plugin" && j.method === "native")return j;
        if (j.method === "" && f.length > 0)j.url = f[0].url;
        return j
    }, formatType: function (a, b) {
        return a && !b ? this.getTypeFromFile(a) : b && ~b.indexOf(";") ? b.substr(0, b.indexOf(";")) : b
    },
    getTypeFromFile: function (a) {
        a = a.split("?")[0];
        a = a.substring(a.lastIndexOf(".") + 1).toLowerCase();
        return (/(mp4|m4v|ogg|ogv|webm|webmv|flv|wmv|mpeg|mov)/gi.test(a) ? "video" : "audio") + "/" + this.getTypeFromExtension(a)
    }, getTypeFromExtension: function (a) {
        switch (a) {
            case "mp4":
            case "m4v":
                return "mp4";
            case "webm":
            case "webma":
            case "webmv":
                return "webm";
            case "ogg":
            case "oga":
            case "ogv":
                return "ogg";
            default:
                return a
        }
    }, createErrorMessage: function (a, b, c) {
        var d = a.htmlMediaElement, e = document.createElement("div");
        e.className =
            "me-cannotplay";
        try {
            e.style.width = d.width + "px";
            e.style.height = d.height + "px"
        } catch (f) {
        }
        e.innerHTML = b.customError ? b.customError : c !== "" ? '<a href="' + a.url + '"><img src="' + c + '" width="100%" height="100%" /></a>' : '<a href="' + a.url + '"><span>' + mejs.i18n.t("Download File") + "</span></a>";
        d.parentNode.insertBefore(e, d);
        d.style.display = "none";
        b.error(d)
    }, createPlugin: function (a, b, c, d, e, f) {
        c = a.htmlMediaElement;
        var g = 1, h = 1, l = "me_" + a.method + "_" + mejs.meIndex++, j = new mejs.PluginMediaElement(l, a.method, a.url), k = document.createElement("div"),
            m;
        j.tagName = c.tagName;
        for (m = 0; m < c.attributes.length; m++) {
            var n = c.attributes[m];
            n.specified == true && j.setAttribute(n.name, n.value)
        }
        for (m = c.parentNode; m !== null && m.tagName.toLowerCase() != "body";) {
            if (m.parentNode.tagName.toLowerCase() == "p") {
                m.parentNode.parentNode.insertBefore(m, m.parentNode);
                break
            }
            m = m.parentNode
        }
        if (a.isVideo) {
            g = b.pluginWidth > 0 ? b.pluginWidth : b.videoWidth > 0 ? b.videoWidth : c.getAttribute("width") !== null ? c.getAttribute("width") : b.defaultVideoWidth;
            h = b.pluginHeight > 0 ? b.pluginHeight : b.videoHeight >
            0 ? b.videoHeight : c.getAttribute("height") !== null ? c.getAttribute("height") : b.defaultVideoHeight;
            g = mejs.Utility.encodeUrl(g);
            h = mejs.Utility.encodeUrl(h)
        } else if (b.enablePluginDebug) {
            g = 320;
            h = 240
        }
        j.success = b.success;
        mejs.MediaPluginBridge.registerPluginElement(l, j, c);
        k.className = "me-plugin";
        k.id = l + "_container";
        a.isVideo ? c.parentNode.insertBefore(k, c) : document.body.insertBefore(k, document.body.childNodes[0]);
        d = ["id=" + l, "isvideo=" + (a.isVideo ? "true" : "false"), "autoplay=" + (d ? "true" : "false"), "preload=" + e, "width=" +
        g, "startvolume=" + b.startVolume, "timerrate=" + b.timerRate, "flashstreamer=" + b.flashStreamer, "height=" + h, "pseudostreamstart=" + b.pseudoStreamingStartQueryParam];
        if (a.url !== null)a.method == "flash" ? d.push("file=" + mejs.Utility.encodeUrl(a.url)) : d.push("file=" + a.url);
        b.enablePluginDebug && d.push("debug=true");
        b.enablePluginSmoothing && d.push("smoothing=true");
        b.enablePseudoStreaming && d.push("pseudostreaming=true");
        f && d.push("controls=true");
        if (b.pluginVars)d = d.concat(b.pluginVars);
        switch (a.method) {
            case "silverlight":
                k.innerHTML =
                    '<object data="data:application/x-silverlight-2," type="application/x-silverlight-2" id="' + l + '" name="' + l + '" width="' + g + '" height="' + h + '" class="mejs-shim"><param name="initParams" value="' + d.join(",") + '" /><param name="windowless" value="true" /><param name="background" value="black" /><param name="minRuntimeVersion" value="3.0.0.0" /><param name="autoUpgrade" value="true" /><param name="source" value="' + b.pluginPath + b.silverlightName + '" /></object>';
                break;
            case "flash":
                if (mejs.MediaFeatures.isIE) {
                    a =
                        document.createElement("div");
                    k.appendChild(a);
                    a.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" id="' + l + '" width="' + g + '" height="' + h + '" class="mejs-shim"><param name="movie" value="' + b.pluginPath + b.flashName + "?x=" + new Date + '" /><param name="flashvars" value="' + d.join("&amp;") + '" /><param name="quality" value="high" /><param name="bgcolor" value="#000000" /><param name="wmode" value="transparent" /><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="true" /></object>'
                } else k.innerHTML =
                    '<embed id="' + l + '" name="' + l + '" play="true" loop="false" quality="high" bgcolor="#000000" wmode="transparent" allowScriptAccess="always" allowFullScreen="true" type="application/x-shockwave-flash" pluginspage="//www.macromedia.com/go/getflashplayer" src="' + b.pluginPath + b.flashName + '" flashvars="' + d.join("&") + '" width="' + g + '" height="' + h + '" class="mejs-shim"></embed>';
                break;
            case "youtube":
                b = a.url.substr(a.url.lastIndexOf("=") + 1);
                youtubeSettings = {
                    container: k, containerId: k.id, pluginMediaElement: j, pluginId: l,
                    videoId: b, height: h, width: g
                };
                mejs.PluginDetector.hasPluginVersion("flash", [10, 0, 0]) ? mejs.YouTubeApi.createFlash(youtubeSettings) : mejs.YouTubeApi.enqueueIframe(youtubeSettings);
                break;
            case "vimeo":
                j.vimeoid = a.url.substr(a.url.lastIndexOf("/") + 1);
                k.innerHTML = '<iframe src="http://player.vimeo.com/video/' + j.vimeoid + '?portrait=0&byline=0&title=0" width="' + g + '" height="' + h + '" frameborder="0" class="mejs-shim"></iframe>'
        }
        c.style.display = "none";
        c.removeAttribute("autoplay");
        return j
    }, updateNative: function (a,
                               b) {
        var c = a.htmlMediaElement, d;
        for (d in mejs.HtmlMediaElement)c[d] = mejs.HtmlMediaElement[d];
        b.success(c, c);
        return c
    }
};
mejs.YouTubeApi = {
    isIframeStarted: false, isIframeLoaded: false, loadIframeApi: function () {
        if (!this.isIframeStarted) {
            var a = document.createElement("script");
            a.src = "//www.youtube.com/player_api";
            var b = document.getElementsByTagName("script")[0];
            b.parentNode.insertBefore(a, b);
            this.isIframeStarted = true
        }
    }, iframeQueue: [], enqueueIframe: function (a) {
        if (this.isLoaded)this.createIframe(a); else {
            this.loadIframeApi();
            this.iframeQueue.push(a)
        }
    }, createIframe: function (a) {
        var b = a.pluginMediaElement, c = new YT.Player(a.containerId,
            {
                height: a.height,
                width: a.width,
                videoId: a.videoId,
                playerVars: {controls: 0},
                events: {
                    onReady: function () {
                        a.pluginMediaElement.pluginApi = c;
                        mejs.MediaPluginBridge.initPlugin(a.pluginId);
                        setInterval(function () {
                            mejs.YouTubeApi.createEvent(c, b, "timeupdate")
                        }, 250)
                    }, onStateChange: function (d) {
                        mejs.YouTubeApi.handleStateChange(d.data, c, b)
                    }
                }
            })
    }, createEvent: function (a, b, c) {
        c = {type: c, target: b};
        if (a && a.getDuration) {
            b.currentTime = c.currentTime = a.getCurrentTime();
            b.duration = c.duration = a.getDuration();
            c.paused = b.paused;
            c.ended = b.ended;
            c.muted = a.isMuted();
            c.volume = a.getVolume() / 100;
            c.bytesTotal = a.getVideoBytesTotal();
            c.bufferedBytes = a.getVideoBytesLoaded();
            var d = c.bufferedBytes / c.bytesTotal * c.duration;
            c.target.buffered = c.buffered = {
                start: function () {
                    return 0
                }, end: function () {
                    return d
                }, length: 1
            }
        }
        b.dispatchEvent(c.type, c)
    }, iFrameReady: function () {
        for (this.isIframeLoaded = this.isLoaded = true; this.iframeQueue.length > 0;)this.createIframe(this.iframeQueue.pop())
    }, flashPlayers: {}, createFlash: function (a) {
        this.flashPlayers[a.pluginId] =
            a;
        var b, c = "//www.youtube.com/apiplayer?enablejsapi=1&amp;playerapiid=" + a.pluginId + "&amp;version=3&amp;autoplay=0&amp;controls=0&amp;modestbranding=1&loop=0";
        if (mejs.MediaFeatures.isIE) {
            b = document.createElement("div");
            a.container.appendChild(b);
            b.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" id="' + a.pluginId + '" width="' + a.width + '" height="' + a.height + '" class="mejs-shim"><param name="movie" value="' +
            c + '" /><param name="wmode" value="transparent" /><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="true" /></object>'
        } else a.container.innerHTML = '<object type="application/x-shockwave-flash" id="' + a.pluginId + '" data="' + c + '" width="' + a.width + '" height="' + a.height + '" style="visibility: visible; " class="mejs-shim"><param name="allowScriptAccess" value="always"><param name="wmode" value="transparent"></object>'
    }, flashReady: function (a) {
        var b = this.flashPlayers[a], c =
            document.getElementById(a), d = b.pluginMediaElement;
        d.pluginApi = d.pluginElement = c;
        mejs.MediaPluginBridge.initPlugin(a);
        c.cueVideoById(b.videoId);
        a = b.containerId + "_callback";
        window[a] = function (e) {
            mejs.YouTubeApi.handleStateChange(e, c, d)
        };
        c.addEventListener("onStateChange", a);
        setInterval(function () {
            mejs.YouTubeApi.createEvent(c, d, "timeupdate")
        }, 250)
    }, handleStateChange: function (a, b, c) {
        switch (a) {
            case -1:
                c.paused = true;
                c.ended = true;
                mejs.YouTubeApi.createEvent(b, c, "loadedmetadata");
                break;
            case 0:
                c.paused = false;
                c.ended = true;
                mejs.YouTubeApi.createEvent(b, c, "ended");
                break;
            case 1:
                c.paused = false;
                c.ended = false;
                mejs.YouTubeApi.createEvent(b, c, "play");
                mejs.YouTubeApi.createEvent(b, c, "playing");
                break;
            case 2:
                c.paused = true;
                c.ended = false;
                mejs.YouTubeApi.createEvent(b, c, "pause");
                break;
            case 3:
                mejs.YouTubeApi.createEvent(b, c, "progress")
        }
    }
};
function onYouTubePlayerAPIReady() {
    mejs.YouTubeApi.iFrameReady()
}
function onYouTubePlayerReady(a) {
    mejs.YouTubeApi.flashReady(a)
}
window.mejs = mejs;
window.MediaElement = mejs.MediaElement;
(function (a, b) {
    var c = {locale: {language: "", strings: {}}, methods: {}};
    c.locale.getLanguage = function () {
        return c.locale.language || navigator.language
    };
    if (typeof mejsL10n != "undefined")c.locale.language = mejsL10n.language;
    c.locale.INIT_LANGUAGE = c.locale.getLanguage();
    c.methods.checkPlain = function (d) {
        var e, f, g = {"&": "&amp;", '"': "&quot;", "<": "&lt;", ">": "&gt;"};
        d = String(d);
        for (e in g)if (g.hasOwnProperty(e)) {
            f = RegExp(e, "g");
            d = d.replace(f, g[e])
        }
        return d
    };
    c.methods.formatString = function (d, e) {
        for (var f in e) {
            switch (f.charAt(0)) {
                case "@":
                    e[f] =
                        c.methods.checkPlain(e[f]);
                    break;
                case "!":
                    break;
                default:
                    e[f] = '<em class="placeholder">' + c.methods.checkPlain(e[f]) + "</em>"
            }
            d = d.replace(f, e[f])
        }
        return d
    };
    c.methods.t = function (d, e, f) {
        if (c.locale.strings && c.locale.strings[f.context] && c.locale.strings[f.context][d])d = c.locale.strings[f.context][d];
        if (e)d = c.methods.formatString(d, e);
        return d
    };
    c.t = function (d, e, f) {
        if (typeof d === "string" && d.length > 0) {
            var g = c.locale.getLanguage();
            f = f || {context: g};
            return c.methods.t(d, e, f)
        } else throw{
            name: "InvalidArgumentException",
            message: "First argument is either not a string or empty."
        };
    };
    b.i18n = c
})(document, mejs);
(function (a) {
    if (typeof mejsL10n != "undefined")a[mejsL10n.language] = mejsL10n.strings
})(mejs.i18n.locale.strings);
(function (a) {
    a.de = {
        Fullscreen: "Vollbild",
        "Go Fullscreen": "Vollbild an",
        "Turn off Fullscreen": "Vollbild aus",
        Close: "Schlie\u00dfen"
    }
})(mejs.i18n.locale.strings);
(function (a) {
    a.zh = {
        Fullscreen: "\u5168\u87a2\u5e55",
        "Go Fullscreen": "\u5168\u5c4f\u6a21\u5f0f",
        "Turn off Fullscreen": "\u9000\u51fa\u5168\u5c4f\u6a21\u5f0f",
        Close: "\u95dc\u9589"
    }
})(mejs.i18n.locale.strings);

/*!
 * MediaElementPlayer
 * http://mediaelementjs.com/
 *
 * Creates a controller bar for HTML5 <video> add <audio> tags
 * using jQuery and MediaElement.js (HTML5 Flash/Silverlight wrapper)
 *
 * Copyright 2010-2013, John Dyer (http://j.hn/)
 * License: MIT
 *
 */
if (typeof jQuery != "undefined")mejs.$ = jQuery; else if (typeof ender != "undefined")mejs.$ = ender;
(function (f) {
    mejs.MepDefaults = {
        poster: "",
        showPosterWhenEnded: false,
        defaultVideoWidth: 480,
        defaultVideoHeight: 270,
        videoWidth: -1,
        videoHeight: -1,
        defaultAudioWidth: 400,
        defaultAudioHeight: 30,
        defaultSeekBackwardInterval: function (a) {
            return a.duration * 0.05
        },
        defaultSeekForwardInterval: function (a) {
            return a.duration * 0.05
        },
        audioWidth: -1,
        audioHeight: -1,
        startVolume: 0.8,
        loop: false,
        autoRewind: true,
        enableAutosize: true,
        alwaysShowHours: false,
        showTimecodeFrameCount: false,
        framesPerSecond: 25,
        autosizeProgress: true,
        alwaysShowControls: false,
        hideVideoControlsOnLoad: false,
        clickToPlayPause: true,
        iPadUseNativeControls: false,
        iPhoneUseNativeControls: false,
        AndroidUseNativeControls: false,
        features: ["playpause", "current", "progress", "duration", "tracks", "volume", "fullscreen"],
        isVideo: true,
        enableKeyboard: true,
        pauseOtherPlayers: true,
        keyActions: [{
            keys: [32, 179], action: function (a, b) {
                b.paused || b.ended ? b.play() : b.pause()
            }
        }, {
            keys: [38], action: function (a, b) {
                b.setVolume(Math.min(b.volume + 0.1, 1))
            }
        }, {
            keys: [40], action: function (a, b) {
                b.setVolume(Math.max(b.volume -
                0.1, 0))
            }
        }, {
            keys: [37, 227], action: function (a, b) {
                if (!isNaN(b.duration) && b.duration > 0) {
                    if (a.isVideo) {
                        a.showControls();
                        a.startControlsTimer()
                    }
                    var c = Math.max(b.currentTime - a.options.defaultSeekBackwardInterval(b), 0);
                    b.setCurrentTime(c)
                }
            }
        }, {
            keys: [39, 228], action: function (a, b) {
                if (!isNaN(b.duration) && b.duration > 0) {
                    if (a.isVideo) {
                        a.showControls();
                        a.startControlsTimer()
                    }
                    var c = Math.min(b.currentTime + a.options.defaultSeekForwardInterval(b), b.duration);
                    b.setCurrentTime(c)
                }
            }
        }, {
            keys: [70], action: function (a) {
                if (typeof a.enterFullScreen !=
                    "undefined")a.isFullScreen ? a.exitFullScreen() : a.enterFullScreen()
            }
        }]
    };
    mejs.mepIndex = 0;
    mejs.players = {};
    mejs.MediaElementPlayer = function (a, b) {
        if (!(this instanceof mejs.MediaElementPlayer))return new mejs.MediaElementPlayer(a, b);
        this.$media = this.$node = f(a);
        this.node = this.media = this.$media[0];
        if (typeof this.node.player != "undefined")return this.node.player; else this.node.player = this;
        if (typeof b == "undefined")b = this.$node.data("mejsoptions");
        this.options = f.extend({}, mejs.MepDefaults, b);
        this.id = "mep_" + mejs.mepIndex++;
        mejs.players[this.id] = this;
        this.init();
        return this
    };
    mejs.MediaElementPlayer.prototype = {
        hasFocus: false, controlsAreVisible: true, init: function () {
            var a = this, b = mejs.MediaFeatures, c = f.extend(true, {}, a.options, {
                success: function (d, g) {
                    a.meReady(d, g)
                }, error: function (d) {
                    a.handleError(d)
                }
            }), e = a.media.tagName.toLowerCase();
            a.isDynamic = e !== "audio" && e !== "video";
            a.isVideo = a.isDynamic ? a.options.isVideo : e !== "audio" && a.options.isVideo;
            if (b.isiPad && a.options.iPadUseNativeControls || b.isiPhone && a.options.iPhoneUseNativeControls) {
                a.$media.attr("controls",
                    "controls");
                if (b.isiPad && a.media.getAttribute("autoplay") !== null) {
                    a.media.load();
                    a.media.play()
                }
            } else if (!(b.isAndroid && a.options.AndroidUseNativeControls)) {
                a.$media.removeAttr("controls");
                a.container = f('<div id="' + a.id + '" class="mejs-container ' + (mejs.MediaFeatures.svg ? "svg" : "no-svg") + '"><div class="mejs-inner"><div class="mejs-mediaelement"></div><div class="mejs-layers"></div><div class="mejs-controls"></div><div class="mejs-clear"></div></div></div>').addClass(a.$media[0].className).insertBefore(a.$media);
                a.container.addClass((b.isAndroid ? "mejs-android " : "") + (b.isiOS ? "mejs-ios " : "") + (b.isiPad ? "mejs-ipad " : "") + (b.isiPhone ? "mejs-iphone " : "") + (a.isVideo ? "mejs-video " : "mejs-audio "));
                if (b.isiOS) {
                    b = a.$media.clone();
                    a.container.find(".mejs-mediaelement").append(b);
                    a.$media.remove();
                    a.$node = a.$media = b;
                    a.node = a.media = b[0]
                } else a.container.find(".mejs-mediaelement").append(a.$media);
                a.controls = a.container.find(".mejs-controls");
                a.layers = a.container.find(".mejs-layers");
                b = a.isVideo ? "video" : "audio";
                e = b.substring(0,
                    1).toUpperCase() + b.substring(1);
                a.width = a.options[b + "Width"] > 0 || a.options[b + "Width"].toString().indexOf("%") > -1 ? a.options[b + "Width"] : a.media.style.width !== "" && a.media.style.width !== null ? a.media.style.width : a.media.getAttribute("width") !== null ? a.$media.attr("width") : a.options["default" + e + "Width"];
                a.height = a.options[b + "Height"] > 0 || a.options[b + "Height"].toString().indexOf("%") > -1 ? a.options[b + "Height"] : a.media.style.height !== "" && a.media.style.height !== null ? a.media.style.height : a.$media[0].getAttribute("height") !==
                null ? a.$media.attr("height") : a.options["default" + e + "Height"];
                a.setPlayerSize(a.width, a.height);
                c.pluginWidth = a.width;
                c.pluginHeight = a.height
            }
            mejs.MediaElement(a.$media[0], c);
            typeof a.container != "undefined" && a.controlsAreVisible && a.container.trigger("controlsshown")
        }, showControls: function (a) {
            var b = this;
            a = typeof a == "undefined" || a;
            if (!b.controlsAreVisible) {
                if (a) {
                    b.controls.css("visibility", "visible").stop(true, true).fadeIn(200, function () {
                        b.controlsAreVisible = true;
                        b.container.trigger("controlsshown")
                    });
                    b.container.find(".mejs-control").css("visibility", "visible").stop(true, true).fadeIn(200, function () {
                        b.controlsAreVisible = true
                    })
                } else {
                    b.controls.css("visibility", "visible").css("display", "block");
                    b.container.find(".mejs-control").css("visibility", "visible").css("display", "block");
                    b.controlsAreVisible = true;
                    b.container.trigger("controlsshown")
                }
                b.setControlsSize()
            }
        }, hideControls: function (a) {
            var b = this;
            a = typeof a == "undefined" || a;
            if (!(!b.controlsAreVisible || b.options.alwaysShowControls))if (a) {
                b.controls.stop(true,
                    true).fadeOut(200, function () {
                        f(this).css("visibility", "hidden").css("display", "block");
                        b.controlsAreVisible = false;
                        b.container.trigger("controlshidden")
                    });
                b.container.find(".mejs-control").stop(true, true).fadeOut(200, function () {
                    f(this).css("visibility", "hidden").css("display", "block")
                })
            } else {
                b.controls.css("visibility", "hidden").css("display", "block");
                b.container.find(".mejs-control").css("visibility", "hidden").css("display", "block");
                b.controlsAreVisible = false;
                b.container.trigger("controlshidden")
            }
        },
        controlsTimer: null, startControlsTimer: function (a) {
            var b = this;
            a = typeof a != "undefined" ? a : 1500;
            b.killControlsTimer("start");
            b.controlsTimer = setTimeout(function () {
                b.hideControls();
                b.killControlsTimer("hide")
            }, a)
        }, killControlsTimer: function () {
            if (this.controlsTimer !== null) {
                clearTimeout(this.controlsTimer);
                delete this.controlsTimer;
                this.controlsTimer = null
            }
        }, controlsEnabled: true, disableControls: function () {
            this.killControlsTimer();
            this.hideControls(false);
            this.controlsEnabled = false
        }, enableControls: function () {
            this.showControls(false);
            this.controlsEnabled = true
        }, meReady: function (a, b) {
            var c = this, e = mejs.MediaFeatures, d = b.getAttribute("autoplay");
            d = !(typeof d == "undefined" || d === null || d === "false");
            var g;
            if (!c.created) {
                c.created = true;
                c.media = a;
                c.domNode = b;
                if (!(e.isAndroid && c.options.AndroidUseNativeControls) && !(e.isiPad && c.options.iPadUseNativeControls) && !(e.isiPhone && c.options.iPhoneUseNativeControls)) {
                    c.buildposter(c, c.controls, c.layers, c.media);
                    c.buildkeyboard(c, c.controls, c.layers, c.media);
                    c.buildoverlays(c, c.controls, c.layers, c.media);
                    c.findTracks();
                    for (g in c.options.features) {
                        e = c.options.features[g];
                        if (c["build" + e])try {
                            c["build" + e](c, c.controls, c.layers, c.media)
                        } catch (k) {
                        }
                    }
                    c.container.trigger("controlsready");
                    c.setPlayerSize(c.width, c.height);
                    c.setControlsSize();
                    if (c.isVideo) {
                        if (mejs.MediaFeatures.hasTouch)c.$media.bind("touchstart", function () {
                            if (c.controlsAreVisible)c.hideControls(false); else c.controlsEnabled && c.showControls(false)
                        }); else {
                            mejs.MediaElementPlayer.prototype.clickToPlayPauseCallback = function () {
                                if (c.options.clickToPlayPause)c.media.paused ?
                                    c.media.play() : c.media.pause()
                            };
                            c.media.addEventListener("click", c.clickToPlayPauseCallback, false);
                            c.container.bind("mouseenter mouseover", function () {
                                if (c.controlsEnabled)if (!c.options.alwaysShowControls) {
                                    c.killControlsTimer("enter");
                                    c.showControls();
                                    c.startControlsTimer(2500)
                                }
                            }).bind("mousemove", function () {
                                if (c.controlsEnabled) {
                                    c.controlsAreVisible || c.showControls();
                                    c.options.alwaysShowControls || c.startControlsTimer(2500)
                                }
                            }).bind("mouseleave", function () {
                                c.controlsEnabled && !c.media.paused && !c.options.alwaysShowControls &&
                                c.startControlsTimer(1E3)
                            })
                        }
                        c.options.hideVideoControlsOnLoad && c.hideControls(false);
                        d && !c.options.alwaysShowControls && c.hideControls();
                        c.options.enableAutosize && c.media.addEventListener("loadedmetadata", function (j) {
                            if (c.options.videoHeight <= 0 && c.domNode.getAttribute("height") === null && !isNaN(j.target.videoHeight)) {
                                c.setPlayerSize(j.target.videoWidth, j.target.videoHeight);
                                c.setControlsSize();
                                c.media.setVideoSize(j.target.videoWidth, j.target.videoHeight)
                            }
                        }, false)
                    }
                    a.addEventListener("play", function () {
                        for (var j in mejs.players) {
                            var m =
                                mejs.players[j];
                            m.id != c.id && c.options.pauseOtherPlayers && !m.paused && !m.ended && m.pause();
                            m.hasFocus = false
                        }
                        c.hasFocus = true
                    }, false);
                    c.media.addEventListener("ended", function () {
                        if (c.options.autoRewind)try {
                            c.media.setCurrentTime(0)
                        } catch (j) {
                        }
                        c.media.pause();
                        c.setProgressRail && c.setProgressRail();
                        c.setCurrentRail && c.setCurrentRail();
                        if (c.options.loop)c.media.play(); else!c.options.alwaysShowControls && c.controlsEnabled && c.showControls()
                    }, false);
                    c.media.addEventListener("loadedmetadata", function () {
                        c.updateDuration &&
                        c.updateDuration();
                        c.updateCurrent && c.updateCurrent();
                        if (!c.isFullScreen) {
                            c.setPlayerSize(c.width, c.height);
                            c.setControlsSize()
                        }
                    }, false);
                    setTimeout(function () {
                        c.setPlayerSize(c.width, c.height);
                        c.setControlsSize()
                    }, 50);
                    c.globalBind("resize", function () {
                        c.isFullScreen || mejs.MediaFeatures.hasTrueNativeFullScreen && document.webkitIsFullScreen || c.setPlayerSize(c.width, c.height);
                        c.setControlsSize()
                    });
                    c.media.pluginType == "youtube" && c.container.find(".mejs-overlay-play").hide()
                }
                if (d && a.pluginType == "native") {
                    a.load();
                    a.play()
                }
                if (c.options.success)typeof c.options.success == "string" ? window[c.options.success](c.media, c.domNode, c) : c.options.success(c.media, c.domNode, c)
            }
        }, handleError: function (a) {
            this.controls.hide();
            this.options.error && this.options.error(a)
        }, setPlayerSize: function (a, b) {
            if (typeof a != "undefined")this.width = a;
            if (typeof b != "undefined")this.height = b;
            if (this.height.toString().indexOf("%") > 0 || this.$node.css("max-width") === "100%" || parseInt(this.$node.css("max-width").replace(/px/, ""), 10) / this.$node.offsetParent().width() ===
                1 || this.$node[0].currentStyle && this.$node[0].currentStyle.maxWidth === "100%") {
                var c = this.isVideo ? this.media.videoWidth && this.media.videoWidth > 0 ? this.media.videoWidth : this.options.defaultVideoWidth : this.options.defaultAudioWidth, e = this.isVideo ? this.media.videoHeight && this.media.videoHeight > 0 ? this.media.videoHeight : this.options.defaultVideoHeight : this.options.defaultAudioHeight, d = this.container.parent().closest(":visible").width();
                c = this.isVideo || !this.options.autosizeProgress ? parseInt(d * e / c, 10) : e;
                if (this.container.parent()[0].tagName.toLowerCase() ===
                    "body") {
                    d = f(window).width();
                    c = f(window).height()
                }
                if (c != 0 && d != 0) {
                    this.container.width(d).height(c);
                    this.$media.add(this.container.find(".mejs-shim")).width("100%").height("100%");
                    this.isVideo && this.media.setVideoSize && this.media.setVideoSize(d, c);
                    this.layers.children(".mejs-layer").width("100%").height("100%")
                }
            } else {
                this.container.width(this.width).height(this.height);
                this.layers.children(".mejs-layer").width(this.width).height(this.height)
            }
            d = this.layers.find(".mejs-overlay-play");
            c = d.find(".mejs-overlay-button");
            d.height(this.container.height() - this.controls.height());
            c.css("margin-top", "-" + (c.height() / 2 - this.controls.height() / 2).toString() + "px")
        }, setControlsSize: function () {
            var a = 0, b = 0, c = this.controls.find(".mejs-time-rail"), e = this.controls.find(".mejs-time-total");
            this.controls.find(".mejs-time-current");
            this.controls.find(".mejs-time-loaded");
            var d = c.siblings();
            if (this.options && !this.options.autosizeProgress)b = parseInt(c.css("width"));
            if (b === 0 || !b) {
                d.each(function () {
                    var g = f(this);
                    if (g.css("position") !=
                        "absolute" && g.is(":visible"))a += f(this).outerWidth(true)
                });
                b = this.controls.width() - a - (c.outerWidth(true) - c.width())
            }
            c.width(b);
            e.width(b - (e.outerWidth(true) - e.width()));
            this.setProgressRail && this.setProgressRail();
            this.setCurrentRail && this.setCurrentRail()
        }, buildposter: function (a, b, c, e) {
            var d = f('<div class="mejs-poster mejs-layer"></div>').appendTo(c);
            b = a.$media.attr("poster");
            if (a.options.poster !== "")b = a.options.poster;
            b !== "" && b != null ? this.setPoster(b) : d.hide();
            e.addEventListener("play", function () {
                    d.hide()
                },
                false);
            a.options.showPosterWhenEnded && a.options.autoRewind && e.addEventListener("ended", function () {
                d.show()
            }, false)
        }, setPoster: function (a) {
            var b = this.container.find(".mejs-poster"), c = b.find("img");
            if (c.length == 0)c = f('<img width="100%" height="100%" />').appendTo(b);
            c.attr("src", a);
            b.css({"background-image": "url(" + a + ")"})
        }, buildoverlays: function (a, b, c, e) {
            var d = this;
            if (a.isVideo) {
                var g = f('<div class="mejs-overlay mejs-layer"><div class="mejs-overlay-loading"><span></span></div></div>').hide().appendTo(c),
                    k = f('<div class="mejs-overlay mejs-layer"><div class="mejs-overlay-error"></div></div>').hide().appendTo(c), j = f('<div class="mejs-overlay mejs-layer mejs-overlay-play"><div class="mejs-overlay-button"></div></div>').appendTo(c).click(function () {
                        if (d.options.clickToPlayPause)e.paused ? e.play() : e.pause()
                    });
                e.addEventListener("play", function () {
                    j.hide();
                    g.hide();
                    b.find(".mejs-time-buffering").hide();
                    k.hide()
                }, false);
                e.addEventListener("playing", function () {
                    j.hide();
                    g.hide();
                    b.find(".mejs-time-buffering").hide();
                    k.hide()
                }, false);
                e.addEventListener("seeking", function () {
                    g.show();
                    b.find(".mejs-time-buffering").show()
                }, false);
                e.addEventListener("seeked", function () {
                    g.hide();
                    b.find(".mejs-time-buffering").hide()
                }, false);
                e.addEventListener("pause", function () {
                    mejs.MediaFeatures.isiPhone || j.show()
                }, false);
                e.addEventListener("waiting", function () {
                    g.show();
                    b.find(".mejs-time-buffering").show()
                }, false);
                e.addEventListener("loadeddata", function () {
                    g.show();
                    b.find(".mejs-time-buffering").show()
                }, false);
                e.addEventListener("canplay",
                    function () {
                        g.hide();
                        b.find(".mejs-time-buffering").hide()
                    }, false);
                e.addEventListener("error", function () {
                    g.hide();
                    b.find(".mejs-time-buffering").hide();
                    k.show();
                    k.find("mejs-overlay-error").html("Error loading this resource")
                }, false)
            }
        }, buildkeyboard: function (a, b, c, e) {
            this.globalBind("keydown", function (d) {
                if (a.hasFocus && a.options.enableKeyboard)for (var g = 0, k = a.options.keyActions.length; g < k; g++)for (var j = a.options.keyActions[g], m = 0, q = j.keys.length; m < q; m++)if (d.keyCode == j.keys[m]) {
                    d.preventDefault();
                    j.action(a, e, d.keyCode);
                    return false
                }
                return true
            });
            this.globalBind("click", function (d) {
                if (f(d.target).closest(".mejs-container").length == 0)a.hasFocus = false
            })
        }, findTracks: function () {
            var a = this, b = a.$media.find("track");
            a.tracks = [];
            b.each(function (c, e) {
                e = f(e);
                a.tracks.push({
                    srclang: e.attr("srclang") ? e.attr("srclang").toLowerCase() : "",
                    src: e.attr("src"),
                    kind: e.attr("kind"),
                    label: e.attr("label") || "",
                    entries: [],
                    isLoaded: false
                })
            })
        }, changeSkin: function (a) {
            this.container[0].className = "mejs-container " + a;
            this.setPlayerSize(this.width,
                this.height);
            this.setControlsSize()
        }, play: function () {
            this.media.play()
        }, pause: function () {
            try {
                this.media.pause()
            } catch (a) {
            }
        }, load: function () {
            this.media.load()
        }, setMuted: function (a) {
            this.media.setMuted(a)
        }, setCurrentTime: function (a) {
            this.media.setCurrentTime(a)
        }, getCurrentTime: function () {
            return this.media.currentTime
        }, setVolume: function (a) {
            this.media.setVolume(a)
        }, getVolume: function () {
            return this.media.volume
        }, setSrc: function (a) {
            this.media.setSrc(a)
        }, remove: function () {
            var a, b;
            for (a in this.options.features) {
                b =
                    this.options.features[a];
                if (this["clean" + b])try {
                    this["clean" + b](this)
                } catch (c) {
                }
            }
            if (this.isDynamic)this.$node.insertBefore(this.container); else {
                this.$media.prop("controls", true);
                this.$node.clone().show().insertBefore(this.container);
                this.$node.remove()
            }
            this.media.pluginType !== "native" && this.media.remove();
            delete mejs.players[this.id];
            this.container.remove();
            this.globalUnbind();
            delete this.node.player
        }
    };
    (function () {
        function a(c, e) {
            var d = {d: [], w: []};
            f.each((c || "").split(" "), function (g, k) {
                var j = k + "." +
                    e;
                if (j.indexOf(".") === 0) {
                    d.d.push(j);
                    d.w.push(j)
                } else d[b.test(k) ? "w" : "d"].push(j)
            });
            d.d = d.d.join(" ");
            d.w = d.w.join(" ");
            return d
        }

        var b = /^((after|before)print|(before)?unload|hashchange|message|o(ff|n)line|page(hide|show)|popstate|resize|storage)\b/;
        mejs.MediaElementPlayer.prototype.globalBind = function (c, e, d) {
            c = a(c, this.id);
            c.d && f(document).bind(c.d, e, d);
            c.w && f(window).bind(c.w, e, d)
        };
        mejs.MediaElementPlayer.prototype.globalUnbind = function (c, e) {
            c = a(c, this.id);
            c.d && f(document).unbind(c.d, e);
            c.w && f(window).unbind(c.w,
                e)
        }
    })();
    if (typeof jQuery != "undefined")jQuery.fn.mediaelementplayer = function (a) {
        a === false ? this.each(function () {
            var b = jQuery(this).data("mediaelementplayer");
            b && b.remove();
            jQuery(this).removeData("mediaelementplayer")
        }) : this.each(function () {
            jQuery(this).data("mediaelementplayer", new mejs.MediaElementPlayer(this, a))
        });
        return this
    };
    f(document).ready(function () {
        f(".mejs-player").mediaelementplayer()
    });
    window.MediaElementPlayer = mejs.MediaElementPlayer
})(mejs.$);
(function (f) {
    f.extend(mejs.MepDefaults, {playpauseText: mejs.i18n.t("Play/Pause")});
    f.extend(MediaElementPlayer.prototype, {
        buildplaypause: function (a, b, c, e) {
            var d = f('<div class="mejs-button mejs-playpause-button mejs-play" ><button type="button" aria-controls="' + this.id + '" title="' + this.options.playpauseText + '" aria-label="' + this.options.playpauseText + '"></button></div>').appendTo(b).click(function (g) {
                g.preventDefault();
                e.paused ? e.play() : e.pause();
                return false
            });
            e.addEventListener("play", function () {
                    d.removeClass("mejs-play").addClass("mejs-pause")
                },
                false);
            e.addEventListener("playing", function () {
                d.removeClass("mejs-play").addClass("mejs-pause")
            }, false);
            e.addEventListener("pause", function () {
                d.removeClass("mejs-pause").addClass("mejs-play")
            }, false);
            e.addEventListener("paused", function () {
                d.removeClass("mejs-pause").addClass("mejs-play")
            }, false)
        }
    })
})(mejs.$);
(function (f) {
    f.extend(mejs.MepDefaults, {stopText: "Stop"});
    f.extend(MediaElementPlayer.prototype, {
        buildstop: function (a, b, c, e) {
            f('<div class="mejs-button mejs-stop-button mejs-stop"><button type="button" aria-controls="' + this.id + '" title="' + this.options.stopText + '" aria-label="' + this.options.stopText + '"></button></div>').appendTo(b).click(function () {
                e.paused || e.pause();
                if (e.currentTime > 0) {
                    e.setCurrentTime(0);
                    e.pause();
                    b.find(".mejs-time-current").width("0px");
                    b.find(".mejs-time-handle").css("left",
                        "0px");
                    b.find(".mejs-time-float-current").html(mejs.Utility.secondsToTimeCode(0));
                    b.find(".mejs-currenttime").html(mejs.Utility.secondsToTimeCode(0));
                    c.find(".mejs-poster").show()
                }
            })
        }
    })
})(mejs.$);
(function (f) {
    f.extend(MediaElementPlayer.prototype, {
        buildprogress: function (a, b, c, e) {
            f('<div class="mejs-time-rail"><span class="mejs-time-total"><span class="mejs-time-buffering"></span><span class="mejs-time-loaded"></span><span class="mejs-time-current"></span><span class="mejs-time-handle"></span><span class="mejs-time-float"><span class="mejs-time-float-current">00:00</span><span class="mejs-time-float-corner"></span></span></span></div>').appendTo(b);
            b.find(".mejs-time-buffering").hide();
            var d =
                this, g = b.find(".mejs-time-total");
            c = b.find(".mejs-time-loaded");
            var k = b.find(".mejs-time-current"), j = b.find(".mejs-time-handle"), m = b.find(".mejs-time-float"), q = b.find(".mejs-time-float-current"), p = function (h) {
                h = h.pageX;
                var l = g.offset(), r = g.outerWidth(true), n = 0, o = n = 0;
                if (e.duration) {
                    if (h < l.left)h = l.left; else if (h > r + l.left)h = r + l.left;
                    o = h - l.left;
                    n = o / r;
                    n = n <= 0.02 ? 0 : n * e.duration;
                    t && n !== e.currentTime && e.setCurrentTime(n);
                    if (!mejs.MediaFeatures.hasTouch) {
                        m.css("left", o);
                        q.html(mejs.Utility.secondsToTimeCode(n));
                        m.show()
                    }
                }
            }, t = false;
            g.bind("mousedown", function (h) {
                if (h.which === 1) {
                    t = true;
                    p(h);
                    d.globalBind("mousemove.dur", function (l) {
                        p(l)
                    });
                    d.globalBind("mouseup.dur", function () {
                        t = false;
                        m.hide();
                        d.globalUnbind(".dur")
                    });
                    return false
                }
            }).bind("mouseenter", function () {
                d.globalBind("mousemove.dur", function (h) {
                    p(h)
                });
                mejs.MediaFeatures.hasTouch || m.show()
            }).bind("mouseleave", function () {
                if (!t) {
                    d.globalUnbind(".dur");
                    m.hide()
                }
            });
            e.addEventListener("progress", function (h) {
                a.setProgressRail(h);
                a.setCurrentRail(h)
            }, false);
            e.addEventListener("timeupdate", function (h) {
                a.setProgressRail(h);
                a.setCurrentRail(h)
            }, false);
            d.loaded = c;
            d.total = g;
            d.current = k;
            d.handle = j
        }, setProgressRail: function (a) {
            var b = a != undefined ? a.target : this.media, c = null;
            if (b && b.buffered && b.buffered.length > 0 && b.buffered.end && b.duration)c = b.buffered.end(0) / b.duration; else if (b && b.bytesTotal != undefined && b.bytesTotal > 0 && b.bufferedBytes != undefined)c = b.bufferedBytes / b.bytesTotal; else if (a && a.lengthComputable && a.total != 0)c = a.loaded / a.total;
            if (c !== null) {
                c = Math.min(1,
                    Math.max(0, c));
                this.loaded && this.total && this.loaded.width(this.total.width() * c)
            }
        }, setCurrentRail: function () {
            if (this.media.currentTime != undefined && this.media.duration)if (this.total && this.handle) {
                var a = Math.round(this.total.width() * this.media.currentTime / this.media.duration), b = a - Math.round(this.handle.outerWidth(true) / 2);
                this.current.width(a);
                this.handle.css("left", b)
            }
        }
    })
})(mejs.$);
(function (f) {
    f.extend(mejs.MepDefaults, {duration: -1, timeAndDurationSeparator: "<span> | </span>"});
    f.extend(MediaElementPlayer.prototype, {
        buildcurrent: function (a, b, c, e) {
            f('<div class="mejs-time"><span class="mejs-currenttime">' + (a.options.alwaysShowHours ? "00:" : "") + (a.options.showTimecodeFrameCount ? "00:00:00" : "00:00") + "</span></div>").appendTo(b);
            this.currenttime = this.controls.find(".mejs-currenttime");
            e.addEventListener("timeupdate", function () {
                a.updateCurrent()
            }, false)
        }, buildduration: function (a, b,
                                    c, e) {
            if (b.children().last().find(".mejs-currenttime").length > 0)f(this.options.timeAndDurationSeparator + '<span class="mejs-duration">' + (this.options.duration > 0 ? mejs.Utility.secondsToTimeCode(this.options.duration, this.options.alwaysShowHours || this.media.duration > 3600, this.options.showTimecodeFrameCount, this.options.framesPerSecond || 25) : (a.options.alwaysShowHours ? "00:" : "") + (a.options.showTimecodeFrameCount ? "00:00:00" : "00:00")) + "</span>").appendTo(b.find(".mejs-time")); else {
                b.find(".mejs-currenttime").parent().addClass("mejs-currenttime-container");
                f('<div class="mejs-time mejs-duration-container"><span class="mejs-duration">' + (this.options.duration > 0 ? mejs.Utility.secondsToTimeCode(this.options.duration, this.options.alwaysShowHours || this.media.duration > 3600, this.options.showTimecodeFrameCount, this.options.framesPerSecond || 25) : (a.options.alwaysShowHours ? "00:" : "") + (a.options.showTimecodeFrameCount ? "00:00:00" : "00:00")) + "</span></div>").appendTo(b)
            }
            this.durationD = this.controls.find(".mejs-duration");
            e.addEventListener("timeupdate", function () {
                    a.updateDuration()
                },
                false)
        }, updateCurrent: function () {
            if (this.currenttime)this.currenttime.html(mejs.Utility.secondsToTimeCode(this.media.currentTime, this.options.alwaysShowHours || this.media.duration > 3600, this.options.showTimecodeFrameCount, this.options.framesPerSecond || 25))
        }, updateDuration: function () {
            this.container.toggleClass("mejs-long-video", this.media.duration > 3600);
            if (this.durationD && (this.options.duration > 0 || this.media.duration))this.durationD.html(mejs.Utility.secondsToTimeCode(this.options.duration > 0 ? this.options.duration :
                this.media.duration, this.options.alwaysShowHours, this.options.showTimecodeFrameCount, this.options.framesPerSecond || 25))
        }
    })
})(mejs.$);
(function (f) {
    f.extend(mejs.MepDefaults, {
        muteText: mejs.i18n.t("Mute Toggle"),
        hideVolumeOnTouchDevices: true,
        audioVolume: "horizontal",
        videoVolume: "vertical"
    });
    f.extend(MediaElementPlayer.prototype, {
        buildvolume: function (a, b, c, e) {
            if (!(mejs.MediaFeatures.hasTouch && this.options.hideVolumeOnTouchDevices)) {
                var d = this, g = d.isVideo ? d.options.videoVolume : d.options.audioVolume, k = g == "horizontal" ? f('<div class="mejs-button mejs-volume-button mejs-mute"><button type="button" aria-controls="' + d.id + '" title="' + d.options.muteText +
                    '" aria-label="' + d.options.muteText + '"></button></div><div class="mejs-horizontal-volume-slider"><div class="mejs-horizontal-volume-total"></div><div class="mejs-horizontal-volume-current"></div><div class="mejs-horizontal-volume-handle"></div></div>').appendTo(b) : f('<div class="mejs-button mejs-volume-button mejs-mute"><button type="button" aria-controls="' + d.id + '" title="' + d.options.muteText + '" aria-label="' + d.options.muteText + '"></button><div class="mejs-volume-slider"><div class="mejs-volume-total"></div><div class="mejs-volume-current"></div><div class="mejs-volume-handle"></div></div></div>').appendTo(b),
                    j = d.container.find(".mejs-volume-slider, .mejs-horizontal-volume-slider"), m = d.container.find(".mejs-volume-total, .mejs-horizontal-volume-total"), q = d.container.find(".mejs-volume-current, .mejs-horizontal-volume-current"), p = d.container.find(".mejs-volume-handle, .mejs-horizontal-volume-handle"), t = function (n, o) {
                        if (!j.is(":visible") && typeof o == "undefined") {
                            j.show();
                            t(n, true);
                            j.hide()
                        } else {
                            n = Math.max(0, n);
                            n = Math.min(n, 1);
                            n == 0 ? k.removeClass("mejs-mute").addClass("mejs-unmute") : k.removeClass("mejs-unmute").addClass("mejs-mute");
                            if (g == "vertical") {
                                var s = m.height(), u = m.position(), v = s - s * n;
                                p.css("top", Math.round(u.top + v - p.height() / 2));
                                q.height(s - v);
                                q.css("top", u.top + v)
                            } else {
                                s = m.width();
                                u = m.position();
                                s = s * n;
                                p.css("left", Math.round(u.left + s - p.width() / 2));
                                q.width(Math.round(s))
                            }
                        }
                    }, h = function (n) {
                        var o = null, s = m.offset();
                        if (g == "vertical") {
                            o = m.height();
                            parseInt(m.css("top").replace(/px/, ""), 10);
                            o = (o - (n.pageY - s.top)) / o;
                            if (s.top == 0 || s.left == 0)return
                        } else {
                            o = m.width();
                            o = (n.pageX - s.left) / o
                        }
                        o = Math.max(0, o);
                        o = Math.min(o, 1);
                        t(o);
                        o == 0 ? e.setMuted(true) :
                            e.setMuted(false);
                        e.setVolume(o)
                    }, l = false, r = false;
                k.hover(function () {
                    j.show();
                    r = true
                }, function () {
                    r = false;
                    !l && g == "vertical" && j.hide()
                });
                j.bind("mouseover", function () {
                    r = true
                }).bind("mousedown", function (n) {
                    h(n);
                    d.globalBind("mousemove.vol", function (o) {
                        h(o)
                    });
                    d.globalBind("mouseup.vol", function () {
                        l = false;
                        d.globalUnbind(".vol");
                        !r && g == "vertical" && j.hide()
                    });
                    l = true;
                    return false
                });
                k.find("button").click(function () {
                    e.setMuted(!e.muted)
                });
                e.addEventListener("volumechange", function () {
                    if (!l)if (e.muted) {
                        t(0);
                        k.removeClass("mejs-mute").addClass("mejs-unmute")
                    } else {
                        t(e.volume);
                        k.removeClass("mejs-unmute").addClass("mejs-mute")
                    }
                }, false);
                if (d.container.is(":visible")) {
                    t(a.options.startVolume);
                    a.options.startVolume === 0 && e.setMuted(true);
                    e.pluginType === "native" && e.setVolume(a.options.startVolume)
                }
            }
        }
    })
})(mejs.$);
(function (f) {
    f.extend(mejs.MepDefaults, {
        usePluginFullScreen: true, newWindowCallback: function () {
            return ""
        }, fullscreenText: mejs.i18n.t("Fullscreen")
    });
    f.extend(MediaElementPlayer.prototype, {
        isFullScreen: false, isNativeFullScreen: false, isInIframe: false, buildfullscreen: function (a, b, c, e) {
            if (a.isVideo) {
                a.isInIframe = window.location != window.parent.location;
                if (mejs.MediaFeatures.hasTrueNativeFullScreen) {
                    c = function () {
                        if (a.isFullScreen)if (mejs.MediaFeatures.isFullScreen()) {
                            a.isNativeFullScreen = true;
                            a.setControlsSize()
                        } else {
                            a.isNativeFullScreen =
                                false;
                            a.exitFullScreen()
                        }
                    };
                    mejs.MediaFeatures.hasMozNativeFullScreen ? a.globalBind(mejs.MediaFeatures.fullScreenEventName, c) : a.container.bind(mejs.MediaFeatures.fullScreenEventName, c)
                }
                var d = this, g = f('<div class="mejs-button mejs-fullscreen-button"><button type="button" aria-controls="' + d.id + '" title="' + d.options.fullscreenText + '" aria-label="' + d.options.fullscreenText + '"></button></div>').appendTo(b);
                if (d.media.pluginType === "native" || !d.options.usePluginFullScreen && !mejs.MediaFeatures.isFirefox)g.click(function () {
                    mejs.MediaFeatures.hasTrueNativeFullScreen &&
                    mejs.MediaFeatures.isFullScreen() || a.isFullScreen ? a.exitFullScreen() : a.enterFullScreen()
                }); else {
                    var k = null;
                    if (function () {
                            var h = document.createElement("x"), l = document.documentElement, r = window.getComputedStyle;
                            if (!("pointerEvents"in h.style))return false;
                            h.style.pointerEvents = "auto";
                            h.style.pointerEvents = "x";
                            l.appendChild(h);
                            r = r && r(h, "").pointerEvents === "auto";
                            l.removeChild(h);
                            return !!r
                        }() && !mejs.MediaFeatures.isOpera) {
                        var j = false, m = function () {
                            if (j) {
                                for (var h in q)q[h].hide();
                                g.css("pointer-events",
                                    "");
                                d.controls.css("pointer-events", "");
                                d.media.removeEventListener("click", d.clickToPlayPauseCallback);
                                j = false
                            }
                        }, q = {};
                        b = ["top", "left", "right", "bottom"];
                        var p, t = function () {
                            var h = g.offset().left - d.container.offset().left, l = g.offset().top - d.container.offset().top, r = g.outerWidth(true), n = g.outerHeight(true), o = d.container.width(), s = d.container.height();
                            for (p in q)q[p].css({position: "absolute", top: 0, left: 0});
                            q.top.width(o).height(l);
                            q.left.width(h).height(n).css({top: l});
                            q.right.width(o - h - r).height(n).css({
                                top: l,
                                left: h + r
                            });
                            q.bottom.width(o).height(s - n - l).css({top: l + n})
                        };
                        d.globalBind("resize", function () {
                            t()
                        });
                        p = 0;
                        for (c = b.length; p < c; p++)q[b[p]] = f('<div class="mejs-fullscreen-hover" />').appendTo(d.container).mouseover(m).hide();
                        g.on("mouseover", function () {
                            if (!d.isFullScreen) {
                                var h = g.offset(), l = a.container.offset();
                                e.positionFullscreenButton(h.left - l.left, h.top - l.top, false);
                                g.css("pointer-events", "none");
                                d.controls.css("pointer-events", "none");
                                d.media.addEventListener("click", d.clickToPlayPauseCallback);
                                for (p in q)q[p].show();
                                t();
                                j = true
                            }
                        });
                        e.addEventListener("fullscreenchange", function () {
                            d.isFullScreen = !d.isFullScreen;
                            d.isFullScreen ? d.media.removeEventListener("click", d.clickToPlayPauseCallback) : d.media.addEventListener("click", d.clickToPlayPauseCallback);
                            m()
                        });
                        d.globalBind("mousemove", function (h) {
                            if (j) {
                                var l = g.offset();
                                if (h.pageY < l.top || h.pageY > l.top + g.outerHeight(true) || h.pageX < l.left || h.pageX > l.left + g.outerWidth(true)) {
                                    g.css("pointer-events", "");
                                    d.controls.css("pointer-events", "");
                                    j = false
                                }
                            }
                        })
                    } else g.on("mouseover",
                        function () {
                            if (k !== null) {
                                clearTimeout(k);
                                delete k
                            }
                            var h = g.offset(), l = a.container.offset();
                            e.positionFullscreenButton(h.left - l.left, h.top - l.top, true)
                        }).on("mouseout", function () {
                            if (k !== null) {
                                clearTimeout(k);
                                delete k
                            }
                            k = setTimeout(function () {
                                e.hideFullscreenButton()
                            }, 1500)
                        })
                }
                a.fullscreenBtn = g;
                d.globalBind("keydown", function (h) {
                    if ((mejs.MediaFeatures.hasTrueNativeFullScreen && mejs.MediaFeatures.isFullScreen() || d.isFullScreen) && h.keyCode == 27)a.exitFullScreen()
                })
            }
        }, cleanfullscreen: function (a) {
            a.exitFullScreen()
        },
        containerSizeTimeout: null, enterFullScreen: function () {
            var a = this;
            if (!(a.media.pluginType !== "native" && (mejs.MediaFeatures.isFirefox || a.options.usePluginFullScreen))) {
                f(document.documentElement).addClass("mejs-fullscreen");
                normalHeight = a.container.height();
                normalWidth = a.container.width();
                if (a.media.pluginType === "native")if (mejs.MediaFeatures.hasTrueNativeFullScreen) {
                    mejs.MediaFeatures.requestFullScreen(a.container[0]);
                    a.isInIframe && setTimeout(function c() {
                        if (a.isNativeFullScreen)f(window).width() !==
                        screen.width ? a.exitFullScreen() : setTimeout(c, 500)
                    }, 500)
                } else if (mejs.MediaFeatures.hasSemiNativeFullScreen) {
                    a.media.webkitEnterFullscreen();
                    return
                }
                if (a.isInIframe) {
                    var b = a.options.newWindowCallback(this);
                    if (b !== "")if (mejs.MediaFeatures.hasTrueNativeFullScreen)setTimeout(function () {
                        if (!a.isNativeFullScreen) {
                            a.pause();
                            window.open(b, a.id, "top=0,left=0,width=" + screen.availWidth + ",height=" + screen.availHeight + ",resizable=yes,scrollbars=no,status=no,toolbar=no")
                        }
                    }, 250); else {
                        a.pause();
                        window.open(b, a.id,
                            "top=0,left=0,width=" + screen.availWidth + ",height=" + screen.availHeight + ",resizable=yes,scrollbars=no,status=no,toolbar=no");
                        return
                    }
                }
                a.container.addClass("mejs-container-fullscreen").width("100%").height("100%");
                a.containerSizeTimeout = setTimeout(function () {
                    a.container.css({width: "100%", height: "100%"});
                    a.setControlsSize()
                }, 500);
                if (a.media.pluginType === "native")a.$media.width("100%").height("100%"); else {
                    a.container.find(".mejs-shim").width("100%").height("100%");
                    a.media.setVideoSize(f(window).width(),
                        f(window).height())
                }
                a.layers.children("div").width("100%").height("100%");
                a.fullscreenBtn && a.fullscreenBtn.removeClass("mejs-fullscreen").addClass("mejs-unfullscreen");
                a.setControlsSize();
                a.isFullScreen = true
            }
        }, exitFullScreen: function () {
            clearTimeout(this.containerSizeTimeout);
            if (this.media.pluginType !== "native" && mejs.MediaFeatures.isFirefox)this.media.setFullscreen(false); else {
                if (mejs.MediaFeatures.hasTrueNativeFullScreen && (mejs.MediaFeatures.isFullScreen() || this.isFullScreen))mejs.MediaFeatures.cancelFullScreen();
                f(document.documentElement).removeClass("mejs-fullscreen");
                this.container.removeClass("mejs-container-fullscreen").width(normalWidth).height(normalHeight);
                if (this.media.pluginType === "native")this.$media.width(normalWidth).height(normalHeight); else {
                    this.container.find(".mejs-shim").width(normalWidth).height(normalHeight);
                    this.media.setVideoSize(normalWidth, normalHeight)
                }
                this.layers.children("div").width(normalWidth).height(normalHeight);
                this.fullscreenBtn.removeClass("mejs-unfullscreen").addClass("mejs-fullscreen");
                this.setControlsSize();
                this.isFullScreen = false
            }
        }
    })
})(mejs.$);
(function (f) {
    f.extend(mejs.MepDefaults, {
        startLanguage: "",
        tracksText: mejs.i18n.t("Captions/Subtitles"),
        hideCaptionsButtonWhenEmpty: true,
        toggleCaptionsButtonWhenOnlyOne: false,
        slidesSelector: ""
    });
    f.extend(MediaElementPlayer.prototype, {
        hasChapters: false, buildtracks: function (a, b, c, e) {
            if (a.tracks.length != 0) {
                var d;
                if (this.domNode.textTracks)for (d = this.domNode.textTracks.length - 1; d >= 0; d--)this.domNode.textTracks[d].mode = "hidden";
                a.chapters = f('<div class="mejs-chapters mejs-layer"></div>').prependTo(c).hide();
                a.captions =
                    f('<div class="mejs-captions-layer mejs-layer"><div class="mejs-captions-position mejs-captions-position-hover"><span class="mejs-captions-text"></span></div></div>').prependTo(c).hide();
                a.captionsText = a.captions.find(".mejs-captions-text");
                a.captionsButton = f('<div class="mejs-button mejs-captions-button"><button type="button" aria-controls="' + this.id + '" title="' + this.options.tracksText + '" aria-label="' + this.options.tracksText + '"></button><div class="mejs-captions-selector"><ul><li><input type="radio" name="' +
                a.id + '_captions" id="' + a.id + '_captions_none" value="none" checked="checked" /><label for="' + a.id + '_captions_none">' + mejs.i18n.t("None") + "</label></li></ul></div></div>").appendTo(b);
                for (d = b = 0; d < a.tracks.length; d++)a.tracks[d].kind == "subtitles" && b++;
                this.options.toggleCaptionsButtonWhenOnlyOne && b == 1 ? a.captionsButton.on("click", function () {
                    a.setTrack(a.selectedTrack == null ? a.tracks[0].srclang : "none")
                }) : a.captionsButton.hover(function () {
                        f(this).find(".mejs-captions-selector").css("visibility", "visible")
                    },
                    function () {
                        f(this).find(".mejs-captions-selector").css("visibility", "hidden")
                    }).on("click", "input[type=radio]", function () {
                        lang = this.value;
                        a.setTrack(lang)
                    });
                a.options.alwaysShowControls ? a.container.find(".mejs-captions-position").addClass("mejs-captions-position-hover") : a.container.bind("controlsshown", function () {
                    a.container.find(".mejs-captions-position").addClass("mejs-captions-position-hover")
                }).bind("controlshidden", function () {
                    e.paused || a.container.find(".mejs-captions-position").removeClass("mejs-captions-position-hover")
                });
                a.trackToLoad = -1;
                a.selectedTrack = null;
                a.isLoadingTrack = false;
                for (d = 0; d < a.tracks.length; d++)a.tracks[d].kind == "subtitles" && a.addTrackButton(a.tracks[d].srclang, a.tracks[d].label);
                a.loadNextTrack();
                e.addEventListener("timeupdate", function () {
                    a.displayCaptions()
                }, false);
                if (a.options.slidesSelector != "") {
                    a.slidesContainer = f(a.options.slidesSelector);
                    e.addEventListener("timeupdate", function () {
                        a.displaySlides()
                    }, false)
                }
                e.addEventListener("loadedmetadata", function () {
                    a.displayChapters()
                }, false);
                a.container.hover(function () {
                    if (a.hasChapters) {
                        a.chapters.css("visibility",
                            "visible");
                        a.chapters.fadeIn(200).height(a.chapters.find(".mejs-chapter").outerHeight())
                    }
                }, function () {
                    a.hasChapters && !e.paused && a.chapters.fadeOut(200, function () {
                        f(this).css("visibility", "hidden");
                        f(this).css("display", "block")
                    })
                });
                a.node.getAttribute("autoplay") !== null && a.chapters.css("visibility", "hidden")
            }
        }, setTrack: function (a) {
            var b;
            if (a == "none") {
                this.selectedTrack = null;
                this.captionsButton.removeClass("mejs-captions-enabled")
            } else for (b = 0; b < this.tracks.length; b++)if (this.tracks[b].srclang == a) {
                this.selectedTrack ==
                null && this.captionsButton.addClass("mejs-captions-enabled");
                this.selectedTrack = this.tracks[b];
                this.captions.attr("lang", this.selectedTrack.srclang);
                this.displayCaptions();
                break
            }
        }, loadNextTrack: function () {
            this.trackToLoad++;
            if (this.trackToLoad < this.tracks.length) {
                this.isLoadingTrack = true;
                this.loadTrack(this.trackToLoad)
            } else {
                this.isLoadingTrack = false;
                this.checkForTracks()
            }
        }, loadTrack: function (a) {
            var b = this, c = b.tracks[a];
            f.ajax({
                url: c.src, dataType: "text", success: function (e) {
                    c.entries = typeof e == "string" &&
                    /<tt\s+xml/ig.exec(e) ? mejs.TrackFormatParser.dfxp.parse(e) : mejs.TrackFormatParser.webvvt.parse(e);
                    c.isLoaded = true;
                    b.enableTrackButton(c.srclang, c.label);
                    b.loadNextTrack();
                    c.kind == "chapters" && b.media.addEventListener("play", function () {
                        b.media.duration > 0 && b.displayChapters(c)
                    }, false);
                    c.kind == "slides" && b.setupSlides(c)
                }, error: function () {
                    b.loadNextTrack()
                }
            })
        }, enableTrackButton: function (a, b) {
            if (b === "")b = mejs.language.codes[a] || a;
            this.captionsButton.find("input[value=" + a + "]").prop("disabled", false).siblings("label").html(b);
            this.options.startLanguage == a && f("#" + this.id + "_captions_" + a).click();
            this.adjustLanguageBox()
        }, addTrackButton: function (a, b) {
            if (b === "")b = mejs.language.codes[a] || a;
            this.captionsButton.find("ul").append(f('<li><input type="radio" name="' + this.id + '_captions" id="' + this.id + "_captions_" + a + '" value="' + a + '" disabled="disabled" /><label for="' + this.id + "_captions_" + a + '">' + b + " (loading)</label></li>"));
            this.adjustLanguageBox();
            this.container.find(".mejs-captions-translations option[value=" + a + "]").remove()
        },
        adjustLanguageBox: function () {
            this.captionsButton.find(".mejs-captions-selector").height(this.captionsButton.find(".mejs-captions-selector ul").outerHeight(true) + this.captionsButton.find(".mejs-captions-translations").outerHeight(true))
        }, checkForTracks: function () {
            var a = false;
            if (this.options.hideCaptionsButtonWhenEmpty) {
                for (i = 0; i < this.tracks.length; i++)if (this.tracks[i].kind == "subtitles") {
                    a = true;
                    break
                }
                if (!a) {
                    this.captionsButton.hide();
                    this.setControlsSize()
                }
            }
        }, displayCaptions: function () {
            if (typeof this.tracks !=
                "undefined") {
                var a, b = this.selectedTrack;
                if (b != null && b.isLoaded)for (a = 0; a < b.entries.times.length; a++)if (this.media.currentTime >= b.entries.times[a].start && this.media.currentTime <= b.entries.times[a].stop) {
                    this.captionsText.html(b.entries.text[a]);
                    this.captions.show().height(0);
                    return
                }
                this.captions.hide()
            }
        }, setupSlides: function (a) {
            this.slides = a;
            this.slides.entries.imgs = [this.slides.entries.text.length];
            this.showSlide(0)
        }, showSlide: function (a) {
            if (!(typeof this.tracks == "undefined" || typeof this.slidesContainer ==
                "undefined")) {
                var b = this, c = b.slides.entries.text[a], e = b.slides.entries.imgs[a];
                if (typeof e == "undefined" || typeof e.fadeIn == "undefined")b.slides.entries.imgs[a] = e = f('<img src="' + c + '">').on("load", function () {
                    e.appendTo(b.slidesContainer).hide().fadeIn().siblings(":visible").fadeOut()
                }); else!e.is(":visible") && !e.is(":animated") && e.fadeIn().siblings(":visible").fadeOut()
            }
        }, displaySlides: function () {
            if (typeof this.slides != "undefined") {
                var a = this.slides, b;
                for (b = 0; b < a.entries.times.length; b++)if (this.media.currentTime >=
                    a.entries.times[b].start && this.media.currentTime <= a.entries.times[b].stop) {
                    this.showSlide(b);
                    break
                }
            }
        }, displayChapters: function () {
            var a;
            for (a = 0; a < this.tracks.length; a++)if (this.tracks[a].kind == "chapters" && this.tracks[a].isLoaded) {
                this.drawChapters(this.tracks[a]);
                this.hasChapters = true;
                break
            }
        }, drawChapters: function (a) {
            var b = this, c, e, d = e = 0;
            b.chapters.empty();
            for (c = 0; c < a.entries.times.length; c++) {
                e = a.entries.times[c].stop - a.entries.times[c].start;
                e = Math.floor(e / b.media.duration * 100);
                if (e + d > 100 || c == a.entries.times.length -
                    1 && e + d < 100)e = 100 - d;
                b.chapters.append(f('<div class="mejs-chapter" rel="' + a.entries.times[c].start + '" style="left: ' + d.toString() + "%;width: " + e.toString() + '%;"><div class="mejs-chapter-block' + (c == a.entries.times.length - 1 ? " mejs-chapter-block-last" : "") + '"><span class="ch-title">' + a.entries.text[c] + '</span><span class="ch-time">' + mejs.Utility.secondsToTimeCode(a.entries.times[c].start) + "&ndash;" + mejs.Utility.secondsToTimeCode(a.entries.times[c].stop) + "</span></div></div>"));
                d += e
            }
            b.chapters.find("div.mejs-chapter").click(function () {
                b.media.setCurrentTime(parseFloat(f(this).attr("rel")));
                b.media.paused && b.media.play()
            });
            b.chapters.show()
        }
    });
    mejs.language = {
        codes: {
            af: "Afrikaans",
            sq: "Albanian",
            ar: "Arabic",
            be: "Belarusian",
            bg: "Bulgarian",
            ca: "Catalan",
            zh: "Chinese",
            "zh-cn": "Chinese Simplified",
            "zh-tw": "Chinese Traditional",
            hr: "Croatian",
            cs: "Czech",
            da: "Danish",
            nl: "Dutch",
            en: "English",
            et: "Estonian",
            tl: "Filipino",
            fi: "Finnish",
            fr: "French",
            gl: "Galician",
            de: "German",
            el: "Greek",
            ht: "Haitian Creole",
            iw: "Hebrew",
            hi: "Hindi",
            hu: "Hungarian",
            is: "Icelandic",
            id: "Indonesian",
            ga: "Irish",
            it: "Italian",
            ja: "Japanese",
            ko: "Korean",
            lv: "Latvian",
            lt: "Lithuanian",
            mk: "Macedonian",
            ms: "Malay",
            mt: "Maltese",
            no: "Norwegian",
            fa: "Persian",
            pl: "Polish",
            pt: "Portuguese",
            ro: "Romanian",
            ru: "Russian",
            sr: "Serbian",
            sk: "Slovak",
            sl: "Slovenian",
            es: "Spanish",
            sw: "Swahili",
            sv: "Swedish",
            tl: "Tagalog",
            th: "Thai",
            tr: "Turkish",
            uk: "Ukrainian",
            vi: "Vietnamese",
            cy: "Welsh",
            yi: "Yiddish"
        }
    };
    mejs.TrackFormatParser = {
        webvvt: {
            pattern_identifier: /^([a-zA-z]+-)?[0-9]+$/,
            pattern_timecode: /^([0-9]{2}:[0-9]{2}:[0-9]{2}([,.][0-9]{1,3})?) --\> ([0-9]{2}:[0-9]{2}:[0-9]{2}([,.][0-9]{3})?)(.*)$/,
            parse: function (a) {
                var b = 0;
                a = mejs.TrackFormatParser.split2(a, /\r?\n/);
                for (var c = {text: [], times: []}, e, d; b < a.length; b++)if (this.pattern_identifier.exec(a[b])) {
                    b++;
                    if ((e = this.pattern_timecode.exec(a[b])) && b < a.length) {
                        b++;
                        d = a[b];
                        for (b++; a[b] !== "" && b < a.length;) {
                            d = d + "\n" + a[b];
                            b++
                        }
                        d = f.trim(d).replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, "<a href='$1' target='_blank'>$1</a>");
                        c.text.push(d);
                        c.times.push({
                            start: mejs.Utility.convertSMPTEtoSeconds(e[1]) == 0 ? 0.2 : mejs.Utility.convertSMPTEtoSeconds(e[1]),
                            stop: mejs.Utility.convertSMPTEtoSeconds(e[3]), settings: e[5]
                        })
                    }
                }
                return c
            }
        }, dfxp: {
            parse: function (a) {
                a = f(a).filter("tt");
                var b = 0;
                b = a.children("div").eq(0);
                var c = b.find("p");
                b = a.find("#" + b.attr("style"));
                var e, d;
                a = {text: [], times: []};
                if (b.length) {
                    d = b.removeAttr("id").get(0).attributes;
                    if (d.length) {
                        e = {};
                        for (b = 0; b < d.length; b++)e[d[b].name.split(":")[1]] = d[b].value
                    }
                }
                for (b = 0; b < c.length; b++) {
                    var g;
                    d = {start: null, stop: null, style: null};
                    if (c.eq(b).attr("begin"))d.start = mejs.Utility.convertSMPTEtoSeconds(c.eq(b).attr("begin"));
                    if (!d.start && c.eq(b - 1).attr("end"))d.start = mejs.Utility.convertSMPTEtoSeconds(c.eq(b - 1).attr("end"));
                    if (c.eq(b).attr("end"))d.stop = mejs.Utility.convertSMPTEtoSeconds(c.eq(b).attr("end"));
                    if (!d.stop && c.eq(b + 1).attr("begin"))d.stop = mejs.Utility.convertSMPTEtoSeconds(c.eq(b + 1).attr("begin"));
                    if (e) {
                        g = "";
                        for (var k in e)g += k + ":" + e[k] + ";"
                    }
                    if (g)d.style = g;
                    if (d.start == 0)d.start = 0.2;
                    a.times.push(d);
                    d = f.trim(c.eq(b).html()).replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig,
                        "<a href='$1' target='_blank'>$1</a>");
                    a.text.push(d);
                    if (a.times.start == 0)a.times.start = 2
                }
                return a
            }
        }, split2: function (a, b) {
            return a.split(b)
        }
    };
    if ("x\n\ny".split(/\n/gi).length != 3)mejs.TrackFormatParser.split2 = function (a, b) {
        var c = [], e = "", d;
        for (d = 0; d < a.length; d++) {
            e += a.substring(d, d + 1);
            if (b.test(e)) {
                c.push(e.replace(b, ""));
                e = ""
            }
        }
        c.push(e);
        return c
    }
})(mejs.$);
(function (f) {
    f.extend(mejs.MepDefaults, {
        contextMenuItems: [{
            render: function (a) {
                if (typeof a.enterFullScreen == "undefined")return null;
                return a.isFullScreen ? mejs.i18n.t("Turn off Fullscreen") : mejs.i18n.t("Go Fullscreen")
            }, click: function (a) {
                a.isFullScreen ? a.exitFullScreen() : a.enterFullScreen()
            }
        }, {
            render: function (a) {
                return a.media.muted ? mejs.i18n.t("Unmute") : mejs.i18n.t("Mute")
            }, click: function (a) {
                a.media.muted ? a.setMuted(false) : a.setMuted(true)
            }
        }, {isSeparator: true}, {
            render: function () {
                return mejs.i18n.t("Download Video")
            },
            click: function (a) {
                window.location.href = a.media.currentSrc
            }
        }]
    });
    f.extend(MediaElementPlayer.prototype, {
        buildcontextmenu: function (a) {
            a.contextMenu = f('<div class="mejs-contextmenu"></div>').appendTo(f("body")).hide();
            a.container.bind("contextmenu", function (b) {
                if (a.isContextMenuEnabled) {
                    b.preventDefault();
                    a.renderContextMenu(b.clientX - 1, b.clientY - 1);
                    return false
                }
            });
            a.container.bind("click", function () {
                a.contextMenu.hide()
            });
            a.contextMenu.bind("mouseleave", function () {
                a.startContextMenuTimer()
            })
        }, cleancontextmenu: function (a) {
            a.contextMenu.remove()
        },
        isContextMenuEnabled: true, enableContextMenu: function () {
            this.isContextMenuEnabled = true
        }, disableContextMenu: function () {
            this.isContextMenuEnabled = false
        }, contextMenuTimeout: null, startContextMenuTimer: function () {
            var a = this;
            a.killContextMenuTimer();
            a.contextMenuTimer = setTimeout(function () {
                a.hideContextMenu();
                a.killContextMenuTimer()
            }, 750)
        }, killContextMenuTimer: function () {
            var a = this.contextMenuTimer;
            if (a != null) {
                clearTimeout(a);
                delete a
            }
        }, hideContextMenu: function () {
            this.contextMenu.hide()
        }, renderContextMenu: function (a,
                                        b) {
            for (var c = this, e = "", d = c.options.contextMenuItems, g = 0, k = d.length; g < k; g++)if (d[g].isSeparator)e += '<div class="mejs-contextmenu-separator"></div>'; else {
                var j = d[g].render(c);
                if (j != null)e += '<div class="mejs-contextmenu-item" data-itemindex="' + g + '" id="element-' + Math.random() * 1E6 + '">' + j + "</div>"
            }
            c.contextMenu.empty().append(f(e)).css({top: b, left: a}).show();
            c.contextMenu.find(".mejs-contextmenu-item").each(function () {
                var m = f(this), q = parseInt(m.data("itemindex"), 10), p = c.options.contextMenuItems[q];
                typeof p.show !=
                "undefined" && p.show(m, c);
                m.click(function () {
                    typeof p.click != "undefined" && p.click(c);
                    c.contextMenu.hide()
                })
            });
            setTimeout(function () {
                c.killControlsTimer("rev3")
            }, 100)
        }
    })
})(mejs.$);
(function (f) {
    f.extend(mejs.MepDefaults, {postrollCloseText: mejs.i18n.t("Close")});
    f.extend(MediaElementPlayer.prototype, {
        buildpostroll: function (a, b, c) {
            var e = this.container.find('link[rel="postroll"]').attr("href");
            if (typeof e !== "undefined") {
                a.postroll = f('<div class="mejs-postroll-layer mejs-layer"><a class="mejs-postroll-close" onclick="$(this).parent().hide();return false;">' + this.options.postrollCloseText + '</a><div class="mejs-postroll-layer-content"></div></div>').prependTo(c).hide();
                this.media.addEventListener("ended",
                    function () {
                        f.ajax({
                            dataType: "html", url: e, success: function (d) {
                                c.find(".mejs-postroll-layer-content").html(d)
                            }
                        });
                        a.postroll.show()
                    }, false)
            }
        }
    })
})(mejs.$);


;
/*!
 * jQuery UI Core 1.11.2
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/ui-core/
 */
!function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : a(jQuery)
}(function (a) {
    function b(b, d) {
        var e, f, g, h = b.nodeName.toLowerCase();
        return "area" === h ? (e = b.parentNode, f = e.name, b.href && f && "map" === e.nodeName.toLowerCase() ? (g = a("img[usemap='#" + f + "']")[0], !!g && c(g)) : !1) : (/input|select|textarea|button|object/.test(h) ? !b.disabled : "a" === h ? b.href || d : d) && c(b)
    }

    function c(b) {
        return a.expr.filters.visible(b) && !a(b).parents().addBack().filter(function () {
                return "hidden" === a.css(this, "visibility")
            }).length
    }

    a.ui = a.ui || {}, a.extend(a.ui, {
        version: "1.11.2",
        keyCode: {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    }), a.fn.extend({
        scrollParent: function (b) {
            var c = this.css("position"), d = "absolute" === c, e = b ? /(auto|scroll|hidden)/ : /(auto|scroll)/, f = this.parents().filter(function () {
                var b = a(this);
                return d && "static" === b.css("position") ? !1 : e.test(b.css("overflow") + b.css("overflow-y") + b.css("overflow-x"))
            }).eq(0);
            return "fixed" !== c && f.length ? f : a(this[0].ownerDocument || document)
        }, uniqueId: function () {
            var a = 0;
            return function () {
                return this.each(function () {
                    this.id || (this.id = "ui-id-" + ++a)
                })
            }
        }(), removeUniqueId: function () {
            return this.each(function () {
                /^ui-id-\d+$/.test(this.id) && a(this).removeAttr("id")
            })
        }
    }), a.extend(a.expr[":"], {
        data: a.expr.createPseudo ? a.expr.createPseudo(function (b) {
            return function (c) {
                return !!a.data(c, b)
            }
        }) : function (b, c, d) {
            return !!a.data(b, d[3])
        }, focusable: function (c) {
            return b(c, !isNaN(a.attr(c, "tabindex")))
        }, tabbable: function (c) {
            var d = a.attr(c, "tabindex"), e = isNaN(d);
            return (e || d >= 0) && b(c, !e)
        }
    }), a("<a>").outerWidth(1).jquery || a.each(["Width", "Height"], function (b, c) {
        function d(b, c, d, f) {
            return a.each(e, function () {
                c -= parseFloat(a.css(b, "padding" + this)) || 0, d && (c -= parseFloat(a.css(b, "border" + this + "Width")) || 0), f && (c -= parseFloat(a.css(b, "margin" + this)) || 0)
            }), c
        }

        var e = "Width" === c ? ["Left", "Right"] : ["Top", "Bottom"], f = c.toLowerCase(), g = {
            innerWidth: a.fn.innerWidth,
            innerHeight: a.fn.innerHeight,
            outerWidth: a.fn.outerWidth,
            outerHeight: a.fn.outerHeight
        };
        a.fn["inner" + c] = function (b) {
            return void 0 === b ? g["inner" + c].call(this) : this.each(function () {
                a(this).css(f, d(this, b) + "px")
            })
        }, a.fn["outer" + c] = function (b, e) {
            return "number" != typeof b ? g["outer" + c].call(this, b) : this.each(function () {
                a(this).css(f, d(this, b, !0, e) + "px")
            })
        }
    }), a.fn.addBack || (a.fn.addBack = function (a) {
        return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
    }), a("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (a.fn.removeData = function (b) {
        return function (c) {
            return arguments.length ? b.call(this, a.camelCase(c)) : b.call(this)
        }
    }(a.fn.removeData)), a.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), a.fn.extend({
        focus: function (b) {
            return function (c, d) {
                return "number" == typeof c ? this.each(function () {
                    var b = this;
                    setTimeout(function () {
                        a(b).focus(), d && d.call(b)
                    }, c)
                }) : b.apply(this, arguments)
            }
        }(a.fn.focus), disableSelection: function () {
            var a = "onselectstart"in document.createElement("div") ? "selectstart" : "mousedown";
            return function () {
                return this.bind(a + ".ui-disableSelection", function (a) {
                    a.preventDefault()
                })
            }
        }(), enableSelection: function () {
            return this.unbind(".ui-disableSelection")
        }, zIndex: function (b) {
            if (void 0 !== b)return this.css("zIndex", b);
            if (this.length)for (var c, d, e = a(this[0]); e.length && e[0] !== document;) {
                if (c = e.css("position"), ("absolute" === c || "relative" === c || "fixed" === c) && (d = parseInt(e.css("zIndex"), 10), !isNaN(d) && 0 !== d))return d;
                e = e.parent()
            }
            return 0
        }
    }), a.ui.plugin = {
        add: function (b, c, d) {
            var e, f = a.ui[b].prototype;
            for (e in d)f.plugins[e] = f.plugins[e] || [], f.plugins[e].push([c, d[e]])
        }, call: function (a, b, c, d) {
            var e, f = a.plugins[b];
            if (f && (d || a.element[0].parentNode && 11 !== a.element[0].parentNode.nodeType))for (e = 0; e < f.length; e++)a.options[f[e][0]] && f[e][1].apply(a.element, c)
        }
    }
});
;
/*!
 * jQuery UI Widget 1.11.2
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/jQuery.widget/
 */
!function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : a(jQuery)
}(function (a) {
    var b = 0, c = Array.prototype.slice;
    return a.cleanData = function (b) {
        return function (c) {
            var d, e, f;
            for (f = 0; null != (e = c[f]); f++)try {
                d = a._data(e, "events"), d && d.remove && a(e).triggerHandler("remove")
            } catch (g) {
            }
            b(c)
        }
    }(a.cleanData), a.widget = function (b, c, d) {
        var e, f, g, h, i = {}, j = b.split(".")[0];
        return b = b.split(".")[1], e = j + "-" + b, d || (d = c, c = a.Widget), a.expr[":"][e.toLowerCase()] = function (b) {
            return !!a.data(b, e)
        }, a[j] = a[j] || {}, f = a[j][b], g = a[j][b] = function (a, b) {
            return this._createWidget ? void(arguments.length && this._createWidget(a, b)) : new g(a, b)
        }, a.extend(g, f, {
            version: d.version,
            _proto: a.extend({}, d),
            _childConstructors: []
        }), h = new c, h.options = a.widget.extend({}, h.options), a.each(d, function (b, d) {
            return a.isFunction(d) ? void(i[b] = function () {
                var a = function () {
                    return c.prototype[b].apply(this, arguments)
                }, e = function (a) {
                    return c.prototype[b].apply(this, a)
                };
                return function () {
                    var b, c = this._super, f = this._superApply;
                    return this._super = a, this._superApply = e, b = d.apply(this, arguments), this._super = c, this._superApply = f, b
                }
            }()) : void(i[b] = d)
        }), g.prototype = a.widget.extend(h, {widgetEventPrefix: f ? h.widgetEventPrefix || b : b}, i, {
            constructor: g,
            namespace: j,
            widgetName: b,
            widgetFullName: e
        }), f ? (a.each(f._childConstructors, function (b, c) {
            var d = c.prototype;
            a.widget(d.namespace + "." + d.widgetName, g, c._proto)
        }), delete f._childConstructors) : c._childConstructors.push(g), a.widget.bridge(b, g), g
    }, a.widget.extend = function (b) {
        for (var d, e, f = c.call(arguments, 1), g = 0, h = f.length; h > g; g++)for (d in f[g])e = f[g][d], f[g].hasOwnProperty(d) && void 0 !== e && (b[d] = a.isPlainObject(e) ? a.isPlainObject(b[d]) ? a.widget.extend({}, b[d], e) : a.widget.extend({}, e) : e);
        return b
    }, a.widget.bridge = function (b, d) {
        var e = d.prototype.widgetFullName || b;
        a.fn[b] = function (f) {
            var g = "string" == typeof f, h = c.call(arguments, 1), i = this;
            return f = !g && h.length ? a.widget.extend.apply(null, [f].concat(h)) : f, this.each(g ? function () {
                var c, d = a.data(this, e);
                return "instance" === f ? (i = d, !1) : d ? a.isFunction(d[f]) && "_" !== f.charAt(0) ? (c = d[f].apply(d, h), c !== d && void 0 !== c ? (i = c && c.jquery ? i.pushStack(c.get()) : c, !1) : void 0) : a.error("no such method '" + f + "' for " + b + " widget instance") : a.error("cannot call methods on " + b + " prior to initialization; attempted to call method '" + f + "'")
            } : function () {
                var b = a.data(this, e);
                b ? (b.option(f || {}), b._init && b._init()) : a.data(this, e, new d(f, this))
            }), i
        }
    }, a.Widget = function () {
    }, a.Widget._childConstructors = [], a.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {disabled: !1, create: null},
        _createWidget: function (c, d) {
            d = a(d || this.defaultElement || this)[0], this.element = a(d), this.uuid = b++, this.eventNamespace = "." + this.widgetName + this.uuid, this.bindings = a(), this.hoverable = a(), this.focusable = a(), d !== this && (a.data(d, this.widgetFullName, this), this._on(!0, this.element, {
                remove: function (a) {
                    a.target === d && this.destroy()
                }
            }), this.document = a(d.style ? d.ownerDocument : d.document || d), this.window = a(this.document[0].defaultView || this.document[0].parentWindow)), this.options = a.widget.extend({}, this.options, this._getCreateOptions(), c), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
        },
        _getCreateOptions: a.noop,
        _getCreateEventData: a.noop,
        _create: a.noop,
        _init: a.noop,
        destroy: function () {
            this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(a.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
        },
        _destroy: a.noop,
        widget: function () {
            return this.element
        },
        option: function (b, c) {
            var d, e, f, g = b;
            if (0 === arguments.length)return a.widget.extend({}, this.options);
            if ("string" == typeof b)if (g = {}, d = b.split("."), b = d.shift(), d.length) {
                for (e = g[b] = a.widget.extend({}, this.options[b]), f = 0; f < d.length - 1; f++)e[d[f]] = e[d[f]] || {}, e = e[d[f]];
                if (b = d.pop(), 1 === arguments.length)return void 0 === e[b] ? null : e[b];
                e[b] = c
            } else {
                if (1 === arguments.length)return void 0 === this.options[b] ? null : this.options[b];
                g[b] = c
            }
            return this._setOptions(g), this
        },
        _setOptions: function (a) {
            var b;
            for (b in a)this._setOption(b, a[b]);
            return this
        },
        _setOption: function (a, b) {
            return this.options[a] = b, "disabled" === a && (this.widget().toggleClass(this.widgetFullName + "-disabled", !!b), b && (this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus"))), this
        },
        enable: function () {
            return this._setOptions({disabled: !1})
        },
        disable: function () {
            return this._setOptions({disabled: !0})
        },
        _on: function (b, c, d) {
            var e, f = this;
            "boolean" != typeof b && (d = c, c = b, b = !1), d ? (c = e = a(c), this.bindings = this.bindings.add(c)) : (d = c, c = this.element, e = this.widget()), a.each(d, function (d, g) {
                function h() {
                    return b || f.options.disabled !== !0 && !a(this).hasClass("ui-state-disabled") ? ("string" == typeof g ? f[g] : g).apply(f, arguments) : void 0
                }

                "string" != typeof g && (h.guid = g.guid = g.guid || h.guid || a.guid++);
                var i = d.match(/^([\w:-]*)\s*(.*)$/), j = i[1] + f.eventNamespace, k = i[2];
                k ? e.delegate(k, j, h) : c.bind(j, h)
            })
        },
        _off: function (b, c) {
            c = (c || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, b.unbind(c).undelegate(c), this.bindings = a(this.bindings.not(b).get()), this.focusable = a(this.focusable.not(b).get()), this.hoverable = a(this.hoverable.not(b).get())
        },
        _delay: function (a, b) {
            function c() {
                return ("string" == typeof a ? d[a] : a).apply(d, arguments)
            }

            var d = this;
            return setTimeout(c, b || 0)
        },
        _hoverable: function (b) {
            this.hoverable = this.hoverable.add(b), this._on(b, {
                mouseenter: function (b) {
                    a(b.currentTarget).addClass("ui-state-hover")
                }, mouseleave: function (b) {
                    a(b.currentTarget).removeClass("ui-state-hover")
                }
            })
        },
        _focusable: function (b) {
            this.focusable = this.focusable.add(b), this._on(b, {
                focusin: function (b) {
                    a(b.currentTarget).addClass("ui-state-focus")
                }, focusout: function (b) {
                    a(b.currentTarget).removeClass("ui-state-focus")
                }
            })
        },
        _trigger: function (b, c, d) {
            var e, f, g = this.options[b];
            if (d = d || {}, c = a.Event(c), c.type = (b === this.widgetEventPrefix ? b : this.widgetEventPrefix + b).toLowerCase(), c.target = this.element[0], f = c.originalEvent)for (e in f)e in c || (c[e] = f[e]);
            return this.element.trigger(c, d), !(a.isFunction(g) && g.apply(this.element[0], [c].concat(d)) === !1 || c.isDefaultPrevented())
        }
    }, a.each({show: "fadeIn", hide: "fadeOut"}, function (b, c) {
        a.Widget.prototype["_" + b] = function (d, e, f) {
            "string" == typeof e && (e = {effect: e});
            var g, h = e ? e === !0 || "number" == typeof e ? c : e.effect || c : b;
            e = e || {}, "number" == typeof e && (e = {duration: e}), g = !a.isEmptyObject(e), e.complete = f, e.delay && d.delay(e.delay), g && a.effects && a.effects.effect[h] ? d[b](e) : h !== b && d[h] ? d[h](e.duration, e.easing, f) : d.queue(function (c) {
                a(this)[b](), f && f.call(d[0]), c()
            })
        }
    }), a.widget
});
;
/*!
 * jQuery UI Mouse 1.11.2
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/mouse/
 */
!function (a) {
    "function" == typeof define && define.amd ? define(["jquery", "./widget"], a) : a(jQuery)
}(function (a) {
    var b = !1;
    return a(document).mouseup(function () {
        b = !1
    }), a.widget("ui.mouse", {
        version: "1.11.2",
        options: {cancel: "input,textarea,button,select,option", distance: 1, delay: 0},
        _mouseInit: function () {
            var b = this;
            this.element.bind("mousedown." + this.widgetName, function (a) {
                return b._mouseDown(a)
            }).bind("click." + this.widgetName, function (c) {
                return !0 === a.data(c.target, b.widgetName + ".preventClickEvent") ? (a.removeData(c.target, b.widgetName + ".preventClickEvent"), c.stopImmediatePropagation(), !1) : void 0
            }), this.started = !1
        },
        _mouseDestroy: function () {
            this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
        },
        _mouseDown: function (c) {
            if (!b) {
                this._mouseMoved = !1, this._mouseStarted && this._mouseUp(c), this._mouseDownEvent = c;
                var d = this, e = 1 === c.which, f = "string" == typeof this.options.cancel && c.target.nodeName ? a(c.target).closest(this.options.cancel).length : !1;
                return e && !f && this._mouseCapture(c) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function () {
                    d.mouseDelayMet = !0
                }, this.options.delay)), this._mouseDistanceMet(c) && this._mouseDelayMet(c) && (this._mouseStarted = this._mouseStart(c) !== !1, !this._mouseStarted) ? (c.preventDefault(), !0) : (!0 === a.data(c.target, this.widgetName + ".preventClickEvent") && a.removeData(c.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function (a) {
                    return d._mouseMove(a)
                }, this._mouseUpDelegate = function (a) {
                    return d._mouseUp(a)
                }, this.document.bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), c.preventDefault(), b = !0, !0)) : !0
            }
        },
        _mouseMove: function (b) {
            if (this._mouseMoved) {
                if (a.ui.ie && (!document.documentMode || document.documentMode < 9) && !b.button)return this._mouseUp(b);
                if (!b.which)return this._mouseUp(b)
            }
            return (b.which || b.button) && (this._mouseMoved = !0), this._mouseStarted ? (this._mouseDrag(b), b.preventDefault()) : (this._mouseDistanceMet(b) && this._mouseDelayMet(b) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, b) !== !1, this._mouseStarted ? this._mouseDrag(b) : this._mouseUp(b)), !this._mouseStarted)
        },
        _mouseUp: function (c) {
            return this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, c.target === this._mouseDownEvent.target && a.data(c.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(c)), b = !1, !1
        },
        _mouseDistanceMet: function (a) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - a.pageX), Math.abs(this._mouseDownEvent.pageY - a.pageY)) >= this.options.distance
        },
        _mouseDelayMet: function () {
            return this.mouseDelayMet
        },
        _mouseStart: function () {
        },
        _mouseDrag: function () {
        },
        _mouseStop: function () {
        },
        _mouseCapture: function () {
            return !0
        }
    })
});
;
/*!
 * jQuery UI Slider 1.11.2
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/slider/
 */
!function (a) {
    "function" == typeof define && define.amd ? define(["jquery", "./core", "./mouse", "./widget"], a) : a(jQuery)
}(function (a) {
    return a.widget("ui.slider", a.ui.mouse, {
        version: "1.11.2",
        widgetEventPrefix: "slide",
        options: {
            animate: !1,
            distance: 0,
            max: 100,
            min: 0,
            orientation: "horizontal",
            range: !1,
            step: 1,
            value: 0,
            values: null,
            change: null,
            slide: null,
            start: null,
            stop: null
        },
        numPages: 5,
        _create: function () {
            this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null, this._detectOrientation(), this._mouseInit(), this._calculateNewMax(), this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget ui-widget-content ui-corner-all"), this._refresh(), this._setOption("disabled", this.options.disabled), this._animateOff = !1
        },
        _refresh: function () {
            this._createRange(), this._createHandles(), this._setupEvents(), this._refreshValue()
        },
        _createHandles: function () {
            var b, c, d = this.options, e = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"), f = "<span class='ui-slider-handle ui-state-default ui-corner-all' tabindex='0'></span>", g = [];
            for (c = d.values && d.values.length || 1, e.length > c && (e.slice(c).remove(), e = e.slice(0, c)), b = e.length; c > b; b++)g.push(f);
            this.handles = e.add(a(g.join("")).appendTo(this.element)), this.handle = this.handles.eq(0), this.handles.each(function (b) {
                a(this).data("ui-slider-handle-index", b)
            })
        },
        _createRange: function () {
            var b = this.options, c = "";
            b.range ? (b.range === !0 && (b.values ? b.values.length && 2 !== b.values.length ? b.values = [b.values[0], b.values[0]] : a.isArray(b.values) && (b.values = b.values.slice(0)) : b.values = [this._valueMin(), this._valueMin()]), this.range && this.range.length ? this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({
                left: "",
                bottom: ""
            }) : (this.range = a("<div></div>").appendTo(this.element), c = "ui-slider-range ui-widget-header ui-corner-all"), this.range.addClass(c + ("min" === b.range || "max" === b.range ? " ui-slider-range-" + b.range : ""))) : (this.range && this.range.remove(), this.range = null)
        },
        _setupEvents: function () {
            this._off(this.handles), this._on(this.handles, this._handleEvents), this._hoverable(this.handles), this._focusable(this.handles)
        },
        _destroy: function () {
            this.handles.remove(), this.range && this.range.remove(), this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"), this._mouseDestroy()
        },
        _mouseCapture: function (b) {
            var c, d, e, f, g, h, i, j, k = this, l = this.options;
            return l.disabled ? !1 : (this.elementSize = {
                width: this.element.outerWidth(),
                height: this.element.outerHeight()
            }, this.elementOffset = this.element.offset(), c = {
                x: b.pageX,
                y: b.pageY
            }, d = this._normValueFromMouse(c), e = this._valueMax() - this._valueMin() + 1, this.handles.each(function (b) {
                var c = Math.abs(d - k.values(b));
                (e > c || e === c && (b === k._lastChangedValue || k.values(b) === l.min)) && (e = c, f = a(this), g = b)
            }), h = this._start(b, g), h === !1 ? !1 : (this._mouseSliding = !0, this._handleIndex = g, f.addClass("ui-state-active").focus(), i = f.offset(), j = !a(b.target).parents().addBack().is(".ui-slider-handle"), this._clickOffset = j ? {
                left: 0,
                top: 0
            } : {
                left: b.pageX - i.left - f.width() / 2,
                top: b.pageY - i.top - f.height() / 2 - (parseInt(f.css("borderTopWidth"), 10) || 0) - (parseInt(f.css("borderBottomWidth"), 10) || 0) + (parseInt(f.css("marginTop"), 10) || 0)
            }, this.handles.hasClass("ui-state-hover") || this._slide(b, g, d), this._animateOff = !0, !0))
        },
        _mouseStart: function () {
            return !0
        },
        _mouseDrag: function (a) {
            var b = {x: a.pageX, y: a.pageY}, c = this._normValueFromMouse(b);
            return this._slide(a, this._handleIndex, c), !1
        },
        _mouseStop: function (a) {
            return this.handles.removeClass("ui-state-active"), this._mouseSliding = !1, this._stop(a, this._handleIndex), this._change(a, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1, !1
        },
        _detectOrientation: function () {
            this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal"
        },
        _normValueFromMouse: function (a) {
            var b, c, d, e, f;
            return "horizontal" === this.orientation ? (b = this.elementSize.width, c = a.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (b = this.elementSize.height, c = a.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), d = c / b, d > 1 && (d = 1), 0 > d && (d = 0), "vertical" === this.orientation && (d = 1 - d), e = this._valueMax() - this._valueMin(), f = this._valueMin() + d * e, this._trimAlignValue(f)
        },
        _start: function (a, b) {
            var c = {handle: this.handles[b], value: this.value()};
            return this.options.values && this.options.values.length && (c.value = this.values(b), c.values = this.values()), this._trigger("start", a, c)
        },
        _slide: function (a, b, c) {
            var d, e, f;
            this.options.values && this.options.values.length ? (d = this.values(b ? 0 : 1), 2 === this.options.values.length && this.options.range === !0 && (0 === b && c > d || 1 === b && d > c) && (c = d), c !== this.values(b) && (e = this.values(), e[b] = c, f = this._trigger("slide", a, {
                handle: this.handles[b],
                value: c,
                values: e
            }), d = this.values(b ? 0 : 1), f !== !1 && this.values(b, c))) : c !== this.value() && (f = this._trigger("slide", a, {
                handle: this.handles[b],
                value: c
            }), f !== !1 && this.value(c))
        },
        _stop: function (a, b) {
            var c = {handle: this.handles[b], value: this.value()};
            this.options.values && this.options.values.length && (c.value = this.values(b), c.values = this.values()), this._trigger("stop", a, c)
        },
        _change: function (a, b) {
            if (!this._keySliding && !this._mouseSliding) {
                var c = {handle: this.handles[b], value: this.value()};
                this.options.values && this.options.values.length && (c.value = this.values(b), c.values = this.values()), this._lastChangedValue = b, this._trigger("change", a, c)
            }
        },
        value: function (a) {
            return arguments.length ? (this.options.value = this._trimAlignValue(a), this._refreshValue(), void this._change(null, 0)) : this._value()
        },
        values: function (b, c) {
            var d, e, f;
            if (arguments.length > 1)return this.options.values[b] = this._trimAlignValue(c), this._refreshValue(), void this._change(null, b);
            if (!arguments.length)return this._values();
            if (!a.isArray(arguments[0]))return this.options.values && this.options.values.length ? this._values(b) : this.value();
            for (d = this.options.values, e = arguments[0], f = 0; f < d.length; f += 1)d[f] = this._trimAlignValue(e[f]), this._change(null, f);
            this._refreshValue()
        },
        _setOption: function (b, c) {
            var d, e = 0;
            switch ("range" === b && this.options.range === !0 && ("min" === c ? (this.options.value = this._values(0), this.options.values = null) : "max" === c && (this.options.value = this._values(this.options.values.length - 1), this.options.values = null)), a.isArray(this.options.values) && (e = this.options.values.length), "disabled" === b && this.element.toggleClass("ui-state-disabled", !!c), this._super(b, c), b) {
                case"orientation":
                    this._detectOrientation(), this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation), this._refreshValue(), this.handles.css("horizontal" === c ? "bottom" : "left", "");
                    break;
                case"value":
                    this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1;
                    break;
                case"values":
                    for (this._animateOff = !0, this._refreshValue(), d = 0; e > d; d += 1)this._change(null, d);
                    this._animateOff = !1;
                    break;
                case"step":
                case"min":
                case"max":
                    this._animateOff = !0, this._calculateNewMax(), this._refreshValue(), this._animateOff = !1;
                    break;
                case"range":
                    this._animateOff = !0, this._refresh(), this._animateOff = !1
            }
        },
        _value: function () {
            var a = this.options.value;
            return a = this._trimAlignValue(a)
        },
        _values: function (a) {
            var b, c, d;
            if (arguments.length)return b = this.options.values[a], b = this._trimAlignValue(b);
            if (this.options.values && this.options.values.length) {
                for (c = this.options.values.slice(), d = 0; d < c.length; d += 1)c[d] = this._trimAlignValue(c[d]);
                return c
            }
            return []
        },
        _trimAlignValue: function (a) {
            if (a <= this._valueMin())return this._valueMin();
            if (a >= this._valueMax())return this._valueMax();
            var b = this.options.step > 0 ? this.options.step : 1, c = (a - this._valueMin()) % b, d = a - c;
            return 2 * Math.abs(c) >= b && (d += c > 0 ? b : -b), parseFloat(d.toFixed(5))
        },
        _calculateNewMax: function () {
            var a = (this.options.max - this._valueMin()) % this.options.step;
            this.max = this.options.max - a
        },
        _valueMin: function () {
            return this.options.min
        },
        _valueMax: function () {
            return this.max
        },
        _refreshValue: function () {
            var b, c, d, e, f, g = this.options.range, h = this.options, i = this, j = this._animateOff ? !1 : h.animate, k = {};
            this.options.values && this.options.values.length ? this.handles.each(function (d) {
                c = (i.values(d) - i._valueMin()) / (i._valueMax() - i._valueMin()) * 100, k["horizontal" === i.orientation ? "left" : "bottom"] = c + "%", a(this).stop(1, 1)[j ? "animate" : "css"](k, h.animate), i.options.range === !0 && ("horizontal" === i.orientation ? (0 === d && i.range.stop(1, 1)[j ? "animate" : "css"]({left: c + "%"}, h.animate), 1 === d && i.range[j ? "animate" : "css"]({width: c - b + "%"}, {
                    queue: !1,
                    duration: h.animate
                })) : (0 === d && i.range.stop(1, 1)[j ? "animate" : "css"]({bottom: c + "%"}, h.animate), 1 === d && i.range[j ? "animate" : "css"]({height: c - b + "%"}, {
                    queue: !1,
                    duration: h.animate
                }))), b = c
            }) : (d = this.value(), e = this._valueMin(), f = this._valueMax(), c = f !== e ? (d - e) / (f - e) * 100 : 0, k["horizontal" === this.orientation ? "left" : "bottom"] = c + "%", this.handle.stop(1, 1)[j ? "animate" : "css"](k, h.animate), "min" === g && "horizontal" === this.orientation && this.range.stop(1, 1)[j ? "animate" : "css"]({width: c + "%"}, h.animate), "max" === g && "horizontal" === this.orientation && this.range[j ? "animate" : "css"]({width: 100 - c + "%"}, {
                queue: !1,
                duration: h.animate
            }), "min" === g && "vertical" === this.orientation && this.range.stop(1, 1)[j ? "animate" : "css"]({height: c + "%"}, h.animate), "max" === g && "vertical" === this.orientation && this.range[j ? "animate" : "css"]({height: 100 - c + "%"}, {
                queue: !1,
                duration: h.animate
            }))
        },
        _handleEvents: {
            keydown: function (b) {
                var c, d, e, f, g = a(b.target).data("ui-slider-handle-index");
                switch (b.keyCode) {
                    case a.ui.keyCode.HOME:
                    case a.ui.keyCode.END:
                    case a.ui.keyCode.PAGE_UP:
                    case a.ui.keyCode.PAGE_DOWN:
                    case a.ui.keyCode.UP:
                    case a.ui.keyCode.RIGHT:
                    case a.ui.keyCode.DOWN:
                    case a.ui.keyCode.LEFT:
                        if (b.preventDefault(), !this._keySliding && (this._keySliding = !0, a(b.target).addClass("ui-state-active"), c = this._start(b, g), c === !1))return
                }
                switch (f = this.options.step, d = e = this.options.values && this.options.values.length ? this.values(g) : this.value(), b.keyCode) {
                    case a.ui.keyCode.HOME:
                        e = this._valueMin();
                        break;
                    case a.ui.keyCode.END:
                        e = this._valueMax();
                        break;
                    case a.ui.keyCode.PAGE_UP:
                        e = this._trimAlignValue(d + (this._valueMax() - this._valueMin()) / this.numPages);
                        break;
                    case a.ui.keyCode.PAGE_DOWN:
                        e = this._trimAlignValue(d - (this._valueMax() - this._valueMin()) / this.numPages);
                        break;
                    case a.ui.keyCode.UP:
                    case a.ui.keyCode.RIGHT:
                        if (d === this._valueMax())return;
                        e = this._trimAlignValue(d + f);
                        break;
                    case a.ui.keyCode.DOWN:
                    case a.ui.keyCode.LEFT:
                        if (d === this._valueMin())return;
                        e = this._trimAlignValue(d - f)
                }
                this._slide(b, g, e)
            }, keyup: function (b) {
                var c = a(b.target).data("ui-slider-handle-index");
                this._keySliding && (this._keySliding = !1, this._stop(b, c), this._change(b, c), a(b.target).removeClass("ui-state-active"))
            }
        }
    })
});
;
/*!
 * jQuery UI Touch Punch 0.2.3
 *
 * Copyright 2011–2014, Dave Furfero
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Depends:
 *  jquery.ui.widget.js
 *  jquery.ui.mouse.js
 */
!function (a) {
    function b(a, b) {
        if (!(a.originalEvent.touches.length > 1)) {
            a.preventDefault();
            var c = a.originalEvent.changedTouches[0], d = document.createEvent("MouseEvents");
            d.initMouseEvent(b, !0, !0, window, 1, c.screenX, c.screenY, c.clientX, c.clientY, !1, !1, !1, !1, 0, null), a.target.dispatchEvent(d)
        }
    }

    if (a.support.touch = "ontouchend"in document, a.support.touch) {
        var c, d = a.ui.mouse.prototype, e = d._mouseInit, f = d._mouseDestroy;
        d._touchStart = function (a) {
            var d = this;
            !c && d._mouseCapture(a.originalEvent.changedTouches[0]) && (c = !0, d._touchMoved = !1, b(a, "mouseover"), b(a, "mousemove"), b(a, "mousedown"))
        }, d._touchMove = function (a) {
            c && (this._touchMoved = !0, b(a, "mousemove"))
        }, d._touchEnd = function (a) {
            c && (b(a, "mouseup"), b(a, "mouseout"), this._touchMoved || b(a, "click"), c = !1)
        }, d._mouseInit = function () {
            var b = this;
            b.element.bind({
                touchstart: a.proxy(b, "_touchStart"),
                touchmove: a.proxy(b, "_touchMove"),
                touchend: a.proxy(b, "_touchEnd")
            }), e.call(b)
        }, d._mouseDestroy = function () {
            var b = this;
            b.element.unbind({
                touchstart: a.proxy(b, "_touchStart"),
                touchmove: a.proxy(b, "_touchMove"),
                touchend: a.proxy(b, "_touchEnd")
            }), f.call(b)
        }
    }
}(jQuery);