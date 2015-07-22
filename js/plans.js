//*********************** plans.js **************************//
//create namespace for plans layout
plenty_admin.UI.plans = {};
plenty_admin.UI.plans.DOM = plenty_admin.UI.DOM.find("#plans-container");
plenty_admin.UI.plans.filterControls = $(".filter_controls");
plenty_admin.UI.plans.toggleFilters = plenty_admin.UI.plans.filterControls.find(".toggleFilters a");
//plenty_admin.UI.plans.farms_quickfilter = plenty_admin.UI.plans.filterControls.find(".quickFilter_farms");
plenty_admin.UI.plans.orgs_quickfilter = plenty_admin.UI.plans.filterControls.find(".quickFilter_organizations");
plenty_admin.UI.plans.plansTable = plenty_admin.UI.plans.DOM.find("#plans-container tbody");
plenty_admin.UI.plans.applicableFilters = ["organizations"/*, "farms", "fields", "croptypes", "plans"*/];

//method to initiate the field page
plenty_admin.UI.plans.init = function(){
	console.log("plenty_admin.UI.plans.init");
	plenty_admin.UI.currentScreen = plenty_admin.UI.plans.DOM;
	
	//set up the map filter controls
	plenty_admin.UI.plans.toggleFilters
	.click(function(){
		plenty_admin.UI.filters.toggleFilters();	
		return false;
	});
	
	/*
	plenty_admin.UI.plans.farms_quickfilter
	.popover({
		content:function(){
			var $popover_content = plenty_admin.UI.filters.DOM.find(".filter-set.farms .all-filters").clone(true, true).addClass("farms_quickfilter_popover").show();
			
			return $popover_content;
		},
		title: '<button type="button" id="close" class="close" onclick="plenty_admin.UI.plans.farms_quickfilter.popover(&quot;hide&quot;);">&times;</button>',
		html:true,
		id:"",
		placement:"bottom"
	})
	.parent().delegate('a, input[type="checkbox"]', 'click', function(e) {
		return false;
	})
	.end()
	.on('show.bs.popover', function (e) {
		plenty_admin.UI.plans.orgs_quickfilter
		.popover("hide");
	});
	*/
	
	plenty_admin.UI.plans.orgs_quickfilter
	.popover({
		content:function(){
			var $popover_content = plenty_admin.UI.filters.DOM.find(".filter-set.organizations .all-filters").clone(true, true).addClass("orgs_quickfilter_popover").show();
			
			return $popover_content;
		},
		html:true,
		title: '<button type="button" id="close" class="close" onclick="plenty_admin.UI.plans.orgs_quickfilter.popover(&quot;hide&quot;);">&times;</button>',
		placement:"bottom"
	})
	.parent().delegate('a, input[type="checkbox"]', 'click', function(e) {
		return false;
	})
	.end()
	.on('show.bs.popover', function (e) {
		//plenty_admin.UI.plans.farms_quickfilter
		//.popover("hide");
	});
	
	plenty_admin.UI.plans.plansTable
	.off("click")
	.on("click", function(e){
		console.log("plans container clicked");
		plenty_admin.UI.filters.toggleFilters("close");	
		//plenty_admin.UI.plans.farms_quickfilter.popover("hide");
		plenty_admin.UI.plans.orgs_quickfilter.popover("hide");
	});
}

plenty_admin.UI.plans.populate = function(){
	plenty_admin.UI.plans.DOM
	.find("tbody tr")
	.remove();
	
	for(var p=0; p<plenty_admin.DATA.plans.length; p++){
		var plan = plenty_admin.DATA.plans[p];
		var $planHTML = $([
			"<tr data-id='"+plan.id+"' class='plan'>",
				"<td width='6%'><i class='active "+(plan.active ? "glyphicon glyphicon-ok" : "")+"'></i></th>",
				"<td width='10.66%'>"+plan.name+"</th>",
				"<td width='16.66%'>"+plan.description+"</th>",
				"<td width='16.66%'>$27,754.00</th>",
				"<td width='16.66%'>$27,754.00</th>",
				"<td width='16.66%'>$27,754.00</th>",
				"<td width='16.66%' class='text-right'>$25.56</th>",
			"</tr>"
		].join(""));
		
		$planHTML
		.data("plan", plan);
		
		console.log("$planHTML", $planHTML);
		
		plenty_admin.UI.plans.DOM
		.find("tbody")
		.append($planHTML);
	}
	
	plenty_admin.HELPER.hideLoadingOverlay();
}

// get all activity types and store them

plenty_admin.REST.getPlansFiltered = function(filterId){
	plenty_admin.REST.plansFiltered = plenty_admin.api.one("filters/getPlansFiltered", filterId);
	plenty_admin.REST.plansFiltered.get()
		.then(
			function(plans){
				console.log("got plans filtered: ", plans().data);
				plenty_admin.DATA.plans = plans().data;
				plenty_admin.UI.plans.populate();
			},
			function(err){
				console.error("getting filtered plans: ", err);
			});
}

$( document ).on( "plans_data_ready", function( event ) {
	console.log("plans_data_ready");
    plenty_admin.UI.plans.init();
	
	//populate filter panel options based on current user filters
	plenty_admin.DATA.load_user_filters(function(filters){	
		console.log("filters", filters);
		plenty_admin.DATA.userFilters = filters().data;
		plenty_admin.DATA.data_source = plenty_admin.DATA.userFilters.possibleFilteringEntitiesDtoList;
		plenty_admin.DATA.update_filters(function(){
			console.log("init filters");
			//plenty_admin.UI.plans.add_equipment_to_map();
			plenty_admin.UI.plans.toggleFilters
			.parent()
			.fadeIn("fast")
			.parent()
			.find(".filter_loader")
			.fadeOut("fast");
		}, true);
	});
});