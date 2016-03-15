app.routes.AppRouter = Backbone.Router.extend({
    routes: {
        "signup":"goSignUp",
        "details":"goRegistryDetails",
        "registryItems":"goRegistryItems",
        "add-item?id=:id":"doAddRegistryItem",
        "delete-item?id=:id":"doDeleteRegistryItem",
        "activate":"goActivateAccount",
        "customize":"goCustomize",
        "*actions": "defaultRoute" // matches http://example.com/#anything-here
    },
    initialize: function(options) {
        _router = this;

    },
    _router:{},
    defaultRoute:function(actions){
        console.log(actions,app.parse.currentUser);
        if(app.parse.currentUser){
            console.log("show user profile");
            var profile = new app.views.registry.profile("#main");
            profile.render();

        }else{
            var test = new app.views.public.home.test("#main");
            test.render();
            console.log("index page");
        }
    },
    goSignUp:function(){
        console.log("signup");
        _router.navigate("/signup", {trigger: true});
        var signupView = new app.views.registry.signup("#main");
        signupView.render();


    },
    goActivateAccount:function(){
        console.log("validateAccount");
        var activateAcctView = new app.views.registry.activate("#main");
        activateAcctView.render();
    },
    goRegistryDetails:function(){
        console.log("registrydetails");
        var regDetailsView = new app.views.registry.details("#main");
        regDetailsView.render();
    },
    goRegistryItems:function(){
        console.log("registryitems");
        var regDetailsView = new app.views.registry.SelectedRegistryItems("#main");
        regDetailsView.render();
    },
    goCustomize:function(){
        console.log("registrycustomize");
        var regCustomizeView = new app.views.registry.customize("#main");
        regCustomizeView.render();
    },
    doAddRegistryItem:function(itemId){
        var PointerObj = Parse.Object.extend("RegistryItem");
        var pointerObj = new PointerObj();
        pointerObj.id = itemId;


        var UserRegistryItem = Parse.Object.extend("UserRegistryItems");
        var query = new Parse.Query(UserRegistryItem);
        query.equalTo("registryItem",pointerObj);
        query.equalTo("createdBy",Parse.User.current());
        /*
        todo:1 - set the value of value to the current Registry object
        todo:2 - store Registry id as a cookie
        todo:3 - Create function that test if Registry object exist if it doesn't then get it from parse. Needed to ensure if refresh happens we don't loose state
        todo:4 - get mediaItem from RegistryItem and display it in RegistryItems list or simply just get the source from the popup
        */
        query.include("registryItem");
        query.limit(1);
        query.find({
            success:function(results){
                if(results.length === 0) {
                    var RegistryItem = Parse.Object.extend("RegistryItem");
                    var query = new Parse.Query(RegistryItem);
                    query.equalTo("objectId",itemId);
                    query.include("mediaItem");
                    query.limit(1);
                    query.find({
                        success:function(result){
                            console.log(result);
                            var AddedUserRegistryItem = Parse.Object.extend("UserRegistryItems");
                            var addRegistryItem = new AddedUserRegistryItem();
                            addRegistryItem.set('registryItem', pointerObj);
                            addRegistryItem.set("createdBy",Parse.User.current());
                            addRegistryItem.set("mediaItem",result[0].get("mediaItem"));
                            addRegistryItem.save(null, {
                                success: function (newRegistryItem) {
                                    //todo:take the following array and show delete button within registry item popup on the items that have been added
                                    app.addedRegistryItemIds.push(newRegistryItem.id);
                                    app.models.registry.getAllUserRegistryItems();

                                },
                                error: function (gameScore, error) {
                                    // Execute any logic that should take place if the save fails.
                                    // error is a Parse.Error with an error code and message.
                                    app.models.registry.getAllUserRegistryItems();
                                    console.log('Failed to create new object, with error code: ' + error.message);
                                }
                            });
                        }
                    });
                }else{
                    app.models.registry.getAllUserRegistryItems();
                }
            }
        });
    },
    doDeleteRegistryItem:function(itemId){
        var UserRegistryItem = Parse.Object.extend("UserRegistryItems");
        var userRegistryItem = new UserRegistryItem();
        userRegistryItem.id = itemId;
        userRegistryItem.destroy({
            success: function(myObject) {
                app.models.registry.getAllUserRegistryItems();
            },
            error: function(myObject, error) {
                // The delete failed.
                // error is a Parse.Error with an error code and message.
                app.models.registry.getAllUserRegistryItems();
                console.log('Failed to create new object, with error code: ' + error.message);
            }
        });
    }
});