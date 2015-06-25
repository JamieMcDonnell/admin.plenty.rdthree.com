//*********************** farm.js **************************//
// create the fields REST namespace and methods

// create the farm UI namespace
plenty_admin.UI.farm = {};
plenty_admin.UI.farm.DOM = plenty_admin.UI.main.DOM.find("#farm-container");
plenty_admin.UI.farm.tabs = {};
plenty_admin.UI.farm.tabs.DOM = plenty_admin.UI.farm.DOM.find('#farmAssets');

plenty_admin.UI.farm.BUTTON_delete_multiple = plenty_admin.UI.farm.DOM.find(".delete_multiple");

plenty_admin.UI.farm.init = function(farm){
	// create the API calls for this farm
	plenty_admin.REST.fields.allFieldsByFarm = plenty_admin.api.one("fields/getAllFieldsByFarm", farm.id);
	plenty_admin.REST.fields.allFarmServicesByFarm = plenty_admin.api.one("farms/getAllFarmServicesByFarm", farm.id);
	
	// store the current farm
	plenty_admin.DATA.current_farm = farm;
	
	plenty_admin.UI.farm.DOM.data("farm", farm.id);
	
	plenty_admin.UI.farm.DOM
	.find("h1 a.backTosettings")
	.off("click")
	.on("click", function(){
		plenty_admin.UI.currentScreen
		.fadeOut("normal", function(){
			plenty_admin.UI.currentScreen = plenty_admin.UI.settings.DOM;
			plenty_admin.UI.currentScreen.fadeIn("normal");
		});
	})
	.end()
	.find("h1 a.backToOrganization")
	.off("click")
	.on("click", function(){
		plenty_admin.UI.currentScreen
		.fadeOut("normal", function(){
			plenty_admin.UI.currentScreen = plenty_admin.UI.organization.DOM;
			plenty_admin.UI.currentScreen.fadeIn("normal");
		});
	});
	
	plenty_admin.UI.farm.DOM
	.find("button.btn.add_to_farm")
	.off("click")
	.on("click", function(e){
		var modalContext = ["Add", "to", "insert"];
		plenty_admin.UI.farm.show_item_modal("add_to_farm", modalContext);
	})
	.end()
	.find("button.delete_multiple")
	.off("click")
	.on("click", function(e){
		var selected_items = plenty_admin.UI.farm.tabs.DOM.find(".tab-pane.active tr td input[type='checkbox']:checked");
		console.log("selected_items:", selected_items);
		selected_items.each(function(){
			var itemId = $(this).closest("tr").data("id");
			plenty_admin.UI.farm.deleteX(itemId, plenty_admin.HELPER.get_singular_selected_hash());
		});
	})
	
	
	// fade in the farm template
	//show farm template if it is not visible
	if(!plenty_admin.UI.farm.DOM.is(":visible")){
		plenty_admin.UI.currentScreen
		.fadeOut("normal", function(){
			plenty_admin.UI.currentScreen = plenty_admin.UI.farm.DOM;
			plenty_admin.REST.fields.getAllFieldsByFarm(farm.id, function(fields){
				plenty_admin.DATA.current_farm.fields = fields;
				plenty_admin.UI.farm.populate(fields, "fields");
			});
			plenty_admin.REST.fields.getAllFarmServicesByFarm(farm.id, function(services){
				plenty_admin.DATA.current_farm.services = services;
				plenty_admin.UI.farm.populate(services, "services");
				plenty_admin.UI.farm.DOM.fadeIn("normal");
			});
		});
	}else{
		plenty_admin.UI.farm.populate(farm);
	}
};

plenty_admin.UI.farm.create = function(items, hash){
	//console.log("plenty_admin.UI.organization.items: ", itemList, hash);
	if(items.length <= 0){
		return "<h3>No items in this set yet!</h3>";;
	}
	var itemsHTML = plenty_admin.UI.create_header_row(items[0], hash);
	itemsHTML += '<tbody>';
	for(var i=0; i< items.length; i++){
		var item = items[i];
		itemsHTML += plenty_admin.UI.create_item(item, hash);
	}
	itemsHTML += '</tbody>';
	
	
	var $itemsHTML = $(itemsHTML);
	// add functionality here
	$itemsHTML
	.find("tr td input[type='checkbox']")
	.off("click")
	.on("click", function(e){
		// check number of checked checkboxes
		var numChecked = $(e.target).closest("tbody").find("tr td input[type='checkbox']:checked").length;
		if(numChecked > 0){
			plenty_admin.UI.farm.BUTTON_delete_multiple.fadeIn("fast");
		}else{
			plenty_admin.UI.farm.BUTTON_delete_multiple.fadeOut("fast");
		}
	})
	.end()
	.find("tr td button.btn.editItem")
	.off("click")
	.on("click", function(e){
		// edit entire entry
		var modalContext = ["Update", "in", "update"];
		var itemId = $(this).closest("tr").data("id");
		plenty_admin.UI.farm.show_item_modal("edit_in_organization", modalContext, itemId);
	})
	.end()
	.find("tr td button.btn.deleteItem")
	.off("click")
	.on("click", function(e){
		// delete entire entry
		var itemId = $(this).closest("tr").data("id");
		plenty_admin.UI.farm.deleteX(itemId, plenty_admin.HELPER.get_singular_selected_hash());
	})
	.end()
	.find("tr td button.btn.viewItem")
	.off("click")
	.on("click", function(e){
		// delete entire entry
		var itemId = $(this).closest("tr").data("id");
		plenty_admin.UI[plenty_admin.HELPER.get_singular_selected_hash()].init(itemId);
	})
	return $itemsHTML;
}

plenty_admin.UI.farm.tabs.DOM.on('shown.bs.tab', function (e) {
	// show / hide delete button if checkboxes are selected
	var numChecked = plenty_admin.UI.farm.tabs.DOM.find(".tab-pane.active tr td input[type='checkbox']:checked").length;
	console.log("numChecked", numChecked);
	if(numChecked > 0){
		plenty_admin.UI.farm.BUTTON_delete_multiple.fadeIn("fast");
	}else{
		plenty_admin.UI.farm.BUTTON_delete_multiple.fadeOut("fast");
	}
});

plenty_admin.UI.farm.show_item_modal = function(modal, context, itemId){
	console.log("plenty_admin.UI.farm.show_item_modal", modal, context, itemId);
	//show the item modal of a specific entity
	// get the item hash type
	var url = plenty_admin.UI.farm.tabs.DOM.find("li.active a[role='tab']").prop("href");
	var hash = url.substring(url.indexOf('#')+1);
	var hashSingular = plenty_admin.HELPER.get_singular_selected_hash(hash);
	var currentSub = plenty_admin.DATA.current_organization[hash];
	
	var item = $.grep(currentSub, function(_item, i){ 
		return _item.id === itemId 
	})[0];
	
	//correct the language for the modal header
	var prep = (hash == "equipment" ? " a piece of " : " a ");
	
	//set up the modal before showing
	plenty_admin.UI.farm["MODAL_"+modal]
	.removeClass("fields services")
	.addClass(hash)
	.find(".modal-title")
	.text(context[0]+ prep + hashSingular+" "+context[1]+" "+plenty_admin.DATA.current_organization.name)
	.end()
	.find("button."+context[0].toLowerCase())
	.off("click")
	.on("click", function(e){
		var item_form = $(this).closest(".modal").find(".modal-body form:visible");
		var item_object = plenty_admin.UI.farm.build_item(item_form, (context[2] == "update" ? item : null ));
		plenty_admin.UI.farm[context[2]+"X"](item_object, hashSingular);
	});
	
	//prefil the form if editing the entity
	switch(context[2]){
		case "update":
			var item_form = plenty_admin.UI.farm["MODAL_"+modal].find("form.add_to_farm_form."+hash);
			plenty_admin.UI.farm.populate_form_from_item(item_form, itemId, hash);
		break;
	}
	
	plenty_admin.UI.farm["MODAL_"+modal]
	.modal("show");
}

plenty_admin.UI.farm.switchTab = function(hash){
	plenty_admin.UI.farm.tabs.DOM.find(".nav-tabs a[role='tab'][href='"+hash+"']").tab('show');
}

//method to populate the farm fields data based on the farm ID
plenty_admin.UI.farm.populate = function(items, hash){
	console.log("plenty_admin.UI.farm.populate: ", items, hash);
	
	// insert farm name and org name into breadcrumb trail
	plenty_admin.UI.farm.DOM
	.find(".farm-name")
	.text(plenty_admin.DATA.current_farm.name)
	.end()
	.find(".org-name")
	.text(plenty_admin.DATA.current_organization.name);
	
	var $panel = plenty_admin.UI.farm.DOM.find("table."+hash+"List");
	
	//append the data set to the table
	$panel
	.html("")
	.append(plenty_admin.UI.farm.create(items, hash));
		
	// enable editable on dynamic fields
	$(".editable")
	.editable(plenty_admin.REST.inline_editing_options);
	
	// convert radio buttons to switches where appropriate
	$("input[type='checkbox'].switch").bootstrapSwitch();
	
	plenty_admin.HELPER.hideLoadingOverlay();
}
