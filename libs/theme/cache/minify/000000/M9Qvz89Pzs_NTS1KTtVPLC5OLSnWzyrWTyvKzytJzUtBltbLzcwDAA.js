jQuery(function (a) {
    a(".woocommerce-ordering").on("change", "select.orderby", function () {
        a(this).closest("form").submit()
    }), a("input.qty:not(.product-quantity input.qty)").each(function () {
        var b = parseFloat(a(this).attr("min"));
        b && b > 0 && parseFloat(a(this).val()) < b && a(this).val(b)
    })
});