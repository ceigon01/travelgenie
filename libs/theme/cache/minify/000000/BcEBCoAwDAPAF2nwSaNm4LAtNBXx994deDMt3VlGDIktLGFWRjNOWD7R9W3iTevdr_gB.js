jQuery(function (a) {
    function b() {
        var a = {
            formatMatches: function (a) {
                return 1 === a ? wc_select_params.i18n_matches_1 : wc_select_params.i18n_matches_n.replace("%qty%", a)
            }, formatNoMatches: function () {
                return wc_select_params.i18n_no_matches
            }, formatAjaxError: function () {
                return wc_select_params.i18n_ajax_error
            }, formatInputTooShort: function (a, b) {
                var c = b - a.length;
                return 1 === c ? wc_select_params.i18n_input_too_short_1 : wc_select_params.i18n_input_too_short_n.replace("%qty%", c)
            }, formatInputTooLong: function (a, b) {
                var c = a.length - b;
                return 1 === c ? wc_select_params.i18n_input_too_long_1 : wc_select_params.i18n_input_too_long_n.replace("%qty%", c)
            }, formatSelectionTooBig: function (a) {
                return 1 === a ? wc_select_params.i18n_selection_too_long_1 : wc_select_params.i18n_selection_too_long_n.replace("%qty%", number)
            }, formatLoadMore: function () {
                return wc_select_params.i18n_load_more
            }, formatSearching: function () {
                return wc_select_params.i18n_searching
            }
        };
        return a
    }

    if ("undefined" == typeof wc_country_select_params)return !1;
    if (a().select2) {
        var c = function () {
            a("select.country_select:visible, select.state_select:visible").each(function () {
                var c = a.extend({
                    minimumResultsForSearch: 10,
                    placeholder: a(this).attr("placeholder"),
                    placeholderOption: "first",
                    width: "100%"
                }, b());
                a(this).select2(c)
            })
        };
        c(), a("body").bind("country_to_state_changed", function () {
            c()
        })
    }
    var d = wc_country_select_params.countries.replace(/&quot;/g, '"'), e = a.parseJSON(d);
    a("body").on("change", "select.country_to_state, input.country_to_state", function () {
        var b = a(this).val(), c = a(this).closest("div").find("#billing_state, #shipping_state, #calc_shipping_state"), d = c.parent(), f = c.attr("name"), g = c.attr("id"), h = c.val(), i = c.attr("placeholder");
        if (e[b])if (a.isEmptyObject(e[b]))c.parent().hide().find(".select2-container").remove(), c.replaceWith('<input type="hidden" class="hidden" name="' + f + '" id="' + g + '" value="" placeholder="' + i + '" />'), a("body").trigger("country_to_state_changed", [b, a(this).closest("div")]); else {
            var j = "", k = e[b];
            for (var l in k)k.hasOwnProperty(l) && (j = j + '<option value="' + l + '">' + k[l] + "</option>");
            c.parent().show(), c.is("input") && (c.replaceWith('<select name="' + f + '" id="' + g + '" class="state_select" placeholder="' + i + '"></select>'), c = a(this).closest("div").find("#billing_state, #shipping_state, #calc_shipping_state")), c.html('<option value="">' + wc_country_select_params.i18n_select_state_text + "</option>" + j), c.val(h).change(), a("body").trigger("country_to_state_changed", [b, a(this).closest("div")])
        } else c.is("select") ? (d.show().find(".select2-container").remove(), c.replaceWith('<input type="text" class="input-text" name="' + f + '" id="' + g + '" placeholder="' + i + '" />'), a("body").trigger("country_to_state_changed", [b, a(this).closest("div")])) : c.is(".hidden") && (d.show().find(".select2-container").remove(), c.replaceWith('<input type="text" class="input-text" name="' + f + '" id="' + g + '" placeholder="' + i + '" />'), a("body").trigger("country_to_state_changed", [b, a(this).closest("div")]));
        a("body").trigger("country_to_state_changing", [b, a(this).closest("div")])
    }), a(function () {
        a(":input.country_to_state").change()
    })
});