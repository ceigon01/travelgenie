/*!
 *
 * MediaElement.js
 * HTML5 <video> and <audio> shim and player
 * http://mediaelementjs.com/
 *
 * Creates a JavaScript object that mimics HTML5 MediaElement API
 * for browsers that don't understand HTML5 or can't play the provided codec
 * Can play MP4 (H.264), Ogg, WebM, FLV, WMV, WMA, ACC, and MP3
 *
 * Copyright 2010-2014, John Dyer (http://j.hn)
 * License: MIT
 *
 */
function onYouTubePlayerAPIReady() {
    mejs.YouTubeApi.iFrameReady()
}
function onYouTubePlayerReady(a) {
    mejs.YouTubeApi.flashReady(a)
}
var mejs = mejs || {};
mejs.version = "2.16.2", mejs.meIndex = 0, mejs.plugins = {
    silverlight: [{
        version: [3, 0],
        types: ["video/mp4", "video/m4v", "video/mov", "video/wmv", "audio/wma", "audio/m4a", "audio/mp3", "audio/wav", "audio/mpeg"]
    }],
    flash: [{
        version: [9, 0, 124],
        types: ["video/mp4", "video/m4v", "video/mov", "video/flv", "video/rtmp", "video/x-flv", "audio/flv", "audio/x-flv", "audio/mp3", "audio/m4a", "audio/mpeg", "video/youtube", "video/x-youtube", "application/x-mpegURL"]
    }],
    youtube: [{version: null, types: ["video/youtube", "video/x-youtube", "audio/youtube", "audio/x-youtube"]}],
    vimeo: [{version: null, types: ["video/vimeo", "video/x-vimeo"]}]
}, mejs.Utility = {
    encodeUrl: function (a) {
        return encodeURIComponent(a)
    }, escapeHTML: function (a) {
        return a.toString().split("&").join("&amp;").split("<").join("&lt;").split('"').join("&quot;")
    }, absolutizeUrl: function (a) {
        var b = document.createElement("div");
        return b.innerHTML = '<a href="' + this.escapeHTML(a) + '">x</a>', b.firstChild.href
    }, getScriptPath: function (a) {
        for (var b, c, d, e, f, g, h = 0, i = "", j = "", k = document.getElementsByTagName("script"), l = k.length, m = a.length; l > h; h++) {
            for (e = k[h].src, c = e.lastIndexOf("/"), c > -1 ? (g = e.substring(c + 1), f = e.substring(0, c + 1)) : (g = e, f = ""), b = 0; m > b; b++)if (j = a[b], d = g.indexOf(j), d > -1) {
                i = f;
                break
            }
            if ("" !== i)break
        }
        return i
    }, secondsToTimeCode: function (a, b, c, d) {
        "undefined" == typeof c ? c = !1 : "undefined" == typeof d && (d = 25);
        var e = Math.floor(a / 3600) % 24, f = Math.floor(a / 60) % 60, g = Math.floor(a % 60), h = Math.floor((a % 1 * d).toFixed(3)), i = (b || e > 0 ? (10 > e ? "0" + e : e) + ":" : "") + (10 > f ? "0" + f : f) + ":" + (10 > g ? "0" + g : g) + (c ? ":" + (10 > h ? "0" + h : h) : "");
        return i
    }, timeCodeToSeconds: function (a, b, c, d) {
        "undefined" == typeof c ? c = !1 : "undefined" == typeof d && (d = 25);
        var e = a.split(":"), f = parseInt(e[0], 10), g = parseInt(e[1], 10), h = parseInt(e[2], 10), i = 0, j = 0;
        return c && (i = parseInt(e[3]) / d), j = 3600 * f + 60 * g + h + i
    }, convertSMPTEtoSeconds: function (a) {
        if ("string" != typeof a)return !1;
        a = a.replace(",", ".");
        var b = 0, c = -1 != a.indexOf(".") ? a.split(".")[1].length : 0, d = 1;
        a = a.split(":").reverse();
        for (var e = 0; e < a.length; e++)d = 1, e > 0 && (d = Math.pow(60, e)), b += Number(a[e]) * d;
        return Number(b.toFixed(c))
    }, removeSwf: function (a) {
        var b = document.getElementById(a);
        b && /object|embed/i.test(b.nodeName) && (mejs.MediaFeatures.isIE ? (b.style.display = "none", function () {
            4 == b.readyState ? mejs.Utility.removeObjectInIE(a) : setTimeout(arguments.callee, 10)
        }()) : b.parentNode.removeChild(b))
    }, removeObjectInIE: function (a) {
        var b = document.getElementById(a);
        if (b) {
            for (var c in b)"function" == typeof b[c] && (b[c] = null);
            b.parentNode.removeChild(b)
        }
    }
}, mejs.PluginDetector = {
    hasPluginVersion: function (a, b) {
        var c = this.plugins[a];
        return b[1] = b[1] || 0, b[2] = b[2] || 0, c[0] > b[0] || c[0] == b[0] && c[1] > b[1] || c[0] == b[0] && c[1] == b[1] && c[2] >= b[2] ? !0 : !1
    },
    nav: window.navigator,
    ua: window.navigator.userAgent.toLowerCase(),
    plugins: [],
    addPlugin: function (a, b, c, d, e) {
        this.plugins[a] = this.detectPlugin(b, c, d, e)
    },
    detectPlugin: function (a, b, c, d) {
        var e, f, g, h = [0, 0, 0];
        if ("undefined" != typeof this.nav.plugins && "object" == typeof this.nav.plugins[a]) {
            if (e = this.nav.plugins[a].description, e && ("undefined" == typeof this.nav.mimeTypes || !this.nav.mimeTypes[b] || this.nav.mimeTypes[b].enabledPlugin))for (h = e.replace(a, "").replace(/^\s+/, "").replace(/\sr/gi, ".").split("."), f = 0; f < h.length; f++)h[f] = parseInt(h[f].match(/\d+/), 10)
        } else if ("undefined" != typeof window.ActiveXObject)try {
            g = new ActiveXObject(c), g && (h = d(g))
        } catch (i) {
        }
        return h
    }
}, mejs.PluginDetector.addPlugin("flash", "Shockwave Flash", "application/x-shockwave-flash", "ShockwaveFlash.ShockwaveFlash", function (a) {
    var b = [], c = a.GetVariable("$version");
    return c && (c = c.split(" ")[1].split(","), b = [parseInt(c[0], 10), parseInt(c[1], 10), parseInt(c[2], 10)]), b
}), mejs.PluginDetector.addPlugin("silverlight", "Silverlight Plug-In", "application/x-silverlight-2", "AgControl.AgControl", function (a) {
    var b = [0, 0, 0, 0], c = function (a, b, c, d) {
        for (; a.isVersionSupported(b[0] + "." + b[1] + "." + b[2] + "." + b[3]);)b[c] += d;
        b[c] -= d
    };
    return c(a, b, 0, 1), c(a, b, 1, 1), c(a, b, 2, 1e4), c(a, b, 2, 1e3), c(a, b, 2, 100), c(a, b, 2, 10), c(a, b, 2, 1), c(a, b, 3, 1), b
}), mejs.MediaFeatures = {
    init: function () {
        var a, b, c = this, d = document, e = mejs.PluginDetector.nav, f = mejs.PluginDetector.ua.toLowerCase(), g = ["source", "track", "audio", "video"];
        c.isiPad = null !== f.match(/ipad/i), c.isiPhone = null !== f.match(/iphone/i), c.isiOS = c.isiPhone || c.isiPad, c.isAndroid = null !== f.match(/android/i), c.isBustedAndroid = null !== f.match(/android 2\.[12]/), c.isBustedNativeHTTPS = "https:" === location.protocol && (null !== f.match(/android [12]\./) || null !== f.match(/macintosh.* version.* safari/)), c.isIE = -1 != e.appName.toLowerCase().indexOf("microsoft") || null !== e.appName.toLowerCase().match(/trident/gi), c.isChrome = null !== f.match(/chrome/gi), c.isChromium = null !== f.match(/chromium/gi), c.isFirefox = null !== f.match(/firefox/gi), c.isWebkit = null !== f.match(/webkit/gi), c.isGecko = null !== f.match(/gecko/gi) && !c.isWebkit && !c.isIE, c.isOpera = null !== f.match(/opera/gi), c.hasTouch = "ontouchstart"in window, c.svg = !!document.createElementNS && !!document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect;
        for (a = 0; a < g.length; a++)b = document.createElement(g[a]);
        c.supportsMediaTag = "undefined" != typeof b.canPlayType || c.isBustedAndroid;
        try {
            b.canPlayType("video/mp4")
        } catch (h) {
            c.supportsMediaTag = !1
        }
        c.hasSemiNativeFullScreen = "undefined" != typeof b.webkitEnterFullscreen, c.hasNativeFullscreen = "undefined" != typeof b.requestFullscreen, c.hasWebkitNativeFullScreen = "undefined" != typeof b.webkitRequestFullScreen, c.hasMozNativeFullScreen = "undefined" != typeof b.mozRequestFullScreen, c.hasMsNativeFullScreen = "undefined" != typeof b.msRequestFullscreen, c.hasTrueNativeFullScreen = c.hasWebkitNativeFullScreen || c.hasMozNativeFullScreen || c.hasMsNativeFullScreen, c.nativeFullScreenEnabled = c.hasTrueNativeFullScreen, c.hasMozNativeFullScreen ? c.nativeFullScreenEnabled = document.mozFullScreenEnabled : c.hasMsNativeFullScreen && (c.nativeFullScreenEnabled = document.msFullscreenEnabled), c.isChrome && (c.hasSemiNativeFullScreen = !1), c.hasTrueNativeFullScreen && (c.fullScreenEventName = "", c.hasWebkitNativeFullScreen ? c.fullScreenEventName = "webkitfullscreenchange" : c.hasMozNativeFullScreen ? c.fullScreenEventName = "mozfullscreenchange" : c.hasMsNativeFullScreen && (c.fullScreenEventName = "MSFullscreenChange"), c.isFullScreen = function () {
            return c.hasMozNativeFullScreen ? d.mozFullScreen : c.hasWebkitNativeFullScreen ? d.webkitIsFullScreen : c.hasMsNativeFullScreen ? null !== d.msFullscreenElement : void 0
        }, c.requestFullScreen = function (a) {
            c.hasWebkitNativeFullScreen ? a.webkitRequestFullScreen() : c.hasMozNativeFullScreen ? a.mozRequestFullScreen() : c.hasMsNativeFullScreen && a.msRequestFullscreen()
        }, c.cancelFullScreen = function () {
            c.hasWebkitNativeFullScreen ? document.webkitCancelFullScreen() : c.hasMozNativeFullScreen ? document.mozCancelFullScreen() : c.hasMsNativeFullScreen && document.msExitFullscreen()
        }), c.hasSemiNativeFullScreen && f.match(/mac os x 10_5/i) && (c.hasNativeFullScreen = !1, c.hasSemiNativeFullScreen = !1)
    }
}, mejs.MediaFeatures.init(), mejs.HtmlMediaElement = {
    pluginType: "native",
    isFullScreen: !1,
    setCurrentTime: function (a) {
        this.currentTime = a
    },
    setMuted: function (a) {
        this.muted = a
    },
    setVolume: function (a) {
        this.volume = a
    },
    stop: function () {
        this.pause()
    },
    setSrc: function (a) {
        for (var b = this.getElementsByTagName("source"); b.length > 0;)this.removeChild(b[0]);
        if ("string" == typeof a)this.src = a; else {
            var c, d;
            for (c = 0; c < a.length; c++)if (d = a[c], this.canPlayType(d.type)) {
                this.src = d.src;
                break
            }
        }
    },
    setVideoSize: function (a, b) {
        this.width = a, this.height = b
    }
}, mejs.PluginMediaElement = function (a, b, c) {
    this.id = a, this.pluginType = b, this.src = c, this.events = {}, this.attributes = {}
}, mejs.PluginMediaElement.prototype = {
    pluginElement: null,
    pluginType: "",
    isFullScreen: !1,
    playbackRate: -1,
    defaultPlaybackRate: -1,
    seekable: [],
    played: [],
    paused: !0,
    ended: !1,
    seeking: !1,
    duration: 0,
    error: null,
    tagName: "",
    muted: !1,
    volume: 1,
    currentTime: 0,
    play: function () {
        null != this.pluginApi && ("youtube" == this.pluginType || "vimeo" == this.pluginType ? this.pluginApi.playVideo() : this.pluginApi.playMedia(), this.paused = !1)
    },
    load: function () {
        null != this.pluginApi && ("youtube" == this.pluginType || "vimeo" == this.pluginType || this.pluginApi.loadMedia(), this.paused = !1)
    },
    pause: function () {
        null != this.pluginApi && ("youtube" == this.pluginType || "vimeo" == this.pluginType ? this.pluginApi.pauseVideo() : this.pluginApi.pauseMedia(), this.paused = !0)
    },
    stop: function () {
        null != this.pluginApi && ("youtube" == this.pluginType || "vimeo" == this.pluginType ? this.pluginApi.stopVideo() : this.pluginApi.stopMedia(), this.paused = !0)
    },
    canPlayType: function (a) {
        var b, c, d, e = mejs.plugins[this.pluginType];
        for (b = 0; b < e.length; b++)if (d = e[b], mejs.PluginDetector.hasPluginVersion(this.pluginType, d.version))for (c = 0; c < d.types.length; c++)if (a == d.types[c])return "probably";
        return ""
    },
    positionFullscreenButton: function (a, b, c) {
        null != this.pluginApi && this.pluginApi.positionFullscreenButton && this.pluginApi.positionFullscreenButton(Math.floor(a), Math.floor(b), c)
    },
    hideFullscreenButton: function () {
        null != this.pluginApi && this.pluginApi.hideFullscreenButton && this.pluginApi.hideFullscreenButton()
    },
    setSrc: function (a) {
        if ("string" == typeof a)this.pluginApi.setSrc(mejs.Utility.absolutizeUrl(a)), this.src = mejs.Utility.absolutizeUrl(a); else {
            var b, c;
            for (b = 0; b < a.length; b++)if (c = a[b], this.canPlayType(c.type)) {
                this.pluginApi.setSrc(mejs.Utility.absolutizeUrl(c.src)), this.src = mejs.Utility.absolutizeUrl(a);
                break
            }
        }
    },
    setCurrentTime: function (a) {
        null != this.pluginApi && ("youtube" == this.pluginType || "vimeo" == this.pluginType ? this.pluginApi.seekTo(a) : this.pluginApi.setCurrentTime(a), this.currentTime = a)
    },
    setVolume: function (a) {
        null != this.pluginApi && (this.pluginApi.setVolume("youtube" == this.pluginType ? 100 * a : a), this.volume = a)
    },
    setMuted: function (a) {
        null != this.pluginApi && ("youtube" == this.pluginType ? (a ? this.pluginApi.mute() : this.pluginApi.unMute(), this.muted = a, this.dispatchEvent("volumechange")) : this.pluginApi.setMuted(a), this.muted = a)
    },
    setVideoSize: function (a, b) {
        this.pluginElement && this.pluginElement.style && (this.pluginElement.style.width = a + "px", this.pluginElement.style.height = b + "px"), null != this.pluginApi && this.pluginApi.setVideoSize && this.pluginApi.setVideoSize(a, b)
    },
    setFullscreen: function (a) {
        null != this.pluginApi && this.pluginApi.setFullscreen && this.pluginApi.setFullscreen(a)
    },
    enterFullScreen: function () {
        null != this.pluginApi && this.pluginApi.setFullscreen && this.setFullscreen(!0)
    },
    exitFullScreen: function () {
        null != this.pluginApi && this.pluginApi.setFullscreen && this.setFullscreen(!1)
    },
    addEventListener: function (a, b) {
        this.events[a] = this.events[a] || [], this.events[a].push(b)
    },
    removeEventListener: function (a, b) {
        if (!a)return this.events = {}, !0;
        var c = this.events[a];
        if (!c)return !0;
        if (!b)return this.events[a] = [], !0;
        for (var d = 0; d < c.length; d++)if (c[d] === b)return this.events[a].splice(d, 1), !0;
        return !1
    },
    dispatchEvent: function (a) {
        var b, c, d = this.events[a];
        if (d)for (c = Array.prototype.slice.call(arguments, 1), b = 0; b < d.length; b++)d[b].apply(this, c)
    },
    hasAttribute: function (a) {
        return a in this.attributes
    },
    removeAttribute: function (a) {
        delete this.attributes[a]
    },
    getAttribute: function (a) {
        return this.hasAttribute(a) ? this.attributes[a] : ""
    },
    setAttribute: function (a, b) {
        this.attributes[a] = b
    },
    remove: function () {
        mejs.Utility.removeSwf(this.pluginElement.id), mejs.MediaPluginBridge.unregisterPluginElement(this.pluginElement.id)
    }
}, mejs.MediaPluginBridge = {
    pluginMediaElements: {}, htmlMediaElements: {}, registerPluginElement: function (a, b, c) {
        this.pluginMediaElements[a] = b, this.htmlMediaElements[a] = c
    }, unregisterPluginElement: function (a) {
        delete this.pluginMediaElements[a], delete this.htmlMediaElements[a]
    }, initPlugin: function (a) {
        var b = this.pluginMediaElements[a], c = this.htmlMediaElements[a];
        if (b) {
            switch (b.pluginType) {
                case"flash":
                    b.pluginElement = b.pluginApi = document.getElementById(a);
                    break;
                case"silverlight":
                    b.pluginElement = document.getElementById(b.id), b.pluginApi = b.pluginElement.Content.MediaElementJS
            }
            null != b.pluginApi && b.success && b.success(b, c)
        }
    }, fireEvent: function (a, b, c) {
        var d, e, f, g = this.pluginMediaElements[a];
        if (g) {
            d = {type: b, target: g};
            for (e in c)g[e] = c[e], d[e] = c[e];
            f = c.bufferedTime || 0, d.target.buffered = d.buffered = {
                start: function () {
                    return 0
                }, end: function () {
                    return f
                }, length: 1
            }, g.dispatchEvent(d.type, d)
        }
    }
}, mejs.MediaElementDefaults = {
    mode: "auto",
    plugins: ["flash", "silverlight", "youtube", "vimeo"],
    enablePluginDebug: !1,
    httpsBasicAuthSite: !1,
    type: "",
    pluginPath: mejs.Utility.getScriptPath(["mediaelement.js", "mediaelement.min.js", "mediaelement-and-player.js", "mediaelement-and-player.min.js"]),
    flashName: "flashmediaelement.swf",
    flashStreamer: "",
    enablePluginSmoothing: !1,
    enablePseudoStreaming: !1,
    pseudoStreamingStartQueryParam: "start",
    silverlightName: "silverlightmediaelement.xap",
    defaultVideoWidth: 480,
    defaultVideoHeight: 270,
    pluginWidth: -1,
    pluginHeight: -1,
    pluginVars: [],
    timerRate: 250,
    startVolume: .8,
    success: function () {
    },
    error: function () {
    }
}, mejs.MediaElement = function (a, b) {
    return mejs.HtmlMediaElementShim.create(a, b)
}, mejs.HtmlMediaElementShim = {
    create: function (a, b) {
        var c, d, e = mejs.MediaElementDefaults, f = "string" == typeof a ? document.getElementById(a) : a, g = f.tagName.toLowerCase(), h = "audio" === g || "video" === g, i = f.getAttribute(h ? "src" : "href"), j = f.getAttribute("poster"), k = f.getAttribute("autoplay"), l = f.getAttribute("preload"), m = f.getAttribute("controls");
        for (d in b)e[d] = b[d];
        return i = "undefined" == typeof i || null === i || "" == i ? null : i, j = "undefined" == typeof j || null === j ? "" : j, l = "undefined" == typeof l || null === l || "false" === l ? "none" : l, k = !("undefined" == typeof k || null === k || "false" === k), m = !("undefined" == typeof m || null === m || "false" === m), c = this.determinePlayback(f, e, mejs.MediaFeatures.supportsMediaTag, h, i), c.url = null !== c.url ? mejs.Utility.absolutizeUrl(c.url) : "", "native" == c.method ? (mejs.MediaFeatures.isBustedAndroid && (f.src = c.url, f.addEventListener("click", function () {
            f.play()
        }, !1)), this.updateNative(c, e, k, l)) : "" !== c.method ? this.createPlugin(c, e, j, k, l, m) : (this.createErrorMessage(c, e, j), this)
    }, determinePlayback: function (a, b, c, d, e) {
        var f, g, h, i, j, k, l, m, n, o, p, q = [], r = {
            method: "",
            url: "",
            htmlMediaElement: a,
            isVideo: "audio" != a.tagName.toLowerCase()
        };
        if ("undefined" != typeof b.type && "" !== b.type)if ("string" == typeof b.type)q.push({
            type: b.type,
            url: e
        }); else for (f = 0; f < b.type.length; f++)q.push({
            type: b.type[f],
            url: e
        }); else if (null !== e)k = this.formatType(e, a.getAttribute("type")), q.push({
            type: k,
            url: e
        }); else for (f = 0; f < a.childNodes.length; f++)j = a.childNodes[f], 1 == j.nodeType && "source" == j.tagName.toLowerCase() && (e = j.getAttribute("src"), k = this.formatType(e, j.getAttribute("type")), p = j.getAttribute("media"), (!p || !window.matchMedia || window.matchMedia && window.matchMedia(p).matches) && q.push({
            type: k,
            url: e
        }));
        if (!d && q.length > 0 && null !== q[0].url && this.getTypeFromFile(q[0].url).indexOf("audio") > -1 && (r.isVideo = !1), mejs.MediaFeatures.isBustedAndroid && (a.canPlayType = function (a) {
                return null !== a.match(/video\/(mp4|m4v)/gi) ? "maybe" : ""
            }), !(!c || "auto" !== b.mode && "auto_plugin" !== b.mode && "native" !== b.mode || mejs.MediaFeatures.isBustedNativeHTTPS && b.httpsBasicAuthSite === !0)) {
            for (d || (o = document.createElement(r.isVideo ? "video" : "audio"), a.parentNode.insertBefore(o, a), a.style.display = "none", r.htmlMediaElement = a = o), f = 0; f < q.length; f++)if ("video/m3u8" == q[f].type || "" !== a.canPlayType(q[f].type).replace(/no/, "") || "" !== a.canPlayType(q[f].type.replace(/mp3/, "mpeg")).replace(/no/, "") || "" !== a.canPlayType(q[f].type.replace(/m4a/, "mp4")).replace(/no/, "")) {
                r.method = "native", r.url = q[f].url;
                break
            }
            if ("native" === r.method && (null !== r.url && (a.src = r.url), "auto_plugin" !== b.mode))return r
        }
        if ("auto" === b.mode || "auto_plugin" === b.mode || "shim" === b.mode)for (f = 0; f < q.length; f++)for (k = q[f].type, g = 0; g < b.plugins.length; g++)for (l = b.plugins[g], m = mejs.plugins[l], h = 0; h < m.length; h++)if (n = m[h], null == n.version || mejs.PluginDetector.hasPluginVersion(l, n.version))for (i = 0; i < n.types.length; i++)if (k == n.types[i])return r.method = l, r.url = q[f].url, r;
        return "auto_plugin" === b.mode && "native" === r.method ? r : ("" === r.method && q.length > 0 && (r.url = q[0].url), r)
    }, formatType: function (a, b) {
        return a && !b ? this.getTypeFromFile(a) : b && ~b.indexOf(";") ? b.substr(0, b.indexOf(";")) : b
    }, getTypeFromFile: function (a) {
        a = a.split("?")[0];
        var b = a.substring(a.lastIndexOf(".") + 1).toLowerCase();
        return (/(mp4|m4v|ogg|ogv|m3u8|webm|webmv|flv|wmv|mpeg|mov)/gi.test(b) ? "video" : "audio") + "/" + this.getTypeFromExtension(b)
    }, getTypeFromExtension: function (a) {
        switch (a) {
            case"mp4":
            case"m4v":
            case"m4a":
                return "mp4";
            case"webm":
            case"webma":
            case"webmv":
                return "webm";
            case"ogg":
            case"oga":
            case"ogv":
                return "ogg";
            default:
                return a
        }
    }, createErrorMessage: function (a, b, c) {
        var d = a.htmlMediaElement, e = document.createElement("div");
        e.className = "me-cannotplay";
        try {
            e.style.width = d.width + "px", e.style.height = d.height + "px"
        } catch (f) {
        }
        e.innerHTML = b.customError ? b.customError : "" !== c ? '<a href="' + a.url + '"><img src="' + c + '" width="100%" height="100%" /></a>' : '<a href="' + a.url + '"><span>' + mejs.i18n.t("Download File") + "</span></a>", d.parentNode.insertBefore(e, d), d.style.display = "none", b.error(d)
    }, createPlugin: function (a, b, c, d, e, f) {
        var g, h, i, j = a.htmlMediaElement, k = 1, l = 1, m = "me_" + a.method + "_" + mejs.meIndex++, n = new mejs.PluginMediaElement(m, a.method, a.url), o = document.createElement("div");
        n.tagName = j.tagName;
        for (var p = 0; p < j.attributes.length; p++) {
            var q = j.attributes[p];
            1 == q.specified && n.setAttribute(q.name, q.value)
        }
        for (h = j.parentNode; null !== h && "body" !== h.tagName.toLowerCase() && null != h.parentNode;) {
            if ("p" === h.parentNode.tagName.toLowerCase()) {
                h.parentNode.parentNode.insertBefore(h, h.parentNode);
                break
            }
            h = h.parentNode
        }
        switch (a.isVideo ? (k = b.pluginWidth > 0 ? b.pluginWidth : b.videoWidth > 0 ? b.videoWidth : null !== j.getAttribute("width") ? j.getAttribute("width") : b.defaultVideoWidth, l = b.pluginHeight > 0 ? b.pluginHeight : b.videoHeight > 0 ? b.videoHeight : null !== j.getAttribute("height") ? j.getAttribute("height") : b.defaultVideoHeight, k = mejs.Utility.encodeUrl(k), l = mejs.Utility.encodeUrl(l)) : b.enablePluginDebug && (k = 320, l = 240), n.success = b.success, mejs.MediaPluginBridge.registerPluginElement(m, n, j), o.className = "me-plugin", o.id = m + "_container", a.isVideo ? j.parentNode.insertBefore(o, j) : document.body.insertBefore(o, document.body.childNodes[0]), i = ["id=" + m, "isvideo=" + (a.isVideo ? "true" : "false"), "autoplay=" + (d ? "true" : "false"), "preload=" + e, "width=" + k, "startvolume=" + b.startVolume, "timerrate=" + b.timerRate, "flashstreamer=" + b.flashStreamer, "height=" + l, "pseudostreamstart=" + b.pseudoStreamingStartQueryParam], null !== a.url && i.push("flash" == a.method ? "file=" + mejs.Utility.encodeUrl(a.url) : "file=" + a.url), b.enablePluginDebug && i.push("debug=true"), b.enablePluginSmoothing && i.push("smoothing=true"), b.enablePseudoStreaming && i.push("pseudostreaming=true"), f && i.push("controls=true"), b.pluginVars && (i = i.concat(b.pluginVars)), a.method) {
            case"silverlight":
                o.innerHTML = '<object data="data:application/x-silverlight-2," type="application/x-silverlight-2" id="' + m + '" name="' + m + '" width="' + k + '" height="' + l + '" class="mejs-shim"><param name="initParams" value="' + i.join(",") + '" /><param name="windowless" value="true" /><param name="background" value="black" /><param name="minRuntimeVersion" value="3.0.0.0" /><param name="autoUpgrade" value="true" /><param name="source" value="' + b.pluginPath + b.silverlightName + '" /></object>';
                break;
            case"flash":
                mejs.MediaFeatures.isIE ? (g = document.createElement("div"), o.appendChild(g), g.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" id="' + m + '" width="' + k + '" height="' + l + '" class="mejs-shim"><param name="movie" value="' + b.pluginPath + b.flashName + "?x=" + new Date + '" /><param name="flashvars" value="' + i.join("&amp;") + '" /><param name="quality" value="high" /><param name="bgcolor" value="#000000" /><param name="wmode" value="transparent" /><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="true" /><param name="scale" value="default" /></object>') : o.innerHTML = '<embed id="' + m + '" name="' + m + '" play="true" loop="false" quality="high" bgcolor="#000000" wmode="transparent" allowScriptAccess="always" allowFullScreen="true" type="application/x-shockwave-flash" pluginspage="//www.macromedia.com/go/getflashplayer" src="' + b.pluginPath + b.flashName + '" flashvars="' + i.join("&") + '" width="' + k + '" height="' + l + '" scale="default"class="mejs-shim"></embed>';
                break;
            case"youtube":
                var r;
                -1 != a.url.lastIndexOf("youtu.be") ? (r = a.url.substr(a.url.lastIndexOf("/") + 1), -1 != r.indexOf("?") && (r = r.substr(0, r.indexOf("?")))) : r = a.url.substr(a.url.lastIndexOf("=") + 1), youtubeSettings = {
                    container: o,
                    containerId: o.id,
                    pluginMediaElement: n,
                    pluginId: m,
                    videoId: r,
                    height: l,
                    width: k
                }, mejs.PluginDetector.hasPluginVersion("flash", [10, 0, 0]) ? mejs.YouTubeApi.createFlash(youtubeSettings) : mejs.YouTubeApi.enqueueIframe(youtubeSettings);
                break;
            case"vimeo":
                var s = m + "_player";
                if (n.vimeoid = a.url.substr(a.url.lastIndexOf("/") + 1), o.innerHTML = '<iframe src="//player.vimeo.com/video/' + n.vimeoid + "?api=1&portrait=0&byline=0&title=0&player_id=" + s + '" width="' + k + '" height="' + l + '" frameborder="0" class="mejs-shim" id="' + s + '" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>', "function" == typeof $f) {
                    var t = $f(o.childNodes[0]);
                    t.addEvent("ready", function () {
                        function a(a, b, c, d) {
                            var e = {type: c, target: b};
                            "timeupdate" == c && (b.currentTime = e.currentTime = d.seconds, b.duration = e.duration = d.duration), b.dispatchEvent(e.type, e)
                        }

                        $.extend(t, {
                            playVideo: function () {
                                t.api("play")
                            }, stopVideo: function () {
                                t.api("unload")
                            }, pauseVideo: function () {
                                t.api("pause")
                            }, seekTo: function (a) {
                                t.api("seekTo", a)
                            }, setVolume: function (a) {
                                t.api("setVolume", a)
                            }, setMuted: function (a) {
                                a ? (t.lastVolume = t.api("getVolume"), t.api("setVolume", 0)) : (t.api("setVolume", t.lastVolume), delete t.lastVolume)
                            }
                        }), t.addEvent("play", function () {
                            a(t, n, "play"), a(t, n, "playing")
                        }), t.addEvent("pause", function () {
                            a(t, n, "pause")
                        }), t.addEvent("finish", function () {
                            a(t, n, "ended")
                        }), t.addEvent("playProgress", function (b) {
                            a(t, n, "timeupdate", b)
                        }), n.pluginElement = o, n.pluginApi = t, mejs.MediaPluginBridge.initPlugin(m)
                    })
                } else console.warn("You need to include froogaloop for vimeo to work")
        }
        return j.style.display = "none", j.removeAttribute("autoplay"), n
    }, updateNative: function (a, b) {
        var c, d = a.htmlMediaElement;
        for (c in mejs.HtmlMediaElement)d[c] = mejs.HtmlMediaElement[c];
        return b.success(d, d), d
    }
}, mejs.YouTubeApi = {
    isIframeStarted: !1, isIframeLoaded: !1, loadIframeApi: function () {
        if (!this.isIframeStarted) {
            var a = document.createElement("script");
            a.src = "//www.youtube.com/player_api";
            var b = document.getElementsByTagName("script")[0];
            b.parentNode.insertBefore(a, b), this.isIframeStarted = !0
        }
    }, iframeQueue: [], enqueueIframe: function (a) {
        this.isLoaded ? this.createIframe(a) : (this.loadIframeApi(), this.iframeQueue.push(a))
    }, createIframe: function (a) {
        var b = a.pluginMediaElement, c = new YT.Player(a.containerId, {
            height: a.height,
            width: a.width,
            videoId: a.videoId,
            playerVars: {controls: 0},
            events: {
                onReady: function () {
                    a.pluginMediaElement.pluginApi = c, mejs.MediaPluginBridge.initPlugin(a.pluginId), setInterval(function () {
                        mejs.YouTubeApi.createEvent(c, b, "timeupdate")
                    }, 250)
                }, onStateChange: function (a) {
                    mejs.YouTubeApi.handleStateChange(a.data, c, b)
                }
            }
        })
    }, createEvent: function (a, b, c) {
        var d = {type: c, target: b};
        if (a && a.getDuration) {
            b.currentTime = d.currentTime = a.getCurrentTime(), b.duration = d.duration = a.getDuration(), d.paused = b.paused, d.ended = b.ended, d.muted = a.isMuted(), d.volume = a.getVolume() / 100, d.bytesTotal = a.getVideoBytesTotal(), d.bufferedBytes = a.getVideoBytesLoaded();
            var e = d.bufferedBytes / d.bytesTotal * d.duration;
            d.target.buffered = d.buffered = {
                start: function () {
                    return 0
                }, end: function () {
                    return e
                }, length: 1
            }
        }
        b.dispatchEvent(d.type, d)
    }, iFrameReady: function () {
        for (this.isLoaded = !0, this.isIframeLoaded = !0; this.iframeQueue.length > 0;) {
            var a = this.iframeQueue.pop();
            this.createIframe(a)
        }
    }, flashPlayers: {}, createFlash: function (a) {
        this.flashPlayers[a.pluginId] = a;
        var b, c = "//www.youtube.com/apiplayer?enablejsapi=1&amp;playerapiid=" + a.pluginId + "&amp;version=3&amp;autoplay=0&amp;controls=0&amp;modestbranding=1&loop=0";
        mejs.MediaFeatures.isIE ? (b = document.createElement("div"), a.container.appendChild(b), b.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" id="' + a.pluginId + '" width="' + a.width + '" height="' + a.height + '" class="mejs-shim"><param name="movie" value="' + c + '" /><param name="wmode" value="transparent" /><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="true" /></object>') : a.container.innerHTML = '<object type="application/x-shockwave-flash" id="' + a.pluginId + '" data="' + c + '" width="' + a.width + '" height="' + a.height + '" style="visibility: visible; " class="mejs-shim"><param name="allowScriptAccess" value="always"><param name="wmode" value="transparent"></object>'
    }, flashReady: function (a) {
        var b = this.flashPlayers[a], c = document.getElementById(a), d = b.pluginMediaElement;
        d.pluginApi = d.pluginElement = c, mejs.MediaPluginBridge.initPlugin(a), c.cueVideoById(b.videoId);
        var e = b.containerId + "_callback";
        window[e] = function (a) {
            mejs.YouTubeApi.handleStateChange(a, c, d)
        }, c.addEventListener("onStateChange", e), setInterval(function () {
            mejs.YouTubeApi.createEvent(c, d, "timeupdate")
        }, 250), mejs.YouTubeApi.createEvent(c, d, "canplay")
    }, handleStateChange: function (a, b, c) {
        switch (a) {
            case-1:
                c.paused = !0, c.ended = !0, mejs.YouTubeApi.createEvent(b, c, "loadedmetadata");
                break;
            case 0:
                c.paused = !1, c.ended = !0, mejs.YouTubeApi.createEvent(b, c, "ended");
                break;
            case 1:
                c.paused = !1, c.ended = !1, mejs.YouTubeApi.createEvent(b, c, "play"), mejs.YouTubeApi.createEvent(b, c, "playing");
                break;
            case 2:
                c.paused = !0, c.ended = !1, mejs.YouTubeApi.createEvent(b, c, "pause");
                break;
            case 3:
                mejs.YouTubeApi.createEvent(b, c, "progress");
                break;
            case 5:
        }
    }
}, window.mejs = mejs, window.MediaElement = mejs.MediaElement, function (a, b) {
    "use strict";
    var c = {
        locale: {language: b.i18n && b.i18n.locale.language || "", strings: b.i18n && b.i18n.locale.strings || {}},
        ietf_lang_regex: /^(x\-)?[a-z]{2,}(\-\w{2,})?(\-\w{2,})?$/,
        methods: {}
    };
    c.getLanguage = function () {
        var a = c.locale.language || window.navigator.userLanguage || window.navigator.language;
        return c.ietf_lang_regex.exec(a) ? a : null
    }, "undefined" != typeof mejsL10n && (c.locale.language = mejsL10n.language), c.methods.checkPlain = function (a) {
        var b, c, d = {"&": "&amp;", '"': "&quot;", "<": "&lt;", ">": "&gt;"};
        a = String(a);
        for (b in d)d.hasOwnProperty(b) && (c = new RegExp(b, "g"), a = a.replace(c, d[b]));
        return a
    }, c.methods.t = function (a, b) {
        return c.locale.strings && c.locale.strings[b.context] && c.locale.strings[b.context][a] && (a = c.locale.strings[b.context][a]), c.methods.checkPlain(a)
    }, c.t = function (a, b) {
        if ("string" == typeof a && a.length > 0) {
            var d = c.getLanguage();
            return b = b || {context: d}, c.methods.t(a, b)
        }
        throw{name: "InvalidArgumentException", message: "First argument is either not a string or empty."}
    }, b.i18n = c
}(document, mejs), function (a) {
    "use strict";
    "undefined" != typeof mejsL10n && (a[mejsL10n.language] = mejsL10n.strings)
}(mejs.i18n.locale.strings), /*!
 *
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
    "undefined" != typeof jQuery ? mejs.$ = jQuery : "undefined" != typeof ender && (mejs.$ = ender), function (a) {
    mejs.MepDefaults = {
        poster: "",
        showPosterWhenEnded: !1,
        defaultVideoWidth: 480,
        defaultVideoHeight: 270,
        videoWidth: -1,
        videoHeight: -1,
        defaultAudioWidth: 400,
        defaultAudioHeight: 30,
        defaultSeekBackwardInterval: function (a) {
            return .05 * a.duration
        },
        defaultSeekForwardInterval: function (a) {
            return .05 * a.duration
        },
        setDimensions: !0,
        audioWidth: -1,
        audioHeight: -1,
        startVolume: .8,
        loop: !1,
        autoRewind: !0,
        enableAutosize: !0,
        alwaysShowHours: !1,
        showTimecodeFrameCount: !1,
        framesPerSecond: 25,
        autosizeProgress: !0,
        alwaysShowControls: !1,
        hideVideoControlsOnLoad: !1,
        clickToPlayPause: !0,
        iPadUseNativeControls: !1,
        iPhoneUseNativeControls: !1,
        AndroidUseNativeControls: !1,
        features: ["playpause", "current", "progress", "duration", "tracks", "volume", "fullscreen"],
        isVideo: !0,
        enableKeyboard: !0,
        pauseOtherPlayers: !0,
        keyActions: [{
            keys: [32, 179], action: function (a, b) {
                b.paused || b.ended ? a.play() : a.pause()
            }
        }, {
            keys: [38], action: function (a, b) {
                a.container.find(".mejs-volume-slider").css("display", "block"), a.isVideo && (a.showControls(), a.startControlsTimer());
                var c = Math.min(b.volume + .1, 1);
                b.setVolume(c)
            }
        }, {
            keys: [40], action: function (a, b) {
                a.container.find(".mejs-volume-slider").css("display", "block"), a.isVideo && (a.showControls(), a.startControlsTimer());
                var c = Math.max(b.volume - .1, 0);
                b.setVolume(c)
            }
        }, {
            keys: [37, 227], action: function (a, b) {
                if (!isNaN(b.duration) && b.duration > 0) {
                    a.isVideo && (a.showControls(), a.startControlsTimer());
                    var c = Math.max(b.currentTime - a.options.defaultSeekBackwardInterval(b), 0);
                    b.setCurrentTime(c)
                }
            }
        }, {
            keys: [39, 228], action: function (a, b) {
                if (!isNaN(b.duration) && b.duration > 0) {
                    a.isVideo && (a.showControls(), a.startControlsTimer());
                    var c = Math.min(b.currentTime + a.options.defaultSeekForwardInterval(b), b.duration);
                    b.setCurrentTime(c)
                }
            }
        }, {
            keys: [70], action: function (a) {
                "undefined" != typeof a.enterFullScreen && (a.isFullScreen ? a.exitFullScreen() : a.enterFullScreen())
            }
        }, {
            keys: [77], action: function (a) {
                a.container.find(".mejs-volume-slider").css("display", "block"), a.isVideo && (a.showControls(), a.startControlsTimer()), a.setMuted(a.media.muted ? !1 : !0)
            }
        }]
    }, mejs.mepIndex = 0, mejs.players = {}, mejs.MediaElementPlayer = function (b, c) {
        if (!(this instanceof mejs.MediaElementPlayer))return new mejs.MediaElementPlayer(b, c);
        var d = this;
        return d.$media = d.$node = a(b), d.node = d.media = d.$media[0], "undefined" != typeof d.node.player ? d.node.player : (d.node.player = d, "undefined" == typeof c && (c = d.$node.data("mejsoptions")), d.options = a.extend({}, mejs.MepDefaults, c), d.id = "mep_" + mejs.mepIndex++, mejs.players[d.id] = d, d.init(), d)
    }, mejs.MediaElementPlayer.prototype = {
        hasFocus: !1, controlsAreVisible: !0, init: function () {
            var b = this, c = mejs.MediaFeatures, d = a.extend(!0, {}, b.options, {
                success: function (a, c) {
                    b.meReady(a, c)
                }, error: function (a) {
                    b.handleError(a)
                }
            }), e = b.media.tagName.toLowerCase();
            if (b.isDynamic = "audio" !== e && "video" !== e, b.isVideo = b.isDynamic ? b.options.isVideo : "audio" !== e && b.options.isVideo, c.isiPad && b.options.iPadUseNativeControls || c.isiPhone && b.options.iPhoneUseNativeControls)b.$media.attr("controls", "controls"), c.isiPad && null !== b.media.getAttribute("autoplay") && b.play(); else if (c.isAndroid && b.options.AndroidUseNativeControls); else {
                b.$media.removeAttr("controls");
                var f = mejs.i18n.t(b.isVideo ? "Video Player" : "Audio Player");
                if (a('<span class="mejs-offscreen">' + f + "</span>").insertBefore(b.$media), b.container = a('<div id="' + b.id + '" class="mejs-container ' + (mejs.MediaFeatures.svg ? "svg" : "no-svg") + '" tabindex="0" role="application" aria-label="' + f + '"><div class="mejs-inner"><div class="mejs-mediaelement"></div><div class="mejs-layers"></div><div class="mejs-controls"></div><div class="mejs-clear"></div></div></div>').addClass(b.$media[0].className).insertBefore(b.$media).focus(function () {
                        if (!b.controlsAreVisible) {
                            b.showControls(!0);
                            var a = b.container.find(".mejs-playpause-button > button");
                            a.focus()
                        }
                    }), b.container.addClass((c.isAndroid ? "mejs-android " : "") + (c.isiOS ? "mejs-ios " : "") + (c.isiPad ? "mejs-ipad " : "") + (c.isiPhone ? "mejs-iphone " : "") + (b.isVideo ? "mejs-video " : "mejs-audio ")), c.isiOS) {
                    var g = b.$media.clone();
                    b.container.find(".mejs-mediaelement").append(g), b.$media.remove(), b.$node = b.$media = g, b.node = b.media = g[0]
                } else b.container.find(".mejs-mediaelement").append(b.$media);
                b.controls = b.container.find(".mejs-controls"), b.layers = b.container.find(".mejs-layers");
                var h = b.isVideo ? "video" : "audio", i = h.substring(0, 1).toUpperCase() + h.substring(1);
                b.width = b.options[h + "Width"] > 0 || b.options[h + "Width"].toString().indexOf("%") > -1 ? b.options[h + "Width"] : "" !== b.media.style.width && null !== b.media.style.width ? b.media.style.width : null !== b.media.getAttribute("width") ? b.$media.attr("width") : b.options["default" + i + "Width"], b.height = b.options[h + "Height"] > 0 || b.options[h + "Height"].toString().indexOf("%") > -1 ? b.options[h + "Height"] : "" !== b.media.style.height && null !== b.media.style.height ? b.media.style.height : null !== b.$media[0].getAttribute("height") ? b.$media.attr("height") : b.options["default" + i + "Height"], b.setPlayerSize(b.width, b.height), d.pluginWidth = b.width, d.pluginHeight = b.height
            }
            mejs.MediaElement(b.$media[0], d), "undefined" != typeof b.container && b.controlsAreVisible && b.container.trigger("controlsshown")
        }, showControls: function (a) {
            var b = this;
            a = "undefined" == typeof a || a, b.controlsAreVisible || (a ? (b.controls.css("visibility", "visible").stop(!0, !0).fadeIn(200, function () {
                b.controlsAreVisible = !0, b.container.trigger("controlsshown")
            }), b.container.find(".mejs-control").css("visibility", "visible").stop(!0, !0).fadeIn(200, function () {
                b.controlsAreVisible = !0
            })) : (b.controls.css("visibility", "visible").css("display", "block"), b.container.find(".mejs-control").css("visibility", "visible").css("display", "block"), b.controlsAreVisible = !0, b.container.trigger("controlsshown")), b.setControlsSize())
        }, hideControls: function (b) {
            var c = this;
            b = "undefined" == typeof b || b, !c.controlsAreVisible || c.options.alwaysShowControls || c.keyboardAction || (b ? (c.controls.stop(!0, !0).fadeOut(200, function () {
                a(this).css("visibility", "hidden").css("display", "block"), c.controlsAreVisible = !1, c.container.trigger("controlshidden")
            }), c.container.find(".mejs-control").stop(!0, !0).fadeOut(200, function () {
                a(this).css("visibility", "hidden").css("display", "block")
            })) : (c.controls.css("visibility", "hidden").css("display", "block"), c.container.find(".mejs-control").css("visibility", "hidden").css("display", "block"), c.controlsAreVisible = !1, c.container.trigger("controlshidden")))
        }, controlsTimer: null, startControlsTimer: function (a) {
            var b = this;
            a = "undefined" != typeof a ? a : 1500, b.killControlsTimer("start"), b.controlsTimer = setTimeout(function () {
                b.hideControls(), b.killControlsTimer("hide")
            }, a)
        }, killControlsTimer: function () {
            var a = this;
            null !== a.controlsTimer && (clearTimeout(a.controlsTimer), delete a.controlsTimer, a.controlsTimer = null)
        }, controlsEnabled: !0, disableControls: function () {
            var a = this;
            a.killControlsTimer(), a.hideControls(!1), this.controlsEnabled = !1
        }, enableControls: function () {
            var a = this;
            a.showControls(!1), a.controlsEnabled = !0
        }, meReady: function (b, c) {
            var d, e, f = this, g = mejs.MediaFeatures, h = c.getAttribute("autoplay"), i = !("undefined" == typeof h || null === h || "false" === h);
            if (!f.created) {
                if (f.created = !0, f.media = b, f.domNode = c, !(g.isAndroid && f.options.AndroidUseNativeControls || g.isiPad && f.options.iPadUseNativeControls || g.isiPhone && f.options.iPhoneUseNativeControls)) {
                    f.buildposter(f, f.controls, f.layers, f.media), f.buildkeyboard(f, f.controls, f.layers, f.media), f.buildoverlays(f, f.controls, f.layers, f.media), f.findTracks();
                    for (d in f.options.features)if (e = f.options.features[d], f["build" + e])try {
                        f["build" + e](f, f.controls, f.layers, f.media)
                    } catch (j) {
                    }
                    f.container.trigger("controlsready"), f.setPlayerSize(f.width, f.height), f.setControlsSize(), f.isVideo && (mejs.MediaFeatures.hasTouch ? f.$media.bind("touchstart", function () {
                        f.controlsAreVisible ? f.hideControls(!1) : f.controlsEnabled && f.showControls(!1)
                    }) : (f.clickToPlayPauseCallback = function () {
                        f.options.clickToPlayPause && (f.media.paused ? f.play() : f.pause())
                    }, f.media.addEventListener("click", f.clickToPlayPauseCallback, !1), f.container.bind("mouseenter mouseover", function () {
                        f.controlsEnabled && (f.options.alwaysShowControls || (f.killControlsTimer("enter"), f.showControls(), f.startControlsTimer(2500)))
                    }).bind("mousemove", function () {
                        f.controlsEnabled && (f.controlsAreVisible || f.showControls(), f.options.alwaysShowControls || f.startControlsTimer(2500))
                    }).bind("mouseleave", function () {
                        f.controlsEnabled && (f.media.paused || f.options.alwaysShowControls || f.startControlsTimer(1e3))
                    })), f.options.hideVideoControlsOnLoad && f.hideControls(!1), i && !f.options.alwaysShowControls && f.hideControls(), f.options.enableAutosize && f.media.addEventListener("loadedmetadata", function (a) {
                        f.options.videoHeight <= 0 && null === f.domNode.getAttribute("height") && !isNaN(a.target.videoHeight) && (f.setPlayerSize(a.target.videoWidth, a.target.videoHeight), f.setControlsSize(), f.media.setVideoSize(a.target.videoWidth, a.target.videoHeight))
                    }, !1)), b.addEventListener("play", function () {
                        var a;
                        for (a in mejs.players) {
                            var b = mejs.players[a];
                            b.id == f.id || !f.options.pauseOtherPlayers || b.paused || b.ended || b.pause(), b.hasFocus = !1
                        }
                        f.hasFocus = !0
                    }, !1), f.media.addEventListener("ended", function () {
                        if (f.options.autoRewind)try {
                            f.media.setCurrentTime(0), window.setTimeout(function () {
                                a(f.container).find(".mejs-overlay-loading").parent().hide()
                            }, 20)
                        } catch (b) {
                        }
                        f.media.pause(), f.setProgressRail && f.setProgressRail(), f.setCurrentRail && f.setCurrentRail(), f.options.loop ? f.play() : !f.options.alwaysShowControls && f.controlsEnabled && f.showControls()
                    }, !1), f.media.addEventListener("loadedmetadata", function () {
                        f.updateDuration && f.updateDuration(), f.updateCurrent && f.updateCurrent(), f.isFullScreen || (f.setPlayerSize(f.width, f.height), f.setControlsSize())
                    }, !1), f.container.focusout(function (b) {
                        if (b.relatedTarget) {
                            var c = a(b.relatedTarget);
                            f.keyboardAction && 0 === c.parents(".mejs-container").length && (f.keyboardAction = !1, f.hideControls(!0))
                        }
                    }), setTimeout(function () {
                        f.setPlayerSize(f.width, f.height), f.setControlsSize()
                    }, 50), f.globalBind("resize", function () {
                        f.isFullScreen || mejs.MediaFeatures.hasTrueNativeFullScreen && document.webkitIsFullScreen || f.setPlayerSize(f.width, f.height), f.setControlsSize()
                    }), "youtube" == f.media.pluginType && f.options.autoplay && f.container.find(".mejs-overlay-play").hide()
                }
                i && "native" == b.pluginType && f.play(), f.options.success && ("string" == typeof f.options.success ? window[f.options.success](f.media, f.domNode, f) : f.options.success(f.media, f.domNode, f))
            }
        }, handleError: function (a) {
            var b = this;
            b.controls.hide(), b.options.error && b.options.error(a)
        }, setPlayerSize: function (b, c) {
            var d = this;
            if (!d.options.setDimensions)return !1;
            if ("undefined" != typeof b && (d.width = b), "undefined" != typeof c && (d.height = c), d.height.toString().indexOf("%") > 0 || "100%" === d.$node.css("max-width") || d.$node[0].currentStyle && "100%" === d.$node[0].currentStyle.maxWidth) {
                var e = function () {
                    return d.isVideo ? d.media.videoWidth && d.media.videoWidth > 0 ? d.media.videoWidth : null !== d.media.getAttribute("width") ? d.media.getAttribute("width") : d.options.defaultVideoWidth : d.options.defaultAudioWidth
                }(), f = function () {
                    return d.isVideo ? d.media.videoHeight && d.media.videoHeight > 0 ? d.media.videoHeight : null !== d.media.getAttribute("height") ? d.media.getAttribute("height") : d.options.defaultVideoHeight : d.options.defaultAudioHeight
                }(), g = d.container.parent().closest(":visible").width(), h = d.container.parent().closest(":visible").height(), i = d.isVideo || !d.options.autosizeProgress ? parseInt(g * f / e, 10) : f;
                isNaN(i) && (i = h), "body" === d.container.parent()[0].tagName.toLowerCase() && (g = a(window).width(), i = a(window).height()), i && g && (d.container.width(g).height(i), d.$media.add(d.container.find(".mejs-shim")).width("100%").height("100%"), d.isVideo && d.media.setVideoSize && d.media.setVideoSize(g, i), d.layers.children(".mejs-layer").width("100%").height("100%"))
            } else d.container.width(d.width).height(d.height), d.layers.children(".mejs-layer").width(d.width).height(d.height);
            var j = d.layers.find(".mejs-overlay-play"), k = j.find(".mejs-overlay-button");
            j.height(d.container.height() - d.controls.height()), k.css("margin-top", "-" + (k.height() / 2 - d.controls.height() / 2).toString() + "px")
        }, setControlsSize: function () {
            var b = this, c = 0, d = 0, e = b.controls.find(".mejs-time-rail"), f = b.controls.find(".mejs-time-total"), g = (b.controls.find(".mejs-time-current"), b.controls.find(".mejs-time-loaded"), e.siblings()), h = g.last(), i = null;
            if (b.container.is(":visible") && e.length && e.is(":visible")) {
                b.options && !b.options.autosizeProgress && (d = parseInt(e.css("width"), 10)), 0 !== d && d || (g.each(function () {
                    var b = a(this);
                    "absolute" != b.css("position") && b.is(":visible") && (c += a(this).outerWidth(!0))
                }), d = b.controls.width() - c - (e.outerWidth(!0) - e.width()));
                do e.width(d), f.width(d - (f.outerWidth(!0) - f.width())), "absolute" != h.css("position") && (i = h.position(), d--); while (null !== i && i.top > 0 && d > 0);
                b.setProgressRail && b.setProgressRail(), b.setCurrentRail && b.setCurrentRail()
            }
        }, buildposter: function (b, c, d, e) {
            var f = this, g = a('<div class="mejs-poster mejs-layer"></div>').appendTo(d), h = b.$media.attr("poster");
            "" !== b.options.poster && (h = b.options.poster), h ? f.setPoster(h) : g.hide(), e.addEventListener("play", function () {
                g.hide()
            }, !1), b.options.showPosterWhenEnded && b.options.autoRewind && e.addEventListener("ended", function () {
                g.show()
            }, !1)
        }, setPoster: function (b) {
            var c = this, d = c.container.find(".mejs-poster"), e = d.find("img");
            0 === e.length && (e = a('<img width="100%" height="100%" />').appendTo(d)), e.attr("src", b), d.css({"background-image": "url(" + b + ")"})
        }, buildoverlays: function (b, c, d, e) {
            var f = this;
            if (b.isVideo) {
                var g = a('<div class="mejs-overlay mejs-layer"><div class="mejs-overlay-loading"><span></span></div></div>').hide().appendTo(d), h = a('<div class="mejs-overlay mejs-layer"><div class="mejs-overlay-error"></div></div>').hide().appendTo(d), i = a('<div class="mejs-overlay mejs-layer mejs-overlay-play"><div class="mejs-overlay-button"></div></div>').appendTo(d).bind("click", function () {
                    f.options.clickToPlayPause && e.paused && e.play()
                });
                e.addEventListener("play", function () {
                    i.hide(), g.hide(), c.find(".mejs-time-buffering").hide(), h.hide()
                }, !1), e.addEventListener("playing", function () {
                    i.hide(), g.hide(), c.find(".mejs-time-buffering").hide(), h.hide()
                }, !1), e.addEventListener("seeking", function () {
                    g.show(), c.find(".mejs-time-buffering").show()
                }, !1), e.addEventListener("seeked", function () {
                    g.hide(), c.find(".mejs-time-buffering").hide()
                }, !1), e.addEventListener("pause", function () {
                    mejs.MediaFeatures.isiPhone || i.show()
                }, !1), e.addEventListener("waiting", function () {
                    g.show(), c.find(".mejs-time-buffering").show()
                }, !1), e.addEventListener("loadeddata", function () {
                    g.show(), c.find(".mejs-time-buffering").show(), mejs.MediaFeatures.isAndroid && (e.canplayTimeout = window.setTimeout(function () {
                        if (document.createEvent) {
                            var a = document.createEvent("HTMLEvents");
                            return a.initEvent("canplay", !0, !0), e.dispatchEvent(a)
                        }
                    }, 300))
                }, !1), e.addEventListener("canplay", function () {
                    g.hide(), c.find(".mejs-time-buffering").hide(), clearTimeout(e.canplayTimeout)
                }, !1), e.addEventListener("error", function () {
                    g.hide(), c.find(".mejs-time-buffering").hide(), h.show(), h.find("mejs-overlay-error").html("Error loading this resource")
                }, !1), e.addEventListener("keydown", function (a) {
                    f.onkeydown(b, e, a)
                }, !1)
            }
        }, buildkeyboard: function (b, c, d, e) {
            var f = this;
            f.container.keydown(function () {
                f.keyboardAction = !0
            }), f.globalBind("keydown", function (a) {
                return f.onkeydown(b, e, a)
            }), f.globalBind("click", function (c) {
                b.hasFocus = 0 !== a(c.target).closest(".mejs-container").length
            })
        }, onkeydown: function (a, b, c) {
            if (a.hasFocus && a.options.enableKeyboard)for (var d = 0, e = a.options.keyActions.length; e > d; d++)for (var f = a.options.keyActions[d], g = 0, h = f.keys.length; h > g; g++)if (c.keyCode == f.keys[g])return "function" == typeof c.preventDefault && c.preventDefault(), f.action(a, b, c.keyCode), !1;
            return !0
        }, findTracks: function () {
            var b = this, c = b.$media.find("track");
            b.tracks = [], c.each(function (c, d) {
                d = a(d), b.tracks.push({
                    srclang: d.attr("srclang") ? d.attr("srclang").toLowerCase() : "",
                    src: d.attr("src"),
                    kind: d.attr("kind"),
                    label: d.attr("label") || "",
                    entries: [],
                    isLoaded: !1
                })
            })
        }, changeSkin: function (a) {
            this.container[0].className = "mejs-container " + a, this.setPlayerSize(this.width, this.height), this.setControlsSize()
        }, play: function () {
            this.load(), this.media.play()
        }, pause: function () {
            try {
                this.media.pause()
            } catch (a) {
            }
        }, load: function () {
            this.isLoaded || this.media.load(), this.isLoaded = !0
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
            var a, b, c = this;
            for (a in c.options.features)if (b = c.options.features[a], c["clean" + b])try {
                c["clean" + b](c)
            } catch (d) {
            }
            c.isDynamic ? c.$node.insertBefore(c.container) : (c.$media.prop("controls", !0), c.$node.clone().insertBefore(c.container).show(), c.$node.remove()), "native" !== c.media.pluginType && c.media.remove(), delete mejs.players[c.id], "object" == typeof c.container && c.container.remove(), c.globalUnbind(), delete c.node.player
        }
    }, function () {
        function b(b, d) {
            var e = {d: [], w: []};
            return a.each((b || "").split(" "), function (a, b) {
                var f = b + "." + d;
                0 === f.indexOf(".") ? (e.d.push(f), e.w.push(f)) : e[c.test(b) ? "w" : "d"].push(f)
            }), e.d = e.d.join(" "), e.w = e.w.join(" "), e
        }

        var c = /^((after|before)print|(before)?unload|hashchange|message|o(ff|n)line|page(hide|show)|popstate|resize|storage)\b/;
        mejs.MediaElementPlayer.prototype.globalBind = function (c, d, e) {
            var f = this;
            c = b(c, f.id), c.d && a(document).bind(c.d, d, e), c.w && a(window).bind(c.w, d, e)
        }, mejs.MediaElementPlayer.prototype.globalUnbind = function (c, d) {
            var e = this;
            c = b(c, e.id), c.d && a(document).unbind(c.d, d), c.w && a(window).unbind(c.w, d)
        }
    }(), "undefined" != typeof a && (a.fn.mediaelementplayer = function (b) {
        return this.each(b === !1 ? function () {
            var b = a(this).data("mediaelementplayer");
            b && b.remove(), a(this).removeData("mediaelementplayer")
        } : function () {
            a(this).data("mediaelementplayer", new mejs.MediaElementPlayer(this, b))
        }), this
    }, a(document).ready(function () {
        a(".mejs-player").mediaelementplayer()
    })), window.MediaElementPlayer = mejs.MediaElementPlayer
}(mejs.$), function (a) {
    a.extend(mejs.MepDefaults, {
        playText: mejs.i18n.t("Play"),
        pauseText: mejs.i18n.t("Pause")
    }), a.extend(MediaElementPlayer.prototype, {
        buildplaypause: function (b, c, d, e) {
            function f(a) {
                "play" === a ? (i.removeClass("mejs-play").addClass("mejs-pause"), j.attr({
                    title: h.pauseText,
                    "aria-label": h.pauseText
                })) : (i.removeClass("mejs-pause").addClass("mejs-play"), j.attr({
                    title: h.playText,
                    "aria-label": h.playText
                }))
            }

            var g = this, h = g.options, i = a('<div class="mejs-button mejs-playpause-button mejs-play" ><button type="button" aria-controls="' + g.id + '" title="' + h.playText + '" aria-label="' + h.playText + '"></button></div>').appendTo(c).click(function (a) {
                return a.preventDefault(), e.paused ? e.play() : e.pause(), !1
            }), j = i.find("button");
            f("pse"), e.addEventListener("play", function () {
                f("play")
            }, !1), e.addEventListener("playing", function () {
                f("play")
            }, !1), e.addEventListener("pause", function () {
                f("pse")
            }, !1), e.addEventListener("paused", function () {
                f("pse")
            }, !1)
        }
    })
}(mejs.$), function (a) {
    a.extend(mejs.MepDefaults, {stopText: "Stop"}), a.extend(MediaElementPlayer.prototype, {
        buildstop: function (b, c, d, e) {
            {
                var f = this;
                a('<div class="mejs-button mejs-stop-button mejs-stop"><button type="button" aria-controls="' + f.id + '" title="' + f.options.stopText + '" aria-label="' + f.options.stopText + '"></button></div>').appendTo(c).click(function () {
                    e.paused || e.pause(), e.currentTime > 0 && (e.setCurrentTime(0), e.pause(), c.find(".mejs-time-current").width("0px"), c.find(".mejs-time-handle").css("left", "0px"), c.find(".mejs-time-float-current").html(mejs.Utility.secondsToTimeCode(0)), c.find(".mejs-currenttime").html(mejs.Utility.secondsToTimeCode(0)), d.find(".mejs-poster").show())
                })
            }
        }
    })
}(mejs.$), function (a) {
    a.extend(mejs.MepDefaults, {progessHelpText: mejs.i18n.t("Use Left/Right Arrow keys to advance one second, Up/Down arrows to advance ten seconds.")}), a.extend(MediaElementPlayer.prototype, {
        buildprogress: function (b, c, d, e) {
            a('<div class="mejs-time-rail"><a href="javascript:void(0);" class="mejs-time-total mejs-time-slider"><span class="mejs-offscreen">' + this.options.progessHelpText + '</span><span class="mejs-time-buffering"></span><span class="mejs-time-loaded"></span><span class="mejs-time-current"></span><span class="mejs-time-handle"></span><span class="mejs-time-float"><span class="mejs-time-float-current">00:00</span><span class="mejs-time-float-corner"></span></span></a></div>').appendTo(c), c.find(".mejs-time-buffering").hide();
            var f = this, g = c.find(".mejs-time-total"), h = c.find(".mejs-time-loaded"), i = c.find(".mejs-time-current"), j = c.find(".mejs-time-handle"), k = c.find(".mejs-time-float"), l = c.find(".mejs-time-float-current"), m = c.find(".mejs-time-slider"), n = function (a) {
                var b, c = g.offset(), d = g.outerWidth(!0), f = 0, h = 0, i = 0;
                b = a.originalEvent.changedTouches ? a.originalEvent.changedTouches[0].pageX : a.pageX, e.duration && (b < c.left ? b = c.left : b > d + c.left && (b = d + c.left), i = b - c.left, f = i / d, h = .02 >= f ? 0 : f * e.duration, o && h !== e.currentTime && e.setCurrentTime(h), mejs.MediaFeatures.hasTouch || (k.css("left", i), l.html(mejs.Utility.secondsToTimeCode(h)), k.show()))
            }, o = !1, p = !1, q = 0, r = !1, s = b.options.autoRewind, t = function () {
                var a = e.currentTime, b = mejs.i18n.t("Time Slider"), c = mejs.Utility.secondsToTimeCode(a), d = e.duration;
                m.attr({
                    "aria-label": b,
                    "aria-valuemin": 0,
                    "aria-valuemax": d,
                    "aria-valuenow": a,
                    "aria-valuetext": c,
                    role: "slider",
                    tabindex: 0
                })
            }, u = function () {
                var a = new Date;
                a - q >= 1e3 && e.play()
            };
            m.bind("focus", function () {
                b.options.autoRewind = !1
            }), m.bind("blur", function () {
                b.options.autoRewind = s
            }), m.bind("keydown", function (a) {
                new Date - q >= 1e3 && (r = e.paused);
                var b = a.keyCode, c = e.duration, d = e.currentTime;
                switch (b) {
                    case 37:
                        d -= 1;
                        break;
                    case 39:
                        d += 1;
                        break;
                    case 38:
                        d += Math.floor(.1 * c);
                        break;
                    case 40:
                        d -= Math.floor(.1 * c);
                        break;
                    case 36:
                        d = 0;
                        break;
                    case 35:
                        d = c;
                        break;
                    case 10:
                        return void(e.paused ? e.play() : e.pause());
                    case 13:
                        return void(e.paused ? e.play() : e.pause());
                    default:
                        return
                }
                return d = 0 > d ? 0 : d >= c ? c : Math.floor(d), q = new Date, r || e.pause(), d < e.duration && !r && setTimeout(u, 1100), e.setCurrentTime(d), a.preventDefault(), a.stopPropagation(), !1
            }), g.bind("mousedown touchstart", function (a) {
                (1 === a.which || 0 === a.which) && (o = !0, n(a), f.globalBind("mousemove.dur touchmove.dur", function (a) {
                    n(a)
                }), f.globalBind("mouseup.dur touchend.dur", function () {
                    o = !1, k.hide(), f.globalUnbind(".dur")
                }))
            }).bind("mouseenter", function () {
                p = !0, f.globalBind("mousemove.dur", function (a) {
                    n(a)
                }), mejs.MediaFeatures.hasTouch || k.show()
            }).bind("mouseleave", function () {
                p = !1, o || (f.globalUnbind(".dur"), k.hide())
            }), e.addEventListener("progress", function (a) {
                b.setProgressRail(a), b.setCurrentRail(a)
            }, !1), e.addEventListener("timeupdate", function (a) {
                b.setProgressRail(a), b.setCurrentRail(a), t(a)
            }, !1), f.loaded = h, f.total = g, f.current = i, f.handle = j
        }, setProgressRail: function (a) {
            var b = this, c = void 0 !== a ? a.target : b.media, d = null;
            c && c.buffered && c.buffered.length > 0 && c.buffered.end && c.duration ? d = c.buffered.end(0) / c.duration : c && void 0 !== c.bytesTotal && c.bytesTotal > 0 && void 0 !== c.bufferedBytes ? d = c.bufferedBytes / c.bytesTotal : a && a.lengthComputable && 0 !== a.total && (d = a.loaded / a.total), null !== d && (d = Math.min(1, Math.max(0, d)), b.loaded && b.total && b.loaded.width(b.total.width() * d))
        }, setCurrentRail: function () {
            var a = this;
            if (void 0 !== a.media.currentTime && a.media.duration && a.total && a.handle) {
                var b = Math.round(a.total.width() * a.media.currentTime / a.media.duration), c = b - Math.round(a.handle.outerWidth(!0) / 2);
                a.current.width(b), a.handle.css("left", c)
            }
        }
    })
}(mejs.$), function (a) {
    a.extend(mejs.MepDefaults, {
        duration: -1,
        timeAndDurationSeparator: "<span> | </span>"
    }), a.extend(MediaElementPlayer.prototype, {
        buildcurrent: function (b, c, d, e) {
            var f = this;
            a('<div class="mejs-time" role="timer" aria-live="off"><span class="mejs-currenttime">' + (b.options.alwaysShowHours ? "00:" : "") + (b.options.showTimecodeFrameCount ? "00:00:00" : "00:00") + "</span></div>").appendTo(c), f.currenttime = f.controls.find(".mejs-currenttime"), e.addEventListener("timeupdate", function () {
                b.updateCurrent()
            }, !1)
        }, buildduration: function (b, c, d, e) {
            var f = this;
            c.children().last().find(".mejs-currenttime").length > 0 ? a(f.options.timeAndDurationSeparator + '<span class="mejs-duration">' + (f.options.duration > 0 ? mejs.Utility.secondsToTimeCode(f.options.duration, f.options.alwaysShowHours || f.media.duration > 3600, f.options.showTimecodeFrameCount, f.options.framesPerSecond || 25) : (b.options.alwaysShowHours ? "00:" : "") + (b.options.showTimecodeFrameCount ? "00:00:00" : "00:00")) + "</span>").appendTo(c.find(".mejs-time")) : (c.find(".mejs-currenttime").parent().addClass("mejs-currenttime-container"), a('<div class="mejs-time mejs-duration-container"><span class="mejs-duration">' + (f.options.duration > 0 ? mejs.Utility.secondsToTimeCode(f.options.duration, f.options.alwaysShowHours || f.media.duration > 3600, f.options.showTimecodeFrameCount, f.options.framesPerSecond || 25) : (b.options.alwaysShowHours ? "00:" : "") + (b.options.showTimecodeFrameCount ? "00:00:00" : "00:00")) + "</span></div>").appendTo(c)), f.durationD = f.controls.find(".mejs-duration"), e.addEventListener("timeupdate", function () {
                b.updateDuration()
            }, !1)
        }, updateCurrent: function () {
            var a = this;
            a.currenttime && a.currenttime.html(mejs.Utility.secondsToTimeCode(a.media.currentTime, a.options.alwaysShowHours || a.media.duration > 3600, a.options.showTimecodeFrameCount, a.options.framesPerSecond || 25))
        }, updateDuration: function () {
            var a = this;
            a.container.toggleClass("mejs-long-video", a.media.duration > 3600), a.durationD && (a.options.duration > 0 || a.media.duration) && a.durationD.html(mejs.Utility.secondsToTimeCode(a.options.duration > 0 ? a.options.duration : a.media.duration, a.options.alwaysShowHours, a.options.showTimecodeFrameCount, a.options.framesPerSecond || 25))
        }
    })
}(mejs.$), function (a) {
    a.extend(mejs.MepDefaults, {
        muteText: mejs.i18n.t("Mute Toggle"),
        allyVolumeControlText: mejs.i18n.t("Use Up/Down Arrow keys to increase or decrease volume."),
        hideVolumeOnTouchDevices: !0,
        audioVolume: "horizontal",
        videoVolume: "vertical"
    }), a.extend(MediaElementPlayer.prototype, {
        buildvolume: function (b, c, d, e) {
            if (!mejs.MediaFeatures.isAndroid && !mejs.MediaFeatures.isiOS || !this.options.hideVolumeOnTouchDevices) {
                var f = this, g = f.isVideo ? f.options.videoVolume : f.options.audioVolume, h = "horizontal" == g ? a('<div class="mejs-button mejs-volume-button mejs-mute"><button type="button" aria-controls="' + f.id + '" title="' + f.options.muteText + '" aria-label="' + f.options.muteText + '"></button></div><a href="javascript:void(0);" class="mejs-horizontal-volume-slider"><span class="mejs-offscreen">' + f.options.allyVolumeControlText + '</span><div class="mejs-horizontal-volume-total"></div><div class="mejs-horizontal-volume-current"></div><div class="mejs-horizontal-volume-handle"></div></a>').appendTo(c) : a('<div class="mejs-button mejs-volume-button mejs-mute"><button type="button" aria-controls="' + f.id + '" title="' + f.options.muteText + '" aria-label="' + f.options.muteText + '"></button><a href="javascript:void(0);" class="mejs-volume-slider"><span class="mejs-offscreen">' + f.options.allyVolumeControlText + '</span><div class="mejs-volume-total"></div><div class="mejs-volume-current"></div><div class="mejs-volume-handle"></div></a></div>').appendTo(c), i = f.container.find(".mejs-volume-slider, .mejs-horizontal-volume-slider"), j = f.container.find(".mejs-volume-total, .mejs-horizontal-volume-total"), k = f.container.find(".mejs-volume-current, .mejs-horizontal-volume-current"), l = f.container.find(".mejs-volume-handle, .mejs-horizontal-volume-handle"), m = function (a, b) {
                    if (!i.is(":visible") && "undefined" == typeof b)return i.show(), m(a, !0), void i.hide();
                    a = Math.max(0, a), a = Math.min(a, 1), 0 === a ? h.removeClass("mejs-mute").addClass("mejs-unmute") : h.removeClass("mejs-unmute").addClass("mejs-mute");
                    var c = j.position();
                    if ("vertical" == g) {
                        var d = j.height(), e = d - d * a;
                        l.css("top", Math.round(c.top + e - l.height() / 2)), k.height(d - e), k.css("top", c.top + e)
                    } else {
                        var f = j.width(), n = f * a;
                        l.css("left", Math.round(c.left + n - l.width() / 2)), k.width(Math.round(n))
                    }
                }, n = function (a) {
                    var b = null, c = j.offset();
                    if ("vertical" === g) {
                        var d = j.height(), f = (parseInt(j.css("top").replace(/px/, ""), 10), a.pageY - c.top);
                        if (b = (d - f) / d, 0 === c.top || 0 === c.left)return
                    } else {
                        var h = j.width(), i = a.pageX - c.left;
                        b = i / h
                    }
                    b = Math.max(0, b), b = Math.min(b, 1), m(b), e.setMuted(0 === b ? !0 : !1), e.setVolume(b)
                }, o = !1, p = !1;
                h.hover(function () {
                    i.show(), p = !0
                }, function () {
                    p = !1, o || "vertical" != g || i.hide()
                });
                var q = function () {
                    var a = Math.floor(100 * e.volume);
                    i.attr({
                        "aria-label": mejs.i18n.t("volumeSlider"),
                        "aria-valuemin": 0,
                        "aria-valuemax": 100,
                        "aria-valuenow": a,
                        "aria-valuetext": a + "%",
                        role: "slider",
                        tabindex: 0
                    })
                };
                i.bind("mouseover", function () {
                    p = !0
                }).bind("mousedown", function (a) {
                    return n(a), f.globalBind("mousemove.vol", function (a) {
                        n(a)
                    }), f.globalBind("mouseup.vol", function () {
                        o = !1, f.globalUnbind(".vol"), p || "vertical" != g || i.hide()
                    }), o = !0, !1
                }).bind("keydown", function (a) {
                    var b = a.keyCode, c = e.volume;
                    switch (b) {
                        case 38:
                            c += .1;
                            break;
                        case 40:
                            c -= .1;
                            break;
                        default:
                            return !0
                    }
                    return o = !1, m(c), e.setVolume(c), !1
                }).bind("blur", function () {
                    i.hide()
                }), h.find("button").click(function () {
                    e.setMuted(!e.muted)
                }), h.find("button").bind("focus", function () {
                    i.show()
                }), e.addEventListener("volumechange", function (a) {
                    o || (e.muted ? (m(0), h.removeClass("mejs-mute").addClass("mejs-unmute")) : (m(e.volume), h.removeClass("mejs-unmute").addClass("mejs-mute"))), q(a)
                }, !1), f.container.is(":visible") && (m(b.options.startVolume), 0 === b.options.startVolume && e.setMuted(!0), "native" === e.pluginType && e.setVolume(b.options.startVolume))
            }
        }
    })
}(mejs.$), function (a) {
    a.extend(mejs.MepDefaults, {
        usePluginFullScreen: !0, newWindowCallback: function () {
            return ""
        }, fullscreenText: mejs.i18n.t("Fullscreen")
    }), a.extend(MediaElementPlayer.prototype, {
        isFullScreen: !1, isNativeFullScreen: !1, isInIframe: !1, buildfullscreen: function (b, c, d, e) {
            if (b.isVideo) {
                if (b.isInIframe = window.location != window.parent.location, mejs.MediaFeatures.hasTrueNativeFullScreen) {
                    var f = function () {
                        b.isFullScreen && (mejs.MediaFeatures.isFullScreen() ? (b.isNativeFullScreen = !0, b.setControlsSize()) : (b.isNativeFullScreen = !1, b.exitFullScreen()))
                    };
                    b.globalBind(mejs.MediaFeatures.fullScreenEventName, f)
                }
                var g = this, h = (b.container, a('<div class="mejs-button mejs-fullscreen-button"><button type="button" aria-controls="' + g.id + '" title="' + g.options.fullscreenText + '" aria-label="' + g.options.fullscreenText + '"></button></div>').appendTo(c));
                if ("native" === g.media.pluginType || !g.options.usePluginFullScreen && !mejs.MediaFeatures.isFirefox)h.click(function () {
                    var a = mejs.MediaFeatures.hasTrueNativeFullScreen && mejs.MediaFeatures.isFullScreen() || b.isFullScreen;
                    a ? b.exitFullScreen() : b.enterFullScreen()
                }); else {
                    var i = null, j = function () {
                        var a, b = document.createElement("x"), c = document.documentElement, d = window.getComputedStyle;
                        return "pointerEvents"in b.style ? (b.style.pointerEvents = "auto", b.style.pointerEvents = "x", c.appendChild(b), a = d && "auto" === d(b, "").pointerEvents, c.removeChild(b), !!a) : !1
                    }();
                    if (j && !mejs.MediaFeatures.isOpera) {
                        var k, l, m = !1, n = function () {
                            if (m) {
                                for (var a in o)o[a].hide();
                                h.css("pointer-events", ""), g.controls.css("pointer-events", ""), g.media.removeEventListener("click", g.clickToPlayPauseCallback), m = !1
                            }
                        }, o = {}, p = ["top", "left", "right", "bottom"], q = function () {
                            var a = h.offset().left - g.container.offset().left, b = h.offset().top - g.container.offset().top, c = h.outerWidth(!0), d = h.outerHeight(!0), e = g.container.width(), f = g.container.height();
                            for (k in o)o[k].css({position: "absolute", top: 0, left: 0});
                            o.top.width(e).height(b), o.left.width(a).height(d).css({top: b}), o.right.width(e - a - c).height(d).css({
                                top: b,
                                left: a + c
                            }), o.bottom.width(e).height(f - d - b).css({top: b + d})
                        };
                        for (g.globalBind("resize", function () {
                            q()
                        }), k = 0, l = p.length; l > k; k++)o[p[k]] = a('<div class="mejs-fullscreen-hover" />').appendTo(g.container).mouseover(n).hide();
                        h.on("mouseover", function () {
                            if (!g.isFullScreen) {
                                var a = h.offset(), c = b.container.offset();
                                e.positionFullscreenButton(a.left - c.left, a.top - c.top, !1), h.css("pointer-events", "none"), g.controls.css("pointer-events", "none"), g.media.addEventListener("click", g.clickToPlayPauseCallback);
                                for (k in o)o[k].show();
                                q(), m = !0
                            }
                        }), e.addEventListener("fullscreenchange", function () {
                            g.isFullScreen = !g.isFullScreen, g.isFullScreen ? g.media.removeEventListener("click", g.clickToPlayPauseCallback) : g.media.addEventListener("click", g.clickToPlayPauseCallback), n()
                        }), g.globalBind("mousemove", function (a) {
                            if (m) {
                                var b = h.offset();
                                (a.pageY < b.top || a.pageY > b.top + h.outerHeight(!0) || a.pageX < b.left || a.pageX > b.left + h.outerWidth(!0)) && (h.css("pointer-events", ""), g.controls.css("pointer-events", ""), m = !1)
                            }
                        })
                    } else h.on("mouseover", function () {
                        null !== i && (clearTimeout(i), delete i);
                        var a = h.offset(), c = b.container.offset();
                        e.positionFullscreenButton(a.left - c.left, a.top - c.top, !0)
                    }).on("mouseout", function () {
                        null !== i && (clearTimeout(i), delete i), i = setTimeout(function () {
                            e.hideFullscreenButton()
                        }, 1500)
                    })
                }
                b.fullscreenBtn = h, g.globalBind("keydown", function (a) {
                    (mejs.MediaFeatures.hasTrueNativeFullScreen && mejs.MediaFeatures.isFullScreen() || g.isFullScreen) && 27 == a.keyCode && b.exitFullScreen()
                })
            }
        }, cleanfullscreen: function (a) {
            a.exitFullScreen()
        }, containerSizeTimeout: null, enterFullScreen: function () {
            var b = this;
            if ("native" === b.media.pluginType || !mejs.MediaFeatures.isFirefox && !b.options.usePluginFullScreen) {
                if (a(document.documentElement).addClass("mejs-fullscreen"), normalHeight = b.container.height(), normalWidth = b.container.width(), "native" === b.media.pluginType)if (mejs.MediaFeatures.hasTrueNativeFullScreen)mejs.MediaFeatures.requestFullScreen(b.container[0]), b.isInIframe && setTimeout(function d() {
                    if (b.isNativeFullScreen) {
                        var c = window.devicePixelRatio || 1, e = .002, f = c * a(window).width(), g = screen.width, h = Math.abs(g - f), i = g * e;
                        h > i ? b.exitFullScreen() : setTimeout(d, 500)
                    }
                }, 500); else if (mejs.MediaFeatures.hasSemiNativeFullScreen)return void b.media.webkitEnterFullscreen();
                if (b.isInIframe) {
                    var c = b.options.newWindowCallback(this);
                    if ("" !== c) {
                        if (!mejs.MediaFeatures.hasTrueNativeFullScreen)return b.pause(), void window.open(c, b.id, "top=0,left=0,width=" + screen.availWidth + ",height=" + screen.availHeight + ",resizable=yes,scrollbars=no,status=no,toolbar=no");
                        setTimeout(function () {
                            b.isNativeFullScreen || (b.pause(), window.open(c, b.id, "top=0,left=0,width=" + screen.availWidth + ",height=" + screen.availHeight + ",resizable=yes,scrollbars=no,status=no,toolbar=no"))
                        }, 250)
                    }
                }
                b.container.addClass("mejs-container-fullscreen").width("100%").height("100%"), b.containerSizeTimeout = setTimeout(function () {
                    b.container.css({width: "100%", height: "100%"}), b.setControlsSize()
                }, 500), "native" === b.media.pluginType ? b.$media.width("100%").height("100%") : (b.container.find(".mejs-shim").width("100%").height("100%"), b.media.setVideoSize(a(window).width(), a(window).height())), b.layers.children("div").width("100%").height("100%"), b.fullscreenBtn && b.fullscreenBtn.removeClass("mejs-fullscreen").addClass("mejs-unfullscreen"), b.setControlsSize(), b.isFullScreen = !0, b.container.find(".mejs-captions-text").css("font-size", screen.width / b.width * 1 * 100 + "%"), b.container.find(".mejs-captions-position").css("bottom", "45px")
            }
        }, exitFullScreen: function () {
            var b = this;
            return clearTimeout(b.containerSizeTimeout), "native" !== b.media.pluginType && mejs.MediaFeatures.isFirefox ? void b.media.setFullscreen(!1) : (mejs.MediaFeatures.hasTrueNativeFullScreen && (mejs.MediaFeatures.isFullScreen() || b.isFullScreen) && mejs.MediaFeatures.cancelFullScreen(), a(document.documentElement).removeClass("mejs-fullscreen"), b.container.removeClass("mejs-container-fullscreen").width(normalWidth).height(normalHeight), "native" === b.media.pluginType ? b.$media.width(normalWidth).height(normalHeight) : (b.container.find(".mejs-shim").width(normalWidth).height(normalHeight), b.media.setVideoSize(normalWidth, normalHeight)), b.layers.children("div").width(normalWidth).height(normalHeight), b.fullscreenBtn.removeClass("mejs-unfullscreen").addClass("mejs-fullscreen"), b.setControlsSize(), b.isFullScreen = !1, b.container.find(".mejs-captions-text").css("font-size", ""), void b.container.find(".mejs-captions-position").css("bottom", ""))
        }
    })
}(mejs.$), function (a) {
    a.extend(mejs.MepDefaults, {
        speeds: ["2.00", "1.50", "1.25", "1.00", "0.75"],
        defaultSpeed: "1.00",
        speedChar: "x"
    }), a.extend(MediaElementPlayer.prototype, {
        buildspeed: function (b, c, d, e) {
            var f = this;
            if ("native" == f.media.pluginType) {
                var g = null, h = null, i = '<div class="mejs-button mejs-speed-button"><button type="button">' + f.options.defaultSpeed + f.options.speedChar + '</button><div class="mejs-speed-selector"><ul>';
                -1 === a.inArray(f.options.defaultSpeed, f.options.speeds) && f.options.speeds.push(f.options.defaultSpeed), f.options.speeds.sort(function (a, b) {
                    return parseFloat(b) - parseFloat(a)
                });
                for (var j = 0, k = f.options.speeds.length; k > j; j++)i += '<li><input type="radio" name="speed" value="' + f.options.speeds[j] + '" id="' + f.options.speeds[j] + '" ' + (f.options.speeds[j] == f.options.defaultSpeed ? " checked" : "") + ' /><label for="' + f.options.speeds[j] + '" ' + (f.options.speeds[j] == f.options.defaultSpeed ? ' class="mejs-speed-selected"' : "") + ">" + f.options.speeds[j] + f.options.speedChar + "</label></li>";
                i += "</ul></div></div>", g = a(i).appendTo(c), h = g.find(".mejs-speed-selector"), playbackspeed = f.options.defaultSpeed, h.on("click", 'input[type="radio"]', function () {
                    var b = a(this).attr("value");
                    playbackspeed = b, e.playbackRate = parseFloat(b), g.find("button").html("test" + b + f.options.speedChar), g.find(".mejs-speed-selected").removeClass("mejs-speed-selected"), g.find('input[type="radio"]:checked').next().addClass("mejs-speed-selected")
                }), h.height(g.find(".mejs-speed-selector ul").outerHeight(!0) + g.find(".mejs-speed-translations").outerHeight(!0)).css("top", -1 * h.height() + "px")
            }
        }
    })
}(mejs.$), function (a) {
    a.extend(mejs.MepDefaults, {
        startLanguage: "",
        tracksText: mejs.i18n.t("Captions/Subtitles"),
        hideCaptionsButtonWhenEmpty: !0,
        toggleCaptionsButtonWhenOnlyOne: !1,
        slidesSelector: ""
    }), a.extend(MediaElementPlayer.prototype, {
        hasChapters: !1, buildtracks: function (b, c, d, e) {
            if (0 !== b.tracks.length) {
                var f, g = this;
                if (g.domNode.textTracks)for (f = g.domNode.textTracks.length - 1; f >= 0; f--)g.domNode.textTracks[f].mode = "hidden";
                b.chapters = a('<div class="mejs-chapters mejs-layer"></div>').prependTo(d).hide(), b.captions = a('<div class="mejs-captions-layer mejs-layer"><div class="mejs-captions-position mejs-captions-position-hover" role="log" aria-live="assertive" aria-atomic="false"><span class="mejs-captions-text"></span></div></div>').prependTo(d).hide(), b.captionsText = b.captions.find(".mejs-captions-text"), b.captionsButton = a('<div class="mejs-button mejs-captions-button"><button type="button" aria-controls="' + g.id + '" title="' + g.options.tracksText + '" aria-label="' + g.options.tracksText + '"></button><div class="mejs-captions-selector"><ul><li><input type="radio" name="' + b.id + '_captions" id="' + b.id + '_captions_none" value="none" checked="checked" /><label for="' + b.id + '_captions_none">' + mejs.i18n.t("None") + "</label></li></ul></div></div>").appendTo(c);
                var h = 0;
                for (f = 0; f < b.tracks.length; f++)"subtitles" == b.tracks[f].kind && h++;
                for (g.options.toggleCaptionsButtonWhenOnlyOne && 1 == h ? b.captionsButton.on("click", function () {
                    lang = null === b.selectedTrack ? b.tracks[0].srclang : "none", b.setTrack(lang)
                }) : (b.captionsButton.on("mouseenter focusin", function () {
                    a(this).find(".mejs-captions-selector").css("visibility", "visible")
                }).on("click", "input[type=radio]", function () {
                    lang = this.value, b.setTrack(lang)
                }), b.captionsButton.on("mouseleave focusout", function () {
                    a(this).find(".mejs-captions-selector").css("visibility", "hidden")
                })), b.options.alwaysShowControls ? b.container.find(".mejs-captions-position").addClass("mejs-captions-position-hover") : b.container.bind("controlsshown", function () {
                    b.container.find(".mejs-captions-position").addClass("mejs-captions-position-hover")
                }).bind("controlshidden", function () {
                    e.paused || b.container.find(".mejs-captions-position").removeClass("mejs-captions-position-hover")
                }), b.trackToLoad = -1, b.selectedTrack = null, b.isLoadingTrack = !1, f = 0; f < b.tracks.length; f++)"subtitles" == b.tracks[f].kind && b.addTrackButton(b.tracks[f].srclang, b.tracks[f].label);
                b.loadNextTrack(), e.addEventListener("timeupdate", function () {
                    b.displayCaptions()
                }, !1), "" !== b.options.slidesSelector && (b.slidesContainer = a(b.options.slidesSelector), e.addEventListener("timeupdate", function () {
                    b.displaySlides()
                }, !1)), e.addEventListener("loadedmetadata", function () {
                    b.displayChapters()
                }, !1), b.container.hover(function () {
                    b.hasChapters && (b.chapters.css("visibility", "visible"), b.chapters.fadeIn(200).height(b.chapters.find(".mejs-chapter").outerHeight()))
                }, function () {
                    b.hasChapters && !e.paused && b.chapters.fadeOut(200, function () {
                        a(this).css("visibility", "hidden"), a(this).css("display", "block")
                    })
                }), null !== b.node.getAttribute("autoplay") && b.chapters.css("visibility", "hidden")
            }
        }, setTrack: function (a) {
            var b, c = this;
            if ("none" == a)c.selectedTrack = null, c.captionsButton.removeClass("mejs-captions-enabled"); else for (b = 0; b < c.tracks.length; b++)if (c.tracks[b].srclang == a) {
                null === c.selectedTrack && c.captionsButton.addClass("mejs-captions-enabled"), c.selectedTrack = c.tracks[b], c.captions.attr("lang", c.selectedTrack.srclang), c.displayCaptions();
                break
            }
        }, loadNextTrack: function () {
            var a = this;
            a.trackToLoad++, a.trackToLoad < a.tracks.length ? (a.isLoadingTrack = !0, a.loadTrack(a.trackToLoad)) : (a.isLoadingTrack = !1, a.checkForTracks())
        }, loadTrack: function (b) {
            var c = this, d = c.tracks[b], e = function () {
                d.isLoaded = !0, c.enableTrackButton(d.srclang, d.label), c.loadNextTrack()
            };
            a.ajax({
                url: d.src, dataType: "text", success: function (a) {
                    d.entries = "string" == typeof a && /<tt\s+xml/gi.exec(a) ? mejs.TrackFormatParser.dfxp.parse(a) : mejs.TrackFormatParser.webvtt.parse(a), e(), "chapters" == d.kind && c.media.addEventListener("play", function () {
                        c.media.duration > 0 && c.displayChapters(d)
                    }, !1), "slides" == d.kind && c.setupSlides(d)
                }, error: function () {
                    c.loadNextTrack()
                }
            })
        }, enableTrackButton: function (b, c) {
            var d = this;
            "" === c && (c = mejs.language.codes[b] || b), d.captionsButton.find("input[value=" + b + "]").prop("disabled", !1).siblings("label").html(c), d.options.startLanguage == b && a("#" + d.id + "_captions_" + b).prop("checked", !0).trigger("click"), d.adjustLanguageBox()
        }, addTrackButton: function (b, c) {
            var d = this;
            "" === c && (c = mejs.language.codes[b] || b), d.captionsButton.find("ul").append(a('<li><input type="radio" name="' + d.id + '_captions" id="' + d.id + "_captions_" + b + '" value="' + b + '" disabled="disabled" /><label for="' + d.id + "_captions_" + b + '">' + c + " (loading)</label></li>")), d.adjustLanguageBox(), d.container.find(".mejs-captions-translations option[value=" + b + "]").remove()
        }, adjustLanguageBox: function () {
            var a = this;
            a.captionsButton.find(".mejs-captions-selector").height(a.captionsButton.find(".mejs-captions-selector ul").outerHeight(!0) + a.captionsButton.find(".mejs-captions-translations").outerHeight(!0))
        }, checkForTracks: function () {
            var a = this, b = !1;
            if (a.options.hideCaptionsButtonWhenEmpty) {
                for (i = 0; i < a.tracks.length; i++)if ("subtitles" == a.tracks[i].kind) {
                    b = !0;
                    break
                }
                b || (a.captionsButton.hide(), a.setControlsSize())
            }
        }, displayCaptions: function () {
            if ("undefined" != typeof this.tracks) {
                var a, b = this, c = b.selectedTrack;
                if (null !== c && c.isLoaded) {
                    for (a = 0; a < c.entries.times.length; a++)if (b.media.currentTime >= c.entries.times[a].start && b.media.currentTime <= c.entries.times[a].stop)return b.captionsText.html(c.entries.text[a]).attr("class", "mejs-captions-text " + (c.entries.times[a].identifier || "")), void b.captions.show().height(0);
                    b.captions.hide()
                } else b.captions.hide()
            }
        }, setupSlides: function (a) {
            var b = this;
            b.slides = a, b.slides.entries.imgs = [b.slides.entries.text.length], b.showSlide(0)
        }, showSlide: function (b) {
            if ("undefined" != typeof this.tracks && "undefined" != typeof this.slidesContainer) {
                var c = this, d = c.slides.entries.text[b], e = c.slides.entries.imgs[b];
                "undefined" == typeof e || "undefined" == typeof e.fadeIn ? c.slides.entries.imgs[b] = e = a('<img src="' + d + '">').on("load", function () {
                    e.appendTo(c.slidesContainer).hide().fadeIn().siblings(":visible").fadeOut()
                }) : e.is(":visible") || e.is(":animated") || e.fadeIn().siblings(":visible").fadeOut()
            }
        }, displaySlides: function () {
            if ("undefined" != typeof this.slides) {
                var a, b = this, c = b.slides;
                for (a = 0; a < c.entries.times.length; a++)if (b.media.currentTime >= c.entries.times[a].start && b.media.currentTime <= c.entries.times[a].stop)return void b.showSlide(a)
            }
        }, displayChapters: function () {
            var a, b = this;
            for (a = 0; a < b.tracks.length; a++)if ("chapters" == b.tracks[a].kind && b.tracks[a].isLoaded) {
                b.drawChapters(b.tracks[a]), b.hasChapters = !0;
                break
            }
        }, drawChapters: function (b) {
            var c, d, e = this, f = 0, g = 0;
            for (e.chapters.empty(), c = 0; c < b.entries.times.length; c++)d = b.entries.times[c].stop - b.entries.times[c].start, f = Math.floor(d / e.media.duration * 100), (f + g > 100 || c == b.entries.times.length - 1 && 100 > f + g) && (f = 100 - g), e.chapters.append(a('<div class="mejs-chapter" rel="' + b.entries.times[c].start + '" style="left: ' + g.toString() + "%;width: " + f.toString() + '%;"><div class="mejs-chapter-block' + (c == b.entries.times.length - 1 ? " mejs-chapter-block-last" : "") + '"><span class="ch-title">' + b.entries.text[c] + '</span><span class="ch-time">' + mejs.Utility.secondsToTimeCode(b.entries.times[c].start) + "&ndash;" + mejs.Utility.secondsToTimeCode(b.entries.times[c].stop) + "</span></div></div>")), g += f;
            e.chapters.find("div.mejs-chapter").click(function () {
                e.media.setCurrentTime(parseFloat(a(this).attr("rel"))), e.media.paused && e.media.play()
            }), e.chapters.show()
        }
    }), mejs.language = {
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
            fl: "Filipino",
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
    }, mejs.TrackFormatParser = {
        webvtt: {
            pattern_timecode: /^((?:[0-9]{1,2}:)?[0-9]{2}:[0-9]{2}([,.][0-9]{1,3})?) --\> ((?:[0-9]{1,2}:)?[0-9]{2}:[0-9]{2}([,.][0-9]{3})?)(.*)$/,
            parse: function (b) {
                for (var c, d, e, f = 0, g = mejs.TrackFormatParser.split2(b, /\r?\n/), h = {
                    text: [],
                    times: []
                }; f < g.length; f++) {
                    if (c = this.pattern_timecode.exec(g[f]), c && f < g.length) {
                        for (f - 1 >= 0 && "" !== g[f - 1] && (e = g[f - 1]), f++, d = g[f], f++; "" !== g[f] && f < g.length;)d = d + "\n" + g[f], f++;
                        d = a.trim(d).replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi, "<a href='$1' target='_blank'>$1</a>"), h.text.push(d), h.times.push({
                            identifier: e,
                            start: 0 === mejs.Utility.convertSMPTEtoSeconds(c[1]) ? .2 : mejs.Utility.convertSMPTEtoSeconds(c[1]),
                            stop: mejs.Utility.convertSMPTEtoSeconds(c[3]),
                            settings: c[5]
                        })
                    }
                    e = ""
                }
                return h
            }
        }, dfxp: {
            parse: function (b) {
                b = a(b).filter("tt");
                var c, d, e = 0, f = b.children("div").eq(0), g = f.find("p"), h = b.find("#" + f.attr("style")), i = {
                    text: [],
                    times: []
                };
                if (h.length) {
                    var j = h.removeAttr("id").get(0).attributes;
                    if (j.length)for (c = {}, e = 0; e < j.length; e++)c[j[e].name.split(":")[1]] = j[e].value
                }
                for (e = 0; e < g.length; e++) {
                    var k, l = {start: null, stop: null, style: null};
                    if (g.eq(e).attr("begin") && (l.start = mejs.Utility.convertSMPTEtoSeconds(g.eq(e).attr("begin"))), !l.start && g.eq(e - 1).attr("end") && (l.start = mejs.Utility.convertSMPTEtoSeconds(g.eq(e - 1).attr("end"))), g.eq(e).attr("end") && (l.stop = mejs.Utility.convertSMPTEtoSeconds(g.eq(e).attr("end"))), !l.stop && g.eq(e + 1).attr("begin") && (l.stop = mejs.Utility.convertSMPTEtoSeconds(g.eq(e + 1).attr("begin"))), c) {
                        k = "";
                        for (var m in c)k += m + ":" + c[m] + ";"
                    }
                    k && (l.style = k), 0 === l.start && (l.start = .2), i.times.push(l), d = a.trim(g.eq(e).html()).replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi, "<a href='$1' target='_blank'>$1</a>"), i.text.push(d), 0 === i.times.start && (i.times.start = 2)
                }
                return i
            }
        }, split2: function (a, b) {
            return a.split(b)
        }
    }, 3 != "x\n\ny".split(/\n/gi).length && (mejs.TrackFormatParser.split2 = function (a, b) {
        var c, d = [], e = "";
        for (c = 0; c < a.length; c++)e += a.substring(c, c + 1), b.test(e) && (d.push(e.replace(b, "")), e = "");
        return d.push(e), d
    })
}(mejs.$), function (a) {
    a.extend(mejs.MepDefaults, {
        contextMenuItems: [{
            render: function (a) {
                return "undefined" == typeof a.enterFullScreen ? null : mejs.i18n.t(a.isFullScreen ? "Turn off Fullscreen" : "Go Fullscreen")
            }, click: function (a) {
                a.isFullScreen ? a.exitFullScreen() : a.enterFullScreen()
            }
        }, {
            render: function (a) {
                return mejs.i18n.t(a.media.muted ? "Unmute" : "Mute")
            }, click: function (a) {
                a.setMuted(a.media.muted ? !1 : !0)
            }
        }, {isSeparator: !0}, {
            render: function () {
                return mejs.i18n.t("Download Video")
            }, click: function (a) {
                window.location.href = a.media.currentSrc
            }
        }]
    }), a.extend(MediaElementPlayer.prototype, {
        buildcontextmenu: function (b) {
            b.contextMenu = a('<div class="mejs-contextmenu"></div>').appendTo(a("body")).hide(), b.container.bind("contextmenu", function (a) {
                return b.isContextMenuEnabled ? (a.preventDefault(), b.renderContextMenu(a.clientX - 1, a.clientY - 1), !1) : void 0
            }), b.container.bind("click", function () {
                b.contextMenu.hide()
            }), b.contextMenu.bind("mouseleave", function () {
                b.startContextMenuTimer()
            })
        }, cleancontextmenu: function (a) {
            a.contextMenu.remove()
        }, isContextMenuEnabled: !0, enableContextMenu: function () {
            this.isContextMenuEnabled = !0
        }, disableContextMenu: function () {
            this.isContextMenuEnabled = !1
        }, contextMenuTimeout: null, startContextMenuTimer: function () {
            var a = this;
            a.killContextMenuTimer(), a.contextMenuTimer = setTimeout(function () {
                a.hideContextMenu(), a.killContextMenuTimer()
            }, 750)
        }, killContextMenuTimer: function () {
            var a = this.contextMenuTimer;
            null != a && (clearTimeout(a), delete a, a = null)
        }, hideContextMenu: function () {
            this.contextMenu.hide()
        }, renderContextMenu: function (b, c) {
            for (var d = this, e = "", f = d.options.contextMenuItems, g = 0, h = f.length; h > g; g++)if (f[g].isSeparator)e += '<div class="mejs-contextmenu-separator"></div>'; else {
                var i = f[g].render(d);
                null != i && (e += '<div class="mejs-contextmenu-item" data-itemindex="' + g + '" id="element-' + 1e6 * Math.random() + '">' + i + "</div>")
            }
            d.contextMenu.empty().append(a(e)).css({
                top: c,
                left: b
            }).show(), d.contextMenu.find(".mejs-contextmenu-item").each(function () {
                var b = a(this), c = parseInt(b.data("itemindex"), 10), e = d.options.contextMenuItems[c];
                "undefined" != typeof e.show && e.show(b, d), b.click(function () {
                    "undefined" != typeof e.click && e.click(d), d.contextMenu.hide()
                })
            }), setTimeout(function () {
                d.killControlsTimer("rev3")
            }, 100)
        }
    })
}(mejs.$), function (a) {
    a.extend(mejs.MepDefaults, {postrollCloseText: mejs.i18n.t("Close")}), a.extend(MediaElementPlayer.prototype, {
        buildpostroll: function (b, c, d) {
            var e = this, f = e.container.find('link[rel="postroll"]').attr("href");
            "undefined" != typeof f && (b.postroll = a('<div class="mejs-postroll-layer mejs-layer"><a class="mejs-postroll-close" onclick="$(this).parent().hide();return false;">' + e.options.postrollCloseText + '</a><div class="mejs-postroll-layer-content"></div></div>').prependTo(d).hide(), e.media.addEventListener("ended", function () {
                a.ajax({
                    dataType: "html", url: f, success: function (a) {
                        d.find(".mejs-postroll-layer-content").html(a)
                    }
                }), b.postroll.show()
            }, !1))
        }
    })
}(mejs.$);
;
/*globals window, document, jQuery, _, Backbone, _wpmejsSettings */

(function ($, _, Backbone) {
    "use strict";

    var WPPlaylistView = Backbone.View.extend({
        initialize: function (options) {

            // Resize players to 100%
            $('video').css({'width': '100%', 'height': '100%'})
                .attr('width', '100%').attr('height', '100%');
            $('audio').css('width', '100%').attr('width', '100%');

            this.index = 0;
            this.settings = {};
            this.data = options.metadata || $.parseJSON(this.$('script').html());
            this.playerNode = this.$(this.data.type);


            this.tracks = new Backbone.Collection(this.data.tracks);
            this.current = this.tracks.first();

            if ('audio' === this.data.type) {
                this.currentTemplate = wp.template('wp-playlist-current-item');
                this.currentNode = this.$('.wp-playlist-current-item');
            }

            this.renderCurrent();

            if (this.data.tracklist) {
                this.itemTemplate = wp.template('wp-playlist-item');
                this.playingClass = 'wp-playlist-playing';
                this.renderTracks();
            }

            this.playerNode.attr('src', this.current.get('src'));

            _.bindAll(this, 'bindPlayer', 'bindResetPlayer', 'setPlayer', 'ended', 'clickTrack');

            if (!_.isUndefined(window._wpmejsSettings)) {
                this.settings.pluginPath = _wpmejsSettings.pluginPath;
            }
            this.settings.success = this.bindPlayer;
            this.setPlayer();
        },

        bindPlayer: function (mejs) {
            this.player = mejs;
            this.player.addEventListener('ended', this.ended);

        },

        bindResetPlayer: function (mejs) {
            this.bindPlayer(mejs);
            this.playCurrentSrc();
        },

        setPlayer: function () {
            if (this._player) {
                this._player.pause();
                this._player.remove();
                this.playerNode = this.$(this.data.type);
                this.playerNode.attr('src', this.current.get('src'));
                this.settings.success = this.bindResetPlayer;
            }
            /**
             * This is also our bridge to the outside world
             */
            this._player = new MediaElementPlayer(this.playerNode.get(0), this.settings);
        },

        playCurrentSrc: function () {
            this.renderCurrent();
            this.player.setSrc(this.playerNode.attr('src'));
            this.player.load();
            this.player.play();
        },

        renderCurrent: function () {
            var dimensions;
            if ('video' === this.data.type) {
                if (this.data.images && this.current.get('image')) {
                    this.playerNode.attr('poster', this.current.get('image').src);
                }
                dimensions = this.current.get('dimensions').resized;
                this.playerNode.attr(dimensions);
            } else {
                if (!this.data.images) {
                    this.current.set('image', false);
                }
                this.currentNode.html(this.currentTemplate(this.current.toJSON()));
            }
        },

        renderTracks: function () {
            var self = this, i = 1, tracklist = $('<div class="wp-playlist-tracks"></div>');
            this.tracks.each(function (model) {
                if (!self.data.images) {
                    model.set('image', false);
                }
                model.set('artists', self.data.artists);
                model.set('index', self.data.tracknumbers ? i : false);
                tracklist.append(self.itemTemplate(model.toJSON()));
                i += 1;
            });
            this.$el.append(tracklist);

            this.$('.wp-playlist-item').eq(0).addClass(this.playingClass);
        },

        events: {
            'click .wp-playlist-item': 'clickTrack',
            'click .wp-playlist-next': 'next',
            'click .wp-playlist-prev': 'prev'
        },

        clickTrack: function (e) {
            e.preventDefault();

            this.index = this.$('.wp-playlist-item').index(e.currentTarget);
            this.setCurrent();
        },

        ended: function () {
            if (this.index + 1 < this.tracks.length) {
                this.next();
            } else {
                this.index = 0;
                this.current = this.tracks.at(this.index);
                this.loadCurrent();
            }
        },

        next: function () {
            this.index = this.index + 1 >= this.tracks.length ? 0 : this.index + 1;
            this.setCurrent();
        },

        prev: function () {
            this.index = this.index - 1 < 0 ? this.tracks.length - 1 : this.index - 1;
            this.setCurrent();
        },

        loadCurrent: function () {
            var last = this.playerNode.attr('src').split('.').pop(),
                current = this.current.get('src').split('.').pop();

            this.player.pause();

            if (last !== current) {
                this.setPlayer();
            } else {
                this.playerNode.attr('src', this.current.get('src'));
                this.playCurrentSrc();
            }
        },

        setCurrent: function () {
            this.current = this.tracks.at(this.index);

            if (this.data.tracklist) {
                this.$('.wp-playlist-item')
                    .removeClass(this.playingClass)
                    .eq(this.index)
                    .addClass(this.playingClass);
            }

            this.loadCurrent();
        }
    });

    $(document).ready(function () {
        if (!$('body').hasClass('wp-admin') || $('body').hasClass('about-php')) {
            $('.wp-playlist').each(function () {
                return new WPPlaylistView({el: this});
            });
        }
    });

    window.WPPlaylistView = WPPlaylistView;

}(jQuery, _, Backbone));
;
/*! fancyBox v2.1.5 fancyapps.com | fancyapps.com/fancybox/#license */
(function (r, G, f, v) {
    var J = f("html"), n = f(r), p = f(G), b = f.fancybox = function () {
        b.open.apply(this, arguments)
    }, I = navigator.userAgent.match(/msie/i), B = null, s = G.createTouch !== v, t = function (a) {
        return a && a.hasOwnProperty && a instanceof f
    }, q = function (a) {
        return a && "string" === f.type(a)
    }, E = function (a) {
        return q(a) && 0 < a.indexOf("%")
    }, l = function (a, d) {
        var e = parseInt(a, 10) || 0;
        d && E(a) && (e *= b.getViewport()[d] / 100);
        return Math.ceil(e)
    }, w = function (a, b) {
        return l(a, b) + "px"
    };
    f.extend(b, {
        version: "2.1.5",
        defaults: {
            padding: 15,
            margin: 20,
            width: 800,
            height: 600,
            minWidth: 100,
            minHeight: 100,
            maxWidth: 9999,
            maxHeight: 9999,
            pixelRatio: 1,
            autoSize: !0,
            autoHeight: !1,
            autoWidth: !1,
            autoResize: !0,
            autoCenter: !s,
            fitToView: !0,
            aspectRatio: !1,
            topRatio: 0.5,
            leftRatio: 0.5,
            scrolling: "auto",
            wrapCSS: "",
            arrows: !0,
            closeBtn: !0,
            closeClick: !1,
            nextClick: !1,
            mouseWheel: !0,
            autoPlay: !1,
            playSpeed: 3E3,
            preload: 3,
            modal: !1,
            loop: !0,
            ajax: {dataType: "html", headers: {"X-fancyBox": !0}},
            iframe: {scrolling: "auto", preload: !0},
            swf: {wmode: "transparent", allowfullscreen: "true", allowscriptaccess: "always"},
            keys: {
                next: {13: "left", 34: "up", 39: "left", 40: "up"},
                prev: {8: "right", 33: "down", 37: "right", 38: "down"},
                close: [27],
                play: [32],
                toggle: [70]
            },
            direction: {next: "left", prev: "right"},
            scrollOutside: !0,
            index: 0,
            type: null,
            href: null,
            content: null,
            title: null,
            tpl: {
                wrap: '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
                image: '<img class="fancybox-image" src="{href}" alt="" />',
                iframe: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' +
                (I ? ' allowtransparency="true"' : "") + "></iframe>",
                error: '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
                closeBtn: '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',
                next: '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
                prev: '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
            },
            openEffect: "fade",
            openSpeed: 250,
            openEasing: "swing",
            openOpacity: !0,
            openMethod: "zoomIn",
            closeEffect: "fade",
            closeSpeed: 250,
            closeEasing: "swing",
            closeOpacity: !0,
            closeMethod: "zoomOut",
            nextEffect: "elastic",
            nextSpeed: 250,
            nextEasing: "swing",
            nextMethod: "changeIn",
            prevEffect: "elastic",
            prevSpeed: 250,
            prevEasing: "swing",
            prevMethod: "changeOut",
            helpers: {overlay: !0, title: !0},
            onCancel: f.noop,
            beforeLoad: f.noop,
            afterLoad: f.noop,
            beforeShow: f.noop,
            afterShow: f.noop,
            beforeChange: f.noop,
            beforeClose: f.noop,
            afterClose: f.noop
        },
        group: {},
        opts: {},
        previous: null,
        coming: null,
        current: null,
        isActive: !1,
        isOpen: !1,
        isOpened: !1,
        wrap: null,
        skin: null,
        outer: null,
        inner: null,
        player: {timer: null, isActive: !1},
        ajaxLoad: null,
        imgPreload: null,
        transitions: {},
        helpers: {},
        open: function (a, d) {
            if (a && (f.isPlainObject(d) || (d = {}), !1 !== b.close(!0)))return f.isArray(a) || (a = t(a) ? f(a).get() : [a]), f.each(a, function (e, c) {
                var k = {}, g, h, j, m, l;
                "object" === f.type(c) && (c.nodeType && (c = f(c)), t(c) ? (k = {
                    href: c.data("fancybox-href") || c.attr("href"),
                    title: c.data("fancybox-title") || c.attr("title"),
                    isDom: !0,
                    element: c
                }, f.metadata && f.extend(!0, k,
                    c.metadata())) : k = c);
                g = d.href || k.href || (q(c) ? c : null);
                h = d.title !== v ? d.title : k.title || "";
                m = (j = d.content || k.content) ? "html" : d.type || k.type;
                !m && k.isDom && (m = c.data("fancybox-type"), m || (m = (m = c.prop("class").match(/fancybox\.(\w+)/)) ? m[1] : null));
                q(g) && (m || (b.isImage(g) ? m = "image" : b.isSWF(g) ? m = "swf" : "#" === g.charAt(0) ? m = "inline" : q(c) && (m = "html", j = c)), "ajax" === m && (l = g.split(/\s+/, 2), g = l.shift(), l = l.shift()));
                j || ("inline" === m ? g ? j = f(q(g) ? g.replace(/.*(?=#[^\s]+$)/, "") : g) : k.isDom && (j = c) : "html" === m ? j = g : !m && (!g &&
                k.isDom) && (m = "inline", j = c));
                f.extend(k, {href: g, type: m, content: j, title: h, selector: l});
                a[e] = k
            }), b.opts = f.extend(!0, {}, b.defaults, d), d.keys !== v && (b.opts.keys = d.keys ? f.extend({}, b.defaults.keys, d.keys) : !1), b.group = a, b._start(b.opts.index)
        },
        cancel: function () {
            var a = b.coming;
            a && !1 !== b.trigger("onCancel") && (b.hideLoading(), b.ajaxLoad && b.ajaxLoad.abort(), b.ajaxLoad = null, b.imgPreload && (b.imgPreload.onload = b.imgPreload.onerror = null), a.wrap && a.wrap.stop(!0, !0).trigger("onReset").remove(), b.coming = null, b.current ||
            b._afterZoomOut(a))
        },
        close: function (a) {
            b.cancel();
            !1 !== b.trigger("beforeClose") && (b.unbindEvents(), b.isActive && (!b.isOpen || !0 === a ? (f(".fancybox-wrap").stop(!0).trigger("onReset").remove(), b._afterZoomOut()) : (b.isOpen = b.isOpened = !1, b.isClosing = !0, f(".fancybox-item, .fancybox-nav").remove(), b.wrap.stop(!0, !0).removeClass("fancybox-opened"), b.transitions[b.current.closeMethod]())))
        },
        play: function (a) {
            var d = function () {
                clearTimeout(b.player.timer)
            }, e = function () {
                d();
                b.current && b.player.isActive && (b.player.timer =
                    setTimeout(b.next, b.current.playSpeed))
            }, c = function () {
                d();
                p.unbind(".player");
                b.player.isActive = !1;
                b.trigger("onPlayEnd")
            };
            if (!0 === a || !b.player.isActive && !1 !== a) {
                if (b.current && (b.current.loop || b.current.index < b.group.length - 1))b.player.isActive = !0, p.bind({
                    "onCancel.player beforeClose.player": c,
                    "onUpdate.player": e,
                    "beforeLoad.player": d
                }), e(), b.trigger("onPlayStart")
            } else c()
        },
        next: function (a) {
            var d = b.current;
            d && (q(a) || (a = d.direction.next), b.jumpto(d.index + 1, a, "next"))
        },
        prev: function (a) {
            var d = b.current;
            d && (q(a) || (a = d.direction.prev), b.jumpto(d.index - 1, a, "prev"))
        },
        jumpto: function (a, d, e) {
            var c = b.current;
            c && (a = l(a), b.direction = d || c.direction[a >= c.index ? "next" : "prev"], b.router = e || "jumpto", c.loop && (0 > a && (a = c.group.length + a % c.group.length), a %= c.group.length), c.group[a] !== v && (b.cancel(), b._start(a)))
        },
        reposition: function (a, d) {
            var e = b.current, c = e ? e.wrap : null, k;
            c && (k = b._getPosition(d), a && "scroll" === a.type ? (delete k.position, c.stop(!0, !0).animate(k, 200)) : (c.css(k), e.pos = f.extend({}, e.dim, k)))
        },
        update: function (a) {
            var d =
                a && a.type, e = !d || "orientationchange" === d;
            e && (clearTimeout(B), B = null);
            b.isOpen && !B && (B = setTimeout(function () {
                var c = b.current;
                c && !b.isClosing && (b.wrap.removeClass("fancybox-tmp"), (e || "load" === d || "resize" === d && c.autoResize) && b._setDimension(), "scroll" === d && c.canShrink || b.reposition(a), b.trigger("onUpdate"), B = null)
            }, e && !s ? 0 : 300))
        },
        toggle: function (a) {
            b.isOpen && (b.current.fitToView = "boolean" === f.type(a) ? a : !b.current.fitToView, s && (b.wrap.removeAttr("style").addClass("fancybox-tmp"), b.trigger("onUpdate")),
                b.update())
        },
        hideLoading: function () {
            p.unbind(".loading");
            f("#fancybox-loading").remove()
        },
        showLoading: function () {
            var a, d;
            b.hideLoading();
            a = f('<div id="fancybox-loading"><div></div></div>').click(b.cancel).appendTo("body");
            p.bind("keydown.loading", function (a) {
                if (27 === (a.which || a.keyCode))a.preventDefault(), b.cancel()
            });
            b.defaults.fixed || (d = b.getViewport(), a.css({
                position: "absolute",
                top: 0.5 * d.h + d.y,
                left: 0.5 * d.w + d.x
            }))
        },
        getViewport: function () {
            var a = b.current && b.current.locked || !1, d = {
                x: n.scrollLeft(),
                y: n.scrollTop()
            };
            a ? (d.w = a[0].clientWidth, d.h = a[0].clientHeight) : (d.w = s && r.innerWidth ? r.innerWidth : n.width(), d.h = s && r.innerHeight ? r.innerHeight : n.height());
            return d
        },
        unbindEvents: function () {
            b.wrap && t(b.wrap) && b.wrap.unbind(".fb");
            p.unbind(".fb");
            n.unbind(".fb")
        },
        bindEvents: function () {
            var a = b.current, d;
            a && (n.bind("orientationchange.fb" + (s ? "" : " resize.fb") + (a.autoCenter && !a.locked ? " scroll.fb" : ""), b.update), (d = a.keys) && p.bind("keydown.fb", function (e) {
                var c = e.which || e.keyCode, k = e.target || e.srcElement;
                if (27 === c && b.coming)return !1;
                !e.ctrlKey && (!e.altKey && !e.shiftKey && !e.metaKey && (!k || !k.type && !f(k).is("[contenteditable]"))) && f.each(d, function (d, k) {
                    if (1 < a.group.length && k[c] !== v)return b[d](k[c]), e.preventDefault(), !1;
                    if (-1 < f.inArray(c, k))return b[d](), e.preventDefault(), !1
                })
            }), f.fn.mousewheel && a.mouseWheel && b.wrap.bind("mousewheel.fb", function (d, c, k, g) {
                for (var h = f(d.target || null), j = !1; h.length && !j && !h.is(".fancybox-skin") && !h.is(".fancybox-wrap");)j = h[0] && !(h[0].style.overflow && "hidden" === h[0].style.overflow) &&
                (h[0].clientWidth && h[0].scrollWidth > h[0].clientWidth || h[0].clientHeight && h[0].scrollHeight > h[0].clientHeight), h = f(h).parent();
                if (0 !== c && !j && 1 < b.group.length && !a.canShrink) {
                    if (0 < g || 0 < k)b.prev(0 < g ? "down" : "left"); else if (0 > g || 0 > k)b.next(0 > g ? "up" : "right");
                    d.preventDefault()
                }
            }))
        },
        trigger: function (a, d) {
            var e, c = d || b.coming || b.current;
            if (c) {
                f.isFunction(c[a]) && (e = c[a].apply(c, Array.prototype.slice.call(arguments, 1)));
                if (!1 === e)return !1;
                c.helpers && f.each(c.helpers, function (d, e) {
                    if (e && b.helpers[d] && f.isFunction(b.helpers[d][a]))b.helpers[d][a](f.extend(!0,
                        {}, b.helpers[d].defaults, e), c)
                });
                p.trigger(a)
            }
        },
        isImage: function (a) {
            return q(a) && a.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i)
        },
        isSWF: function (a) {
            return q(a) && a.match(/\.(swf)((\?|#).*)?$/i)
        },
        _start: function (a) {
            var d = {}, e, c;
            a = l(a);
            e = b.group[a] || null;
            if (!e)return !1;
            d = f.extend(!0, {}, b.opts, e);
            e = d.margin;
            c = d.padding;
            "number" === f.type(e) && (d.margin = [e, e, e, e]);
            "number" === f.type(c) && (d.padding = [c, c, c, c]);
            d.modal && f.extend(!0, d, {
                closeBtn: !1, closeClick: !1, nextClick: !1, arrows: !1,
                mouseWheel: !1, keys: null, helpers: {overlay: {closeClick: !1}}
            });
            d.autoSize && (d.autoWidth = d.autoHeight = !0);
            "auto" === d.width && (d.autoWidth = !0);
            "auto" === d.height && (d.autoHeight = !0);
            d.group = b.group;
            d.index = a;
            b.coming = d;
            if (!1 === b.trigger("beforeLoad"))b.coming = null; else {
                c = d.type;
                e = d.href;
                if (!c)return b.coming = null, b.current && b.router && "jumpto" !== b.router ? (b.current.index = a, b[b.router](b.direction)) : !1;
                b.isActive = !0;
                if ("image" === c || "swf" === c)d.autoHeight = d.autoWidth = !1, d.scrolling = "visible";
                "image" === c && (d.aspectRatio = !0);
                "iframe" === c && s && (d.scrolling = "scroll");
                d.wrap = f(d.tpl.wrap).addClass("fancybox-" + (s ? "mobile" : "desktop") + " fancybox-type-" + c + " fancybox-tmp " + d.wrapCSS).appendTo(d.parent || "body");
                f.extend(d, {
                    skin: f(".fancybox-skin", d.wrap),
                    outer: f(".fancybox-outer", d.wrap),
                    inner: f(".fancybox-inner", d.wrap)
                });
                f.each(["Top", "Right", "Bottom", "Left"], function (a, b) {
                    d.skin.css("padding" + b, w(d.padding[a]))
                });
                b.trigger("onReady");
                if ("inline" === c || "html" === c) {
                    if (!d.content || !d.content.length)return b._error("content")
                } else if (!e)return b._error("href");
                "image" === c ? b._loadImage() : "ajax" === c ? b._loadAjax() : "iframe" === c ? b._loadIframe() : b._afterLoad()
            }
        },
        _error: function (a) {
            f.extend(b.coming, {
                type: "html",
                autoWidth: !0,
                autoHeight: !0,
                minWidth: 0,
                minHeight: 0,
                scrolling: "no",
                hasError: a,
                content: b.coming.tpl.error
            });
            b._afterLoad()
        },
        _loadImage: function () {
            var a = b.imgPreload = new Image;
            a.onload = function () {
                this.onload = this.onerror = null;
                b.coming.width = this.width / b.opts.pixelRatio;
                b.coming.height = this.height / b.opts.pixelRatio;
                b._afterLoad()
            };
            a.onerror = function () {
                this.onload =
                    this.onerror = null;
                b._error("image")
            };
            a.src = b.coming.href;
            !0 !== a.complete && b.showLoading()
        },
        _loadAjax: function () {
            var a = b.coming;
            b.showLoading();
            b.ajaxLoad = f.ajax(f.extend({}, a.ajax, {
                url: a.href, error: function (a, e) {
                    b.coming && "abort" !== e ? b._error("ajax", a) : b.hideLoading()
                }, success: function (d, e) {
                    "success" === e && (a.content = d, b._afterLoad())
                }
            }))
        },
        _loadIframe: function () {
            var a = b.coming, d = f(a.tpl.iframe.replace(/\{rnd\}/g, (new Date).getTime())).attr("scrolling", s ? "auto" : a.iframe.scrolling).attr("src", a.href);
            f(a.wrap).bind("onReset", function () {
                try {
                    f(this).find("iframe").hide().attr("src", "//about:blank").end().empty()
                } catch (a) {
                }
            });
            a.iframe.preload && (b.showLoading(), d.one("load", function () {
                f(this).data("ready", 1);
                s || f(this).bind("load.fb", b.update);
                f(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show();
                b._afterLoad()
            }));
            a.content = d.appendTo(a.inner);
            a.iframe.preload || b._afterLoad()
        },
        _preloadImages: function () {
            var a = b.group, d = b.current, e = a.length, c = d.preload ? Math.min(d.preload,
                e - 1) : 0, f, g;
            for (g = 1; g <= c; g += 1)f = a[(d.index + g) % e], "image" === f.type && f.href && ((new Image).src = f.href)
        },
        _afterLoad: function () {
            var a = b.coming, d = b.current, e, c, k, g, h;
            b.hideLoading();
            if (a && !1 !== b.isActive)if (!1 === b.trigger("afterLoad", a, d))a.wrap.stop(!0).trigger("onReset").remove(), b.coming = null; else {
                d && (b.trigger("beforeChange", d), d.wrap.stop(!0).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove());
                b.unbindEvents();
                e = a.content;
                c = a.type;
                k = a.scrolling;
                f.extend(b, {
                    wrap: a.wrap, skin: a.skin,
                    outer: a.outer, inner: a.inner, current: a, previous: d
                });
                g = a.href;
                switch (c) {
                    case "inline":
                    case "ajax":
                    case "html":
                        a.selector ? e = f("<div>").html(e).find(a.selector) : t(e) && (e.data("fancybox-placeholder") || e.data("fancybox-placeholder", f('<div class="fancybox-placeholder"></div>').insertAfter(e).hide()), e = e.show().detach(), a.wrap.bind("onReset", function () {
                            f(this).find(e).length && e.hide().replaceAll(e.data("fancybox-placeholder")).data("fancybox-placeholder", !1)
                        }));
                        break;
                    case "image":
                        e = a.tpl.image.replace("{href}",
                            g);
                        break;
                    case "swf":
                        e = '<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' + g + '"></param>', h = "", f.each(a.swf, function (a, b) {
                            e += '<param name="' + a + '" value="' + b + '"></param>';
                            h += " " + a + '="' + b + '"'
                        }), e += '<embed src="' + g + '" type="application/x-shockwave-flash" width="100%" height="100%"' + h + "></embed></object>"
                }
                (!t(e) || !e.parent().is(a.inner)) && a.inner.append(e);
                b.trigger("beforeShow");
                a.inner.css("overflow", "yes" === k ? "scroll" :
                    "no" === k ? "hidden" : k);
                b._setDimension();
                b.reposition();
                b.isOpen = !1;
                b.coming = null;
                b.bindEvents();
                if (b.isOpened) {
                    if (d.prevMethod)b.transitions[d.prevMethod]()
                } else f(".fancybox-wrap").not(a.wrap).stop(!0).trigger("onReset").remove();
                b.transitions[b.isOpened ? a.nextMethod : a.openMethod]();
                b._preloadImages()
            }
        },
        _setDimension: function () {
            var a = b.getViewport(), d = 0, e = !1, c = !1, e = b.wrap, k = b.skin, g = b.inner, h = b.current, c = h.width, j = h.height, m = h.minWidth, u = h.minHeight, n = h.maxWidth, p = h.maxHeight, s = h.scrolling, q = h.scrollOutside ?
                h.scrollbarWidth : 0, x = h.margin, y = l(x[1] + x[3]), r = l(x[0] + x[2]), v, z, t, C, A, F, B, D, H;
            e.add(k).add(g).width("auto").height("auto").removeClass("fancybox-tmp");
            x = l(k.outerWidth(!0) - k.width());
            v = l(k.outerHeight(!0) - k.height());
            z = y + x;
            t = r + v;
            C = E(c) ? (a.w - z) * l(c) / 100 : c;
            A = E(j) ? (a.h - t) * l(j) / 100 : j;
            if ("iframe" === h.type) {
                if (H = h.content, h.autoHeight && 1 === H.data("ready"))try {
                    H[0].contentWindow.document.location && (g.width(C).height(9999), F = H.contents().find("body"), q && F.css("overflow-x", "hidden"), A = F.outerHeight(!0))
                } catch (G) {
                }
            } else if (h.autoWidth ||
                h.autoHeight)g.addClass("fancybox-tmp"), h.autoWidth || g.width(C), h.autoHeight || g.height(A), h.autoWidth && (C = g.width()), h.autoHeight && (A = g.height()), g.removeClass("fancybox-tmp");
            c = l(C);
            j = l(A);
            D = C / A;
            m = l(E(m) ? l(m, "w") - z : m);
            n = l(E(n) ? l(n, "w") - z : n);
            u = l(E(u) ? l(u, "h") - t : u);
            p = l(E(p) ? l(p, "h") - t : p);
            F = n;
            B = p;
            h.fitToView && (n = Math.min(a.w - z, n), p = Math.min(a.h - t, p));
            z = a.w - y;
            r = a.h - r;
            h.aspectRatio ? (c > n && (c = n, j = l(c / D)), j > p && (j = p, c = l(j * D)), c < m && (c = m, j = l(c / D)), j < u && (j = u, c = l(j * D))) : (c = Math.max(m, Math.min(c, n)), h.autoHeight &&
            "iframe" !== h.type && (g.width(c), j = g.height()), j = Math.max(u, Math.min(j, p)));
            if (h.fitToView)if (g.width(c).height(j), e.width(c + x), a = e.width(), y = e.height(), h.aspectRatio)for (; (a > z || y > r) && (c > m && j > u) && !(19 < d++);)j = Math.max(u, Math.min(p, j - 10)), c = l(j * D), c < m && (c = m, j = l(c / D)), c > n && (c = n, j = l(c / D)), g.width(c).height(j), e.width(c + x), a = e.width(), y = e.height(); else c = Math.max(m, Math.min(c, c - (a - z))), j = Math.max(u, Math.min(j, j - (y - r)));
            q && ("auto" === s && j < A && c + x + q < z) && (c += q);
            g.width(c).height(j);
            e.width(c + x);
            a = e.width();
            y = e.height();
            e = (a > z || y > r) && c > m && j > u;
            c = h.aspectRatio ? c < F && j < B && c < C && j < A : (c < F || j < B) && (c < C || j < A);
            f.extend(h, {
                dim: {width: w(a), height: w(y)},
                origWidth: C,
                origHeight: A,
                canShrink: e,
                canExpand: c,
                wPadding: x,
                hPadding: v,
                wrapSpace: y - k.outerHeight(!0),
                skinSpace: k.height() - j
            });
            !H && (h.autoHeight && j > u && j < p && !c) && g.height("auto")
        },
        _getPosition: function (a) {
            var d = b.current, e = b.getViewport(), c = d.margin, f = b.wrap.width() + c[1] + c[3], g = b.wrap.height() + c[0] + c[2], c = {
                position: "absolute",
                top: c[0],
                left: c[3]
            };
            d.autoCenter && d.fixed && !a && g <= e.h && f <= e.w ? c.position = "fixed" : d.locked || (c.top += e.y, c.left += e.x);
            c.top = w(Math.max(c.top, c.top + (e.h - g) * d.topRatio));
            c.left = w(Math.max(c.left, c.left + (e.w - f) * d.leftRatio));
            return c
        },
        _afterZoomIn: function () {
            var a = b.current;
            a && (b.isOpen = b.isOpened = !0, b.wrap.css("overflow", "visible").addClass("fancybox-opened"), b.update(), (a.closeClick || a.nextClick && 1 < b.group.length) && b.inner.css("cursor", "pointer").bind("click.fb", function (d) {
                !f(d.target).is("a") && !f(d.target).parent().is("a") && (d.preventDefault(),
                    b[a.closeClick ? "close" : "next"]())
            }), a.closeBtn && f(a.tpl.closeBtn).appendTo(b.skin).bind("click.fb", function (a) {
                a.preventDefault();
                b.close()
            }), a.arrows && 1 < b.group.length && ((a.loop || 0 < a.index) && f(a.tpl.prev).appendTo(b.outer).bind("click.fb", b.prev), (a.loop || a.index < b.group.length - 1) && f(a.tpl.next).appendTo(b.outer).bind("click.fb", b.next)), b.trigger("afterShow"), !a.loop && a.index === a.group.length - 1 ? b.play(!1) : b.opts.autoPlay && !b.player.isActive && (b.opts.autoPlay = !1, b.play()))
        },
        _afterZoomOut: function (a) {
            a =
                a || b.current;
            f(".fancybox-wrap").trigger("onReset").remove();
            f.extend(b, {
                group: {},
                opts: {},
                router: !1,
                current: null,
                isActive: !1,
                isOpened: !1,
                isOpen: !1,
                isClosing: !1,
                wrap: null,
                skin: null,
                outer: null,
                inner: null
            });
            b.trigger("afterClose", a)
        }
    });
    b.transitions = {
        getOrigPosition: function () {
            var a = b.current, d = a.element, e = a.orig, c = {}, f = 50, g = 50, h = a.hPadding, j = a.wPadding, m = b.getViewport();
            !e && (a.isDom && d.is(":visible")) && (e = d.find("img:first"), e.length || (e = d));
            t(e) ? (c = e.offset(), e.is("img") && (f = e.outerWidth(), g = e.outerHeight())) :
                (c.top = m.y + (m.h - g) * a.topRatio, c.left = m.x + (m.w - f) * a.leftRatio);
            if ("fixed" === b.wrap.css("position") || a.locked)c.top -= m.y, c.left -= m.x;
            return c = {
                top: w(c.top - h * a.topRatio),
                left: w(c.left - j * a.leftRatio),
                width: w(f + j),
                height: w(g + h)
            }
        }, step: function (a, d) {
            var e, c, f = d.prop;
            c = b.current;
            var g = c.wrapSpace, h = c.skinSpace;
            if ("width" === f || "height" === f)e = d.end === d.start ? 1 : (a - d.start) / (d.end - d.start), b.isClosing && (e = 1 - e), c = "width" === f ? c.wPadding : c.hPadding, c = a - c, b.skin[f](l("width" === f ? c : c - g * e)), b.inner[f](l("width" ===
            f ? c : c - g * e - h * e))
        }, zoomIn: function () {
            var a = b.current, d = a.pos, e = a.openEffect, c = "elastic" === e, k = f.extend({opacity: 1}, d);
            delete k.position;
            c ? (d = this.getOrigPosition(), a.openOpacity && (d.opacity = 0.1)) : "fade" === e && (d.opacity = 0.1);
            b.wrap.css(d).animate(k, {
                duration: "none" === e ? 0 : a.openSpeed,
                easing: a.openEasing,
                step: c ? this.step : null,
                complete: b._afterZoomIn
            })
        }, zoomOut: function () {
            var a = b.current, d = a.closeEffect, e = "elastic" === d, c = {opacity: 0.1};
            e && (c = this.getOrigPosition(), a.closeOpacity && (c.opacity = 0.1));
            b.wrap.animate(c,
                {
                    duration: "none" === d ? 0 : a.closeSpeed,
                    easing: a.closeEasing,
                    step: e ? this.step : null,
                    complete: b._afterZoomOut
                })
        }, changeIn: function () {
            var a = b.current, d = a.nextEffect, e = a.pos, c = {opacity: 1}, f = b.direction, g;
            e.opacity = 0.1;
            "elastic" === d && (g = "down" === f || "up" === f ? "top" : "left", "down" === f || "right" === f ? (e[g] = w(l(e[g]) - 200), c[g] = "+=200px") : (e[g] = w(l(e[g]) + 200), c[g] = "-=200px"));
            "none" === d ? b._afterZoomIn() : b.wrap.css(e).animate(c, {
                duration: a.nextSpeed,
                easing: a.nextEasing,
                complete: b._afterZoomIn
            })
        }, changeOut: function () {
            var a =
                b.previous, d = a.prevEffect, e = {opacity: 0.1}, c = b.direction;
            "elastic" === d && (e["down" === c || "up" === c ? "top" : "left"] = ("up" === c || "left" === c ? "-" : "+") + "=200px");
            a.wrap.animate(e, {
                duration: "none" === d ? 0 : a.prevSpeed, easing: a.prevEasing, complete: function () {
                    f(this).trigger("onReset").remove()
                }
            })
        }
    };
    b.helpers.overlay = {
        defaults: {closeClick: !0, speedOut: 200, showEarly: !0, css: {}, locked: !s, fixed: !0},
        overlay: null,
        fixed: !1,
        el: f("html"),
        create: function (a) {
            a = f.extend({}, this.defaults, a);
            this.overlay && this.close();
            this.overlay =
                f('<div class="fancybox-overlay"></div>').appendTo(b.coming ? b.coming.parent : a.parent);
            this.fixed = !1;
            a.fixed && b.defaults.fixed && (this.overlay.addClass("fancybox-overlay-fixed"), this.fixed = !0)
        },
        open: function (a) {
            var d = this;
            a = f.extend({}, this.defaults, a);
            this.overlay ? this.overlay.unbind(".overlay").width("auto").height("auto") : this.create(a);
            this.fixed || (n.bind("resize.overlay", f.proxy(this.update, this)), this.update());
            a.closeClick && this.overlay.bind("click.overlay", function (a) {
                if (f(a.target).hasClass("fancybox-overlay"))return b.isActive ?
                    b.close() : d.close(), !1
            });
            this.overlay.css(a.css).show()
        },
        close: function () {
            var a, b;
            n.unbind("resize.overlay");
            this.el.hasClass("fancybox-lock") && (f(".fancybox-margin").removeClass("fancybox-margin"), a = n.scrollTop(), b = n.scrollLeft(), this.el.removeClass("fancybox-lock"), n.scrollTop(a).scrollLeft(b));
            f(".fancybox-overlay").remove().hide();
            f.extend(this, {overlay: null, fixed: !1})
        },
        update: function () {
            var a = "100%", b;
            this.overlay.width(a).height("100%");
            I ? (b = Math.max(G.documentElement.offsetWidth, G.body.offsetWidth),
            p.width() > b && (a = p.width())) : p.width() > n.width() && (a = p.width());
            this.overlay.width(a).height(p.height())
        },
        onReady: function (a, b) {
            var e = this.overlay;
            f(".fancybox-overlay").stop(!0, !0);
            e || this.create(a);
            a.locked && (this.fixed && b.fixed) && (e || (this.margin = p.height() > n.height() ? f("html").css("margin-right").replace("px", "") : !1), b.locked = this.overlay.append(b.wrap), b.fixed = !1);
            !0 === a.showEarly && this.beforeShow.apply(this, arguments)
        },
        beforeShow: function (a, b) {
            var e, c;
            b.locked && (!1 !== this.margin && (f("*").filter(function () {
                return "fixed" ===
                    f(this).css("position") && !f(this).hasClass("fancybox-overlay") && !f(this).hasClass("fancybox-wrap")
            }).addClass("fancybox-margin"), this.el.addClass("fancybox-margin")), e = n.scrollTop(), c = n.scrollLeft(), this.el.addClass("fancybox-lock"), n.scrollTop(e).scrollLeft(c));
            this.open(a)
        },
        onUpdate: function () {
            this.fixed || this.update()
        },
        afterClose: function (a) {
            this.overlay && !b.coming && this.overlay.fadeOut(a.speedOut, f.proxy(this.close, this))
        }
    };
    b.helpers.title = {
        defaults: {type: "float", position: "bottom"}, beforeShow: function (a) {
            var d =
                b.current, e = d.title, c = a.type;
            f.isFunction(e) && (e = e.call(d.element, d));
            if (q(e) && "" !== f.trim(e)) {
                d = f('<div class="fancybox-title fancybox-title-' + c + '-wrap">' + e + "</div>");
                switch (c) {
                    case "inside":
                        c = b.skin;
                        break;
                    case "outside":
                        c = b.wrap;
                        break;
                    case "over":
                        c = b.inner;
                        break;
                    default:
                        c = b.skin, d.appendTo("body"), I && d.width(d.width()), d.wrapInner('<span class="child"></span>'), b.current.margin[2] += Math.abs(l(d.css("margin-bottom")))
                }
                d["top" === a.position ? "prependTo" : "appendTo"](c)
            }
        }
    };
    f.fn.fancybox = function (a) {
        var d,
            e = f(this), c = this.selector || "", k = function (g) {
                var h = f(this).blur(), j = d, k, l;
                !g.ctrlKey && (!g.altKey && !g.shiftKey && !g.metaKey) && !h.is(".fancybox-wrap") && (k = a.groupAttr || "data-fancybox-group", l = h.attr(k), l || (k = "rel", l = h.get(0)[k]), l && ("" !== l && "nofollow" !== l) && (h = c.length ? f(c) : e, h = h.filter("[" + k + '="' + l + '"]'), j = h.index(this)), a.index = j, !1 !== b.open(h, a) && g.preventDefault())
            };
        a = a || {};
        d = a.index || 0;
        !c || !1 === a.live ? e.unbind("click.fb-start").bind("click.fb-start", k) : p.undelegate(c, "click.fb-start").delegate(c +
        ":not('.fancybox-item, .fancybox-nav')", "click.fb-start", k);
        this.filter("[data-fancybox-start=1]").trigger("click");
        return this
    };
    p.ready(function () {
        var a, d;
        f.scrollbarWidth === v && (f.scrollbarWidth = function () {
            var a = f('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"), b = a.children(), b = b.innerWidth() - b.height(99).innerWidth();
            a.remove();
            return b
        });
        if (f.support.fixedPosition === v) {
            a = f.support;
            d = f('<div style="position:fixed;top:20px;"></div>').appendTo("body");
            var e = 20 ===
                d[0].offsetTop || 15 === d[0].offsetTop;
            d.remove();
            a.fixedPosition = e
        }
        f.extend(b.defaults, {scrollbarWidth: f.scrollbarWidth(), fixed: f.support.fixedPosition, parent: f("body")});
        a = f(r).width();
        J.addClass("fancybox-lock-test");
        d = f(r).width();
        J.removeClass("fancybox-lock-test");
        f("<style type='text/css'>.fancybox-margin{margin-right:" + (d - a) + "px;}</style>").appendTo("head")
    })
})(window, document, jQuery);
;
/*
 * Pause jQuery plugin v0.1
 *
 * Copyright 2010 by Tobia Conforto <tobia.conforto@gmail.com>
 *
 * Based on Pause-resume-animation jQuery plugin by Joe Weitzel
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 2 of the License, or(at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along with
 * this program; if not, write to the Free Software Foundation, Inc., 51
 * Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
 */

(function () {
    var e = jQuery, f = "jQuery.pause", d = 1, b = e.fn.animate, a = {};

    function c() {
        return new Date().getTime()
    }

    e.fn.animate = function (k, h, j, i) {
        var g = e.speed(h, j, i);
        g.complete = g.old;
        return this.each(function () {
            if (!this[f]) {
                this[f] = d++
            }
            var l = e.extend({}, g);
            b.apply(e(this), [k, e.extend({}, l)]);
            a[this[f]] = {run: true, prop: k, opt: l, start: c(), done: 0}
        })
    };
    e.fn.pause = function () {
        return this.each(function () {
            if (!this[f]) {
                this[f] = d++
            }
            var g = a[this[f]];
            if (g && g.run) {
                g.done += c() - g.start;
                if (g.done > g.opt.duration) {
                    delete a[this[f]]
                } else {
                    e(this).stop();
                    g.run = false
                }
            }
        })
    };
    e.fn.resume = function () {
        return this.each(function () {
            if (!this[f]) {
                this[f] = d++
            }
            var g = a[this[f]];
            if (g && !g.run) {
                g.opt.duration -= g.done;
                g.done = 0;
                g.run = true;
                g.start = c();
                b.apply(e(this), [g.prop, e.extend({}, g.opt)])
            }
        })
    }
})();


/*!
 * imagesLoaded PACKAGED v3.1.4
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

(function () {
    function e() {
    }

    function t(e, t) {
        for (var n = e.length; n--;)if (e[n].listener === t)return n;
        return -1
    }

    function n(e) {
        return function () {
            return this[e].apply(this, arguments)
        }
    }

    var i = e.prototype, r = this, o = r.EventEmitter;
    i.getListeners = function (e) {
        var t, n, i = this._getEvents();
        if ("object" == typeof e) {
            t = {};
            for (n in i)i.hasOwnProperty(n) && e.test(n) && (t[n] = i[n])
        } else t = i[e] || (i[e] = []);
        return t
    }, i.flattenListeners = function (e) {
        var t, n = [];
        for (t = 0; e.length > t; t += 1)n.push(e[t].listener);
        return n
    }, i.getListenersAsObject = function (e) {
        var t, n = this.getListeners(e);
        return n instanceof Array && (t = {}, t[e] = n), t || n
    }, i.addListener = function (e, n) {
        var i, r = this.getListenersAsObject(e), o = "object" == typeof n;
        for (i in r)r.hasOwnProperty(i) && -1 === t(r[i], n) && r[i].push(o ? n : {listener: n, once: !1});
        return this
    }, i.on = n("addListener"), i.addOnceListener = function (e, t) {
        return this.addListener(e, {listener: t, once: !0})
    }, i.once = n("addOnceListener"), i.defineEvent = function (e) {
        return this.getListeners(e), this
    }, i.defineEvents = function (e) {
        for (var t = 0; e.length > t; t += 1)this.defineEvent(e[t]);
        return this
    }, i.removeListener = function (e, n) {
        var i, r, o = this.getListenersAsObject(e);
        for (r in o)o.hasOwnProperty(r) && (i = t(o[r], n), -1 !== i && o[r].splice(i, 1));
        return this
    }, i.off = n("removeListener"), i.addListeners = function (e, t) {
        return this.manipulateListeners(!1, e, t)
    }, i.removeListeners = function (e, t) {
        return this.manipulateListeners(!0, e, t)
    }, i.manipulateListeners = function (e, t, n) {
        var i, r, o = e ? this.removeListener : this.addListener, s = e ? this.removeListeners : this.addListeners;
        if ("object" != typeof t || t instanceof RegExp)for (i = n.length; i--;)o.call(this, t, n[i]); else for (i in t)t.hasOwnProperty(i) && (r = t[i]) && ("function" == typeof r ? o.call(this, i, r) : s.call(this, i, r));
        return this
    }, i.removeEvent = function (e) {
        var t, n = typeof e, i = this._getEvents();
        if ("string" === n)delete i[e]; else if ("object" === n)for (t in i)i.hasOwnProperty(t) && e.test(t) && delete i[t]; else delete this._events;
        return this
    }, i.removeAllListeners = n("removeEvent"), i.emitEvent = function (e, t) {
        var n, i, r, o, s = this.getListenersAsObject(e);
        for (r in s)if (s.hasOwnProperty(r))for (i = s[r].length; i--;)n = s[r][i], n.once === !0 && this.removeListener(e, n.listener), o = n.listener.apply(this, t || []), o === this._getOnceReturnValue() && this.removeListener(e, n.listener);
        return this
    }, i.trigger = n("emitEvent"), i.emit = function (e) {
        var t = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(e, t)
    }, i.setOnceReturnValue = function (e) {
        return this._onceReturnValue = e, this
    }, i._getOnceReturnValue = function () {
        return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
    }, i._getEvents = function () {
        return this._events || (this._events = {})
    }, e.noConflict = function () {
        return r.EventEmitter = o, e
    }, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function () {
        return e
    }) : "object" == typeof module && module.exports ? module.exports = e : this.EventEmitter = e
}).call(this), function (e) {
    function t(t) {
        var n = e.event;
        return n.target = n.target || n.srcElement || t, n
    }

    var n = document.documentElement, i = function () {
    };
    n.addEventListener ? i = function (e, t, n) {
        e.addEventListener(t, n, !1)
    } : n.attachEvent && (i = function (e, n, i) {
        e[n + i] = i.handleEvent ? function () {
            var n = t(e);
            i.handleEvent.call(i, n)
        } : function () {
            var n = t(e);
            i.call(e, n)
        }, e.attachEvent("on" + n, e[n + i])
    });
    var r = function () {
    };
    n.removeEventListener ? r = function (e, t, n) {
        e.removeEventListener(t, n, !1)
    } : n.detachEvent && (r = function (e, t, n) {
        e.detachEvent("on" + t, e[t + n]);
        try {
            delete e[t + n]
        } catch (i) {
            e[t + n] = void 0
        }
    });
    var o = {bind: i, unbind: r};
    "function" == typeof define && define.amd ? define("eventie/eventie", o) : e.eventie = o
}(this), function (e, t) {
    "function" == typeof define && define.amd ? define(["eventEmitter/EventEmitter", "eventie/eventie"], function (n, i) {
        return t(e, n, i)
    }) : "object" == typeof exports ? module.exports = t(e, require("eventEmitter"), require("eventie")) : e.imagesLoaded = t(e, e.EventEmitter, e.eventie)
}(this, function (e, t, n) {
    function i(e, t) {
        for (var n in t)e[n] = t[n];
        return e
    }

    function r(e) {
        return "[object Array]" === d.call(e)
    }

    function o(e) {
        var t = [];
        if (r(e))t = e; else if ("number" == typeof e.length)for (var n = 0, i = e.length; i > n; n++)t.push(e[n]); else t.push(e);
        return t
    }

    function s(e, t, n) {
        if (!(this instanceof s))return new s(e, t);
        "string" == typeof e && (e = document.querySelectorAll(e)), this.elements = o(e), this.options = i({}, this.options), "function" == typeof t ? n = t : i(this.options, t), n && this.on("always", n), this.getImages(), a && (this.jqDeferred = new a.Deferred);
        var r = this;
        setTimeout(function () {
            r.check()
        })
    }

    function c(e) {
        this.img = e
    }

    function f(e) {
        this.src = e, v[e] = this
    }

    var a = e.jQuery, u = e.console, h = u !== void 0, d = Object.prototype.toString;
    s.prototype = new t, s.prototype.options = {}, s.prototype.getImages = function () {
        this.images = [];
        for (var e = 0, t = this.elements.length; t > e; e++) {
            var n = this.elements[e];
            "IMG" === n.nodeName && this.addImage(n);
            for (var i = n.querySelectorAll("img"), r = 0, o = i.length; o > r; r++) {
                var s = i[r];
                this.addImage(s)
            }
        }
    }, s.prototype.addImage = function (e) {
        var t = new c(e);
        this.images.push(t)
    }, s.prototype.check = function () {
        function e(e, r) {
            return t.options.debug && h && u.log("confirm", e, r), t.progress(e), n++, n === i && t.complete(), !0
        }

        var t = this, n = 0, i = this.images.length;
        if (this.hasAnyBroken = !1, !i)return this.complete(), void 0;
        for (var r = 0; i > r; r++) {
            var o = this.images[r];
            o.on("confirm", e), o.check()
        }
    }, s.prototype.progress = function (e) {
        this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded;
        var t = this;
        setTimeout(function () {
            t.emit("progress", t, e), t.jqDeferred && t.jqDeferred.notify && t.jqDeferred.notify(t, e)
        })
    }, s.prototype.complete = function () {
        var e = this.hasAnyBroken ? "fail" : "done";
        this.isComplete = !0;
        var t = this;
        setTimeout(function () {
            if (t.emit(e, t), t.emit("always", t), t.jqDeferred) {
                var n = t.hasAnyBroken ? "reject" : "resolve";
                t.jqDeferred[n](t)
            }
        })
    }, a && (a.fn.imagesLoaded = function (e, t) {
        var n = new s(this, e, t);
        return n.jqDeferred.promise(a(this))
    }), c.prototype = new t, c.prototype.check = function () {
        var e = v[this.img.src] || new f(this.img.src);
        if (e.isConfirmed)return this.confirm(e.isLoaded, "cached was confirmed"), void 0;
        if (this.img.complete && void 0 !== this.img.naturalWidth)return this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), void 0;
        var t = this;
        e.on("confirm", function (e, n) {
            return t.confirm(e.isLoaded, n), !0
        }), e.check()
    }, c.prototype.confirm = function (e, t) {
        this.isLoaded = e, this.emit("confirm", this, t)
    };
    var v = {};
    return f.prototype = new t, f.prototype.check = function () {
        if (!this.isChecked) {
            var e = new Image;
            n.bind(e, "load", this), n.bind(e, "error", this), e.src = this.src, this.isChecked = !0
        }
    }, f.prototype.handleEvent = function (e) {
        var t = "on" + e.type;
        this[t] && this[t](e)
    }, f.prototype.onload = function (e) {
        this.confirm(!0, "onload"), this.unbindProxyEvents(e)
    }, f.prototype.onerror = function (e) {
        this.confirm(!1, "onerror"), this.unbindProxyEvents(e)
    }, f.prototype.confirm = function (e, t) {
        this.isConfirmed = !0, this.isLoaded = e, this.emit("confirm", this, t)
    }, f.prototype.unbindProxyEvents = function (e) {
        n.unbind(e.target, "load", this), n.unbind(e.target, "error", this)
    }, s
});

/*
 * jQuery.styledSelect - <select> replacement plugin
 * https://github.com/rubenbristian/styled-select/tree/master
 * Copyright (c) 2013 Ruben Bristian
 * version 1.0
 * forked from http://wellstyled.com/en/javascript-styleselect-jquery-plugin/
 */

jQuery.fn.styledSelect = function (c) {
    var b = {
        coverClass: "select-replace-cover",
        innerClass: "select-replace",
        adjustPosition: {top: 0, left: 0},
        selectOpacity: 0
    };
    c && jQuery.extend(b, c);
    return this.each(function () {
        var a = jQuery(this);
        a.wrap("<span></span>");
        a.after("<span></span>");
        var c = a.next(), d = a.parent();
        a.css({
            opacity: b.selectOpacity,
            visibility: "visible",
            position: "absolute",
            top: 0,
            left: 0,
            display: "inline",
            "z-index": 1
        });
        d.addClass(b.coverClass).css({
            display: "inline-block",
            position: "relative",
            top: b.adjustPosition.top,
            left: b.adjustPosition.left,
            "z-index": 0,
            "vertical-align": "middle",
            "text-align": "left"
        });
        c.addClass(b.innerClass).css({display: "block", "white-space": "nowrap"});
        a.bind("change", function () {
            jQuery(this).next().text(this.options[this.selectedIndex].text)
        });
        c.text(a.children("option").eq(a.context.selectedIndex).text());
        d.width(a.width() + "px")
    })
};

/*!
 * jQuery Cookie Plugin v1.4.0
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */

(function (c) {
    "function" === typeof define && define.amd ? define(["jquery"], c) : c(jQuery)
})(function (c) {
    function n(b) {
        b = f.json ? JSON.stringify(b) : String(b);
        return f.raw ? b : encodeURIComponent(b)
    }

    function m(b, e) {
        var a;
        if (f.raw)a = b; else a:{
            var d = b;
            0 === d.indexOf('"') && (d = d.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
            try {
                d = decodeURIComponent(d.replace(l, " "));
                a = f.json ? JSON.parse(d) : d;
                break a
            } catch (g) {
            }
            a = void 0
        }
        return c.isFunction(e) ? e(a) : a
    }

    var l = /\+/g, f = c.cookie = function (b, e, a) {
        if (void 0 !== e && !c.isFunction(e)) {
            a = c.extend({}, f.defaults, a);
            if ("number" === typeof a.expires) {
                var d = a.expires, g = a.expires = new Date;
                g.setDate(g.getDate() + d)
            }
            return document.cookie = [f.raw ? b : encodeURIComponent(b), "=", n(e), a.expires ? "; expires=" + a.expires.toUTCString() : "", a.path ? "; path=" + a.path : "", a.domain ? "; domain=" + a.domain : "", a.secure ? "; secure" : ""].join("")
        }
        a = b ? void 0 : {};
        for (var d = document.cookie ? document.cookie.split("; ") : [], g = 0, l = d.length; g < l; g++) {
            var h = d[g].split("="), k;
            k = h.shift();
            k = f.raw ? k : decodeURIComponent(k);
            h = h.join("=");
            if (b && b === k) {
                a = m(h, e);
                break
            }
            b || void 0 === (h = m(h)) || (a[k] = h)
        }
        return a
    };
    f.defaults = {};
    c.removeCookie = function (b, e) {
        if (void 0 === c.cookie(b))return !1;
        c.cookie(b, "", c.extend({}, e, {expires: -1}));
        return !c.cookie(b)
    }
});

/*!
 * Progress Circle
 * https://github.com/qiao/ProgressCircle.js
 *
 * Copyright 2011-2013 Xueqiao Xu
 * Released under the MIT license
 */

!function (window, document, undefined) {
    var absPos = function (element) {
        var offsetLeft, offsetTop;
        offsetLeft = offsetTop = 0;
        if (element.offsetParent) {
            do {
                offsetLeft += element.offsetLeft;
                offsetTop += element.offsetTop
            } while (element = element.offsetParent)
        }
        return [offsetLeft, offsetTop]
    };
    var ProgressCircle = function (params) {
        this.canvas = params.canvas;
        this.minRadius = params.minRadius || 15;
        this.arcWidth = params.arcWidth || 5;
        this.gapWidth = params.gapWidth || 3;
        this.centerX = params.centerX || this.canvas.width / 2;
        this.centerY = params.centerY || this.canvas.height / 2;
        this.infoLineLength = params.infoLineLength || 60;
        this.horizLineLength = params.horizLineLength || 10;
        this.infoLineAngleInterval = params.infoLineAngleInterval || Math.PI / 8;
        this.infoLineBaseAngle = params.infoLineBaseAngle || Math.PI / 6;
        this.context = this.canvas.getContext("2d");
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.circles = [];
        this.runningCount = 0
    };
    ProgressCircle.prototype = {
        constructor: ProgressCircle, addEntry: function (params) {
            this.circles.push(new Circle({
                canvas: this.canvas,
                context: this.context,
                centerX: this.centerX,
                centerY: this.centerY,
                innerRadius: this.minRadius + this.circles.length * (this.gapWidth + this.arcWidth),
                arcWidth: this.arcWidth,
                infoLineLength: this.infoLineLength,
                horizLineLength: this.horizLineLength,
                id: this.circles.length,
                fillColor: params.fillColor,
                outlineColor: params.outlineColor,
                progressListener: params.progressListener,
                infoListener: params.infoListener,
                infoLineAngle: this.infoLineBaseAngle + this.circles.length * this.infoLineAngleInterval
            }));
            return this
        }, start: function (interval) {
            var self = this;
            this.timer = setInterval(function () {
                self._update()
            }, interval || 33);
            return this
        }, stop: function () {
            clearTimeout(this.timer)
        }, _update: function () {
            this._clear();
            this.circles.forEach(function (circle, idx, array) {
                circle.update()
            });
            return this
        }, _clear: function () {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            return this
        }
    };
    var Circle = function (params) {
        this.id = params.id;
        this.canvas = params.canvas;
        this.context = params.context;
        this.centerX = params.centerX;
        this.centerY = params.centerY;
        this.arcWidth = params.arcWidth;
        this.innerRadius = params.innerRadius || 0;
        this.fillColor = params.fillColor || "#fff";
        this.outlineColor = params.outlineColor || this.fillColor;
        this.progressListener = params.progressListener;
        this.infoLineLength = params.infoLineLength || 250;
        this.horizLineLength = params.horizLineLength || 50;
        this.infoListener = params.infoListener;
        this.infoLineAngle = params.infoLineAngle;
        this.outerRadius = this.innerRadius + this.arcWidth;
        if (!this.infoListener)return;
        var angle = this.infoLineAngle, arcDistance = (this.innerRadius + this.outerRadius) / 2, sinA = Math.sin(angle), cosA = Math.cos(angle);
        this.infoLineStartX = this.centerX + sinA * arcDistance;
        this.infoLineStartY = this.centerY - cosA * arcDistance;
        this.infoLineMidX = this.centerX + sinA * this.infoLineLength;
        this.infoLineMidY = this.centerY - cosA * this.infoLineLength;
        this.infoLineEndX = this.infoLineMidX + (sinA < 0 ? -this.horizLineLength : this.horizLineLength);
        this.infoLineEndY = this.infoLineMidY;
        var infoText = document.createElement("div"), style = infoText.style;
        style.color = this.fillColor;
        style.position = "absolute";
        style.left = this.infoLineEndX + absPos(this.canvas)[0] + "px";
        infoText.className = "ProgressCircleInfo";
        infoText.id = "progress_circle_info_" + this.id;
        document.body.appendChild(infoText);
        this.infoText = infoText
    };
    Circle.prototype = {
        constructor: Circle, update: function () {
            this.progress = this.progressListener();
            this._draw();
            if (this.infoListener) {
                this.info = this.infoListener();
                this._drawInfo()
            }
        }, _draw: function () {
            var ctx = this.context, ANGLE_OFFSET = -Math.PI / 2, startAngle = 0 + ANGLE_OFFSET, endAngle = startAngle + this.progress * Math.PI * 2, x = this.centerX, y = this.centerY, innerRadius = this.innerRadius, outerRadius = this.outerRadius;
            ctx.fillStyle = this.fillColor;
            ctx.strokeStyle = this.outlineColor;
            ctx.beginPath();
            ctx.arc(x, y, innerRadius, startAngle, endAngle, false);
            ctx.arc(x, y, outerRadius, endAngle, startAngle, true);
            ctx.closePath();
            ctx.stroke();
            ctx.fill();
            return this
        }, _drawInfo: function () {
            var pointList, lineHeight;
            pointList = [[this.infoLineStartX, this.infoLineStartY], [this.infoLineMidX, this.infoLineMidY], [this.infoLineEndX, this.infoLineEndY]];
            this._drawSegments(pointList, false);
            this.infoText.innerHTML = this.info;
            lineHeight = this.infoText.offsetHeight;
            this.infoText.style.top = this.infoLineEndY + absPos(this.canvas)[1] - lineHeight / 2 + "px";
            return this
        }, _drawSegments: function (pointList, close) {
            var ctx = this.context;
            ctx.beginPath();
            ctx.moveTo(pointList[0][0], pointList[0][1]);
            for (var i = 1; i < pointList.length; ++i) {
                ctx.lineTo(pointList[i][0], pointList[i][1])
            }
            if (close) {
                ctx.closePath()
            }
            ctx.stroke()
        }
    };
    window.ProgressCircle = ProgressCircle
}(window, document);


/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright Â© 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */

// t: current time, b: begInnIng value, c: change In value, d: duration

jQuery.easing.jswing = jQuery.easing.swing;
jQuery.extend(jQuery.easing, {
    def: "easeOutQuad", swing: function (e, a, c, b, d) {
        return jQuery.easing[jQuery.easing.def](e, a, c, b, d)
    }, easeInQuad: function (e, a, c, b, d) {
        return b * (a /= d) * a + c
    }, easeOutQuad: function (e, a, c, b, d) {
        return -b * (a /= d) * (a - 2) + c
    }, easeInOutQuad: function (e, a, c, b, d) {
        return 1 > (a /= d / 2) ? b / 2 * a * a + c : -b / 2 * (--a * (a - 2) - 1) + c
    }, easeInCubic: function (e, a, c, b, d) {
        return b * (a /= d) * a * a + c
    }, easeOutCubic: function (e, a, c, b, d) {
        return b * ((a = a / d - 1) * a * a + 1) + c
    }, easeInOutCubic: function (e, a, c, b, d) {
        return 1 > (a /= d / 2) ? b / 2 * a * a * a + c : b / 2 * ((a -= 2) * a * a + 2) + c
    }, easeInQuart: function (e, a, c, b, d) {
        return b * (a /= d) * a * a * a + c
    }, easeOutQuart: function (e, a, c, b, d) {
        return -b * ((a = a / d - 1) * a * a * a - 1) + c
    }, easeInOutQuart: function (e, a, c, b, d) {
        return 1 > (a /= d / 2) ? b / 2 * a * a * a * a + c : -b / 2 * ((a -= 2) * a * a * a - 2) + c
    }, easeInQuint: function (e, a, c, b, d) {
        return b * (a /= d) * a * a * a * a + c
    }, easeOutQuint: function (e, a, c, b, d) {
        return b * ((a = a / d - 1) * a * a * a * a + 1) + c
    }, easeInOutQuint: function (e, a, c, b, d) {
        return 1 > (a /= d / 2) ? b / 2 * a * a * a * a * a + c : b / 2 * ((a -= 2) * a * a * a * a + 2) + c
    }, easeInSine: function (e, a, c, b, d) {
        return -b * Math.cos(a / d * (Math.PI / 2)) + b + c
    }, easeOutSine: function (e, a, c, b, d) {
        return b * Math.sin(a / d * (Math.PI / 2)) + c
    }, easeInOutSine: function (e, a, c, b, d) {
        return -b / 2 * (Math.cos(Math.PI * a / d) - 1) + c
    }, easeInExpo: function (e, a, c, b, d) {
        return 0 == a ? c : b * Math.pow(2, 10 * (a / d - 1)) + c
    }, easeOutExpo: function (e, a, c, b, d) {
        return a == d ? c + b : b * (-Math.pow(2, -10 * a / d) + 1) + c
    }, easeInOutExpo: function (e, a, c, b, d) {
        return 0 == a ? c : a == d ? c + b : 1 > (a /= d / 2) ? b / 2 * Math.pow(2, 10 * (a - 1)) + c : b / 2 * (-Math.pow(2, -10 * --a) + 2) + c
    }, easeInCirc: function (e, a, c, b, d) {
        return -b * (Math.sqrt(1 - (a /= d) * a) - 1) + c
    }, easeOutCirc: function (e, a, c, b, d) {
        return b * Math.sqrt(1 - (a = a / d - 1) * a) + c
    }, easeInOutCirc: function (e, a, c, b, d) {
        return 1 > (a /= d / 2) ? -b / 2 * (Math.sqrt(1 - a * a) - 1) + c : b / 2 * (Math.sqrt(1 - (a -= 2) * a) + 1) + c
    }, easeInElastic: function (e, a, c, b, d) {
        e = 1.70158;
        var f = 0, g = b;
        if (0 == a)return c;
        if (1 == (a /= d))return c + b;
        f || (f = .3 * d);
        g < Math.abs(b) ? (g = b, e = f / 4) : e = f / (2 * Math.PI) * Math.asin(b / g);
        return -(g * Math.pow(2, 10 * (a -= 1)) * Math.sin(2 * (a * d - e) * Math.PI / f)) + c
    }, easeOutElastic: function (e, a, c, b, d) {
        e = 1.70158;
        var f = 0, g = b;
        if (0 == a)return c;
        if (1 == (a /= d))return c + b;
        f || (f = .3 * d);
        g < Math.abs(b) ? (g = b, e = f / 4) : e = f / (2 * Math.PI) * Math.asin(b / g);
        return g * Math.pow(2, -10 * a) * Math.sin(2 * (a * d - e) * Math.PI / f) + b + c
    }, easeInOutElastic: function (e, a, c, b, d) {
        e = 1.70158;
        var f = 0, g = b;
        if (0 == a)return c;
        if (2 == (a /= d / 2))return c + b;
        f || (f = .3 * d * 1.5);
        g < Math.abs(b) ? (g = b, e = f / 4) : e = f / (2 * Math.PI) * Math.asin(b / g);
        return 1 > a ? -.5 * g * Math.pow(2, 10 * (a -= 1)) * Math.sin(2 * (a * d - e) * Math.PI / f) + c : g * Math.pow(2, -10 * (a -= 1)) * Math.sin(2 * (a * d - e) * Math.PI / f) * .5 + b + c
    }, easeInBack: function (e, a, c, b, d, f) {
        void 0 == f && (f = 1.70158);
        return b * (a /= d) * a * ((f + 1) * a - f) + c
    }, easeOutBack: function (e, a, c, b, d, f) {
        void 0 == f && (f = 1.70158);
        return b * ((a = a / d - 1) * a * ((f + 1) * a + f) + 1) + c
    }, easeInOutBack: function (e, a, c, b, d, f) {
        void 0 == f && (f = 1.70158);
        return 1 > (a /= d / 2) ? b / 2 * a * a * (((f *= 1.525) + 1) * a - f) + c : b / 2 * ((a -= 2) * a * (((f *= 1.525) + 1) * a + f) + 2) + c
    }, easeInBounce: function (e, a, c, b, d) {
        return b - jQuery.easing.easeOutBounce(e, d - a, 0, b, d) + c
    }, easeOutBounce: function (e, a, c, b, d) {
        return (a /= d) < 1 / 2.75 ? 7.5625 * b * a * a + c : a < 2 / 2.75 ? b * (7.5625 * (a -= 1.5 / 2.75) * a + .75) + c : a < 2.5 / 2.75 ? b * (7.5625 * (a -= 2.25 / 2.75) * a + .9375) + c : b * (7.5625 * (a -= 2.625 / 2.75) * a + .984375) + c
    }, easeInOutBounce: function (e, a, c, b, d) {
        return a < d / 2 ? .5 * jQuery.easing.easeInBounce(e, 2 * a, 0, b, d) + c : .5 * jQuery.easing.easeOutBounce(e, 2 * a - d, 0, b, d) + .5 * b + c
    }
});

/*! jQuery Color v@2.1.2 http://github.com/jquery/jquery-color | jquery.org/license */

(function (a, b) {
    function m(a, b, c) {
        var d = h[b.type] || {};
        return a == null ? c || !b.def ? null : b.def : (a = d.floor ? ~~a : parseFloat(a), isNaN(a) ? b.def : d.mod ? (a + d.mod) % d.mod : 0 > a ? 0 : d.max < a ? d.max : a)
    }

    function n(b) {
        var c = f(), d = c._rgba = [];
        return b = b.toLowerCase(), l(e, function (a, e) {
            var f, h = e.re.exec(b), i = h && e.parse(h), j = e.space || "rgba";
            if (i)return f = c[j](i), c[g[j].cache] = f[g[j].cache], d = c._rgba = f._rgba, !1
        }), d.length ? (d.join() === "0,0,0,0" && a.extend(d, k.transparent), c) : k[b]
    }

    function o(a, b, c) {
        return c = (c + 1) % 1, c * 6 < 1 ? a + (b - a) * c * 6 : c * 2 < 1 ? b : c * 3 < 2 ? a + (b - a) * (2 / 3 - c) * 6 : a
    }

    var c = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor", d = /^([\-+])=\s*(\d+\.?\d*)/, e = [{
        re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
        parse: function (a) {
            return [a[1], a[2], a[3], a[4]]
        }
    }, {
        re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
        parse: function (a) {
            return [a[1] * 2.55, a[2] * 2.55, a[3] * 2.55, a[4]]
        }
    }, {
        re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/, parse: function (a) {
            return [parseInt(a[1], 16), parseInt(a[2], 16), parseInt(a[3], 16)]
        }
    }, {
        re: /#([a-f0-9])([a-f0-9])([a-f0-9])/, parse: function (a) {
            return [parseInt(a[1] + a[1], 16), parseInt(a[2] + a[2], 16), parseInt(a[3] + a[3], 16)]
        }
    }, {
        re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
        space: "hsla",
        parse: function (a) {
            return [a[1], a[2] / 100, a[3] / 100, a[4]]
        }
    }], f = a.Color = function (b, c, d, e) {
        return new a.Color.fn.parse(b, c, d, e)
    }, g = {
        rgba: {props: {red: {idx: 0, type: "byte"}, green: {idx: 1, type: "byte"}, blue: {idx: 2, type: "byte"}}},
        hsla: {
            props: {
                hue: {idx: 0, type: "degrees"},
                saturation: {idx: 1, type: "percent"},
                lightness: {idx: 2, type: "percent"}
            }
        }
    }, h = {
        "byte": {floor: !0, max: 255},
        percent: {max: 1},
        degrees: {mod: 360, floor: !0}
    }, i = f.support = {}, j = a("<p>")[0], k, l = a.each;
    j.style.cssText = "background-color:rgba(1,1,1,.5)", i.rgba = j.style.backgroundColor.indexOf("rgba") > -1, l(g, function (a, b) {
        b.cache = "_" + a, b.props.alpha = {idx: 3, type: "percent", def: 1}
    }), f.fn = a.extend(f.prototype, {
        parse: function (c, d, e, h) {
            if (c === b)return this._rgba = [null, null, null, null], this;
            if (c.jquery || c.nodeType)c = a(c).css(d), d = b;
            var i = this, j = a.type(c), o = this._rgba = [];
            d !== b && (c = [c, d, e, h], j = "array");
            if (j === "string")return this.parse(n(c) || k._default);
            if (j === "array")return l(g.rgba.props, function (a, b) {
                o[b.idx] = m(c[b.idx], b)
            }), this;
            if (j === "object")return c instanceof f ? l(g, function (a, b) {
                c[b.cache] && (i[b.cache] = c[b.cache].slice())
            }) : l(g, function (b, d) {
                var e = d.cache;
                l(d.props, function (a, b) {
                    if (!i[e] && d.to) {
                        if (a === "alpha" || c[a] == null)return;
                        i[e] = d.to(i._rgba)
                    }
                    i[e][b.idx] = m(c[a], b, !0)
                }), i[e] && a.inArray(null, i[e].slice(0, 3)) < 0 && (i[e][3] = 1, d.from && (i._rgba = d.from(i[e])))
            }), this
        }, is: function (a) {
            var b = f(a), c = !0, d = this;
            return l(g, function (a, e) {
                var f, g = b[e.cache];
                return g && (f = d[e.cache] || e.to && e.to(d._rgba) || [], l(e.props, function (a, b) {
                    if (g[b.idx] != null)return c = g[b.idx] === f[b.idx], c
                })), c
            }), c
        }, _space: function () {
            var a = [], b = this;
            return l(g, function (c, d) {
                b[d.cache] && a.push(c)
            }), a.pop()
        }, transition: function (a, b) {
            var c = f(a), d = c._space(), e = g[d], i = this.alpha() === 0 ? f("transparent") : this, j = i[e.cache] || e.to(i._rgba), k = j.slice();
            return c = c[e.cache], l(e.props, function (a, d) {
                var e = d.idx, f = j[e], g = c[e], i = h[d.type] || {};
                if (g === null)return;
                f === null ? k[e] = g : (i.mod && (g - f > i.mod / 2 ? f += i.mod : f - g > i.mod / 2 && (f -= i.mod)), k[e] = m((g - f) * b + f, d))
            }), this[d](k)
        }, blend: function (b) {
            if (this._rgba[3] === 1)return this;
            var c = this._rgba.slice(), d = c.pop(), e = f(b)._rgba;
            return f(a.map(c, function (a, b) {
                return (1 - d) * e[b] + d * a
            }))
        }, toRgbaString: function () {
            var b = "rgba(", c = a.map(this._rgba, function (a, b) {
                return a == null ? b > 2 ? 1 : 0 : a
            });
            return c[3] === 1 && (c.pop(), b = "rgb("), b + c.join() + ")"
        }, toHslaString: function () {
            var b = "hsla(", c = a.map(this.hsla(), function (a, b) {
                return a == null && (a = b > 2 ? 1 : 0), b && b < 3 && (a = Math.round(a * 100) + "%"), a
            });
            return c[3] === 1 && (c.pop(), b = "hsl("), b + c.join() + ")"
        }, toHexString: function (b) {
            var c = this._rgba.slice(), d = c.pop();
            return b && c.push(~~(d * 255)), "#" + a.map(c, function (a) {
                return a = (a || 0).toString(16), a.length === 1 ? "0" + a : a
            }).join("")
        }, toString: function () {
            return this._rgba[3] === 0 ? "transparent" : this.toRgbaString()
        }
    }), f.fn.parse.prototype = f.fn, g.hsla.to = function (a) {
        if (a[0] == null || a[1] == null || a[2] == null)return [null, null, null, a[3]];
        var b = a[0] / 255, c = a[1] / 255, d = a[2] / 255, e = a[3], f = Math.max(b, c, d), g = Math.min(b, c, d), h = f - g, i = f + g, j = i * .5, k, l;
        return g === f ? k = 0 : b === f ? k = 60 * (c - d) / h + 360 : c === f ? k = 60 * (d - b) / h + 120 : k = 60 * (b - c) / h + 240, h === 0 ? l = 0 : j <= .5 ? l = h / i : l = h / (2 - i), [Math.round(k) % 360, l, j, e == null ? 1 : e]
    }, g.hsla.from = function (a) {
        if (a[0] == null || a[1] == null || a[2] == null)return [null, null, null, a[3]];
        var b = a[0] / 360, c = a[1], d = a[2], e = a[3], f = d <= .5 ? d * (1 + c) : d + c - d * c, g = 2 * d - f;
        return [Math.round(o(g, f, b + 1 / 3) * 255), Math.round(o(g, f, b) * 255), Math.round(o(g, f, b - 1 / 3) * 255), e]
    }, l(g, function (c, e) {
        var g = e.props, h = e.cache, i = e.to, j = e.from;
        f.fn[c] = function (c) {
            i && !this[h] && (this[h] = i(this._rgba));
            if (c === b)return this[h].slice();
            var d, e = a.type(c), k = e === "array" || e === "object" ? c : arguments, n = this[h].slice();
            return l(g, function (a, b) {
                var c = k[e === "object" ? a : b.idx];
                c == null && (c = n[b.idx]), n[b.idx] = m(c, b)
            }), j ? (d = f(j(n)), d[h] = n, d) : f(n)
        }, l(g, function (b, e) {
            if (f.fn[b])return;
            f.fn[b] = function (f) {
                var g = a.type(f), h = b === "alpha" ? this._hsla ? "hsla" : "rgba" : c, i = this[h](), j = i[e.idx], k;
                return g === "undefined" ? j : (g === "function" && (f = f.call(this, j), g = a.type(f)), f == null && e.empty ? this : (g === "string" && (k = d.exec(f), k && (f = j + parseFloat(k[2]) * (k[1] === "+" ? 1 : -1))), i[e.idx] = f, this[h](i)))
            }
        })
    }), f.hook = function (b) {
        var c = b.split(" ");
        l(c, function (b, c) {
            a.cssHooks[c] = {
                set: function (b, d) {
                    var e, g, h = "";
                    if (d !== "transparent" && (a.type(d) !== "string" || (e = n(d)))) {
                        d = f(e || d);
                        if (!i.rgba && d._rgba[3] !== 1) {
                            g = c === "backgroundColor" ? b.parentNode : b;
                            while ((h === "" || h === "transparent") && g && g.style)try {
                                h = a.css(g, "backgroundColor"), g = g.parentNode
                            } catch (j) {
                            }
                            d = d.blend(h && h !== "transparent" ? h : "_default")
                        }
                        d = d.toRgbaString()
                    }
                    try {
                        b.style[c] = d
                    } catch (j) {
                    }
                }
            }, a.fx.step[c] = function (b) {
                b.colorInit || (b.start = f(b.elem, c), b.end = f(b.end), b.colorInit = !0), a.cssHooks[c].set(b.elem, b.start.transition(b.end, b.pos))
            }
        })
    }, f.hook(c), a.cssHooks.borderColor = {
        expand: function (a) {
            var b = {};
            return l(["Top", "Right", "Bottom", "Left"], function (c, d) {
                b["border" + d + "Color"] = a
            }), b
        }
    }, k = a.Color.names = {
        aqua: "#00ffff",
        black: "#000000",
        blue: "#0000ff",
        fuchsia: "#ff00ff",
        gray: "#808080",
        green: "#008000",
        lime: "#00ff00",
        maroon: "#800000",
        navy: "#000080",
        olive: "#808000",
        purple: "#800080",
        red: "#ff0000",
        silver: "#c0c0c0",
        teal: "#008080",
        white: "#ffffff",
        yellow: "#ffff00",
        transparent: [null, null, null, 0],
        _default: "#ffffff"
    }
})(jQuery);