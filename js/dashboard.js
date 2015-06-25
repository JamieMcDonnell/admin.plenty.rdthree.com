//*********************** dashboard.js **************************//
//create namespace for map layout
plenty_admin.UI.dashboard = {};
plenty_admin.UI.dashboard.DOM = plenty_admin.UI.DOM.find("#dashboard-container");

//method to initiate the field page
plenty_admin.UI.dashboard.init = function(){
	console.log("plenty_admin.UI.dashboard.init");
	plenty_admin.UI.currentScreen = plenty_admin.UI.dashboard.DOM;
	plenty_admin.HELPER.hideLoadingOverlay();
}

plenty_admin.UI.dashboard.populate = function(){
	
}

$( document ).on( "dashboard_data_ready", function( event, orgs ) {
    plenty_admin.UI.dashboard.init();
});