$(function(){
    //Initialize Parse
    Parse.initialize(app.parse.applicationId, app.parse.javaScriptKey);
    app.parse.currentUser =  Parse.User.current();

    //generate main site container
    var shell = new app.views.public.home.shell("#container");
    shell.render();


    // Initiate the routers
    new app.routes.AppRouter();
    //login routers
    new app.routes.userAuth();

    if(!Backbone.History.started){
        if (history.pushState) {
            // supported.
            Backbone.history.start({pushState: true, root: app.siteRoot});
        } else {
            Backbone.history.start();
        }
    }
    //Initialize Facebook
    window.fbAsyncInit = function() {
        Parse.FacebookUtils.init({ // this line replaces FB.init({
            appId      : '345970128943000', // Facebook App ID
            status     : true,  // check Facebook Login status
            cookie     : true,  // enable cookies to allow Parse to access the session
            xfbml      : true,  // initialize Facebook social plugins on the page
            version    : 'v2.2' // point to the latest Facebook Graph API version
        });
    };

    (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
});