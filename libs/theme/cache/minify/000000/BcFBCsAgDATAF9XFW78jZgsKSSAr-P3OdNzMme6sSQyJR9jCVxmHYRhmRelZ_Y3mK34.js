jQuery(function (a) {
    if ("undefined" == typeof wc_address_i18n_params)return !1;
    var b = wc_address_i18n_params.locale.replace(/&quot;/g, '"'), c = a.parseJSON(b), d = ' <abbr class="required" title="' + wc_address_i18n_params.i18n_required_text + '">*</abbr>';
    a("body").bind("country_to_state_changing", function (b, e, f) {
        var g, h = f;
        g = "undefined" != typeof c[e] ? c[e] : c["default"];
        var i = a.parseJSON(wc_address_i18n_params.locale_fields);
        a.each(i, function (a, b) {
            var e = h.find(b);
            g[a] ? (g[a].label && e.find("label").html(g[a].label), g[a].placeholder && e.find("input").attr("placeholder", g[a].placeholder), e.find("label abbr").remove(), "undefined" == typeof g[a].required && c["default"][a].required === !0 ? e.find("label").append(d) : g[a].required === !0 && e.find("label").append(d), "state" !== a && (g[a].hidden === !0 ? e.hide().find("input").val("") : e.show())) : c["default"][a] && (c["default"][a].required === !0 && 0 === e.find("label abbr").size() && e.find("label").append(d), "state" !== a && ("undefined" == typeof c["default"][a].hidden || c["default"][a].hidden === !1 ? e.show() : c["default"][a].hidden === !0 && e.hide().find("input").val("")))
        });
        var j = h.find("#billing_postcode_field, #shipping_postcode_field"), k = h.find("#billing_city_field, #shipping_city_field"), l = h.find("#billing_state_field, #shipping_state_field");
        j.attr("data-o_class") || (j.attr("data-o_class", j.attr("class")), k.attr("data-o_class", k.attr("class")), l.attr("data-o_class", l.attr("class"))), g.postcode_before_city ? (j.add(k).add(l).removeClass("form-row-first form-row-last").addClass("form-row-wide"), j.insertBefore(k)) : (j.attr("class", j.attr("data-o_class")), k.attr("class", k.attr("data-o_class")), l.attr("class", l.attr("data-o_class")), j.insertAfter(l))
    })
});