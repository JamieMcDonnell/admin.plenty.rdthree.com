//*********************** settings.js **************************//
// send the user back to the login page if they have no auth token
if(!store.get("basicAuth")){
	//window.location = "http://admin.plenty.rdthree.com/";
}

// check if user should be forced to enter unique credentials
var setCreds = plenty_admin.HELPER.getParameterByName('setCreds');
if(setCreds){
	$('#setCreds').modal("show");
}

plenty_admin.UI.main = {};
plenty_admin.UI.main.DOM = $("#main-panel");
plenty_admin.UI.settings = {};
plenty_admin.UI.settings.organization = {};
plenty_admin.UI.settings.DOM = plenty_admin.UI.main.DOM.find("#settings");
plenty_admin.UI.currentScreen = plenty_admin.UI.settings.DOM;
plenty_admin.UI.settings.new_organization = plenty_admin.UI.settings.DOM.find(".newOrgContainer");

plenty_admin.UI.settings.init = function(){
	//store a ref to the organization items:
	plenty_admin.UI.settings.organizations = plenty_admin.UI.settings.DOM.find(".organizations");
	
	var orgId = Object.keys(plenty_admin.DATA.organizations)[0];
	
	var tabFromURL = plenty_admin.HELPER.getParameterByName("t");
	
	var hash = (tabFromURL ? "#"+tabFromURL : "#farms");			
	
	//set the current screen
	plenty_admin.UI.currentScreen = plenty_admin.UI.organization.DOM;
	
	plenty_admin.DATA.eventCollector = window.eventcollector(8, 10000);
	plenty_admin.REST.getCropTypes();
	plenty_admin.REST.getTillageTypes();
	plenty_admin.REST.getIrrigationTypes();
	plenty_admin.REST.getActivityTypes();
	plenty_admin.REST.getSkillTypes();
	plenty_admin.REST.getProductTypes();
	plenty_admin.REST.getAllProducts();
	plenty_admin.REST.getEquipmentEquipmentTypes();
	
	plenty_admin.DATA.eventCollector.on('done', function(fired, total, data) {
	  console.log('event %d of %d emitted', fired, total);
	  console.log('event description:', data);
	});
	plenty_admin.DATA.eventCollector.on('alldone', function(total) {
		//build the organization panel
		plenty_admin.UI.organization.init(plenty_admin.DATA.organizations[orgId], hash);
	});
	
};

$( document ).on( "organization_data_ready", function( event, orgs ) {
	plenty_admin.UI.settings.init();
});