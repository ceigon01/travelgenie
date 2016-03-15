var app = app || {
    siteRoot:'/travelgenie/',
    // a convenience function for parsing string namespaces and
    // automatically generating nested namespacesParse.initialize("APPLICATION_ID", "JAVASCRIPT_KEY");
    createNS: function (namespace) {
        var nsparts = namespace.split(".");
        var parent = app;

        // we want to be able to include or exclude the root namespace so we strip
        // it if it's in the namespace
        if (nsparts[0] === "app") {
            nsparts = nsparts.slice(1);
        }

        // loop through the parts and create a nested namespace if necessary
        for (var i = 0; i < nsparts.length; i++) {
            var partname = nsparts[i];
            // check if the current parent already has the namespace declared
            // if it isn't, then create it
            if (typeof parent[partname] === "undefined") {
                parent[partname] = {};
            }
            // get a reference to the deepest element in the hierarchy so far
            parent = parent[partname];
        }
        // the parent is now constructed with empty namespaces and can be used.
        // we return the outermost namespace
        return parent;
    }
    ,getTemplate:function(templateUrl, templateSelector){
        $("#templates").load(templateUrl+" "+templateSelector,function(){
            var template = $(templateSelector).html();
            return template;
        });
    },
    populateTemplateFromUrl:function(templateSelector,outputSelector,templateUrl, dataUrl){
        $.getJSON(dataUrl, {}, function(templateData, textStatus, jqXHr){
            console.log(templateData);
            $("#templates").load(templateUrl+" "+templateSelector,function(){
                var template = $(templateSelector).html();
                var output = Mustache.render(template, templateData);
                $(outputSelector).html(output);
            });
        });
    },
    populateTemplateFromJSON:function(templateSelector,outputSelector,templateUrl, json ){
        $("#templates").load(templateUrl+" "+templateSelector,function(){
            var template = $(templateSelector).html();
            var output = Mustache.render(template, json);
            $(outputSelector).html(output);
            console.log(templateSelector)
            if(templateSelector === "#signup") {
                $('.selectpicker').selectpicker('render');
            }else if(templateSelector === "#registry-details" || templateSelector === "#registryItemList") {
                app.views.registry.itemSelect.init();
                app.views.registry.bootstrapHelpers.init();
                app.views.registry.bootstrapTagsInput.init();
                $(".dial").knob({
                    width:100,
                    height:100,
                    readOnly:true,
                    lineCap:'round',
                    fgColor:'#3B3B3B',
                    bgColor:'#ffffff',
                    displayInput:false,
                    thickness:.2
                });
                //app.views.registry.imageTransformUpload.init("#regItemUploadForm");
                //app.views.registry.upload.init();
            }else if(templateSelector === "#customize"){
                app.views.registry.bootstrapHelpers.init();
            }
        });
    },
    //Utillity Functions
    generateUserToken:function(){
        return ""+Math.floor(Math.random()*90000) + 10000;
    },
    convertStringToDate:function(mmDDYYY) {
        var arr = mmDDYYY.split("/");
        return new Date(arr[2],arr[0]-1,arr[1]);
    },
    addedRegistryItemIds:[],
    registryData:{}
};
//create app namespaces
app.createNS("app.parse");
app.createNS("app.models");
app.createNS("app.views");
app.createNS("app.controllers");
app.createNS("app.routes");

//initialize Parse.com
app.parse.currentUser = null;
app.parse.applicationId = "POpaRhVCozCcXHwG7uz3GhjrDjDqMhGqgPqFkSnZ";
app.parse.javaScriptKey = "uq3v7lkRPfQyCRCiOpSJYqzfQhzobA9cV8clRTiN";
app.parse.restKey = "aLdaXquzvsn6oDHU6BjaAZhnXuy6vRcd46KtqW7x";