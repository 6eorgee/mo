if (
  (function () {
    var t = this;
    (function () {
      (function () {
        this.Rails = {
          linkClickSelector:
            "a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]",
          buttonClickSelector: {
            selector:
              "button[data-remote]:not([form]), button[data-confirm]:not([form])",
            exclude: "form button",
          },
          inputChangeSelector:
            "select[data-remote], input[data-remote], textarea[data-remote]",
          formSubmitSelector: "form",
          formInputClickSelector:
            "form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])",
          formDisableSelector:
            "input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled",
          formEnableSelector:
            "input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled",
          fileInputSelector: "input[name][type=file]:not([disabled])",
          linkDisableSelector: "a[data-disable-with], a[data-disable]",
          buttonDisableSelector:
            "button[data-remote][data-disable-with], button[data-remote][data-disable]",
        };
      }.call(this));
    }.call(t));
    var b = t.Rails;
    (function () {
      (function () {
        var i, n;
        (n =
          Element.prototype.matches ||
          Element.prototype.matchesSelector ||
          Element.prototype.mozMatchesSelector ||
          Element.prototype.msMatchesSelector ||
          Element.prototype.oMatchesSelector ||
          Element.prototype.webkitMatchesSelector),
          (b.matches = function (t, e) {
            return null != e.exclude
              ? n.call(t, e.selector) && !n.call(t, e.exclude)
              : n.call(t, e);
          }),
          (i = "_ujsData"),
          (b.getData = function (t, e) {
            var n;
            return null != (n = t[i]) ? n[e] : void 0;
          }),
          (b.setData = function (t, e, n) {
            return null == t[i] && (t[i] = {}), (t[i][e] = n);
          }),
          (b.$ = function (t) {
            return Array.prototype.slice.call(document.querySelectorAll(t));
          });
      }.call(this),
        function () {
          var n, i, o;
          (n = b.$),
            (o = b.csrfToken = function () {
              var t;
              return (
                (t = document.querySelector("meta[name=csrf-token]")) &&
                t.content
              );
            }),
            (i = b.csrfParam = function () {
              var t;
              return (
                (t = document.querySelector("meta[name=csrf-param]")) &&
                t.content
              );
            }),
            (b.CSRFProtection = function (t) {
              var e;
              if (null != (e = o()))
                return t.setRequestHeader("X-CSRF-Token", e);
            }),
            (b.refreshCSRFTokens = function () {
              var t, e;
              if (((e = o()), (t = i()), null != e && null != t))
                return n('form input[name="' + t + '"]').forEach(function (t) {
                  return (t.value = e);
                });
            });
        }.call(this),
        function () {
          var o, e, r;
          (r = b.matches),
            "function" != typeof (o = window.CustomEvent) &&
              ((o = function (t, e) {
                var n;
                return (
                  (n = document.createEvent("CustomEvent")).initCustomEvent(
                    t,
                    e.bubbles,
                    e.cancelable,
                    e.detail
                  ),
                  n
                );
              }).prototype = window.Event.prototype),
            (e = b.fire = function (t, e, n) {
              var i;
              return (
                (i = new o(e, { bubbles: !0, cancelable: !0, detail: n })),
                t.dispatchEvent(i),
                !i.defaultPrevented
              );
            }),
            (b.stopEverything = function (t) {
              return (
                e(t.target, "ujs:everythingStopped"),
                t.preventDefault(),
                t.stopPropagation(),
                t.stopImmediatePropagation()
              );
            }),
            (b.delegate = function (t, n, e, i) {
              return t.addEventListener(e, function (t) {
                var e;
                for (e = t.target; e instanceof Element && !r(e, n); )
                  e = e.parentNode;
                if (e instanceof Element && !1 === i.call(e, t))
                  return t.preventDefault(), t.stopPropagation();
              });
            });
        }.call(this),
        function () {
          var e, i, t, o, r;
          (i = b.CSRFProtection),
            b.fire,
            (e = {
              "*": "*/*",
              text: "text/plain",
              html: "text/html",
              xml: "application/xml, text/xml",
              json: "application/json, text/javascript",
              script:
                "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript",
            }),
            (b.ajax = function (e) {
              var n;
              return (
                (e = o(e)),
                (n = t(e, function () {
                  var t;
                  return (
                    (t = r(n.response, n.getResponseHeader("Content-Type"))),
                    2 === Math.floor(n.status / 100)
                      ? "function" == typeof e.success &&
                        e.success(t, n.statusText, n)
                      : "function" == typeof e.error &&
                        e.error(t, n.statusText, n),
                    "function" == typeof e.complete
                      ? e.complete(n, n.statusText)
                      : void 0
                  );
                })),
                !("function" != typeof e.beforeSend || !e.beforeSend(n, e)) &&
                  (n.readyState === XMLHttpRequest.OPENED
                    ? n.send(e.data)
                    : void 0)
              );
            }),
            (o = function (t) {
              return (
                (t.url = t.url || location.href),
                (t.type = t.type.toUpperCase()),
                "GET" === t.type &&
                  t.data &&
                  (t.url.indexOf("?") < 0
                    ? (t.url += "?" + t.data)
                    : (t.url += "&" + t.data)),
                null == e[t.dataType] && (t.dataType = "*"),
                (t.accept = e[t.dataType]),
                "*" !== t.dataType && (t.accept += ", */*; q=0.01"),
                t
              );
            }),
            (t = function (t, e) {
              var n;
              return (
                (n = new XMLHttpRequest()).open(t.type, t.url, !0),
                n.setRequestHeader("Accept", t.accept),
                "string" == typeof t.data &&
                  n.setRequestHeader(
                    "Content-Type",
                    "application/x-www-form-urlencoded; charset=UTF-8"
                  ),
                t.crossDomain ||
                  n.setRequestHeader("X-Requested-With", "XMLHttpRequest"),
                i(n),
                (n.withCredentials = !!t.withCredentials),
                (n.onreadystatechange = function () {
                  if (n.readyState === XMLHttpRequest.DONE) return e(n);
                }),
                n
              );
            }),
            (r = function (t, e) {
              var n, i;
              if ("string" == typeof t && "string" == typeof e)
                if (e.match(/\bjson\b/))
                  try {
                    t = JSON.parse(t);
                  } catch (o) {}
                else if (e.match(/\b(?:java|ecma)script\b/))
                  ((i = document.createElement("script")).text = t),
                    document.head.appendChild(i).parentNode.removeChild(i);
                else if (e.match(/\b(xml|html|svg)\b/)) {
                  (n = new DOMParser()), (e = e.replace(/;.+/, ""));
                  try {
                    t = n.parseFromString(t, e);
                  } catch (o) {}
                }
              return t;
            }),
            (b.href = function (t) {
              return t.href;
            }),
            (b.isCrossDomain = function (t) {
              var e, n;
              ((e = document.createElement("a")).href = location.href),
                (n = document.createElement("a"));
              try {
                return (
                  (n.href = t),
                  !(
                    ((!n.protocol || ":" === n.protocol) && !n.host) ||
                    e.protocol + "//" + e.host == n.protocol + "//" + n.host
                  )
                );
              } catch (i) {
                return i, !0;
              }
            });
        }.call(this),
        function () {
          var o, r;
          (o = b.matches),
            (r = function (t) {
              return Array.prototype.slice.call(t);
            }),
            (b.serializeElement = function (t, e) {
              var n, i;
              return (
                (n = [t]),
                o(t, "form") && (n = r(t.elements)),
                (i = []),
                n.forEach(function (e) {
                  if (e.name && !e.disabled)
                    return o(e, "select")
                      ? r(e.options).forEach(function (t) {
                          if (t.selected)
                            return i.push({ name: e.name, value: t.value });
                        })
                      : e.checked ||
                        -1 === ["radio", "checkbox", "submit"].indexOf(e.type)
                      ? i.push({ name: e.name, value: e.value })
                      : void 0;
                }),
                e && i.push(e),
                i
                  .map(function (t) {
                    return null != t.name
                      ? encodeURIComponent(t.name) +
                          "=" +
                          encodeURIComponent(t.value)
                      : t;
                  })
                  .join("&")
              );
            }),
            (b.formElements = function (t, e) {
              return o(t, "form")
                ? r(t.elements).filter(function (t) {
                    return o(t, e);
                  })
                : r(t.querySelectorAll(e));
            });
        }.call(this),
        function () {
          var e, r, n;
          (r = b.fire),
            (n = b.stopEverything),
            (b.handleConfirm = function (t) {
              if (!e(this)) return n(t);
            }),
            (e = function (t) {
              var e, n, i;
              if (!(i = t.getAttribute("data-confirm"))) return !0;
              if (((e = !1), r(t, "confirm"))) {
                try {
                  e = confirm(i);
                } catch (o) {}
                n = r(t, "confirm:complete", [e]);
              }
              return e && n;
            });
        }.call(this),
        function () {
          var n, i, o, r, a, s, e, l, u, c, d;
          (u = b.matches),
            (l = b.getData),
            (c = b.setData),
            (d = b.stopEverything),
            (e = b.formElements),
            (b.handleDisabledElement = function (t) {
              if (this.disabled) return d(t);
            }),
            (b.enableElement = function (t) {
              var e;
              return (
                (e = t instanceof Event ? t.target : t),
                u(e, b.linkDisableSelector)
                  ? s(e)
                  : u(e, b.buttonDisableSelector) || u(e, b.formEnableSelector)
                  ? r(e)
                  : u(e, b.formSubmitSelector)
                  ? a(e)
                  : void 0
              );
            }),
            (b.disableElement = function (t) {
              var e;
              return (
                (e = t instanceof Event ? t.target : t),
                u(e, b.linkDisableSelector)
                  ? o(e)
                  : u(e, b.buttonDisableSelector) || u(e, b.formDisableSelector)
                  ? n(e)
                  : u(e, b.formSubmitSelector)
                  ? i(e)
                  : void 0
              );
            }),
            (o = function (t) {
              var e;
              return (
                null != (e = t.getAttribute("data-disable-with")) &&
                  (c(t, "ujs:enable-with", t.innerHTML), (t.innerHTML = e)),
                t.addEventListener("click", d),
                c(t, "ujs:disabled", !0)
              );
            }),
            (s = function (t) {
              var e;
              return (
                null != (e = l(t, "ujs:enable-with")) &&
                  ((t.innerHTML = e), c(t, "ujs:enable-with", null)),
                t.removeEventListener("click", d),
                c(t, "ujs:disabled", null)
              );
            }),
            (i = function (t) {
              return e(t, b.formDisableSelector).forEach(n);
            }),
            (n = function (t) {
              var e;
              return (
                null != (e = t.getAttribute("data-disable-with")) &&
                  (u(t, "button")
                    ? (c(t, "ujs:enable-with", t.innerHTML), (t.innerHTML = e))
                    : (c(t, "ujs:enable-with", t.value), (t.value = e))),
                (t.disabled = !0),
                c(t, "ujs:disabled", !0)
              );
            }),
            (a = function (t) {
              return e(t, b.formEnableSelector).forEach(r);
            }),
            (r = function (t) {
              var e;
              return (
                null != (e = l(t, "ujs:enable-with")) &&
                  (u(t, "button") ? (t.innerHTML = e) : (t.value = e),
                  c(t, "ujs:enable-with", null)),
                (t.disabled = !1),
                c(t, "ujs:disabled", null)
              );
            });
        }.call(this),
        function () {
          var l;
          (l = b.stopEverything),
            (b.handleMethod = function (t) {
              var e, n, i, o, r, a, s;
              if ((s = (a = this).getAttribute("data-method")))
                return (
                  (r = b.href(a)),
                  (n = b.csrfToken()),
                  (e = b.csrfParam()),
                  (i = document.createElement("form")),
                  (o =
                    "<input name='_method' value='" + s + "' type='hidden' />"),
                  null == e ||
                    null == n ||
                    b.isCrossDomain(r) ||
                    (o +=
                      "<input name='" +
                      e +
                      "' value='" +
                      n +
                      "' type='hidden' />"),
                  (o += '<input type="submit" />'),
                  (i.method = "post"),
                  (i.action = r),
                  (i.target = a.target),
                  (i.innerHTML = o),
                  (i.style.display = "none"),
                  document.body.appendChild(i),
                  i.querySelector('[type="submit"]').click(),
                  l(t)
                );
            });
        }.call(this),
        function () {
          var l,
            u,
            c,
            d,
            f,
            p,
            h,
            m,
            g,
            v = [].slice;
          (p = b.matches),
            (c = b.getData),
            (m = b.setData),
            (u = b.fire),
            (g = b.stopEverything),
            (l = b.ajax),
            (d = b.isCrossDomain),
            (h = b.serializeElement),
            (f = function (t) {
              var e;
              return (
                null != (e = t.getAttribute("data-remote")) && "false" !== e
              );
            }),
            (b.handleRemote = function (t) {
              var e, n, i, o, r, a, s;
              return (
                !f((o = this)) ||
                (u(o, "ajax:before")
                  ? ((s = o.getAttribute("data-with-credentials")),
                    (i = o.getAttribute("data-type") || "script"),
                    p(o, b.formSubmitSelector)
                      ? ((e = c(o, "ujs:submit-button")),
                        (r = c(o, "ujs:submit-button-formmethod") || o.method),
                        (a =
                          c(o, "ujs:submit-button-formaction") ||
                          o.getAttribute("action") ||
                          location.href),
                        "GET" === r.toUpperCase() &&
                          (a = a.replace(/\?.*$/, "")),
                        "multipart/form-data" === o.enctype
                          ? ((n = new FormData(o)),
                            null != e && n.append(e.name, e.value))
                          : (n = h(o, e)),
                        m(o, "ujs:submit-button", null),
                        m(o, "ujs:submit-button-formmethod", null),
                        m(o, "ujs:submit-button-formaction", null))
                      : (n =
                          p(o, b.buttonClickSelector) ||
                          p(o, b.inputChangeSelector)
                            ? ((r = o.getAttribute("data-method")),
                              (a = o.getAttribute("data-url")),
                              h(o, o.getAttribute("data-params")))
                            : ((r = o.getAttribute("data-method")),
                              (a = b.href(o)),
                              o.getAttribute("data-params"))),
                    l({
                      type: r || "GET",
                      url: a,
                      data: n,
                      dataType: i,
                      beforeSend: function (t, e) {
                        return u(o, "ajax:beforeSend", [t, e])
                          ? u(o, "ajax:send", [t])
                          : (u(o, "ajax:stopped"), !1);
                      },
                      success: function () {
                        var t;
                        return (
                          (t =
                            1 <= arguments.length ? v.call(arguments, 0) : []),
                          u(o, "ajax:success", t)
                        );
                      },
                      error: function () {
                        var t;
                        return (
                          (t =
                            1 <= arguments.length ? v.call(arguments, 0) : []),
                          u(o, "ajax:error", t)
                        );
                      },
                      complete: function () {
                        var t;
                        return (
                          (t =
                            1 <= arguments.length ? v.call(arguments, 0) : []),
                          u(o, "ajax:complete", t)
                        );
                      },
                      crossDomain: d(a),
                      withCredentials: null != s && "false" !== s,
                    }),
                    g(t))
                  : (u(o, "ajax:stopped"), !1))
              );
            }),
            (b.formSubmitButtonClick = function () {
              var t, e;
              if ((e = (t = this).form))
                return (
                  t.name &&
                    m(e, "ujs:submit-button", { name: t.name, value: t.value }),
                  m(e, "ujs:formnovalidate-button", t.formNoValidate),
                  m(
                    e,
                    "ujs:submit-button-formaction",
                    t.getAttribute("formaction")
                  ),
                  m(
                    e,
                    "ujs:submit-button-formmethod",
                    t.getAttribute("formmethod")
                  )
                );
            }),
            (b.handleMetaClick = function (t) {
              var e, n, i;
              if (
                ((i = (
                  (n = this).getAttribute("data-method") || "GET"
                ).toUpperCase()),
                (e = n.getAttribute("data-params")),
                (t.metaKey || t.ctrlKey) && "GET" === i && !e)
              )
                return t.stopImmediatePropagation();
            });
        }.call(this),
        function () {
          var t, i, e, n, o, r, a, s, l, u, c, d, f, p;
          (r = b.fire),
            (e = b.delegate),
            (s = b.getData),
            (t = b.$),
            (p = b.refreshCSRFTokens),
            (i = b.CSRFProtection),
            (o = b.enableElement),
            (n = b.disableElement),
            (u = b.handleDisabledElement),
            (l = b.handleConfirm),
            (f = b.handleRemote),
            (a = b.formSubmitButtonClick),
            (c = b.handleMetaClick),
            (d = b.handleMethod),
            "undefined" == typeof jQuery ||
              null === jQuery ||
              null == jQuery.ajax ||
              jQuery.rails ||
              ((jQuery.rails = b),
              jQuery.ajaxPrefilter(function (t, e, n) {
                if (!t.crossDomain) return i(n);
              })),
            (b.start = function () {
              if (window._rails_loaded)
                throw new Error("rails-ujs has already been loaded!");
              return (
                window.addEventListener("pageshow", function () {
                  return (
                    t(b.formEnableSelector).forEach(function (t) {
                      if (s(t, "ujs:disabled")) return o(t);
                    }),
                    t(b.linkDisableSelector).forEach(function (t) {
                      if (s(t, "ujs:disabled")) return o(t);
                    })
                  );
                }),
                e(document, b.linkDisableSelector, "ajax:complete", o),
                e(document, b.linkDisableSelector, "ajax:stopped", o),
                e(document, b.buttonDisableSelector, "ajax:complete", o),
                e(document, b.buttonDisableSelector, "ajax:stopped", o),
                e(document, b.linkClickSelector, "click", u),
                e(document, b.linkClickSelector, "click", l),
                e(document, b.linkClickSelector, "click", c),
                e(document, b.linkClickSelector, "click", n),
                e(document, b.linkClickSelector, "click", f),
                e(document, b.linkClickSelector, "click", d),
                e(document, b.buttonClickSelector, "click", u),
                e(document, b.buttonClickSelector, "click", l),
                e(document, b.buttonClickSelector, "click", n),
                e(document, b.buttonClickSelector, "click", f),
                e(document, b.inputChangeSelector, "change", u),
                e(document, b.inputChangeSelector, "change", l),
                e(document, b.inputChangeSelector, "change", f),
                e(document, b.formSubmitSelector, "submit", u),
                e(document, b.formSubmitSelector, "submit", l),
                e(document, b.formSubmitSelector, "submit", f),
                e(document, b.formSubmitSelector, "submit", function (t) {
                  return setTimeout(function () {
                    return n(t);
                  }, 13);
                }),
                e(document, b.formSubmitSelector, "ajax:send", n),
                e(document, b.formSubmitSelector, "ajax:complete", o),
                e(document, b.formInputClickSelector, "click", u),
                e(document, b.formInputClickSelector, "click", l),
                e(document, b.formInputClickSelector, "click", a),
                document.addEventListener("DOMContentLoaded", p),
                (window._rails_loaded = !0)
              );
            }),
            window.Rails === b &&
              r(document, "rails:attachBindings") &&
              b.start();
        }.call(this));
    }.call(this),
      "object" == typeof module && module.exports
        ? (module.exports = b)
        : "function" == typeof define && define.amd && define(b));
  }.call(this),
  (function (t, e) {
    "object" == typeof module && "object" == typeof module.exports
      ? (module.exports = t.document
          ? e(t, !0)
          : function (t) {
              if (!t.document)
                throw new Error("jQuery requires a window with a document");
              return e(t);
            })
      : e(t);
  })("undefined" != typeof window ? window : this, function (C, t) {
    function s(t) {
      var e = !!t && "length" in t && t.length,
        n = pt.type(t);
      return (
        "function" !== n &&
        !pt.isWindow(t) &&
        ("array" === n ||
          0 === e ||
          ("number" == typeof e && 0 < e && e - 1 in t))
      );
    }
    function e(t, n, i) {
      if (pt.isFunction(n))
        return pt.grep(t, function (t, e) {
          return !!n.call(t, e, t) !== i;
        });
      if (n.nodeType)
        return pt.grep(t, function (t) {
          return (t === n) !== i;
        });
      if ("string" == typeof n) {
        if (Ct.test(n)) return pt.filter(n, t, i);
        n = pt.filter(n, t);
      }
      return pt.grep(t, function (t) {
        return -1 < pt.inArray(t, n) !== i;
      });
    }
    function n(t, e) {
      for (; (t = t[e]) && 1 !== t.nodeType; );
      return t;
    }
    function c(t) {
      var n = {};
      return (
        pt.each(t.match(It) || [], function (t, e) {
          n[e] = !0;
        }),
        n
      );
    }
    function o() {
      it.addEventListener
        ? (it.removeEventListener("DOMContentLoaded", r),
          C.removeEventListener("load", r))
        : (it.detachEvent("onreadystatechange", r), C.detachEvent("onload", r));
    }
    function r() {
      (it.addEventListener ||
        "load" === C.event.type ||
        "complete" === it.readyState) &&
        (o(), pt.ready());
    }
    function l(t, e, n) {
      if (n === undefined && 1 === t.nodeType) {
        var i = "data-" + e.replace(Lt, "-$1").toLowerCase();
        if ("string" == typeof (n = t.getAttribute(i))) {
          try {
            n =
              "true" === n ||
              ("false" !== n &&
                ("null" === n
                  ? null
                  : +n + "" === n
                  ? +n
                  : Ot.test(n)
                  ? pt.parseJSON(n)
                  : n));
          } catch (o) {}
          pt.data(t, e, n);
        } else n = undefined;
      }
      return n;
    }
    function u(t) {
      var e;
      for (e in t)
        if (("data" !== e || !pt.isEmptyObject(t[e])) && "toJSON" !== e)
          return !1;
      return !0;
    }
    function i(t, e, n, i) {
      if (jt(t)) {
        var o,
          r,
          a = pt.expando,
          s = t.nodeType,
          l = s ? pt.cache : t,
          u = s ? t[a] : t[a] && a;
        if (
          (u && l[u] && (i || l[u].data)) ||
          n !== undefined ||
          "string" != typeof e
        )
          return (
            u || (u = s ? (t[a] = nt.pop() || pt.guid++) : a),
            l[u] || (l[u] = s ? {} : { toJSON: pt.noop }),
            ("object" != typeof e && "function" != typeof e) ||
              (i
                ? (l[u] = pt.extend(l[u], e))
                : (l[u].data = pt.extend(l[u].data, e))),
            (r = l[u]),
            i || (r.data || (r.data = {}), (r = r.data)),
            n !== undefined && (r[pt.camelCase(e)] = n),
            "string" == typeof e
              ? null == (o = r[e]) && (o = r[pt.camelCase(e)])
              : (o = r),
            o
          );
      }
    }
    function a(t, e, n) {
      if (jt(t)) {
        var i,
          o,
          r = t.nodeType,
          a = r ? pt.cache : t,
          s = r ? t[pt.expando] : pt.expando;
        if (a[s]) {
          if (e && (i = n ? a[s] : a[s].data)) {
            o = (e = pt.isArray(e)
              ? e.concat(pt.map(e, pt.camelCase))
              : e in i
              ? [e]
              : (e = pt.camelCase(e)) in i
              ? [e]
              : e.split(" ")).length;
            for (; o--; ) delete i[e[o]];
            if (n ? !u(i) : !pt.isEmptyObject(i)) return;
          }
          (n || (delete a[s].data, u(a[s]))) &&
            (r
              ? pt.cleanData([t], !0)
              : dt.deleteExpando || a != a.window
              ? delete a[s]
              : (a[s] = undefined));
        }
      }
    }
    function d(t, e, n, i) {
      var o,
        r = 1,
        a = 20,
        s = i
          ? function () {
              return i.cur();
            }
          : function () {
              return pt.css(t, e, "");
            },
        l = s(),
        u = (n && n[3]) || (pt.cssNumber[e] ? "" : "px"),
        c = (pt.cssNumber[e] || ("px" !== u && +l)) && qt.exec(pt.css(t, e));
      if (c && c[3] !== u)
        for (
          u = u || c[3], n = n || [], c = +l || 1;
          (c /= r = r || ".5"),
            pt.style(t, e, c + u),
            r !== (r = s() / l) && 1 !== r && --a;

        );
      return (
        n &&
          ((c = +c || +l || 0),
          (o = n[1] ? c + (n[1] + 1) * n[2] : +n[2]),
          i && ((i.unit = u), (i.start = c), (i.end = o))),
        o
      );
    }
    function g(t) {
      var e = Xt.split("|"),
        n = t.createDocumentFragment();
      if (n.createElement) for (; e.length; ) n.createElement(e.pop());
      return n;
    }
    function v(t, e) {
      var n,
        i,
        o = 0,
        r =
          "undefined" != typeof t.getElementsByTagName
            ? t.getElementsByTagName(e || "*")
            : "undefined" != typeof t.querySelectorAll
            ? t.querySelectorAll(e || "*")
            : undefined;
      if (!r)
        for (r = [], n = t.childNodes || t; null != (i = n[o]); o++)
          !e || pt.nodeName(i, e) ? r.push(i) : pt.merge(r, v(i, e));
      return e === undefined || (e && pt.nodeName(t, e)) ? pt.merge([t], r) : r;
    }
    function b(t, e) {
      for (var n, i = 0; null != (n = t[i]); i++)
        pt._data(n, "globalEval", !e || pt._data(e[i], "globalEval"));
    }
    function y(t) {
      Wt.test(t.type) && (t.defaultChecked = t.checked);
    }
    function m(t, e, n, i, o) {
      for (
        var r, a, s, l, u, c, d, f = t.length, p = g(e), h = [], m = 0;
        m < f;
        m++
      )
        if ((a = t[m]) || 0 === a)
          if ("object" === pt.type(a)) pt.merge(h, a.nodeType ? [a] : a);
          else if (Gt.test(a)) {
            for (
              l = l || p.appendChild(e.createElement("div")),
                u = (zt.exec(a) || ["", ""])[1].toLowerCase(),
                d = Vt[u] || Vt._default,
                l.innerHTML = d[1] + pt.htmlPrefilter(a) + d[2],
                r = d[0];
              r--;

            )
              l = l.lastChild;
            if (
              (!dt.leadingWhitespace &&
                Qt.test(a) &&
                h.push(e.createTextNode(Qt.exec(a)[0])),
              !dt.tbody)
            )
              for (
                r =
                  (a =
                    "table" !== u || Kt.test(a)
                      ? "<table>" !== d[1] || Kt.test(a)
                        ? 0
                        : l
                      : l.firstChild) && a.childNodes.length;
                r--;

              )
                pt.nodeName((c = a.childNodes[r]), "tbody") &&
                  !c.childNodes.length &&
                  a.removeChild(c);
            for (pt.merge(h, l.childNodes), l.textContent = ""; l.firstChild; )
              l.removeChild(l.firstChild);
            l = p.lastChild;
          } else h.push(e.createTextNode(a));
      for (
        l && p.removeChild(l),
          dt.appendChecked || pt.grep(v(h, "input"), y),
          m = 0;
        (a = h[m++]);

      )
        if (i && -1 < pt.inArray(a, i)) o && o.push(a);
        else if (
          ((s = pt.contains(a.ownerDocument, a)),
          (l = v(p.appendChild(a), "script")),
          s && b(l),
          n)
        )
          for (r = 0; (a = l[r++]); ) Ut.test(a.type || "") && n.push(a);
      return (l = null), p;
    }
    function f() {
      return !0;
    }
    function p() {
      return !1;
    }
    function h() {
      try {
        return it.activeElement;
      } catch (t) {}
    }
    function x(t, e, n, i, o, r) {
      var a, s;
      if ("object" == typeof e) {
        for (s in ("string" != typeof n && ((i = i || n), (n = undefined)), e))
          x(t, s, n, i, e[s], r);
        return t;
      }
      if (
        (null == i && null == o
          ? ((o = n), (i = n = undefined))
          : null == o &&
            ("string" == typeof n
              ? ((o = i), (i = undefined))
              : ((o = i), (i = n), (n = undefined))),
        !1 === o)
      )
        o = p;
      else if (!o) return t;
      return (
        1 === r &&
          ((a = o),
          ((o = function (t) {
            return pt().off(t), a.apply(this, arguments);
          }).guid = a.guid || (a.guid = pt.guid++))),
        t.each(function () {
          pt.event.add(this, e, o, i, n);
        })
      );
    }
    function w(t, e) {
      return pt.nodeName(t, "table") &&
        pt.nodeName(11 !== e.nodeType ? e : e.firstChild, "tr")
        ? t.getElementsByTagName("tbody")[0] ||
            t.appendChild(t.ownerDocument.createElement("tbody"))
        : t;
    }
    function T(t) {
      return (t.type = (null !== pt.find.attr(t, "type")) + "/" + t.type), t;
    }
    function k(t) {
      var e = se.exec(t.type);
      return e ? (t.type = e[1]) : t.removeAttribute("type"), t;
    }
    function S(t, e) {
      if (1 === e.nodeType && pt.hasData(t)) {
        var n,
          i,
          o,
          r = pt._data(t),
          a = pt._data(e, r),
          s = r.events;
        if (s)
          for (n in (delete a.handle, (a.events = {}), s))
            for (i = 0, o = s[n].length; i < o; i++)
              pt.event.add(e, n, s[n][i]);
        a.data && (a.data = pt.extend({}, a.data));
      }
    }
    function E(t, e) {
      var n, i, o;
      if (1 === e.nodeType) {
        if (
          ((n = e.nodeName.toLowerCase()), !dt.noCloneEvent && e[pt.expando])
        ) {
          for (i in (o = pt._data(e)).events) pt.removeEvent(e, i, o.handle);
          e.removeAttribute(pt.expando);
        }
        "script" === n && e.text !== t.text
          ? ((T(e).text = t.text), k(e))
          : "object" === n
          ? (e.parentNode && (e.outerHTML = t.outerHTML),
            dt.html5Clone &&
              t.innerHTML &&
              !pt.trim(e.innerHTML) &&
              (e.innerHTML = t.innerHTML))
          : "input" === n && Wt.test(t.type)
          ? ((e.defaultChecked = e.checked = t.checked),
            e.value !== t.value && (e.value = t.value))
          : "option" === n
          ? (e.defaultSelected = e.selected = t.defaultSelected)
          : ("input" !== n && "textarea" !== n) ||
            (e.defaultValue = t.defaultValue);
      }
    }
    function D(n, i, o, r) {
      i = rt.apply([], i);
      var t,
        e,
        a,
        s,
        l,
        u,
        c = 0,
        d = n.length,
        f = d - 1,
        p = i[0],
        h = pt.isFunction(p);
      if (h || (1 < d && "string" == typeof p && !dt.checkClone && ae.test(p)))
        return n.each(function (t) {
          var e = n.eq(t);
          h && (i[0] = p.call(this, t, e.html())), D(e, i, o, r);
        });
      if (
        d &&
        ((t = (u = m(i, n[0].ownerDocument, !1, n, r)).firstChild),
        1 === u.childNodes.length && (u = t),
        t || r)
      ) {
        for (a = (s = pt.map(v(u, "script"), T)).length; c < d; c++)
          (e = u),
            c !== f &&
              ((e = pt.clone(e, !0, !0)), a && pt.merge(s, v(e, "script"))),
            o.call(n[c], e, c);
        if (a)
          for (
            l = s[s.length - 1].ownerDocument, pt.map(s, k), c = 0;
            c < a;
            c++
          )
            (e = s[c]),
              Ut.test(e.type || "") &&
                !pt._data(e, "globalEval") &&
                pt.contains(l, e) &&
                (e.src
                  ? pt._evalUrl && pt._evalUrl(e.src)
                  : pt.globalEval(
                      (e.text || e.textContent || e.innerHTML || "").replace(
                        le,
                        ""
                      )
                    ));
        u = t = null;
      }
      return n;
    }
    function N(t, e, n) {
      for (var i, o = e ? pt.filter(e, t) : t, r = 0; null != (i = o[r]); r++)
        n || 1 !== i.nodeType || pt.cleanData(v(i)),
          i.parentNode &&
            (n && pt.contains(i.ownerDocument, i) && b(v(i, "script")),
            i.parentNode.removeChild(i));
      return t;
    }
    function $(t, e) {
      var n = pt(e.createElement(t)).appendTo(e.body),
        i = pt.css(n[0], "display");
      return n.detach(), i;
    }
    function I(t) {
      var e = it,
        n = de[t];
      return (
        n ||
          (("none" !== (n = $(t, e)) && n) ||
            ((e = (
              (ce = (
                ce || pt("<iframe frameborder='0' width='0' height='0'/>")
              ).appendTo(e.documentElement))[0].contentWindow ||
              ce[0].contentDocument
            ).document).write(),
            e.close(),
            (n = $(t, e)),
            ce.detach()),
          (de[t] = n)),
        n
      );
    }
    function A(t, e) {
      return {
        get: function () {
          if (!t()) return (this.get = e).apply(this, arguments);
          delete this.get;
        },
      };
    }
    function j(t) {
      if (t in Ee) return t;
      for (var e = t.charAt(0).toUpperCase() + t.slice(1), n = Se.length; n--; )
        if ((t = Se[n] + e) in Ee) return t;
    }
    function O(t, e) {
      for (var n, i, o, r = [], a = 0, s = t.length; a < s; a++)
        (i = t[a]).style &&
          ((r[a] = pt._data(i, "olddisplay")),
          (n = i.style.display),
          e
            ? (r[a] || "none" !== n || (i.style.display = ""),
              "" === i.style.display &&
                Bt(i) &&
                (r[a] = pt._data(i, "olddisplay", I(i.nodeName))))
            : ((o = Bt(i)),
              ((n && "none" !== n) || !o) &&
                pt._data(i, "olddisplay", o ? n : pt.css(i, "display"))));
      for (a = 0; a < s; a++)
        (i = t[a]).style &&
          ((e && "none" !== i.style.display && "" !== i.style.display) ||
            (i.style.display = e ? r[a] || "" : "none"));
      return t;
    }
    function L(t, e, n) {
      var i = Te.exec(e);
      return i ? Math.max(0, i[1] - (n || 0)) + (i[2] || "px") : e;
    }
    function H(t, e, n, i, o) {
      for (
        var r = n === (i ? "border" : "content") ? 4 : "width" === e ? 1 : 0,
          a = 0;
        r < 4;
        r += 2
      )
        "margin" === n && (a += pt.css(t, n + _t[r], !0, o)),
          i
            ? ("content" === n && (a -= pt.css(t, "padding" + _t[r], !0, o)),
              "margin" !== n &&
                (a -= pt.css(t, "border" + _t[r] + "Width", !0, o)))
            : ((a += pt.css(t, "padding" + _t[r], !0, o)),
              "padding" !== n &&
                (a += pt.css(t, "border" + _t[r] + "Width", !0, o)));
      return a;
    }
    function R(t, e, n) {
      var i = !0,
        o = "width" === e ? t.offsetWidth : t.offsetHeight,
        r = ge(t),
        a = dt.boxSizing && "border-box" === pt.css(t, "boxSizing", !1, r);
      if (o <= 0 || null == o) {
        if (
          (((o = ve(t, e, r)) < 0 || null == o) && (o = t.style[e]), pe.test(o))
        )
          return o;
        (i = a && (dt.boxSizingReliable() || o === t.style[e])),
          (o = parseFloat(o) || 0);
      }
      return o + H(t, e, n || (a ? "border" : "content"), i, r) + "px";
    }
    function P(t, e, n, i, o) {
      return new P.prototype.init(t, e, n, i, o);
    }
    function M() {
      return (
        C.setTimeout(function () {
          De = undefined;
        }),
        (De = pt.now())
      );
    }
    function q(t, e) {
      var n,
        i = { height: t },
        o = 0;
      for (e = e ? 1 : 0; o < 4; o += 2 - e)
        i["margin" + (n = _t[o])] = i["padding" + n] = t;
      return e && (i.opacity = i.width = t), i;
    }
    function _(t, e, n) {
      for (
        var i,
          o = (W.tweeners[e] || []).concat(W.tweeners["*"]),
          r = 0,
          a = o.length;
        r < a;
        r++
      )
        if ((i = o[r].call(n, e, t))) return i;
    }
    function B(e, t, n) {
      var i,
        o,
        r,
        a,
        s,
        l,
        u,
        c = this,
        d = {},
        f = e.style,
        p = e.nodeType && Bt(e),
        h = pt._data(e, "fxshow");
      for (i in (n.queue ||
        (null == (s = pt._queueHooks(e, "fx")).unqueued &&
          ((s.unqueued = 0),
          (l = s.empty.fire),
          (s.empty.fire = function () {
            s.unqueued || l();
          })),
        s.unqueued++,
        c.always(function () {
          c.always(function () {
            s.unqueued--, pt.queue(e, "fx").length || s.empty.fire();
          });
        })),
      1 === e.nodeType &&
        ("height" in t || "width" in t) &&
        ((n.overflow = [f.overflow, f.overflowX, f.overflowY]),
        "inline" ===
          ("none" === (u = pt.css(e, "display"))
            ? pt._data(e, "olddisplay") || I(e.nodeName)
            : u) &&
          "none" === pt.css(e, "float") &&
          (dt.inlineBlockNeedsLayout && "inline" !== I(e.nodeName)
            ? (f.zoom = 1)
            : (f.display = "inline-block"))),
      n.overflow &&
        ((f.overflow = "hidden"),
        dt.shrinkWrapBlocks() ||
          c.always(function () {
            (f.overflow = n.overflow[0]),
              (f.overflowX = n.overflow[1]),
              (f.overflowY = n.overflow[2]);
          })),
      t))
        if (((o = t[i]), Le.exec(o))) {
          if (
            (delete t[i],
            (r = r || "toggle" === o),
            o === (p ? "hide" : "show"))
          ) {
            if ("show" !== o || !h || h[i] === undefined) continue;
            p = !0;
          }
          d[i] = (h && h[i]) || pt.style(e, i);
        } else u = undefined;
      if (pt.isEmptyObject(d))
        "inline" === ("none" === u ? I(e.nodeName) : u) && (f.display = u);
      else
        for (i in (h
          ? "hidden" in h && (p = h.hidden)
          : (h = pt._data(e, "fxshow", {})),
        r && (h.hidden = !p),
        p
          ? pt(e).show()
          : c.done(function () {
              pt(e).hide();
            }),
        c.done(function () {
          var t;
          for (t in (pt._removeData(e, "fxshow"), d)) pt.style(e, t, d[t]);
        }),
        d))
          (a = _(p ? h[i] : 0, i, c)),
            i in h ||
              ((h[i] = a.start),
              p &&
                ((a.end = a.start),
                (a.start = "width" === i || "height" === i ? 1 : 0)));
    }
    function F(t, e) {
      var n, i, o, r, a;
      for (n in t)
        if (
          ((o = e[(i = pt.camelCase(n))]),
          (r = t[n]),
          pt.isArray(r) && ((o = r[1]), (r = t[n] = r[0])),
          n !== i && ((t[i] = r), delete t[n]),
          (a = pt.cssHooks[i]) && "expand" in a)
        )
          for (n in ((r = a.expand(r)), delete t[i], r))
            n in t || ((t[n] = r[n]), (e[n] = o));
        else e[i] = o;
    }
    function W(r, t, e) {
      var n,
        a,
        i = 0,
        o = W.prefilters.length,
        s = pt.Deferred().always(function () {
          delete l.elem;
        }),
        l = function () {
          if (a) return !1;
          for (
            var t = De || M(),
              e = Math.max(0, u.startTime + u.duration - t),
              n = 1 - (e / u.duration || 0),
              i = 0,
              o = u.tweens.length;
            i < o;
            i++
          )
            u.tweens[i].run(n);
          return (
            s.notifyWith(r, [u, n, e]),
            n < 1 && o ? e : (s.resolveWith(r, [u]), !1)
          );
        },
        u = s.promise({
          elem: r,
          props: pt.extend({}, t),
          opts: pt.extend(
            !0,
            { specialEasing: {}, easing: pt.easing._default },
            e
          ),
          originalProperties: t,
          originalOptions: e,
          startTime: De || M(),
          duration: e.duration,
          tweens: [],
          createTween: function (t, e) {
            var n = pt.Tween(
              r,
              u.opts,
              t,
              e,
              u.opts.specialEasing[t] || u.opts.easing
            );
            return u.tweens.push(n), n;
          },
          stop: function (t) {
            var e = 0,
              n = t ? u.tweens.length : 0;
            if (a) return this;
            for (a = !0; e < n; e++) u.tweens[e].run(1);
            return (
              t
                ? (s.notifyWith(r, [u, 1, 0]), s.resolveWith(r, [u, t]))
                : s.rejectWith(r, [u, t]),
              this
            );
          },
        }),
        c = u.props;
      for (F(c, u.opts.specialEasing); i < o; i++)
        if ((n = W.prefilters[i].call(u, r, c, u.opts)))
          return (
            pt.isFunction(n.stop) &&
              (pt._queueHooks(u.elem, u.opts.queue).stop = pt.proxy(n.stop, n)),
            n
          );
      return (
        pt.map(c, _, u),
        pt.isFunction(u.opts.start) && u.opts.start.call(r, u),
        pt.fx.timer(pt.extend(l, { elem: r, anim: u, queue: u.opts.queue })),
        u
          .progress(u.opts.progress)
          .done(u.opts.done, u.opts.complete)
          .fail(u.opts.fail)
          .always(u.opts.always)
      );
    }
    function z(t) {
      return pt.attr(t, "class") || "";
    }
    function U(r) {
      return function (t, e) {
        "string" != typeof t && ((e = t), (t = "*"));
        var n,
          i = 0,
          o = t.toLowerCase().match(It) || [];
        if (pt.isFunction(e))
          for (; (n = o[i++]); )
            "+" === n.charAt(0)
              ? ((n = n.slice(1) || "*"), (r[n] = r[n] || []).unshift(e))
              : (r[n] = r[n] || []).push(e);
      };
    }
    function Q(e, o, r, a) {
      function s(t) {
        var i;
        return (
          (l[t] = !0),
          pt.each(e[t] || [], function (t, e) {
            var n = e(o, r, a);
            return "string" != typeof n || u || l[n]
              ? u
                ? !(i = n)
                : void 0
              : (o.dataTypes.unshift(n), s(n), !1);
          }),
          i
        );
      }
      var l = {},
        u = e === an;
      return s(o.dataTypes[0]) || (!l["*"] && s("*"));
    }
    function X(t, e) {
      var n,
        i,
        o = pt.ajaxSettings.flatOptions || {};
      for (i in e) e[i] !== undefined && ((o[i] ? t : n || (n = {}))[i] = e[i]);
      return n && pt.extend(!0, t, n), t;
    }
    function V(t, e, n) {
      for (var i, o, r, a, s = t.contents, l = t.dataTypes; "*" === l[0]; )
        l.shift(),
          o === undefined &&
            (o = t.mimeType || e.getResponseHeader("Content-Type"));
      if (o)
        for (a in s)
          if (s[a] && s[a].test(o)) {
            l.unshift(a);
            break;
          }
      if (l[0] in n) r = l[0];
      else {
        for (a in n) {
          if (!l[0] || t.converters[a + " " + l[0]]) {
            r = a;
            break;
          }
          i || (i = a);
        }
        r = r || i;
      }
      if (r) return r !== l[0] && l.unshift(r), n[r];
    }
    function G(t, e, n, i) {
      var o,
        r,
        a,
        s,
        l,
        u = {},
        c = t.dataTypes.slice();
      if (c[1]) for (a in t.converters) u[a.toLowerCase()] = t.converters[a];
      for (r = c.shift(); r; )
        if (
          (t.responseFields[r] && (n[t.responseFields[r]] = e),
          !l && i && t.dataFilter && (e = t.dataFilter(e, t.dataType)),
          (l = r),
          (r = c.shift()))
        )
          if ("*" === r) r = l;
          else if ("*" !== l && l !== r) {
            if (!(a = u[l + " " + r] || u["* " + r]))
              for (o in u)
                if (
                  (s = o.split(" "))[1] === r &&
                  (a = u[l + " " + s[0]] || u["* " + s[0]])
                ) {
                  !0 === a
                    ? (a = u[o])
                    : !0 !== u[o] && ((r = s[0]), c.unshift(s[1]));
                  break;
                }
            if (!0 !== a)
              if (a && t["throws"]) e = a(e);
              else
                try {
                  e = a(e);
                } catch (d) {
                  return {
                    state: "parsererror",
                    error: a ? d : "No conversion from " + l + " to " + r,
                  };
                }
          }
      return { state: "success", data: e };
    }
    function K(t) {
      return (t.style && t.style.display) || pt.css(t, "display");
    }
    function J(t) {
      if (!pt.contains(t.ownerDocument || it, t)) return !0;
      for (; t && 1 === t.nodeType; ) {
        if ("none" === K(t) || "hidden" === t.type) return !0;
        t = t.parentNode;
      }
      return !1;
    }
    function Y(n, t, i, o) {
      var e;
      if (pt.isArray(t))
        pt.each(t, function (t, e) {
          i || dn.test(n)
            ? o(n, e)
            : Y(
                n + "[" + ("object" == typeof e && null != e ? t : "") + "]",
                e,
                i,
                o
              );
        });
      else if (i || "object" !== pt.type(t)) o(n, t);
      else for (e in t) Y(n + "[" + e + "]", t[e], i, o);
    }
    function Z() {
      try {
        return new C.XMLHttpRequest();
      } catch (t) {}
    }
    function tt() {
      try {
        return new C.ActiveXObject("Microsoft.XMLHTTP");
      } catch (t) {}
    }
    function et(t) {
      return pt.isWindow(t)
        ? t
        : 9 === t.nodeType && (t.defaultView || t.parentWindow);
    }
    var nt = [],
      it = C.document,
      ot = nt.slice,
      rt = nt.concat,
      at = nt.push,
      st = nt.indexOf,
      lt = {},
      ut = lt.toString,
      ct = lt.hasOwnProperty,
      dt = {},
      ft = "1.12.4",
      pt = function (t, e) {
        return new pt.fn.init(t, e);
      },
      ht = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
      mt = /^-ms-/,
      gt = /-([\da-z])/gi,
      vt = function (t, e) {
        return e.toUpperCase();
      };
    (pt.fn = pt.prototype = {
      jquery: ft,
      constructor: pt,
      selector: "",
      length: 0,
      toArray: function () {
        return ot.call(this);
      },
      get: function (t) {
        return null != t
          ? t < 0
            ? this[t + this.length]
            : this[t]
          : ot.call(this);
      },
      pushStack: function (t) {
        var e = pt.merge(this.constructor(), t);
        return (e.prevObject = this), (e.context = this.context), e;
      },
      each: function (t) {
        return pt.each(this, t);
      },
      map: function (n) {
        return this.pushStack(
          pt.map(this, function (t, e) {
            return n.call(t, e, t);
          })
        );
      },
      slice: function () {
        return this.pushStack(ot.apply(this, arguments));
      },
      first: function () {
        return this.eq(0);
      },
      last: function () {
        return this.eq(-1);
      },
      eq: function (t) {
        var e = this.length,
          n = +t + (t < 0 ? e : 0);
        return this.pushStack(0 <= n && n < e ? [this[n]] : []);
      },
      end: function () {
        return this.prevObject || this.constructor();
      },
      push: at,
      sort: nt.sort,
      splice: nt.splice,
    }),
      (pt.extend = pt.fn.extend = function (t) {
        var e,
          n,
          i,
          o,
          r,
          a,
          s = t || {},
          l = 1,
          u = arguments.length,
          c = !1;
        for (
          "boolean" == typeof s && ((c = s), (s = arguments[l] || {}), l++),
            "object" == typeof s || pt.isFunction(s) || (s = {}),
            l === u && ((s = this), l--);
          l < u;
          l++
        )
          if (null != (r = arguments[l]))
            for (o in r)
              (e = s[o]),
                s !== (i = r[o]) &&
                  (c && i && (pt.isPlainObject(i) || (n = pt.isArray(i)))
                    ? ((a = n
                        ? ((n = !1), e && pt.isArray(e) ? e : [])
                        : e && pt.isPlainObject(e)
                        ? e
                        : {}),
                      (s[o] = pt.extend(c, a, i)))
                    : i !== undefined && (s[o] = i));
        return s;
      }),
      pt.extend({
        expando: "jQuery" + (ft + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function (t) {
          throw new Error(t);
        },
        noop: function () {},
        isFunction: function (t) {
          return "function" === pt.type(t);
        },
        isArray:
          Array.isArray ||
          function (t) {
            return "array" === pt.type(t);
          },
        isWindow: function (t) {
          return null != t && t == t.window;
        },
        isNumeric: function (t) {
          var e = t && t.toString();
          return !pt.isArray(t) && 0 <= e - parseFloat(e) + 1;
        },
        isEmptyObject: function (t) {
          var e;
          for (e in t) return !1;
          return !0;
        },
        isPlainObject: function (t) {
          var e;
          if (!t || "object" !== pt.type(t) || t.nodeType || pt.isWindow(t))
            return !1;
          try {
            if (
              t.constructor &&
              !ct.call(t, "constructor") &&
              !ct.call(t.constructor.prototype, "isPrototypeOf")
            )
              return !1;
          } catch (n) {
            return !1;
          }
          if (!dt.ownFirst) for (e in t) return ct.call(t, e);
          for (e in t);
          return e === undefined || ct.call(t, e);
        },
        type: function (t) {
          return null == t
            ? t + ""
            : "object" == typeof t || "function" == typeof t
            ? lt[ut.call(t)] || "object"
            : typeof t;
        },
        globalEval: function (t) {
          t &&
            pt.trim(t) &&
            (
              C.execScript ||
              function (t) {
                C.eval.call(C, t);
              }
            )(t);
        },
        camelCase: function (t) {
          return t.replace(mt, "ms-").replace(gt, vt);
        },
        nodeName: function (t, e) {
          return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase();
        },
        each: function (t, e) {
          var n,
            i = 0;
          if (s(t))
            for (n = t.length; i < n && !1 !== e.call(t[i], i, t[i]); i++);
          else for (i in t) if (!1 === e.call(t[i], i, t[i])) break;
          return t;
        },
        trim: function (t) {
          return null == t ? "" : (t + "").replace(ht, "");
        },
        makeArray: function (t, e) {
          var n = e || [];
          return (
            null != t &&
              (s(Object(t))
                ? pt.merge(n, "string" == typeof t ? [t] : t)
                : at.call(n, t)),
            n
          );
        },
        inArray: function (t, e, n) {
          var i;
          if (e) {
            if (st) return st.call(e, t, n);
            for (
              i = e.length, n = n ? (n < 0 ? Math.max(0, i + n) : n) : 0;
              n < i;
              n++
            )
              if (n in e && e[n] === t) return n;
          }
          return -1;
        },
        merge: function (t, e) {
          for (var n = +e.length, i = 0, o = t.length; i < n; ) t[o++] = e[i++];
          if (n != n) for (; e[i] !== undefined; ) t[o++] = e[i++];
          return (t.length = o), t;
        },
        grep: function (t, e, n) {
          for (var i = [], o = 0, r = t.length, a = !n; o < r; o++)
            !e(t[o], o) !== a && i.push(t[o]);
          return i;
        },
        map: function (t, e, n) {
          var i,
            o,
            r = 0,
            a = [];
          if (s(t))
            for (i = t.length; r < i; r++)
              null != (o = e(t[r], r, n)) && a.push(o);
          else for (r in t) null != (o = e(t[r], r, n)) && a.push(o);
          return rt.apply([], a);
        },
        guid: 1,
        proxy: function (t, e) {
          var n, i, o;
          return (
            "string" == typeof e && ((o = t[e]), (e = t), (t = o)),
            pt.isFunction(t)
              ? ((n = ot.call(arguments, 2)),
                ((i = function () {
                  return t.apply(e || this, n.concat(ot.call(arguments)));
                }).guid = t.guid = t.guid || pt.guid++),
                i)
              : undefined
          );
        },
        now: function () {
          return +new Date();
        },
        support: dt,
      }),
      "function" == typeof Symbol &&
        (pt.fn[Symbol.iterator] = nt[Symbol.iterator]),
      pt.each(
        "Boolean Number String Function Array Date RegExp Object Error Symbol".split(
          " "
        ),
        function (t, e) {
          lt["[object " + e + "]"] = e.toLowerCase();
        }
      );
    var bt = (function (n) {
      function x(t, e, n, i) {
        var o,
          r,
          a,
          s,
          l,
          u,
          c,
          d,
          f = e && e.ownerDocument,
          p = e ? e.nodeType : 9;
        if (
          ((n = n || []),
          "string" != typeof t || !t || (1 !== p && 9 !== p && 11 !== p))
        )
          return n;
        if (
          !i &&
          ((e ? e.ownerDocument || e : _) !== j && A(e), (e = e || j), L)
        ) {
          if (11 !== p && (u = vt.exec(t)))
            if ((o = u[1])) {
              if (9 === p) {
                if (!(a = e.getElementById(o))) return n;
                if (a.id === o) return n.push(a), n;
              } else if (
                f &&
                (a = f.getElementById(o)) &&
                M(e, a) &&
                a.id === o
              )
                return n.push(a), n;
            } else {
              if (u[2]) return Y.apply(n, e.getElementsByTagName(t)), n;
              if (
                (o = u[3]) &&
                v.getElementsByClassName &&
                e.getElementsByClassName
              )
                return Y.apply(n, e.getElementsByClassName(o)), n;
            }
          if (v.qsa && !U[t + " "] && (!H || !H.test(t))) {
            if (1 !== p) (f = e), (d = t);
            else if ("object" !== e.nodeName.toLowerCase()) {
              for (
                (s = e.getAttribute("id"))
                  ? (s = s.replace(yt, "\\$&"))
                  : e.setAttribute("id", (s = q)),
                  r = (c = S(t)).length,
                  l = ft.test(s) ? "#" + s : "[id='" + s + "']";
                r--;

              )
                c[r] = l + " " + g(c[r]);
              (d = c.join(",")), (f = (bt.test(t) && m(e.parentNode)) || e);
            }
            if (d)
              try {
                return Y.apply(n, f.querySelectorAll(d)), n;
              } catch (h) {
              } finally {
                s === q && e.removeAttribute("id");
              }
          }
        }
        return D(t.replace(st, "$1"), e, n, i);
      }
      function t() {
        function n(t, e) {
          return (
            i.push(t + " ") > T.cacheLength && delete n[i.shift()],
            (n[t + " "] = e)
          );
        }
        var i = [];
        return n;
      }
      function l(t) {
        return (t[q] = !0), t;
      }
      function o(t) {
        var e = j.createElement("div");
        try {
          return !!t(e);
        } catch (n) {
          return !1;
        } finally {
          e.parentNode && e.parentNode.removeChild(e), (e = null);
        }
      }
      function e(t, e) {
        for (var n = t.split("|"), i = n.length; i--; ) T.attrHandle[n[i]] = e;
      }
      function u(t, e) {
        var n = e && t,
          i =
            n &&
            1 === t.nodeType &&
            1 === e.nodeType &&
            (~e.sourceIndex || X) - (~t.sourceIndex || X);
        if (i) return i;
        if (n) for (; (n = n.nextSibling); ) if (n === e) return -1;
        return t ? 1 : -1;
      }
      function i(e) {
        return function (t) {
          return "input" === t.nodeName.toLowerCase() && t.type === e;
        };
      }
      function r(n) {
        return function (t) {
          var e = t.nodeName.toLowerCase();
          return ("input" === e || "button" === e) && t.type === n;
        };
      }
      function a(a) {
        return l(function (r) {
          return (
            (r = +r),
            l(function (t, e) {
              for (var n, i = a([], t.length, r), o = i.length; o--; )
                t[(n = i[o])] && (t[n] = !(e[n] = t[n]));
            })
          );
        });
      }
      function m(t) {
        return t && "undefined" != typeof t.getElementsByTagName && t;
      }
      function s() {}
      function g(t) {
        for (var e = 0, n = t.length, i = ""; e < n; e++) i += t[e].value;
        return i;
      }
      function d(s, t, e) {
        var l = t.dir,
          u = e && "parentNode" === l,
          c = F++;
        return t.first
          ? function (t, e, n) {
              for (; (t = t[l]); ) if (1 === t.nodeType || u) return s(t, e, n);
            }
          : function (t, e, n) {
              var i,
                o,
                r,
                a = [B, c];
              if (n) {
                for (; (t = t[l]); )
                  if ((1 === t.nodeType || u) && s(t, e, n)) return !0;
              } else
                for (; (t = t[l]); )
                  if (1 === t.nodeType || u) {
                    if (
                      (i = (o =
                        (r = t[q] || (t[q] = {}))[t.uniqueID] ||
                        (r[t.uniqueID] = {}))[l]) &&
                      i[0] === B &&
                      i[1] === c
                    )
                      return (a[2] = i[2]);
                    if (((o[l] = a)[2] = s(t, e, n))) return !0;
                  }
            };
      }
      function f(o) {
        return 1 < o.length
          ? function (t, e, n) {
              for (var i = o.length; i--; ) if (!o[i](t, e, n)) return !1;
              return !0;
            }
          : o[0];
      }
      function b(t, e, n) {
        for (var i = 0, o = e.length; i < o; i++) x(t, e[i], n);
        return n;
      }
      function w(t, e, n, i, o) {
        for (var r, a = [], s = 0, l = t.length, u = null != e; s < l; s++)
          (r = t[s]) && ((n && !n(r, i, o)) || (a.push(r), u && e.push(s)));
        return a;
      }
      function y(p, h, m, g, v, t) {
        return (
          g && !g[q] && (g = y(g)),
          v && !v[q] && (v = y(v, t)),
          l(function (t, e, n, i) {
            var o,
              r,
              a,
              s = [],
              l = [],
              u = e.length,
              c = t || b(h || "*", n.nodeType ? [n] : n, []),
              d = !p || (!t && h) ? c : w(c, s, p, n, i),
              f = m ? (v || (t ? p : u || g) ? [] : e) : d;
            if ((m && m(d, f, n, i), g))
              for (o = w(f, l), g(o, [], n, i), r = o.length; r--; )
                (a = o[r]) && (f[l[r]] = !(d[l[r]] = a));
            if (t) {
              if (v || p) {
                if (v) {
                  for (o = [], r = f.length; r--; )
                    (a = f[r]) && o.push((d[r] = a));
                  v(null, (f = []), o, i);
                }
                for (r = f.length; r--; )
                  (a = f[r]) &&
                    -1 < (o = v ? tt(t, a) : s[r]) &&
                    (t[o] = !(e[o] = a));
              }
            } else (f = w(f === e ? f.splice(u, f.length) : f)), v ? v(null, e, f, i) : Y.apply(e, f);
          })
        );
      }
      function p(t) {
        for (
          var o,
            e,
            n,
            i = t.length,
            r = T.relative[t[0].type],
            a = r || T.relative[" "],
            s = r ? 1 : 0,
            l = d(
              function (t) {
                return t === o;
              },
              a,
              !0
            ),
            u = d(
              function (t) {
                return -1 < tt(o, t);
              },
              a,
              !0
            ),
            c = [
              function (t, e, n) {
                var i =
                  (!r && (n || e !== N)) ||
                  ((o = e).nodeType ? l(t, e, n) : u(t, e, n));
                return (o = null), i;
              },
            ];
          s < i;
          s++
        )
          if ((e = T.relative[t[s].type])) c = [d(f(c), e)];
          else {
            if ((e = T.filter[t[s].type].apply(null, t[s].matches))[q]) {
              for (n = ++s; n < i && !T.relative[t[n].type]; n++);
              return y(
                1 < s && f(c),
                1 < s &&
                  g(
                    t
                      .slice(0, s - 1)
                      .concat({ value: " " === t[s - 2].type ? "*" : "" })
                  ).replace(st, "$1"),
                e,
                s < n && p(t.slice(s, n)),
                n < i && p((t = t.slice(n))),
                n < i && g(t)
              );
            }
            c.push(e);
          }
        return f(c);
      }
      function c(g, v) {
        var b = 0 < v.length,
          y = 0 < g.length,
          t = function (t, e, n, i, o) {
            var r,
              a,
              s,
              l = 0,
              u = "0",
              c = t && [],
              d = [],
              f = N,
              p = t || (y && T.find.TAG("*", o)),
              h = (B += null == f ? 1 : Math.random() || 0.1),
              m = p.length;
            for (
              o && (N = e === j || e || o);
              u !== m && null != (r = p[u]);
              u++
            ) {
              if (y && r) {
                for (
                  a = 0, e || r.ownerDocument === j || (A(r), (n = !L));
                  (s = g[a++]);

                )
                  if (s(r, e || j, n)) {
                    i.push(r);
                    break;
                  }
                o && (B = h);
              }
              b && ((r = !s && r) && l--, t && c.push(r));
            }
            if (((l += u), b && u !== l)) {
              for (a = 0; (s = v[a++]); ) s(c, d, e, n);
              if (t) {
                if (0 < l) for (; u--; ) c[u] || d[u] || (d[u] = K.call(i));
                d = w(d);
              }
              Y.apply(i, d),
                o && !t && 0 < d.length && 1 < l + v.length && x.uniqueSort(i);
            }
            return o && ((B = h), (N = f)), c;
          };
        return b ? l(t) : t;
      }
      var h,
        v,
        T,
        C,
        k,
        S,
        E,
        D,
        N,
        $,
        I,
        A,
        j,
        O,
        L,
        H,
        R,
        P,
        M,
        q = "sizzle" + 1 * new Date(),
        _ = n.document,
        B = 0,
        F = 0,
        W = t(),
        z = t(),
        U = t(),
        Q = function (t, e) {
          return t === e && (I = !0), 0;
        },
        X = 1 << 31,
        V = {}.hasOwnProperty,
        G = [],
        K = G.pop,
        J = G.push,
        Y = G.push,
        Z = G.slice,
        tt = function (t, e) {
          for (var n = 0, i = t.length; n < i; n++) if (t[n] === e) return n;
          return -1;
        },
        et =
          "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
        nt = "[\\x20\\t\\r\\n\\f]",
        it = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
        ot =
          "\\[" +
          nt +
          "*(" +
          it +
          ")(?:" +
          nt +
          "*([*^$|!~]?=)" +
          nt +
          "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" +
          it +
          "))|)" +
          nt +
          "*\\]",
        rt =
          ":(" +
          it +
          ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" +
          ot +
          ")*)|.*)\\)|)",
        at = new RegExp(nt + "+", "g"),
        st = new RegExp(
          "^" + nt + "+|((?:^|[^\\\\])(?:\\\\.)*)" + nt + "+$",
          "g"
        ),
        lt = new RegExp("^" + nt + "*," + nt + "*"),
        ut = new RegExp("^" + nt + "*([>+~]|" + nt + ")" + nt + "*"),
        ct = new RegExp("=" + nt + "*([^\\]'\"]*?)" + nt + "*\\]", "g"),
        dt = new RegExp(rt),
        ft = new RegExp("^" + it + "$"),
        pt = {
          ID: new RegExp("^#(" + it + ")"),
          CLASS: new RegExp("^\\.(" + it + ")"),
          TAG: new RegExp("^(" + it + "|[*])"),
          ATTR: new RegExp("^" + ot),
          PSEUDO: new RegExp("^" + rt),
          CHILD: new RegExp(
            "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
              nt +
              "*(even|odd|(([+-]|)(\\d*)n|)" +
              nt +
              "*(?:([+-]|)" +
              nt +
              "*(\\d+)|))" +
              nt +
              "*\\)|)",
            "i"
          ),
          bool: new RegExp("^(?:" + et + ")$", "i"),
          needsContext: new RegExp(
            "^" +
              nt +
              "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
              nt +
              "*((?:-\\d)?\\d*)" +
              nt +
              "*\\)|)(?=[^-]|$)",
            "i"
          ),
        },
        ht = /^(?:input|select|textarea|button)$/i,
        mt = /^h\d$/i,
        gt = /^[^{]+\{\s*\[native \w/,
        vt = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
        bt = /[+~]/,
        yt = /'|\\/g,
        xt = new RegExp("\\\\([\\da-f]{1,6}" + nt + "?|(" + nt + ")|.)", "ig"),
        wt = function (t, e, n) {
          var i = "0x" + e - 65536;
          return i != i || n
            ? e
            : i < 0
            ? String.fromCharCode(i + 65536)
            : String.fromCharCode((i >> 10) | 55296, (1023 & i) | 56320);
        },
        Tt = function () {
          A();
        };
      try {
        Y.apply((G = Z.call(_.childNodes)), _.childNodes),
          G[_.childNodes.length].nodeType;
      } catch (Ct) {
        Y = {
          apply: G.length
            ? function (t, e) {
                J.apply(t, Z.call(e));
              }
            : function (t, e) {
                for (var n = t.length, i = 0; (t[n++] = e[i++]); );
                t.length = n - 1;
              },
        };
      }
      for (h in ((v = x.support = {}),
      (k = x.isXML = function (t) {
        var e = t && (t.ownerDocument || t).documentElement;
        return !!e && "HTML" !== e.nodeName;
      }),
      (A = x.setDocument = function (t) {
        var e,
          n,
          i = t ? t.ownerDocument || t : _;
        return (
          i !== j &&
            9 === i.nodeType &&
            i.documentElement &&
            ((O = (j = i).documentElement),
            (L = !k(j)),
            (n = j.defaultView) &&
              n.top !== n &&
              (n.addEventListener
                ? n.addEventListener("unload", Tt, !1)
                : n.attachEvent && n.attachEvent("onunload", Tt)),
            (v.attributes = o(function (t) {
              return (t.className = "i"), !t.getAttribute("className");
            })),
            (v.getElementsByTagName = o(function (t) {
              return (
                t.appendChild(j.createComment("")),
                !t.getElementsByTagName("*").length
              );
            })),
            (v.getElementsByClassName = gt.test(j.getElementsByClassName)),
            (v.getById = o(function (t) {
              return (
                (O.appendChild(t).id = q),
                !j.getElementsByName || !j.getElementsByName(q).length
              );
            })),
            v.getById
              ? ((T.find.ID = function (t, e) {
                  if ("undefined" != typeof e.getElementById && L) {
                    var n = e.getElementById(t);
                    return n ? [n] : [];
                  }
                }),
                (T.filter.ID = function (t) {
                  var e = t.replace(xt, wt);
                  return function (t) {
                    return t.getAttribute("id") === e;
                  };
                }))
              : (delete T.find.ID,
                (T.filter.ID = function (t) {
                  var n = t.replace(xt, wt);
                  return function (t) {
                    var e =
                      "undefined" != typeof t.getAttributeNode &&
                      t.getAttributeNode("id");
                    return e && e.value === n;
                  };
                })),
            (T.find.TAG = v.getElementsByTagName
              ? function (t, e) {
                  return "undefined" != typeof e.getElementsByTagName
                    ? e.getElementsByTagName(t)
                    : v.qsa
                    ? e.querySelectorAll(t)
                    : void 0;
                }
              : function (t, e) {
                  var n,
                    i = [],
                    o = 0,
                    r = e.getElementsByTagName(t);
                  if ("*" !== t) return r;
                  for (; (n = r[o++]); ) 1 === n.nodeType && i.push(n);
                  return i;
                }),
            (T.find.CLASS =
              v.getElementsByClassName &&
              function (t, e) {
                if ("undefined" != typeof e.getElementsByClassName && L)
                  return e.getElementsByClassName(t);
              }),
            (R = []),
            (H = []),
            (v.qsa = gt.test(j.querySelectorAll)) &&
              (o(function (t) {
                (O.appendChild(t).innerHTML =
                  "<a id='" +
                  q +
                  "'></a><select id='" +
                  q +
                  "-\r\\' msallowcapture=''><option selected=''></option></select>"),
                  t.querySelectorAll("[msallowcapture^='']").length &&
                    H.push("[*^$]=" + nt + "*(?:''|\"\")"),
                  t.querySelectorAll("[selected]").length ||
                    H.push("\\[" + nt + "*(?:value|" + et + ")"),
                  t.querySelectorAll("[id~=" + q + "-]").length || H.push("~="),
                  t.querySelectorAll(":checked").length || H.push(":checked"),
                  t.querySelectorAll("a#" + q + "+*").length ||
                    H.push(".#.+[+~]");
              }),
              o(function (t) {
                var e = j.createElement("input");
                e.setAttribute("type", "hidden"),
                  t.appendChild(e).setAttribute("name", "D"),
                  t.querySelectorAll("[name=d]").length &&
                    H.push("name" + nt + "*[*^$|!~]?="),
                  t.querySelectorAll(":enabled").length ||
                    H.push(":enabled", ":disabled"),
                  t.querySelectorAll("*,:x"),
                  H.push(",.*:");
              })),
            (v.matchesSelector = gt.test(
              (P =
                O.matches ||
                O.webkitMatchesSelector ||
                O.mozMatchesSelector ||
                O.oMatchesSelector ||
                O.msMatchesSelector)
            )) &&
              o(function (t) {
                (v.disconnectedMatch = P.call(t, "div")),
                  P.call(t, "[s!='']:x"),
                  R.push("!=", rt);
              }),
            (H = H.length && new RegExp(H.join("|"))),
            (R = R.length && new RegExp(R.join("|"))),
            (e = gt.test(O.compareDocumentPosition)),
            (M =
              e || gt.test(O.contains)
                ? function (t, e) {
                    var n = 9 === t.nodeType ? t.documentElement : t,
                      i = e && e.parentNode;
                    return (
                      t === i ||
                      !(
                        !i ||
                        1 !== i.nodeType ||
                        !(n.contains
                          ? n.contains(i)
                          : t.compareDocumentPosition &&
                            16 & t.compareDocumentPosition(i))
                      )
                    );
                  }
                : function (t, e) {
                    if (e) for (; (e = e.parentNode); ) if (e === t) return !0;
                    return !1;
                  }),
            (Q = e
              ? function (t, e) {
                  if (t === e) return (I = !0), 0;
                  var n =
                    !t.compareDocumentPosition - !e.compareDocumentPosition;
                  return (
                    n ||
                    (1 &
                      (n =
                        (t.ownerDocument || t) === (e.ownerDocument || e)
                          ? t.compareDocumentPosition(e)
                          : 1) ||
                    (!v.sortDetached && e.compareDocumentPosition(t) === n)
                      ? t === j || (t.ownerDocument === _ && M(_, t))
                        ? -1
                        : e === j || (e.ownerDocument === _ && M(_, e))
                        ? 1
                        : $
                        ? tt($, t) - tt($, e)
                        : 0
                      : 4 & n
                      ? -1
                      : 1)
                  );
                }
              : function (t, e) {
                  if (t === e) return (I = !0), 0;
                  var n,
                    i = 0,
                    o = t.parentNode,
                    r = e.parentNode,
                    a = [t],
                    s = [e];
                  if (!o || !r)
                    return t === j
                      ? -1
                      : e === j
                      ? 1
                      : o
                      ? -1
                      : r
                      ? 1
                      : $
                      ? tt($, t) - tt($, e)
                      : 0;
                  if (o === r) return u(t, e);
                  for (n = t; (n = n.parentNode); ) a.unshift(n);
                  for (n = e; (n = n.parentNode); ) s.unshift(n);
                  for (; a[i] === s[i]; ) i++;
                  return i
                    ? u(a[i], s[i])
                    : a[i] === _
                    ? -1
                    : s[i] === _
                    ? 1
                    : 0;
                })),
          j
        );
      }),
      (x.matches = function (t, e) {
        return x(t, null, null, e);
      }),
      (x.matchesSelector = function (t, e) {
        if (
          ((t.ownerDocument || t) !== j && A(t),
          (e = e.replace(ct, "='$1']")),
          v.matchesSelector &&
            L &&
            !U[e + " "] &&
            (!R || !R.test(e)) &&
            (!H || !H.test(e)))
        )
          try {
            var n = P.call(t, e);
            if (
              n ||
              v.disconnectedMatch ||
              (t.document && 11 !== t.document.nodeType)
            )
              return n;
          } catch (Ct) {}
        return 0 < x(e, j, null, [t]).length;
      }),
      (x.contains = function (t, e) {
        return (t.ownerDocument || t) !== j && A(t), M(t, e);
      }),
      (x.attr = function (t, e) {
        (t.ownerDocument || t) !== j && A(t);
        var n = T.attrHandle[e.toLowerCase()],
          i =
            n && V.call(T.attrHandle, e.toLowerCase())
              ? n(t, e, !L)
              : undefined;
        return i !== undefined
          ? i
          : v.attributes || !L
          ? t.getAttribute(e)
          : (i = t.getAttributeNode(e)) && i.specified
          ? i.value
          : null;
      }),
      (x.error = function (t) {
        throw new Error("Syntax error, unrecognized expression: " + t);
      }),
      (x.uniqueSort = function (t) {
        var e,
          n = [],
          i = 0,
          o = 0;
        if (
          ((I = !v.detectDuplicates),
          ($ = !v.sortStable && t.slice(0)),
          t.sort(Q),
          I)
        ) {
          for (; (e = t[o++]); ) e === t[o] && (i = n.push(o));
          for (; i--; ) t.splice(n[i], 1);
        }
        return ($ = null), t;
      }),
      (C = x.getText = function (t) {
        var e,
          n = "",
          i = 0,
          o = t.nodeType;
        if (o) {
          if (1 === o || 9 === o || 11 === o) {
            if ("string" == typeof t.textContent) return t.textContent;
            for (t = t.firstChild; t; t = t.nextSibling) n += C(t);
          } else if (3 === o || 4 === o) return t.nodeValue;
        } else for (; (e = t[i++]); ) n += C(e);
        return n;
      }),
      ((T = x.selectors = {
        cacheLength: 50,
        createPseudo: l,
        match: pt,
        attrHandle: {},
        find: {},
        relative: {
          ">": { dir: "parentNode", first: !0 },
          " ": { dir: "parentNode" },
          "+": { dir: "previousSibling", first: !0 },
          "~": { dir: "previousSibling" },
        },
        preFilter: {
          ATTR: function (t) {
            return (
              (t[1] = t[1].replace(xt, wt)),
              (t[3] = (t[3] || t[4] || t[5] || "").replace(xt, wt)),
              "~=" === t[2] && (t[3] = " " + t[3] + " "),
              t.slice(0, 4)
            );
          },
          CHILD: function (t) {
            return (
              (t[1] = t[1].toLowerCase()),
              "nth" === t[1].slice(0, 3)
                ? (t[3] || x.error(t[0]),
                  (t[4] = +(t[4]
                    ? t[5] + (t[6] || 1)
                    : 2 * ("even" === t[3] || "odd" === t[3]))),
                  (t[5] = +(t[7] + t[8] || "odd" === t[3])))
                : t[3] && x.error(t[0]),
              t
            );
          },
          PSEUDO: function (t) {
            var e,
              n = !t[6] && t[2];
            return pt.CHILD.test(t[0])
              ? null
              : (t[3]
                  ? (t[2] = t[4] || t[5] || "")
                  : n &&
                    dt.test(n) &&
                    (e = S(n, !0)) &&
                    (e = n.indexOf(")", n.length - e) - n.length) &&
                    ((t[0] = t[0].slice(0, e)), (t[2] = n.slice(0, e))),
                t.slice(0, 3));
          },
        },
        filter: {
          TAG: function (t) {
            var e = t.replace(xt, wt).toLowerCase();
            return "*" === t
              ? function () {
                  return !0;
                }
              : function (t) {
                  return t.nodeName && t.nodeName.toLowerCase() === e;
                };
          },
          CLASS: function (t) {
            var e = W[t + " "];
            return (
              e ||
              ((e = new RegExp("(^|" + nt + ")" + t + "(" + nt + "|$)")) &&
                W(t, function (t) {
                  return e.test(
                    ("string" == typeof t.className && t.className) ||
                      ("undefined" != typeof t.getAttribute &&
                        t.getAttribute("class")) ||
                      ""
                  );
                }))
            );
          },
          ATTR: function (n, i, o) {
            return function (t) {
              var e = x.attr(t, n);
              return null == e
                ? "!=" === i
                : !i ||
                    ((e += ""),
                    "=" === i
                      ? e === o
                      : "!=" === i
                      ? e !== o
                      : "^=" === i
                      ? o && 0 === e.indexOf(o)
                      : "*=" === i
                      ? o && -1 < e.indexOf(o)
                      : "$=" === i
                      ? o && e.slice(-o.length) === o
                      : "~=" === i
                      ? -1 < (" " + e.replace(at, " ") + " ").indexOf(o)
                      : "|=" === i &&
                        (e === o || e.slice(0, o.length + 1) === o + "-"));
            };
          },
          CHILD: function (h, t, e, m, g) {
            var v = "nth" !== h.slice(0, 3),
              b = "last" !== h.slice(-4),
              y = "of-type" === t;
            return 1 === m && 0 === g
              ? function (t) {
                  return !!t.parentNode;
                }
              : function (t, e, n) {
                  var i,
                    o,
                    r,
                    a,
                    s,
                    l,
                    u = v !== b ? "nextSibling" : "previousSibling",
                    c = t.parentNode,
                    d = y && t.nodeName.toLowerCase(),
                    f = !n && !y,
                    p = !1;
                  if (c) {
                    if (v) {
                      for (; u; ) {
                        for (a = t; (a = a[u]); )
                          if (
                            y
                              ? a.nodeName.toLowerCase() === d
                              : 1 === a.nodeType
                          )
                            return !1;
                        l = u = "only" === h && !l && "nextSibling";
                      }
                      return !0;
                    }
                    if (((l = [b ? c.firstChild : c.lastChild]), b && f)) {
                      for (
                        p =
                          (s =
                            (i =
                              (o =
                                (r = (a = c)[q] || (a[q] = {}))[a.uniqueID] ||
                                (r[a.uniqueID] = {}))[h] || [])[0] === B &&
                            i[1]) && i[2],
                          a = s && c.childNodes[s];
                        (a = (++s && a && a[u]) || (p = s = 0) || l.pop());

                      )
                        if (1 === a.nodeType && ++p && a === t) {
                          o[h] = [B, s, p];
                          break;
                        }
                    } else if (
                      (f &&
                        (p = s =
                          (i =
                            (o =
                              (r = (a = t)[q] || (a[q] = {}))[a.uniqueID] ||
                              (r[a.uniqueID] = {}))[h] || [])[0] === B && i[1]),
                      !1 === p)
                    )
                      for (
                        ;
                        (a = (++s && a && a[u]) || (p = s = 0) || l.pop()) &&
                        ((y
                          ? a.nodeName.toLowerCase() !== d
                          : 1 !== a.nodeType) ||
                          !++p ||
                          (f &&
                            ((o =
                              (r = a[q] || (a[q] = {}))[a.uniqueID] ||
                              (r[a.uniqueID] = {}))[h] = [B, p]),
                          a !== t));

                      );
                    return (p -= g) === m || (p % m == 0 && 0 <= p / m);
                  }
                };
          },
          PSEUDO: function (t, r) {
            var e,
              a =
                T.pseudos[t] ||
                T.setFilters[t.toLowerCase()] ||
                x.error("unsupported pseudo: " + t);
            return a[q]
              ? a(r)
              : 1 < a.length
              ? ((e = [t, t, "", r]),
                T.setFilters.hasOwnProperty(t.toLowerCase())
                  ? l(function (t, e) {
                      for (var n, i = a(t, r), o = i.length; o--; )
                        t[(n = tt(t, i[o]))] = !(e[n] = i[o]);
                    })
                  : function (t) {
                      return a(t, 0, e);
                    })
              : a;
          },
        },
        pseudos: {
          not: l(function (t) {
            var i = [],
              o = [],
              s = E(t.replace(st, "$1"));
            return s[q]
              ? l(function (t, e, n, i) {
                  for (var o, r = s(t, null, i, []), a = t.length; a--; )
                    (o = r[a]) && (t[a] = !(e[a] = o));
                })
              : function (t, e, n) {
                  return (i[0] = t), s(i, null, n, o), (i[0] = null), !o.pop();
                };
          }),
          has: l(function (e) {
            return function (t) {
              return 0 < x(e, t).length;
            };
          }),
          contains: l(function (e) {
            return (
              (e = e.replace(xt, wt)),
              function (t) {
                return -1 < (t.textContent || t.innerText || C(t)).indexOf(e);
              }
            );
          }),
          lang: l(function (n) {
            return (
              ft.test(n || "") || x.error("unsupported lang: " + n),
              (n = n.replace(xt, wt).toLowerCase()),
              function (t) {
                var e;
                do {
                  if (
                    (e = L
                      ? t.lang
                      : t.getAttribute("xml:lang") || t.getAttribute("lang"))
                  )
                    return (
                      (e = e.toLowerCase()) === n || 0 === e.indexOf(n + "-")
                    );
                } while ((t = t.parentNode) && 1 === t.nodeType);
                return !1;
              }
            );
          }),
          target: function (t) {
            var e = n.location && n.location.hash;
            return e && e.slice(1) === t.id;
          },
          root: function (t) {
            return t === O;
          },
          focus: function (t) {
            return (
              t === j.activeElement &&
              (!j.hasFocus || j.hasFocus()) &&
              !!(t.type || t.href || ~t.tabIndex)
            );
          },
          enabled: function (t) {
            return !1 === t.disabled;
          },
          disabled: function (t) {
            return !0 === t.disabled;
          },
          checked: function (t) {
            var e = t.nodeName.toLowerCase();
            return (
              ("input" === e && !!t.checked) || ("option" === e && !!t.selected)
            );
          },
          selected: function (t) {
            return (
              t.parentNode && t.parentNode.selectedIndex, !0 === t.selected
            );
          },
          empty: function (t) {
            for (t = t.firstChild; t; t = t.nextSibling)
              if (t.nodeType < 6) return !1;
            return !0;
          },
          parent: function (t) {
            return !T.pseudos.empty(t);
          },
          header: function (t) {
            return mt.test(t.nodeName);
          },
          input: function (t) {
            return ht.test(t.nodeName);
          },
          button: function (t) {
            var e = t.nodeName.toLowerCase();
            return ("input" === e && "button" === t.type) || "button" === e;
          },
          text: function (t) {
            var e;
            return (
              "input" === t.nodeName.toLowerCase() &&
              "text" === t.type &&
              (null == (e = t.getAttribute("type")) ||
                "text" === e.toLowerCase())
            );
          },
          first: a(function () {
            return [0];
          }),
          last: a(function (t, e) {
            return [e - 1];
          }),
          eq: a(function (t, e, n) {
            return [n < 0 ? n + e : n];
          }),
          even: a(function (t, e) {
            for (var n = 0; n < e; n += 2) t.push(n);
            return t;
          }),
          odd: a(function (t, e) {
            for (var n = 1; n < e; n += 2) t.push(n);
            return t;
          }),
          lt: a(function (t, e, n) {
            for (var i = n < 0 ? n + e : n; 0 <= --i; ) t.push(i);
            return t;
          }),
          gt: a(function (t, e, n) {
            for (var i = n < 0 ? n + e : n; ++i < e; ) t.push(i);
            return t;
          }),
        },
      }).pseudos.nth = T.pseudos.eq),
      { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }))
        T.pseudos[h] = i(h);
      for (h in { submit: !0, reset: !0 }) T.pseudos[h] = r(h);
      return (
        (s.prototype = T.filters = T.pseudos),
        (T.setFilters = new s()),
        (S = x.tokenize = function (t, e) {
          var n,
            i,
            o,
            r,
            a,
            s,
            l,
            u = z[t + " "];
          if (u) return e ? 0 : u.slice(0);
          for (a = t, s = [], l = T.preFilter; a; ) {
            for (r in ((n && !(i = lt.exec(a))) ||
              (i && (a = a.slice(i[0].length) || a), s.push((o = []))),
            (n = !1),
            (i = ut.exec(a)) &&
              ((n = i.shift()),
              o.push({ value: n, type: i[0].replace(st, " ") }),
              (a = a.slice(n.length))),
            T.filter))
              !(i = pt[r].exec(a)) ||
                (l[r] && !(i = l[r](i))) ||
                ((n = i.shift()),
                o.push({ value: n, type: r, matches: i }),
                (a = a.slice(n.length)));
            if (!n) break;
          }
          return e ? a.length : a ? x.error(t) : z(t, s).slice(0);
        }),
        (E = x.compile = function (t, e) {
          var n,
            i = [],
            o = [],
            r = U[t + " "];
          if (!r) {
            for (e || (e = S(t)), n = e.length; n--; )
              (r = p(e[n]))[q] ? i.push(r) : o.push(r);
            (r = U(t, c(o, i))).selector = t;
          }
          return r;
        }),
        (D = x.select = function (t, e, n, i) {
          var o,
            r,
            a,
            s,
            l,
            u = "function" == typeof t && t,
            c = !i && S((t = u.selector || t));
          if (((n = n || []), 1 === c.length)) {
            if (
              2 < (r = c[0] = c[0].slice(0)).length &&
              "ID" === (a = r[0]).type &&
              v.getById &&
              9 === e.nodeType &&
              L &&
              T.relative[r[1].type]
            ) {
              if (!(e = (T.find.ID(a.matches[0].replace(xt, wt), e) || [])[0]))
                return n;
              u && (e = e.parentNode), (t = t.slice(r.shift().value.length));
            }
            for (
              o = pt.needsContext.test(t) ? 0 : r.length;
              o-- && ((a = r[o]), !T.relative[(s = a.type)]);

            )
              if (
                (l = T.find[s]) &&
                (i = l(
                  a.matches[0].replace(xt, wt),
                  (bt.test(r[0].type) && m(e.parentNode)) || e
                ))
              ) {
                if ((r.splice(o, 1), !(t = i.length && g(r))))
                  return Y.apply(n, i), n;
                break;
              }
          }
          return (
            (u || E(t, c))(
              i,
              e,
              !L,
              n,
              !e || (bt.test(t) && m(e.parentNode)) || e
            ),
            n
          );
        }),
        (v.sortStable = q.split("").sort(Q).join("") === q),
        (v.detectDuplicates = !!I),
        A(),
        (v.sortDetached = o(function (t) {
          return 1 & t.compareDocumentPosition(j.createElement("div"));
        })),
        o(function (t) {
          return (
            (t.innerHTML = "<a href='#'></a>"),
            "#" === t.firstChild.getAttribute("href")
          );
        }) ||
          e("type|href|height|width", function (t, e, n) {
            if (!n)
              return t.getAttribute(e, "type" === e.toLowerCase() ? 1 : 2);
          }),
        (v.attributes &&
          o(function (t) {
            return (
              (t.innerHTML = "<input/>"),
              t.firstChild.setAttribute("value", ""),
              "" === t.firstChild.getAttribute("value")
            );
          })) ||
          e("value", function (t, e, n) {
            if (!n && "input" === t.nodeName.toLowerCase())
              return t.defaultValue;
          }),
        o(function (t) {
          return null == t.getAttribute("disabled");
        }) ||
          e(et, function (t, e, n) {
            var i;
            if (!n)
              return !0 === t[e]
                ? e.toLowerCase()
                : (i = t.getAttributeNode(e)) && i.specified
                ? i.value
                : null;
          }),
        x
      );
    })(C);
    (pt.find = bt),
      (pt.expr = bt.selectors),
      (pt.expr[":"] = pt.expr.pseudos),
      (pt.uniqueSort = pt.unique = bt.uniqueSort),
      (pt.text = bt.getText),
      (pt.isXMLDoc = bt.isXML),
      (pt.contains = bt.contains);
    var yt = function (t, e, n) {
        for (var i = [], o = n !== undefined; (t = t[e]) && 9 !== t.nodeType; )
          if (1 === t.nodeType) {
            if (o && pt(t).is(n)) break;
            i.push(t);
          }
        return i;
      },
      xt = function (t, e) {
        for (var n = []; t; t = t.nextSibling)
          1 === t.nodeType && t !== e && n.push(t);
        return n;
      },
      wt = pt.expr.match.needsContext,
      Tt = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,
      Ct = /^.[^:#\[\.,]*$/;
    (pt.filter = function (t, e, n) {
      var i = e[0];
      return (
        n && (t = ":not(" + t + ")"),
        1 === e.length && 1 === i.nodeType
          ? pt.find.matchesSelector(i, t)
            ? [i]
            : []
          : pt.find.matches(
              t,
              pt.grep(e, function (t) {
                return 1 === t.nodeType;
              })
            )
      );
    }),
      pt.fn.extend({
        find: function (t) {
          var e,
            n = [],
            i = this,
            o = i.length;
          if ("string" != typeof t)
            return this.pushStack(
              pt(t).filter(function () {
                for (e = 0; e < o; e++) if (pt.contains(i[e], this)) return !0;
              })
            );
          for (e = 0; e < o; e++) pt.find(t, i[e], n);
          return (
            ((n = this.pushStack(1 < o ? pt.unique(n) : n)).selector = this
              .selector
              ? this.selector + " " + t
              : t),
            n
          );
        },
        filter: function (t) {
          return this.pushStack(e(this, t || [], !1));
        },
        not: function (t) {
          return this.pushStack(e(this, t || [], !0));
        },
        is: function (t) {
          return !!e(
            this,
            "string" == typeof t && wt.test(t) ? pt(t) : t || [],
            !1
          ).length;
        },
      });
    var kt,
      St = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;
    ((pt.fn.init = function (t, e, n) {
      var i, o;
      if (!t) return this;
      if (((n = n || kt), "string" != typeof t))
        return t.nodeType
          ? ((this.context = this[0] = t), (this.length = 1), this)
          : pt.isFunction(t)
          ? "undefined" != typeof n.ready
            ? n.ready(t)
            : t(pt)
          : (t.selector !== undefined &&
              ((this.selector = t.selector), (this.context = t.context)),
            pt.makeArray(t, this));
      if (
        !(i =
          "<" === t.charAt(0) && ">" === t.charAt(t.length - 1) && 3 <= t.length
            ? [null, t, null]
            : St.exec(t)) ||
        (!i[1] && e)
      )
        return !e || e.jquery ? (e || n).find(t) : this.constructor(e).find(t);
      if (i[1]) {
        if (
          ((e = e instanceof pt ? e[0] : e),
          pt.merge(
            this,
            pt.parseHTML(i[1], e && e.nodeType ? e.ownerDocument || e : it, !0)
          ),
          Tt.test(i[1]) && pt.isPlainObject(e))
        )
          for (i in e)
            pt.isFunction(this[i]) ? this[i](e[i]) : this.attr(i, e[i]);
        return this;
      }
      if ((o = it.getElementById(i[2])) && o.parentNode) {
        if (o.id !== i[2]) return kt.find(t);
        (this.length = 1), (this[0] = o);
      }
      return (this.context = it), (this.selector = t), this;
    }).prototype = pt.fn),
      (kt = pt(it));
    var Et = /^(?:parents|prev(?:Until|All))/,
      Dt = { children: !0, contents: !0, next: !0, prev: !0 };
    pt.fn.extend({
      has: function (t) {
        var e,
          n = pt(t, this),
          i = n.length;
        return this.filter(function () {
          for (e = 0; e < i; e++) if (pt.contains(this, n[e])) return !0;
        });
      },
      closest: function (t, e) {
        for (
          var n,
            i = 0,
            o = this.length,
            r = [],
            a =
              wt.test(t) || "string" != typeof t ? pt(t, e || this.context) : 0;
          i < o;
          i++
        )
          for (n = this[i]; n && n !== e; n = n.parentNode)
            if (
              n.nodeType < 11 &&
              (a
                ? -1 < a.index(n)
                : 1 === n.nodeType && pt.find.matchesSelector(n, t))
            ) {
              r.push(n);
              break;
            }
        return this.pushStack(1 < r.length ? pt.uniqueSort(r) : r);
      },
      index: function (t) {
        return t
          ? "string" == typeof t
            ? pt.inArray(this[0], pt(t))
            : pt.inArray(t.jquery ? t[0] : t, this)
          : this[0] && this[0].parentNode
          ? this.first().prevAll().length
          : -1;
      },
      add: function (t, e) {
        return this.pushStack(pt.uniqueSort(pt.merge(this.get(), pt(t, e))));
      },
      addBack: function (t) {
        return this.add(
          null == t ? this.prevObject : this.prevObject.filter(t)
        );
      },
    }),
      pt.each(
        {
          parent: function (t) {
            var e = t.parentNode;
            return e && 11 !== e.nodeType ? e : null;
          },
          parents: function (t) {
            return yt(t, "parentNode");
          },
          parentsUntil: function (t, e, n) {
            return yt(t, "parentNode", n);
          },
          next: function (t) {
            return n(t, "nextSibling");
          },
          prev: function (t) {
            return n(t, "previousSibling");
          },
          nextAll: function (t) {
            return yt(t, "nextSibling");
          },
          prevAll: function (t) {
            return yt(t, "previousSibling");
          },
          nextUntil: function (t, e, n) {
            return yt(t, "nextSibling", n);
          },
          prevUntil: function (t, e, n) {
            return yt(t, "previousSibling", n);
          },
          siblings: function (t) {
            return xt((t.parentNode || {}).firstChild, t);
          },
          children: function (t) {
            return xt(t.firstChild);
          },
          contents: function (t) {
            return pt.nodeName(t, "iframe")
              ? t.contentDocument || t.contentWindow.document
              : pt.merge([], t.childNodes);
          },
        },
        function (i, o) {
          pt.fn[i] = function (t, e) {
            var n = pt.map(this, o, t);
            return (
              "Until" !== i.slice(-5) && (e = t),
              e && "string" == typeof e && (n = pt.filter(e, n)),
              1 < this.length &&
                (Dt[i] || (n = pt.uniqueSort(n)),
                Et.test(i) && (n = n.reverse())),
              this.pushStack(n)
            );
          };
        }
      );
    var Nt,
      $t,
      It = /\S+/g;
    for ($t in ((pt.Callbacks = function (i) {
      i = "string" == typeof i ? c(i) : pt.extend({}, i);
      var o,
        t,
        e,
        n,
        r = [],
        a = [],
        s = -1,
        l = function () {
          for (n = i.once, e = o = !0; a.length; s = -1)
            for (t = a.shift(); ++s < r.length; )
              !1 === r[s].apply(t[0], t[1]) &&
                i.stopOnFalse &&
                ((s = r.length), (t = !1));
          i.memory || (t = !1), (o = !1), n && (r = t ? [] : "");
        },
        u = {
          add: function () {
            return (
              r &&
                (t && !o && ((s = r.length - 1), a.push(t)),
                (function n(t) {
                  pt.each(t, function (t, e) {
                    pt.isFunction(e)
                      ? (i.unique && u.has(e)) || r.push(e)
                      : e && e.length && "string" !== pt.type(e) && n(e);
                  });
                })(arguments),
                t && !o && l()),
              this
            );
          },
          remove: function () {
            return (
              pt.each(arguments, function (t, e) {
                for (var n; -1 < (n = pt.inArray(e, r, n)); )
                  r.splice(n, 1), n <= s && s--;
              }),
              this
            );
          },
          has: function (t) {
            return t ? -1 < pt.inArray(t, r) : 0 < r.length;
          },
          empty: function () {
            return r && (r = []), this;
          },
          disable: function () {
            return (n = a = []), (r = t = ""), this;
          },
          disabled: function () {
            return !r;
          },
          lock: function () {
            return (n = !0), t || u.disable(), this;
          },
          locked: function () {
            return !!n;
          },
          fireWith: function (t, e) {
            return (
              n ||
                ((e = [t, (e = e || []).slice ? e.slice() : e]),
                a.push(e),
                o || l()),
              this
            );
          },
          fire: function () {
            return u.fireWith(this, arguments), this;
          },
          fired: function () {
            return !!e;
          },
        };
      return u;
    }),
    pt.extend({
      Deferred: function (t) {
        var r = [
            ["resolve", "done", pt.Callbacks("once memory"), "resolved"],
            ["reject", "fail", pt.Callbacks("once memory"), "rejected"],
            ["notify", "progress", pt.Callbacks("memory")],
          ],
          o = "pending",
          a = {
            state: function () {
              return o;
            },
            always: function () {
              return s.done(arguments).fail(arguments), this;
            },
            then: function () {
              var o = arguments;
              return pt
                .Deferred(function (i) {
                  pt.each(r, function (t, e) {
                    var n = pt.isFunction(o[t]) && o[t];
                    s[e[1]](function () {
                      var t = n && n.apply(this, arguments);
                      t && pt.isFunction(t.promise)
                        ? t
                            .promise()
                            .progress(i.notify)
                            .done(i.resolve)
                            .fail(i.reject)
                        : i[e[0] + "With"](
                            this === a ? i.promise() : this,
                            n ? [t] : arguments
                          );
                    });
                  }),
                    (o = null);
                })
                .promise();
            },
            promise: function (t) {
              return null != t ? pt.extend(t, a) : a;
            },
          },
          s = {};
        return (
          (a.pipe = a.then),
          pt.each(r, function (t, e) {
            var n = e[2],
              i = e[3];
            (a[e[1]] = n.add),
              i &&
                n.add(
                  function () {
                    o = i;
                  },
                  r[1 ^ t][2].disable,
                  r[2][2].lock
                ),
              (s[e[0]] = function () {
                return s[e[0] + "With"](this === s ? a : this, arguments), this;
              }),
              (s[e[0] + "With"] = n.fireWith);
          }),
          a.promise(s),
          t && t.call(s, s),
          s
        );
      },
      when: function (t) {
        var o,
          e,
          n,
          i = 0,
          r = ot.call(arguments),
          a = r.length,
          s = 1 !== a || (t && pt.isFunction(t.promise)) ? a : 0,
          l = 1 === s ? t : pt.Deferred(),
          u = function (e, n, i) {
            return function (t) {
              (n[e] = this),
                (i[e] = 1 < arguments.length ? ot.call(arguments) : t),
                i === o ? l.notifyWith(n, i) : --s || l.resolveWith(n, i);
            };
          };
        if (1 < a)
          for (o = new Array(a), e = new Array(a), n = new Array(a); i < a; i++)
            r[i] && pt.isFunction(r[i].promise)
              ? r[i]
                  .promise()
                  .progress(u(i, e, o))
                  .done(u(i, n, r))
                  .fail(l.reject)
              : --s;
        return s || l.resolveWith(n, r), l.promise();
      },
    }),
    (pt.fn.ready = function (t) {
      return pt.ready.promise().done(t), this;
    }),
    pt.extend({
      isReady: !1,
      readyWait: 1,
      holdReady: function (t) {
        t ? pt.readyWait++ : pt.ready(!0);
      },
      ready: function (t) {
        (!0 === t ? --pt.readyWait : pt.isReady) ||
          ((pt.isReady = !0) !== t && 0 < --pt.readyWait) ||
          (Nt.resolveWith(it, [pt]),
          pt.fn.triggerHandler &&
            (pt(it).triggerHandler("ready"), pt(it).off("ready")));
      },
    }),
    (pt.ready.promise = function (t) {
      if (!Nt)
        if (
          ((Nt = pt.Deferred()),
          "complete" === it.readyState ||
            ("loading" !== it.readyState && !it.documentElement.doScroll))
        )
          C.setTimeout(pt.ready);
        else if (it.addEventListener)
          it.addEventListener("DOMContentLoaded", r),
            C.addEventListener("load", r);
        else {
          it.attachEvent("onreadystatechange", r), C.attachEvent("onload", r);
          var e = !1;
          try {
            e = null == C.frameElement && it.documentElement;
          } catch (n) {}
          e &&
            e.doScroll &&
            (function i() {
              if (!pt.isReady) {
                try {
                  e.doScroll("left");
                } catch (n) {
                  return C.setTimeout(i, 50);
                }
                o(), pt.ready();
              }
            })();
        }
      return Nt.promise(t);
    }),
    pt.ready.promise(),
    pt(dt)))
      break;
    (dt.ownFirst = "0" === $t),
      (dt.inlineBlockNeedsLayout = !1),
      pt(function () {
        var t, e, n, i;
        (n = it.getElementsByTagName("body")[0]) &&
          n.style &&
          ((e = it.createElement("div")),
          ((i = it.createElement("div")).style.cssText =
            "position:absolute;border:0;width:0;height:0;top:0;left:-9999px"),
          n.appendChild(i).appendChild(e),
          "undefined" != typeof e.style.zoom &&
            ((e.style.cssText =
              "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1"),
            (dt.inlineBlockNeedsLayout = t = 3 === e.offsetWidth),
            t && (n.style.zoom = 1)),
          n.removeChild(i));
      }),
      (function () {
        var t = it.createElement("div");
        dt.deleteExpando = !0;
        try {
          delete t.test;
        } catch (e) {
          dt.deleteExpando = !1;
        }
        t = null;
      })();
    var At,
      jt = function (t) {
        var e = pt.noData[(t.nodeName + " ").toLowerCase()],
          n = +t.nodeType || 1;
        return (
          (1 === n || 9 === n) &&
          (!e || (!0 !== e && t.getAttribute("classid") === e))
        );
      },
      Ot = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
      Lt = /([A-Z])/g;
    pt.extend({
      cache: {},
      noData: {
        "applet ": !0,
        "embed ": !0,
        "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
      },
      hasData: function (t) {
        return (
          !!(t = t.nodeType ? pt.cache[t[pt.expando]] : t[pt.expando]) && !u(t)
        );
      },
      data: function (t, e, n) {
        return i(t, e, n);
      },
      removeData: function (t, e) {
        return a(t, e);
      },
      _data: function (t, e, n) {
        return i(t, e, n, !0);
      },
      _removeData: function (t, e) {
        return a(t, e, !0);
      },
    }),
      pt.fn.extend({
        data: function (t, e) {
          var n,
            i,
            o,
            r = this[0],
            a = r && r.attributes;
          if (t !== undefined)
            return "object" == typeof t
              ? this.each(function () {
                  pt.data(this, t);
                })
              : 1 < arguments.length
              ? this.each(function () {
                  pt.data(this, t, e);
                })
              : r
              ? l(r, t, pt.data(r, t))
              : undefined;
          if (
            this.length &&
            ((o = pt.data(r)), 1 === r.nodeType && !pt._data(r, "parsedAttrs"))
          ) {
            for (n = a.length; n--; )
              a[n] &&
                0 === (i = a[n].name).indexOf("data-") &&
                l(r, (i = pt.camelCase(i.slice(5))), o[i]);
            pt._data(r, "parsedAttrs", !0);
          }
          return o;
        },
        removeData: function (t) {
          return this.each(function () {
            pt.removeData(this, t);
          });
        },
      }),
      pt.extend({
        queue: function (t, e, n) {
          var i;
          if (t)
            return (
              (e = (e || "fx") + "queue"),
              (i = pt._data(t, e)),
              n &&
                (!i || pt.isArray(n)
                  ? (i = pt._data(t, e, pt.makeArray(n)))
                  : i.push(n)),
              i || []
            );
        },
        dequeue: function (t, e) {
          e = e || "fx";
          var n = pt.queue(t, e),
            i = n.length,
            o = n.shift(),
            r = pt._queueHooks(t, e),
            a = function () {
              pt.dequeue(t, e);
            };
          "inprogress" === o && ((o = n.shift()), i--),
            o &&
              ("fx" === e && n.unshift("inprogress"),
              delete r.stop,
              o.call(t, a, r)),
            !i && r && r.empty.fire();
        },
        _queueHooks: function (t, e) {
          var n = e + "queueHooks";
          return (
            pt._data(t, n) ||
            pt._data(t, n, {
              empty: pt.Callbacks("once memory").add(function () {
                pt._removeData(t, e + "queue"), pt._removeData(t, n);
              }),
            })
          );
        },
      }),
      pt.fn.extend({
        queue: function (e, n) {
          var t = 2;
          return (
            "string" != typeof e && ((n = e), (e = "fx"), t--),
            arguments.length < t
              ? pt.queue(this[0], e)
              : n === undefined
              ? this
              : this.each(function () {
                  var t = pt.queue(this, e, n);
                  pt._queueHooks(this, e),
                    "fx" === e && "inprogress" !== t[0] && pt.dequeue(this, e);
                })
          );
        },
        dequeue: function (t) {
          return this.each(function () {
            pt.dequeue(this, t);
          });
        },
        clearQueue: function (t) {
          return this.queue(t || "fx", []);
        },
        promise: function (t, e) {
          var n,
            i = 1,
            o = pt.Deferred(),
            r = this,
            a = this.length,
            s = function () {
              --i || o.resolveWith(r, [r]);
            };
          for (
            "string" != typeof t && ((e = t), (t = undefined)), t = t || "fx";
            a--;

          )
            (n = pt._data(r[a], t + "queueHooks")) &&
              n.empty &&
              (i++, n.empty.add(s));
          return s(), o.promise(e);
        },
      }),
      (dt.shrinkWrapBlocks = function () {
        return null != At
          ? At
          : ((At = !1),
            (e = it.getElementsByTagName("body")[0]) && e.style
              ? ((t = it.createElement("div")),
                ((n = it.createElement("div")).style.cssText =
                  "position:absolute;border:0;width:0;height:0;top:0;left:-9999px"),
                e.appendChild(n).appendChild(t),
                "undefined" != typeof t.style.zoom &&
                  ((t.style.cssText =
                    "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1"),
                  (t.appendChild(it.createElement("div")).style.width = "5px"),
                  (At = 3 !== t.offsetWidth)),
                e.removeChild(n),
                At)
              : void 0);
        var t, e, n;
      });
    var Ht,
      Rt,
      Pt,
      Mt = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
      qt = new RegExp("^(?:([+-])=|)(" + Mt + ")([a-z%]*)$", "i"),
      _t = ["Top", "Right", "Bottom", "Left"],
      Bt = function (t, e) {
        return (
          (t = e || t),
          "none" === pt.css(t, "display") || !pt.contains(t.ownerDocument, t)
        );
      },
      Ft = function (t, e, n, i, o, r, a) {
        var s = 0,
          l = t.length,
          u = null == n;
        if ("object" === pt.type(n))
          for (s in ((o = !0), n)) Ft(t, e, s, n[s], !0, r, a);
        else if (
          i !== undefined &&
          ((o = !0),
          pt.isFunction(i) || (a = !0),
          u &&
            (e = a
              ? (e.call(t, i), null)
              : ((u = e),
                function (t, e, n) {
                  return u.call(pt(t), n);
                })),
          e)
        )
          for (; s < l; s++) e(t[s], n, a ? i : i.call(t[s], s, e(t[s], n)));
        return o ? t : u ? e.call(t) : l ? e(t[0], n) : r;
      },
      Wt = /^(?:checkbox|radio)$/i,
      zt = /<([\w:-]+)/,
      Ut = /^$|\/(?:java|ecma)script/i,
      Qt = /^\s+/,
      Xt =
        "abbr|article|aside|audio|bdi|canvas|data|datalist|details|dialog|figcaption|figure|footer|header|hgroup|main|mark|meter|nav|output|picture|progress|section|summary|template|time|video";
    (Ht = it.createElement("div")),
      (Rt = it.createDocumentFragment()),
      (Pt = it.createElement("input")),
      (Ht.innerHTML =
        "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>"),
      (dt.leadingWhitespace = 3 === Ht.firstChild.nodeType),
      (dt.tbody = !Ht.getElementsByTagName("tbody").length),
      (dt.htmlSerialize = !!Ht.getElementsByTagName("link").length),
      (dt.html5Clone =
        "<:nav></:nav>" !== it.createElement("nav").cloneNode(!0).outerHTML),
      (Pt.type = "checkbox"),
      (Pt.checked = !0),
      Rt.appendChild(Pt),
      (dt.appendChecked = Pt.checked),
      (Ht.innerHTML = "<textarea>x</textarea>"),
      (dt.noCloneChecked = !!Ht.cloneNode(!0).lastChild.defaultValue),
      Rt.appendChild(Ht),
      (Pt = it.createElement("input")).setAttribute("type", "radio"),
      Pt.setAttribute("checked", "checked"),
      Pt.setAttribute("name", "t"),
      Ht.appendChild(Pt),
      (dt.checkClone = Ht.cloneNode(!0).cloneNode(!0).lastChild.checked),
      (dt.noCloneEvent = !!Ht.addEventListener),
      (Ht[pt.expando] = 1),
      (dt.attributes = !Ht.getAttribute(pt.expando));
    var Vt = {
      option: [1, "<select multiple='multiple'>", "</select>"],
      legend: [1, "<fieldset>", "</fieldset>"],
      area: [1, "<map>", "</map>"],
      param: [1, "<object>", "</object>"],
      thead: [1, "<table>", "</table>"],
      tr: [2, "<table><tbody>", "</tbody></table>"],
      col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
      td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
      _default: dt.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"],
    };
    (Vt.optgroup = Vt.option),
      (Vt.tbody = Vt.tfoot = Vt.colgroup = Vt.caption = Vt.thead),
      (Vt.th = Vt.td);
    var Gt = /<|&#?\w+;/,
      Kt = /<tbody/i;
    !(function () {
      var t,
        e,
        n = it.createElement("div");
      for (t in { submit: !0, change: !0, focusin: !0 })
        (e = "on" + t),
          (dt[t] = e in C) ||
            (n.setAttribute(e, "t"), (dt[t] = !1 === n.attributes[e].expando));
      n = null;
    })();
    var Jt = /^(?:input|select|textarea)$/i,
      Yt = /^key/,
      Zt = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
      te = /^(?:focusinfocus|focusoutblur)$/,
      ee = /^([^.]*)(?:\.(.+)|)/;
    (pt.event = {
      global: {},
      add: function (t, e, n, i, o) {
        var r,
          a,
          s,
          l,
          u,
          c,
          d,
          f,
          p,
          h,
          m,
          g = pt._data(t);
        if (g) {
          for (
            n.handler && ((n = (l = n).handler), (o = l.selector)),
              n.guid || (n.guid = pt.guid++),
              (a = g.events) || (a = g.events = {}),
              (c = g.handle) ||
                ((c = g.handle = function (t) {
                  return void 0 === pt || (t && pt.event.triggered === t.type)
                    ? undefined
                    : pt.event.dispatch.apply(c.elem, arguments);
                }).elem = t),
              s = (e = (e || "").match(It) || [""]).length;
            s--;

          )
            (p = m = (r = ee.exec(e[s]) || [])[1]),
              (h = (r[2] || "").split(".").sort()),
              p &&
                ((u = pt.event.special[p] || {}),
                (p = (o ? u.delegateType : u.bindType) || p),
                (u = pt.event.special[p] || {}),
                (d = pt.extend(
                  {
                    type: p,
                    origType: m,
                    data: i,
                    handler: n,
                    guid: n.guid,
                    selector: o,
                    needsContext: o && pt.expr.match.needsContext.test(o),
                    namespace: h.join("."),
                  },
                  l
                )),
                (f = a[p]) ||
                  (((f = a[p] = []).delegateCount = 0),
                  (u.setup && !1 !== u.setup.call(t, i, h, c)) ||
                    (t.addEventListener
                      ? t.addEventListener(p, c, !1)
                      : t.attachEvent && t.attachEvent("on" + p, c))),
                u.add &&
                  (u.add.call(t, d),
                  d.handler.guid || (d.handler.guid = n.guid)),
                o ? f.splice(f.delegateCount++, 0, d) : f.push(d),
                (pt.event.global[p] = !0));
          t = null;
        }
      },
      remove: function (t, e, n, i, o) {
        var r,
          a,
          s,
          l,
          u,
          c,
          d,
          f,
          p,
          h,
          m,
          g = pt.hasData(t) && pt._data(t);
        if (g && (c = g.events)) {
          for (u = (e = (e || "").match(It) || [""]).length; u--; )
            if (
              ((p = m = (s = ee.exec(e[u]) || [])[1]),
              (h = (s[2] || "").split(".").sort()),
              p)
            ) {
              for (
                d = pt.event.special[p] || {},
                  f = c[(p = (i ? d.delegateType : d.bindType) || p)] || [],
                  s =
                    s[2] &&
                    new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"),
                  l = r = f.length;
                r--;

              )
                (a = f[r]),
                  (!o && m !== a.origType) ||
                    (n && n.guid !== a.guid) ||
                    (s && !s.test(a.namespace)) ||
                    (i && i !== a.selector && ("**" !== i || !a.selector)) ||
                    (f.splice(r, 1),
                    a.selector && f.delegateCount--,
                    d.remove && d.remove.call(t, a));
              l &&
                !f.length &&
                ((d.teardown && !1 !== d.teardown.call(t, h, g.handle)) ||
                  pt.removeEvent(t, p, g.handle),
                delete c[p]);
            } else for (p in c) pt.event.remove(t, p + e[u], n, i, !0);
          pt.isEmptyObject(c) && (delete g.handle, pt._removeData(t, "events"));
        }
      },
      trigger: function (t, e, n, i) {
        var o,
          r,
          a,
          s,
          l,
          u,
          c,
          d = [n || it],
          f = ct.call(t, "type") ? t.type : t,
          p = ct.call(t, "namespace") ? t.namespace.split(".") : [];
        if (
          ((a = u = n = n || it),
          3 !== n.nodeType &&
            8 !== n.nodeType &&
            !te.test(f + pt.event.triggered) &&
            (-1 < f.indexOf(".") &&
              ((f = (p = f.split(".")).shift()), p.sort()),
            (r = f.indexOf(":") < 0 && "on" + f),
            ((t = t[pt.expando]
              ? t
              : new pt.Event(f, "object" == typeof t && t)).isTrigger = i
              ? 2
              : 3),
            (t.namespace = p.join(".")),
            (t.rnamespace = t.namespace
              ? new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)")
              : null),
            (t.result = undefined),
            t.target || (t.target = n),
            (e = null == e ? [t] : pt.makeArray(e, [t])),
            (l = pt.event.special[f] || {}),
            i || !l.trigger || !1 !== l.trigger.apply(n, e)))
        ) {
          if (!i && !l.noBubble && !pt.isWindow(n)) {
            for (
              s = l.delegateType || f, te.test(s + f) || (a = a.parentNode);
              a;
              a = a.parentNode
            )
              d.push(a), (u = a);
            u === (n.ownerDocument || it) &&
              d.push(u.defaultView || u.parentWindow || C);
          }
          for (c = 0; (a = d[c++]) && !t.isPropagationStopped(); )
            (t.type = 1 < c ? s : l.bindType || f),
              (o =
                (pt._data(a, "events") || {})[t.type] &&
                pt._data(a, "handle")) && o.apply(a, e),
              (o = r && a[r]) &&
                o.apply &&
                jt(a) &&
                ((t.result = o.apply(a, e)),
                !1 === t.result && t.preventDefault());
          if (
            ((t.type = f),
            !i &&
              !t.isDefaultPrevented() &&
              (!l._default || !1 === l._default.apply(d.pop(), e)) &&
              jt(n) &&
              r &&
              n[f] &&
              !pt.isWindow(n))
          ) {
            (u = n[r]) && (n[r] = null), (pt.event.triggered = f);
            try {
              n[f]();
            } catch (h) {}
            (pt.event.triggered = undefined), u && (n[r] = u);
          }
          return t.result;
        }
      },
      dispatch: function (t) {
        t = pt.event.fix(t);
        var e,
          n,
          i,
          o,
          r,
          a = [],
          s = ot.call(arguments),
          l = (pt._data(this, "events") || {})[t.type] || [],
          u = pt.event.special[t.type] || {};
        if (
          (((s[0] = t).delegateTarget = this),
          !u.preDispatch || !1 !== u.preDispatch.call(this, t))
        ) {
          for (
            a = pt.event.handlers.call(this, t, l), e = 0;
            (o = a[e++]) && !t.isPropagationStopped();

          )
            for (
              t.currentTarget = o.elem, n = 0;
              (r = o.handlers[n++]) && !t.isImmediatePropagationStopped();

            )
              (t.rnamespace && !t.rnamespace.test(r.namespace)) ||
                ((t.handleObj = r),
                (t.data = r.data),
                (i = (
                  (pt.event.special[r.origType] || {}).handle || r.handler
                ).apply(o.elem, s)) !== undefined &&
                  !1 === (t.result = i) &&
                  (t.preventDefault(), t.stopPropagation()));
          return u.postDispatch && u.postDispatch.call(this, t), t.result;
        }
      },
      handlers: function (t, e) {
        var n,
          i,
          o,
          r,
          a = [],
          s = e.delegateCount,
          l = t.target;
        if (
          s &&
          l.nodeType &&
          ("click" !== t.type || isNaN(t.button) || t.button < 1)
        )
          for (; l != this; l = l.parentNode || this)
            if (1 === l.nodeType && (!0 !== l.disabled || "click" !== t.type)) {
              for (i = [], n = 0; n < s; n++)
                i[(o = (r = e[n]).selector + " ")] === undefined &&
                  (i[o] = r.needsContext
                    ? -1 < pt(o, this).index(l)
                    : pt.find(o, this, null, [l]).length),
                  i[o] && i.push(r);
              i.length && a.push({ elem: l, handlers: i });
            }
        return s < e.length && a.push({ elem: this, handlers: e.slice(s) }), a;
      },
      fix: function (t) {
        if (t[pt.expando]) return t;
        var e,
          n,
          i,
          o = t.type,
          r = t,
          a = this.fixHooks[o];
        for (
          a ||
            (this.fixHooks[o] = a = Zt.test(o)
              ? this.mouseHooks
              : Yt.test(o)
              ? this.keyHooks
              : {}),
            i = a.props ? this.props.concat(a.props) : this.props,
            t = new pt.Event(r),
            e = i.length;
          e--;

        )
          t[(n = i[e])] = r[n];
        return (
          t.target || (t.target = r.srcElement || it),
          3 === t.target.nodeType && (t.target = t.target.parentNode),
          (t.metaKey = !!t.metaKey),
          a.filter ? a.filter(t, r) : t
        );
      },
      props: "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(
        " "
      ),
      fixHooks: {},
      keyHooks: {
        props: "char charCode key keyCode".split(" "),
        filter: function (t, e) {
          return (
            null == t.which &&
              (t.which = null != e.charCode ? e.charCode : e.keyCode),
            t
          );
        },
      },
      mouseHooks: {
        props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(
          " "
        ),
        filter: function (t, e) {
          var n,
            i,
            o,
            r = e.button,
            a = e.fromElement;
          return (
            null == t.pageX &&
              null != e.clientX &&
              ((o = (i = t.target.ownerDocument || it).documentElement),
              (n = i.body),
              (t.pageX =
                e.clientX +
                ((o && o.scrollLeft) || (n && n.scrollLeft) || 0) -
                ((o && o.clientLeft) || (n && n.clientLeft) || 0)),
              (t.pageY =
                e.clientY +
                ((o && o.scrollTop) || (n && n.scrollTop) || 0) -
                ((o && o.clientTop) || (n && n.clientTop) || 0))),
            !t.relatedTarget &&
              a &&
              (t.relatedTarget = a === t.target ? e.toElement : a),
            t.which ||
              r === undefined ||
              (t.which = 1 & r ? 1 : 2 & r ? 3 : 4 & r ? 2 : 0),
            t
          );
        },
      },
      special: {
        load: { noBubble: !0 },
        focus: {
          trigger: function () {
            if (this !== h() && this.focus)
              try {
                return this.focus(), !1;
              } catch (t) {}
          },
          delegateType: "focusin",
        },
        blur: {
          trigger: function () {
            if (this === h() && this.blur) return this.blur(), !1;
          },
          delegateType: "focusout",
        },
        click: {
          trigger: function () {
            if (
              pt.nodeName(this, "input") &&
              "checkbox" === this.type &&
              this.click
            )
              return this.click(), !1;
          },
          _default: function (t) {
            return pt.nodeName(t.target, "a");
          },
        },
        beforeunload: {
          postDispatch: function (t) {
            t.result !== undefined &&
              t.originalEvent &&
              (t.originalEvent.returnValue = t.result);
          },
        },
      },
      simulate: function (t, e, n) {
        var i = pt.extend(new pt.Event(), n, { type: t, isSimulated: !0 });
        pt.event.trigger(i, null, e),
          i.isDefaultPrevented() && n.preventDefault();
      },
    }),
      (pt.removeEvent = it.removeEventListener
        ? function (t, e, n) {
            t.removeEventListener && t.removeEventListener(e, n);
          }
        : function (t, e, n) {
            var i = "on" + e;
            t.detachEvent &&
              ("undefined" == typeof t[i] && (t[i] = null),
              t.detachEvent(i, n));
          }),
      (pt.Event = function (t, e) {
        if (!(this instanceof pt.Event)) return new pt.Event(t, e);
        t && t.type
          ? ((this.originalEvent = t),
            (this.type = t.type),
            (this.isDefaultPrevented =
              t.defaultPrevented ||
              (t.defaultPrevented === undefined && !1 === t.returnValue)
                ? f
                : p))
          : (this.type = t),
          e && pt.extend(this, e),
          (this.timeStamp = (t && t.timeStamp) || pt.now()),
          (this[pt.expando] = !0);
      }),
      (pt.Event.prototype = {
        constructor: pt.Event,
        isDefaultPrevented: p,
        isPropagationStopped: p,
        isImmediatePropagationStopped: p,
        preventDefault: function () {
          var t = this.originalEvent;
          (this.isDefaultPrevented = f),
            t && (t.preventDefault ? t.preventDefault() : (t.returnValue = !1));
        },
        stopPropagation: function () {
          var t = this.originalEvent;
          (this.isPropagationStopped = f),
            t &&
              !this.isSimulated &&
              (t.stopPropagation && t.stopPropagation(), (t.cancelBubble = !0));
        },
        stopImmediatePropagation: function () {
          var t = this.originalEvent;
          (this.isImmediatePropagationStopped = f),
            t && t.stopImmediatePropagation && t.stopImmediatePropagation(),
            this.stopPropagation();
        },
      }),
      pt.each(
        {
          mouseenter: "mouseover",
          mouseleave: "mouseout",
          pointerenter: "pointerover",
          pointerleave: "pointerout",
        },
        function (t, r) {
          pt.event.special[t] = {
            delegateType: r,
            bindType: r,
            handle: function (t) {
              var e,
                n = this,
                i = t.relatedTarget,
                o = t.handleObj;
              return (
                (i && (i === n || pt.contains(n, i))) ||
                  ((t.type = o.origType),
                  (e = o.handler.apply(this, arguments)),
                  (t.type = r)),
                e
              );
            },
          };
        }
      ),
      dt.submit ||
        (pt.event.special.submit = {
          setup: function () {
            if (pt.nodeName(this, "form")) return !1;
            pt.event.add(this, "click._submit keypress._submit", function (t) {
              var e = t.target,
                n =
                  pt.nodeName(e, "input") || pt.nodeName(e, "button")
                    ? pt.prop(e, "form")
                    : undefined;
              n &&
                !pt._data(n, "submit") &&
                (pt.event.add(n, "submit._submit", function (t) {
                  t._submitBubble = !0;
                }),
                pt._data(n, "submit", !0));
            });
          },
          postDispatch: function (t) {
            t._submitBubble &&
              (delete t._submitBubble,
              this.parentNode &&
                !t.isTrigger &&
                pt.event.simulate("submit", this.parentNode, t));
          },
          teardown: function () {
            if (pt.nodeName(this, "form")) return !1;
            pt.event.remove(this, "._submit");
          },
        }),
      dt.change ||
        (pt.event.special.change = {
          setup: function () {
            if (Jt.test(this.nodeName))
              return (
                ("checkbox" !== this.type && "radio" !== this.type) ||
                  (pt.event.add(this, "propertychange._change", function (t) {
                    "checked" === t.originalEvent.propertyName &&
                      (this._justChanged = !0);
                  }),
                  pt.event.add(this, "click._change", function (t) {
                    this._justChanged &&
                      !t.isTrigger &&
                      (this._justChanged = !1),
                      pt.event.simulate("change", this, t);
                  })),
                !1
              );
            pt.event.add(this, "beforeactivate._change", function (t) {
              var e = t.target;
              Jt.test(e.nodeName) &&
                !pt._data(e, "change") &&
                (pt.event.add(e, "change._change", function (t) {
                  !this.parentNode ||
                    t.isSimulated ||
                    t.isTrigger ||
                    pt.event.simulate("change", this.parentNode, t);
                }),
                pt._data(e, "change", !0));
            });
          },
          handle: function (t) {
            var e = t.target;
            if (
              this !== e ||
              t.isSimulated ||
              t.isTrigger ||
              ("radio" !== e.type && "checkbox" !== e.type)
            )
              return t.handleObj.handler.apply(this, arguments);
          },
          teardown: function () {
            return pt.event.remove(this, "._change"), !Jt.test(this.nodeName);
          },
        }),
      dt.focusin ||
        pt.each({ focus: "focusin", blur: "focusout" }, function (n, i) {
          var o = function (t) {
            pt.event.simulate(i, t.target, pt.event.fix(t));
          };
          pt.event.special[i] = {
            setup: function () {
              var t = this.ownerDocument || this,
                e = pt._data(t, i);
              e || t.addEventListener(n, o, !0), pt._data(t, i, (e || 0) + 1);
            },
            teardown: function () {
              var t = this.ownerDocument || this,
                e = pt._data(t, i) - 1;
              e
                ? pt._data(t, i, e)
                : (t.removeEventListener(n, o, !0), pt._removeData(t, i));
            },
          };
        }),
      pt.fn.extend({
        on: function (t, e, n, i) {
          return x(this, t, e, n, i);
        },
        one: function (t, e, n, i) {
          return x(this, t, e, n, i, 1);
        },
        off: function (t, e, n) {
          var i, o;
          if (t && t.preventDefault && t.handleObj)
            return (
              (i = t.handleObj),
              pt(t.delegateTarget).off(
                i.namespace ? i.origType + "." + i.namespace : i.origType,
                i.selector,
                i.handler
              ),
              this
            );
          if ("object" != typeof t)
            return (
              (!1 !== e && "function" != typeof e) ||
                ((n = e), (e = undefined)),
              !1 === n && (n = p),
              this.each(function () {
                pt.event.remove(this, t, n, e);
              })
            );
          for (o in t) this.off(o, e, t[o]);
          return this;
        },
        trigger: function (t, e) {
          return this.each(function () {
            pt.event.trigger(t, e, this);
          });
        },
        triggerHandler: function (t, e) {
          var n = this[0];
          if (n) return pt.event.trigger(t, e, n, !0);
        },
      });
    var ne = / jQuery\d+="(?:null|\d+)"/g,
      ie = new RegExp("<(?:" + Xt + ")[\\s/>]", "i"),
      oe = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
      re = /<script|<style|<link/i,
      ae = /checked\s*(?:[^=]|=\s*.checked.)/i,
      se = /^true\/(.*)/,
      le = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
      ue = g(it).appendChild(it.createElement("div"));
    pt.extend({
      htmlPrefilter: function (t) {
        return t.replace(oe, "<$1></$2>");
      },
      clone: function (t, e, n) {
        var i,
          o,
          r,
          a,
          s,
          l = pt.contains(t.ownerDocument, t);
        if (
          (dt.html5Clone || pt.isXMLDoc(t) || !ie.test("<" + t.nodeName + ">")
            ? (r = t.cloneNode(!0))
            : ((ue.innerHTML = t.outerHTML),
              ue.removeChild((r = ue.firstChild))),
          !(
            (dt.noCloneEvent && dt.noCloneChecked) ||
            (1 !== t.nodeType && 11 !== t.nodeType) ||
            pt.isXMLDoc(t)
          ))
        )
          for (i = v(r), s = v(t), a = 0; null != (o = s[a]); ++a)
            i[a] && E(o, i[a]);
        if (e)
          if (n)
            for (s = s || v(t), i = i || v(r), a = 0; null != (o = s[a]); a++)
              S(o, i[a]);
          else S(t, r);
        return (
          0 < (i = v(r, "script")).length && b(i, !l && v(t, "script")),
          (i = s = o = null),
          r
        );
      },
      cleanData: function (t, e) {
        for (
          var n,
            i,
            o,
            r,
            a = 0,
            s = pt.expando,
            l = pt.cache,
            u = dt.attributes,
            c = pt.event.special;
          null != (n = t[a]);
          a++
        )
          if ((e || jt(n)) && (r = (o = n[s]) && l[o])) {
            if (r.events)
              for (i in r.events)
                c[i] ? pt.event.remove(n, i) : pt.removeEvent(n, i, r.handle);
            l[o] &&
              (delete l[o],
              u || "undefined" == typeof n.removeAttribute
                ? (n[s] = undefined)
                : n.removeAttribute(s),
              nt.push(o));
          }
      },
    }),
      pt.fn.extend({
        domManip: D,
        detach: function (t) {
          return N(this, t, !0);
        },
        remove: function (t) {
          return N(this, t);
        },
        text: function (t) {
          return Ft(
            this,
            function (t) {
              return t === undefined
                ? pt.text(this)
                : this.empty().append(
                    ((this[0] && this[0].ownerDocument) || it).createTextNode(t)
                  );
            },
            null,
            t,
            arguments.length
          );
        },
        append: function () {
          return D(this, arguments, function (t) {
            (1 !== this.nodeType &&
              11 !== this.nodeType &&
              9 !== this.nodeType) ||
              w(this, t).appendChild(t);
          });
        },
        prepend: function () {
          return D(this, arguments, function (t) {
            if (
              1 === this.nodeType ||
              11 === this.nodeType ||
              9 === this.nodeType
            ) {
              var e = w(this, t);
              e.insertBefore(t, e.firstChild);
            }
          });
        },
        before: function () {
          return D(this, arguments, function (t) {
            this.parentNode && this.parentNode.insertBefore(t, this);
          });
        },
        after: function () {
          return D(this, arguments, function (t) {
            this.parentNode &&
              this.parentNode.insertBefore(t, this.nextSibling);
          });
        },
        empty: function () {
          for (var t, e = 0; null != (t = this[e]); e++) {
            for (1 === t.nodeType && pt.cleanData(v(t, !1)); t.firstChild; )
              t.removeChild(t.firstChild);
            t.options && pt.nodeName(t, "select") && (t.options.length = 0);
          }
          return this;
        },
        clone: function (t, e) {
          return (
            (t = null != t && t),
            (e = null == e ? t : e),
            this.map(function () {
              return pt.clone(this, t, e);
            })
          );
        },
        html: function (t) {
          return Ft(
            this,
            function (t) {
              var e = this[0] || {},
                n = 0,
                i = this.length;
              if (t === undefined)
                return 1 === e.nodeType
                  ? e.innerHTML.replace(ne, "")
                  : undefined;
              if (
                "string" == typeof t &&
                !re.test(t) &&
                (dt.htmlSerialize || !ie.test(t)) &&
                (dt.leadingWhitespace || !Qt.test(t)) &&
                !Vt[(zt.exec(t) || ["", ""])[1].toLowerCase()]
              ) {
                t = pt.htmlPrefilter(t);
                try {
                  for (; n < i; n++)
                    1 === (e = this[n] || {}).nodeType &&
                      (pt.cleanData(v(e, !1)), (e.innerHTML = t));
                  e = 0;
                } catch (o) {}
              }
              e && this.empty().append(t);
            },
            null,
            t,
            arguments.length
          );
        },
        replaceWith: function () {
          var n = [];
          return D(
            this,
            arguments,
            function (t) {
              var e = this.parentNode;
              pt.inArray(this, n) < 0 &&
                (pt.cleanData(v(this)), e && e.replaceChild(t, this));
            },
            n
          );
        },
      }),
      pt.each(
        {
          appendTo: "append",
          prependTo: "prepend",
          insertBefore: "before",
          insertAfter: "after",
          replaceAll: "replaceWith",
        },
        function (t, a) {
          pt.fn[t] = function (t) {
            for (var e, n = 0, i = [], o = pt(t), r = o.length - 1; n <= r; n++)
              (e = n === r ? this : this.clone(!0)),
                pt(o[n])[a](e),
                at.apply(i, e.get());
            return this.pushStack(i);
          };
        }
      );
    var ce,
      de = { HTML: "block", BODY: "block" },
      fe = /^margin/,
      pe = new RegExp("^(" + Mt + ")(?!px)[a-z%]+$", "i"),
      he = function (t, e, n, i) {
        var o,
          r,
          a = {};
        for (r in e) (a[r] = t.style[r]), (t.style[r] = e[r]);
        for (r in ((o = n.apply(t, i || [])), e)) t.style[r] = a[r];
        return o;
      },
      me = it.documentElement;
    !(function () {
      function t() {
        var t,
          e,
          n = it.documentElement;
        n.appendChild(u),
          (c.style.cssText =
            "-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%"),
          (i = r = l = !1),
          (o = s = !0),
          C.getComputedStyle &&
            ((e = C.getComputedStyle(c)),
            (i = "1%" !== (e || {}).top),
            (l = "2px" === (e || {}).marginLeft),
            (r = "4px" === (e || { width: "4px" }).width),
            (c.style.marginRight = "50%"),
            (o = "4px" === (e || { marginRight: "4px" }).marginRight),
            ((t = c.appendChild(
              it.createElement("div")
            )).style.cssText = c.style.cssText =
              "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0"),
            (t.style.marginRight = t.style.width = "0"),
            (c.style.width = "1px"),
            (s = !parseFloat((C.getComputedStyle(t) || {}).marginRight)),
            c.removeChild(t)),
          (c.style.display = "none"),
          (a = 0 === c.getClientRects().length) &&
            ((c.style.display = ""),
            (c.innerHTML = "<table><tr><td></td><td>t</td></tr></table>"),
            (c.childNodes[0].style.borderCollapse = "separate"),
            ((t = c.getElementsByTagName("td"))[0].style.cssText =
              "margin:0;border:0;padding:0;display:none"),
            (a = 0 === t[0].offsetHeight) &&
              ((t[0].style.display = ""),
              (t[1].style.display = "none"),
              (a = 0 === t[0].offsetHeight))),
          n.removeChild(u);
      }
      var i,
        o,
        r,
        a,
        s,
        l,
        u = it.createElement("div"),
        c = it.createElement("div");
      c.style &&
        ((c.style.cssText = "float:left;opacity:.5"),
        (dt.opacity = "0.5" === c.style.opacity),
        (dt.cssFloat = !!c.style.cssFloat),
        (c.style.backgroundClip = "content-box"),
        (c.cloneNode(!0).style.backgroundClip = ""),
        (dt.clearCloneStyle = "content-box" === c.style.backgroundClip),
        ((u = it.createElement("div")).style.cssText =
          "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute"),
        (c.innerHTML = ""),
        u.appendChild(c),
        (dt.boxSizing =
          "" === c.style.boxSizing ||
          "" === c.style.MozBoxSizing ||
          "" === c.style.WebkitBoxSizing),
        pt.extend(dt, {
          reliableHiddenOffsets: function () {
            return null == i && t(), a;
          },
          boxSizingReliable: function () {
            return null == i && t(), r;
          },
          pixelMarginRight: function () {
            return null == i && t(), o;
          },
          pixelPosition: function () {
            return null == i && t(), i;
          },
          reliableMarginRight: function () {
            return null == i && t(), s;
          },
          reliableMarginLeft: function () {
            return null == i && t(), l;
          },
        }));
    })();
    var ge,
      ve,
      be = /^(top|right|bottom|left)$/;
    C.getComputedStyle
      ? ((ge = function (t) {
          var e = t.ownerDocument.defaultView;
          return (e && e.opener) || (e = C), e.getComputedStyle(t);
        }),
        (ve = function (t, e, n) {
          var i,
            o,
            r,
            a,
            s = t.style;
          return (
            ("" !==
              (a = (n = n || ge(t))
                ? n.getPropertyValue(e) || n[e]
                : undefined) &&
              a !== undefined) ||
              pt.contains(t.ownerDocument, t) ||
              (a = pt.style(t, e)),
            n &&
              !dt.pixelMarginRight() &&
              pe.test(a) &&
              fe.test(e) &&
              ((i = s.width),
              (o = s.minWidth),
              (r = s.maxWidth),
              (s.minWidth = s.maxWidth = s.width = a),
              (a = n.width),
              (s.width = i),
              (s.minWidth = o),
              (s.maxWidth = r)),
            a === undefined ? a : a + ""
          );
        }))
      : me.currentStyle &&
        ((ge = function (t) {
          return t.currentStyle;
        }),
        (ve = function (t, e, n) {
          var i,
            o,
            r,
            a,
            s = t.style;
          return (
            null == (a = (n = n || ge(t)) ? n[e] : undefined) &&
              s &&
              s[e] &&
              (a = s[e]),
            pe.test(a) &&
              !be.test(e) &&
              ((i = s.left),
              (r = (o = t.runtimeStyle) && o.left) &&
                (o.left = t.currentStyle.left),
              (s.left = "fontSize" === e ? "1em" : a),
              (a = s.pixelLeft + "px"),
              (s.left = i),
              r && (o.left = r)),
            a === undefined ? a : a + "" || "auto"
          );
        }));
    var ye = /alpha\([^)]*\)/i,
      xe = /opacity\s*=\s*([^)]*)/i,
      we = /^(none|table(?!-c[ea]).+)/,
      Te = new RegExp("^(" + Mt + ")(.*)$", "i"),
      Ce = { position: "absolute", visibility: "hidden", display: "block" },
      ke = { letterSpacing: "0", fontWeight: "400" },
      Se = ["Webkit", "O", "Moz", "ms"],
      Ee = it.createElement("div").style;
    pt.extend({
      cssHooks: {
        opacity: {
          get: function (t, e) {
            if (e) {
              var n = ve(t, "opacity");
              return "" === n ? "1" : n;
            }
          },
        },
      },
      cssNumber: {
        animationIterationCount: !0,
        columnCount: !0,
        fillOpacity: !0,
        flexGrow: !0,
        flexShrink: !0,
        fontWeight: !0,
        lineHeight: !0,
        opacity: !0,
        order: !0,
        orphans: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0,
      },
      cssProps: { float: dt.cssFloat ? "cssFloat" : "styleFloat" },
      style: function (t, e, n, i) {
        if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
          var o,
            r,
            a,
            s = pt.camelCase(e),
            l = t.style;
          if (
            ((e = pt.cssProps[s] || (pt.cssProps[s] = j(s) || s)),
            (a = pt.cssHooks[e] || pt.cssHooks[s]),
            n === undefined)
          )
            return a && "get" in a && (o = a.get(t, !1, i)) !== undefined
              ? o
              : l[e];
          if (
            ("string" === (r = typeof n) &&
              (o = qt.exec(n)) &&
              o[1] &&
              ((n = d(t, e, o)), (r = "number")),
            null != n &&
              n == n &&
              ("number" === r &&
                (n += (o && o[3]) || (pt.cssNumber[s] ? "" : "px")),
              dt.clearCloneStyle ||
                "" !== n ||
                0 !== e.indexOf("background") ||
                (l[e] = "inherit"),
              !(a && "set" in a && (n = a.set(t, n, i)) === undefined)))
          )
            try {
              l[e] = n;
            } catch (u) {}
        }
      },
      css: function (t, e, n, i) {
        var o,
          r,
          a,
          s = pt.camelCase(e);
        return (
          (e = pt.cssProps[s] || (pt.cssProps[s] = j(s) || s)),
          (a = pt.cssHooks[e] || pt.cssHooks[s]) &&
            "get" in a &&
            (r = a.get(t, !0, n)),
          r === undefined && (r = ve(t, e, i)),
          "normal" === r && e in ke && (r = ke[e]),
          "" === n || n
            ? ((o = parseFloat(r)), !0 === n || isFinite(o) ? o || 0 : r)
            : r
        );
      },
    }),
      pt.each(["height", "width"], function (t, o) {
        pt.cssHooks[o] = {
          get: function (t, e, n) {
            if (e)
              return we.test(pt.css(t, "display")) && 0 === t.offsetWidth
                ? he(t, Ce, function () {
                    return R(t, o, n);
                  })
                : R(t, o, n);
          },
          set: function (t, e, n) {
            var i = n && ge(t);
            return L(
              t,
              e,
              n
                ? H(
                    t,
                    o,
                    n,
                    dt.boxSizing &&
                      "border-box" === pt.css(t, "boxSizing", !1, i),
                    i
                  )
                : 0
            );
          },
        };
      }),
      dt.opacity ||
        (pt.cssHooks.opacity = {
          get: function (t, e) {
            return xe.test(
              (e && t.currentStyle ? t.currentStyle.filter : t.style.filter) ||
                ""
            )
              ? 0.01 * parseFloat(RegExp.$1) + ""
              : e
              ? "1"
              : "";
          },
          set: function (t, e) {
            var n = t.style,
              i = t.currentStyle,
              o = pt.isNumeric(e) ? "alpha(opacity=" + 100 * e + ")" : "",
              r = (i && i.filter) || n.filter || "";
            (((n.zoom = 1) <= e || "" === e) &&
              "" === pt.trim(r.replace(ye, "")) &&
              n.removeAttribute &&
              (n.removeAttribute("filter"), "" === e || (i && !i.filter))) ||
              (n.filter = ye.test(r) ? r.replace(ye, o) : r + " " + o);
          },
        }),
      (pt.cssHooks.marginRight = A(dt.reliableMarginRight, function (t, e) {
        if (e)
          return he(t, { display: "inline-block" }, ve, [t, "marginRight"]);
      })),
      (pt.cssHooks.marginLeft = A(dt.reliableMarginLeft, function (t, e) {
        if (e)
          return (
            (parseFloat(ve(t, "marginLeft")) ||
              (pt.contains(t.ownerDocument, t)
                ? t.getBoundingClientRect().left -
                  he(t, { marginLeft: 0 }, function () {
                    return t.getBoundingClientRect().left;
                  })
                : 0)) + "px"
          );
      })),
      pt.each({ margin: "", padding: "", border: "Width" }, function (o, r) {
        (pt.cssHooks[o + r] = {
          expand: function (t) {
            for (
              var e = 0, n = {}, i = "string" == typeof t ? t.split(" ") : [t];
              e < 4;
              e++
            )
              n[o + _t[e] + r] = i[e] || i[e - 2] || i[0];
            return n;
          },
        }),
          fe.test(o) || (pt.cssHooks[o + r].set = L);
      }),
      pt.fn.extend({
        css: function (t, e) {
          return Ft(
            this,
            function (t, e, n) {
              var i,
                o,
                r = {},
                a = 0;
              if (pt.isArray(e)) {
                for (i = ge(t), o = e.length; a < o; a++)
                  r[e[a]] = pt.css(t, e[a], !1, i);
                return r;
              }
              return n !== undefined ? pt.style(t, e, n) : pt.css(t, e);
            },
            t,
            e,
            1 < arguments.length
          );
        },
        show: function () {
          return O(this, !0);
        },
        hide: function () {
          return O(this);
        },
        toggle: function (t) {
          return "boolean" == typeof t
            ? t
              ? this.show()
              : this.hide()
            : this.each(function () {
                Bt(this) ? pt(this).show() : pt(this).hide();
              });
        },
      }),
      ((pt.Tween = P).prototype = {
        constructor: P,
        init: function (t, e, n, i, o, r) {
          (this.elem = t),
            (this.prop = n),
            (this.easing = o || pt.easing._default),
            (this.options = e),
            (this.start = this.now = this.cur()),
            (this.end = i),
            (this.unit = r || (pt.cssNumber[n] ? "" : "px"));
        },
        cur: function () {
          var t = P.propHooks[this.prop];
          return t && t.get ? t.get(this) : P.propHooks._default.get(this);
        },
        run: function (t) {
          var e,
            n = P.propHooks[this.prop];
          return (
            this.options.duration
              ? (this.pos = e = pt.easing[this.easing](
                  t,
                  this.options.duration * t,
                  0,
                  1,
                  this.options.duration
                ))
              : (this.pos = e = t),
            (this.now = (this.end - this.start) * e + this.start),
            this.options.step &&
              this.options.step.call(this.elem, this.now, this),
            n && n.set ? n.set(this) : P.propHooks._default.set(this),
            this
          );
        },
      }),
      (P.prototype.init.prototype = P.prototype),
      (P.propHooks = {
        _default: {
          get: function (t) {
            var e;
            return 1 !== t.elem.nodeType ||
              (null != t.elem[t.prop] && null == t.elem.style[t.prop])
              ? t.elem[t.prop]
              : (e = pt.css(t.elem, t.prop, "")) && "auto" !== e
              ? e
              : 0;
          },
          set: function (t) {
            pt.fx.step[t.prop]
              ? pt.fx.step[t.prop](t)
              : 1 !== t.elem.nodeType ||
                (null == t.elem.style[pt.cssProps[t.prop]] &&
                  !pt.cssHooks[t.prop])
              ? (t.elem[t.prop] = t.now)
              : pt.style(t.elem, t.prop, t.now + t.unit);
          },
        },
      }),
      (P.propHooks.scrollTop = P.propHooks.scrollLeft = {
        set: function (t) {
          t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now);
        },
      }),
      (pt.easing = {
        linear: function (t) {
          return t;
        },
        swing: function (t) {
          return 0.5 - Math.cos(t * Math.PI) / 2;
        },
        _default: "swing",
      }),
      (pt.fx = P.prototype.init),
      (pt.fx.step = {});
    var De,
      Ne,
      $e,
      Ie,
      Ae,
      je,
      Oe,
      Le = /^(?:toggle|show|hide)$/,
      He = /queueHooks$/;
    (pt.Animation = pt.extend(W, {
      tweeners: {
        "*": [
          function (t, e) {
            var n = this.createTween(t, e);
            return d(n.elem, t, qt.exec(e), n), n;
          },
        ],
      },
      tweener: function (t, e) {
        for (
          var n,
            i = 0,
            o = (t = pt.isFunction(t) ? ((e = t), ["*"]) : t.match(It)).length;
          i < o;
          i++
        )
          (n = t[i]),
            (W.tweeners[n] = W.tweeners[n] || []),
            W.tweeners[n].unshift(e);
      },
      prefilters: [B],
      prefilter: function (t, e) {
        e ? W.prefilters.unshift(t) : W.prefilters.push(t);
      },
    })),
      (pt.speed = function (t, e, n) {
        var i =
          t && "object" == typeof t
            ? pt.extend({}, t)
            : {
                complete: n || (!n && e) || (pt.isFunction(t) && t),
                duration: t,
                easing: (n && e) || (e && !pt.isFunction(e) && e),
              };
        return (
          (i.duration = pt.fx.off
            ? 0
            : "number" == typeof i.duration
            ? i.duration
            : i.duration in pt.fx.speeds
            ? pt.fx.speeds[i.duration]
            : pt.fx.speeds._default),
          (null != i.queue && !0 !== i.queue) || (i.queue = "fx"),
          (i.old = i.complete),
          (i.complete = function () {
            pt.isFunction(i.old) && i.old.call(this),
              i.queue && pt.dequeue(this, i.queue);
          }),
          i
        );
      }),
      pt.fn.extend({
        fadeTo: function (t, e, n, i) {
          return this.filter(Bt)
            .css("opacity", 0)
            .show()
            .end()
            .animate({ opacity: e }, t, n, i);
        },
        animate: function (e, t, n, i) {
          var o = pt.isEmptyObject(e),
            r = pt.speed(t, n, i),
            a = function () {
              var t = W(this, pt.extend({}, e), r);
              (o || pt._data(this, "finish")) && t.stop(!0);
            };
          return (
            (a.finish = a),
            o || !1 === r.queue ? this.each(a) : this.queue(r.queue, a)
          );
        },
        stop: function (o, t, r) {
          var a = function (t) {
            var e = t.stop;
            delete t.stop, e(r);
          };
          return (
            "string" != typeof o && ((r = t), (t = o), (o = undefined)),
            t && !1 !== o && this.queue(o || "fx", []),
            this.each(function () {
              var t = !0,
                e = null != o && o + "queueHooks",
                n = pt.timers,
                i = pt._data(this);
              if (e) i[e] && i[e].stop && a(i[e]);
              else for (e in i) i[e] && i[e].stop && He.test(e) && a(i[e]);
              for (e = n.length; e--; )
                n[e].elem !== this ||
                  (null != o && n[e].queue !== o) ||
                  (n[e].anim.stop(r), (t = !1), n.splice(e, 1));
              (!t && r) || pt.dequeue(this, o);
            })
          );
        },
        finish: function (a) {
          return (
            !1 !== a && (a = a || "fx"),
            this.each(function () {
              var t,
                e = pt._data(this),
                n = e[a + "queue"],
                i = e[a + "queueHooks"],
                o = pt.timers,
                r = n ? n.length : 0;
              for (
                e.finish = !0,
                  pt.queue(this, a, []),
                  i && i.stop && i.stop.call(this, !0),
                  t = o.length;
                t--;

              )
                o[t].elem === this &&
                  o[t].queue === a &&
                  (o[t].anim.stop(!0), o.splice(t, 1));
              for (t = 0; t < r; t++)
                n[t] && n[t].finish && n[t].finish.call(this);
              delete e.finish;
            })
          );
        },
      }),
      pt.each(["toggle", "show", "hide"], function (t, i) {
        var o = pt.fn[i];
        pt.fn[i] = function (t, e, n) {
          return null == t || "boolean" == typeof t
            ? o.apply(this, arguments)
            : this.animate(q(i, !0), t, e, n);
        };
      }),
      pt.each(
        {
          slideDown: q("show"),
          slideUp: q("hide"),
          slideToggle: q("toggle"),
          fadeIn: { opacity: "show" },
          fadeOut: { opacity: "hide" },
          fadeToggle: { opacity: "toggle" },
        },
        function (t, i) {
          pt.fn[t] = function (t, e, n) {
            return this.animate(i, t, e, n);
          };
        }
      ),
      (pt.timers = []),
      (pt.fx.tick = function () {
        var t,
          e = pt.timers,
          n = 0;
        for (De = pt.now(); n < e.length; n++)
          (t = e[n])() || e[n] !== t || e.splice(n--, 1);
        e.length || pt.fx.stop(), (De = undefined);
      }),
      (pt.fx.timer = function (t) {
        pt.timers.push(t), t() ? pt.fx.start() : pt.timers.pop();
      }),
      (pt.fx.interval = 13),
      (pt.fx.start = function () {
        Ne || (Ne = C.setInterval(pt.fx.tick, pt.fx.interval));
      }),
      (pt.fx.stop = function () {
        C.clearInterval(Ne), (Ne = null);
      }),
      (pt.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
      (pt.fn.delay = function (i, t) {
        return (
          (i = (pt.fx && pt.fx.speeds[i]) || i),
          (t = t || "fx"),
          this.queue(t, function (t, e) {
            var n = C.setTimeout(t, i);
            e.stop = function () {
              C.clearTimeout(n);
            };
          })
        );
      }),
      (Ie = it.createElement("input")),
      (Ae = it.createElement("div")),
      (je = it.createElement("select")),
      (Oe = je.appendChild(it.createElement("option"))),
      (Ae = it.createElement("div")).setAttribute("className", "t"),
      (Ae.innerHTML =
        "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>"),
      ($e = Ae.getElementsByTagName("a")[0]),
      Ie.setAttribute("type", "checkbox"),
      Ae.appendChild(Ie),
      (($e = Ae.getElementsByTagName("a")[0]).style.cssText = "top:1px"),
      (dt.getSetAttribute = "t" !== Ae.className),
      (dt.style = /top/.test($e.getAttribute("style"))),
      (dt.hrefNormalized = "/a" === $e.getAttribute("href")),
      (dt.checkOn = !!Ie.value),
      (dt.optSelected = Oe.selected),
      (dt.enctype = !!it.createElement("form").enctype),
      (je.disabled = !0),
      (dt.optDisabled = !Oe.disabled),
      (Ie = it.createElement("input")).setAttribute("value", ""),
      (dt.input = "" === Ie.getAttribute("value")),
      (Ie.value = "t"),
      Ie.setAttribute("type", "radio"),
      (dt.radioValue = "t" === Ie.value);
    var Re = /\r/g,
      Pe = /[\x20\t\r\n\f]+/g;
    pt.fn.extend({
      val: function (n) {
        var i,
          t,
          o,
          e = this[0];
        return arguments.length
          ? ((o = pt.isFunction(n)),
            this.each(function (t) {
              var e;
              1 === this.nodeType &&
                (null == (e = o ? n.call(this, t, pt(this).val()) : n)
                  ? (e = "")
                  : "number" == typeof e
                  ? (e += "")
                  : pt.isArray(e) &&
                    (e = pt.map(e, function (t) {
                      return null == t ? "" : t + "";
                    })),
                ((i =
                  pt.valHooks[this.type] ||
                  pt.valHooks[this.nodeName.toLowerCase()]) &&
                  "set" in i &&
                  i.set(this, e, "value") !== undefined) ||
                  (this.value = e));
            }))
          : e
          ? (i =
              pt.valHooks[e.type] || pt.valHooks[e.nodeName.toLowerCase()]) &&
            "get" in i &&
            (t = i.get(e, "value")) !== undefined
            ? t
            : "string" == typeof (t = e.value)
            ? t.replace(Re, "")
            : null == t
            ? ""
            : t
          : void 0;
      },
    }),
      pt.extend({
        valHooks: {
          option: {
            get: function (t) {
              var e = pt.find.attr(t, "value");
              return null != e ? e : pt.trim(pt.text(t)).replace(Pe, " ");
            },
          },
          select: {
            get: function (t) {
              for (
                var e,
                  n,
                  i = t.options,
                  o = t.selectedIndex,
                  r = "select-one" === t.type || o < 0,
                  a = r ? null : [],
                  s = r ? o + 1 : i.length,
                  l = o < 0 ? s : r ? o : 0;
                l < s;
                l++
              )
                if (
                  ((n = i[l]).selected || l === o) &&
                  (dt.optDisabled
                    ? !n.disabled
                    : null === n.getAttribute("disabled")) &&
                  (!n.parentNode.disabled ||
                    !pt.nodeName(n.parentNode, "optgroup"))
                ) {
                  if (((e = pt(n).val()), r)) return e;
                  a.push(e);
                }
              return a;
            },
            set: function (t, e) {
              for (
                var n, i, o = t.options, r = pt.makeArray(e), a = o.length;
                a--;

              )
                if (((i = o[a]), -1 < pt.inArray(pt.valHooks.option.get(i), r)))
                  try {
                    i.selected = n = !0;
                  } catch (s) {
                    i.scrollHeight;
                  }
                else i.selected = !1;
              return n || (t.selectedIndex = -1), o;
            },
          },
        },
      }),
      pt.each(["radio", "checkbox"], function () {
        (pt.valHooks[this] = {
          set: function (t, e) {
            if (pt.isArray(e))
              return (t.checked = -1 < pt.inArray(pt(t).val(), e));
          },
        }),
          dt.checkOn ||
            (pt.valHooks[this].get = function (t) {
              return null === t.getAttribute("value") ? "on" : t.value;
            });
      });
    var Me,
      qe,
      _e = pt.expr.attrHandle,
      Be = /^(?:checked|selected)$/i,
      Fe = dt.getSetAttribute,
      We = dt.input;
    pt.fn.extend({
      attr: function (t, e) {
        return Ft(this, pt.attr, t, e, 1 < arguments.length);
      },
      removeAttr: function (t) {
        return this.each(function () {
          pt.removeAttr(this, t);
        });
      },
    }),
      pt.extend({
        attr: function (t, e, n) {
          var i,
            o,
            r = t.nodeType;
          if (3 !== r && 8 !== r && 2 !== r)
            return "undefined" == typeof t.getAttribute
              ? pt.prop(t, e, n)
              : ((1 === r && pt.isXMLDoc(t)) ||
                  ((e = e.toLowerCase()),
                  (o =
                    pt.attrHooks[e] || (pt.expr.match.bool.test(e) ? qe : Me))),
                n !== undefined
                  ? null === n
                    ? void pt.removeAttr(t, e)
                    : o && "set" in o && (i = o.set(t, n, e)) !== undefined
                    ? i
                    : (t.setAttribute(e, n + ""), n)
                  : o && "get" in o && null !== (i = o.get(t, e))
                  ? i
                  : null == (i = pt.find.attr(t, e))
                  ? undefined
                  : i);
        },
        attrHooks: {
          type: {
            set: function (t, e) {
              if (!dt.radioValue && "radio" === e && pt.nodeName(t, "input")) {
                var n = t.value;
                return t.setAttribute("type", e), n && (t.value = n), e;
              }
            },
          },
        },
        removeAttr: function (t, e) {
          var n,
            i,
            o = 0,
            r = e && e.match(It);
          if (r && 1 === t.nodeType)
            for (; (n = r[o++]); )
              (i = pt.propFix[n] || n),
                pt.expr.match.bool.test(n)
                  ? (We && Fe) || !Be.test(n)
                    ? (t[i] = !1)
                    : (t[pt.camelCase("default-" + n)] = t[i] = !1)
                  : pt.attr(t, n, ""),
                t.removeAttribute(Fe ? n : i);
        },
      }),
      (qe = {
        set: function (t, e, n) {
          return (
            !1 === e
              ? pt.removeAttr(t, n)
              : (We && Fe) || !Be.test(n)
              ? t.setAttribute((!Fe && pt.propFix[n]) || n, n)
              : (t[pt.camelCase("default-" + n)] = t[n] = !0),
            n
          );
        },
      }),
      pt.each(pt.expr.match.bool.source.match(/\w+/g), function (t, e) {
        var r = _e[e] || pt.find.attr;
        (We && Fe) || !Be.test(e)
          ? (_e[e] = function (t, e, n) {
              var i, o;
              return (
                n ||
                  ((o = _e[e]),
                  (_e[e] = i),
                  (i = null != r(t, e, n) ? e.toLowerCase() : null),
                  (_e[e] = o)),
                i
              );
            })
          : (_e[e] = function (t, e, n) {
              if (!n)
                return t[pt.camelCase("default-" + e)] ? e.toLowerCase() : null;
            });
      }),
      (We && Fe) ||
        (pt.attrHooks.value = {
          set: function (t, e, n) {
            if (!pt.nodeName(t, "input")) return Me && Me.set(t, e, n);
            t.defaultValue = e;
          },
        }),
      Fe ||
        ((Me = {
          set: function (t, e, n) {
            var i = t.getAttributeNode(n);
            if (
              (i ||
                t.setAttributeNode((i = t.ownerDocument.createAttribute(n))),
              (i.value = e += ""),
              "value" === n || e === t.getAttribute(n))
            )
              return e;
          },
        }),
        (_e.id = _e.name = _e.coords = function (t, e, n) {
          var i;
          if (!n)
            return (i = t.getAttributeNode(e)) && "" !== i.value
              ? i.value
              : null;
        }),
        (pt.valHooks.button = {
          get: function (t, e) {
            var n = t.getAttributeNode(e);
            if (n && n.specified) return n.value;
          },
          set: Me.set,
        }),
        (pt.attrHooks.contenteditable = {
          set: function (t, e, n) {
            Me.set(t, "" !== e && e, n);
          },
        }),
        pt.each(["width", "height"], function (t, n) {
          pt.attrHooks[n] = {
            set: function (t, e) {
              if ("" === e) return t.setAttribute(n, "auto"), e;
            },
          };
        })),
      dt.style ||
        (pt.attrHooks.style = {
          get: function (t) {
            return t.style.cssText || undefined;
          },
          set: function (t, e) {
            return (t.style.cssText = e + "");
          },
        });
    var ze = /^(?:input|select|textarea|button|object)$/i,
      Ue = /^(?:a|area)$/i;
    pt.fn.extend({
      prop: function (t, e) {
        return Ft(this, pt.prop, t, e, 1 < arguments.length);
      },
      removeProp: function (e) {
        return (
          (e = pt.propFix[e] || e),
          this.each(function () {
            try {
              (this[e] = undefined), delete this[e];
            } catch (t) {}
          })
        );
      },
    }),
      pt.extend({
        prop: function (t, e, n) {
          var i,
            o,
            r = t.nodeType;
          if (3 !== r && 8 !== r && 2 !== r)
            return (
              (1 === r && pt.isXMLDoc(t)) ||
                ((e = pt.propFix[e] || e), (o = pt.propHooks[e])),
              n !== undefined
                ? o && "set" in o && (i = o.set(t, n, e)) !== undefined
                  ? i
                  : (t[e] = n)
                : o && "get" in o && null !== (i = o.get(t, e))
                ? i
                : t[e]
            );
        },
        propHooks: {
          tabIndex: {
            get: function (t) {
              var e = pt.find.attr(t, "tabindex");
              return e
                ? parseInt(e, 10)
                : ze.test(t.nodeName) || (Ue.test(t.nodeName) && t.href)
                ? 0
                : -1;
            },
          },
        },
        propFix: { for: "htmlFor", class: "className" },
      }),
      dt.hrefNormalized ||
        pt.each(["href", "src"], function (t, e) {
          pt.propHooks[e] = {
            get: function (t) {
              return t.getAttribute(e, 4);
            },
          };
        }),
      dt.optSelected ||
        (pt.propHooks.selected = {
          get: function (t) {
            var e = t.parentNode;
            return (
              e &&
                (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex),
              null
            );
          },
          set: function (t) {
            var e = t.parentNode;
            e && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex);
          },
        }),
      pt.each(
        [
          "tabIndex",
          "readOnly",
          "maxLength",
          "cellSpacing",
          "cellPadding",
          "rowSpan",
          "colSpan",
          "useMap",
          "frameBorder",
          "contentEditable",
        ],
        function () {
          pt.propFix[this.toLowerCase()] = this;
        }
      ),
      dt.enctype || (pt.propFix.enctype = "encoding");
    var Qe = /[\t\r\n\f]/g;
    pt.fn.extend({
      addClass: function (e) {
        var t,
          n,
          i,
          o,
          r,
          a,
          s,
          l = 0;
        if (pt.isFunction(e))
          return this.each(function (t) {
            pt(this).addClass(e.call(this, t, z(this)));
          });
        if ("string" == typeof e && e)
          for (t = e.match(It) || []; (n = this[l++]); )
            if (
              ((o = z(n)),
              (i = 1 === n.nodeType && (" " + o + " ").replace(Qe, " ")))
            ) {
              for (a = 0; (r = t[a++]); )
                i.indexOf(" " + r + " ") < 0 && (i += r + " ");
              o !== (s = pt.trim(i)) && pt.attr(n, "class", s);
            }
        return this;
      },
      removeClass: function (e) {
        var t,
          n,
          i,
          o,
          r,
          a,
          s,
          l = 0;
        if (pt.isFunction(e))
          return this.each(function (t) {
            pt(this).removeClass(e.call(this, t, z(this)));
          });
        if (!arguments.length) return this.attr("class", "");
        if ("string" == typeof e && e)
          for (t = e.match(It) || []; (n = this[l++]); )
            if (
              ((o = z(n)),
              (i = 1 === n.nodeType && (" " + o + " ").replace(Qe, " ")))
            ) {
              for (a = 0; (r = t[a++]); )
                for (; -1 < i.indexOf(" " + r + " "); )
                  i = i.replace(" " + r + " ", " ");
              o !== (s = pt.trim(i)) && pt.attr(n, "class", s);
            }
        return this;
      },
      toggleClass: function (o, e) {
        var r = typeof o;
        return "boolean" == typeof e && "string" === r
          ? e
            ? this.addClass(o)
            : this.removeClass(o)
          : pt.isFunction(o)
          ? this.each(function (t) {
              pt(this).toggleClass(o.call(this, t, z(this), e), e);
            })
          : this.each(function () {
              var t, e, n, i;
              if ("string" === r)
                for (e = 0, n = pt(this), i = o.match(It) || []; (t = i[e++]); )
                  n.hasClass(t) ? n.removeClass(t) : n.addClass(t);
              else
                (o !== undefined && "boolean" !== r) ||
                  ((t = z(this)) && pt._data(this, "__className__", t),
                  pt.attr(
                    this,
                    "class",
                    t || !1 === o ? "" : pt._data(this, "__className__") || ""
                  ));
            });
      },
      hasClass: function (t) {
        var e,
          n,
          i = 0;
        for (e = " " + t + " "; (n = this[i++]); )
          if (
            1 === n.nodeType &&
            -1 < (" " + z(n) + " ").replace(Qe, " ").indexOf(e)
          )
            return !0;
        return !1;
      },
    }),
      pt.each(
        "blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(
          " "
        ),
        function (t, n) {
          pt.fn[n] = function (t, e) {
            return 0 < arguments.length
              ? this.on(n, null, t, e)
              : this.trigger(n);
          };
        }
      ),
      pt.fn.extend({
        hover: function (t, e) {
          return this.mouseenter(t).mouseleave(e || t);
        },
      });
    var Xe = C.location,
      Ve = pt.now(),
      Ge = /\?/,
      Ke = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    (pt.parseJSON = function (t) {
      if (C.JSON && C.JSON.parse) return C.JSON.parse(t + "");
      var o,
        r = null,
        e = pt.trim(t + "");
      return e &&
        !pt.trim(
          e.replace(Ke, function (t, e, n, i) {
            return (
              o && e && (r = 0),
              0 === r ? t : ((o = n || e), (r += !i - !n), "")
            );
          })
        )
        ? Function("return " + e)()
        : pt.error("Invalid JSON: " + t);
    }),
      (pt.parseXML = function (t) {
        var e;
        if (!t || "string" != typeof t) return null;
        try {
          C.DOMParser
            ? (e = new C.DOMParser().parseFromString(t, "text/xml"))
            : (((e = new C.ActiveXObject("Microsoft.XMLDOM")).async = "false"),
              e.loadXML(t));
        } catch (n) {
          e = undefined;
        }
        return (
          (e &&
            e.documentElement &&
            !e.getElementsByTagName("parsererror").length) ||
            pt.error("Invalid XML: " + t),
          e
        );
      });
    var Je = /#.*$/,
      Ye = /([?&])_=[^&]*/,
      Ze = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
      tn = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
      en = /^(?:GET|HEAD)$/,
      nn = /^\/\//,
      on = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
      rn = {},
      an = {},
      sn = "*/".concat("*"),
      ln = Xe.href,
      un = on.exec(ln.toLowerCase()) || [];
    pt.extend({
      active: 0,
      lastModified: {},
      etag: {},
      ajaxSettings: {
        url: ln,
        type: "GET",
        isLocal: tn.test(un[1]),
        global: !0,
        processData: !0,
        async: !0,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        accepts: {
          "*": sn,
          text: "text/plain",
          html: "text/html",
          xml: "application/xml, text/xml",
          json: "application/json, text/javascript",
        },
        contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ },
        responseFields: {
          xml: "responseXML",
          text: "responseText",
          json: "responseJSON",
        },
        converters: {
          "* text": String,
          "text html": !0,
          "text json": pt.parseJSON,
          "text xml": pt.parseXML,
        },
        flatOptions: { url: !0, context: !0 },
      },
      ajaxSetup: function (t, e) {
        return e ? X(X(t, pt.ajaxSettings), e) : X(pt.ajaxSettings, t);
      },
      ajaxPrefilter: U(rn),
      ajaxTransport: U(an),
      ajax: function (t, e) {
        function n(t, e, n, i) {
          var o,
            r,
            a,
            s,
            l,
            u = e;
          2 !== w &&
            ((w = 2),
            f && C.clearTimeout(f),
            (h = undefined),
            (d = i || ""),
            (T.readyState = 0 < t ? 4 : 0),
            (o = (200 <= t && t < 300) || 304 === t),
            n && (s = V(m, T, n)),
            (s = G(m, s, T, o)),
            o
              ? (m.ifModified &&
                  ((l = T.getResponseHeader("Last-Modified")) &&
                    (pt.lastModified[c] = l),
                  (l = T.getResponseHeader("etag")) && (pt.etag[c] = l)),
                204 === t || "HEAD" === m.type
                  ? (u = "nocontent")
                  : 304 === t
                  ? (u = "notmodified")
                  : ((u = s.state), (r = s.data), (o = !(a = s.error))))
              : ((a = u), (!t && u) || ((u = "error"), t < 0 && (t = 0))),
            (T.status = t),
            (T.statusText = (e || u) + ""),
            o ? b.resolveWith(g, [r, u, T]) : b.rejectWith(g, [T, u, a]),
            T.statusCode(x),
            (x = undefined),
            p && v.trigger(o ? "ajaxSuccess" : "ajaxError", [T, m, o ? r : a]),
            y.fireWith(g, [T, u]),
            p &&
              (v.trigger("ajaxComplete", [T, m]),
              --pt.active || pt.event.trigger("ajaxStop")));
        }
        "object" == typeof t && ((e = t), (t = undefined)), (e = e || {});
        var i,
          o,
          c,
          d,
          f,
          p,
          h,
          r,
          m = pt.ajaxSetup({}, e),
          g = m.context || m,
          v = m.context && (g.nodeType || g.jquery) ? pt(g) : pt.event,
          b = pt.Deferred(),
          y = pt.Callbacks("once memory"),
          x = m.statusCode || {},
          a = {},
          s = {},
          w = 0,
          l = "canceled",
          T = {
            readyState: 0,
            getResponseHeader: function (t) {
              var e;
              if (2 === w) {
                if (!r)
                  for (r = {}; (e = Ze.exec(d)); ) r[e[1].toLowerCase()] = e[2];
                e = r[t.toLowerCase()];
              }
              return null == e ? null : e;
            },
            getAllResponseHeaders: function () {
              return 2 === w ? d : null;
            },
            setRequestHeader: function (t, e) {
              var n = t.toLowerCase();
              return w || ((t = s[n] = s[n] || t), (a[t] = e)), this;
            },
            overrideMimeType: function (t) {
              return w || (m.mimeType = t), this;
            },
            statusCode: function (t) {
              var e;
              if (t)
                if (w < 2) for (e in t) x[e] = [x[e], t[e]];
                else T.always(t[T.status]);
              return this;
            },
            abort: function (t) {
              var e = t || l;
              return h && h.abort(e), n(0, e), this;
            },
          };
        if (
          ((b.promise(T).complete = y.add),
          (T.success = T.done),
          (T.error = T.fail),
          (m.url = ((t || m.url || ln) + "")
            .replace(Je, "")
            .replace(nn, un[1] + "//")),
          (m.type = e.method || e.type || m.method || m.type),
          (m.dataTypes = pt
            .trim(m.dataType || "*")
            .toLowerCase()
            .match(It) || [""]),
          null == m.crossDomain &&
            ((i = on.exec(m.url.toLowerCase())),
            (m.crossDomain = !(
              !i ||
              (i[1] === un[1] &&
                i[2] === un[2] &&
                (i[3] || ("http:" === i[1] ? "80" : "443")) ===
                  (un[3] || ("http:" === un[1] ? "80" : "443")))
            ))),
          m.data &&
            m.processData &&
            "string" != typeof m.data &&
            (m.data = pt.param(m.data, m.traditional)),
          Q(rn, m, e, T),
          2 === w)
        )
          return T;
        for (o in ((p = pt.event && m.global) &&
          0 == pt.active++ &&
          pt.event.trigger("ajaxStart"),
        (m.type = m.type.toUpperCase()),
        (m.hasContent = !en.test(m.type)),
        (c = m.url),
        m.hasContent ||
          (m.data &&
            ((c = m.url += (Ge.test(c) ? "&" : "?") + m.data), delete m.data),
          !1 === m.cache &&
            (m.url = Ye.test(c)
              ? c.replace(Ye, "$1_=" + Ve++)
              : c + (Ge.test(c) ? "&" : "?") + "_=" + Ve++)),
        m.ifModified &&
          (pt.lastModified[c] &&
            T.setRequestHeader("If-Modified-Since", pt.lastModified[c]),
          pt.etag[c] && T.setRequestHeader("If-None-Match", pt.etag[c])),
        ((m.data && m.hasContent && !1 !== m.contentType) || e.contentType) &&
          T.setRequestHeader("Content-Type", m.contentType),
        T.setRequestHeader(
          "Accept",
          m.dataTypes[0] && m.accepts[m.dataTypes[0]]
            ? m.accepts[m.dataTypes[0]] +
                ("*" !== m.dataTypes[0] ? ", " + sn + "; q=0.01" : "")
            : m.accepts["*"]
        ),
        m.headers))
          T.setRequestHeader(o, m.headers[o]);
        if (m.beforeSend && (!1 === m.beforeSend.call(g, T, m) || 2 === w))
          return T.abort();
        for (o in ((l = "abort"), { success: 1, error: 1, complete: 1 }))
          T[o](m[o]);
        if ((h = Q(an, m, e, T))) {
          if (((T.readyState = 1), p && v.trigger("ajaxSend", [T, m]), 2 === w))
            return T;
          m.async &&
            0 < m.timeout &&
            (f = C.setTimeout(function () {
              T.abort("timeout");
            }, m.timeout));
          try {
            (w = 1), h.send(a, n);
          } catch (u) {
            if (!(w < 2)) throw u;
            n(-1, u);
          }
        } else n(-1, "No Transport");
        return T;
      },
      getJSON: function (t, e, n) {
        return pt.get(t, e, n, "json");
      },
      getScript: function (t, e) {
        return pt.get(t, undefined, e, "script");
      },
    }),
      pt.each(["get", "post"], function (t, o) {
        pt[o] = function (t, e, n, i) {
          return (
            pt.isFunction(e) && ((i = i || n), (n = e), (e = undefined)),
            pt.ajax(
              pt.extend(
                { url: t, type: o, dataType: i, data: e, success: n },
                pt.isPlainObject(t) && t
              )
            )
          );
        };
      }),
      (pt._evalUrl = function (t) {
        return pt.ajax({
          url: t,
          type: "GET",
          dataType: "script",
          cache: !0,
          async: !1,
          global: !1,
          throws: !0,
        });
      }),
      pt.fn.extend({
        wrapAll: function (e) {
          if (pt.isFunction(e))
            return this.each(function (t) {
              pt(this).wrapAll(e.call(this, t));
            });
          if (this[0]) {
            var t = pt(e, this[0].ownerDocument).eq(0).clone(!0);
            this[0].parentNode && t.insertBefore(this[0]),
              t
                .map(function () {
                  for (
                    var t = this;
                    t.firstChild && 1 === t.firstChild.nodeType;

                  )
                    t = t.firstChild;
                  return t;
                })
                .append(this);
          }
          return this;
        },
        wrapInner: function (n) {
          return pt.isFunction(n)
            ? this.each(function (t) {
                pt(this).wrapInner(n.call(this, t));
              })
            : this.each(function () {
                var t = pt(this),
                  e = t.contents();
                e.length ? e.wrapAll(n) : t.append(n);
              });
        },
        wrap: function (e) {
          var n = pt.isFunction(e);
          return this.each(function (t) {
            pt(this).wrapAll(n ? e.call(this, t) : e);
          });
        },
        unwrap: function () {
          return this.parent()
            .each(function () {
              pt.nodeName(this, "body") ||
                pt(this).replaceWith(this.childNodes);
            })
            .end();
        },
      }),
      (pt.expr.filters.hidden = function (t) {
        return dt.reliableHiddenOffsets()
          ? t.offsetWidth <= 0 &&
              t.offsetHeight <= 0 &&
              !t.getClientRects().length
          : J(t);
      }),
      (pt.expr.filters.visible = function (t) {
        return !pt.expr.filters.hidden(t);
      });
    var cn = /%20/g,
      dn = /\[\]$/,
      fn = /\r?\n/g,
      pn = /^(?:submit|button|image|reset|file)$/i,
      hn = /^(?:input|select|textarea|keygen)/i;
    (pt.param = function (t, e) {
      var n,
        i = [],
        o = function (t, e) {
          (e = pt.isFunction(e) ? e() : null == e ? "" : e),
            (i[i.length] = encodeURIComponent(t) + "=" + encodeURIComponent(e));
        };
      if (
        (e === undefined &&
          (e = pt.ajaxSettings && pt.ajaxSettings.traditional),
        pt.isArray(t) || (t.jquery && !pt.isPlainObject(t)))
      )
        pt.each(t, function () {
          o(this.name, this.value);
        });
      else for (n in t) Y(n, t[n], e, o);
      return i.join("&").replace(cn, "+");
    }),
      pt.fn.extend({
        serialize: function () {
          return pt.param(this.serializeArray());
        },
        serializeArray: function () {
          return this.map(function () {
            var t = pt.prop(this, "elements");
            return t ? pt.makeArray(t) : this;
          })
            .filter(function () {
              var t = this.type;
              return (
                this.name &&
                !pt(this).is(":disabled") &&
                hn.test(this.nodeName) &&
                !pn.test(t) &&
                (this.checked || !Wt.test(t))
              );
            })
            .map(function (t, e) {
              var n = pt(this).val();
              return null == n
                ? null
                : pt.isArray(n)
                ? pt.map(n, function (t) {
                    return { name: e.name, value: t.replace(fn, "\r\n") };
                  })
                : { name: e.name, value: n.replace(fn, "\r\n") };
            })
            .get();
        },
      }),
      (pt.ajaxSettings.xhr =
        C.ActiveXObject !== undefined
          ? function () {
              return this.isLocal
                ? tt()
                : 8 < it.documentMode
                ? Z()
                : (/^(get|post|head|put|delete|options)$/i.test(this.type) &&
                    Z()) ||
                  tt();
            }
          : Z);
    var mn = 0,
      gn = {},
      vn = pt.ajaxSettings.xhr();
    C.attachEvent &&
      C.attachEvent("onunload", function () {
        for (var t in gn) gn[t](undefined, !0);
      }),
      (dt.cors = !!vn && "withCredentials" in vn),
      (vn = dt.ajax = !!vn) &&
        pt.ajaxTransport(function (u) {
          var c;
          if (!u.crossDomain || dt.cors)
            return {
              send: function (t, a) {
                var e,
                  s = u.xhr(),
                  l = ++mn;
                if (
                  (s.open(u.type, u.url, u.async, u.username, u.password),
                  u.xhrFields)
                )
                  for (e in u.xhrFields) s[e] = u.xhrFields[e];
                for (e in (u.mimeType &&
                  s.overrideMimeType &&
                  s.overrideMimeType(u.mimeType),
                u.crossDomain ||
                  t["X-Requested-With"] ||
                  (t["X-Requested-With"] = "XMLHttpRequest"),
                t))
                  t[e] !== undefined && s.setRequestHeader(e, t[e] + "");
                s.send((u.hasContent && u.data) || null),
                  (c = function (t, e) {
                    var n, i, o;
                    if (c && (e || 4 === s.readyState))
                      if (
                        (delete gn[l],
                        (c = undefined),
                        (s.onreadystatechange = pt.noop),
                        e)
                      )
                        4 !== s.readyState && s.abort();
                      else {
                        (o = {}),
                          (n = s.status),
                          "string" == typeof s.responseText &&
                            (o.text = s.responseText);
                        try {
                          i = s.statusText;
                        } catch (r) {
                          i = "";
                        }
                        n || !u.isLocal || u.crossDomain
                          ? 1223 === n && (n = 204)
                          : (n = o.text ? 200 : 404);
                      }
                    o && a(n, i, o, s.getAllResponseHeaders());
                  }),
                  u.async
                    ? 4 === s.readyState
                      ? C.setTimeout(c)
                      : (s.onreadystatechange = gn[l] = c)
                    : c();
              },
              abort: function () {
                c && c(undefined, !0);
              },
            };
        }),
      pt.ajaxSetup({
        accepts: {
          script:
            "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript",
        },
        contents: { script: /\b(?:java|ecma)script\b/ },
        converters: {
          "text script": function (t) {
            return pt.globalEval(t), t;
          },
        },
      }),
      pt.ajaxPrefilter("script", function (t) {
        t.cache === undefined && (t.cache = !1),
          t.crossDomain && ((t.type = "GET"), (t.global = !1));
      }),
      pt.ajaxTransport("script", function (e) {
        if (e.crossDomain) {
          var i,
            o = it.head || pt("head")[0] || it.documentElement;
          return {
            send: function (t, n) {
              ((i = it.createElement("script")).async = !0),
                e.scriptCharset && (i.charset = e.scriptCharset),
                (i.src = e.url),
                (i.onload = i.onreadystatechange = function (t, e) {
                  (e ||
                    !i.readyState ||
                    /loaded|complete/.test(i.readyState)) &&
                    ((i.onload = i.onreadystatechange = null),
                    i.parentNode && i.parentNode.removeChild(i),
                    (i = null),
                    e || n(200, "success"));
                }),
                o.insertBefore(i, o.firstChild);
            },
            abort: function () {
              i && i.onload(undefined, !0);
            },
          };
        }
      });
    var bn = [],
      yn = /(=)\?(?=&|$)|\?\?/;
    pt.ajaxSetup({
      jsonp: "callback",
      jsonpCallback: function () {
        var t = bn.pop() || pt.expando + "_" + Ve++;
        return (this[t] = !0), t;
      },
    }),
      pt.ajaxPrefilter("json jsonp", function (t, e, n) {
        var i,
          o,
          r,
          a =
            !1 !== t.jsonp &&
            (yn.test(t.url)
              ? "url"
              : "string" == typeof t.data &&
                0 ===
                  (t.contentType || "").indexOf(
                    "application/x-www-form-urlencoded"
                  ) &&
                yn.test(t.data) &&
                "data");
        if (a || "jsonp" === t.dataTypes[0])
          return (
            (i = t.jsonpCallback = pt.isFunction(t.jsonpCallback)
              ? t.jsonpCallback()
              : t.jsonpCallback),
            a
              ? (t[a] = t[a].replace(yn, "$1" + i))
              : !1 !== t.jsonp &&
                (t.url += (Ge.test(t.url) ? "&" : "?") + t.jsonp + "=" + i),
            (t.converters["script json"] = function () {
              return r || pt.error(i + " was not called"), r[0];
            }),
            (t.dataTypes[0] = "json"),
            (o = C[i]),
            (C[i] = function () {
              r = arguments;
            }),
            n.always(function () {
              o === undefined ? pt(C).removeProp(i) : (C[i] = o),
                t[i] && ((t.jsonpCallback = e.jsonpCallback), bn.push(i)),
                r && pt.isFunction(o) && o(r[0]),
                (r = o = undefined);
            }),
            "script"
          );
      }),
      (pt.parseHTML = function (t, e, n) {
        if (!t || "string" != typeof t) return null;
        "boolean" == typeof e && ((n = e), (e = !1)), (e = e || it);
        var i = Tt.exec(t),
          o = !n && [];
        return i
          ? [e.createElement(i[1])]
          : ((i = m([t], e, o)),
            o && o.length && pt(o).remove(),
            pt.merge([], i.childNodes));
      });
    var xn = pt.fn.load;
    (pt.fn.load = function (t, e, n) {
      if ("string" != typeof t && xn) return xn.apply(this, arguments);
      var i,
        o,
        r,
        a = this,
        s = t.indexOf(" ");
      return (
        -1 < s && ((i = pt.trim(t.slice(s, t.length))), (t = t.slice(0, s))),
        pt.isFunction(e)
          ? ((n = e), (e = undefined))
          : e && "object" == typeof e && (o = "POST"),
        0 < a.length &&
          pt
            .ajax({ url: t, type: o || "GET", dataType: "html", data: e })
            .done(function (t) {
              (r = arguments),
                a.html(i ? pt("<div>").append(pt.parseHTML(t)).find(i) : t);
            })
            .always(
              n &&
                function (t, e) {
                  a.each(function () {
                    n.apply(this, r || [t.responseText, e, t]);
                  });
                }
            ),
        this
      );
    }),
      pt.each(
        [
          "ajaxStart",
          "ajaxStop",
          "ajaxComplete",
          "ajaxError",
          "ajaxSuccess",
          "ajaxSend",
        ],
        function (t, e) {
          pt.fn[e] = function (t) {
            return this.on(e, t);
          };
        }
      ),
      (pt.expr.filters.animated = function (e) {
        return pt.grep(pt.timers, function (t) {
          return e === t.elem;
        }).length;
      }),
      (pt.offset = {
        setOffset: function (t, e, n) {
          var i,
            o,
            r,
            a,
            s,
            l,
            u = pt.css(t, "position"),
            c = pt(t),
            d = {};
          "static" === u && (t.style.position = "relative"),
            (s = c.offset()),
            (r = pt.css(t, "top")),
            (l = pt.css(t, "left")),
            (o =
              ("absolute" === u || "fixed" === u) &&
              -1 < pt.inArray("auto", [r, l])
                ? ((a = (i = c.position()).top), i.left)
                : ((a = parseFloat(r) || 0), parseFloat(l) || 0)),
            pt.isFunction(e) && (e = e.call(t, n, pt.extend({}, s))),
            null != e.top && (d.top = e.top - s.top + a),
            null != e.left && (d.left = e.left - s.left + o),
            "using" in e ? e.using.call(t, d) : c.css(d);
        },
      }),
      pt.fn.extend({
        offset: function (e) {
          if (arguments.length)
            return e === undefined
              ? this
              : this.each(function (t) {
                  pt.offset.setOffset(this, e, t);
                });
          var t,
            n,
            i = { top: 0, left: 0 },
            o = this[0],
            r = o && o.ownerDocument;
          return r
            ? ((t = r.documentElement),
              pt.contains(t, o)
                ? ("undefined" != typeof o.getBoundingClientRect &&
                    (i = o.getBoundingClientRect()),
                  (n = et(r)),
                  {
                    top:
                      i.top +
                      (n.pageYOffset || t.scrollTop) -
                      (t.clientTop || 0),
                    left:
                      i.left +
                      (n.pageXOffset || t.scrollLeft) -
                      (t.clientLeft || 0),
                  })
                : i)
            : void 0;
        },
        position: function () {
          if (this[0]) {
            var t,
              e,
              n = { top: 0, left: 0 },
              i = this[0];
            return (
              "fixed" === pt.css(i, "position")
                ? (e = i.getBoundingClientRect())
                : ((t = this.offsetParent()),
                  (e = this.offset()),
                  pt.nodeName(t[0], "html") || (n = t.offset()),
                  (n.top += pt.css(t[0], "borderTopWidth", !0)),
                  (n.left += pt.css(t[0], "borderLeftWidth", !0))),
              {
                top: e.top - n.top - pt.css(i, "marginTop", !0),
                left: e.left - n.left - pt.css(i, "marginLeft", !0),
              }
            );
          }
        },
        offsetParent: function () {
          return this.map(function () {
            for (
              var t = this.offsetParent;
              t &&
              !pt.nodeName(t, "html") &&
              "static" === pt.css(t, "position");

            )
              t = t.offsetParent;
            return t || me;
          });
        },
      }),
      pt.each(
        { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" },
        function (e, o) {
          var r = /Y/.test(o);
          pt.fn[e] = function (t) {
            return Ft(
              this,
              function (t, e, n) {
                var i = et(t);
                if (n === undefined)
                  return i
                    ? o in i
                      ? i[o]
                      : i.document.documentElement[e]
                    : t[e];
                i
                  ? i.scrollTo(
                      r ? pt(i).scrollLeft() : n,
                      r ? n : pt(i).scrollTop()
                    )
                  : (t[e] = n);
              },
              e,
              t,
              arguments.length,
              null
            );
          };
        }
      ),
      pt.each(["top", "left"], function (t, n) {
        pt.cssHooks[n] = A(dt.pixelPosition, function (t, e) {
          if (e)
            return (e = ve(t, n)), pe.test(e) ? pt(t).position()[n] + "px" : e;
        });
      }),
      pt.each({ Height: "height", Width: "width" }, function (r, a) {
        pt.each(
          { padding: "inner" + r, content: a, "": "outer" + r },
          function (i, t) {
            pt.fn[t] = function (t, e) {
              var n = arguments.length && (i || "boolean" != typeof t),
                o = i || (!0 === t || !0 === e ? "margin" : "border");
              return Ft(
                this,
                function (t, e, n) {
                  var i;
                  return pt.isWindow(t)
                    ? t.document.documentElement["client" + r]
                    : 9 === t.nodeType
                    ? ((i = t.documentElement),
                      Math.max(
                        t.body["scroll" + r],
                        i["scroll" + r],
                        t.body["offset" + r],
                        i["offset" + r],
                        i["client" + r]
                      ))
                    : n === undefined
                    ? pt.css(t, e, o)
                    : pt.style(t, e, n, o);
                },
                a,
                n ? t : undefined,
                n,
                null
              );
            };
          }
        );
      }),
      pt.fn.extend({
        bind: function (t, e, n) {
          return this.on(t, null, e, n);
        },
        unbind: function (t, e) {
          return this.off(t, null, e);
        },
        delegate: function (t, e, n, i) {
          return this.on(e, t, n, i);
        },
        undelegate: function (t, e, n) {
          return 1 === arguments.length
            ? this.off(t, "**")
            : this.off(e, t || "**", n);
        },
      }),
      (pt.fn.size = function () {
        return this.length;
      }),
      (pt.fn.andSelf = pt.fn.addBack),
      "function" == typeof define &&
        define.amd &&
        define("jquery", [], function () {
          return pt;
        });
    var wn = C.jQuery,
      Tn = C.$;
    return (
      (pt.noConflict = function (t) {
        return (
          C.$ === pt && (C.$ = Tn), t && C.jQuery === pt && (C.jQuery = wn), pt
        );
      }),
      t || (C.jQuery = C.$ = pt),
      pt
    );
  }),
  "undefined" == typeof jQuery)
)
  throw new Error("Bootstrap's JavaScript requires jQuery");
!(function () {
  "use strict";
  var t = jQuery.fn.jquery.split(" ")[0].split(".");
  if ((t[0] < 2 && t[1] < 9) || (1 == t[0] && 9 == t[1] && t[2] < 1))
    throw new Error(
      "Bootstrap's JavaScript requires jQuery version 1.9.1 or higher"
    );
})(),
  (function (i) {
    "use strict";
    function t() {
      var t = document.createElement("bootstrap"),
        e = {
          WebkitTransition: "webkitTransitionEnd",
          MozTransition: "transitionend",
          OTransition: "oTransitionEnd otransitionend",
          transition: "transitionend",
        };
      for (var n in e) if (t.style[n] !== undefined) return { end: e[n] };
      return !1;
    }
    (i.fn.emulateTransitionEnd = function (t) {
      var e = !1,
        n = this;
      return (
        i(this).one("bsTransitionEnd", function () {
          e = !0;
        }),
        setTimeout(function () {
          e || i(n).trigger(i.support.transition.end);
        }, t),
        this
      );
    }),
      i(function () {
        (i.support.transition = t()),
          i.support.transition &&
            (i.event.special.bsTransitionEnd = {
              bindType: i.support.transition.end,
              delegateType: i.support.transition.end,
              handle: function (t) {
                if (i(t.target).is(this))
                  return t.handleObj.handler.apply(this, arguments);
              },
            });
      });
  })(jQuery),
  (function (r) {
    "use strict";
    function t(n) {
      return this.each(function () {
        var t = r(this),
          e = t.data("bs.alert");
        e || t.data("bs.alert", (e = new a(this))),
          "string" == typeof n && e[n].call(t);
      });
    }
    var e = '[data-dismiss="alert"]',
      a = function (t) {
        r(t).on("click", e, this.close);
      };
    (a.VERSION = "3.3.4"),
      (a.TRANSITION_DURATION = 150),
      (a.prototype.close = function (t) {
        function e() {
          o.detach().trigger("closed.bs.alert").remove();
        }
        var n = r(this),
          i = n.attr("data-target");
        i || (i = (i = n.attr("href")) && i.replace(/.*(?=#[^\s]*$)/, ""));
        var o = r(i);
        t && t.preventDefault(),
          o.length || (o = n.closest(".alert")),
          o.trigger((t = r.Event("close.bs.alert"))),
          t.isDefaultPrevented() ||
            (o.removeClass("in"),
            r.support.transition && o.hasClass("fade")
              ? o
                  .one("bsTransitionEnd", e)
                  .emulateTransitionEnd(a.TRANSITION_DURATION)
              : e());
      });
    var n = r.fn.alert;
    (r.fn.alert = t),
      (r.fn.alert.Constructor = a),
      (r.fn.alert.noConflict = function () {
        return (r.fn.alert = n), this;
      }),
      r(document).on("click.bs.alert.data-api", e, a.prototype.close);
  })(jQuery),
  (function (r) {
    "use strict";
    function n(i) {
      return this.each(function () {
        var t = r(this),
          e = t.data("bs.button"),
          n = "object" == typeof i && i;
        e || t.data("bs.button", (e = new o(this, n))),
          "toggle" == i ? e.toggle() : i && e.setState(i);
      });
    }
    var o = function (t, e) {
      (this.$element = r(t)),
        (this.options = r.extend({}, o.DEFAULTS, e)),
        (this.isLoading = !1);
    };
    (o.VERSION = "3.3.4"),
      (o.DEFAULTS = { loadingText: "loading..." }),
      (o.prototype.setState = function (t) {
        var e = "disabled",
          n = this.$element,
          i = n.is("input") ? "val" : "html",
          o = n.data();
        (t += "Text"),
          null == o.resetText && n.data("resetText", n[i]()),
          setTimeout(
            r.proxy(function () {
              n[i](null == o[t] ? this.options[t] : o[t]),
                "loadingText" == t
                  ? ((this.isLoading = !0), n.addClass(e).attr(e, e))
                  : this.isLoading &&
                    ((this.isLoading = !1), n.removeClass(e).removeAttr(e));
            }, this),
            0
          );
      }),
      (o.prototype.toggle = function () {
        var t = !0,
          e = this.$element.closest('[data-toggle="buttons"]');
        if (e.length) {
          var n = this.$element.find("input");
          "radio" == n.prop("type") &&
            (n.prop("checked") && this.$element.hasClass("active")
              ? (t = !1)
              : e.find(".active").removeClass("active")),
            t &&
              n
                .prop("checked", !this.$element.hasClass("active"))
                .trigger("change");
        } else
          this.$element.attr("aria-pressed", !this.$element.hasClass("active"));
        t && this.$element.toggleClass("active");
      });
    var t = r.fn.button;
    (r.fn.button = n),
      (r.fn.button.Constructor = o),
      (r.fn.button.noConflict = function () {
        return (r.fn.button = t), this;
      }),
      r(document)
        .on("click.bs.button.data-api", '[data-toggle^="button"]', function (
          t
        ) {
          var e = r(t.target);
          e.hasClass("btn") || (e = e.closest(".btn")),
            n.call(e, "toggle"),
            t.preventDefault();
        })
        .on(
          "focus.bs.button.data-api blur.bs.button.data-api",
          '[data-toggle^="button"]',
          function (t) {
            r(t.target)
              .closest(".btn")
              .toggleClass("focus", /^focus(in)?$/.test(t.type));
          }
        );
  })(jQuery),
  (function (d) {
    "use strict";
    function a(o) {
      return this.each(function () {
        var t = d(this),
          e = t.data("bs.carousel"),
          n = d.extend({}, f.DEFAULTS, t.data(), "object" == typeof o && o),
          i = "string" == typeof o ? o : n.slide;
        e || t.data("bs.carousel", (e = new f(this, n))),
          "number" == typeof o
            ? e.to(o)
            : i
            ? e[i]()
            : n.interval && e.pause().cycle();
      });
    }
    var f = function (t, e) {
      (this.$element = d(t)),
        (this.$indicators = this.$element.find(".carousel-indicators")),
        (this.options = e),
        (this.paused = null),
        (this.sliding = null),
        (this.interval = null),
        (this.$active = null),
        (this.$items = null),
        this.options.keyboard &&
          this.$element.on("keydown.bs.carousel", d.proxy(this.keydown, this)),
        "hover" == this.options.pause &&
          !("ontouchstart" in document.documentElement) &&
          this.$element
            .on("mouseenter.bs.carousel", d.proxy(this.pause, this))
            .on("mouseleave.bs.carousel", d.proxy(this.cycle, this));
    };
    (f.VERSION = "3.3.4"),
      (f.TRANSITION_DURATION = 600),
      (f.DEFAULTS = { interval: 5e3, pause: "hover", wrap: !0, keyboard: !0 }),
      (f.prototype.keydown = function (t) {
        if (!/input|textarea/i.test(t.target.tagName)) {
          switch (t.which) {
            case 37:
              this.prev();
              break;
            case 39:
              this.next();
              break;
            default:
              return;
          }
          t.preventDefault();
        }
      }),
      (f.prototype.cycle = function (t) {
        return (
          t || (this.paused = !1),
          this.interval && clearInterval(this.interval),
          this.options.interval &&
            !this.paused &&
            (this.interval = setInterval(
              d.proxy(this.next, this),
              this.options.interval
            )),
          this
        );
      }),
      (f.prototype.getItemIndex = function (t) {
        return (
          (this.$items = t.parent().children(".item")),
          this.$items.index(t || this.$active)
        );
      }),
      (f.prototype.getItemForDirection = function (t, e) {
        var n = this.getItemIndex(e);
        if (
          (("prev" == t && 0 === n) ||
            ("next" == t && n == this.$items.length - 1)) &&
          !this.options.wrap
        )
          return e;
        var i = (n + ("prev" == t ? -1 : 1)) % this.$items.length;
        return this.$items.eq(i);
      }),
      (f.prototype.to = function (t) {
        var e = this,
          n = this.getItemIndex(
            (this.$active = this.$element.find(".item.active"))
          );
        if (!(t > this.$items.length - 1 || t < 0))
          return this.sliding
            ? this.$element.one("slid.bs.carousel", function () {
                e.to(t);
              })
            : n == t
            ? this.pause().cycle()
            : this.slide(n < t ? "next" : "prev", this.$items.eq(t));
      }),
      (f.prototype.pause = function (t) {
        return (
          t || (this.paused = !0),
          this.$element.find(".next, .prev").length &&
            d.support.transition &&
            (this.$element.trigger(d.support.transition.end), this.cycle(!0)),
          (this.interval = clearInterval(this.interval)),
          this
        );
      }),
      (f.prototype.next = function () {
        if (!this.sliding) return this.slide("next");
      }),
      (f.prototype.prev = function () {
        if (!this.sliding) return this.slide("prev");
      }),
      (f.prototype.slide = function (t, e) {
        var n = this.$element.find(".item.active"),
          i = e || this.getItemForDirection(t, n),
          o = this.interval,
          r = "next" == t ? "left" : "right",
          a = this;
        if (i.hasClass("active")) return (this.sliding = !1);
        var s = i[0],
          l = d.Event("slide.bs.carousel", { relatedTarget: s, direction: r });
        if ((this.$element.trigger(l), !l.isDefaultPrevented())) {
          if (
            ((this.sliding = !0), o && this.pause(), this.$indicators.length)
          ) {
            this.$indicators.find(".active").removeClass("active");
            var u = d(this.$indicators.children()[this.getItemIndex(i)]);
            u && u.addClass("active");
          }
          var c = d.Event("slid.bs.carousel", {
            relatedTarget: s,
            direction: r,
          });
          return (
            d.support.transition && this.$element.hasClass("slide")
              ? (i.addClass(t),
                i[0].offsetWidth,
                n.addClass(r),
                i.addClass(r),
                n
                  .one("bsTransitionEnd", function () {
                    i.removeClass([t, r].join(" ")).addClass("active"),
                      n.removeClass(["active", r].join(" ")),
                      (a.sliding = !1),
                      setTimeout(function () {
                        a.$element.trigger(c);
                      }, 0);
                  })
                  .emulateTransitionEnd(f.TRANSITION_DURATION))
              : (n.removeClass("active"),
                i.addClass("active"),
                (this.sliding = !1),
                this.$element.trigger(c)),
            o && this.cycle(),
            this
          );
        }
      });
    var t = d.fn.carousel;
    (d.fn.carousel = a),
      (d.fn.carousel.Constructor = f),
      (d.fn.carousel.noConflict = function () {
        return (d.fn.carousel = t), this;
      });
    var e = function (t) {
      var e,
        n = d(this),
        i = d(
          n.attr("data-target") ||
            ((e = n.attr("href")) && e.replace(/.*(?=#[^\s]+$)/, ""))
        );
      if (i.hasClass("carousel")) {
        var o = d.extend({}, i.data(), n.data()),
          r = n.attr("data-slide-to");
        r && (o.interval = !1),
          a.call(i, o),
          r && i.data("bs.carousel").to(r),
          t.preventDefault();
      }
    };
    d(document)
      .on("click.bs.carousel.data-api", "[data-slide]", e)
      .on("click.bs.carousel.data-api", "[data-slide-to]", e),
      d(window).on("load", function () {
        d('[data-ride="carousel"]').each(function () {
          var t = d(this);
          a.call(t, t.data());
        });
      });
  })(jQuery),
  (function (a) {
    "use strict";
    function o(t) {
      var e,
        n =
          t.attr("data-target") ||
          ((e = t.attr("href")) && e.replace(/.*(?=#[^\s]+$)/, ""));
      return a(n);
    }
    function s(i) {
      return this.each(function () {
        var t = a(this),
          e = t.data("bs.collapse"),
          n = a.extend({}, l.DEFAULTS, t.data(), "object" == typeof i && i);
        !e && n.toggle && /show|hide/.test(i) && (n.toggle = !1),
          e || t.data("bs.collapse", (e = new l(this, n))),
          "string" == typeof i && e[i]();
      });
    }
    var l = function (t, e) {
      (this.$element = a(t)),
        (this.options = a.extend({}, l.DEFAULTS, e)),
        (this.$trigger = a(
          '[data-toggle="collapse"][href="#' +
            t.id +
            '"],[data-toggle="collapse"][data-target="#' +
            t.id +
            '"]'
        )),
        (this.transitioning = null),
        this.options.parent
          ? (this.$parent = this.getParent())
          : this.addAriaAndCollapsedClass(this.$element, this.$trigger),
        this.options.toggle && this.toggle();
    };
    (l.VERSION = "3.3.4"),
      (l.TRANSITION_DURATION = 350),
      (l.DEFAULTS = { toggle: !0 }),
      (l.prototype.dimension = function () {
        return this.$element.hasClass("width") ? "width" : "height";
      }),
      (l.prototype.show = function () {
        if (!this.transitioning && !this.$element.hasClass("in")) {
          var t,
            e =
              this.$parent &&
              this.$parent.children(".panel").children(".in, .collapsing");
          if (
            !(e && e.length && (t = e.data("bs.collapse")) && t.transitioning)
          ) {
            var n = a.Event("show.bs.collapse");
            if ((this.$element.trigger(n), !n.isDefaultPrevented())) {
              e &&
                e.length &&
                (s.call(e, "hide"), t || e.data("bs.collapse", null));
              var i = this.dimension();
              this.$element
                .removeClass("collapse")
                .addClass("collapsing")
                [i](0)
                .attr("aria-expanded", !0),
                this.$trigger
                  .removeClass("collapsed")
                  .attr("aria-expanded", !0),
                (this.transitioning = 1);
              var o = function () {
                this.$element
                  .removeClass("collapsing")
                  .addClass("collapse in")
                  [i](""),
                  (this.transitioning = 0),
                  this.$element.trigger("shown.bs.collapse");
              };
              if (!a.support.transition) return o.call(this);
              var r = a.camelCase(["scroll", i].join("-"));
              this.$element
                .one("bsTransitionEnd", a.proxy(o, this))
                .emulateTransitionEnd(l.TRANSITION_DURATION)
                [i](this.$element[0][r]);
            }
          }
        }
      }),
      (l.prototype.hide = function () {
        if (!this.transitioning && this.$element.hasClass("in")) {
          var t = a.Event("hide.bs.collapse");
          if ((this.$element.trigger(t), !t.isDefaultPrevented())) {
            var e = this.dimension();
            this.$element[e](this.$element[e]())[0].offsetHeight,
              this.$element
                .addClass("collapsing")
                .removeClass("collapse in")
                .attr("aria-expanded", !1),
              this.$trigger.addClass("collapsed").attr("aria-expanded", !1),
              (this.transitioning = 1);
            var n = function () {
              (this.transitioning = 0),
                this.$element
                  .removeClass("collapsing")
                  .addClass("collapse")
                  .trigger("hidden.bs.collapse");
            };
            if (!a.support.transition) return n.call(this);
            this.$element[e](0)
              .one("bsTransitionEnd", a.proxy(n, this))
              .emulateTransitionEnd(l.TRANSITION_DURATION);
          }
        }
      }),
      (l.prototype.toggle = function () {
        this[this.$element.hasClass("in") ? "hide" : "show"]();
      }),
      (l.prototype.getParent = function () {
        return a(this.options.parent)
          .find(
            '[data-toggle="collapse"][data-parent="' +
              this.options.parent +
              '"]'
          )
          .each(
            a.proxy(function (t, e) {
              var n = a(e);
              this.addAriaAndCollapsedClass(o(n), n);
            }, this)
          )
          .end();
      }),
      (l.prototype.addAriaAndCollapsedClass = function (t, e) {
        var n = t.hasClass("in");
        t.attr("aria-expanded", n),
          e.toggleClass("collapsed", !n).attr("aria-expanded", n);
      });
    var t = a.fn.collapse;
    (a.fn.collapse = s),
      (a.fn.collapse.Constructor = l),
      (a.fn.collapse.noConflict = function () {
        return (a.fn.collapse = t), this;
      }),
      a(document).on(
        "click.bs.collapse.data-api",
        '[data-toggle="collapse"]',
        function (t) {
          var e = a(this);
          e.attr("data-target") || t.preventDefault();
          var n = o(e),
            i = n.data("bs.collapse") ? "toggle" : e.data();
          s.call(n, i);
        }
      );
  })(jQuery),
  (function (s) {
    "use strict";
    function r(i) {
      (i && 3 === i.which) ||
        (s(e).remove(),
        s(u).each(function () {
          var t = s(this),
            e = l(t),
            n = { relatedTarget: this };
          e.hasClass("open") &&
            (e.trigger((i = s.Event("hide.bs.dropdown", n))),
            i.isDefaultPrevented() ||
              (t.attr("aria-expanded", "false"),
              e.removeClass("open").trigger("hidden.bs.dropdown", n)));
        }));
    }
    function l(t) {
      var e = t.attr("data-target");
      e ||
        (e =
          (e = t.attr("href")) &&
          /#[A-Za-z]/.test(e) &&
          e.replace(/.*(?=#[^\s]*$)/, ""));
      var n = e && s(e);
      return n && n.length ? n : t.parent();
    }
    function t(n) {
      return this.each(function () {
        var t = s(this),
          e = t.data("bs.dropdown");
        e || t.data("bs.dropdown", (e = new i(this))),
          "string" == typeof n && e[n].call(t);
      });
    }
    var e = ".dropdown-backdrop",
      u = '[data-toggle="dropdown"]',
      i = function (t) {
        s(t).on("click.bs.dropdown", this.toggle);
      };
    (i.VERSION = "3.3.4"),
      (i.prototype.toggle = function (t) {
        var e = s(this);
        if (!e.is(".disabled, :disabled")) {
          var n = l(e),
            i = n.hasClass("open");
          if ((r(), !i)) {
            "ontouchstart" in document.documentElement &&
              !n.closest(".navbar-nav").length &&
              s('<div class="dropdown-backdrop"/>')
                .insertAfter(s(this))
                .on("click", r);
            var o = { relatedTarget: this };
            if (
              (n.trigger((t = s.Event("show.bs.dropdown", o))),
              t.isDefaultPrevented())
            )
              return;
            e.trigger("focus").attr("aria-expanded", "true"),
              n.toggleClass("open").trigger("shown.bs.dropdown", o);
          }
          return !1;
        }
      }),
      (i.prototype.keydown = function (t) {
        if (
          /(38|40|27|32)/.test(t.which) &&
          !/input|textarea/i.test(t.target.tagName)
        ) {
          var e = s(this);
          if (
            (t.preventDefault(),
            t.stopPropagation(),
            !e.is(".disabled, :disabled"))
          ) {
            var n = l(e),
              i = n.hasClass("open");
            if ((!i && 27 != t.which) || (i && 27 == t.which))
              return (
                27 == t.which && n.find(u).trigger("focus"), e.trigger("click")
              );
            var o = " li:not(.disabled):visible a",
              r = n.find('[role="menu"]' + o + ', [role="listbox"]' + o);
            if (r.length) {
              var a = r.index(t.target);
              38 == t.which && 0 < a && a--,
                40 == t.which && a < r.length - 1 && a++,
                ~a || (a = 0),
                r.eq(a).trigger("focus");
            }
          }
        }
      });
    var n = s.fn.dropdown;
    (s.fn.dropdown = t),
      (s.fn.dropdown.Constructor = i),
      (s.fn.dropdown.noConflict = function () {
        return (s.fn.dropdown = n), this;
      }),
      s(document)
        .on("click.bs.dropdown.data-api", r)
        .on("click.bs.dropdown.data-api", ".dropdown form", function (t) {
          t.stopPropagation();
        })
        .on("click.bs.dropdown.data-api", u, i.prototype.toggle)
        .on("keydown.bs.dropdown.data-api", u, i.prototype.keydown)
        .on(
          "keydown.bs.dropdown.data-api",
          '[role="menu"]',
          i.prototype.keydown
        )
        .on(
          "keydown.bs.dropdown.data-api",
          '[role="listbox"]',
          i.prototype.keydown
        );
  })(jQuery),
  (function (r) {
    "use strict";
    function a(i, o) {
      return this.each(function () {
        var t = r(this),
          e = t.data("bs.modal"),
          n = r.extend({}, s.DEFAULTS, t.data(), "object" == typeof i && i);
        e || t.data("bs.modal", (e = new s(this, n))),
          "string" == typeof i ? e[i](o) : n.show && e.show(o);
      });
    }
    var s = function (t, e) {
      (this.options = e),
        (this.$body = r(document.body)),
        (this.$element = r(t)),
        (this.$dialog = this.$element.find(".modal-dialog")),
        (this.$backdrop = null),
        (this.isShown = null),
        (this.originalBodyPad = null),
        (this.scrollbarWidth = 0),
        (this.ignoreBackdropClick = !1),
        this.options.remote &&
          this.$element.find(".modal-content").load(
            this.options.remote,
            r.proxy(function () {
              this.$element.trigger("loaded.bs.modal");
            }, this)
          );
    };
    (s.VERSION = "3.3.4"),
      (s.TRANSITION_DURATION = 300),
      (s.BACKDROP_TRANSITION_DURATION = 150),
      (s.DEFAULTS = { backdrop: !0, keyboard: !0, show: !0 }),
      (s.prototype.toggle = function (t) {
        return this.isShown ? this.hide() : this.show(t);
      }),
      (s.prototype.show = function (n) {
        var i = this,
          t = r.Event("show.bs.modal", { relatedTarget: n });
        this.$element.trigger(t),
          this.isShown ||
            t.isDefaultPrevented() ||
            ((this.isShown = !0),
            this.checkScrollbar(),
            this.setScrollbar(),
            this.$body.addClass("modal-open"),
            this.escape(),
            this.resize(),
            this.$element.on(
              "click.dismiss.bs.modal",
              '[data-dismiss="modal"]',
              r.proxy(this.hide, this)
            ),
            this.$dialog.on("mousedown.dismiss.bs.modal", function () {
              i.$element.one("mouseup.dismiss.bs.modal", function (t) {
                r(t.target).is(i.$element) && (i.ignoreBackdropClick = !0);
              });
            }),
            this.backdrop(function () {
              var t = r.support.transition && i.$element.hasClass("fade");
              i.$element.parent().length || i.$element.appendTo(i.$body),
                i.$element.show().scrollTop(0),
                i.adjustDialog(),
                t && i.$element[0].offsetWidth,
                i.$element.addClass("in").attr("aria-hidden", !1),
                i.enforceFocus();
              var e = r.Event("shown.bs.modal", { relatedTarget: n });
              t
                ? i.$dialog
                    .one("bsTransitionEnd", function () {
                      i.$element.trigger("focus").trigger(e);
                    })
                    .emulateTransitionEnd(s.TRANSITION_DURATION)
                : i.$element.trigger("focus").trigger(e);
            }));
      }),
      (s.prototype.hide = function (t) {
        t && t.preventDefault(),
          (t = r.Event("hide.bs.modal")),
          this.$element.trigger(t),
          this.isShown &&
            !t.isDefaultPrevented() &&
            ((this.isShown = !1),
            this.escape(),
            this.resize(),
            r(document).off("focusin.bs.modal"),
            this.$element
              .removeClass("in")
              .attr("aria-hidden", !0)
              .off("click.dismiss.bs.modal")
              .off("mouseup.dismiss.bs.modal"),
            this.$dialog.off("mousedown.dismiss.bs.modal"),
            r.support.transition && this.$element.hasClass("fade")
              ? this.$element
                  .one("bsTransitionEnd", r.proxy(this.hideModal, this))
                  .emulateTransitionEnd(s.TRANSITION_DURATION)
              : this.hideModal());
      }),
      (s.prototype.enforceFocus = function () {
        r(document)
          .off("focusin.bs.modal")
          .on(
            "focusin.bs.modal",
            r.proxy(function (t) {
              this.$element[0] === t.target ||
                this.$element.has(t.target).length ||
                this.$element.trigger("focus");
            }, this)
          );
      }),
      (s.prototype.escape = function () {
        this.isShown && this.options.keyboard
          ? this.$element.on(
              "keydown.dismiss.bs.modal",
              r.proxy(function (t) {
                27 == t.which && this.hide();
              }, this)
            )
          : this.isShown || this.$element.off("keydown.dismiss.bs.modal");
      }),
      (s.prototype.resize = function () {
        this.isShown
          ? r(window).on("resize.bs.modal", r.proxy(this.handleUpdate, this))
          : r(window).off("resize.bs.modal");
      }),
      (s.prototype.hideModal = function () {
        var t = this;
        this.$element.hide(),
          this.backdrop(function () {
            t.$body.removeClass("modal-open"),
              t.resetAdjustments(),
              t.resetScrollbar(),
              t.$element.trigger("hidden.bs.modal");
          });
      }),
      (s.prototype.removeBackdrop = function () {
        this.$backdrop && this.$backdrop.remove(), (this.$backdrop = null);
      }),
      (s.prototype.backdrop = function (t) {
        var e = this,
          n = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
          var i = r.support.transition && n;
          if (
            ((this.$backdrop = r(
              '<div class="modal-backdrop ' + n + '" />'
            ).appendTo(this.$body)),
            this.$element.on(
              "click.dismiss.bs.modal",
              r.proxy(function (t) {
                this.ignoreBackdropClick
                  ? (this.ignoreBackdropClick = !1)
                  : t.target === t.currentTarget &&
                    ("static" == this.options.backdrop
                      ? this.$element[0].focus()
                      : this.hide());
              }, this)
            ),
            i && this.$backdrop[0].offsetWidth,
            this.$backdrop.addClass("in"),
            !t)
          )
            return;
          i
            ? this.$backdrop
                .one("bsTransitionEnd", t)
                .emulateTransitionEnd(s.BACKDROP_TRANSITION_DURATION)
            : t();
        } else if (!this.isShown && this.$backdrop) {
          this.$backdrop.removeClass("in");
          var o = function () {
            e.removeBackdrop(), t && t();
          };
          r.support.transition && this.$element.hasClass("fade")
            ? this.$backdrop
                .one("bsTransitionEnd", o)
                .emulateTransitionEnd(s.BACKDROP_TRANSITION_DURATION)
            : o();
        } else t && t();
      }),
      (s.prototype.handleUpdate = function () {
        this.adjustDialog();
      }),
      (s.prototype.adjustDialog = function () {
        var t =
          this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
          paddingLeft: !this.bodyIsOverflowing && t ? this.scrollbarWidth : "",
          paddingRight: this.bodyIsOverflowing && !t ? this.scrollbarWidth : "",
        });
      }),
      (s.prototype.resetAdjustments = function () {
        this.$element.css({ paddingLeft: "", paddingRight: "" });
      }),
      (s.prototype.checkScrollbar = function () {
        var t = window.innerWidth;
        if (!t) {
          var e = document.documentElement.getBoundingClientRect();
          t = e.right - Math.abs(e.left);
        }
        (this.bodyIsOverflowing = document.body.clientWidth < t),
          (this.scrollbarWidth = this.measureScrollbar());
      }),
      (s.prototype.setScrollbar = function () {
        var t = parseInt(this.$body.css("padding-right") || 0, 10);
        (this.originalBodyPad = document.body.style.paddingRight || ""),
          this.bodyIsOverflowing &&
            this.$body.css("padding-right", t + this.scrollbarWidth);
      }),
      (s.prototype.resetScrollbar = function () {
        this.$body.css("padding-right", this.originalBodyPad);
      }),
      (s.prototype.measureScrollbar = function () {
        var t = document.createElement("div");
        (t.className = "modal-scrollbar-measure"), this.$body.append(t);
        var e = t.offsetWidth - t.clientWidth;
        return this.$body[0].removeChild(t), e;
      });
    var t = r.fn.modal;
    (r.fn.modal = a),
      (r.fn.modal.Constructor = s),
      (r.fn.modal.noConflict = function () {
        return (r.fn.modal = t), this;
      }),
      r(document).on(
        "click.bs.modal.data-api",
        '[data-toggle="modal"]',
        function (t) {
          var e = r(this),
            n = e.attr("href"),
            i = r(
              e.attr("data-target") || (n && n.replace(/.*(?=#[^\s]+$)/, ""))
            ),
            o = i.data("bs.modal")
              ? "toggle"
              : r.extend({ remote: !/#/.test(n) && n }, i.data(), e.data());
          e.is("a") && t.preventDefault(),
            i.one("show.bs.modal", function (t) {
              t.isDefaultPrevented() ||
                i.one("hidden.bs.modal", function () {
                  e.is(":visible") && e.trigger("focus");
                });
            }),
            a.call(i, o, this);
        }
      );
  })(jQuery),
  (function (g) {
    "use strict";
    function t(i) {
      return this.each(function () {
        var t = g(this),
          e = t.data("bs.tooltip"),
          n = "object" == typeof i && i;
        (!e && /destroy|hide/.test(i)) ||
          (e || t.data("bs.tooltip", (e = new v(this, n))),
          "string" == typeof i && e[i]());
      });
    }
    var v = function (t, e) {
      (this.type = null),
        (this.options = null),
        (this.enabled = null),
        (this.timeout = null),
        (this.hoverState = null),
        (this.$element = null),
        this.init("tooltip", t, e);
    };
    (v.VERSION = "3.3.4"),
      (v.TRANSITION_DURATION = 150),
      (v.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template:
          '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: { selector: "body", padding: 0 },
      }),
      (v.prototype.init = function (t, e, n) {
        if (
          ((this.enabled = !0),
          (this.type = t),
          (this.$element = g(e)),
          (this.options = this.getOptions(n)),
          (this.$viewport =
            this.options.viewport &&
            g(this.options.viewport.selector || this.options.viewport)),
          this.$element[0] instanceof document.constructor &&
            !this.options.selector)
        )
          throw new Error(
            "`selector` option must be specified when initializing " +
              this.type +
              " on the window.document object!"
          );
        for (var i = this.options.trigger.split(" "), o = i.length; o--; ) {
          var r = i[o];
          if ("click" == r)
            this.$element.on(
              "click." + this.type,
              this.options.selector,
              g.proxy(this.toggle, this)
            );
          else if ("manual" != r) {
            var a = "hover" == r ? "mouseenter" : "focusin",
              s = "hover" == r ? "mouseleave" : "focusout";
            this.$element.on(
              a + "." + this.type,
              this.options.selector,
              g.proxy(this.enter, this)
            ),
              this.$element.on(
                s + "." + this.type,
                this.options.selector,
                g.proxy(this.leave, this)
              );
          }
        }
        this.options.selector
          ? (this._options = g.extend({}, this.options, {
              trigger: "manual",
              selector: "",
            }))
          : this.fixTitle();
      }),
      (v.prototype.getDefaults = function () {
        return v.DEFAULTS;
      }),
      (v.prototype.getOptions = function (t) {
        return (
          (t = g.extend({}, this.getDefaults(), this.$element.data(), t))
            .delay &&
            "number" == typeof t.delay &&
            (t.delay = { show: t.delay, hide: t.delay }),
          t
        );
      }),
      (v.prototype.getDelegateOptions = function () {
        var n = {},
          i = this.getDefaults();
        return (
          this._options &&
            g.each(this._options, function (t, e) {
              i[t] != e && (n[t] = e);
            }),
          n
        );
      }),
      (v.prototype.enter = function (t) {
        var e =
          t instanceof this.constructor
            ? t
            : g(t.currentTarget).data("bs." + this.type);
        if (e && e.$tip && e.$tip.is(":visible")) e.hoverState = "in";
        else {
          if (
            (e ||
              ((e = new this.constructor(
                t.currentTarget,
                this.getDelegateOptions()
              )),
              g(t.currentTarget).data("bs." + this.type, e)),
            clearTimeout(e.timeout),
            (e.hoverState = "in"),
            !e.options.delay || !e.options.delay.show)
          )
            return e.show();
          e.timeout = setTimeout(function () {
            "in" == e.hoverState && e.show();
          }, e.options.delay.show);
        }
      }),
      (v.prototype.leave = function (t) {
        var e =
          t instanceof this.constructor
            ? t
            : g(t.currentTarget).data("bs." + this.type);
        if (
          (e ||
            ((e = new this.constructor(
              t.currentTarget,
              this.getDelegateOptions()
            )),
            g(t.currentTarget).data("bs." + this.type, e)),
          clearTimeout(e.timeout),
          (e.hoverState = "out"),
          !e.options.delay || !e.options.delay.hide)
        )
          return e.hide();
        e.timeout = setTimeout(function () {
          "out" == e.hoverState && e.hide();
        }, e.options.delay.hide);
      }),
      (v.prototype.show = function () {
        var t = g.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
          this.$element.trigger(t);
          var e = g.contains(
            this.$element[0].ownerDocument.documentElement,
            this.$element[0]
          );
          if (t.isDefaultPrevented() || !e) return;
          var n = this,
            i = this.tip(),
            o = this.getUID(this.type);
          this.setContent(),
            i.attr("id", o),
            this.$element.attr("aria-describedby", o),
            this.options.animation && i.addClass("fade");
          var r =
              "function" == typeof this.options.placement
                ? this.options.placement.call(this, i[0], this.$element[0])
                : this.options.placement,
            a = /\s?auto?\s?/i,
            s = a.test(r);
          s && (r = r.replace(a, "") || "top"),
            i
              .detach()
              .css({ top: 0, left: 0, display: "block" })
              .addClass(r)
              .data("bs." + this.type, this),
            this.options.container
              ? i.appendTo(this.options.container)
              : i.insertAfter(this.$element);
          var l = this.getPosition(),
            u = i[0].offsetWidth,
            c = i[0].offsetHeight;
          if (s) {
            var d = r,
              f = this.options.container
                ? g(this.options.container)
                : this.$element.parent(),
              p = this.getPosition(f);
            (r =
              "bottom" == r && l.bottom + c > p.bottom
                ? "top"
                : "top" == r && l.top - c < p.top
                ? "bottom"
                : "right" == r && l.right + u > p.width
                ? "left"
                : "left" == r && l.left - u < p.left
                ? "right"
                : r),
              i.removeClass(d).addClass(r);
          }
          var h = this.getCalculatedOffset(r, l, u, c);
          this.applyPlacement(h, r);
          var m = function () {
            var t = n.hoverState;
            n.$element.trigger("shown.bs." + n.type),
              (n.hoverState = null),
              "out" == t && n.leave(n);
          };
          g.support.transition && this.$tip.hasClass("fade")
            ? i
                .one("bsTransitionEnd", m)
                .emulateTransitionEnd(v.TRANSITION_DURATION)
            : m();
        }
      }),
      (v.prototype.applyPlacement = function (t, e) {
        var n = this.tip(),
          i = n[0].offsetWidth,
          o = n[0].offsetHeight,
          r = parseInt(n.css("margin-top"), 10),
          a = parseInt(n.css("margin-left"), 10);
        isNaN(r) && (r = 0),
          isNaN(a) && (a = 0),
          (t.top = t.top + r),
          (t.left = t.left + a),
          g.offset.setOffset(
            n[0],
            g.extend(
              {
                using: function (t) {
                  n.css({ top: Math.round(t.top), left: Math.round(t.left) });
                },
              },
              t
            ),
            0
          ),
          n.addClass("in");
        var s = n[0].offsetWidth,
          l = n[0].offsetHeight;
        "top" == e && l != o && (t.top = t.top + o - l);
        var u = this.getViewportAdjustedDelta(e, t, s, l);
        u.left ? (t.left += u.left) : (t.top += u.top);
        var c = /top|bottom/.test(e),
          d = c ? 2 * u.left - i + s : 2 * u.top - o + l,
          f = c ? "offsetWidth" : "offsetHeight";
        n.offset(t), this.replaceArrow(d, n[0][f], c);
      }),
      (v.prototype.replaceArrow = function (t, e, n) {
        this.arrow()
          .css(n ? "left" : "top", 50 * (1 - t / e) + "%")
          .css(n ? "top" : "left", "");
      }),
      (v.prototype.setContent = function () {
        var t = this.tip(),
          e = this.getTitle();
        t.find(".tooltip-inner")[this.options.html ? "html" : "text"](e),
          t.removeClass("fade in top bottom left right");
      }),
      (v.prototype.hide = function (t) {
        function e() {
          "in" != n.hoverState && i.detach(),
            n.$element
              .removeAttr("aria-describedby")
              .trigger("hidden.bs." + n.type),
            t && t();
        }
        var n = this,
          i = g(this.$tip),
          o = g.Event("hide.bs." + this.type);
        if ((this.$element.trigger(o), !o.isDefaultPrevented()))
          return (
            i.removeClass("in"),
            g.support.transition && i.hasClass("fade")
              ? i
                  .one("bsTransitionEnd", e)
                  .emulateTransitionEnd(v.TRANSITION_DURATION)
              : e(),
            (this.hoverState = null),
            this
          );
      }),
      (v.prototype.fixTitle = function () {
        var t = this.$element;
        (t.attr("title") || "string" != typeof t.attr("data-original-title")) &&
          t
            .attr("data-original-title", t.attr("title") || "")
            .attr("title", "");
      }),
      (v.prototype.hasContent = function () {
        return this.getTitle();
      }),
      (v.prototype.getPosition = function (t) {
        var e = (t = t || this.$element)[0],
          n = "BODY" == e.tagName,
          i = e.getBoundingClientRect();
        null == i.width &&
          (i = g.extend({}, i, {
            width: i.right - i.left,
            height: i.bottom - i.top,
          }));
        var o = n ? { top: 0, left: 0 } : t.offset(),
          r = {
            scroll: n
              ? document.documentElement.scrollTop || document.body.scrollTop
              : t.scrollTop(),
          },
          a = n
            ? { width: g(window).width(), height: g(window).height() }
            : null;
        return g.extend({}, i, r, a, o);
      }),
      (v.prototype.getCalculatedOffset = function (t, e, n, i) {
        return "bottom" == t
          ? { top: e.top + e.height, left: e.left + e.width / 2 - n / 2 }
          : "top" == t
          ? { top: e.top - i, left: e.left + e.width / 2 - n / 2 }
          : "left" == t
          ? { top: e.top + e.height / 2 - i / 2, left: e.left - n }
          : { top: e.top + e.height / 2 - i / 2, left: e.left + e.width };
      }),
      (v.prototype.getViewportAdjustedDelta = function (t, e, n, i) {
        var o = { top: 0, left: 0 };
        if (!this.$viewport) return o;
        var r = (this.options.viewport && this.options.viewport.padding) || 0,
          a = this.getPosition(this.$viewport);
        if (/right|left/.test(t)) {
          var s = e.top - r - a.scroll,
            l = e.top + r - a.scroll + i;
          s < a.top
            ? (o.top = a.top - s)
            : l > a.top + a.height && (o.top = a.top + a.height - l);
        } else {
          var u = e.left - r,
            c = e.left + r + n;
          u < a.left
            ? (o.left = a.left - u)
            : c > a.width && (o.left = a.left + a.width - c);
        }
        return o;
      }),
      (v.prototype.getTitle = function () {
        var t = this.$element,
          e = this.options;
        return (
          t.attr("data-original-title") ||
          ("function" == typeof e.title ? e.title.call(t[0]) : e.title)
        );
      }),
      (v.prototype.getUID = function (t) {
        for (; (t += ~~(1e6 * Math.random())), document.getElementById(t); );
        return t;
      }),
      (v.prototype.tip = function () {
        return (this.$tip = this.$tip || g(this.options.template));
      }),
      (v.prototype.arrow = function () {
        return (this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow"));
      }),
      (v.prototype.enable = function () {
        this.enabled = !0;
      }),
      (v.prototype.disable = function () {
        this.enabled = !1;
      }),
      (v.prototype.toggleEnabled = function () {
        this.enabled = !this.enabled;
      }),
      (v.prototype.toggle = function (t) {
        var e = this;
        t &&
          ((e = g(t.currentTarget).data("bs." + this.type)) ||
            ((e = new this.constructor(
              t.currentTarget,
              this.getDelegateOptions()
            )),
            g(t.currentTarget).data("bs." + this.type, e))),
          e.tip().hasClass("in") ? e.leave(e) : e.enter(e);
      }),
      (v.prototype.destroy = function () {
        var t = this;
        clearTimeout(this.timeout),
          this.hide(function () {
            t.$element.off("." + t.type).removeData("bs." + t.type);
          });
      });
    var e = g.fn.tooltip;
    (g.fn.tooltip = t),
      (g.fn.tooltip.Constructor = v),
      (g.fn.tooltip.noConflict = function () {
        return (g.fn.tooltip = e), this;
      });
  })(jQuery),
  (function (o) {
    "use strict";
    function t(i) {
      return this.each(function () {
        var t = o(this),
          e = t.data("bs.popover"),
          n = "object" == typeof i && i;
        (!e && /destroy|hide/.test(i)) ||
          (e || t.data("bs.popover", (e = new r(this, n))),
          "string" == typeof i && e[i]());
      });
    }
    var r = function (t, e) {
      this.init("popover", t, e);
    };
    if (!o.fn.tooltip) throw new Error("Popover requires tooltip.js");
    (r.VERSION = "3.3.4"),
      (r.DEFAULTS = o.extend({}, o.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template:
          '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>',
      })),
      (r.prototype = o.extend({}, o.fn.tooltip.Constructor.prototype)),
      ((r.prototype.constructor = r).prototype.getDefaults = function () {
        return r.DEFAULTS;
      }),
      (r.prototype.setContent = function () {
        var t = this.tip(),
          e = this.getTitle(),
          n = this.getContent();
        t.find(".popover-title")[this.options.html ? "html" : "text"](e),
          t
            .find(".popover-content")
            .children()
            .detach()
            .end()
            [
              this.options.html
                ? "string" == typeof n
                  ? "html"
                  : "append"
                : "text"
            ](n),
          t.removeClass("fade top bottom left right in"),
          t.find(".popover-title").html() || t.find(".popover-title").hide();
      }),
      (r.prototype.hasContent = function () {
        return this.getTitle() || this.getContent();
      }),
      (r.prototype.getContent = function () {
        var t = this.$element,
          e = this.options;
        return (
          t.attr("data-content") ||
          ("function" == typeof e.content ? e.content.call(t[0]) : e.content)
        );
      }),
      (r.prototype.arrow = function () {
        return (this.$arrow = this.$arrow || this.tip().find(".arrow"));
      });
    var e = o.fn.popover;
    (o.fn.popover = t),
      (o.fn.popover.Constructor = r),
      (o.fn.popover.noConflict = function () {
        return (o.fn.popover = e), this;
      });
  })(jQuery),
  (function (r) {
    "use strict";
    function o(t, e) {
      (this.$body = r(document.body)),
        (this.$scrollElement = r(t).is(document.body) ? r(window) : r(t)),
        (this.options = r.extend({}, o.DEFAULTS, e)),
        (this.selector = (this.options.target || "") + " .nav li > a"),
        (this.offsets = []),
        (this.targets = []),
        (this.activeTarget = null),
        (this.scrollHeight = 0),
        this.$scrollElement.on(
          "scroll.bs.scrollspy",
          r.proxy(this.process, this)
        ),
        this.refresh(),
        this.process();
    }
    function e(i) {
      return this.each(function () {
        var t = r(this),
          e = t.data("bs.scrollspy"),
          n = "object" == typeof i && i;
        e || t.data("bs.scrollspy", (e = new o(this, n))),
          "string" == typeof i && e[i]();
      });
    }
    (o.VERSION = "3.3.4"),
      (o.DEFAULTS = { offset: 10 }),
      (o.prototype.getScrollHeight = function () {
        return (
          this.$scrollElement[0].scrollHeight ||
          Math.max(
            this.$body[0].scrollHeight,
            document.documentElement.scrollHeight
          )
        );
      }),
      (o.prototype.refresh = function () {
        var t = this,
          i = "offset",
          o = 0;
        (this.offsets = []),
          (this.targets = []),
          (this.scrollHeight = this.getScrollHeight()),
          r.isWindow(this.$scrollElement[0]) ||
            ((i = "position"), (o = this.$scrollElement.scrollTop())),
          this.$body
            .find(this.selector)
            .map(function () {
              var t = r(this),
                e = t.data("target") || t.attr("href"),
                n = /^#./.test(e) && r(e);
              return (
                (n && n.length && n.is(":visible") && [[n[i]().top + o, e]]) ||
                null
              );
            })
            .sort(function (t, e) {
              return t[0] - e[0];
            })
            .each(function () {
              t.offsets.push(this[0]), t.targets.push(this[1]);
            });
      }),
      (o.prototype.process = function () {
        var t,
          e = this.$scrollElement.scrollTop() + this.options.offset,
          n = this.getScrollHeight(),
          i = this.options.offset + n - this.$scrollElement.height(),
          o = this.offsets,
          r = this.targets,
          a = this.activeTarget;
        if ((this.scrollHeight != n && this.refresh(), i <= e))
          return a != (t = r[r.length - 1]) && this.activate(t);
        if (a && e < o[0]) return (this.activeTarget = null), this.clear();
        for (t = o.length; t--; )
          a != r[t] &&
            e >= o[t] &&
            (o[t + 1] === undefined || e < o[t + 1]) &&
            this.activate(r[t]);
      }),
      (o.prototype.activate = function (t) {
        (this.activeTarget = t), this.clear();
        var e =
            this.selector +
            '[data-target="' +
            t +
            '"],' +
            this.selector +
            '[href="' +
            t +
            '"]',
          n = r(e).parents("li").addClass("active");
        n.parent(".dropdown-menu").length &&
          (n = n.closest("li.dropdown").addClass("active")),
          n.trigger("activate.bs.scrollspy");
      }),
      (o.prototype.clear = function () {
        r(this.selector)
          .parentsUntil(this.options.target, ".active")
          .removeClass("active");
      });
    var t = r.fn.scrollspy;
    (r.fn.scrollspy = e),
      (r.fn.scrollspy.Constructor = o),
      (r.fn.scrollspy.noConflict = function () {
        return (r.fn.scrollspy = t), this;
      }),
      r(window).on("load.bs.scrollspy.data-api", function () {
        r('[data-spy="scroll"]').each(function () {
          var t = r(this);
          e.call(t, t.data());
        });
      });
  })(jQuery),
  (function (s) {
    "use strict";
    function e(n) {
      return this.each(function () {
        var t = s(this),
          e = t.data("bs.tab");
        e || t.data("bs.tab", (e = new a(this))),
          "string" == typeof n && e[n]();
      });
    }
    var a = function (t) {
      this.element = s(t);
    };
    (a.VERSION = "3.3.4"),
      (a.TRANSITION_DURATION = 150),
      (a.prototype.show = function () {
        var t = this.element,
          e = t.closest("ul:not(.dropdown-menu)"),
          n = t.data("target");
        if (
          (n || (n = (n = t.attr("href")) && n.replace(/.*(?=#[^\s]*$)/, "")),
          !t.parent("li").hasClass("active"))
        ) {
          var i = e.find(".active:last a"),
            o = s.Event("hide.bs.tab", { relatedTarget: t[0] }),
            r = s.Event("show.bs.tab", { relatedTarget: i[0] });
          if (
            (i.trigger(o),
            t.trigger(r),
            !r.isDefaultPrevented() && !o.isDefaultPrevented())
          ) {
            var a = s(n);
            this.activate(t.closest("li"), e),
              this.activate(a, a.parent(), function () {
                i.trigger({ type: "hidden.bs.tab", relatedTarget: t[0] }),
                  t.trigger({ type: "shown.bs.tab", relatedTarget: i[0] });
              });
          }
        }
      }),
      (a.prototype.activate = function (t, e, n) {
        function i() {
          o
            .removeClass("active")
            .find("> .dropdown-menu > .active")
            .removeClass("active")
            .end()
            .find('[data-toggle="tab"]')
            .attr("aria-expanded", !1),
            t
              .addClass("active")
              .find('[data-toggle="tab"]')
              .attr("aria-expanded", !0),
            r ? (t[0].offsetWidth, t.addClass("in")) : t.removeClass("fade"),
            t.parent(".dropdown-menu").length &&
              t
                .closest("li.dropdown")
                .addClass("active")
                .end()
                .find('[data-toggle="tab"]')
                .attr("aria-expanded", !0),
            n && n();
        }
        var o = e.find("> .active"),
          r =
            n &&
            s.support.transition &&
            ((o.length && o.hasClass("fade")) || !!e.find("> .fade").length);
        o.length && r
          ? o
              .one("bsTransitionEnd", i)
              .emulateTransitionEnd(a.TRANSITION_DURATION)
          : i(),
          o.removeClass("in");
      });
    var t = s.fn.tab;
    (s.fn.tab = e),
      (s.fn.tab.Constructor = a),
      (s.fn.tab.noConflict = function () {
        return (s.fn.tab = t), this;
      });
    var n = function (t) {
      t.preventDefault(), e.call(s(this), "show");
    };
    s(document)
      .on("click.bs.tab.data-api", '[data-toggle="tab"]', n)
      .on("click.bs.tab.data-api", '[data-toggle="pill"]', n);
  })(jQuery),
  (function (l) {
    "use strict";
    function n(i) {
      return this.each(function () {
        var t = l(this),
          e = t.data("bs.affix"),
          n = "object" == typeof i && i;
        e || t.data("bs.affix", (e = new u(this, n))),
          "string" == typeof i && e[i]();
      });
    }
    var u = function (t, e) {
      (this.options = l.extend({}, u.DEFAULTS, e)),
        (this.$target = l(this.options.target)
          .on("scroll.bs.affix.data-api", l.proxy(this.checkPosition, this))
          .on(
            "click.bs.affix.data-api",
            l.proxy(this.checkPositionWithEventLoop, this)
          )),
        (this.$element = l(t)),
        (this.affixed = null),
        (this.unpin = null),
        (this.pinnedOffset = null),
        this.checkPosition();
    };
    (u.VERSION = "3.3.4"),
      (u.RESET = "affix affix-top affix-bottom"),
      (u.DEFAULTS = { offset: 0, target: window }),
      (u.prototype.getState = function (t, e, n, i) {
        var o = this.$target.scrollTop(),
          r = this.$element.offset(),
          a = this.$target.height();
        if (null != n && "top" == this.affixed) return o < n && "top";
        if ("bottom" == this.affixed)
          return null != n
            ? !(o + this.unpin <= r.top) && "bottom"
            : !(o + a <= t - i) && "bottom";
        var s = null == this.affixed,
          l = s ? o : r.top;
        return null != n && o <= n
          ? "top"
          : null != i && t - i <= l + (s ? a : e) && "bottom";
      }),
      (u.prototype.getPinnedOffset = function () {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(u.RESET).addClass("affix");
        var t = this.$target.scrollTop(),
          e = this.$element.offset();
        return (this.pinnedOffset = e.top - t);
      }),
      (u.prototype.checkPositionWithEventLoop = function () {
        setTimeout(l.proxy(this.checkPosition, this), 1);
      }),
      (u.prototype.checkPosition = function () {
        if (this.$element.is(":visible")) {
          var t = this.$element.height(),
            e = this.options.offset,
            n = e.top,
            i = e.bottom,
            o = l(document.body).height();
          "object" != typeof e && (i = n = e),
            "function" == typeof n && (n = e.top(this.$element)),
            "function" == typeof i && (i = e.bottom(this.$element));
          var r = this.getState(o, t, n, i);
          if (this.affixed != r) {
            null != this.unpin && this.$element.css("top", "");
            var a = "affix" + (r ? "-" + r : ""),
              s = l.Event(a + ".bs.affix");
            if ((this.$element.trigger(s), s.isDefaultPrevented())) return;
            (this.affixed = r),
              (this.unpin = "bottom" == r ? this.getPinnedOffset() : null),
              this.$element
                .removeClass(u.RESET)
                .addClass(a)
                .trigger(a.replace("affix", "affixed") + ".bs.affix");
          }
          "bottom" == r && this.$element.offset({ top: o - t - i });
        }
      });
    var t = l.fn.affix;
    (l.fn.affix = n),
      (l.fn.affix.Constructor = u),
      (l.fn.affix.noConflict = function () {
        return (l.fn.affix = t), this;
      }),
      l(window).on("load", function () {
        l('[data-spy="affix"]').each(function () {
          var t = l(this),
            e = t.data();
          (e.offset = e.offset || {}),
            null != e.offsetBottom && (e.offset.bottom = e.offsetBottom),
            null != e.offsetTop && (e.offset.top = e.offsetTop),
            n.call(t, e);
        });
      });
  })(jQuery),
  jQuery.extend(jQuery.easing, {
    easeInQuad: function (t, e, n, i, o) {
      return i * (e /= o) * e + n;
    },
    easeOutQuad: function (t, e, n, i, o) {
      return -i * (e /= o) * (e - 2) + n;
    },
    easeInOutQuad: function (t, e, n, i, o) {
      return (e /= o / 2) < 1
        ? (i / 2) * e * e + n
        : (-i / 2) * (--e * (e - 2) - 1) + n;
    },
    easeInCubic: function (t, e, n, i, o) {
      return i * (e /= o) * e * e + n;
    },
    easeOutCubic: function (t, e, n, i, o) {
      return i * ((e = e / o - 1) * e * e + 1) + n;
    },
    easeInOutCubic: function (t, e, n, i, o) {
      return (e /= o / 2) < 1
        ? (i / 2) * e * e * e + n
        : (i / 2) * ((e -= 2) * e * e + 2) + n;
    },
    easeInQuart: function (t, e, n, i, o) {
      return i * (e /= o) * e * e * e + n;
    },
    easeOutQuart: function (t, e, n, i, o) {
      return -i * ((e = e / o - 1) * e * e * e - 1) + n;
    },
    easeInOutQuart: function (t, e, n, i, o) {
      return (e /= o / 2) < 1
        ? (i / 2) * e * e * e * e + n
        : (-i / 2) * ((e -= 2) * e * e * e - 2) + n;
    },
    easeInQuint: function (t, e, n, i, o) {
      return i * (e /= o) * e * e * e * e + n;
    },
    easeOutQuint: function (t, e, n, i, o) {
      return i * ((e = e / o - 1) * e * e * e * e + 1) + n;
    },
    easeInOutQuint: function (t, e, n, i, o) {
      return (e /= o / 2) < 1
        ? (i / 2) * e * e * e * e * e + n
        : (i / 2) * ((e -= 2) * e * e * e * e + 2) + n;
    },
    easeInSine: function (t, e, n, i, o) {
      return -i * Math.cos((e / o) * (Math.PI / 2)) + i + n;
    },
    easeOutSine: function (t, e, n, i, o) {
      return i * Math.sin((e / o) * (Math.PI / 2)) + n;
    },
    easeInOutSine: function (t, e, n, i, o) {
      return (-i / 2) * (Math.cos((Math.PI * e) / o) - 1) + n;
    },
    easeInExpo: function (t, e, n, i, o) {
      return 0 == e ? n : i * Math.pow(2, 10 * (e / o - 1)) + n;
    },
    easeOutExpo: function (t, e, n, i, o) {
      return e == o ? n + i : i * (1 - Math.pow(2, (-10 * e) / o)) + n;
    },
    easeInOutExpo: function (t, e, n, i, o) {
      return 0 == e
        ? n
        : e == o
        ? n + i
        : (e /= o / 2) < 1
        ? (i / 2) * Math.pow(2, 10 * (e - 1)) + n
        : (i / 2) * (2 - Math.pow(2, -10 * --e)) + n;
    },
    easeInCirc: function (t, e, n, i, o) {
      return -i * (Math.sqrt(1 - (e /= o) * e) - 1) + n;
    },
    easeOutCirc: function (t, e, n, i, o) {
      return i * Math.sqrt(1 - (e = e / o - 1) * e) + n;
    },
    easeInOutCirc: function (t, e, n, i, o) {
      return (e /= o / 2) < 1
        ? (-i / 2) * (Math.sqrt(1 - e * e) - 1) + n
        : (i / 2) * (Math.sqrt(1 - (e -= 2) * e) + 1) + n;
    },
    easeInElastic: function (t, e, n, i, o) {
      var r = 1.70158,
        a = 0,
        s = i;
      if (0 == e) return n;
      if (1 == (e /= o)) return n + i;
      if ((a || (a = 0.3 * o), s < Math.abs(i))) {
        s = i;
        r = a / 4;
      } else r = (a / (2 * Math.PI)) * Math.asin(i / s);
      return (
        -s *
          Math.pow(2, 10 * (e -= 1)) *
          Math.sin(((e * o - r) * (2 * Math.PI)) / a) +
        n
      );
    },
    easeOutElastic: function (t, e, n, i, o) {
      var r = 1.70158,
        a = 0,
        s = i;
      if (0 == e) return n;
      if (1 == (e /= o)) return n + i;
      if ((a || (a = 0.3 * o), s < Math.abs(i))) {
        s = i;
        r = a / 4;
      } else r = (a / (2 * Math.PI)) * Math.asin(i / s);
      return (
        s * Math.pow(2, -10 * e) * Math.sin(((e * o - r) * (2 * Math.PI)) / a) +
        i +
        n
      );
    },
    easeInOutElastic: function (t, e, n, i, o) {
      var r = 1.70158,
        a = 0,
        s = i;
      if (0 == e) return n;
      if (2 == (e /= o / 2)) return n + i;
      if ((a || (a = o * (0.3 * 1.5)), s < Math.abs(i))) {
        s = i;
        r = a / 4;
      } else r = (a / (2 * Math.PI)) * Math.asin(i / s);
      return e < 1
        ? s *
            Math.pow(2, 10 * (e -= 1)) *
            Math.sin(((e * o - r) * (2 * Math.PI)) / a) *
            -0.5 +
            n
        : s *
            Math.pow(2, -10 * (e -= 1)) *
            Math.sin(((e * o - r) * (2 * Math.PI)) / a) *
            0.5 +
            i +
            n;
    },
    easeInBack: function (t, e, n, i, o, r) {
      return (
        r == undefined && (r = 1.70158),
        i * (e /= o) * e * ((r + 1) * e - r) + n
      );
    },
    easeOutBack: function (t, e, n, i, o, r) {
      return (
        r == undefined && (r = 1.70158),
        i * ((e = e / o - 1) * e * ((r + 1) * e + r) + 1) + n
      );
    },
    easeInOutBack: function (t, e, n, i, o, r) {
      return (
        r == undefined && (r = 1.70158),
        (e /= o / 2) < 1
          ? (i / 2) * (e * e * ((1 + (r *= 1.525)) * e - r)) + n
          : (i / 2) * ((e -= 2) * e * ((1 + (r *= 1.525)) * e + r) + 2) + n
      );
    },
    easeInBounce: function (t, e, n, i, o) {
      return i - jQuery.easing.easeOutBounce(t, o - e, 0, i, o) + n;
    },
    easeOutBounce: function (t, e, n, i, o) {
      return (e /= o) < 1 / 2.75
        ? i * (7.5625 * e * e) + n
        : e < 2 / 2.75
        ? i * (7.5625 * (e -= 1.5 / 2.75) * e + 0.75) + n
        : e < 2.5 / 2.75
        ? i * (7.5625 * (e -= 2.25 / 2.75) * e + 0.9375) + n
        : i * (7.5625 * (e -= 2.625 / 2.75) * e + 0.984375) + n;
    },
    easeInOutBounce: function (t, e, n, i, o) {
      return e < o / 2
        ? 0.5 * jQuery.easing.easeInBounce(t, 2 * e, 0, i, o) + n
        : 0.5 * jQuery.easing.easeOutBounce(t, 2 * e - o, 0, i, o) +
            0.5 * i +
            n;
    },
  }),
  (function (d, f, p, h) {
    (p.swipebox = function (t, e) {
      var n = { useCSS: !0, hideBarsDelay: 3e3 },
        i = this,
        o = p(t),
        r = (t = t).selector,
        a = p(r),
        s =
          f.createTouch !== h ||
          "ontouchstart" in d ||
          "onmsgesturechange" in d ||
          navigator.msMaxTouchPoints,
        l = !!d.SVGSVGElement,
        u =
          '<div id="swipebox-overlay">\t\t\t\t\t<div id="swipebox-slider"></div>\t\t\t\t\t<div id="swipebox-caption"></div>\t\t\t\t\t<div id="swipebox-action">\t\t\t\t\t\t<a id="swipebox-close"></a>\t\t\t\t\t\t<a id="swipebox-prev"></a>\t\t\t\t\t\t<a id="swipebox-next"></a>\t\t\t\t\t</div>\t\t\t</div>';
      (i.settings = {}),
        (i.init = function () {
          (i.settings = p.extend({}, n, e)),
            a.click(function (t) {
              t.preventDefault(),
                t.stopPropagation(),
                (index = o.index(p(this))),
                c.init(index);
            });
        });
      var c = {
        init: function (t) {
          this.build(),
            this.openSlide(t),
            this.openImg(t),
            this.preloadImg(t + 1),
            this.preloadImg(t - 1);
        },
        build: function () {
          var t = this;
          if (
            (p("body").append(u),
            t.doCssTrans() &&
              (p("#swipebox-slider").css({
                "-webkit-transition": "left 0.4s ease",
                "-moz-transition": "left 0.4s ease",
                "-o-transition": "left 0.4s ease",
                "-khtml-transition": "left 0.4s ease",
                transition: "left 0.4s ease",
              }),
              p("#swipebox-overlay").css({
                "-webkit-transition": "opacity 1s ease",
                "-moz-transition": "opacity 1s ease",
                "-o-transition": "opacity 1s ease",
                "-khtml-transition": "opacity 1s ease",
                transition: "opacity 1s ease",
              }),
              p("#swipebox-action, #swipebox-caption").css({
                "-webkit-transition": "0.5s",
                "-moz-transition": "0.5s",
                "-o-transition": "0.5s",
                "-khtml-transition": "0.5s",
                transition: "0.5s",
              })),
            l)
          ) {
            var e = p("#swipebox-action #swipebox-close").css(
              "background-image"
            );
            (e = e.replace("png", "svg")),
              p(
                "#swipebox-action #swipebox-prev,#swipebox-action #swipebox-next,#swipebox-action #swipebox-close"
              ).css({ "background-image": e });
          }
          o.each(function () {
            p("#swipebox-slider").append('<div class="slide"></div>');
          }),
            t.setDim(),
            t.actions(),
            t.keyboard(),
            t.gesture(),
            t.animBars(),
            p(d)
              .resize(function () {
                t.setDim();
              })
              .resize();
        },
        setDim: function () {
          var t = {
            width: p(d).width(),
            height: d.innerHeight ? d.innerHeight : p(d).height(),
          };
          p("#swipebox-overlay").css(t);
        },
        supportTransition: function () {
          for (
            var t = "transition WebkitTransition MozTransition OTransition msTransition KhtmlTransition".split(
                " "
              ),
              e = 0;
            e < t.length;
            e++
          )
            if (f.createElement("div").style[t[e]] !== h) return t[e];
          return !1;
        },
        doCssTrans: function () {
          if (i.settings.useCSS && this.supportTransition()) return !0;
        },
        gesture: function () {
          if (s) {
            var e = this,
              n = null,
              i = 10,
              o = {},
              r = {},
              a = p("#swipebox-caption, #swipebox-action");
            a.addClass("visible-bars"),
              e.setTimeout(),
              p("body")
                .bind("touchstart", function (t) {
                  return (
                    p(this).addClass("touching"),
                    (r = t.originalEvent.targetTouches[0]),
                    (o.pageX = t.originalEvent.targetTouches[0].pageX),
                    p(".touching").bind("touchmove", function (t) {
                      t.preventDefault(),
                        t.stopPropagation(),
                        (r = t.originalEvent.targetTouches[0]);
                    }),
                    !1
                  );
                })
                .bind("touchend", function (t) {
                  t.preventDefault(),
                    t.stopPropagation(),
                    (n = r.pageX - o.pageX),
                    i <= n
                      ? e.getPrev()
                      : n <= -i
                      ? e.getNext()
                      : a.hasClass("visible-bars")
                      ? (e.clearTimeout(), e.hideBars())
                      : (e.showBars(), e.setTimeout()),
                    p(".touching").off("touchmove").removeClass("touching");
                });
          }
        },
        setTimeout: function () {
          if (0 < i.settings.hideBarsDelay) {
            var t = this;
            t.clearTimeout(),
              (t.timeout = d.setTimeout(function () {
                t.hideBars();
              }, i.settings.hideBarsDelay));
          }
        },
        clearTimeout: function () {
          d.clearTimeout(this.timeout), (this.timeout = null);
        },
        showBars: function () {
          var t = p("#swipebox-caption, #swipebox-action");
          this.doCssTrans()
            ? t.addClass("visible-bars")
            : (p("#swipebox-caption").animate({ top: 0 }, 500),
              p("#swipebox-action").animate({ bottom: 0 }, 500),
              setTimeout(function () {
                t.addClass("visible-bars");
              }, 1e3));
        },
        hideBars: function () {
          var t = p("#swipebox-caption, #swipebox-action");
          this.doCssTrans()
            ? t.removeClass("visible-bars")
            : (p("#swipebox-caption").animate({ top: "-50px" }, 500),
              p("#swipebox-action").animate({ bottom: "-50px" }, 500),
              setTimeout(function () {
                t.removeClass("visible-bars");
              }, 1e3));
        },
        animBars: function () {
          var t = this,
            e = p("#swipebox-caption, #swipebox-action");
          s ||
            (e.addClass("visible-bars"),
            t.setTimeout(),
            p("#swipebox-slider").click(function () {
              e.hasClass("visible-bars") || (t.showBars(), t.setTimeout());
            }),
            p("#swipebox-action").hover(
              function () {
                t.showBars(),
                  e.addClass("force-visible-bars"),
                  t.clearTimeout();
              },
              function () {
                e.removeClass("force-visible-bars"), t.setTimeout();
              }
            ));
        },
        keyboard: function () {
          if (!s) {
            var e = this;
            p(d).bind("keyup", function (t) {
              t.preventDefault(),
                t.stopPropagation(),
                37 == t.keyCode
                  ? e.getPrev()
                  : 39 == t.keyCode
                  ? e.getNext()
                  : 27 == t.keyCode && e.closeSlide();
            });
          }
        },
        actions: function () {
          var e = this;
          o.length < 2
            ? p("#swipebox-prev, #swipebox-next").hide()
            : (p("#swipebox-prev").bind("click touchend", function (t) {
                t.preventDefault(),
                  t.stopPropagation(),
                  e.getPrev(),
                  e.setTimeout();
              }),
              p("#swipebox-next").bind("click touchend", function (t) {
                t.preventDefault(),
                  t.stopPropagation(),
                  e.getNext(),
                  e.setTimeout();
              })),
            p("#swipebox-close").bind("click touchstart", function () {
              e.closeSlide();
            });
        },
        setSlide: function (t) {
          var e = p("#swipebox-slider");
          this.doCssTrans()
            ? e.css({ left: 100 * -t + "%" })
            : e.animate({ left: 100 * -t + "%" }),
            p("#swipebox-slider .slide").removeClass("current"),
            p("#swipebox-slider .slide").eq(t).addClass("current"),
            this.setTitle(t),
            p("#swipebox-prev, #swipebox-next").removeClass("disabled"),
            0 == t
              ? p("#swipebox-prev").addClass("disabled")
              : t == o.length - 1 && p("#swipebox-next").addClass("disabled");
        },
        openSlide: function (t) {
          p("#swipebox-overlay")
            .show()
            .stop()
            .animate({ opacity: 1 }, "slow")
            .addClass("visible"),
            setTimeout(function () {
              p("body").addClass("swipebox-overflow-hidden");
            }, 1500),
            this.setSlide(t);
        },
        preloadImg: function (t) {
          var e = this;
          setTimeout(function () {
            e.openImg(t);
          }, 1e3);
        },
        openImg: function (t) {
          var e = this;
          if (t < 0 || t >= o.length) return !1;
          e.loadImg(o.eq(t).attr("href"), function () {
            p("#swipebox-slider .slide").eq(t).html(this);
          });
        },
        setTitle: function (t) {
          o.eq(t).attr("title") &&
            p("#swipebox-caption").empty().append(o.eq(t).attr("title"));
        },
        loadImg: function (t, e) {
          var n = p("<img>").on("load", function () {
            e.call(n);
          });
          n.attr("src", t);
        },
        getNext: function () {
          var t = this;
          (index = p("#swipebox-slider .slide").index(
            p("#swipebox-slider .slide.current")
          )),
            index + 1 < o.length
              ? (index++, t.setSlide(index), t.preloadImg(index + 1))
              : (p("#swipebox-slider").addClass("rightSpring"),
                setTimeout(function () {
                  p("#swipebox-slider").removeClass("rightSpring");
                }, 500));
        },
        getPrev: function () {
          var t = this;
          (index = p("#swipebox-slider .slide").index(
            p("#swipebox-slider .slide.current")
          )),
            0 < index
              ? (index--, t.setSlide(index), t.preloadImg(index - 1))
              : (p("#swipebox-slider").addClass("leftSpring"),
                setTimeout(function () {
                  p("#swipebox-slider").removeClass("leftSpring");
                }, 500));
        },
        closeSlide: function () {
          var t = this;
          p("body").removeClass("swipebox-overflow-hidden"),
            p("#swipebox-overlay").animate({ opacity: 0 }, "fast"),
            setTimeout(function () {
              p("#swipebox-overlay").removeClass("visible"), t.destroy();
            }, 1e3);
        },
        destroy: function () {
          p(d).unbind("keyup"),
            p(d).unbind("resize"),
            p("body").unbind(),
            p("#swipebox-slider").unbind(),
            p("#swipebox-overlay").remove(),
            o.removeData("_swipebox");
        },
      };
      i.init();
    }),
      (p.fn.swipebox = function (t) {
        if (!p.data(this, "_swipebox")) {
          var e = new p.swipebox(this, t);
          this.data("_swipebox", e);
        }
      });
  })(window, document, jQuery),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(["jquery"], e)
      : "object" == typeof exports
      ? (module.exports = e(require("jquery")))
      : (t.lightbox = e(t.jQuery));
  })(this, function (d) {
    function e(t) {
      (this.album = []),
        (this.currentImageIndex = void 0),
        this.init(),
        (this.options = d.extend({}, this.constructor.defaults)),
        this.option(t);
    }
    return (
      (e.defaults = {
        albumLabel: "Image %1 of %2",
        alwaysShowNavOnTouchDevices: !1,
        fadeDuration: 600,
        fitImagesInViewport: !0,
        imageFadeDuration: 600,
        positionFromTop: 50,
        resizeDuration: 700,
        showImageNumberLabel: !0,
        wrapAround: !1,
        disableScrolling: !1,
        sanitizeTitle: !1,
      }),
      (e.prototype.option = function (t) {
        d.extend(this.options, t);
      }),
      (e.prototype.imageCountLabel = function (t, e) {
        return this.options.albumLabel.replace(/%1/g, t).replace(/%2/g, e);
      }),
      (e.prototype.init = function () {
        var t = this;
        d(document).ready(function () {
          t.enable(), t.build();
        });
      }),
      (e.prototype.enable = function () {
        var e = this;
        d("body").on(
          "click",
          "a[rel^=lightbox], area[rel^=lightbox], a[data-lightbox], area[data-lightbox]",
          function (t) {
            return e.start(d(t.currentTarget)), !1;
          }
        );
      }),
      (e.prototype.build = function () {
        var e = this;
        d(
          '<div id="lightboxOverlay" class="lightboxOverlay"></div><div id="lightbox" class="lightbox"><div class="lb-outerContainer"><div class="lb-container"><img class="lb-image" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" /><div class="lb-nav"><a class="lb-prev" href="" ></a><a class="lb-next" href="" ></a></div><div class="lb-loader"><a class="lb-cancel"></a></div></div></div><div class="lb-dataContainer"><div class="lb-data"><div class="lb-details"><span class="lb-caption"></span><span class="lb-number"></span></div><div class="lb-closeContainer"><a class="lb-close"></a></div></div></div></div>'
        ).appendTo(d("body")),
          (this.$lightbox = d("#lightbox")),
          (this.$overlay = d("#lightboxOverlay")),
          (this.$outerContainer = this.$lightbox.find(".lb-outerContainer")),
          (this.$container = this.$lightbox.find(".lb-container")),
          (this.$image = this.$lightbox.find(".lb-image")),
          (this.$nav = this.$lightbox.find(".lb-nav")),
          (this.containerPadding = {
            top: parseInt(this.$container.css("padding-top"), 10),
            right: parseInt(this.$container.css("padding-right"), 10),
            bottom: parseInt(this.$container.css("padding-bottom"), 10),
            left: parseInt(this.$container.css("padding-left"), 10),
          }),
          (this.imageBorderWidth = {
            top: parseInt(this.$image.css("border-top-width"), 10),
            right: parseInt(this.$image.css("border-right-width"), 10),
            bottom: parseInt(this.$image.css("border-bottom-width"), 10),
            left: parseInt(this.$image.css("border-left-width"), 10),
          }),
          this.$overlay.hide().on("click", function () {
            return e.end(), !1;
          }),
          this.$lightbox.hide().on("click", function (t) {
            return "lightbox" === d(t.target).attr("id") && e.end(), !1;
          }),
          this.$outerContainer.on("click", function (t) {
            return "lightbox" === d(t.target).attr("id") && e.end(), !1;
          }),
          this.$lightbox.find(".lb-prev").on("click", function () {
            return (
              0 === e.currentImageIndex
                ? e.changeImage(e.album.length - 1)
                : e.changeImage(e.currentImageIndex - 1),
              !1
            );
          }),
          this.$lightbox.find(".lb-next").on("click", function () {
            return (
              e.currentImageIndex === e.album.length - 1
                ? e.changeImage(0)
                : e.changeImage(e.currentImageIndex + 1),
              !1
            );
          }),
          this.$nav.on("mousedown", function (t) {
            3 === t.which &&
              (e.$nav.css("pointer-events", "none"),
              e.$lightbox.one("contextmenu", function () {
                setTimeout(
                  function () {
                    this.$nav.css("pointer-events", "auto");
                  }.bind(e),
                  0
                );
              }));
          }),
          this.$lightbox.find(".lb-loader, .lb-close").on("click", function () {
            return e.end(), !1;
          });
      }),
      (e.prototype.start = function (t) {
        function e(t) {
          n.album.push({
            link: t.attr("href"),
            title: t.attr("data-title") || t.attr("title"),
          });
        }
        var n = this,
          i = d(window);
        i.on("resize", d.proxy(this.sizeOverlay, this)),
          d("select, object, embed").css({ visibility: "hidden" }),
          this.sizeOverlay(),
          (this.album = []);
        var o,
          r = 0,
          a = t.attr("data-lightbox");
        if (a) {
          o = d(t.prop("tagName") + '[data-lightbox="' + a + '"]');
          for (var s = 0; s < o.length; s = ++s)
            e(d(o[s])), o[s] === t[0] && (r = s);
        } else if ("lightbox" === t.attr("rel")) e(t);
        else {
          o = d(t.prop("tagName") + '[rel="' + t.attr("rel") + '"]');
          for (var l = 0; l < o.length; l = ++l)
            e(d(o[l])), o[l] === t[0] && (r = l);
        }
        var u = i.scrollTop() + this.options.positionFromTop,
          c = i.scrollLeft();
        this.$lightbox
          .css({ top: u + "px", left: c + "px" })
          .fadeIn(this.options.fadeDuration),
          this.options.disableScrolling &&
            d("body").addClass("lb-disable-scrolling"),
          this.changeImage(r);
      }),
      (e.prototype.changeImage = function (a) {
        var s = this;
        this.disableKeyboardNav();
        var l = this.$lightbox.find(".lb-image");
        this.$overlay.fadeIn(this.options.fadeDuration),
          d(".lb-loader").fadeIn("slow"),
          this.$lightbox
            .find(
              ".lb-image, .lb-nav, .lb-prev, .lb-next, .lb-dataContainer, .lb-numbers, .lb-caption"
            )
            .hide(),
          this.$outerContainer.addClass("animating");
        var u = new Image();
        (u.onload = function () {
          var t, e, n, i, o, r;
          l.attr("src", s.album[a].link),
            d(u),
            l.width(u.width),
            l.height(u.height),
            s.options.fitImagesInViewport &&
              ((r = d(window).width()),
              (o = d(window).height()),
              (i =
                r -
                s.containerPadding.left -
                s.containerPadding.right -
                s.imageBorderWidth.left -
                s.imageBorderWidth.right -
                20),
              (n =
                o -
                s.containerPadding.top -
                s.containerPadding.bottom -
                s.imageBorderWidth.top -
                s.imageBorderWidth.bottom -
                120),
              s.options.maxWidth &&
                s.options.maxWidth < i &&
                (i = s.options.maxWidth),
              s.options.maxHeight &&
                s.options.maxHeight < i &&
                (n = s.options.maxHeight),
              (u.width > i || u.height > n) &&
                (u.width / i > u.height / n
                  ? ((e = i), (t = parseInt(u.height / (u.width / e), 10)))
                  : ((t = n), (e = parseInt(u.width / (u.height / t), 10))),
                l.width(e),
                l.height(t))),
            s.sizeContainer(l.width(), l.height());
        }),
          (u.src = this.album[a].link),
          (this.currentImageIndex = a);
      }),
      (e.prototype.sizeOverlay = function () {
        this.$overlay.width(d(document).width()).height(d(document).height());
      }),
      (e.prototype.sizeContainer = function (t, e) {
        function n() {
          i.$lightbox.find(".lb-dataContainer").width(a),
            i.$lightbox.find(".lb-prevLink").height(s),
            i.$lightbox.find(".lb-nextLink").height(s),
            i.showImage();
        }
        var i = this,
          o = this.$outerContainer.outerWidth(),
          r = this.$outerContainer.outerHeight(),
          a =
            t +
            this.containerPadding.left +
            this.containerPadding.right +
            this.imageBorderWidth.left +
            this.imageBorderWidth.right,
          s =
            e +
            this.containerPadding.top +
            this.containerPadding.bottom +
            this.imageBorderWidth.top +
            this.imageBorderWidth.bottom;
        o !== a || r !== s
          ? this.$outerContainer.animate(
              { width: a, height: s },
              this.options.resizeDuration,
              "swing",
              function () {
                n();
              }
            )
          : n();
      }),
      (e.prototype.showImage = function () {
        this.$lightbox.find(".lb-loader").stop(!0).hide(),
          this.$lightbox
            .find(".lb-image")
            .fadeIn(this.options.imageFadeDuration),
          this.updateNav(),
          this.updateDetails(),
          this.preloadNeighboringImages(),
          this.enableKeyboardNav();
      }),
      (e.prototype.updateNav = function () {
        var t = !1;
        try {
          document.createEvent("TouchEvent"),
            (t = !!this.options.alwaysShowNavOnTouchDevices);
        } catch (e) {}
        this.$lightbox.find(".lb-nav").show(),
          1 < this.album.length &&
            (this.options.wrapAround
              ? (t &&
                  this.$lightbox.find(".lb-prev, .lb-next").css("opacity", "1"),
                this.$lightbox.find(".lb-prev, .lb-next").show())
              : (0 < this.currentImageIndex &&
                  (this.$lightbox.find(".lb-prev").show(),
                  t && this.$lightbox.find(".lb-prev").css("opacity", "1")),
                this.currentImageIndex < this.album.length - 1 &&
                  (this.$lightbox.find(".lb-next").show(),
                  t && this.$lightbox.find(".lb-next").css("opacity", "1"))));
      }),
      (e.prototype.updateDetails = function () {
        var t = this;
        if (
          "undefined" != typeof this.album[this.currentImageIndex].title &&
          "" !== this.album[this.currentImageIndex].title
        ) {
          var e = this.$lightbox.find(".lb-caption");
          this.options.sanitizeTitle
            ? e.text(this.album[this.currentImageIndex].title)
            : e.html(this.album[this.currentImageIndex].title),
            e
              .fadeIn("fast")
              .find("a")
              .on("click", function () {
                void 0 !== d(this).attr("target")
                  ? window.open(d(this).attr("href"), d(this).attr("target"))
                  : (location.href = d(this).attr("href"));
              });
        }
        if (1 < this.album.length && this.options.showImageNumberLabel) {
          var n = this.imageCountLabel(
            this.currentImageIndex + 1,
            this.album.length
          );
          this.$lightbox.find(".lb-number").text(n).fadeIn("fast");
        } else this.$lightbox.find(".lb-number").hide();
        this.$outerContainer.removeClass("animating"),
          this.$lightbox
            .find(".lb-dataContainer")
            .fadeIn(this.options.resizeDuration, function () {
              return t.sizeOverlay();
            });
      }),
      (e.prototype.preloadNeighboringImages = function () {
        this.album.length > this.currentImageIndex + 1 &&
          (new Image().src = this.album[this.currentImageIndex + 1].link);
        0 < this.currentImageIndex &&
          (new Image().src = this.album[this.currentImageIndex - 1].link);
      }),
      (e.prototype.enableKeyboardNav = function () {
        d(document).on("keyup.keyboard", d.proxy(this.keyboardAction, this));
      }),
      (e.prototype.disableKeyboardNav = function () {
        d(document).off(".keyboard");
      }),
      (e.prototype.keyboardAction = function (t) {
        var e = 27,
          n = 37,
          i = 39,
          o = t.keyCode,
          r = String.fromCharCode(o).toLowerCase();
        o === e || r.match(/x|o|c/)
          ? this.end()
          : "p" === r || o === n
          ? 0 !== this.currentImageIndex
            ? this.changeImage(this.currentImageIndex - 1)
            : this.options.wrapAround &&
              1 < this.album.length &&
              this.changeImage(this.album.length - 1)
          : ("n" === r || o === i) &&
            (this.currentImageIndex !== this.album.length - 1
              ? this.changeImage(this.currentImageIndex + 1)
              : this.options.wrapAround &&
                1 < this.album.length &&
                this.changeImage(0));
      }),
      (e.prototype.end = function () {
        this.disableKeyboardNav(),
          d(window).off("resize", this.sizeOverlay),
          this.$lightbox.fadeOut(this.options.fadeDuration),
          this.$overlay.fadeOut(this.options.fadeDuration),
          d("select, object, embed").css({ visibility: "visible" }),
          this.options.disableScrolling &&
            d("body").removeClass("lb-disable-scrolling");
      }),
      new e()
    );
  }),
  (function (r) {
    r.fn.UItoTop = function (t) {
      var e = {
          text: "",
          min: 200,
          inDelay: 600,
          outDelay: 400,
          containerID: "toTop",
          containerHoverID: "toTopHover",
          scrollSpeed: 1e3,
          easingType: "linear",
        },
        n = r.extend(e, t),
        i = "#" + n.containerID,
        o = "#" + n.containerHoverID;
      r("body").append(
        '<a href="#" id="' + n.containerID + '">' + n.text + "</a>"
      ),
        r(i)
          .hide()
          .on("click.UItoTop", function () {
            return (
              r("html, body").animate(
                { scrollTop: 0 },
                n.scrollSpeed,
                n.easingType
              ),
              r("#" + n.containerHoverID, this)
                .stop()
                .animate({ opacity: 0 }, n.inDelay, n.easingType),
              !1
            );
          })
          .prepend('<span id="' + n.containerHoverID + '"></span>')
          .hover(
            function () {
              r(o, this).stop().animate({ opacity: 1 }, 600, "linear");
            },
            function () {
              r(o, this).stop().animate({ opacity: 0 }, 700, "linear");
            }
          ),
        r(window).scroll(function () {
          var t = r(window).scrollTop();
          "undefined" == typeof document.body.style.maxHeight &&
            r(i).css({
              position: "absolute",
              top: t + r(window).height() - 50,
            }),
            t > n.min ? r(i).fadeIn(n.inDelay) : r(i).fadeOut(n.Outdelay);
        });
    };
  })(jQuery),
  jQuery(document).ready(function (e) {
    e().UItoTop({ easingType: "easeOutQuart" }),
      e(".scroll, .navbar li a, .footer li a").click(function () {
        e("html,body").animate({ scrollTop: e(this.hash).offset().top }, 1e3);
      }),
      lightbox.option({ albumLabel: "%1 \u0438\u0437 %2" }),
      e("#cme-container a.callme_viewform").click(function () {
        return (
          e("#cme-container .cme-form-main-container").css({ display: "flex" }),
          e("#cme-container #cme-btn").css({ display: "none" }),
          e('[type="submit"]', this).show(),
          !1
        );
      }),
      e("#cme-container .cme-form-main-container").click(function (t) {
        t.target == this &&
          ((this.style.display = "none"),
          e("#cme-container #cme-btn").css({ display: "block" }));
      }),
      e("#cme-container a#callme-close").click(function () {
        return (
          e("#cme-container .cme-form-main-container").css({ display: "none" }),
          e("#cme-container #cme-btn").css({ display: "block" }),
          !1
        );
      }),
      (window.submitCallmeForm = function () {
        var t = e("#cme-container form");
        return (
          e('[type="submit"]', t).hide(),
          e(".callme-result").text(
            "\u041e\u0442\u043f\u0440\u0430\u0432\u043a\u0430..."
          ),
          e.ajax({
            url: t.attr("action"),
            data: e.param(e("form").serializeArray()),
            method: "post",
            dataType: "json",
            success: function (t) {
              e(".callme-result").text(t.result);
            },
            error: function () {
              e(".callme-result").text(
                "\u041e\u0448\u0438\u0431\u043a\u0430. \u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u043f\u043e\u0437\u0434\u043d\u0435\u0435."
              );
            },
          }),
          !1
        );
      }),
      e(document).on("submit", "#cme-container form", submitCallmeForm);
  });
