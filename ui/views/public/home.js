app.createNS("app.views.public.home");
app.views.public.home.test = Backbone.View.extend({
    initialize: function(options) {
        console.log(options);
        this.options = options;
        _.bindAll(this, 'render');
    },
    render: function() {
        console.log(this.options);
        //this.$el.html(this.template(this.model.attributes));
        //app.populateTemplateFromUrl('#template2','#person','/famebase/ui/templates/public/home.tpl.html','data/dummy.json');
        app.populateTemplateFromJSON('#template2',this.options,app.siteRoot+'/ui/templates/public/home.tpl.html',{});
        return this;
    }
});

app.views.public.home.shell = Backbone.View.extend({
    initialize: function(options) {
        console.log(options);
        this.options = options;
        _.bindAll(this, 'render');
    },
    render: function() {
        console.log($(this.options))
        //this.$el.html(this.template(this.model.attributes));
        //app.populateTemplateFromUrl('#template2','#person','/famebase/ui/templates/public/home.tpl.html','data/dummy.json');
        app.populateTemplateFromJSON('#shell',this.options,app.siteRoot+'/ui/templates/public/home.tpl.html');
        return this;
    }
});