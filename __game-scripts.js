!function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e((t = "undefined" != typeof globalThis ? globalThis : t || self).TWEEN = {})
}(this, (function(t) {
    "use strict";
    var e, n = {
        Linear: {
            None: function(t) {
                return t
            }
        },
        Quadratic: {
            In: function(t) {
                return t * t
            },
            Out: function(t) {
                return t * (2 - t)
            },
            InOut: function(t) {
                return (t *= 2) < 1 ? .5 * t * t : -.5 * (--t * (t - 2) - 1)
            }
        },
        Cubic: {
            In: function(t) {
                return t * t * t
            },
            Out: function(t) {
                return --t * t * t + 1
            },
            InOut: function(t) {
                return (t *= 2) < 1 ? .5 * t * t * t : .5 * ((t -= 2) * t * t + 2)
            }
        },
        Quartic: {
            In: function(t) {
                return t * t * t * t
            },
            Out: function(t) {
                return 1 - --t * t * t * t
            },
            InOut: function(t) {
                return (t *= 2) < 1 ? .5 * t * t * t * t : -.5 * ((t -= 2) * t * t * t - 2)
            }
        },
        Quintic: {
            In: function(t) {
                return t * t * t * t * t
            },
            Out: function(t) {
                return --t * t * t * t * t + 1
            },
            InOut: function(t) {
                return (t *= 2) < 1 ? .5 * t * t * t * t * t : .5 * ((t -= 2) * t * t * t * t + 2)
            }
        },
        Sinusoidal: {
            In: function(t) {
                return 1 - Math.cos(t * Math.PI / 2)
            },
            Out: function(t) {
                return Math.sin(t * Math.PI / 2)
            },
            InOut: function(t) {
                return .5 * (1 - Math.cos(Math.PI * t))
            }
        },
        Exponential: {
            In: function(t) {
                return 0 === t ? 0 : Math.pow(1024, t - 1)
            },
            Out: function(t) {
                return 1 === t ? 1 : 1 - Math.pow(2, -10 * t)
            },
            InOut: function(t) {
                return 0 === t ? 0 : 1 === t ? 1 : (t *= 2) < 1 ? .5 * Math.pow(1024, t - 1) : .5 * (2 - Math.pow(2, -10 * (t - 1)))
            }
        },
        Circular: {
            In: function(t) {
                return 1 - Math.sqrt(1 - t * t)
            },
            Out: function(t) {
                return Math.sqrt(1 - --t * t)
            },
            InOut: function(t) {
                return (t *= 2) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
            }
        },
        Elastic: {
            In: function(t) {
                return 0 === t ? 0 : 1 === t ? 1 : -Math.pow(2, 10 * (t - 1)) * Math.sin(5 * (t - 1.1) * Math.PI)
            },
            Out: function(t) {
                return 0 === t ? 0 : 1 === t ? 1 : Math.pow(2, -10 * t) * Math.sin(5 * (t - .1) * Math.PI) + 1
            },
            InOut: function(t) {
                return 0 === t ? 0 : 1 === t ? 1 : (t *= 2) < 1 ? -.5 * Math.pow(2, 10 * (t - 1)) * Math.sin(5 * (t - 1.1) * Math.PI) : .5 * Math.pow(2, -10 * (t - 1)) * Math.sin(5 * (t - 1.1) * Math.PI) + 1
            }
        },
        Back: {
            In: function(t) {
                var e = 1.70158;
                return t * t * ((e + 1) * t - e)
            },
            Out: function(t) {
                var e = 1.70158;
                return --t * t * ((e + 1) * t + e) + 1
            },
            InOut: function(t) {
                var e = 2.5949095;
                return (t *= 2) < 1 ? t * t * ((e + 1) * t - e) * .5 : .5 * ((t -= 2) * t * ((e + 1) * t + e) + 2)
            }
        },
        Bounce: {
            In: function(t) {
                return 1 - n.Bounce.Out(1 - t)
            },
            Out: function(t) {
                return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
            },
            InOut: function(t) {
                return t < .5 ? .5 * n.Bounce.In(2 * t) : .5 * n.Bounce.Out(2 * t - 1) + .5
            }
        }
    }, i = "undefined" == typeof self && "undefined" != typeof process && process.hrtime ? function() {
        var t = process.hrtime();
        return 1e3 * t[0] + t[1] / 1e6
    }
    : "undefined" != typeof self && void 0 !== self.performance && void 0 !== self.performance.now ? self.performance.now.bind(self.performance) : void 0 !== Date.now ? Date.now : function() {
        return (new Date).getTime()
    }
    , r = function() {
        function Group() {
            this._tweens = {},
            this._tweensAddedDuringUpdate = {}
        }
        return Group.prototype.getAll = function() {
            var t = this;
            return Object.keys(this._tweens).map((function(e) {
                return t._tweens[e]
            }
            ))
        }
        ,
        Group.prototype.removeAll = function() {
            this._tweens = {}
        }
        ,
        Group.prototype.add = function(t) {
            this._tweens[t.getId()] = t,
            this._tweensAddedDuringUpdate[t.getId()] = t
        }
        ,
        Group.prototype.remove = function(t) {
            delete this._tweens[t.getId()],
            delete this._tweensAddedDuringUpdate[t.getId()]
        }
        ,
        Group.prototype.update = function(t, e) {
            void 0 === t && (t = i()),
            void 0 === e && (e = !1);
            var n = Object.keys(this._tweens);
            if (0 === n.length)
                return !1;
            for (; n.length > 0; ) {
                this._tweensAddedDuringUpdate = {};
                for (var r = 0; r < n.length; r++) {
                    var s = this._tweens[n[r]]
                      , o = !e;
                    s && !1 === s.update(t, o) && !e && delete this._tweens[n[r]]
                }
                n = Object.keys(this._tweensAddedDuringUpdate)
            }
            return !0
        }
        ,
        Group
    }(), s = {
        Linear: function(t, e) {
            var n = t.length - 1
              , i = n * e
              , r = Math.floor(i)
              , o = s.Utils.Linear;
            return e < 0 ? o(t[0], t[1], i) : e > 1 ? o(t[n], t[n - 1], n - i) : o(t[r], t[r + 1 > n ? n : r + 1], i - r)
        },
        Bezier: function(t, e) {
            for (var n = 0, i = t.length - 1, r = Math.pow, o = s.Utils.Bernstein, a = 0; a <= i; a++)
                n += r(1 - e, i - a) * r(e, a) * t[a] * o(i, a);
            return n
        },
        CatmullRom: function(t, e) {
            var n = t.length - 1
              , i = n * e
              , r = Math.floor(i)
              , o = s.Utils.CatmullRom;
            return t[0] === t[n] ? (e < 0 && (r = Math.floor(i = n * (1 + e))),
            o(t[(r - 1 + n) % n], t[r], t[(r + 1) % n], t[(r + 2) % n], i - r)) : e < 0 ? t[0] - (o(t[0], t[0], t[1], t[1], -i) - t[0]) : e > 1 ? t[n] - (o(t[n], t[n], t[n - 1], t[n - 1], i - n) - t[n]) : o(t[r ? r - 1 : 0], t[r], t[n < r + 1 ? n : r + 1], t[n < r + 2 ? n : r + 2], i - r)
        },
        Utils: {
            Linear: function(t, e, n) {
                return (e - t) * n + t
            },
            Bernstein: function(t, e) {
                var n = s.Utils.Factorial;
                return n(t) / n(e) / n(t - e)
            },
            Factorial: (e = [1],
            function(t) {
                var n = 1;
                if (e[t])
                    return e[t];
                for (var i = t; i > 1; i--)
                    n *= i;
                return e[t] = n,
                n
            }
            ),
            CatmullRom: function(t, e, n, i, r) {
                var s = .5 * (n - t)
                  , o = .5 * (i - e)
                  , a = r * r;
                return (2 * e - 2 * n + s + o) * (r * a) + (-3 * e + 3 * n - 2 * s - o) * a + s * r + e
            }
        }
    }, o = function() {
        function Sequence() {}
        return Sequence.nextId = function() {
            return Sequence._nextId++
        }
        ,
        Sequence._nextId = 0,
        Sequence
    }(), a = new r, u = function() {
        function Tween(t, e) {
            void 0 === e && (e = a),
            this._object = t,
            this._group = e,
            this._isPaused = !1,
            this._pauseStart = 0,
            this._valuesStart = {},
            this._valuesEnd = {},
            this._valuesStartRepeat = {},
            this._duration = 1e3,
            this._initialRepeat = 0,
            this._repeat = 0,
            this._yoyo = !1,
            this._isPlaying = !1,
            this._reversed = !1,
            this._delayTime = 0,
            this._startTime = 0,
            this._easingFunction = n.Linear.None,
            this._interpolationFunction = s.Linear,
            this._chainedTweens = [],
            this._onStartCallbackFired = !1,
            this._id = o.nextId(),
            this._isChainStopped = !1,
            this._goToEnd = !1
        }
        return Tween.prototype.getId = function() {
            return this._id
        }
        ,
        Tween.prototype.isPlaying = function() {
            return this._isPlaying
        }
        ,
        Tween.prototype.isPaused = function() {
            return this._isPaused
        }
        ,
        Tween.prototype.to = function(t, e) {
            return this._valuesEnd = Object.create(t),
            void 0 !== e && (this._duration = e),
            this
        }
        ,
        Tween.prototype.duration = function(t) {
            return this._duration = t,
            this
        }
        ,
        Tween.prototype.start = function(t) {
            if (this._isPlaying)
                return this;
            if (this._group && this._group.add(this),
            this._repeat = this._initialRepeat,
            this._reversed)
                for (var e in this._reversed = !1,
                this._valuesStartRepeat)
                    this._swapEndStartRepeatValues(e),
                    this._valuesStart[e] = this._valuesStartRepeat[e];
            return this._isPlaying = !0,
            this._isPaused = !1,
            this._onStartCallbackFired = !1,
            this._isChainStopped = !1,
            this._startTime = void 0 !== t ? "string" == typeof t ? i() + parseFloat(t) : t : i(),
            this._startTime += this._delayTime,
            this._setupProperties(this._object, this._valuesStart, this._valuesEnd, this._valuesStartRepeat),
            this
        }
        ,
        Tween.prototype._setupProperties = function(t, e, n, i) {
            for (var r in n) {
                var s = t[r]
                  , o = Array.isArray(s)
                  , a = o ? "array" : typeof s
                  , u = !o && Array.isArray(n[r]);
                if ("undefined" !== a && "function" !== a) {
                    if (u) {
                        var h = n[r];
                        if (0 === h.length)
                            continue;
                        h = h.map(this._handleRelativeValue.bind(this, s)),
                        n[r] = [s].concat(h)
                    }
                    if ("object" !== a && !o || !s || u)
                        void 0 === e[r] && (e[r] = s),
                        o || (e[r] *= 1),
                        i[r] = u ? n[r].slice().reverse() : e[r] || 0;
                    else {
                        for (var p in e[r] = o ? [] : {},
                        s)
                            e[r][p] = s[p];
                        i[r] = o ? [] : {},
                        this._setupProperties(s, e[r], n[r], i[r])
                    }
                }
            }
        }
        ,
        Tween.prototype.stop = function() {
            return this._isChainStopped || (this._isChainStopped = !0,
            this.stopChainedTweens()),
            this._isPlaying ? (this._group && this._group.remove(this),
            this._isPlaying = !1,
            this._isPaused = !1,
            this._onStopCallback && this._onStopCallback(this._object),
            this) : this
        }
        ,
        Tween.prototype.end = function() {
            return this._goToEnd = !0,
            this.update(1 / 0),
            this
        }
        ,
        Tween.prototype.pause = function(t) {
            return void 0 === t && (t = i()),
            this._isPaused || !this._isPlaying || (this._isPaused = !0,
            this._pauseStart = t,
            this._group && this._group.remove(this)),
            this
        }
        ,
        Tween.prototype.resume = function(t) {
            return void 0 === t && (t = i()),
            this._isPaused && this._isPlaying ? (this._isPaused = !1,
            this._startTime += t - this._pauseStart,
            this._pauseStart = 0,
            this._group && this._group.add(this),
            this) : this
        }
        ,
        Tween.prototype.stopChainedTweens = function() {
            for (var t = 0, e = this._chainedTweens.length; t < e; t++)
                this._chainedTweens[t].stop();
            return this
        }
        ,
        Tween.prototype.group = function(t) {
            return this._group = t,
            this
        }
        ,
        Tween.prototype.delay = function(t) {
            return this._delayTime = t,
            this
        }
        ,
        Tween.prototype.repeat = function(t) {
            return this._initialRepeat = t,
            this._repeat = t,
            this
        }
        ,
        Tween.prototype.repeatDelay = function(t) {
            return this._repeatDelayTime = t,
            this
        }
        ,
        Tween.prototype.yoyo = function(t) {
            return this._yoyo = t,
            this
        }
        ,
        Tween.prototype.easing = function(t) {
            return this._easingFunction = t,
            this
        }
        ,
        Tween.prototype.interpolation = function(t) {
            return this._interpolationFunction = t,
            this
        }
        ,
        Tween.prototype.chain = function() {
            for (var t = [], e = 0; e < arguments.length; e++)
                t[e] = arguments[e];
            return this._chainedTweens = t,
            this
        }
        ,
        Tween.prototype.onStart = function(t) {
            return this._onStartCallback = t,
            this
        }
        ,
        Tween.prototype.onUpdate = function(t) {
            return this._onUpdateCallback = t,
            this
        }
        ,
        Tween.prototype.onRepeat = function(t) {
            return this._onRepeatCallback = t,
            this
        }
        ,
        Tween.prototype.onComplete = function(t) {
            return this._onCompleteCallback = t,
            this
        }
        ,
        Tween.prototype.onStop = function(t) {
            return this._onStopCallback = t,
            this
        }
        ,
        Tween.prototype.update = function(t, e) {
            if (void 0 === t && (t = i()),
            void 0 === e && (e = !0),
            this._isPaused)
                return !0;
            var n, r, s = this._startTime + this._duration;
            if (!this._goToEnd && !this._isPlaying) {
                if (t > s)
                    return !1;
                e && this.start(t)
            }
            if (this._goToEnd = !1,
            t < this._startTime)
                return !0;
            !1 === this._onStartCallbackFired && (this._onStartCallback && this._onStartCallback(this._object),
            this._onStartCallbackFired = !0),
            r = (t - this._startTime) / this._duration,
            r = 0 === this._duration || r > 1 ? 1 : r;
            var o = this._easingFunction(r);
            if (this._updateProperties(this._object, this._valuesStart, this._valuesEnd, o),
            this._onUpdateCallback && this._onUpdateCallback(this._object, r),
            1 === r) {
                if (this._repeat > 0) {
                    for (n in isFinite(this._repeat) && this._repeat--,
                    this._valuesStartRepeat)
                        this._yoyo || "string" != typeof this._valuesEnd[n] || (this._valuesStartRepeat[n] = this._valuesStartRepeat[n] + parseFloat(this._valuesEnd[n])),
                        this._yoyo && this._swapEndStartRepeatValues(n),
                        this._valuesStart[n] = this._valuesStartRepeat[n];
                    return this._yoyo && (this._reversed = !this._reversed),
                    void 0 !== this._repeatDelayTime ? this._startTime = t + this._repeatDelayTime : this._startTime = t + this._delayTime,
                    this._onRepeatCallback && this._onRepeatCallback(this._object),
                    !0
                }
                this._onCompleteCallback && this._onCompleteCallback(this._object);
                for (var a = 0, u = this._chainedTweens.length; a < u; a++)
                    this._chainedTweens[a].start(this._startTime + this._duration);
                return this._isPlaying = !1,
                !1
            }
            return !0
        }
        ,
        Tween.prototype._updateProperties = function(t, e, n, i) {
            for (var r in n)
                if (void 0 !== e[r]) {
                    var s = e[r] || 0
                      , o = n[r]
                      , a = Array.isArray(t[r])
                      , u = Array.isArray(o);
                    !a && u ? t[r] = this._interpolationFunction(o, i) : "object" == typeof o && o ? this._updateProperties(t[r], s, o, i) : "number" == typeof (o = this._handleRelativeValue(s, o)) && (t[r] = s + (o - s) * i)
                }
        }
        ,
        Tween.prototype._handleRelativeValue = function(t, e) {
            return "string" != typeof e ? e : "+" === e.charAt(0) || "-" === e.charAt(0) ? t + parseFloat(e) : parseFloat(e)
        }
        ,
        Tween.prototype._swapEndStartRepeatValues = function(t) {
            var e = this._valuesStartRepeat[t]
              , n = this._valuesEnd[t];
            this._valuesStartRepeat[t] = "string" == typeof n ? this._valuesStartRepeat[t] + parseFloat(n) : this._valuesEnd[t],
            this._valuesEnd[t] = e
        }
        ,
        Tween
    }(), h = "18.6.4", p = o.nextId, _ = a, l = _.getAll.bind(_), c = _.removeAll.bind(_), d = _.add.bind(_), f = _.remove.bind(_), y = _.update.bind(_), v = {
        Easing: n,
        Group: r,
        Interpolation: s,
        now: i,
        Sequence: o,
        nextId: p,
        Tween: u,
        VERSION: h,
        getAll: l,
        removeAll: c,
        add: d,
        remove: f,
        update: y
    };
    t.Easing = n,
    t.Group = r,
    t.Interpolation = s,
    t.Sequence = o,
    t.Tween = u,
    t.VERSION = h,
    t.add = d,
    t.default = v,
    t.getAll = l,
    t.nextId = p,
    t.now = i,
    t.remove = f,
    t.removeAll = c,
    t.update = y,
    Object.defineProperty(t, "__esModule", {
        value: !0
    })
}
));
document.addEventListener("contextmenu", (function(e) {
    e.preventDefault()
}
));
var AddToScore = pc.createScript("addToScore");
AddToScore.attributes.add("bird", {
    type: "entity"
}),
AddToScore.prototype.initialize = function() {
    this.lastX = this.entity.getPosition().x
}
,
AddToScore.prototype.update = function(t) {
    var i = this.app
      , o = this.bird.getPosition().x
      , e = this.entity.getPosition().x;
    e <= o && this.lastX > o && i.fire("game:addscore"),
    this.lastX = e
}
;
function storageAvailable(e) {
    try {
        var t = window[e]
          , o = "__storage_test__";
        return t.setItem(o, o),
        t.removeItem(o),
        !0
    } catch (e) {
        return !1
    }
}
var Game = pc.createScript("game");
Game.prototype.initialize = function() {
    var e = this.app;
    this.score = 0,
    this.bestScore = 0,
    storageAvailable("localStorage") && (this.bestScore = localStorage.getItem("Flappy Bird Best Score"),
    null === this.bestScore && (this.bestScore = 0)),
    e.on("game:menu", (function() {
        e.fire("flash:black"),
        setTimeout((function() {
            e.root.findByName("Game Over Screen").enabled = !1,
            e.root.findByName("Menu Screen").enabled = !0,
            e.root.findByName("Game").findByName("Bird").enabled = !1,
            e.fire("pipes:reset"),
            e.fire("ground:start")
        }
        ), 250)
    }
    ), this),
    e.on("game:getready", (function() {
        e.fire("flash:black"),
        setTimeout(function() {
            e.root.findByName("Menu Screen").enabled = !1,
            e.root.findByName("Game Screen").enabled = !0,
            this.score = 0,
            e.fire("ui:score", this.score),
            e.root.findByName("Tap").sprite.enabled = !0,
            e.root.findByName("Hand").sprite.enabled = !0,
            e.root.findByName("Game").findByName("Bird").enabled = !0
        }
        .bind(this), 250)
    }
    ), this),
    e.on("game:play", (function() {
        e.fire("pipes:start"),
        e.fire("ui:fadegetready")
    }
    ), this),
    e.on("game:pause", (function() {
        e.root.findByName("Pause Button").enabled = !1,
        e.root.findByName("Play Button").enabled = !0
    }
    ), this),
    e.on("game:unpause", (function() {
        e.root.findByName("Play Button").enabled = !1,
        e.root.findByName("Pause Button").enabled = !0
    }
    ), this),
    e.on("game:gameover", (function() {
        e.root.findByName("Game Screen").enabled = !1,
        e.root.findByName("Game Over Screen").enabled = !0,
        e.fire("pipes:stop"),
        e.fire("ground:stop"),
        e.fire("ui:fadeingameover"),
        e.fire("ui:showscoreboard", this.score, this.bestScore),
        this.score > this.bestScore && (this.bestScore = this.score,
        storageAvailable("localStorage") && localStorage.setItem("Flappy Bird Best Score", this.score.toString())),
        setTimeout((function() {
            e.fire("game:audio", "Swoosh")
        }
        ), 500)
    }
    ), this),
    e.on("game:addscore", (function() {
        this.score++,
        e.fire("ui:score", this.score),
        e.fire("game:audio", "Point")
    }
    ), this),
    e.on("game:share", (function() {
        if (navigator.share && pc.platform.mobile) {
            const e = {
                title: "Flappy Bird",
                text: `I scored ${this.score} in Flappy Bird! Beat that!`,
                url: "https://flappybird.io/"
            };
            navigator.share(e)
        } else {
            var e = screen.width / 2 - 320
              , t = screen.height / 2 - 190
              , o = "https://twitter.com/intent/tweet?text=" + encodeURIComponent("I scored " + this.score + " in Flappy Bird! Beat that! https://flappybird.io/")
              , i = window.open(o, "name", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=640, height=380, top=" + t + ", left=" + e);
            window.focus && i && i.focus()
        }
    }
    ), this),
    e.on("game:audio", (function(e) {
        this.entity.sound.play(e)
    }
    ), this)
}
,
Game.prototype.update = function(e) {
    var t = this.app
      , o = t.root.findByName("Menu Screen").enabled
      , i = t.root.findByName("Game Over Screen").enabled
      , a = t.root.findByName("Game Screen").enabled;
    if (t.keyboard.wasPressed(pc.KEY_SPACE)) {
        if (o)
            return void t.fire("game:getready");
        if (i)
            return t.fire("game:menu"),
            void setTimeout(( () => t.fire("game:getready")), 50);
        if (a)
            return void t.fire("game:play")
    }
}
;
var Button = pc.createScript("button");
Button.attributes.add("diplacement", {
    type: "number",
    default: .00390625
}),
Button.attributes.add("event", {
    type: "string"
}),
Button.prototype.initialize = function() {
    var t = this.app;
    this.pressed = !1,
    this.min = new pc.Vec3,
    this.max = new pc.Vec3,
    t.on("ui:press", (function(t, e, s) {
        s.processed || this.press(t, e, s)
    }
    ), this),
    t.on("ui:release", (function(t, e) {
        this.release()
    }
    ), this),
    this.on("enable", (function() {
        t.on("ui:press", (function(t, e, s) {
            s.processed || this.press(t, e, s)
        }
        ), this),
        t.on("ui:release", (function(t, e) {
            this.release()
        }
        ), this)
    }
    )),
    this.on("disable", (function() {
        t.off("ui:press"),
        t.off("ui:release"),
        this.pressed = !1
    }
    ))
}
,
Button.prototype.checkForClick = function(t, e) {
    var s = this.app.root.findByName("Camera")
      , i = this.entity.sprite._meshInstance.aabb;
    return s.camera.worldToScreen(i.getMin(), this.min),
    s.camera.worldToScreen(i.getMax(), this.max),
    t >= this.min.x && t <= this.max.x && e >= this.max.y && e <= this.min.y
}
,
Button.prototype.press = function(t, e, s) {
    this.checkForClick(t, e) && (this.pressed = !0,
    this.entity.translate(0, -this.diplacement, 0),
    s.processed = !0)
}
,
Button.prototype.release = function() {
    var t = this.app;
    this.pressed && (this.pressed = !1,
    this.entity.translate(0, this.diplacement, 0),
    t.fire(this.event),
    t.fire("game:audio", "Swoosh"))
}
;
var Sparkle = pc.createScript("sparkle");
Sparkle.attributes.add("radius", {
    type: "number",
    default: 1
}),
Sparkle.prototype.initialize = function() {
    this.initialPos = this.entity.getLocalPosition().clone(),
    this.entity.sprite.on("loop", (function() {
        var t = Math.random() * Math.PI * 2
          , i = Math.random() * this.radius
          , a = Math.cos(t) * i
          , s = Math.sin(t) * i;
        this.entity.setLocalPosition(this.initialPos.x + a, this.initialPos.y + s, this.initialPos.z)
    }
    ), this)
}
;
var Bird = pc.createScript("bird");
Bird.attributes.add("flapVelocity", {
    type: "number",
    default: 1
}),
Bird.attributes.add("gravity", {
    type: "number",
    default: 5
}),
Bird.attributes.add("lowestHeight", {
    type: "number",
    default: -.25
}),
Bird.attributes.add("radius", {
    type: "number",
    default: .068
}),
Bird.prototype.initialize = function() {
    var t = this.app;
    this.velocity = 0,
    this.state = "getready",
    this.paused = !1,
    this.circle = {
        x: 0,
        y: 0,
        r: 0
    },
    this.rect = {
        x: 0,
        y: 0,
        w: 0,
        h: 0
    },
    this.initialPos = this.entity.getPosition().clone(),
    this.initialRot = this.entity.getRotation().clone(),
    this.pipes = t.root.findByTag("pipe"),
    t.on("game:pause", (function() {
        this.paused = !0,
        this.entity.sprite.speed = 0
    }
    ), this),
    t.on("game:unpause", (function() {
        this.paused = !1,
        this.entity.sprite.speed = 1
    }
    ), this),
    t.on("game:press", (function(t, i) {
        this.flap()
    }
    ), this),
    this.on("enable", (function() {
        t.on("game:press", (function(t, i) {
            this.flap()
        }
        ), this),
        this.reset()
    }
    )),
    this.on("disable", (function() {
        t.off("game:press")
    }
    )),
    this.reset()
}
,
Bird.prototype.reset = function() {
    this.app;
    this.velocity = 0,
    this.state = "getready",
    this.entity.setPosition(this.initialPos),
    this.entity.setRotation(this.initialRot),
    this.entity.sprite.speed = 1
}
,
Bird.prototype.flap = function() {
    var t = this.app;
    this.paused || ("getready" === this.state && (t.fire("game:play"),
    this.state = "play",
    this.entity.sprite.speed = 2),
    "play" === this.state && (t.fire("game:audio", "Flap"),
    this.velocity = this.flapVelocity))
}
,
Bird.prototype.die = function(t) {
    var i = this.app;
    this.state = "dead",
    this.entity.sprite.speed = 0,
    i.fire("game:audio", "Hit"),
    i.fire("flash:white"),
    i.fire("game:gameover"),
    t && setTimeout((function() {
        i.fire("game:audio", "Die")
    }
    ), 500)
}
,
Bird.prototype.circleRectangleIntersect = function(t, i) {
    var e = t.x
      , s = t.y
      , a = t.r
      , r = i.x
      , h = i.y
      , n = i.w
      , o = i.h
      , p = Math.abs(e - r - n / 2)
      , d = Math.abs(s - h - o / 2);
    if (p > n / 2 + a)
        return !1;
    if (d > o / 2 + a)
        return !1;
    if (p <= n / 2)
        return !0;
    if (d <= o / 2)
        return !0;
    var y = p - n / 2
      , l = d - o / 2;
    return y * y + l * l <= a * a
}
,
Bird.prototype.update = function(t) {
    var i = this.app;
    if (!this.paused) {
        var e = "play" === this.state
          , s = "dead" === this.state;
        i.keyboard.wasPressed(pc.KEY_SPACE) && this.flap();
        var a = this.entity.getPosition()
          , r = a.y;
        if ((e || s) && a.y >= this.lowestHeight) {
            this.velocity -= this.gravity * t,
            (r += this.velocity * t) < this.lowestHeight && (r = this.lowestHeight),
            this.entity.setPosition(a.x, r, 0);
            var h = pc.math.clamp(this.velocity, -2, -.75);
            h += 1,
            this.entity.setLocalEulerAngles(0, 0, 90 * h)
        }
        if (e) {
            r <= this.lowestHeight && this.die(!1);
            var n = this.rect
              , o = this.circle;
            o.x = a.x,
            o.y = a.y,
            o.r = this.radius;
            for (var p = 0; p < this.pipes.length; p++) {
                var d = this.pipes[p]
                  , y = d.sprite._meshInstance.aabb
                  , l = y.getMin()
                  , u = y.getMax();
                n.x = l.x,
                n.y = l.y,
                n.w = u.x - l.x,
                n.h = "Pipe Top" === d.name ? 1e3 : u.y - l.y,
                this.circleRectangleIntersect(o, n) && this.die(!0)
            }
        }
    }
}
;
var CameraAspect = pc.createScript("cameraAspect");
CameraAspect.prototype.initialize = function() {
    this.currentOrthoHeight = this.entity.camera.orthoHeight
}
,
CameraAspect.prototype.update = function(t) {
    var e = this.app.graphicsDevice.canvas
      , i = e.width / e.height
      , r = pc.math.clamp(.72 / i, 1, 2);
    r !== this.currentOrthoHeight && (this.entity.camera.orthoHeight = r,
    this.currentOrthoHeight = r)
}
;
var Score = pc.createScript("score");
Score.attributes.add("name", {
    type: "string",
    default: "score"
}),
Score.attributes.add("display", {
    type: "entity",
    array: !0
}),
Score.attributes.add("numbers", {
    type: "asset",
    assetType: "sprite",
    array: !0
}),
Score.prototype.initialize = function() {
    var t = this.app
      , e = [];
    t.on("ui:" + this.name, (function(t) {
        for (!function(t, e) {
            var r = t.toString();
            e.length = 0;
            for (var a = 0, i = r.length; a < i; a++)
                e.push(+r.charAt(a))
        }(t, e); e.length < this.display.length; )
            e.unshift(-1);
        var r = this.numbers;
        this.display.forEach((function(t, a) {
            var i = e[a];
            t.enabled = -1 !== i,
            -1 !== i && (t.sprite.sprite = r[i].resource)
        }
        ))
    }
    ), this)
}
;
var PipeHeight = pc.createScript("pipeHeight");
PipeHeight.prototype.initialize = function() {
    var i = this.app;
    this.pipe1 = i.root.findByName("Pipe 1"),
    this.pipe2 = i.root.findByName("Pipe 2"),
    this.pipe3 = i.root.findByName("Pipe 3"),
    this.heights = [],
    this.heights.push(.8 * (Math.random() - .5) + .1),
    this.heights.push(.8 * (Math.random() - .5) + .1),
    this.heights.push(.8 * (Math.random() - .5) + .1),
    this.setPipeHeights(),
    i.on("pipes:cycle", (function() {
        this.heights.shift(),
        this.heights.push(.75 * (Math.random() - .5)),
        this.setPipeHeights()
    }
    ), this)
}
,
PipeHeight.prototype.setPipeHeights = function() {
    var i;
    i = this.pipe1.getLocalPosition(),
    this.pipe1.setLocalPosition(i.x, this.heights[0], i.z),
    i = this.pipe2.getLocalPosition(),
    this.pipe2.setLocalPosition(i.x, this.heights[1], i.z),
    i = this.pipe3.getLocalPosition(),
    this.pipe3.setLocalPosition(i.x, this.heights[2], i.z)
}
;
var Scroll = pc.createScript("scroll");
Scroll.attributes.add("startEvent", {
    type: "string",
    default: "start"
}),
Scroll.attributes.add("stopEvent", {
    type: "string",
    default: "stop"
}),
Scroll.attributes.add("resetEvent", {
    type: "string",
    default: "reset"
}),
Scroll.attributes.add("cycleEvent", {
    type: "string",
    default: "cycle"
}),
Scroll.attributes.add("startX", {
    type: "number",
    default: 1
}),
Scroll.attributes.add("endX", {
    type: "number",
    default: -1
}),
Scroll.attributes.add("speed", {
    type: "number",
    default: 1
}),
Scroll.attributes.add("frozen", {
    type: "boolean",
    default: !1
}),
Scroll.prototype.initialize = function() {
    var t = this.app;
    this.paused = !1,
    this.initialPos = this.entity.getPosition().clone(),
    this.initialRot = this.entity.getRotation().clone(),
    t.on(this.resetEvent, (function() {
        this.entity.setPosition(this.initialPos),
        this.entity.setRotation(this.initialRot)
    }
    ), this),
    t.on(this.startEvent, (function() {
        this.frozen = !1
    }
    ), this),
    t.on(this.stopEvent, (function() {
        this.frozen = !0
    }
    ), this),
    t.on("game:pause", (function() {
        this.paused = !0
    }
    ), this),
    t.on("game:unpause", (function() {
        this.paused = !1
    }
    ), this)
}
,
Scroll.prototype.update = function(t) {
    var e = this.app;
    this.frozen || this.paused || (this.entity.translateLocal(this.speed * t / (1 / 60), 0, 0),
    this.entity.getLocalPosition().x < this.endX && (this.entity.translateLocal(this.startX - this.endX, 0, 0),
    e.fire(this.cycleEvent)))
}
;
var Scoreboard = pc.createScript("scoreboard");
Scoreboard.prototype.initialize = function() {
    var e = this.app
      , r = e.assets;
    this.score = {},
    this.score.current = 0,
    this.score.best = 0,
    e.on("ui:showscoreboard", (function(t, i) {
        e.root.findByName("OK Button").enabled = !1,
        e.root.findByName("Share Button").enabled = !1,
        this.score.current = 0,
        this.score.best = i,
        e.fire("ui:current", 0),
        e.fire("ui:best", i);
        var n = this.entity.findByName("Medal");
        n.enabled = !1;
        var o = this.entity.findByName("New");
        o.enabled = !1;
        new TWEEN.Tween(this.score).to({
            current: t
        }, 500).onUpdate((function(r) {
            var t = Math.round(r.current);
            e.fire("ui:current", t),
            t > i && e.fire("ui:best", t)
        }
        )).onComplete((function() {
            t >= 40 ? n.sprite.sprite = r.find("Medal Platinum", "sprite").resource : t >= 30 ? n.sprite.sprite = r.find("Medal Gold", "sprite").resource : t >= 20 ? n.sprite.sprite = r.find("Medal Silver", "sprite").resource : t >= 10 && (n.sprite.sprite = r.find("Medal Bronze", "sprite").resource),
            n.enabled = t >= 10,
            t > i && (o.enabled = !0),
            e.root.findByName("OK Button").enabled = !0,
            e.root.findByName("Share Button").enabled = !0
        }
        )).delay(1750).start()
    }
    ), this)
}
;
var Input = pc.createScript("input");
Input.prototype.initialize = function() {
    var e = this.app
      , press = function(n, t) {
        var i = {
            processed: !1
        };
        e.fire("ui:press", n, t, i),
        i.processed || e.fire("game:press", n, t)
    }
      , release = function(n) {
        e.fire("ui:release")
    };
    window.addEventListener("mousedown", (function(e) {
        e.preventDefault(),
        press(e.clientX, e.clientY)
    }
    ), {
        passive: !1
    }),
    window.addEventListener("mouseup", release, {
        passive: !1
    }),
    window.addEventListener("touchstart", (function(e) {
        e.preventDefault();
        var n = e.changedTouches[0];
        press(n.clientX, n.clientY)
    }
    ), {
        passive: !1
    }),
    window.addEventListener("touchend", release, {
        passive: !1
    })
}
;
var Tween = pc.createScript("tween");
Tween.attributes.add("tweens", {
    type: "json",
    schema: [{
        name: "autoPlay",
        title: "Autoplay",
        description: "Play tween immediately.",
        type: "boolean",
        default: !1
    }, {
        name: "event",
        title: "Trigger Event",
        description: "Play tween on the specified event name. This event must be fired on the global application object (e.g. this.app.fire('eventname');).",
        type: "string"
    }, {
        name: "path",
        title: "Path",
        description: "The path from the entity to the property. e.g. 'light.color', 'camera.fov' or 'script.vehicle.speed'.",
        type: "string"
    }, {
        name: "start",
        title: "Start",
        type: "vec4"
    }, {
        name: "end",
        title: "End",
        type: "vec4"
    }, {
        name: "easingFunction",
        title: "Easing Function",
        description: "The easing functions: Linear, Quadratic, Cubic, Quartic, Quintic, Sinusoidal, Exponential, Circular, Elastic, Back and Bounce.",
        type: "number",
        enum: [{
            Linear: 0
        }, {
            Quadratic: 1
        }, {
            Cubic: 2
        }, {
            Quartic: 3
        }, {
            Quintic: 4
        }, {
            Sinusoidal: 5
        }, {
            Exponential: 6
        }, {
            Circular: 7
        }, {
            Elastic: 8
        }, {
            Back: 9
        }, {
            Bounce: 10
        }]
    }, {
        name: "easingType",
        title: "Easing Type",
        description: "Whether to ease in, easy out or ease in and then out using the specified easing function. Note that for a Linear easing function, the easing type is ignored.",
        type: "number",
        enum: [{
            In: 0
        }, {
            Out: 1
        }, {
            InOut: 2
        }]
    }, {
        name: "delay",
        title: "Delay",
        description: "Time to wait in milliseconds after receiving the trigger event before executing the tween. Defaults to 0.",
        type: "number",
        default: 0
    }, {
        name: "duration",
        title: "Duration",
        description: "Time to execute the tween in milliseconds. Defaults to 1000.",
        type: "number",
        default: 1e3
    }, {
        name: "repeat",
        title: "Repeat",
        description: "The number of times the tween should be repeated after the initial playback. -1 will repeat forever. Defaults to 0.",
        type: "number",
        default: 0
    }, {
        name: "repeatDelay",
        title: "Repeat Delay",
        description: "Time to wait in milliseconds before executing each repeat of the tween. Defaults to 0.",
        type: "number",
        default: 0
    }, {
        name: "yoyo",
        title: "Yoyo",
        description: "This function only has effect if used along with repeat. When active, the behaviour of the tween will be like a yoyo, i.e. it will bounce to and from the start and end values, instead of just repeating the same sequence from the beginning. Defaults to false.",
        type: "boolean",
        default: !1
    }, {
        name: "startEvent",
        title: "Start Event",
        description: "Executed right before the tween starts animating, after any delay time specified by the delay method. This will be executed only once per tween, i.e. it will not be run when the tween is repeated via repeat(). It is great for synchronising to other events or triggering actions you want to happen when a tween starts.",
        type: "string"
    }, {
        name: "stopEvent",
        title: "Stop Event",
        description: "Executed when a tween is explicitly stopped via stop(), but not when it is completed normally.",
        type: "string"
    }, {
        name: "updateEvent",
        title: "Update Event",
        description: "Executed each time the tween is updated, after the values have been actually updated.",
        type: "string"
    }, {
        name: "completeEvent",
        title: "Complete Event",
        description: "Executed when a tween is finished normally (i.e. not stopped).",
        type: "string"
    }, {
        name: "repeatEvent",
        title: "Repeat Event",
        description: "Executed whenever a tween has just finished one repetition and will begin another.",
        type: "string"
    }],
    array: !0
}),
Tween.prototype.initialize = function() {
    var e, t = this.app;
    this.tweenInstances = [],
    this.tweenCallbacks = [];
    var makeStartCallback = function(e) {
        return function() {
            this.start(e)
        }
    };
    for (e = 0; e < this.tweens.length; e++) {
        var n = this.tweens[e];
        n.autoPlay && this.start(e),
        n.event.length > 0 && (this.tweenCallbacks[e] = {
            event: n.event,
            cb: makeStartCallback(e)
        },
        t.on(this.tweenCallbacks[e].event, this.tweenCallbacks[e].cb, this))
    }
    this.on("enable", (function() {
        for (e = 0; e < this.tweens.length; e++)
            this.tweenInstances[e] && this.tweenInstances[e].isPaused() && this.tweenInstances[e].isPaused() && this.tweenInstances[e].resume()
    }
    )),
    this.on("disable", (function() {
        for (e = 0; e < this.tweens.length; e++)
            this.tweenInstances[e] && this.tweenInstances[e].isPlaying() && this.tweenInstances[e].pause()
    }
    )),
    this.on("attr", (function(n, i, a) {
        for (e = 0; e < this.tweenCallbacks.length; e++)
            this.tweenCallbacks[e] && (t.off(this.tweenCallbacks[e].event, this.tweenCallbacks[e].cb, this),
            this.tweenCallbacks[e] = null);
        for (e = 0; e < this.tweens.length; e++) {
            var s = this.tweens[e];
            s.event.length > 0 && (this.tweenCallbacks[e] = {
                event: s.event,
                cb: makeStartCallback(e)
            },
            t.on(this.tweenCallbacks[e].event, this.tweenCallbacks[e].cb, this))
        }
    }
    ))
}
,
Tween.prototype.start = function(e) {
    var t, n = this.app, a = this.tweens[e], s = ["Linear", "Quadratic", "Cubic", "Quartic", "Quintic", "Sinusoidal", "Exponential", "Circular", "Elastic", "Back", "Bounce"];
    t = 0 === a.easingFunction ? TWEEN.Easing[s[a.easingFunction]].None : TWEEN.Easing[s[a.easingFunction]][["In", "Out", "InOut"][a.easingType]];
    var o = this.tweenInstances;
    o[e] && o[e].stop();
    var l = a.path.split(".")
      , r = this.entity;
    for (i = 0; i < l.length - 1; i++)
        r = r[l[i]];
    var c, p, u = l[l.length - 1], h = r[u], d = "number" == typeof h, f = a.start, w = a.end;
    if (d)
        c = {
            x: f.x
        },
        p = {
            x: w.x
        };
    else if (h instanceof pc.Vec2)
        c = new pc.Vec2(f.x,f.y),
        p = new pc.Vec2(w.x,w.y);
    else if (h instanceof pc.Vec3)
        c = new pc.Vec3(f.x,f.y,f.z),
        p = new pc.Vec3(w.x,w.y,w.z);
    else if (h instanceof pc.Vec4)
        c = f.clone(),
        p = w.clone();
    else {
        if (!(h instanceof pc.Color))
            return void console.error("ERROR: tween - specified property must be a number, vec2, vec3, vec4 or color");
        c = new pc.Color(f.x,f.y,f.z,f.w),
        p = new pc.Color(w.x,w.y,w.z,w.w)
    }
    var updateProperty = function(e) {
        switch (u) {
        case "eulerAngles":
            r.setEulerAngles(e);
            break;
        case "localEulerAngles":
            r.setLocalEulerAngles(e);
            break;
        case "localPosition":
            r.setLocalPosition(e);
            break;
        case "localScale":
            r.setLocalScale(e);
            break;
        case "position":
            r.setPosition(e);
            break;
        default:
            r[u] = d ? e.x : e,
            r instanceof pc.Material && r.update()
        }
    };
    updateProperty(c),
    o[e] = new TWEEN.Tween(c).to(p, a.duration).easing(t).onStart((function(e) {
        "" !== a.startEvent && n.fire(a.startEvent)
    }
    )).onStop((function(t) {
        "" !== a.stopEvent && n.fire(a.stopEvent),
        o[e] = null
    }
    )).onUpdate((function(e) {
        updateProperty(e),
        "" !== a.updateEvent && n.fire(a.updateEvent)
    }
    )).onComplete((function(t) {
        "" !== a.completeEvent && n.fire(a.completeEvent),
        o[e] = null
    }
    )).onRepeat((function(e) {
        "" !== a.repeatEvent && n.fire(a.repeatEvent)
    }
    )).repeat(-1 === a.repeat ? 1 / 0 : a.repeat).repeatDelay(a.repeatDelay).yoyo(a.yoyo).delay(a.delay).start()
}
;
var app = pc.Application.getApplication();
app && app.on("update", (function(e) {
    TWEEN.update()
}
));
var Enable = pc.createScript("enable");
Enable.attributes.add("enableEvent", {
    type: "string"
}),
Enable.attributes.add("disableEvent", {
    type: "string"
}),
Enable.prototype.initialize = function() {
    this.app.on(this.enableEvent, (function() {
        this.entity.enabled = !0
    }
    ), this),
    this.app.on(this.disableEvent, (function() {
        this.entity.enabled = !1
    }
    ), this)
}
;
pc.script.createLoadingScreen((function(A) {
    const c = document.createElement("div");
    Object.assign(c.style, {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "#000",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999
    }),
    document.body.appendChild(c);
    const i = document.createElement("img");
    i.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAbYAAABICAYAAACa5tCtAAAACXBIWXMAAC4jAAAuIwF4pT92AAAGlGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4xLWMwMDIgNzkuYTZhNjM5NjhhLCAyMDI0LzAzLzA2LTExOjUyOjA1ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjUuOSAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjQtMDYtMjdUMDM6Mzc6MjUrMTI6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDI0LTA4LTIxVDA5OjU1OjA3KzEyOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDI0LTA4LTIxVDA5OjU1OjA3KzEyOjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5Y2FlNzA5OC1iNGQ2LTQyNTYtOTQ1Mi01Zjc2MDQyNDUyY2MiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ZTExNjNmZWUtNzE5Zi00Y2E0LThhMDUtNzJkOTdjNGFlNTdkIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6ZTExNjNmZWUtNzE5Zi00Y2E0LThhMDUtNzJkOTdjNGFlNTdkIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDplMTE2M2ZlZS03MTlmLTRjYTQtOGEwNS03MmQ5N2M0YWU1N2QiIHN0RXZ0OndoZW49IjIwMjQtMDYtMjdUMDM6Mzc6MjUrMTI6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyNS45IChNYWNpbnRvc2gpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpmNWQ4YTFlMy02ZWE5LTRjZDEtOTUyMS0yNDNlYTAyMWY5MzIiIHN0RXZ0OndoZW49IjIwMjQtMDgtMTlUMTM6MzE6NTArMTI6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyNS4xMSAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6OWNhZTcwOTgtYjRkNi00MjU2LTk0NTItNWY3NjA0MjQ1MmNjIiBzdEV2dDp3aGVuPSIyMDI0LTA4LTIxVDA5OjU1OjA3KzEyOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjUuMTEgKE1hY2ludG9zaCkiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+r9SVlgAAX0tJREFUeJztvXnYZslVH/Y7de99l2/t7ult1tZoBs2MAI2EzCaEhbCwQ1iMxcOD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",
    Object.assign(i.style, {
        width: "300px",
        marginBottom: "30px",
        filter: "drop-shadow(0 0 10px rgba(255,255,255,0.3))"
    }),
    c.appendChild(i);
    const G = document.createElement("div");
    Object.assign(G.style, {
        width: "60%",
        maxWidth: "400px",
        height: "10px",
        backgroundColor: "rgba(255,255,255,0.15)",
        borderRadius: "5px",
        overflow: "hidden",
        position: "relative"
    }),
    c.appendChild(G);
    const Y = document.createElement("div");
    Object.assign(Y.style, {
        width: "0%",
        height: "100%",
        background: "linear-gradient(90deg, #00e6ff, #008cff)",
        boxShadow: "0 0 12px rgba(0, 255, 255, 0.5)",
        transition: "width 0.2s ease"
    }),
    G.appendChild(Y);
    const n = document.createElement("div");
    Object.assign(n.style, {
        position: "absolute",
        top: 0,
        left: "-50%",
        width: "50%",
        height: "100%",
        background: "linear-gradient(120deg, transparent, rgba(255,255,255,0.5), transparent)",
        animation: "shineMove 2s infinite linear"
    }),
    G.appendChild(n);
    const g = document.createElement("style");
    g.innerHTML = "\n        @keyframes shineMove {\n            0% { left: -50%; }\n            100% { left: 100%; }\n        }\n    ",
    document.head.appendChild(g),
    A.on("preload:progress", (function(A) {
        Y.style.width = 100 * Math.min(1, Math.max(0, A)) + "%"
    }
    )),
    A.on("preload:end", (function() {
        c.style.transition = "opacity 0.6s ease",
        c.style.opacity = "0",
        setTimeout(( () => c.remove()), 600)
    }
    ))
}
));
