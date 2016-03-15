app.createNS("app.views.members");
app.views.members.profile = Backbone.View.extend({
    initialize: function(options) {
        console.log(options);
        this.options = options;
        _.bindAll(this, 'render');
    },
    render: function() {
        console.log(this.options);
        app.populateTemplateFromJSON('#profile',this.options,app.siteRoot+'/ui/templates/registry/profile.tpl.html',{name:'John Francis'});
        return this;
    }
});
