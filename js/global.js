'use strict';
//define namespaces for global functionality sets
var plenty_admin = {};
plenty_admin.UI = {};
plenty_admin.UI.DOM = $("body");
plenty_admin.UI.loadingOverlay = plenty_admin.UI.DOM.find("#loadingOverlay");			

//an array of font icon class names to check against;
plenty_admin.UI.fontIconClasses = [
	"moisture-sensor",
	"pest-control",
	"harvest",
	"soil-test",
	"planting",
	"fertilizer",
	"tilling",
	"late-nitrogen",
	"early-nitrogen",
	"spreader",
	"sprayer",
	"grain-cart",
	"combine",
	"offset-disk",
	"atv",
	"pipe",
	"spray-plane",
	"tractor",
	"well",
	"planter",
	"grain-truck"
];		

//build the brand palette object
plenty_admin.UI.brand_palette = new Rainbow();
plenty_admin.UI.brand_palette.setSpectrum("#0076b2", "#93b222", "#788912");

/* ********* REST API global interface ************ */
//set up RESTFul API credentials
plenty_admin.REST = {};
plenty_admin.REST.URL = '52.5.118.250:8080/plenty';
plenty_admin.REST.fullURL = "http://"+plenty_admin.REST.URL;

/* set up the timezone conversion library */
/*
timezoneJS.timezone.zoneFileBasePath = 'js/tz';
timezoneJS.timezone.init({ callback: function(ev){
	console.log("timezone-js is now ready: ", ev);
} });
*/

plenty_admin.init = function(context){
	plenty_admin.context = context;
	//setup the logout link
	plenty_admin.UI.DOM
	.find(".navbar li.logout a")
	.click(function(){
		store.remove("plenty_username"); //remove the stored username
		store.get("basicAuth"); // remove the stored auth key
		location.href = "/";
		return false;
	});
	
	//set up a global event handler for modal popups
	$('body')
	.on('shown.bs.modal', '.modal', function () {
		console.log('we have shown a modal');
		$('body')
		.find(".page-container")
		.addClass("blur");
	})
	.on('hidden.bs.modal', '.modal', function () {
		console.log('we have hidden a modal');
		$('body')
		.find(".page-container")
		.removeClass("blur");
	});

	//get the logged in user's details
	plenty_admin.REST.get_user_with_username(store.get("plenty_username"), function(response){
		plenty_admin.DATA.userDetails = response;
		console.log("userDetails: ", plenty_admin.DATA.userDetails, context); // user logged in successfully
		
		//insert user detils into head of page
		plenty_admin.UI.DOM
		.find("#navbar .navbar-right .userFName")
		.text(plenty_admin.DATA.userDetails.firstName)
		.end()
		.find("#navbar .navbar-right .userLName")
		.text(plenty_admin.DATA.userDetails.lastName)
		.parent()
		.fadeIn("fast");
		
		switch (context){
			case "settings":
				// load all dependency packages befire initiating the settings
				plenty_admin.DATA.load_user_organizations(function(orgsForUser){
					plenty_admin.DATA.getInitialOrganizationData(orgsForUser, function(){
						plenty_admin.DATA.eventCollector = window.eventcollector(5, 10000);
						plenty_admin.REST.getEquipmentTypes();
						plenty_admin.REST.getRoleTypes();
						plenty_admin.REST.getOrganizationTypes();
						plenty_admin.REST.getBoundaryTypes();
						plenty_admin.REST.getGrowthMethods();
						plenty_admin.DATA.eventCollector.on('done', function(fired, total, data) {
						  //console.log('event %d of %d emitted', fired, total);
						  //console.log('event description:', data);
						});
						
						plenty_admin.DATA.eventCollector.on('alldone', function(total) {
							$( document ).trigger( "organization_data_ready", [ plenty_admin.DATA.organizations ] );
							plenty_admin.HELPER.hideLoadingOverlay();
						});	
					});
				});
			break;
			
			case "map":
				// load all dependency packages before initiating the map
				plenty_admin.DATA.load_user_organizations(function(orgsForUser){
					plenty_admin.DATA.organizations = {};
					var _orgsBody = orgsForUser.body();
					
					//loop organizations and add them to the map page
					for(var o = 0; o < _orgsBody.length; o++){
						var org_data = _orgsBody[o].data();
						plenty_admin.DATA.organizations[org_data.id] = org_data;
					}
					
					plenty_admin.HELPER.hideLoadingOverlay();
					$( document ).trigger( "map_data_ready" );
				});
				
			break;
			
			case "dashboard":
				plenty_admin.HELPER.hideLoadingOverlay();
				$( document ).trigger( "dashboard_data_ready", [ plenty_admin.DATA.organizations ] );
			break;
			
			case "plans":
				$( document ).trigger( "plans_data_ready");
			break;
		}
	});
}

plenty_admin.REST.make_base_auth = function(user, password) {
  var tok = user + ':' + password;
  var hash = btoa(tok);
  var basicAuth = "Basic " + hash;
  console.log("basicAuth:", basicAuth);
  return basicAuth;
}

plenty_admin.api = restful(plenty_admin.REST.URL);

//set authorization header on the API object
plenty_admin.api.header("Authorization", store.get("basicAuth"));
//plenty_admin.api.header("timeout", 10000);

// method to define exactly which object needs updating when inline editing
plenty_admin.REST.getDataForEditable = function(updateProperties, propName, propValue){
	console.log("get data for this element: ", updateProperties, propName, propValue);
	
	var updateData = null;
	
	switch(updateProperties[1]){
		case "organizations":
			var initialOrgData = plenty_admin.DATA.organizations[updateProperties[0]];
			updateData = {};
			//create the base organization object to send with ajax post requests
			updateData.organizationTypeId = initialOrgData.organizationTypeId
			updateData.name = initialOrgData.name;
			updateData.addressLine1 = initialOrgData.addressLine1;
			updateData.addressLine2 = initialOrgData.addressLine2;
			updateData.city = initialOrgData.city;
			updateData.state = initialOrgData.state;
			updateData.zip = initialOrgData.zip;
			updateData.id = initialOrgData.id;
			updateData.created = initialOrgData.created;
			updateData.lastModified = initialOrgData.lastModified;
			updateData[propName] = propValue;
		break;
		
		case "users":
			updateData = $.grep(plenty_admin.DATA.current_organization.users, function(user, u){
				return user.id === parseInt(updateProperties[2]);
			})[0];
			updateData[propName] = propValue;
		break;
		
		case "fields":
			updateData = $.grep(plenty_admin.DATA.current_farm.fields, function(field, f){
				return field.id === parseInt(updateProperties[2]);
			})[0];
			updateData[propName] = propValue;
		break;
		
		case "fieldCrop":
			updateData = {};
			switch(propName){
				case "cropTypeId":
					updateData.id = parseInt(updateProperties[0]);
					updateData.cropTypeId = parseInt(propValue);
					updateData.tillageTypeId = parseInt(updateProperties[3]);
					updateData.irrigationTypeId = parseInt(updateProperties[4]);
					updateData.year = updateProperties[5];
					updateData.fieldId = parseInt(updateProperties[6]);
				break;
				
				case "tillageTypeId":
					updateData.id = parseInt(updateProperties[0]);
					updateData.cropTypeId = parseInt(updateProperties[2]);
					updateData.tillageTypeId = parseInt(propValue);
					updateData.irrigationTypeId = parseInt(updateProperties[4]);
					updateData.year = updateProperties[5];
					updateData.fieldId = parseInt(updateProperties[6]);
				break;
				
				case "irrigationTypeId":
					updateData.id = parseInt(updateProperties[0]);
					updateData.cropTypeId = parseInt(updateProperties[2]);
					updateData.tillageTypeId = parseInt(updateProperties[3]);
					updateData.irrigationTypeId = parseInt(propValue);
					updateData.year = updateProperties[5];
					updateData.fieldId = parseInt(updateProperties[6]);
				break;
				
				case "year":
					updateData.id = parseInt(updateProperties[0]);
					updateData.cropTypeId = parseInt(updateProperties[2]);
					updateData.tillageTypeId = parseInt(updateProperties[3]);
					updateData.irrigationTypeId = parseInt(updateProperties[4]);
					updateData.year = propValue
					updateData.fieldId = parseInt(updateProperties[6]);
				break;
			}
		break;
	}
	
	console.log("Data object to send in post: ", updateData);
	return updateData;
}


// return the options for inline editing including data object to be sent and URL for ajax request
plenty_admin.REST.inline_editing_options = {
			//params: plenty_admin.REST.getParamsForEditable,
			url:function(args){
				console.log("generate url: ", args);
				var $this = $(this);
				var d = new $.Deferred;
				
				//split the arguements if it is a slash separated string
				var updateProperties = args.pk.split("/");
				
				console.log("updateProperties", updateProperties);
				
				var RESTCall = "";
	
				switch(updateProperties[1]){
					case "organizations":
						RESTCall = "organizations/updateOrganization";
					break;
					
					case "users":
						RESTCall = "users/updateUser";
					break;
					
					case "fieldsAndCropTypes":
						RESTCall = "fields/updateField";
					break;
					
					case "fieldCrop":
						RESTCall = "fieldCrops/updateFieldCrop";
					break;
				}
				
				$.ajax({
				  url: plenty_admin.REST.fullURL+"/"+RESTCall,
				  type:"POST",
				  dataType: 'json',
				  processData: false,
				  headers:{"Authorization":store.get("basicAuth")},
    			  contentType: 'application/json;charset=UTF-8',
				  data:JSON.stringify(plenty_admin.REST.getDataForEditable(updateProperties, args.name, args.value))
				}).success(function(returnData) {
					d.resolve();
					$this.editable("hide");
				}).error(function(){
					console.error("inline editing commit failed");
				});
	
				return d.promise();
			}
			
	}

plenty_admin.DATA = {};
plenty_admin.DATA.getInitialOrganizationData = function(orgs, callback){
	var _orgsBody = orgs.body();
	//console.log("getInitialOrganizationData: ", _orgsBody);
	plenty_admin.DATA.organizations = {};
	plenty_admin.DATA.organizations.length = 0;
	
	//create the organization API collection
	plenty_admin.REST.getInitialDataForOrganization = plenty_admin.api.all("settings/getInitialDataForOrganization");
	
	//loop organizations and add them to the dashboard
	for(var o = 0; o < _orgsBody.length; o++){
		var org_data = _orgsBody[o].data();
		plenty_admin.DATA.organizations[org_data.id] = org_data;
		//console.log("looping orgs: ", org_data, o);
		//get dashboard per organization in this loop, then build the dashboard org element
		
		plenty_admin.REST.getInitialDataForOrganization
		.get(org_data.id)
		.then(function(org_sub){
			//console.log("Organization initial data: ", org_sub);
			var org_sub_body = org_sub.body();
			var org_sub_data = org_sub_body.data();
			//console.log("org_initial_data: ", org_sub_data, plenty_admin.DATA.organizations, plenty_admin.DATA.organizations[org_sub_data.organizationId]);
			
			
			var full_org = $.extend({}, plenty_admin.DATA.organizations[org_sub_data.organizationId], org_sub_data);
			//console.log("full_org: ", full_org);
			plenty_admin.DATA.organizations[full_org.id] = full_org;
			plenty_admin.DATA.organizations.length += 1;
			
			if(plenty_admin.DATA.organizations.length === _orgsBody.length && callback && typeof callback === "function"){
				callback();
			}
		});
	}
}

plenty_admin.DATA.timezones = [
	{value:"AST", text:"Alaska Standard Time"},
	{value:"CST", text:"Central Standard Time"},
	{value:"EST", text:"Eastern Standard Time"},
	{value:"MST", text:"Mountain Standard Time"},
	{value:"PST", text:"Pacific Standard Time"}
];

plenty_admin.DATA.load_user_organizations = function(callback){
	plenty_admin.REST.getOrganizationsForUser = plenty_admin.api.one("settings/getOrganizationsForUser", plenty_admin.DATA.userDetails.id);
	plenty_admin.REST.getOrganizationsForUser.get().then(function(orgsForUser){
			console.log("orgsForUser: ", orgsForUser);
			if(callback && typeof callback === "function"){
				callback(orgsForUser);
			}
		}
	);
}

plenty_admin.DATA.load_user_filters = function(callback){
	plenty_admin.REST.getFiltersByUser = plenty_admin.api.one("login/getFilterForUserAndCreateIfNotFound", plenty_admin.DATA.userDetails.id);
	plenty_admin.REST.getFiltersByUser.get().then(function(filtersByUser){
			//console.log("filtersByUser: ", filtersByUser.body());
			if(callback && typeof callback === "function"){
				callback(filtersByUser);
			}
		}
	);
}

// process data returned from the REST API using restFul.js into an object with ID handles
plenty_admin.REST.get_object_from_data = function(returnData){
	var dataTypes = {};
	for(var r=0; r<returnData.length; r++){
		data = returnData[r].data();
		dataTypes[data.id] = data;
	}
	return dataTypes;
}

// process data returned from the REST API using restFul.js into an object with ID handles
plenty_admin.REST.get_array_from_data = function(returnData){
	var dataTypes = [];
	for(var r=0; r<returnData.length; r++){
		data = returnData[r].data();
		dataTypes.push(data);
	}
	return dataTypes;
}

// get all equipment types and store them
plenty_admin.REST.equipmentTypes = plenty_admin.api.all("equipmentTypes/getAllEquipmentTypes");
plenty_admin.REST.getEquipmentTypes = function(){
	plenty_admin.DATA.equipmentTypes = {};
	plenty_admin.REST.equipmentTypes.getAll()
		.then(
			function(equipmentTypesReturn){
				plenty_admin.DATA.equipmentTypes = plenty_admin.REST.get_object_from_data(equipmentTypesReturn.body());
				console.log("Get equip types finished");
				
				//populate equipment type lists:
				var equipTypesHTML = "";
				for(var e=0; e< plenty_admin.DATA.equipmentTypes.length; e++){
					var equip = plenty_admin.DATA.equipmentTypes[e];
					equipTypesHTML += "<option value='"+equip.id+"'>"+equip.name+"</option>";
				}
				plenty_admin.UI.DOM
				.find(".equipment_type_list")
				.find("option")
				.remove()
				.append(equipTypesHTML);
				
				plenty_admin.DATA.eventCollector.done("equipment");
			});
}

// get all equipment types and store them
plenty_admin.REST.brandTypes = plenty_admin.api.all("brands/getAllBrands");
plenty_admin.REST.getBrandTypes = function(){
	plenty_admin.DATA.brandTypes = {};
	plenty_admin.REST.brandTypes.getAll()
		.then(
			function(brandTypesReturn){
				plenty_admin.DATA.brandTypes = plenty_admin.REST.get_object_from_data(brandTypesReturn.body());
				console.log("Get brand types finished");
				
				//populate equipment type lists:
				var brandTypesHTML = "";
				for(index in plenty_admin.DATA.brandTypes){
					if(plenty_admin.DATA.brandTypes.hasOwnProperty(index)){
						var brand = plenty_admin.DATA.brandTypes[index];
						brandTypesHTML += "<option value='"+brand.id+"'>"+brand.name+"</option>";
					}
				}
				plenty_admin.UI.DOM
				.find(".brand_type_list")
				.find("option")
				.remove()
				.append(brandTypesHTML);
				
				plenty_admin.DATA.eventCollector.done("Brands");
			});
}

// get all activity types and store them
plenty_admin.REST.activityTypes = plenty_admin.api.all("activityTypes/getAllActivityTypes");
plenty_admin.REST.getActivityTypes = function(){
	plenty_admin.DATA.activityTypes = {};
	plenty_admin.REST.activityTypes.getAll()
		.then(
			function(activityTypesReturn){
				plenty_admin.DATA.activityTypes = plenty_admin.REST.get_object_from_data(activityTypesReturn.body());
				console.log("Get activity types finished");
				
				plenty_admin.DATA.eventCollector.done("activities");
			},
			function(err){
				console.error("getting activity types failed: ", err);
			});
}


// get all role types and store them
plenty_admin.REST.roleTypes = plenty_admin.api.all("roleTypes/getAllRoleTypes");
plenty_admin.REST.getRoleTypes = function(){
	plenty_admin.DATA.roleTypes = {};
	plenty_admin.REST.roleTypes.getAll()
		.then(
			function(roleTypesReturn){
				plenty_admin.DATA.roleTypes = plenty_admin.REST.get_object_from_data(roleTypesReturn.body());
				console.log("Get role types finished");
				plenty_admin.DATA.eventCollector.done("roles");
			});
}

// get all crop types and store them
plenty_admin.REST.cropTypes = plenty_admin.api.all("cropTypes/getAllCropTypes");
plenty_admin.REST.getCropTypes = function(){
	plenty_admin.DATA.cropTypes = {};
	plenty_admin.REST.cropTypes.getAll()
		.then(
			function(cropTypesReturn){
				plenty_admin.DATA.cropTypes = plenty_admin.REST.get_object_from_data(cropTypesReturn.body());
				console.log("Get crop types finished");
				plenty_admin.DATA.eventCollector.done("event 1");
			});
}

// get all tillage types and store them
plenty_admin.REST.tillageTypes = plenty_admin.api.all("tillageType/getAllTillageTypes");
plenty_admin.REST.getTillageTypes = function(){
	plenty_admin.DATA.tillageTypes = {};
	plenty_admin.REST.tillageTypes.getAll()
		.then(
			function(tillageTypesReturn){
				plenty_admin.DATA.tillageTypes = plenty_admin.REST.get_object_from_data(tillageTypesReturn.body());
				console.log("Get tillage types finished");
				plenty_admin.DATA.eventCollector.done("event 2");
			});
}

// get all irrigation types and store them
plenty_admin.REST.irrigationTypes = plenty_admin.api.all("irrigationTypes/getAllIrrigationTypes");
plenty_admin.REST.getIrrigationTypes = function(){
	plenty_admin.DATA.irrigationTypes = {};
	plenty_admin.REST.irrigationTypes.getAll()
		.then(
			function(irrigationTypesReturn){
				plenty_admin.DATA.irrigationTypes = plenty_admin.REST.get_object_from_data(irrigationTypesReturn.body());
				console.log("Get irrigation types finished");
				plenty_admin.DATA.eventCollector.done("event 3");
			});
}

// get all organization types and store them
plenty_admin.REST.organizationTypes = plenty_admin.api.all("organizationTypes/getAllOrganizationTypes");
plenty_admin.REST.getOrganizationTypes = function(){
	plenty_admin.DATA.organizationTypes = {};
	plenty_admin.REST.organizationTypes.getAll()
		.then(
			function(orgTypes){
				plenty_admin.DATA.organizationTypes = plenty_admin.REST.get_object_from_data(orgTypes.body());
				console.log("Get org types finished");
				plenty_admin.DATA.eventCollector.done("event 3");
			});
}

// get all organization types and store them
plenty_admin.REST.boundaryTypes = plenty_admin.api.all("boundaryType/getAllBoundaryTypes");
plenty_admin.REST.getBoundaryTypes = function(){
	plenty_admin.DATA.boundaryTypes = {};
	plenty_admin.REST.boundaryTypes.getAll()
		.then(
			function(boundaryTypes){
				plenty_admin.DATA.boundaryTypes = plenty_admin.REST.get_object_from_data(boundaryTypes.body());
				console.log("Get boundary types finished");
				plenty_admin.DATA.eventCollector.done("event 4");
			});
}

// get all growth methods and store them
plenty_admin.REST.growthMethods = plenty_admin.api.all("cropStage/getAllGrowthMethods");
plenty_admin.REST.getGrowthMethods = function(){
	plenty_admin.DATA.growthMethods = {};
	plenty_admin.REST.growthMethods.getAll()
		.then(
			function(growthMethods){
				plenty_admin.DATA.growthMethods = plenty_admin.REST.get_object_from_data(growthMethods.body());
				console.log("Get growth methods finished");
				plenty_admin.DATA.eventCollector.done("growth methods");
			});
}

// get all organization types and store them
plenty_admin.REST.allUsers = plenty_admin.api.all("users/getAllUsers");
plenty_admin.REST.getAllUsers = function(callback){
	plenty_admin.DATA.allUsers = {};
	plenty_admin.REST.allUsers.getAll()
		.then(
			function(allUsers){
				plenty_admin.DATA.allUsers = plenty_admin.REST.get_object_from_data(allUsers.body());
				console.log("Get all users finished: ", plenty_admin.DATA.allUsers);
				
				if(callback && typeof callback === "function"){
					callback(allUsers);
				}
			});
}

plenty_admin.REST.get_user_with_username = function(username, callback){
	plenty_admin.REST.getUserWithUsername = plenty_admin.api.one("login/getUserWithUserName", username);
	plenty_admin.REST.getUserWithUsername.get().then(function(response){
		console.log("getUserWithUserName", response.body()());
		if(callback && typeof callback === "function"){
			callback(response.body()());
		}
	});
}

plenty_admin.REST.get_user_with_id = function(id, callback){
	plenty_admin.REST.getUserWithId = plenty_admin.api.one("users/getUser", id);
	plenty_admin.REST.getUserWithId.get().then(function(response){
		if(callback && typeof callback === "function"){
			var response_body = response.body();
			response_data = response_body.data();
			callback(response_data);
		}
	});
}

plenty_admin.REST.get_roles_with_userid = function(id, callback){
	plenty_admin.REST.getUserWithId = plenty_admin.api.one("role/getRolesWithUserId", id);
	plenty_admin.REST.getUserWithId.get().then(function(response){
		if(callback && typeof callback === "function"){
			var response_body = response.body();
			var roles = [];
			for(var r=0; r<response_body.length; r++){
				var role = response_body[r].data();
				roles.push(role);
			}
			console.log("roles: ", roles);
			callback(roles);
		}
	});
}

plenty_admin.REST.get_interests_by_field = function(id, callback){
	plenty_admin.REST.getAllInterestsByField = plenty_admin.api.one("interests/getAllInterestsByField", id);
	plenty_admin.REST.getAllInterestsByField.get().then(function(response){
		if(callback && typeof callback === "function"){
			var response_body = response.body();
			var interests = [];
			for(var r=0; r<response_body.length; r++){
				var interest = response_body[r].data();
				interests.push(interest);
			}
			console.log("interests: ", interests);
			callback(interests);
		}
	});
}

plenty_admin.REST.fields = {};

plenty_admin.REST.fields.getAllFieldsForOrganization = function(callback){
	//get fields for this organization
	
	// collect fields for this organization
	plenty_admin.REST.fields.getAllFieldsByOrganization(plenty_admin.DATA.current_organization.id, function(fields){
		plenty_admin.DATA.current_organization.fields = fields;
		if(callback && typeof callback === "function"){
			callback(fields);
		}
	});
}


plenty_admin.REST.fields.getAllFieldsByFarm = function(farmId, callback){
	//get fields related to this farm
	plenty_admin.REST.fields.allFieldsByFarm = plenty_admin.api.one("fields/getAllFieldsByFarm", farmId);
	plenty_admin.REST.fields.allFieldsByFarm.get()
		.then(
			function(fields){
				var fieldsBody = fields.body();
				var fieldsSet = [];
				for(var f in fieldsBody){
					var fieldData = fieldsBody[f]();
					fieldsSet.push(fieldData);
				}
				
				if(callback && typeof callback === "function"){
					callback(fieldsSet);
				}
			});
}

plenty_admin.REST.fields.getAllBoundariesByField = function(fieldId, callback){
	//get fields related to this farm
	plenty_admin.REST.fields.allBoundariesByField = plenty_admin.api.one("boundaries/getAllBoundariesByField", fieldId);
	plenty_admin.REST.fields.allBoundariesByField
	.get()
		.then(
			function(boundaries){
				var boundariesBody = boundaries.body();
				var boundariesSet = [];
				for(var b in boundariesBody){
					var boundariesData = boundariesBody[b]();
					boundariesSet.push(boundariesData);
				}
				
				if(callback && typeof callback === "function"){
					callback(boundariesSet);
				}
			});
}

plenty_admin.REST.fields.getAllBoundaryPointsByBoundary = function(boundaryId, callback){
	//get fields related to this farm
	plenty_admin.REST.fields.allBoundaryPointsByBoundary = plenty_admin.api.one("boundaryPoints/getAllBoundaryPointsByBoundary", boundaryId);
	plenty_admin.REST.fields.allBoundaryPointsByBoundary
	.get()
		.then(
			function(boundaryPoints){
				var boundaryPointsBody = boundaryPoints.body();
				var boundaryPointsSet = [];
				for(var b in boundaryPointsBody){
					var boundaryPointsData = boundaryPointsBody[b]();
					boundaryPointsSet.push(boundaryPointsData);
				}
				
				if(callback && typeof callback === "function"){
					callback(boundaryPointsSet);
				}
			});
}

plenty_admin.REST.fields.getAllBoundaryPointsByFieldAndBoundaryType = function(boundaryId, boundaryTypeId, callback, cropTypeId){
	//get fields related to this farm
	plenty_admin.REST.fields.allBoundaryPointsByFieldAndBoundaryType = plenty_admin.api.one("boundaryPoints/getBoundaryPointsByFieldAndBoundaryType/"+boundaryId, 1);
	plenty_admin.REST.fields.allBoundaryPointsByFieldAndBoundaryType
	.get()
		.then(
			function(boundaryPoints){
				var boundaryPointsBody = boundaryPoints.body();
				var boundaryPointsSet = [];
				for(var b in boundaryPointsBody){
					var boundaryPointsData = boundaryPointsBody[b]();
					boundaryPointsSet.push(boundaryPointsData);
				}
				
				if(callback && typeof callback === "function"){
					callback(boundaryPointsSet, boundaryId, cropTypeId);
				}
			}
		);
}

plenty_admin.REST.fields.getCLUBoundaryPointsForBoundingBox = function(boundary, callback, map){
	//get fields related to this farm
	plenty_admin.REST.fields.CLUBoundaryPointsForBoundingBox = plenty_admin.api.one("cluBoundaries/getByBoundinBox", boundary.maxLongitude+"/"+boundary.minLongitude+"/"+boundary.maxLatitude+"/"+boundary.minLatitude);
	
	plenty_admin.REST.fields.CLUBoundaryPointsForBoundingBox
	.get()
		.then(
			function(CLUboundaryPoints){
				var CLUboundaryPointsBody = CLUboundaryPoints.body();
				var CLUboundaryPointsSet = [];
				for(var b in CLUboundaryPointsBody){
					var CLUboundaryPointsData = CLUboundaryPointsBody[b]();
					CLUboundaryPointsSet.push(CLUboundaryPointsData);
				}
				
				if(callback && typeof callback === "function"){
					callback(CLUboundaryPointsSet, map);
				}
			});
}

plenty_admin.REST.fields.getEquipmentLocationForFilter = function(boundary, callback){
	//get fields related to this farm
	plenty_admin.REST.fields.EquipmentLocationForFilter = plenty_admin.api.one("equipment/getEquipmentLocationForFilter", plenty_admin.DATA.userFilters.filterDto.id+"/"+boundary.maxLongitude+"/"+boundary.minLongitude+"/"+boundary.maxLatitude+"/"+boundary.minLatitude);
	
	plenty_admin.REST.fields.EquipmentLocationForFilter
	.get()
		.then(
			function(equipment){
				var equipmentBody = equipment.body();
				var equipmentSet = [];
				for(var e in equipmentBody){
					var equipmentBodyData = equipmentBody[e]();
					equipmentSet.push(equipmentBodyData);
				}
				
				if(callback && typeof callback === "function"){
					callback(equipmentSet);
				}
			});
}

plenty_admin.REST.fields.getPlatformServicesForFilter = function(callback){
	//get fields related to this farm
	plenty_admin.REST.fields.platformServicesForFilter = plenty_admin.api.one("filters/getPlatformServicesFiltered", plenty_admin.DATA.userFilters.filterDto.id);
	
	plenty_admin.REST.fields.platformServicesForFilter
	.get()
		.then(
			function(ps){
				var psBody = ps.body();
				var psSet = [];
				for(var e in psBody){
					var psBodyData = psBody[e]();
					psSet.push(psBodyData);
				}
				
				if(callback && typeof callback === "function"){
					callback(psSet);
				}
			});
}

plenty_admin.REST.fields.getAllFieldsByOrganization = function(farmId, callback){
	//get fields related to this farm
	plenty_admin.REST.fields.allFieldsByOrganization = plenty_admin.api.one("fields/getFieldsByOrganization", farmId);
	plenty_admin.REST.fields.allFieldsByOrganization.get()
		.then(
			function(fields){
				var fieldsBody = fields.body();
				var fieldsSet = [];
				for(var f in fieldsBody){
					var fieldData = fieldsBody[f]();
					fieldsSet.push(fieldData);
				}
				
				if(callback && typeof callback === "function"){
					callback(fieldsSet);
				}
			});
}

plenty_admin.REST.fields.getFieldById = function(id, callback){
	plenty_admin.REST.fieldById = plenty_admin.api.all("fields/getField");
	plenty_admin.REST.fieldById.get(id)
	.then(
		function(fieldObj){
			console.log(" fieldById: ", fieldObj.body()());
			if(callback && typeof callback == "function"){
				callback(fieldObj.body()());
			}
		});
}

plenty_admin.REST.fields.getEquipmentImage = function(equipmentId, callback){
	plenty_admin.REST.equipmentImage = plenty_admin.api.all("equipmentFiles/getImage");
	plenty_admin.REST.equipmentImage.get(equipmentId)
	.then(
		function(equipmentImageString){
			//console.log(" equipmentImageString: ", equipmentImageString().data);
			if(callback && typeof callback == "function"){
				callback(equipmentImageString().data);
			}
		});
}

plenty_admin.REST.fields.getAllFarmServicesByFarm = function(farmId, callback){
	//get fields related to this farm
	
	plenty_admin.REST.fields.allFarmServicesByFarm.get()
		.then(
			function(services){
				var servicesBody = services.body();
				var servicesSet = [];
				for(var s in servicesBody){
					var servicesData = servicesBody[s]();
					servicesSet.push(servicesData);
				}
				//store the fields on the farm object
				plenty_admin.DATA.organizations[plenty_admin.DATA.current_organization.id].farms[plenty_admin.DATA.current_farm.id].services = servicesSet;
				if(callback && typeof callback === "function"){
					callback(servicesSet);
				}
			});
}

plenty_admin.REST.fields.getGrowthStageById = function(gsId, callback){
	//get fields related to this farm
	plenty_admin.REST.growthStageById = plenty_admin.api.all("cropStage/getGrowthStage");
	plenty_admin.REST.growthStageById.get(gsId)
		.then(
			function(gs){
				//var gsData = gs.data();
				console.log("gs", gs, gs.body()());
				if(callback && typeof callback === "function"){
					callback(gs.body()());
				}
			});
}

plenty_admin.REST.fields.insertFieldWithInterestAndBoundaryPoints = function(fieldObj, financialInterest, callback){
	//prepare the full field object
	var fullFieldObject = {};
	
	var polygonBounds = plenty_admin.MAPS.selectedPolygon.polygon.getPath();
	var boundaryPointsArray = [];
	
	// Iterate over the polygonBounds vertices.
	polygonBounds.forEach(function(xy, i) {
	  //console.log( 'Coordinate: ' + i + xy.lat() +',' + xy.lng());
		var boundaryPointObj = {};
		//boundaryPointObj.boundaryId = boundary_body.id;
		boundaryPointObj.seqNumber = i;
		boundaryPointObj.latitude = xy.lat();
		boundaryPointObj.longitude = xy.lng();
		
		//console.log("boundaryPointObj: ", boundaryPointObj);
		
		boundaryPointsArray.push(boundaryPointObj);
	});
	
	fullFieldObject.boundaryPointDtos = boundaryPointsArray;
	
	fullFieldObject.interestPCT = financialInterest;
	
	fullFieldObject.organizationId = parseInt(fieldObj.interestOrgId);
	delete fieldObj.interestOrgId;
	
	fullFieldObject.cropTypeId = parseInt(fieldObj.cropTypeId);
	delete fieldObj.cropTypeId;
	
	fullFieldObject.irrigationTypeId = parseInt(fieldObj.irrigationTypeId);
	delete fieldObj.irrigationTypeId;
	
	fullFieldObject.tillageTypeId = parseInt(fieldObj.tillageTypeId);
	delete fieldObj.tillageTypeId;
	
	fullFieldObject.growthMethodId = parseInt(fieldObj.growthMethodId);
	
	fullFieldObject.year = 2015;
	
	fullFieldObject.fieldDto = fieldObj;
	
	console.log("fullFieldObject", fullFieldObject);
	
	plenty_admin.REST.insertField.post(fullFieldObject)
	.then(
		function(field){
			var field_body = field.body();
			switch(plenty_admin.state){
				case "settings":
					plenty_admin.DATA.data_source.fieldsAndCropTypes.push({field:field_body});
					plenty_admin.UI.updateBadges("fields", plenty_admin.DATA.data_source.fieldsAndCropTypes.length);
					
					var $fieldHTML = $(plenty_admin.UI.create_item(field_body, "fieldsAndCropTypes"));
					
					plenty_admin.UI.organization.DOM
					.find("table.fieldsList")
					.find(".noItemsText")
					.remove()
					.end()
					.append($fieldHTML);
					
					plenty_admin.UI.organization.addItemFunctionality($fieldHTML);
				break;
				
				case "map":
					//add the new field to the filter DTO before updating
					plenty_admin.DATA.userFilters.filterDto.fieldIds.push(field_body.id);
					//updatye the map
					plenty_admin.DATA.update_filters(function(returned_filters){
						//console.log("filters updated: ", returned_filters, returned_filters.body());
						plenty_admin.DATA.userFilters = returned_filters.body();
					}, null, false);
				break;
				
				//create dummy weather observations for new field
				plenty_admin.REST.createDummyObservationsForField = plenty_admin.api.one("weatherObservations/createDummyObservationsForField", field_body.id);
				plenty_admin.REST.createDummyObservationsForField.put()
				.then(
					function(weatherObservationData){
						console.log("weatherObservationData: ", weatherObservationData);
					}
				)
			}
			
			if(callback && typeof callback === "function"){
				callback(field_body);
			}
		}
	)
}

plenty_admin.REST.fields.insertFieldCrop = function(fieldCropObj, callback){
	plenty_admin.REST.insertFieldCrop.post(fieldCropObj)
	.then(
		function(fieldCrop){
			var fieldCrop_body = fieldCrop.body();
			if(callback && typeof callback === "function"){
				callback(fieldCrop_body);
			}
		}
	)
}

plenty_admin.REST.fields.updateFieldCrop = function(fieldCropObj, callback){
	plenty_admin.REST.updateFieldCrop.put(fieldCropObj)
	.then(
		function(fieldCrop){
			var fieldCrop_body = fieldCrop.body();
			if(callback && typeof callback === "function"){
				callback(fieldCrop_body);
			}
		}
	)
}

// call to REST api for health status
plenty_admin.REST.getStatus = function(){
	$.ajax({
	  url: "http://52.5.118.250:8080/plenty-manage/health",
	  context: document.body
	}).success(function(health) {
		plenty_admin.UI.setRESTStatus(health.status);
	}).error(function(err){
		plenty_admin.UI.setRESTStatus("DOWN");
		if($(".modal.bootbox.healthcheck.in").length == 0){
			bootbox.dialog({
				message: "Rest Server is down right now, please try later - "+err.status+" - "+err.statusText,
				className: "danger healthcheck",
				buttons: {
					
				}
			});	
		}
	});
};

//get initial health status
plenty_admin.REST.getStatus();

//check the status of the REST API every 10 seconds
plenty_admin.REST.checkStatus = setInterval(function(){
	plenty_admin.REST.getStatus();
}, 100000);

//set visual status in UI
plenty_admin.UI.setRESTStatus = function(status){
	var $restStatus = $("footer .restStatus");
	$restStatus.removeClass("alert-success alert-warn alert-danger");
	switch(status){
		case "UP":
			$restStatus
			.addClass("alert-success");
		break;
		
		case "DOWN":
			$restStatus
			.addClass("alert-danger");
		break;
	}
	
	$restStatus
	.find(".status")
	.text(status);
};

plenty_admin.UI.updateBadges = function(hash, value){
	plenty_admin.UI.sideBar.DOM.find("#collapse_"+plenty_admin.DATA.current_organization.id+" li.list-group-item."+hash+" span.badge").text(value);
	plenty_admin.UI.settings.DOM.find(".organization[data-orgid='"+plenty_admin.DATA.current_organization.id+"'] panel .orgAssets ."+hash+" span.count").text(value);
}

plenty_admin.UI.populate_crop_tillage_irrigation_lists = function(parent, idPrefix){
	//set up type lists
	//populate the data type fields
	var data_types = ["crop", "irrigation", "tillage"];
	
	for(var d=0; d<data_types.length; d++){
		//set up the list of crop types
		if(plenty_admin.DATA[data_types[d]+"Types"]){
			var optionsHTML = "";
		
			for(id in plenty_admin.DATA[data_types[d]+"Types"]){
				console.log("data type", plenty_admin.DATA[data_types[d]+"Types"], id, plenty_admin.DATA[data_types[d]+"Types"][id]);
				if(plenty_admin.DATA[data_types[d]+"Types"].hasOwnProperty(id)){
					var el = plenty_admin.DATA[data_types[d]+"Types"][id];
					optionsHTML += "<option value='"+id+"'>"+el.name+"</option>";
				}
			}
		}
		
		var $elList = parent.find("#"+idPrefix+"_"+data_types[d]+"_type");
		console.log("$elList", $elList);
		$elList.append(optionsHTML);
	}
}

//method to return the inline editing options for a select field
//pass an array of values (years), or of id / name key val pairs
plenty_admin.UI.get_inline_editing_options = function(optionSet){
	var optionsString = "[";
	if(Array.isArray(optionSet)){
		for(var o=0; o<optionSet.length; o++){
			var option = optionSet[o];
			if(typeof option == "object"){
				optionsString += "{value:\""+option.id+"\", text: \""+option.name+"\"},";
			}else{
				optionsString += "{value:\""+option+"\", text: \""+option+"\"},";
			}
		}
	}else if(typeof optionSet === "object"){
		for(id in optionSet){
			if(optionSet.hasOwnProperty(id)){
				optionsString += "{value:\""+id+"\", text: \""+optionSet[id].name+"\"},";
			}
		}
	}
	optionsString += "]";
	
	return optionsString;
}

plenty_admin.UI.build_breadcrumb_trail = function(path){
	var $breadcrumbs = $("<h3 class='breadcrumb-trail mtn'><ol class='breadcrumb mbn'></ol></h3>");
	for(var p=0; p<path.length; p++){
		var pathItem = path[p];
		var $breadcrumb_item = $("<li class='"+pathItem.class+"'>"+
			(pathItem.class != "active" && pathItem.clickHandler ? "<a href=''><span class='glyphicon glyphicon-chevron-left'></span>"+pathItem.name+"</a>" : pathItem.name)+
		"</li>");
		
		if(pathItem.clickHandler){
			$breadcrumb_item
			.click(pathItem.clickHandler);
		}
		
		$breadcrumbs
		.find("ol")
		.append($breadcrumb_item);
	}
	
	return $breadcrumbs;
}

/* ********* Define helper methods used across application ************ */
plenty_admin.HELPER = {};
//pull params from the URL query string
plenty_admin.HELPER.getParameterByName = function(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(location.search);
	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
plenty_admin.HELPER.capitalizeFirstLetter = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
plenty_admin.HELPER.get_singular_selected_hash = function(){
	var url = plenty_admin.UI.organization.tabs.DOM.find(".nav.nav-tabs li[role='presentation'].active a[role='tab']").prop("href");
	var hashSingular = url.substring(url.indexOf('#')+1, url.lastIndexOf("s"));
	return hashSingular;
}
plenty_admin.HELPER.formatJavaDate = function(unix_timestamp){
	var a = new Date(unix_timestamp);
	var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	var year = a.getUTCFullYear();
	var month = months[a.getUTCMonth()];
	var date = a.getUTCDate();
	var hour = (a.getUTCHours() < 10 ? "0"+a.getUTCHours()-1 : a.getUTCHours()-1);
	var min = (a.getUTCMinutes() < 10 ? "0"+a.getUTCMinutes() : a.getUTCMinutes());
	var sec = (a.getUTCSeconds() < 10 ? "0"+a.getUTCSeconds() : a.getUTCSeconds());
	var _date = (month ? month.slice(0,4) : month) + ' ' + date;
	var fullDate = _date + ", " + year;
	
	var time = hour + ':' + min + ':' + sec;
	var date_time = _date + ' ' +  time;
	return {
			date_time: time, 
			date: _date,
			time: time,
			month: month,
			obj: a,
			fullDate: fullDate,
			year:year
		};
}
plenty_admin.HELPER.daysFromHours = function(hours){
	if(hours < 24){
		return hours+"hrs";
	}else{
		var days = Math.floor(hours/24);
		var leftOver = Math.round((hours/24) - days);
		return days+"days, "+leftOver+"hrs";
	}
}

plenty_admin.HELPER.treatAsUTC = function(date) {
	if(typeof date === "object"){
		var result = date;
	}else{
		var result = new Date(date);
	}
    
    result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
    return result;
}
plenty_admin.HELPER.capitalizeFirstLetter = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
plenty_admin.HELPER.daydiff = function(startDate, endDate) {
    var millisecondsPerDay = 24 * 60 * 60 * 1000;
	var daydiff = (endDate - startDate) / millisecondsPerDay;
    return daydiff;
}
plenty_admin.HELPER.hideLoadingOverlay = function(){
	$("body")
	.removeClass("loading")
	.find(".page-container")
	.removeClass("blur");
	
	plenty_admin.UI.loadingOverlay.fadeOut("fast");
}
plenty_admin.HELPER.showLoadingOverlay = function(){
	$("body")
	.addClass("loading")
	.find(".page-container")
	.addClass("blur");
	
	plenty_admin.UI.loadingOverlay.fadeIn("fast");
}
plenty_admin.HELPER.returnInlineEditSelectOptions = function(field){
	if(field === "timezone"){
		optionsJSON = plenty_admin.DATA.timezones;
	}
	var inlineEditSelectOptions = "data-source='";
	inlineEditSelectOptions += JSON.stringify(optionsJSON);
	inlineEditSelectOptions+= "'";
	return inlineEditSelectOptions;
}

plenty_admin.HELPER.dynamicSort = function(property) {
	var sortOrder = 1;
	if(property[0] === "-") {
		sortOrder = -1;
		property = property.substr(1);
	}
	return function (a,b) {
		var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
		return result * sortOrder;
	}
}

plenty_admin.HELPER.returnFieldType = function(field){
	switch(field){
		case "mobileNumber":
			return "number";
		break;
		
		case "email":
			return "email";
		break;
		
		case "timezone":
			return "select";
		break;
		
		default:
			return "text";
	}
}


plenty_admin.HELPER.colorLuminance = function(hex, lum) {

	// validate hex string
	hex = String(hex).replace(/[^0-9a-f]/gi, '');
	if (hex.length < 6) {
		hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	}
	lum = lum || 0;

	// convert to decimal and change luminosity
	var rgb = "#", c, i;
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i*2,2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgb += ("00"+c).substr(c.length);
	}

	return rgb;
}

plenty_admin.HELPER.hexToRgb = function(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

//wrapper function for testing a specific, hard coded REST call
plenty_admin.HELPER.testAPICall = function(call, id){
	plenty_admin.REST.getField = plenty_admin.api.all(call);
	plenty_admin.REST.getField.get(id)
	.then(
		function(returnData){
			console.log(call+" GOT", returnData);
		});
}



//extend the line chart object to skip labels but keep the tooltip values
Chart.types.Line.extend({
	name: "LineAlt",
	initialize: function (data) {
		Chart.types.Line.prototype.initialize.apply(this, arguments);
		console.log("Init LineAlt: ", this);
		var xLabels = this.scale.xLabels
		//set the day label increment
		var label_step = 1;
		if(xLabels.length > 31 && xLabels.length < 125){
			label_step = 3
		}else if(xLabels.length > 125 && xLabels.length < 500){
			label_step = 7
		}else if(xLabels.length > 500 && xLabels.length < 1000){
			label_step = 14
		}else if(xLabels.length > 1000){
			label_step = 20
		}
		
		console.log("LineAlt: ", xLabels, label_step);
		
		xLabels.forEach(function (label, i) {
			//console.log("i % 2", i % 2);
			//console.log("i % 6", i % 6);
			//console.log("i % 14", i % 14);
			if (i % label_step > 0)
				xLabels[i] = '';
		});
	}
});



/* ********* Store console logs to append to an error report ************ */
//For todays date;
Date.prototype.today = function(){
    return ((this.getDate() < 10)?"0":"") + this.getDate() +"/"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+ this.getFullYear()
};
//For the time now
Date.prototype.timeNow = function(){
     return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
};
