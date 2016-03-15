app.routes.userAuth = Backbone.Router.extend({
    routes: {
        "login/:id/:pwd":"doLogin",
"signout":"doSignOut"
    },
    _router:{},
    initialize: function(options) {
        _router = this;

    },
    doLogin:function(uid,pwd){
        Parse.initialize(app.parse.applicationId, app.parse.javaScriptKey);
        Parse.User.logIn(uid,pwd, {
            success: function(user) {
                // Do stuff after successful login.
            console.log("success");
                app.parse.currentUser = user;
                //this._router.navigate("/"+user.get('username'), {trigger: true, replace: true});
                _router.navigate("/"+user.get('username'), {trigger: true});
            },
            error: function(user, error) {
                // The login failed. Check error to see why.
                app.parse.currentUser = null;
            }
        });

    },
    doSignOut:function(){
        Parse.User.logOut();
        app.parse.currentUser = null;
        _router.navigate('/', {trigger: true});
    }
});
