app.createNS("app.views.registry");
app.createNS("app.models.registry");

app.models.registry.facebookSignUp = Backbone.Model.extend({
    sync: function (method, model, options) {
        if (method === 'create' || method === 'update') {
            console.log("trying to athenticate with facebook")
            Parse.FacebookUtils.logIn(null, {
                success: function (user) {
                    if (!user.existed()) {
                        alert("User signed up and logged in through Facebook!");
                    } else {

                        alert("User logged in through Facebook!");
                    }
                },
                error: function (user, error) {
                    alert("User cancelled the Facebook login or did not fully authorize.");
                }
            });
        }
    }
});
//user signup
app.models.registry.signup = Backbone.Model.extend({
    sync: function (method, model, options) {
        if (method === 'create' || method === 'update') {

            var user = new Parse.User();
            user.set("username", (this.get('email') || ''));
            user.set("password", (this.get('password') || ''));
            user.set("email", (this.get('email') || ''));
            user.set("key",app.generateUserToken())
            user.set("referredBy",(this.get('referredBy') || ''))
            // other fields can be set just like with Parse.Object
            user.set("phone", "415-392-0202");

            user.signUp(null, {
                success: function(user){
                    app.parse.currentUser = user;
                    _router.navigate("/details", {trigger: true});
                },
                error: function(user, error) {
                    // Show the error message somewhere and let the user try again.
                    alert("Error: " + error.code + " " + error.message);
                }
            });
            return user;
        }
    }
});
app.views.registry.signup = Backbone.View.extend({
    el:'body',
    events: {
        "submit #signupFrm": "doSignUp",
        "click #facebookBtn": "doFacebookSignUp",
        'keyUp': 'processKey'
    },
    doFacebookSignUp: function(e){
        e.preventDefault();
        console.log("Sfsdfsdf")
        var facebookSignUpModel = new app.models.registry.facebookSignUp();
        facebookSignUpModel.save();
    },
    doSignUp: function(e) {
        e.preventDefault();
        var form = $(e.target);
        var fullName = $("#fullName").val(),
            email = $('#email').val(),
            verifyPassword = $('#verifyPassword').val(),
            referredBy = $('#referredBy').val(),
            password = $('#password').val();

        var signUpModel = new app.models.registry.signup({
            fullName:fullName,
            email:email,
            password:password,
            referredBy:referredBy,
            verifyPassword:verifyPassword
        });
        //fires ajax call
        signUpModel.save();

        console.log($(e.target));
        console.log('form fired');
    },
    processKey: function(e) {
        if (e.which === 13){ // enter key
            this.doSignUp();
        }
    },
    initialize: function(options){

        //this.listenTo(this.model, "change", this.render);
        //console.log(this.template)
        this.options = options;
        _.bindAll(this, 'render');

    },
    render: function() {
        $("li#menu-item-1644").addClass('selected');
        app.populateTemplateFromJSON('#signup',this.options,app.siteRoot+'ui/templates/registry/signup.tpl.html',{name:'Tom Francis'});
        return this;
    }
});

//registry detials
app.models.registry.details = Backbone.Model.extend({
    sync: function (method, model, options) {
        if (method === 'create' || method === 'update') {

            console.log("app.registryData",app.registryData)

            var Registry = Parse.Object.extend("Registry");
            var registry = (app.registryData.id)?app.registryData:new Registry();
            registry.set("story", (this.get('story') || ''));
            registry.set("occasion", (this.get('occasion') || ''));
            registry.set("fundingGoal", (Number(this.get('goal')) || 0));
            registry.set("destination",(this.get('destination') || ''));
            registry.set("endDate",(app.convertStringToDate(this.get('endDate')) || new Date()));
            registry.set("creator",app.parse.currentUser);
            if(this.get("story")) {
                registry.save(null, {
                    success: function (registry) {
                        //cache registryData
                        app.registryData = registry;
                        _router.navigate("/registryItems", {trigger: true});
                    },
                    error: function (registry, error) {
                        // Show the error message somewhere and let the user try again.
                        alert("Error: " + error.code + " " + error.message);
                    }
                });
            }
            return registry;
        }
    }
});
app.views.registry.details = Backbone.View.extend({
    el:'body',
    events: {
        "submit #regDetailsFrm": "doRegistryDetails",
        "click #go-reg-items-btn":"goRegistryItems",
        'keyUp': 'processKey'
    },
    doRegistryDetails: function(e) {
        e.preventDefault();
        var form = $(e.target);
        //todo: prepare object to send to parse
        var occasion = $("#occasion").val(),
            destination = $('#destination').val(),
            goal = $('#goal').val(),
            endDate = $('#endDate').val(),
            story = $('#wish').val();

        var regDetailsModel = new app.models.registry.details({
            occasion:occasion,
            destination:destination,
            goal:goal,
            endDate:endDate,
            story:story
        });
        //fires ajax call
        regDetailsModel.save();
    },
    processKey: function(e) {
        if (e.which === 13){ // enter key
            this.doRegistryDetails();
        }
    },
    initialize: function(options){

        //this.listenTo(this.model, "change", this.render);
        //console.log(this.template)
        this.options = options;
        _.bindAll(this, 'render');

    },
    render: function() {
        app.populateTemplateFromJSON('#registry-details',this.options,app.siteRoot+'ui/templates/registry/registry-details.tpl.html');
        return this;
    }
});
//user account activation
app.models.registry.activate = Backbone.Model.extend({
    sync: function (method, model, options) {
        if (method === 'create' || method === 'update') {
            console.log("trying to activate account!!")
            var User = Parse.User;
            var user = new User();

            user.set("score", 1337);
            user.set("playerName", "Sean Plott");
            user.set("cheatMode", false);

            user.save(null, {
                success: function(gameScore) {
                    // Execute any logic that should take place after the object is saved.
                    alert('New object created with objectId: ' + gameScore.id);
                },
                error: function(gameScore, error) {
                    // Execute any logic that should take place if the save fails.
                    // error is a Parse.Error with an error code and message.
                    alert('Failed to create new object, with error code: ' + error.message);
                }
            });
            _router.navigate("/details", {trigger: true});
        }
    }
});
//todo: May not be needed if we use parses internal email verification
app.views.registry.activate = Backbone.View.extend({
    el:'body',
    events: {
        "submit #activateFrm": "doActivate",
        'keyUp': 'processKey'
    },
    doActivate: function(e) {
        e.preventDefault();
        var form = $(e.target);
        var key = $("#key").val(),
            username = $('#username').val(),
            password = $('#password').val(),
            key = $('#key').val();

        var activateModel = new app.models.members.activate({
            username:username,
            password:password,
            key:key
        });
        //fires ajax call
        activateModel.save();

    },
    processKey: function(e) {
        if (e.which === 13){ // enter key
            this.doActivate();
        }
    },
    initialize: function(options){
        //this.listenTo(this.model, "change", this.render);
        //console.log(this.template)
        this.options = options;
        _.bindAll(this, 'render');

    },
    render: function() {
        app.populateTemplateFromJSON('#activate',this.options,app.siteRoot+'ui/templates/registry/signup.tpl.html',{name:'Tom Francis'});
        return this;
    }
});
//user account activation
app.models.registry.customize = Backbone.Model.extend({
    sync: function (method, model, options) {
        if (method === 'create' || method === 'update') {
        }
    }
});
//todo: May not be needed if we use parses internal email verification
app.views.registry.customize = Backbone.View.extend({
    el:'body',
    events: {
        "submit #customizeFrm": "doCustomize",
        'keyUp': 'processKey'
    },
    doCustomize: function(e) {
        e.preventDefault();
        var form = $(e.target);

    },
    processKey: function(e) {
        if (e.which === 13){ // enter key
            this.doActivate();
        }
    },
    initialize: function(options){
        //this.listenTo(this.model, "change", this.render);
        //console.log(this.template)
        this.options = options;
        _.bindAll(this, 'render');

    },
    render: function() {
        app.populateTemplateFromJSON('#customize',this.options,app.siteRoot+'ui/templates/registry/customize.tpl.html',{});
        return this;
    }
});
//ToDo:convert this into a Backbone View object
app.views.registry.bootstrapTagsInput = {
    init:function(){
        $('input.tagsinput').tagsinput('refresh');
        app.views.registry.countries =[];
        //build list
        for(var key in BFHCountriesList) {
            if(BFHCountriesList.hasOwnProperty(key)) {
                var country = {
                    value:key,
                    text:BFHCountriesList[key]
                }
                app.views.registry.countries.push(country);
            }
        }
        var countries = new Bloodhound({
            name: 'countires',
            local: app.views.registry.countries,
            datumTokenizer: function(d) {
                return Bloodhound.tokenizers.whitespace(d.text);
            },
            queryTokenizer: Bloodhound.tokenizers.whitespace

        });
        var promise = countries.initialize();
        promise.done(function() {
                var elt = $("[data-role='tagsinput']");
                elt.tagsinput({
                    itemValue: 'value',
                    itemText: 'text',
                    typeaheadjs: {
                        displayKey: "text",
                        source: countries.ttAdapter()
                    }
                });
            })
            .fail(function() { console.log('err!'); });
    }
};
app.views.registry.bootstrapHelpers = {
    init:function() {
        //date pickers
        $('div.bfh-datepicker').each(function () {
            var $datepicker;

            $datepicker = $(this);
            $datepicker.bfhdatepicker($datepicker.data());
        });
        //number selector
        $(".bfh-number").bfhnumber();

        //color picker
        $(".bfh-colorpicker").bfhcolorpicker();
    }
}
app.views.registry.itemSelect = {
    init:function(){
        var overlay = document.querySelector( '.md-overlay' );
        console.log(document.querySelectorAll( '#container .md-trigger').length );
        [].slice.call( document.querySelectorAll( '#container .md-trigger' ) ).forEach( function( el, i ) {
            var modal = document.querySelector( '#' + el.getAttribute( 'data-modal' ) ),
                close = modal.querySelector( '.md-close' );

            function removeModal( hasPerspective ) {
                classie.remove( modal, 'md-show' );

                if( hasPerspective ) {
                    classie.remove( document.documentElement, 'md-perspective' );
                }
            }

            function removeModalHandler() {
                removeModal( classie.has( el, 'md-setperspective' ) );
            }

            el.addEventListener( 'click', function( ev ) {

                //load registry items
                if(modal.id.indexOf("registryItems") != -1) {
                    var regItemsModel = new app.models.registry.RegistryItems({});
                    regItemsModel.save();
                }
                classie.add( modal, 'md-show' );
                overlay.removeEventListener( 'click', removeModalHandler );
                overlay.addEventListener( 'click', removeModalHandler );

                if( classie.has( el, 'md-setperspective' ) ) {
                    setTimeout( function() {
                        classie.add( document.documentElement, 'md-perspective' );
                    }, 25 );
                }
            });

            close.addEventListener( 'click', function( ev ) {
                ev.stopPropagation();
                removeModalHandler();
            });

        } );
    }
}
app.views.registry.imageTransformUpload = {
    init:function(formSelector) {
        $(formSelector).transloadit({
            modal: false,
            /*
            onProgress: function(bytesReceived, bytesExpected) {
                // render your own progress bar!
                //$('#progress') .text((bytesReceived / bytesExpected * 100).toFixed(2) + '%');
                console.log((bytesReceived / bytesExpected * 100).toFixed(2) + '%');
            },
            */
            onSuccess:function(assembly){
                    console.log(assembly)
            },
            onError: function(assembly) {
                alert(assembly.error + ': ' + Assembly.message);
            },
            wait: true,
            triggerUploadOnFileSelection: true,
            params: {
                auth: {key: "1bc4a34d834e426c9c73a3d4b1e15844"},
                steps: {
                    thumb: {
                        use: ":original",
                        robot: "/image/resize",
                        width: 221,
                        height: 168,
                        resize_strategy: "pad",
                        background: "#F7F7F7"
                    }
                }
            }
        });
    }
};
app.views.registry.upload = {
    init:function(){

        $('#drag-and-drop-zone').dmUploader({
            url:'https://api.parse.com/1/files/test.png',
            dataType: 'json',
            allowedTypes: 'image/*',
            //extFilter: 'jpg;png;gif'
            onInit: function(){
                $.danidemo.addLog('#demo-debug', 'default', 'Plugin initialized correctly');
            },
            onBeforeUpload: function(id){
                $.danidemo.addLog('#demo-debug', 'default', 'Starting the upload of #' + id);

                $.danidemo.updateFileStatus(id, 'default', 'Uploading...');
            },
            onNewFile: function(id, file){
                $.danidemo.addFile('#demo-files', id, file);
            },
            onComplete: function(){
                $.danidemo.addLog('#demo-debug', 'default', 'All pending tranfers completed');
            },
            onUploadProgress: function(id, percent){
                var percentStr = percent + '%';

                $.danidemo.updateFileProgress(id, percentStr);
            },
            onUploadSuccess: function(id, data){
                $.danidemo.addLog('#demo-debug', 'success', 'Upload of file #' + id + ' completed');

                $.danidemo.addLog('#demo-debug', 'info', 'Server Response for file #' + id + ': ' + JSON.stringify(data));

                $.danidemo.updateFileStatus(id, 'success', 'Upload Complete');

                $.danidemo.updateFileProgress(id, '100%');
            },
            onUploadError: function(id, message){
                $.danidemo.updateFileStatus(id, 'error', message);

                $.danidemo.addLog('#demo-debug', 'error', 'Failed to Upload file #' + id + ': ' + message);
            },
            onFileTypeError: function(file){
                $.danidemo.addLog('#demo-debug', 'error', 'File \'' + file.name + '\' cannot be added: must be an image');
            },
            onFileSizeError: function(file){
                $.danidemo.addLog('#demo-debug', 'error', 'File \'' + file.name + '\' cannot be added: size excess limit');
            },
            //onFileExtError: function(file){
             //$.danidemo.addLog('#demo-debug', 'error', 'File \'' + file.name + '\' has a Not Allowed Extension');
             //},
            onFallbackMode: function(message){
                $.danidemo.addLog('#demo-debug', 'info', 'Browser not supported(do something else here!): ' + message);
            }
        });
    }

}