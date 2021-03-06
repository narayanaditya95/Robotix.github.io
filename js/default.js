! function(d) {
    d.fn.appear = function(h, a) {
        var c = d.extend({
            data: void 0,
            one: !0,
            accX: 0,
            accY: 0
        }, a);
        return this.each(function() {
            var a = d(this);
            if (a.appeared = !1, !h) return void a.trigger("appear", c.data);
            var b = d(window),
                e = function() {
                    if (!a.is(":visible")) return void(a.appeared = !1);
                    var g = b.scrollLeft(),
                        f = b.scrollTop(),
                        d = a.offset(),
                        e = d.left,
                        d = d.top,
                        h = c.accX,
                        H = c.accY,
                        w = a.height(),
                        I = b.height(),
                        J = a.width(),
                        B = b.width();
                    f > d + w + H || d > f + I + H || g > e + J + h || e > g + B + h ? a.appeared = !1 : a.appeared || a.trigger("appear", c.data)
                },
                g = function() {
                    if (a.appeared = !0, c.one) {
                        b.unbind("scroll", e);
                        var g = d.inArray(e, d.fn.appear.checks);
                        0 > g || d.fn.appear.checks.splice(g, 1)
                    }
                    h.apply(this, arguments)
                };
            c.one ? a.one("appear", c.data, g) : a.bind("appear", c.data, g);
            b.scroll(e);
            d.fn.appear.checks.push(e);
            e()
        })
    };
    d.extend(d.fn.appear, {
        checks: [],
        timeout: null,
        checkAll: function() {
            var h = d.fn.appear.checks.length;
            if (0 < h)
                for (; h--;) d.fn.appear.checks[h]()
        },
        run: function() {
            d.fn.appear.timeout && clearTimeout(d.fn.appear.timeout);
            d.fn.appear.timeout = setTimeout(d.fn.appear.checkAll, 20)
        }
    });
    d.each("append prepend after before attr removeAttr addClass removeClass toggleClass remove css show hide".split(" "), function(h, a) {
        var c = d.fn[a];
        c && (d.fn[a] = function() {
            var a = c.apply(this, arguments);
            return d.fn.appear.run(), a
        })
    })
}(jQuery);
! function(d) {
    d.fn.countTo = function(h) {
        return h = h || {}, d(this).each(function() {
            function a(b) {
                b = c.formatter.call(e, b, c);
                g.text(b)
            }
            var c = d.extend({}, d.fn.countTo.defaults, {
                    from: d(this).data("from"),
                    to: d(this).data("to"),
                    speed: d(this).data("speed"),
                    refreshInterval: d(this).data("refresh-interval"),
                    decimals: d(this).data("decimals")
                }, h),
                l = Math.ceil(c.speed / c.refreshInterval),
                b = (c.to - c.from) / l,
                e = this,
                g = d(this),
                n = 0,
                f = c.from,
                t = g.data("countTo") || {};
            g.data("countTo", t);
            t.interval && clearInterval(t.interval);
            t.interval =
                setInterval(function() {
                    f += b;
                    n++;
                    a(f);
                    "function" == typeof c.onUpdate && c.onUpdate.call(e, f);
                    l > n || (g.removeData("countTo"), clearInterval(t.interval), f = c.to, "function" == typeof c.onComplete && c.onComplete.call(e, f))
                }, c.refreshInterval);
            a(f)
        })
    };
    d.fn.countTo.defaults = {
        from: 0,
        to: 0,
        speed: 1E3,
        refreshInterval: 100,
        decimals: 0,
        formatter: function(d, a) {
            return d.toFixed(a.decimals)
        },
        onUpdate: null,
        onComplete: null
    }
}(jQuery);
(function() {
    var d, h;
    d = this.jQuery || window.jQuery;
    h = d(window);
    d.fn.stick_in_parent = function(a) {
        var c, l, b, e, g, n, f, t, v, k;
        null == a && (a = {});
        f = a.sticky_class;
        l = a.inner_scrolling;
        n = a.recalc_every;
        g = a.parent;
        e = a.offset_top;
        b = a.spacer;
        c = a.bottoming;
        null == e && (e = 0);
        null == g && (g = void 0);
        null == l && (l = !0);
        null == f && (f = "is_stuck");
        null == c && (c = !0);
        t = function(a, t, v, k, B, z, y, F) {
            var A, G, x, D, p, q, E, u, C, r, m;
            if (!a.data("sticky_kit")) {
                a.data("sticky_kit", !0);
                q = a.parent();
                null != g && (q = q.closest(g));
                if (!q.length) throw "failed to find stick parent";
                A = x = !1;
                (r = null != b ? b && a.closest(b) : d("<div />")) && r.css("position", a.css("position"));
                E = function() {
                    var g, c, d;
                    if (!F && (g = parseInt(q.css("border-top-width"), 10), c = parseInt(q.css("padding-top"), 10), t = parseInt(q.css("padding-bottom"), 10), v = q.offset().top + g + c, k = q.height(), x && (A = x = !1, null == b && (a.insertAfter(r), r.detach()), a.css({
                            position: "",
                            top: "",
                            width: "",
                            bottom: ""
                        }).removeClass(f), d = !0), B = a.offset().top - parseInt(a.css("margin-top"), 10) - e, z = a.outerHeight(!0), y = a.css("float"), r && r.css({
                            width: a.outerWidth(!0),
                            height: z,
                            display: a.css("display"),
                            "vertical-align": a.css("vertical-align"),
                            "float": y
                        }), d)) return m()
                };
                E();
                if (z !== k) return D = void 0, p = e, C = n, m = function() {
                        var g, d, m, u;
                        if (!F && (null != C && (--C, 0 >= C && (C = n, E())), m = h.scrollTop(), null != D && (d = m - D), D = m, x ? (c && (u = m + z + p > k + v, A && !u && (A = !1, a.css({
                                    position: "fixed",
                                    bottom: "",
                                    top: p
                                }).trigger("sticky_kit:unbottom"))), m < B && (x = !1, p = e, null == b && ("left" !== y && "right" !== y || a.insertAfter(r), r.detach()), g = {
                                    position: "",
                                    width: "",
                                    top: ""
                                }, a.css(g).removeClass(f).trigger("sticky_kit:unstick")),
                                l && (g = h.height(), z + e > g && !A && (p -= d, p = Math.max(g - z, p), p = Math.min(e, p), x && a.css({
                                    top: p + "px"
                                })))) : m > B && (x = !0, g = {
                                position: "fixed",
                                top: p
                            }, g.width = "border-box" === a.css("box-sizing") ? a.outerWidth() + "px" : a.width() + "px", a.css(g).addClass(f), null == b && (a.after(r), "left" !== y && "right" !== y || r.append(a)), a.trigger("sticky_kit:stick")), x && c && (null == u && (u = m + z + p > k + v), !A && u))) return A = !0, "static" === q.css("position") && q.css({
                            position: "relative"
                        }), a.css({
                            position: "absolute",
                            bottom: t,
                            top: "auto"
                        }).trigger("sticky_kit:bottom")
                    },
                    u = function() {
                        E();
                        return m()
                    }, G = function() {
                        F = !0;
                        h.off("touchmove", m);
                        h.off("scroll", m);
                        h.off("resize", u);
                        d(document.body).off("sticky_kit:recalc", u);
                        a.off("sticky_kit:detach", G);
                        a.removeData("sticky_kit");
                        a.css({
                            position: "",
                            bottom: "",
                            top: "",
                            width: ""
                        });
                        q.position("position", "");
                        if (x) return null == b && ("left" !== y && "right" !== y || a.insertAfter(r), r.remove()), a.removeClass(f)
                    }, h.on("touchmove", m), h.on("scroll", m), h.on("resize", u), d(document.body).on("sticky_kit:recalc", u), a.on("sticky_kit:detach", G), setTimeout(m,
                        0)
            }
        };
        v = 0;
        for (k = this.length; v < k; v++) a = this[v], t(d(a));
        return this
    }
}).call(this);
! function(d) {
    var h = function(a, c) {
        this.el = d(a);
        this.options = d.extend({}, d.fn.typed.defaults, c);
        this.isInput = this.el.is("input");
        this.attr = this.options.attr;
        this.showCursor = this.isInput ? !1 : this.options.showCursor;
        this.elContent = this.attr ? this.el.attr(this.attr) : this.el.text();
        this.contentType = this.options.contentType;
        this.typeSpeed = this.options.typeSpeed;
        this.startDelay = this.options.startDelay;
        this.backSpeed = this.options.backSpeed;
        this.backDelay = this.options.backDelay;
        this.strings = this.options.strings;
        this.stopNum = this.arrayPos = this.strPos = 0;
        this.loop = this.options.loop;
        this.loopCount = this.options.loopCount;
        this.curLoop = 0;
        this.stop = !1;
        this.cursorChar = this.options.cursorChar;
        this.build()
    };
    h.prototype = {
        constructor: h,
        init: function() {
            var a = this;
            a.timeout = setTimeout(function() {
                a.typewrite(a.strings[a.arrayPos], a.strPos)
            }, a.startDelay)
        },
        build: function() {
            !0 === this.showCursor && (this.cursor = d('<span class="typed-cursor">' + this.cursorChar + "</span>"), this.el.after(this.cursor));
            this.init()
        },
        typewrite: function(a,
            c) {
            if (!0 !== this.stop) {
                var d = Math.round(70 * Math.random()) + this.typeSpeed,
                    b = this;
                b.timeout = setTimeout(function() {
                    var d = 0,
                        g = a.substr(c);
                    if ("^" === g.charAt(0)) {
                        var n = 1;
                        /^\^\d+/.test(g) && (g = /\d+/.exec(g)[0], n += g.length, d = parseInt(g));
                        a = a.substring(0, c) + a.substring(c + n)
                    }
                    if ("html" === b.contentType && (g = a.substr(c).charAt(0), "<" === g || "&" === g)) {
                        for (var f = n = "", f = "<" === g ? ">" : ";"; a.substr(c).charAt(0) !== f;) n += a.substr(c).charAt(0), c++;
                        c++;
                        n += f
                    }
                    b.timeout = setTimeout(function() {
                        if (c === a.length) {
                            if (b.options.onStringTyped(b.arrayPos),
                                b.arrayPos !== b.strings.length - 1 || (b.options.callback(), b.curLoop++, !1 !== b.loop && b.curLoop !== b.loopCount)) b.timeout = setTimeout(function() {
                                b.backspace(a, c)
                            }, b.backDelay)
                        } else {
                            0 === c && b.options.preStringTyped(b.arrayPos);
                            var g = a.substr(0, c + 1);
                            b.attr ? b.el.attr(b.attr, g) : b.isInput ? b.el.val(g) : "html" === b.contentType ? b.el.html(g) : b.el.text(g);
                            c++;
                            b.typewrite(a, c)
                        }
                    }, d)
                }, d)
            }
        },
        backspace: function(a, d) {
            if (!0 !== this.stop) {
                var h = Math.round(70 * Math.random()) + this.backSpeed,
                    b = this;
                b.timeout = setTimeout(function() {
                    if ("html" ===
                        b.contentType && ">" === a.substr(d).charAt(0)) {
                        for (var e = "";
                            "<" !== a.substr(d).charAt(0);) e -= a.substr(d).charAt(0), d--;
                        d--
                    }
                    e = a.substr(0, d);
                    b.attr ? b.el.attr(b.attr, e) : b.isInput ? b.el.val(e) : "html" === b.contentType ? b.el.html(e) : b.el.text(e);
                    d > b.stopNum ? (d--, b.backspace(a, d)) : d <= b.stopNum && (b.arrayPos++, b.arrayPos === b.strings.length ? (b.arrayPos = 0, b.init()) : b.typewrite(b.strings[b.arrayPos], d))
                }, h)
            }
        },
        reset: function() {
            clearInterval(this.timeout);
            var a = this.el.attr("id");
            this.el.after('<span id="' + a + '"/>');
            this.el.remove();
            "undefined" != typeof this.cursor && this.cursor.remove();
            this.options.resetCallback()
        }
    };
    d.fn.typed = function(a) {
        return this.each(function() {
            var c = d(this),
                l = c.data("typed"),
                b = "object" == typeof a && a;
            l || c.data("typed", l = new h(this, b));
            "string" == typeof a && l[a]()
        })
    };
    d.fn.typed.defaults = {
        strings: ["These are the default values...", "You know what you should do?", "Use your own!", "Have a great day!"],
        typeSpeed: 0,
        startDelay: 0,
        backSpeed: 0,
        backDelay: 500,
        loop: !1,
        loopCount: !1,
        showCursor: !0,
        cursorChar: "|",
        attr: null,
        contentType: "html",
        callback: function() {},
        preStringTyped: function() {},
        onStringTyped: function() {},
        resetCallback: function() {}
    }
}(window.jQuery);
! function(d) {
    function h(a) {
        var b = "",
            d;
        for (d in a) a.hasOwnProperty(d) && (b += d + ":" + a[d] + ";");
        return b
    }

    function a(a) {
        var c;
        if (!1 === e.allowEvent(a)) c = null;
        else {
            c = null;
            for (var f = a.target || a.srcElement; null !== f.parentElement;) {
                if (!(f instanceof SVGElement || -1 === f.className.indexOf("waves-effect"))) {
                    c = f;
                    break
                }
                if (f.classList.contains("waves-effect")) {
                    c = f;
                    break
                }
                f = f.parentElement
            }
        }
        null !== c && (b.show(a, c), "ontouchstart" in d && (c.addEventListener("touchend", b.hide, !1), c.addEventListener("touchcancel", b.hide, !1)),
            c.addEventListener("mouseup", b.hide, !1), c.addEventListener("mouseleave", b.hide, !1))
    }
    var c = c || {},
        l = document.querySelectorAll.bind(document),
        b = {
            duration: 750,
            show: function(a, d) {
                var f, c;
                if (2 === a.button) return !1;
                var e = d || this,
                    k = document.createElement("div");
                k.className = "waves-ripple";
                e.appendChild(k);
                var l = {
                    top: 0,
                    left: 0
                };
                f = e && e.ownerDocument;
                c = f.documentElement;
                "undefined" != typeof e.getBoundingClientRect && (l = e.getBoundingClientRect());
                var w;
                w = null !== f && f === f.window ? f : 9 === f.nodeType && f.defaultView;
                f = l.top +
                    w.pageYOffset - c.clientTop;
                c = l.left + w.pageXOffset - c.clientLeft;
                l = a.pageY - f;
                w = a.pageX - c;
                e = "scale(" + e.clientWidth / 100 * 3 + ")";
                "touches" in a && (l = a.touches[0].pageY - f, w = a.touches[0].pageX - c);
                k.setAttribute("data-hold", Date.now());
                k.setAttribute("data-scale", e);
                k.setAttribute("data-x", w);
                k.setAttribute("data-y", l);
                f = {
                    top: l + "px",
                    left: w + "px"
                };
                k.className += " waves-notransition";
                k.setAttribute("style", h(f));
                k.className = k.className.replace("waves-notransition", "");
                f["-webkit-transform"] = e;
                f["-moz-transform"] =
                    e;
                f["-ms-transform"] = e;
                f["-o-transform"] = e;
                f.transform = e;
                f.opacity = "1";
                f["-webkit-transition-duration"] = b.duration + "ms";
                f["-moz-transition-duration"] = b.duration + "ms";
                f["-o-transition-duration"] = b.duration + "ms";
                f["transition-duration"] = b.duration + "ms";
                k.setAttribute("style", h(f))
            },
            hide: function(a) {
                e.touchup(a);
                var d = this,
                    c = (1.4 * d.clientWidth, null);
                a = d.getElementsByClassName("waves-ripple");
                if (!(0 < a.length)) return !1;
                var c = a[a.length - 1],
                    l = c.getAttribute("data-x"),
                    v = c.getAttribute("data-y"),
                    k = c.getAttribute("data-scale");
                a = 350 - (Date.now() - Number(c.getAttribute("data-hold")));
                0 > a && (a = 0);
                setTimeout(function() {
                    c.setAttribute("style", h({
                        top: v + "px",
                        left: l + "px",
                        opacity: "0",
                        "-webkit-transition-duration": b.duration + "ms",
                        "-moz-transition-duration": b.duration + "ms",
                        "-o-transition-duration": b.duration + "ms",
                        "transition-duration": b.duration + "ms",
                        "-webkit-transform": k,
                        "-moz-transform": k,
                        "-ms-transform": k,
                        "-o-transform": k,
                        transform: k
                    }));
                    setTimeout(function() {
                        try {
                            d.removeChild(c)
                        } catch (a) {
                            return !1
                        }
                    }, b.duration)
                }, a)
            },
            wrapInput: function(a) {
                for (var d =
                        0; d < a.length; d++) {
                    var b = a[d];
                    if ("input" === b.tagName.toLowerCase()) {
                        var c = b.parentNode;
                        if ("i" !== c.tagName.toLowerCase() || -1 === c.className.indexOf("waves-effect")) {
                            var e = document.createElement("i");
                            e.className = b.className + " waves-input-wrapper";
                            var h = b.getAttribute("style");
                            h || (h = "");
                            e.setAttribute("style", h);
                            b.className = "waves-button-input";
                            b.removeAttribute("style");
                            c.replaceChild(e, b);
                            e.appendChild(b)
                        }
                    }
                }
            }
        },
        e = {
            touches: 0,
            allowEvent: function(a) {
                var b = !0;
                return "touchstart" === a.type ? e.touches += 1 : "touchend" ===
                    a.type || "touchcancel" === a.type ? setTimeout(function() {
                        0 < e.touches && --e.touches
                    }, 500) : "mousedown" === a.type && 0 < e.touches && (b = !1), b
            },
            touchup: function(a) {
                e.allowEvent(a)
            }
        };
    c.displayEffect = function(c) {
        c = c || {};
        "duration" in c && (b.duration = c.duration);
        b.wrapInput(l(".waves-effect"));
        "ontouchstart" in d && document.body.addEventListener("touchstart", a, !1);
        document.body.addEventListener("mousedown", a, !1)
    };
    c.attach = function(c) {
        "input" === c.tagName.toLowerCase() && (b.wrapInput([c]), c = c.parentElement);
        "ontouchstart" in
        d && c.addEventListener("touchstart", a, !1);
        c.addEventListener("mousedown", a, !1)
    };
    d.Waves = c
}(window);
