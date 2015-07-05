//*********************** organization.js **************************//
//create namespace for organization layout
plenty_admin.UI.organization = {};
plenty_admin.UI.organization.DOM = plenty_admin.UI.main.DOM.find("#organization-container");
plenty_admin.UI.organization.tabs = {};
plenty_admin.UI.organization.tabs.DOM = plenty_admin.UI.organization.DOM.find('#orgAssets');

plenty_admin.UI.organization.MODAL_add_to_organization = plenty_admin.UI.organization.DOM.find('#add_to_organization');
plenty_admin.UI.organization.MODAL_edit_in_organization = plenty_admin.UI.organization.DOM.find('#edit_in_organization');
plenty_admin.UI.organization.MODAL_confirm_delete = plenty_admin.UI.organization.DOM.find('#confirm_delete');

plenty_admin.UI.organization.MODAL_edit_field = plenty_admin.UI.organization.DOM.find('#edit_field');
plenty_admin.UI.organization.MODAL_add_field = plenty_admin.UI.organization.DOM.find('#add_field');

plenty_admin.UI.organization.BUTTON_delete_multiple = plenty_admin.UI.organization.DOM.find(".delete_multiple");

plenty_admin.UI.organization.filter_by_farm = plenty_admin.UI.organization.DOM.find("select.filter-by-farm");

// create references to common entity APIs
var entities = ["Farm", "User", "Equipment", "Product", "Plan", "Skill", "Payment", "Role", "Interest", "Organization"];

for(var e=0; e < entities.length; e++){
	var entity = entities[e];
	plenty_admin.REST["insert"+entity] = plenty_admin.api.all(entity.toLowerCase()+(entity === "Equipment" || entity === "Role" ? "" : "s")+"/insert"+entity);
	plenty_admin.REST["delete"+entity] = plenty_admin.api.all(entity.toLowerCase()+(entity === "Equipment" || entity === "Role" ? "" : "s")+"/delete"+entity);
	plenty_admin.REST["update"+entity] = plenty_admin.api.all(entity.toLowerCase()+(entity === "Equipment" || entity === "Role" ? "" : "s")+"/update"+entity);
}

plenty_admin.REST.insertBoundary = plenty_admin.api.all("boundaries/insertBoundary");
plenty_admin.REST.insertBoundaryPointsArray = plenty_admin.api.all("boundaryPoints/insertBoundaryPointsArray");

plenty_admin.REST.insertField = plenty_admin.api.all("fields/createFieledWithBoundaryInterestAndCropType");

plenty_admin.REST.insertFieldCrop = plenty_admin.api.all("fieldCrops/insertFieldCrop");
plenty_admin.REST.updateFieldCrop = plenty_admin.api.all("fieldCrops/updateFieldCrop");
plenty_admin.REST.deleteFieldCrop = plenty_admin.api.all("fieldCrops/deleteFieldCrop");

plenty_admin.REST.insertFieldEquipment = plenty_admin.api.all("fieldEquipment/insertWithNewEquipment");
plenty_admin.REST.updateFieldEquipment = plenty_admin.api.all("fieldEquipment/updateFieldEquipment");
plenty_admin.REST.deleteFieldEquipment = plenty_admin.api.all("fieldEquipment/deleteFieldEquipment");

// method to initiate and show this screen
plenty_admin.UI.organization.init = function(org, hash){
	//set the current organization
	plenty_admin.DATA.current_organization = org;
	
	plenty_admin.DATA.data_source = plenty_admin.DATA.current_organization;
	
	//show organization template if it is not visible
	if(!plenty_admin.UI.organization.DOM.is(":visible")){
		plenty_admin.HELPER.showLoadingOverlay();
		plenty_admin.UI.currentScreen
		.fadeOut("normal", function(){
			plenty_admin.UI.currentScreen = plenty_admin.UI.organization.DOM;
			plenty_admin.UI.organization.populate(org, hash);
			plenty_admin.UI.organization.populate_farms_filter();
			
			plenty_admin.DATA.eventCollector = window.eventcollector(3, 10000);
			plenty_admin.REST.getCropTypes();
			plenty_admin.REST.getTillageTypes();
			plenty_admin.REST.getIrrigationTypes();
			
			plenty_admin.DATA.eventCollector.on('alldone', function(total) {
				plenty_admin.UI.organization.DOM.fadeIn("normal", function(){
					plenty_admin.HELPER.hideLoadingOverlay();
				});
			});	
		});
	}else{
		plenty_admin.HELPER.showLoadingOverlay();
		plenty_admin.UI.organization.populate(org, hash);
		plenty_admin.UI.organization.populate_farms_filter();
		plenty_admin.HELPER.hideLoadingOverlay();
	}
	
	plenty_admin.UI.organization.DOM
	.find("h1 a.back")
	.off("click")
	.on("click", function(){
		plenty_admin.UI.currentScreen
		.fadeOut("normal", function(){
			plenty_admin.UI.currentScreen = plenty_admin.UI.settings.DOM;
			plenty_admin.UI.currentScreen.fadeIn("normal");
		});
	})
	.end()
	.find("button.btn.add_to_organization")
	.off("click")
	.on("click", function(e){
		var modalContext = ["Add", "to", "insert"];
		var url = plenty_admin.UI.organization.tabs.DOM.find("li.active a[role='tab']").prop("href");
		var hash = url.substring(url.indexOf('#')+1);
		if(hash === "fields"){
			plenty_admin.UI.organization.show_add_field_modal();
		}else{
			plenty_admin.UI.organization.show_item_modal("add_to_organization", modalContext);
		}
		
	})
	.end()
	.find("button.delete_multiple")
	.off("click")
	.on("click", function(e){
		var selected_items = plenty_admin.UI.organization.tabs.DOM.find(".tab-pane.active tr td input[type='checkbox']:checked");
		console.log("selected_items:", selected_items);
		selected_items.each(function(){
			var itemId = $(this).closest("tr").data("id");
			plenty_admin.UI.organization.deleteX(itemId, plenty_admin.HELPER.get_singular_selected_hash());
		});
	})
	.end()
	.find("select.filter-by-farm")
	.off("change")
	.on("change", function(e){
		var _val = $(this).val();
		switch(_val){
			case "all":
				plenty_admin.UI.organization.DOM
				.find("table.fieldsList")
				.find("tbody tr")
				.show();
			break;
			
			default:
				plenty_admin.UI.organization.DOM
				.find("table.fieldsList")
				.find("tbody tr")
				.hide()
				.end()
				.find("tbody tr[data-farmid='"+$(e.target).val()+"']")
				.show();
		}
		
	})
}

plenty_admin.UI.organization.show_add_field_modal = function(){
	var current_org_address = plenty_admin.DATA.current_organization.addressLine1 + 
							(plenty_admin.DATA.current_organization.addressLine2 ? ", "+plenty_admin.DATA.current_organization.addressLine2 : "")+
							", "+plenty_admin.DATA.current_organization.city+
							", "+plenty_admin.DATA.current_organization.state+
							", "+plenty_admin.DATA.current_organization.zip;
			
	console.log("current_org_address", current_org_address);
	plenty_admin.UI.organization.MODAL_add_field
	.off("shown.bs.modal")
	.on("shown.bs.modal", function(){
		//TODO: Insert Lat/LNG of organization from reverse Geo
		plenty_admin.MAPS.geocode(current_org_address, function(results){
			console.log("results: ", results, results[0].geometry.location);
			
			//HACK to center us on Kansas
			var center = new google.maps.LatLng(38.017922, -95.494064);
			plenty_admin.MAPS.add_field('add-field-map-canvas', center /*results[0].geometry.location*/, plenty_admin.UI.map.minCLUZoom, plenty_admin.UI.organization.MODAL_add_field.find(".modal-body"));
		});
	})
	.off("show.bs.modal")
	.on('show.bs.modal', function () {
		$(this).find('.modal-content').css('height', $( window ).height()*0.9);
	})
	.modal("show");
}

plenty_admin.UI.organization.show_edit_field_modal = function(fieldData, el){
	plenty_admin.UI.organization.MODAL_edit_field
	.off("shown.bs.modal")
	.on("shown.bs.modal", function(){
		plenty_admin.MAPS.edit_field(fieldData);
	})
	.off("show.bs.modal")
	.on('show.bs.modal', function () {
		$(this).find('.modal-content').css('height', $( window ).height()*0.9);
	})
	.modal("show");
}

plenty_admin.UI.organization.show_item_modal = function(modal, context, itemId, el){
	console.log("plenty_admin.UI.organization.show_item_modal", modal, context, itemId);
	//show the item modal of a specific entity
	// get the item hash type
	var url = plenty_admin.UI.organization.tabs.DOM.find("li.active a[role='tab']").prop("href");
	//var hash = url.substring(url.indexOf('#')+1);
	var hash = plenty_admin.UI.organization.tabs.DOM.find("li.active").data("hash");
	var hashSingular = plenty_admin.HELPER.get_singular_selected_hash(hash);
	var currentSub = plenty_admin.DATA.current_organization[hash];
	
	switch(context[2]){
		case "update":
		case "delete":
			var currentItem = $.grep(currentSub, function(el, i){
				if(hash === "fieldsAndCropTypes"){
					return el.field.id === itemId;
				}else{
					return el.id === itemId;
				}
			})[0];
			var modalTitle = context[0]+" "+currentItem.name+" "+context[1]+" "+plenty_admin.DATA.current_organization.name;
			console.log("currentItem", currentItem);
		break;
		
		case "add":
			var modalTitle = "Add a "+hash;
		break;
		
		default:
			
	}
	
	
	//console.log("item: ", item);
	//correct the language for the modal header
	var prep = (hash == "equipment" ? " a piece of " : " a ");
	
	//set up the modal before showing
	plenty_admin.UI.organization["MODAL_"+modal]
	.removeClass("farms users equipments products plans skills payments")
	.addClass(hash)
	.on("hidden.bs.modal", function(){
		$(this)
		.find("button."+context[0].toLowerCase())
		.button("reset");
	})
	.find(".modal-title")
	.text(modalTitle)
	.end()
	.find("button."+context[0].toLowerCase())
	.off("click")
	.on("click", function(e){
		$(this).button("loading");
		switch(context[2]){
			case "update":
				var item_form = $(this).closest(".modal").find(".modal-body form:visible");
				var item_object = plenty_admin.UI.organization.build_item(item_form, currentItem);
				plenty_admin.UI.organization[context[2]+"X"](item_object, hashSingular, el);
			break;
			
			case "delete":
				plenty_admin.UI.organization.deleteX(itemId, hashSingular, el, function(){
					console.log("item deleted");
					plenty_admin.UI.organization["MODAL_"+modal]
					.modal("hide");
				});
			break;
			
			default:
				var item_form = $(this).closest(".modal").find(".modal-body form:visible");
				var item_object = plenty_admin.UI.organization.build_item(item_form, (context[2] == "update" ? currentItem : null ));
				plenty_admin.UI.organization[context[2]+"X"](item_object, hashSingular, el);
		}
	})
	.button("reset");
	
	//get the form element
	var item_form = plenty_admin.UI.organization["MODAL_"+modal].find("form.add_to_org_form."+hash);
	
	//prefil the form if editing the entity
	switch(context[2]){
		case "update":
			plenty_admin.UI.organization.populate_form_from_item(item_form, itemId, hash);
		break;
		
		default:
		//clear the form
		item_form
		.find("input, textarea, select")
		.each(function(){
			if($(this).is("select")){
				$(this).find("option:eq(0)").prop("selected", true);
			}else{
				$(this).val("");
			}
		});
	}
	
	plenty_admin.UI.organization["MODAL_"+modal]
	.modal("show");
}

plenty_admin.UI.organization.deleteX = function(itemId, hash, evObj, callback){
	console.log("plenty_admin.UI.organization.deleteX", itemId, hash, evObj, callback);
	switch (hash){
		case "user":
			//get roles associated with user
			plenty_admin.REST.get_roles_with_userid(itemId, function(userRoles){
				console.log("user roles: ", userRoles, plenty_admin.DATA.current_organization.id);
				var RoleForUserInOrg = $.grep(userRoles, function(role, r){
					return role.organizationId === plenty_admin.DATA.current_organization.id;
				});
				
				console.log("RoleForUserInOrg", RoleForUserInOrg);
				
				// loop returned roles that match this org and delete them
				for(var r=0; r<RoleForUserInOrg.length; r++){
					var role = RoleForUserInOrg[r];
					
					//delete the provided data of the provided hash type
					plenty_admin.REST.deleteRole.delete(role.id)
					.then(
						function(userData){
							console.log(hash+" Deleted: ", userData);
							if(callback && typeof callback === "function"){
								callback();
							}
							$(evObj).closest("tr").remove();
							
							var remainingUsers = $.grep(plenty_admin.DATA.current_organization.users, function(user, u){
								return user.id !== itemId;
							});
							
							plenty_admin.DATA.data_source.users = remainingUsers;
						}
					);
				}
			});
		break;
		
		case "field":
			//delete interest
			//get the interest Id
			plenty_admin.REST.get_interests_by_field(itemId, function(interests){
				console.log("got all interests for field", interests);
				//find the one that matches this organization
				var currentOrgInterests = $.grep(interests, function(interest, i){
					return interest.organizationId === plenty_admin.DATA.data_source.id;
				})[0];
				
				
				//delete the provided data of the provided hash type
				plenty_admin.REST.deleteInterest.delete(currentOrgInterests.id)
				.then(
					function(interestData){
						console.log(hash+" Deleted: ", interestData);
						if(callback && typeof callback === "function"){
							callback();
						}
						$(evObj).closest("tr").remove();
						
						var remainingFields = $.grep(plenty_admin.DATA.data_source.fieldsAndCropTypes, function(field, f){
							return field.field.id !== itemId;
						});
						
						plenty_admin.DATA.data_source.fields = remainingFields;
					}
				);
			});
			
		break;
		
		default:
		//delete the provided data of the provided hash type
		plenty_admin.REST["delete"+plenty_admin.HELPER.capitalizeFirstLetter(hash)].delete(itemId)
			.then(
				function(){
					console.log(hash+" Deleted");
				});
		}
}	

plenty_admin.UI.organization.insertX = function(itemId, hash){
	//insert the provided data of the provided hash type
	plenty_admin.REST["insert"+plenty_admin.HELPER.capitalizeFirstLetter(hash)].post(itemId)
		.then(
			function(data){
				console.log(hash+" Inserted: ", data);
				var data_body = data.body();
				
				plenty_admin.UI.organization.MODAL_add_to_organization.modal("hide");
				
				//add custom functionality for each hash type where necessary
				switch (hash){
					case "user":
						var roleData = {
							organizationId:plenty_admin.DATA.current_organization.id,
							userId: data_body.id,
							roleTypeId:1
						};
						plenty_admin.REST.insertRole.post(roleData).then(function(newUser){
							
							var user_body = newUser.body();
							
							plenty_admin.REST.get_user_with_id(user_body.userId, function(user){
								//add user to the data set locally
								plenty_admin.DATA.current_organization.users.push(user);
								
								// add the new user to the table and to the data model
								var $userHTML = $(plenty_admin.UI.create_item(user, hash));
								
								plenty_admin.UI.organization.DOM.find("table.usersList")
								.find(".noItemsText")
								.remove()
								.end()
								.append($userHTML);
								
								plenty_admin.UI.organization.addItemFunctionality($userHTML);
							});
						});
					break;
				}
			});
}

plenty_admin.UI.organization.updateX = function(new_item, hash, el, callback){
	//insert the provided data of the provided hash type
	plenty_admin.REST["update"+plenty_admin.HELPER.capitalizeFirstLetter(hash)].put(new_item)
		.then(
			function(updatedX){
				console.log(hash+" Updated: ", updatedX, updatedX.body());
				
				//update entries in the table
				plenty_admin.UI.update_entries_in_table(el, updatedX.body());
				plenty_admin.UI.organization.MODAL_edit_in_organization.modal("hide");
				
				if(callback && typeof callback === "function"){
					callback(updatedX.body());
				}
			});
}

plenty_admin.UI.update_entries_in_table = function(el, newData){
	var $row = $(el).closest("tr");
	for (p in newData) {
		if (newData.hasOwnProperty(p) )  {
			$row.find("td."+p+" span").text(newData[p]);
		}
	}
}


plenty_admin.UI.organization.tabs.DOM
.off("shown.bs.tab")
.on('shown.bs.tab', function (e) {
	var url = e.target.href;
	var hash = url.substring(url.indexOf('#'));
	//store ref to the event object
	var orgId = plenty_admin.UI.organization.DOM.data("orgId");
	
	//trigger the change in selection in the sidebar
	plenty_admin.UI.sideBar.organizations.select_sub(orgId, hash);
	
	// show / hide delete button if checkboxes are selected
	var numChecked = plenty_admin.UI.organization.tabs.DOM.find(".tab-pane.active tr td input[type='checkbox']:checked").length;

	if(numChecked > 0){
		plenty_admin.UI.organization.BUTTON_delete_multiple.fadeIn("fast");
	}else{
		plenty_admin.UI.organization.BUTTON_delete_multiple.fadeOut("fast");
	}
	
	//hide "Add" on the farms tab
	//A farm can only be added when creating a field
	//A farm is deleted when no fields exist in it
	//But the details of a farm, it's name, can be edited inline
	switch(hash){
		case "#farms":
			plenty_admin.UI.organization.tabs.DOM
			.find(".add_delete_controls")
			.fadeOut("fast")
			.end()
			.find(".alert.farm-info")
			.fadeIn("fast")
			.end()
			.find(".filter-by-farm-group")
			.hide();
		break;
		
		case "#fields":
			plenty_admin.UI.organization.tabs.DOM
			.find(".filter-by-farm-group")
			.show()
			.end()
			.find(".add_delete_controls")
			.fadeIn("fast")
			.end()
			.find(".alert.farm-info")
			.fadeOut("fast");
		break;
		
		default:
			plenty_admin.UI.organization.tabs.DOM
			.find(".filter-by-farm-group")
			.fadeOut("fast")
			.end()
			.find(".add_delete_controls")
			.fadeIn("fast")
			.end()
			.find(".alert.farm-info")
			.fadeOut("fast");
		break;
	}
});

plenty_admin.UI.organization.items = function(itemList, hash){
	//console.log("plenty_admin.UI.organization.items: ", itemList, hash);
	if(itemList.length <= 0){
		var itemsHTML = "<h3 class='noItemsText'>No items in this set yet!</h3>";
	}else if(itemList instanceof Object && !Array.isArray(itemList)){
		var itemsHTML = "<h3 class='noItemsText'>No properties in this object yet!</h3>";
	}else{
		var itemData = (hash == "fieldsAndCropTypes" ? itemList[0].field : itemList[0]);
		var itemsHTML = plenty_admin.UI.create_header_row(itemData, hash);
		itemsHTML += '<tbody>';
		for(var i=0; i< itemList.length; i++){
			var item = itemList[i];
			itemsHTML += plenty_admin.UI.create_item(item, hash);
		}
		itemsHTML += '</tbody>';
	}
	
	var $itemsHTML = $(itemsHTML);
	
	return plenty_admin.UI.organization.addItemFunctionality($itemsHTML);
}
plenty_admin.UI.organization.showFieldPage = function(fieldObj){
	console.log("showFieldPage: ", fieldObj);
	//build the breadcrumb trail object
	var field_breadcrumb = [
		{
			class:"back toSettings",
			name:"Settings",
			clickHandler:function(){
				plenty_admin.UI.currentScreen
				.fadeOut("normal", function(){
					plenty_admin.UI.currentScreen = plenty_admin.UI.settings.DOM;
					plenty_admin.UI.currentScreen.fadeIn("normal");
				});
				return false;
			}
		},
		{
			class:"back toOrganization",
			name:plenty_admin.DATA.current_organization.name,
			clickHandler:function(){
				plenty_admin.UI.currentScreen
				.fadeOut("normal", function(){
					plenty_admin.UI.currentScreen = plenty_admin.UI.organization.DOM;
					plenty_admin.UI.currentScreen.fadeIn("normal");
				});
				return false;
			}
		},
		{
			class:"active",
			name:fieldObj.name,
			clickHandler:null
		}
	];
	
	plenty_admin.UI.field.DOM
	.find(".breadcrumb-trail")
	.remove()
	.end()
	.prepend(plenty_admin.UI.build_breadcrumb_trail(field_breadcrumb));
						
	//build the field view
	plenty_admin.UI.field.init(fieldObj, "settings");
}
plenty_admin.UI.organization.addItemFunctionality = function($itemHTML){
	// add functionality here
	$itemHTML
	.find("td input[type='checkbox']")
	.off("click")
	.on("click", function(e){
		// check number of checked checkboxes
		var numChecked = $(e.target).closest("tbody").find("tr td input[type='checkbox']:checked").length;
		if(numChecked > 0){
			plenty_admin.UI.organization.BUTTON_delete_multiple.fadeIn("fast");
		}else{
			plenty_admin.UI.organization.BUTTON_delete_multiple.fadeOut("fast");
		}
	})
	.end()
	.find("td button.btn.editItem")
	.off("click")
	.on("click", function(e){
		var thisTR = $(this).closest("tr");
		// edit entire entry
		var modalContext = ["Update", "in", "update"];
		var itemId = thisTR.data("id");
		
		switch(thisTR.data("hash")){
			case "fieldsAndCropTypes":
				var fieldObj  = $.grep(plenty_admin.DATA.data_source.fieldsAndCropTypes, function(field, f){
					return field.field.id === itemId;
				})[0].field;
				
				plenty_admin.UI.organization.show_edit_field_modal(fieldObj, e.target);
			break;
			
			default:
				plenty_admin.UI.organization.show_item_modal("edit_in_organization", modalContext, itemId, e.target);
		}
	})
	.end()
	.find("td button.btn.deleteItem")
	.off("click")
	.on("click", function(e){
		var itemId = $(this).closest("tr").data("id");
		var modalContext = ["Remove", "from", "delete"];
		
		plenty_admin.UI.organization.show_item_modal("confirm_delete", modalContext, itemId, e.target);
	})
	.end()
	.find("td.map_thumbnail a")
	.click(function(e){
		var itemId = $(e.target).closest("tr").data("id");
		
		var fieldObj = $.grep(plenty_admin.DATA.current_organization.fieldsAndCropTypes, function(_item, i){
			return _item.field.id === itemId;
		})[0].field;
		
		plenty_admin.UI.organization.showFieldPage(fieldObj);
		return false;
	});
	
	return $itemHTML;
}

plenty_admin.UI.create_header_row = function(item, hash){
	//console.log("plenty_admin.UI.create_header_row: ", item, hash);
	//open the table head
	var domHTML = '<thead><tr>';
		domHTML += '<th class="select" style="width:60px;">Select</th>';
		
		if(hash === "fieldsAndCropTypes"){
			domHTML += '<th class="select" style="width:100px;">Preview</th>';
		}
		
		if (item.hasOwnProperty("name")){
			domHTML += '<th>Name</th>';
		}
		if (item.hasOwnProperty("firstName")){
			domHTML += '<th>First Name</th>';
		}
		if (item.hasOwnProperty("lastName")){
			domHTML += '<th>Last Name</th>';
		}
		for (p in item) {
			if (item.hasOwnProperty(p) )  {
				if(
					// exclude a few fields from the table
					p !== "id" 
					&& p !== "name"
					&& p !== "firstName" 
					&& p !== "lastName"
					&& p !== "created"
					&& p !== "lastModified"
					&& p !== "enabled"
					&& p !== "farmId"
				){
					var correctedHeader = "";
					var headerWidth = "";
					switch(p){
						case "lastModified":
							correctedHeader = "Last Modified";
						break;
						
						case "mobileNumber":
							correctedHeader = "Mobile #";
						break;
						
						case "postalCode":
							correctedHeader = "ZIP";
						break;
						
						case "weatherForecastCity":
							correctedHeader = "City";
						break;
						
						case "weatherForecastState":
							correctedHeader = "State";
						break;
						
						case "latitude":
							correctedHeader = "Lat";
						break;
						
						case "longitude":
							correctedHeader = "Lon";
						break;
						
						default:
							correctedHeader = p;
					}
					
					if(Array.isArray(item[p])){
						correctedHeader = "# "+correctedHeader;
					}
					
					domHTML += '<th class="text-capitalize">'+correctedHeader+'</th>';
				}
			}
		}
	domHTML += '<th class="text-right prn">Controls</th>';
	domHTML += '</tr></thead>';
	return domHTML;

}

plenty_admin.UI.create_item = function(item, hash){
	console.log("plenty_admin.UI.create_item: ", item, hash);
	if(hash === "fieldsAndCropTypes"){
		var itemData = (item.id ? item : item.field);
		plenty_admin.REST.fields.getAllBoundaryPointsByFieldAndBoundaryType(itemData.id, 2 /* We are only interested in field boundaries here*/, function(boundaries){
			//console.log("got boundaries for field: ", boundaries);
			
			var bounds = new google.maps.LatLngBounds();	
			boundaries.forEach(function(xy, i) {
				bounds.extend(new google.maps.LatLng(xy.latitude, xy.longitude));
			});
			
			var fieldCenter = bounds.getCenter();
			
			//console.log("fieldCenter", fieldCenter);
		  
			var pathString = "color:0x758e1b|weight:2";
			boundaries.forEach(function(boundary, b){
				pathString += "|" + boundary.latitude+","+boundary.longitude
			});
			
			staticMapParams = {
				center:fieldCenter.lat()+","+fieldCenter.lng(),
				size:"80x80",
				maptype:"hybrid",
				zoom: plenty_admin.MAPS.getBoundsZoomLevel(bounds, {width:80, height:80}),
				path:pathString
			};
			
			//console.log("staticMapParams: ", staticMapParams);
			
			var thumb_url = plenty_admin.MAPS.get_static_maps_url(staticMapParams);
			var field_thumb = plenty_admin.UI.organization.DOM
				.find("table.fieldsList")
				.find("tbody tr[data-id='"+itemData.id+"'] td.map_thumbnail img");
			set_thumb_url(thumb_url);
			
			function set_thumb_url(thumb_url){
				if(field_thumb.length > 0){
					field_thumb
					.prop("src", thumb_url);
				}else{
					var to = setTimeout(function(){
						console.log("checking field dom element");
						set_thumb_url(thumb_url);
					}, 300);
				}
			}
		});
	}else{
		var itemData = item;
	}
	
	var domHTML = '<tr class="reveal-on-hover-wrap '+
					hash+
					'" data-id="'+itemData.id+
					'" data-hash="'+hash+
					'" '+(hash === "fieldsAndCropTypes" ? "data-farmid='"+itemData.farmId+"'" : "")+
					'>';
					
					domHTML += '<td><input type="checkbox" aria-label="..."></td>';
					
					if(hash === "fieldsAndCropTypes"){
						domHTML += '<td class="map_thumbnail" style="width:80px;"><a href=""><img src="" width="80" height="80"/></a></td>';
					}
					
					if (itemData.hasOwnProperty("name")){
						domHTML += '<td class="name"><span class="editable" data-type="text" data-name="name" data-pk="x/'+hash+'/'+itemData.id+'" data-title="'+p+'">'+itemData["name"]+"</span></td>";
					}
					if (itemData.hasOwnProperty("firstName")){
						domHTML += '<td class="firstName"><span class="editable" data-type="text" data-name="firstName" data-pk="x/'+hash+'/'+itemData.id+'" data-title="'+p+'">'+itemData["firstName"]+'</span></td>';
					}
					if (itemData.hasOwnProperty("lastName")){
						domHTML += '<td class="lastName"><span class="editable" data-type="text" data-name="lastName" data-pk="x/'+hash+'/'+itemData.id+'" data-title="'+p+'">'+itemData["lastName"]+'</span></td>';
					}
					
					for (p in itemData) {
						if (itemData.hasOwnProperty(p) )  {
							if(
								// exclude a few fields from the table
								p !== "id" 
								&& p !== "name"
								&& p !== "firstName" 
								&& p !== "lastName"
								&& p !== "created"
								&& p !== "lastModified"
								&& p !== "enabled"
								&& p !== "farmId"
							){
								// process the data type if necessary before inserting it
								var tdata = "";
								switch(p){
									case "roleId":
										tdata = plenty_admin.REST.roleTypes[itemData[p]];
									break;
									
									case "latitude":
									case "longitude":
										tdata = "<span class='truncate truncate-80'>"+itemData[p]+"</span>";
									break;
									
									case "password":
										tdata = '<button type="button" class="btn btn-sm btn-primary sendPassword reveal-on-hover-element"><span class="fa fa-lock"></span> <span class="hidden-xs">Send Password</span></button>';
									break;
									
									default:
									tdata = itemData[p];
								}
								domHTML += 	'<td class="'+p+'"><span class="pull-left'+(p !== "created" && p !== 'lastModified' && p !== 'password' ? ' editable"' : '"')+
											(p !== "created" && p !== "lastModified" ? '  data-type="'+plenty_admin.HELPER.returnFieldType(p)+'" data-name="'+p+'" data-pk="x/'+hash+'/'+item.id+'" data-title="'+p+'"' : '')+
											(plenty_admin.HELPER.returnFieldType(p) === "select" ? plenty_admin.HELPER.returnInlineEditSelectOptions(p) : "" )+
											'>'+tdata+'</span></td>';
							}
						}
					}
			
					domHTML += '<td class="pln prn"><div class="btn-group pull-right mbn reveal-on-hover-element" role="group" aria-label="...">'+
									'<button type="button" class="btn btn-sm btn-primary editItem"><span class="glyphicon glyphicon-edit"></span> <span class="hidden-xs">Edit</span></button>'+
									(hash !== "farms" ? '<button type="button" class="btn btn-sm btn-danger deleteItem"><span class="glyphicon glyphicon-remove"></span><span class="hidden-xs">Remove</span></button>' : "")+
							   '</div></td>'+
					'</tr>';
	return domHTML;
}

plenty_admin.UI.organization.populate = function(org, hash){
	console.log("plenty_admin.UI.organization.populate: ", org, hash);
	
	//set the organization ID on the DOM element
	plenty_admin.UI.organization.DOM
	.data("orgId", org.id);
	
	//loop properties in the organization and populate them based on their type
	for (i in org) {
		if (org.hasOwnProperty(i)) {
			console.log("list org properties: ", i, org[i], typeof org[i]);
			switch(typeof org[i]){
				case "string":
				case "number":
					var textValue = "";
					switch (i){
						case "organizationTypeId":
							textValue = plenty_admin.DATA.organizationTypes[org[i]].name;
						break;
						
						default:
						textValue = org[i];
					}
					
					//set the inline editing API call reference
					plenty_admin.UI.organization.DOM.find(".org-"+i)
					.text(textValue)
					.data("pk", org.id+"/organizations")
					//.editable("destroy")
					.editable(plenty_admin.REST.inline_editing_options);
				break;
				
				case "object":
				
					if(i === "fieldsAndCropTypes"){
						var $panel = plenty_admin.UI.organization.DOM.find("table.fieldsList");
					}else{
						var $panel = plenty_admin.UI.organization.DOM.find("table."+i+"List");
					}
					
					$panel
					.html("")
					.append(plenty_admin.UI.organization.items(org[i], i))
					.find(".editable")
					.editable(plenty_admin.REST.inline_editing_options);
				break;
			}
		}
	}
	
	// convert radio buttons to switches where appropriate
	//$("input[type='checkbox'].switch").bootstrapSwitch();
	
	//select the correct tab
	if(hash){
		plenty_admin.UI.organization.switchTab(hash);
	}
	
	plenty_admin.HELPER.hideLoadingOverlay();
}

plenty_admin.UI.organization.build_item = function(form, item){
	console.log("form: ", form, item);
	var add_new_data = {};
	
	add_new_data.id = (item ? item.id : null);
	add_new_data.created = (item ? item.created : null);
	add_new_data.lastModified = (item ? item.lastModified : null);
	
	form
	.find("input, textarea, select")
	.each(function(){
		switch($(this).prop("type")){
			case "checkbox":
				add_new_data[$(this).data("propname")] = $(this).is(":checked");
			break;
			
			default:
			add_new_data[$(this).data("propname")] = $(this).val();
		}
	});
	
	console.log("add_new_data", add_new_data);
	// add fields from the form to the returned data object
	return add_new_data;
}

//populate the farms filter in the fields panel
plenty_admin.UI.organization.populate_farms_filter = function(){
	//clear current options
	plenty_admin.UI.organization.filter_by_farm
	.find("option")
	.remove();
	
	var farmOptionsHTML = "<option value='all'>All Farms</option>";
	for(var f=0; f<plenty_admin.DATA.current_organization.farms.length; f++){
		var farm = plenty_admin.DATA.current_organization.farms[f];
		farmOptionsHTML += "<option value='"+farm.id+"'>"+farm.name+"</option>";
	}
	
	plenty_admin.UI.organization.filter_by_farm.append(farmOptionsHTML);
}

plenty_admin.UI.organization.populate_form_from_item = function(form, itemId, hash){
	console.log("populate_form_from_item: ", form, itemId, hash);
	
	var itemData = $.grep(plenty_admin.DATA.current_organization[hash], function(_item, i){
		return _item.id === itemId
	})[0];
	
	console.log("itemData", itemData);
	
	form
	.find("input, textarea, select")
	.each(function(){
		switch($(this).prop("type")){
			case "checkbox":
				console.log("found a checkbox: ", $(this), itemData[$(this).data("propname")]);
				$(this).prop("checked", itemData[$(this).data("propname")]);
				//$(this).bootstrapSwitch('state', itemData[$(this).data("propname")]);
			break;
			
			default:
			$(this).val(itemData[$(this).data("propname")]);
		}
		
	});
}

plenty_admin.UI.organization.switchTab = function(hash){
	plenty_admin.UI.organization.tabs.DOM.find(".nav-tabs a[role='tab'][href='"+hash+"']").tab('show');
}