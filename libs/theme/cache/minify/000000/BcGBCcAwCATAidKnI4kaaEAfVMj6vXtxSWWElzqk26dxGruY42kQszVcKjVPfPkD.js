jQuery(function (a) {
    return "undefined" == typeof wc_add_to_cart_params ? !1 : void a(document).on("click", ".add_to_cart_button", function () {
        var b = a(this);
        if (b.is(".product_type_simple")) {
            if (!b.attr("data-product_id"))return !0;
            b.removeClass("added"), b.addClass("loading");
            var c = {action: "woocommerce_add_to_cart"};
            return a.each(b.data(), function (a, b) {
                c[a] = b
            }), a("body").trigger("adding_to_cart", [b, c]), a.post(wc_add_to_cart_params.ajax_url, c, function (c) {
                if (c) {
                    var d = window.location.toString();
                    return d = d.replace("add-to-cart", "added-to-cart"), c.error && c.product_url ? void(window.location = c.product_url) : "yes" === wc_add_to_cart_params.cart_redirect_after_add ? void(window.location = wc_add_to_cart_params.cart_url) : (b.removeClass("loading"), fragments = c.fragments, cart_hash = c.cart_hash, fragments && a.each(fragments, function (b) {
                        a(b).addClass("updating")
                    }), a(".shop_table.cart, .updating, .cart_totals").fadeTo("400", "0.6").block({
                        message: null,
                        overlayCSS: {opacity: .6}
                    }), b.addClass("added"), wc_add_to_cart_params.is_cart || 0 !== b.parent().find(".added_to_cart").size() || b.after(' <a href="' + wc_add_to_cart_params.cart_url + '" class="added_to_cart wc-forward" title="' + wc_add_to_cart_params.i18n_view_cart + '">' + wc_add_to_cart_params.i18n_view_cart + "</a>"), fragments && a.each(fragments, function (b, c) {
                        a(b).replaceWith(c)
                    }), a(".widget_shopping_cart, .updating").stop(!0).css("opacity", "1").unblock(), a(".shop_table.cart").load(d + " .shop_table.cart:eq(0) > *", function () {
                        a(".shop_table.cart").stop(!0).css("opacity", "1").unblock(), a("body").trigger("cart_page_refreshed")
                    }), a(".cart_totals").load(d + " .cart_totals:eq(0) > *", function () {
                        a(".cart_totals").stop(!0).css("opacity", "1").unblock()
                    }), a("body").trigger("added_to_cart", [fragments, cart_hash]), void 0)
                }
            }), !1
        }
        return !0
    })
});