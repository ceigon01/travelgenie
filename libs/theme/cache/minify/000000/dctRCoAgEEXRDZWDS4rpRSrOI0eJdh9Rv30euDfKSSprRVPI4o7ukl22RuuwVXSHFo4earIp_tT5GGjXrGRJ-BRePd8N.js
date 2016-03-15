jQuery(function (a) {
    if ("undefined" == typeof wc_checkout_params)return !1;
    a.blockUI.defaults.overlayCSS.cursor = "default";
    var b = {
        updateTimer: !1,
        dirtyInput: !1,
        xhr: !1,
        $order_review: a("#order_review"),
        $checkout_form: a("form.checkout"),
        init: function () {
            a("body").bind("update_checkout", this.reset_update_checkout_timer), a("body").bind("update_checkout", this.update_checkout), a("body").bind("init_checkout", this.init_checkout), this.$order_review.on("click", ".payment_methods input.input-radio", this.payment_method_selected), this.$checkout_form.on("submit", this.submit), this.$checkout_form.on("blur input change", ".input-text, select", this.validate_field), this.$checkout_form.on("input change", "select.shipping_method, input[name^=shipping_method], #ship-to-different-address input, .update_totals_on_change select, .update_totals_on_change input[type=radio]", this.trigger_update_checkout), this.$checkout_form.on("change", ".address-field input.input-text, .update_totals_on_change input.input-text", this.maybe_input_changed), this.$checkout_form.on("input change", ".address-field select", this.input_changed), this.$checkout_form.on("input keydown", ".address-field input.input-text, .update_totals_on_change input.input-text", this.queue_update_checkout), this.$checkout_form.on("change", "#ship-to-different-address input", this.ship_to_different_address), this.$order_review.find("input[name=payment_method]:checked").triggerHandler("click"), this.$checkout_form.find("#ship-to-different-address input").change(), "1" === wc_checkout_params.is_checkout && a("body").trigger("init_checkout"), "yes" === wc_checkout_params.option_guest_checkout && a("input#createaccount").change(this.toggle_create_account).change()
        },
        toggle_create_account: function () {
            a("div.create-account").hide(), a(this).is(":checked") && a("div.create-account").slideDown()
        },
        init_checkout: function () {
            a("#billing_country, #shipping_country, .country_to_state").change(), a("body").trigger("update_checkout")
        },
        maybe_input_changed: function () {
            b.dirtyInput && b.input_changed()
        },
        input_changed: function () {
            b.dirtyInput = this, b.maybe_update_checkout()
        },
        queue_update_checkout: function (a) {
            var c = a.keyCode || a.which || 0;
            return 9 === c ? !0 : (b.dirtyInput = this, b.reset_update_checkout_timer(), void(b.updateTimer = setTimeout(b.maybe_update_checkout, "1000")))
        },
        trigger_update_checkout: function () {
            b.reset_update_checkout_timer(), b.dirtyInput = !1, a("body").trigger("update_checkout")
        },
        maybe_update_checkout: function () {
            var c = !0;
            a(b.dirtyInput).size() && ($required_inputs = a(b.dirtyInput).closest("div").find(".address-field.validate-required"), $required_inputs.size() && $required_inputs.each(function () {
                "" === a(this).find("input.input-text").val() && (c = !1)
            })), c && b.trigger_update_checkout()
        },
        ship_to_different_address: function () {
            a("div.shipping_address").hide(), a(this).is(":checked") && a("div.shipping_address").slideDown()
        },
        payment_method_selected: function () {
            if (a(".payment_methods input.input-radio").length > 1) {
                var b = a("div.payment_box." + a(this).attr("ID"));
                a(this).is(":checked") && !b.is(":visible") && (a("div.payment_box").filter(":visible").slideUp(250), a(this).is(":checked") && a("div.payment_box." + a(this).attr("ID")).slideDown(250))
            } else a("div.payment_box").show();
            a("#place_order").val(a(this).data("order_button_text") ? a(this).data("order_button_text") : a("#place_order").data("value"))
        },
        reset_update_checkout_timer: function () {
            clearTimeout(b.updateTimer)
        },
        validate_field: function () {
            var b = a(this), c = b.closest(".form-row"), d = !0;
            if (c.is(".validate-required") && "" === b.val() && (c.removeClass("woocommerce-validated").addClass("woocommerce-invalid woocommerce-invalid-required-field"), d = !1), c.is(".validate-email") && b.val()) {
                var e = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
                e.test(b.val()) || (c.removeClass("woocommerce-validated").addClass("woocommerce-invalid woocommerce-invalid-email"), d = !1)
            }
            d && c.removeClass("woocommerce-invalid woocommerce-invalid-required-field").addClass("woocommerce-validated")
        },
        update_checkout: function () {
            b.xhr && b.xhr.abort();
            var c = [];
            a("select.shipping_method, input[name^=shipping_method][type=radio]:checked, input[name^=shipping_method][type=hidden]").each(function () {
                c[a(this).data("index")] = a(this).val()
            });
            var d, e, f, g, h, i, j = a("#order_review input[name=payment_method]:checked").val(), k = a("#billing_country").val(), l = a("#billing_state").val(), m = a("input#billing_postcode").val(), n = a("#billing_city").val(), o = a("input#billing_address_1").val(), p = a("input#billing_address_2").val();
            a("#ship-to-different-address input").is(":checked") ? (d = a("#shipping_country").val(), e = a("#shipping_state").val(), f = a("input#shipping_postcode").val(), g = a("#shipping_city").val(), h = a("input#shipping_address_1").val(), i = a("input#shipping_address_2").val()) : (d = k, e = l, f = m, g = n, h = o, i = p), a(".woocommerce-checkout-payment, .woocommerce-checkout-review-order-table").block({
                message: null,
                overlayCSS: {background: "#fff", opacity: .6}
            });
            var q = {
                action: "woocommerce_update_order_review",
                security: wc_checkout_params.update_order_review_nonce,
                shipping_method: c,
                payment_method: j,
                country: k,
                state: l,
                postcode: m,
                city: n,
                address: o,
                address_2: p,
                s_country: d,
                s_state: e,
                s_postcode: f,
                s_city: g,
                s_address: h,
                s_address_2: i,
                post_data: a("form.checkout").serialize()
            };
            b.xhr = a.ajax({
                type: "POST", url: wc_checkout_params.ajax_url, data: q, success: function (b) {
                    if (b && b.fragments && a.each(b.fragments, function (b, c) {
                            a(b).replaceWith(c), a(b).unblock()
                        }), "failure" == b.result) {
                        var c = a("form.checkout");
                        if ("true" === b.reload)return void window.location.reload();
                        a(".woocommerce-error, .woocommerce-message").remove(), c.prepend(b.messages ? b.messages : b), c.find(".input-text, select").blur(), a("html, body").animate({scrollTop: a("form.checkout").offset().top - 100}, 1e3)
                    }
                    a(".woocommerce-checkout").find("input[name=payment_method]:checked").triggerHandler("click"), a("body").trigger("updated_checkout")
                }
            })
        },
        submit: function () {
            b.reset_update_checkout_timer();
            var c = a(this);
            if (c.is(".processing"))return !1;
            if (c.triggerHandler("checkout_place_order") !== !1 && c.triggerHandler("checkout_place_order_" + a("#order_review input[name=payment_method]:checked").val()) !== !1) {
                c.addClass("processing");
                var d = c.data();
                1 != d["blockUI.isBlocked"] && c.block({
                    message: null,
                    overlayCSS: {background: "#fff", opacity: .6}
                }), a.ajax({
                    type: "POST",
                    url: wc_checkout_params.checkout_url,
                    data: c.serialize(),
                    success: function (b) {
                        var d = "";
                        try {
                            if (b.indexOf("<!--WC_START-->") >= 0 && (b = b.split("<!--WC_START-->")[1]), b.indexOf("<!--WC_END-->") >= 0 && (b = b.split("<!--WC_END-->")[0]), d = a.parseJSON(b), "success" !== d.result)throw"failure" === d.result ? "Result failure" : "Invalid response";
                            window.location = -1 != d.redirect.indexOf("https://") || -1 != d.redirect.indexOf("http://") ? d.redirect : decodeURI(d.redirect)
                        } catch (e) {
                            if ("true" === d.reload)return void window.location.reload();
                            a(".woocommerce-error, .woocommerce-message").remove(), c.prepend(d.messages ? d.messages : b), c.removeClass("processing").unblock(), c.find(".input-text, select").blur(), a("html, body").animate({scrollTop: a("form.checkout").offset().top - 100}, 1e3), "true" === d.refresh && a("body").trigger("update_checkout"), a("body").trigger("checkout_error")
                        }
                    },
                    dataType: "html"
                })
            }
            return !1
        }
    }, c = {
        init: function () {
            a("body").on("click", "a.showcoupon", this.show_coupon_form), a("body").on("click", ".woocommerce-remove-coupon", this.remove_coupon), a("form.checkout_coupon").hide().submit(this.submit)
        }, show_coupon_form: function () {
            return a(".checkout_coupon").slideToggle(400, function () {
                a(".checkout_coupon").find(":input:eq(0)").focus()
            }), !1
        }, submit: function () {
            var b = a(this);
            if (b.is(".processing"))return !1;
            b.addClass("processing").block({message: null, overlayCSS: {background: "#fff", opacity: .6}});
            var c = {
                action: "woocommerce_apply_coupon",
                security: wc_checkout_params.apply_coupon_nonce,
                coupon_code: b.find("input[name=coupon_code]").val()
            };
            return a.ajax({
                type: "POST", url: wc_checkout_params.ajax_url, data: c, success: function (c) {
                    a(".woocommerce-error, .woocommerce-message").remove(), b.removeClass("processing").unblock(), c && (b.before(c), b.slideUp(), a("body").trigger("update_checkout"))
                }, dataType: "html"
            }), !1
        }, remove_coupon: function (b) {
            b.preventDefault();
            var c = a(this).parents(".woocommerce-checkout-review-order"), d = a(this).data("coupon");
            c.addClass("processing").block({message: null, overlayCSS: {background: "#fff", opacity: .6}});
            var e = {action: "woocommerce_remove_coupon", security: wc_checkout_params.remove_coupon_nonce, coupon: d};
            a.ajax({
                type: "POST", url: wc_checkout_params.ajax_url, data: e, success: function (b) {
                    a(".woocommerce-error, .woocommerce-message").remove(), c.removeClass("processing").unblock(), b && (a("form.woocommerce-checkout").before(b), a("body").trigger("update_checkout"), a("form.checkout_coupon").find('input[name="coupon_code"]').val(""))
                }, error: function (a) {
                    wc_checkout_params.debug_mode && console.log(a.responseText)
                }, dataType: "html"
            })
        }
    }, d = {
        init: function () {
            a("body").on("click", "a.showlogin", this.show_login_form)
        }, show_login_form: function () {
            return a("form.login").slideToggle(), !1
        }
    };
    b.init(), c.init(), d.init()
});
;
/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
!function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == typeof exports ? require("jquery") : jQuery)
}(function (a) {
    function b(a) {
        return h.raw ? a : encodeURIComponent(a)
    }

    function c(a) {
        return h.raw ? a : decodeURIComponent(a)
    }

    function d(a) {
        return b(h.json ? JSON.stringify(a) : String(a))
    }

    function e(a) {
        0 === a.indexOf('"') && (a = a.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
        try {
            return a = decodeURIComponent(a.replace(g, " ")), h.json ? JSON.parse(a) : a
        } catch (b) {
        }
    }

    function f(b, c) {
        var d = h.raw ? b : e(b);
        return a.isFunction(c) ? c(d) : d
    }

    var g = /\+/g, h = a.cookie = function (e, g, i) {
        if (void 0 !== g && !a.isFunction(g)) {
            if (i = a.extend({}, h.defaults, i), "number" == typeof i.expires) {
                var j = i.expires, k = i.expires = new Date;
                k.setTime(+k + 864e5 * j)
            }
            return document.cookie = [b(e), "=", d(g), i.expires ? "; expires=" + i.expires.toUTCString() : "", i.path ? "; path=" + i.path : "", i.domain ? "; domain=" + i.domain : "", i.secure ? "; secure" : ""].join("")
        }
        for (var l = e ? void 0 : {}, m = document.cookie ? document.cookie.split("; ") : [], n = 0, o = m.length; o > n; n++) {
            var p = m[n].split("="), q = c(p.shift()), r = p.join("=");
            if (e && e === q) {
                l = f(r, g);
                break
            }
            e || void 0 === (r = f(r)) || (l[q] = r)
        }
        return l
    };
    h.defaults = {}, a.removeCookie = function (b, c) {
        return void 0 === a.cookie(b) ? !1 : (a.cookie(b, "", a.extend({}, c, {expires: -1})), !a.cookie(b))
    }
});