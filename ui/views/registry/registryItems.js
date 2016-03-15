app.createNS("app.models.registry");
app.createNS("app.views.registry");

app.models.registry.RegistryItems = Backbone.Model.extend({
    sync: function (method, model, options) {
        if (method === 'create' || method === 'update') {
            var responseData = {items:[]};
            var RegistryItem = Parse.Object.extend("RegistryItem");
            var query = new Parse.Query(RegistryItem);
            query.ascending("caption");
            query.include("mediaItem");
            query.find({
                success: function(results) {
                    // Do something with the returned Parse.Object values
                    responseData.items = new Array();
                    for (var i = 0; i < results.length; i++) {
                        var object = results[i];
                        responseData.items.push(object);
                    }
                    //render view with loaded data
                    var regItemsView = new app.views.registry.RegistryItems(responseData);
                    regItemsView.render();
                },
                error: function(error) {
                    alert("Error: " + error.code + " " + error.message);
                }

            });
            return responseData;
        }
    }
});

app.views.registry.RegistryItems = Backbone.View.extend({
    el:'body',
    events: {
        "click button.addRegItemsBtn": "render",
        'keyUp': 'processKey'
    },
    _registryItems:{},

    render: function(e) {
        app.populateTemplateFromJSON('#registryItems','#reg-items',app.siteRoot+'ui/templates/registry/registry-items.tpl.html',this.options);
        return this;
    },
    initialize: function(options){
        _registryItems = this;
        this.options = options;
        _.bindAll(this, 'render');

    }
});
app.views.registry.SelectedRegistryItems = Backbone.View.extend({
    el:'body',
    events: {
        "click button.addRegItemsBtn": "render",
        "click #regitems-continue": "doSaveUserRegistryItems",
        "click input,textarea":"doSaveItem",
        "click a.upload":"showImageUpload",
        "change [name='files[]']":"doUpload",
        "drop #drag-and-drop-zone":"doUpload",
        'keyUp': 'processKey'
    },
    _registryItems:{},
    selectedItemId:{},
    selectedMediaItemId:{},
    doUpload:function(e){
        var file = {};
        var files = (e.originalEvent.dataTransfer)?e.originalEvent.dataTransfer.files:[];
        $("#drag-and-drop-zone .or").hide();
        $("#drag-and-drop-zone .instructions").hide();
        $("#drag-and-drop-zone .browser").hide();
        $("#drag-and-drop-zone .load-status").show();
        var id = this.selectedItemId;
        var mediaId = this.selectedMediaItemId;
        var fileUploadControl = (files.length)?{files:files}:$(e.target)[0];

        if (fileUploadControl.files.length > 0) {
            var transloadit = new TransloaditXhr({
                wait:true,
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
                },
                progressCb:function(obj){
                    $('.dial')
                            .val(parseInt(obj))
                            .trigger('change');
                    $(".status-label").text(parseInt(obj)+"%");
                },
                successCb: function(fileObj) {
                    var parseFile = new Parse.File(file.name, file);
                    var MediaItem = Parse.Object.extend("UserMedia");
                    var mediaItem = new MediaItem();
                    mediaItem.set("objectId",mediaId);
                    mediaItem.set("file",parseFile);
                    mediaItem.set("external",fileObj.thumb[0].url);
                    mediaItem.save(null, {
                        success:function(mItem){
                            var UserRegistryItem = Parse.Object.extend("UserRegistryItems");
                            var registryItem = new UserRegistryItem();
                            registryItem.set('objectId',id);
                            registryItem.set("mediaItem",mItem);
                            registryItem.save(null, {

                                success: function (newRegistryItem) {
                                    //todo:take the following array and show delete button within registry item popup on the items that have been added
                                    app.addedRegistryItemIds.push(newRegistryItem.id);
                                    app.models.registry.getAllUserRegistryItems();

                                },
                                error: function (newRegistryItem, error) {
                                    // Execute any logic that should take place if the save fails.
                                    // error is a Parse.Error with an error code and message.
                                    app.models.registry.getAllUserRegistryItems();
                                    console.log('Failed to create new object, with error code: ' + error.message);
                                }
                            });
                        }

                    });
                },

                errorCb: function(error) {
                    alert(error);
                }
            });

            file = fileUploadControl.files[0];
            transloadit.uploadFile(file);

            /*

            var parseFile = new Parse.File(file.name, file);
            var MediaItem = Parse.Object.extend("UserMedia");
            var mediaItem = new MediaItem();
            mediaItem.set("file",parseFile);
            mediaItem.save(null, {
                success:function(mItem){
                    var UserRegistryItem = Parse.Object.extend("UserRegistryItems");
                    var registryItem = new UserRegistryItem();
                    console.log("again",id)
                    registryItem.set('objectId',id);
                    registryItem.set("mediaItem",mItem);
                    registryItem.save(null, {

                        success: function (newRegistryItem) {
                            //todo:take the following array and show delete button within registry item popup on the items that have been added
                            app.addedRegistryItemIds.push(newRegistryItem.id);
                            app.models.registry.getAllUserRegistryItems();

                        },
                        error: function (newRegistryItem, error) {
                            // Execute any logic that should take place if the save fails.
                            // error is a Parse.Error with an error code and message.
                            app.models.registry.getAllUserRegistryItems();
                            console.log('Failed to create new object, with error code: ' + error.message);
                        }
                    });
                }

            });
            */
        }
    },
    doSaveItem:function(e){
        var selectedItem = $(e.target);
        if(app.models.registry.lastSelectedRowId && app.models.registry.lastSelectedRowId.length > 0
            && app.models.registry.lastSelectedRowId !== selectedItem.attr("data-item")) {
            var UserRegistryItem = Parse.Object.extend("UserRegistryItems");
            var registryItem = new UserRegistryItem();

            var dirtyItem = {};
            var fields = $("[data-item='"+app.models.registry.lastSelectedRowId+"']");
            $.each(fields,function( index, value ){
                if($(value).attr("name") == "location") {
                    dirtyItem.name = $(value).val();
                }else if($(value).attr("name") == "description"){
                    dirtyItem.description = $(value).val();
                }else if($(value).attr("name") == "amount" ){
                    dirtyItem.amount = $(value).val();
                }else if($(value).attr("name") == "qty"){
                    dirtyItem.qty = $(value).val();
                }
            });

            registryItem.set("objectId",app.models.registry.lastSelectedRowId);
            registryItem.set("caption",dirtyItem.name);
            registryItem.set("minQty",Number(dirtyItem.qty));
            registryItem.set("monetaryValue",Number(dirtyItem.amount));
            registryItem.set("description",dirtyItem.description);
            registryItem.save(null, {
                success: function(regItem) {
                    $.each(fields,function( index, value ){
                        if($(value).attr("name") == "location") {
                            $(value).val(regItem.get("caption"));
                        }else if($(value).attr("name") == "description"){
                            $(value).val(regItem.get("description"));
                        }else if($(value).attr("name") == "amount" ){
                            $(value).val(regItem.get("monetaryValue"));
                        }else if($(value).attr("name") == "qty"){
                            $(value).val(regItem.get("minQty"));
                        }
                    });
                }
            });
            app.models.registry.lastSelectedRowId = selectedItem.attr("data-item");
        }else if(!app.models.registry.lastSelectedRowId || app.models.registry.lastSelectedRowId.length == 0){
            app.models.registry.lastSelectedRowId = selectedItem.attr("data-item");
        }
    },
    doSaveUserRegistryItems:function(){
        var rows = $("#main .row").filter("[data-item]");
        var rowData = [];
        $.each(rows,function(index,value){
            var objectId = $(value).attr("data-item");
            if(objectId){
                var item = $(value);
                var locationField = item.find("[name='location']");
                var descField = item.find("[name='description']");
                var amountField = item.find("[name='amount']");
                var qtyField = item.find("[name='amount']");

                rowData.push({
                    id:objectId,
                    caption: locationField.val(),
                    description: descField.val(),
                    amount: amountField.val(),
                    qty: qtyField.val()
                });
            }
        });
        console.log(rowData);
        //save data to parse
        var UserRegistryItem = Parse.Object.extend("UserRegistryItems");
        $.each(rowData,function(index,data){
            var userRegistryItem = new UserRegistryItem();
            userRegistryItem.set("objectId",data.id);
            userRegistryItem.set("caption",data.caption);
            userRegistryItem.set("minQty",Number(data.qty));
            userRegistryItem.set("monetaryValue",Number(data.amount));
            userRegistryItem.set("description",data.description);

            userRegistryItem.save(null, {
                success:function(regItem){
                    console.log("saved Successfully!")
                }
            });

        });

        _router.navigate("/customize", {trigger: true});
    },
    showImageUpload:function(e){
        this.selectedItemId = $(e.target).attr("data-item");
        this.selectedMediaItemId = $(e.target).attr("data-media-item");
        console.log(this.selectedItemId);
    },
    render: function(e) {
        app.populateTemplateFromJSON('#registryItemList','#main',app.siteRoot+'ui/templates/registry/registry-items.tpl.html',this.options);
        return this;
    },
    initialize: function(options){
        _registryItems = this;
        this.options = options;
        _.bindAll(this, 'render');

    }
});

//Utility functions
app.models.registry.lastSelectedRowId = "";

app.models.registry.getAllUserRegistryItems = function(){
    //get all added registyy items abd display them
    var responseData = {items: []};
    var UserRegistryItem = Parse.Object.extend("UserRegistryItems");
    var query = new Parse.Query(UserRegistryItem);
    query.ascending("createdAt");
    query.include("registryItem");
    query.include("mediaItem");
    query.find({
        success: function (results) {
            // Do something with the returned Parse.Object values
            responseData.items = new Array();
            for (var i = 0; i < results.length; i++) {
                var object = results[i];
                responseData.items.push(object);
            }
            console.log(responseData)
            //render view with loaded data
            var regItemsView = new app.views.registry.SelectedRegistryItems(responseData);
            regItemsView.render();

        },
        error: function (error) {
            alert("Error: " + error.code + " " + error.message);
        }

    });
}
app.models.registry.getRegistryItemById = function(id){
    var responseData = {};
    var RegistryItem = Parse.Object.extend("RegistryItem");
    var query = new Parse.Query(RegistryItem);
    query.equalTo("id",id);
    query.limit(1);
    query.find({
        success:function(result){
            console.log(result);
            responseData = result;
        }
    });
}