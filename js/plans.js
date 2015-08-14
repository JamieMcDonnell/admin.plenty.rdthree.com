//*********************** plans.js **************************//
//create namespace for plans layout
plenty_admin.UI.plans = {};
plenty_admin.UI.plans.DOM = plenty_admin.UI.DOM.find("#plans-container");
plenty_admin.UI.plans.filterControls = plenty_admin.UI.plans.DOM.find(".filter_controls");
plenty_admin.UI.plans.toggleFilters = plenty_admin.UI.plans.filterControls.find(".toggleFilters a");
plenty_admin.UI.plans.farms_quickfilter = plenty_admin.UI.plans.filterControls.find(".quickFilter_farms");
plenty_admin.UI.plans.orgs_quickfilter = plenty_admin.UI.plans.filterControls.find(".quickFilter_organizations");
plenty_admin.UI.plans.plansTable = plenty_admin.UI.plans.DOM.find("#plans-list");
plenty_admin.UI.plans.applicableFilters = ["organizations", "farms", "fields", "croptypes", "plans"];
plenty_admin.UI.plans.add_template_plan_modal = plenty_admin.UI.plans.DOM.closest("body").find(".modal.add-plan");
plenty_admin.UI.plans.dummyProfitProj = {
	planDto: {
		id:111,
		name: "dummyPlan",
		description:"dummy plan because getting profit projection failed",
		state: "UNSCHEDULED"
	},
	fieldDto: {
		id:1,
		name:"dummyField",
		acres:123
	},
	fieldCropDto:{
		
	},
	revenue:12345,
	expense:65432,
	profit:88776,
	profitPerAcre:234
};

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
	})
	.on("mouseenter", function () {
		var _this = this;
		$(this).popover("show");
		$(".popover").on("mouseleave", function () {
			$(_this).popover('hide');
		});
	}).on("mouseleave", function () {
		var _this = this;
		setTimeout(function () {
			if (!$(".popover:hover").length) {
				$(_this).popover("hide");
			}
		}, 300);
	});
	
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
		plenty_admin.UI.plans.farms_quickfilter
		.popover("hide");
	})
	.on("mouseenter", function () {
		var _this = this;
		$(this).popover("show");
		$(".popover").on("mouseleave", function () {
			$(_this).popover('hide');
		});
	}).on("mouseleave", function () {
		var _this = this;
		setTimeout(function () {
			if (!$(".popover:hover").length) {
				$(_this).popover("hide");
			}
		}, 300);
	});

	var t = Date.now();
	var today = plenty_admin.HELPER.formatJavaDate(t);
	var m = ((today.obj.getUTCMonth()+1) > 9 ? today.obj.getUTCMonth()+1 : "0"+(today.obj.getUTCMonth()+1));
	var d = (today.obj.getUTCDate() > 9 ? today.obj.getUTCDate() : "0"+today.obj.getUTCDate());
	var todayStr = today.year+"-"+m+"-"+d;
	var datePickers = plenty_admin.UI.plans.add_template_plan_modal
	.find("input.datepicker");
	
	datePickers
	.datepicker({
		autoclose:true, 
		startDate: '+0d'
	});
	
	datePickers
	.datepicker('setValue', todayStr)
	.datepicker('update');
	
	datePickers
	.on('show hide',function(e){ e.stopPropagation() });
	
	plenty_admin.UI.plans.DOM
	.find(".btn.add-plan-to-displayed")
	.click(function(){
		var fieldSet = plenty_admin.UI.plans.DOM.find("tbody.fieldPlans");
		var openAddTemplateModal = function(fieldSet){
			//check if any of the fields need a plantation date
			for(var f=0; f<fieldSet.length; f++){
				if($(this).find(".plan").length == 0){
					plenty_admin.UI.plans.add_template_plan_modal
					.addClass("plantAndStart");
				}else{
					plenty_admin.UI.plans.add_template_plan_modal
					.removeClass("plantAndStart");
				}
			}
			
			plenty_admin.UI.plans.add_template_plan_modal
			.data("fieldSet", fieldSet)
			.modal("show");
		}
		if(fieldSet.length === 1){
			for(var f=0; f<fieldSet.length; f++){
				var tbody = fieldSet[f];
				$(tbody)
				.find("tr.plan")
				.each(function(){
					console.log("plan for this tbody: ", $(this));
					var manifestedPlanId = parseInt($(this).data("manifested_plan_id"));
					console.log("manifestedPlanId", manifestedPlanId);
					
					plenty_admin.UI.plans.add_template_plan_modal
					.find(".templatePlan-"+manifestedPlanId)
					.addClass("hide");
				});
			};
			
			if(plenty_admin.UI.plans.add_template_plan_modal.find(".templatePlan:not(.hide)").length == 0){ //if all template plans have been hidden	
				bootbox.dialog({
					message: "You have added all available plan templates.",
					className: "info",
					buttons: {
						danger: {
						  label: "OK",
						  className: "btn-primary",
						  callback: function(){
								plenty_admin.HELPER.hideLoadingOverlay();
							}
						}
					}
				});
			}else{
				openAddTemplateModal(fieldSet);
			}
		}else{
			openAddTemplateModal(fieldSet);
		}
	});
	
	plenty_admin.UI.plans.add_template_plan_modal
	.find('a[data-toggle="tab"]')
	.on('show.bs.tab', function (e) {
	 // e.target // newly activated tab
	  //e.relatedTarget // previous active tab
	  console.log("tab switch: ", $(e.target).data("target"));
	  
	  switch($(e.target).data("target")){
		 case "#plans_list":
		 	plenty_admin.UI.plans.add_template_plan_modal
			.find("button.next")
			.show()
			.end()
			.find("button.back, button.add-plan")
			.hide();
		 break; 
		 
		 case "#plans_criterea":
		 	plenty_admin.UI.plans.add_template_plan_modal
			.find("button.next")
			.hide()
			.end()
			.find("button.back, button.add-plan")
			.show();
		 break; 
	  }
	})
	.end()
	.find("button.next")
	.click(function(){
		console.log("next");
		plenty_admin.UI.plans.add_template_plan_modal
		.find('.nav-tabs a[data-target="#plans_criterea"]')
		.tab('show');
	})
	.end()
	.find("button.back")
	.click(function(){
		plenty_admin.UI.plans.add_template_plan_modal
		.find('.nav-tabs a[data-target="#plans_list"]')
		.tab('show');
	})
	.end()
	.find("button.add-plan")
	.click(function(){
		var selectedPlanTemplates = [];
		var $this = $(this);
		
		$this.button("loading");
		
		plenty_admin.UI.plans.add_template_plan_modal.find("input[type='checkbox']:checked").each(function(){
			selectedPlanTemplates.push($(this).closest("tr"));
		});
		
		console.log("selectedPlanTemplates", selectedPlanTemplates);
		
		plenty_admin.UI.plans.add_plan_eventCollector = window.eventcollector(selectedPlanTemplates.length, 10000);
		
		plenty_admin.UI.plans.add_plan_eventCollector.on('alldone', function(total) {
			plenty_admin.HELPER.hideLoadingOverlay();
		});
		
		for(var t=0; t<selectedPlanTemplates.length; t++){
			//calculateCostForPlan
			//get cost calculation to push into plans list
			var templatePlanDto = selectedPlanTemplates[t].data("templatePlan");
			var autoSchedule = plenty_admin.UI.plans.add_template_plan_modal
			.find("#autoSchedule").is(":checked");
			
			var plantationDate = null;
			var replacementStartDate = null;
			
			function getPlantationDate(){
				var pDateObj = plenty_admin.UI.plans.add_template_plan_modal
				.find("#plantationDate").data("datepicker").date;
			
				plantationDate = pDateObj.getUTCFullYear()+"-"+
									((pDateObj.getUTCMonth()+1) < 10 ? "0"+(pDateObj.getUTCMonth()+1) : pDateObj.getUTCMonth()+1)+"-"+
									(pDateObj.getUTCDate() < 10 ? "0"+pDateObj.getUTCDate() : pDateObj.getUTCDate());
			}
			
			function getReplacementStartDate(){
				var rDateObj = plenty_admin.UI.plans.add_template_plan_modal
				.find("#replaceStartingDate").data("datepicker").date; //selected date
				
				replacementStartDate = rDateObj.getUTCFullYear()+"-"+
									((rDateObj.getUTCMonth()+1) < 10 ? "0"+(rDateObj.getUTCMonth()+1) : rDateObj.getUTCMonth()+1)+"-"+
									(rDateObj.getUTCDate() < 10 ? "0"+rDateObj.getUTCDate() : rDateObj.getUTCDate());
			}
							
			var activeFields = plenty_admin.UI.plans.add_template_plan_modal.data("fieldSet");
			var fieldCropReplaceDatePlantationDateDtos = [];
			
			var dates = plenty_admin.UI.plans.get_plan_start_end_range();
			var currentFS = activeFields[fs];
			
			for(var fs=0; fs<activeFields.length; fs++){
				var isAdd = $(activeFields[fs]).find(".plan.active").length == 0;
				if(
					isAdd
				){
					getPlantationDate();
					replacementStartDate = null;
				}else {
					getReplacementStartDate();
					plantationDate = null;
				}
				fieldCropReplaceDatePlantationDateDtos.push({
					fieldCropId: $(activeFields[fs]).find(".field-row").data("fieldDto").id,
					replacementStartDate:replacementStartDate,
					plantationDate: plantationDate
				});
			}
			
			var orgId = parseInt(plenty_admin.UI.plans.add_template_plan_modal.find("#organizationList option:selected").val());
			
			var templatePlanApplicationDto = {
					templatePlanId: templatePlanDto.id, 
					organizationId: orgId,
					fieldCropReplaceDatePlantationDateDtos: fieldCropReplaceDatePlantationDateDtos,
					autoSchedule: autoSchedule,
					commit: false,
					schedulerRequestArguments: {
						organizationId: orgId,
						triggeringUserId: plenty_admin.DATA.userDetails.id,
						dateRangeStart: dates.dateRangeStart,
						dateRangeEnd: dates.dateRangeEnd,
						planningTimeAllowed: "ONE_MINUTE" //Will become an option of [THREE_MINUTES, FIVE_MINUTES, TEN_MINUTES, HALF_HOUR, HOUR]
					}
			}
			
			console.log("templatePlanApplicationDto", templatePlanApplicationDto);
			
			plenty_admin.UI.plans.add_template_plan_modal
			.modal("hide");
			
			plenty_admin.HELPER.showLoadingOverlay();
									
			plenty_admin.REST.applyTemplatePlanToFieldCrops(templatePlanApplicationDto, function(planManifestation){
				plenty_admin.UI.plans.add_template_plan_modal
				.data("fieldSet")
				.each(function(){
					var status = {
						planning:planManifestation.planning,
						possible:planManifestation.possible,
						ready:planManifestation.ready
					};
					
					var $projectionPlanHTML = plenty_admin.UI.plans.create_plan_projection(planManifestation, "templatePlan");
					
					$projectionPlanHTML
					.data("planManifestationResultsDto", planManifestation)
					.data("templatePlanApplicationDto", templatePlanApplicationDto);
					
					$(this)
					.append($projectionPlanHTML);
				});
				plenty_admin.UI.plans.add_plan_eventCollector.done("template plans added");
			});
		}
	})
	.end()
	.find("#autoSchedule")
	.bootstrapSwitch()
	.end()
	.on("show.bs.modal", function(){
		console.log("show add plan modal");
	})
	.on("hidden.bs.modal", function(){
		$(this).removeClass("addPlan plantAndStart");
		var that = $(this);
		
		that
		.find(".templatePlan")
		.removeClass("hide alert-success")
		.find("input[type=checkbox]")
		.prop("checked", false)
		.end()
		.end()
		.find("button.add-plan")
		.button("reset")
		.end()
		.find('a[data-toggle="tab"][data-target="#plans_criterea"]')
		.parent()
		.hide()
		.end()
		.end()
		.find('a[data-toggle="tab"][data-target="#plans_list"]')
		.trigger("click")
		.end()
		.find("button.next")
		.prop("disabled", true);
		
		var to = setTimeout(function(){
			plenty_admin.UI.plans.add_template_plan_modal
			.find("button.add-plan")
			.prop('disabled', true);
		}, 50);
	});
}

plenty_admin.UI.plans.get_plan_start_end_range = function(){
	var rsDate = Date.now() + -180*24*3600*1000; // date 5 days ago in milliseconds UTC
	var dateRangeStartObj = new Date(rsDate);

	var dateRangeStart = dateRangeStartObj.getUTCFullYear()+"-"+
							((dateRangeStartObj.getUTCMonth()+1) < 10 ? "0"+(dateRangeStartObj.getUTCMonth()+1) : dateRangeStartObj.getUTCMonth()+1)+"-"+
							(dateRangeStartObj.getUTCDate() < 10 ? "0"+dateRangeStartObj.getUTCDate() : dateRangeStartObj.getUTCDate());
	
	var reDate = Date.now() + 180*24*3600*1000; // date 5 days ago in milliseconds UTC
	var dateRangeEndObj = new Date(reDate);
	var dateRangeEnd = dateRangeEndObj.getUTCFullYear()+"-"+
							((dateRangeEndObj.getUTCMonth()+1) < 10 ? "0"+(dateRangeEndObj.getUTCMonth()+1) : dateRangeEndObj.getUTCMonth()+1)+"-"+
							(dateRangeEndObj.getUTCDate() < 10 ? "0"+dateRangeEndObj.getUTCDate() : dateRangeEndObj.getUTCDate());
							
	var dates = {
		dateRangeEnd: dateRangeEnd,
		dateRangeStart: dateRangeStart
	};
	
	return dates;
}

plenty_admin.UI.plans.get_state_icon_class = function(state){
	var statusClass = "thumbs-down";
	switch(state){
			case "SCHEDULED":
				statusClass = "calendar";
			break;
			case "IN_PROGRESS":
				statusClass = "hourglass-half";
			break;
			case "FINISHED":
				statusClass = "flag-checkered";
			break;
			case "REPLACED":
				statusClass = "exchange";
			break;
			case "UNSCHEDULED":
				statusClass = "calendar-minus-o";
			break;
			case "SCHEDULING":
				statusClass = "hourglass-half";
			break;
			case "CONFLICT":
				statusClass = "hand-stop-o";
			break;
		}
	return statusClass;
}

plenty_admin.UI.plans.create_plan_projection = function(planData, type){
	//console.log("planData", planData);
	switch (type){
		case "plan":
			var drilldownData = {
				plan: planData.planDto,
				field: planData.fieldDto,
				fieldCrop: planData.fieldCropDto,
				activities:planData.activityListDetailedFinancesDto,
				profitProjection:planData,
				manifestedPlan: {manifestedFromId: planData.planDto.manifestedFromId}
			}
		break;
		
		case "templatePlan":
			var drilldownData = {
				plan: planData.planManifestationResults[0].profitProjectionDto.planDto,
				field: planData.planManifestationResults[0].profitProjectionDto.fieldDto,
				fieldCrop: planData.planManifestationResults[0].profitProjectionDto.fieldCropDto,
				activities:planData.planManifestationResults[0].profitProjectionDto.activityListDetailedFinancesDto,
				profitProjection:planData.planManifestationResults[0].profitProjectionDto,
				manifestedPlan: planData.planManifestationResults[0].manifestedPlan
			}
		break;
	}
	
	var statusClass = "ready";
	var active = false;
	//calculate status
	if(drilldownData.plan.state){
		switch(drilldownData.plan.state){
			case "SCHEDULED":
				active = true;
				statusClass = "calendar";
			break;
			case "IN_PROGRESS":
				active = true;
				statusClass = "hourglass-half";
			break;
			case "FINISHED":
				active = true;
				statusClass = "flag-checkered";
			break;
			case "REPLACED":
				active = false;
				statusClass = "exchange";
			break;
			case "UNSCHEDULED":
				active = false;
				statusClass = "calendar-minus-o";
			break;
			case "SCHEDULING":
				active = false;
				statusClass = "hourglass-half";
			break;
			case "CONFLICT":
				active = false;
				statusClass = "hand-stop-o";
			break;
		}
	}
	
	var statePossibilities = "UNSCHEDULED SCHEDULING SCHEDULED CONFLICT IN_PROGRESS FINISHED REPLACED";
	
	var $planHTML = $([
			"<tr data-id='"+drilldownData.plan.id+"' data-manifested_plan_id='"+drilldownData.manifestedPlan.manifestedFromId+"' class='plan"+(active ? " active" : "")+" pointer "+type+" "+drilldownData.plan.state+"' title='View Plan Details'>",
				"<td width='7%' class='status text-center' title='This plan is currently "+drilldownData.plan.state+"'><i class='fa fa-"+statusClass+"'></i><br/><span class='statusText'>"+drilldownData.plan.state+"</span></i></td>",
				"<td width='19%'>"+drilldownData.plan.name+"<i class='glyphicon glyphicon-info-sign desc mls' title='"+drilldownData.plan.description+"' data-toggle='tooltip' data-placement='top'></i></td>",
				"<td width='12%'>"+numeral(drilldownData.profitProjection.revenue).format('$0,0.00')+"</td>",
				"<td width='12%'>"+numeral(drilldownData.profitProjection.expense).format('$0,0.00')+"</td>",
				"<td width='12%'>"+numeral(drilldownData.profitProjection.profit).format('$0,0.00')+"</td>",
				//"<td width='20%'>"+drilldownData.plan.description+"</td>",
				"<td width='12%'>"+plenty_admin.HELPER.formatJavaDate(drilldownData.plan.startDate).USDate+"</td>",
				"<td width='18%' class='useplan'></td>",
				"<td width='8%' class='text-right profitPerAcre'>"+numeral(drilldownData.profitProjection.profitPerAcre).format('$0,0.00')+"</td>",
			"</tr>"
		].join("")).data("drilldownData", drilldownData);
		
		if(drilldownData.plan.state == "UNSCHEDULED"){
			var $usePlan = $("<button class='btn btn-primary btn-sm' title='Use this plan'><span class='glyphicon glyphicon-ok'></span> Use Plan</button>");
			
			$usePlan
			.click(function(e){
				e.stopPropagation();
				var $this = $(this);
				var drilldownData = $this.closest("tr").data("drilldownData");
				var templatePlanApplicationDto = $this.closest("tr").data("templatePlanApplicationDto");
				var planManifestationResultsDto = $this.closest("tr").data("planManifestationResultsDto");
				var fieldRow = $this.closest("tbody").find(".field-row");
				var fieldDto = fieldRow.data("fieldDto");
				var fieldCropDto = fieldRow.data("fieldCropDto");
				console.log("fieldDto", fieldDto);
				console.log("fieldCropDto", fieldCropDto);
				
				try{
					var currentPlanName = $this.closest("tbody").find(".plan.active").data("drilldownData").plan.name;
				}catch(err){
					var currentPlanName = null;
				}
				var newPlanName =  drilldownData.plan.name;
				var manifestedPlanId = $this.closest("tr").data("manifested_plan_id");
				
				if(!templatePlanApplicationDto){
					var dates = plenty_admin.UI.plans.get_plan_start_end_range();
					fieldCropReplaceDatePlantationDateDtos = [{
						fieldCropId: drilldownData.fieldCrop.id,
						replacementStartDate:drilldownData.plan.startDate,
						plantationDate: null
					}];
					templatePlanApplicationDto = {
							templatePlanId: manifestedPlanId, 
							organizationId: drilldownData.plan.organizationId,
							fieldCropReplaceDatePlantationDateDtos: fieldCropReplaceDatePlantationDateDtos,
							autoSchedule: false,
							commit: true,
							schedulerRequestArguments: {
								organizationId: drilldownData.plan.organizationId,
								triggeringUserId: plenty_admin.DATA.userDetails.id,
								dateRangeStart: dates.dateRangeStart,
								dateRangeEnd: dates.dateRangeEnd,
								planningTimeAllowed: "ONE_MINUTE" //Will become an option of [THREE_MINUTES, FIVE_MINUTES, TEN_MINUTES, HALF_HOUR, HOUR]
							}
					}
				}
				
				if(!currentPlanName){
					var planManifestationResult = $.grep(planManifestationResultsDto.planManifestationResults, function(plan, p){
						return plan.manifestedPlan.fieldCropId === drilldownData.fieldCrop.id;
					});
					
					//console.log("planManifestationResult", planManifestationResult);
					var newPlanPlantationDate = planManifestationResult[0].manifestedPlan.plantationDate;
					var changeMsg = 'Are you sure you want to make</p><h4>'+newPlanName+'</h4><p>the active plan for</p><h4>'+fieldDto.name+'</h4><p>starting on</p><h4>'+newPlanPlantationDate+'?';
				}else{
					try{
						var newPlanChangeDate = templatePlanApplicationDto.fieldCropReplaceDatePlantationDateDtos[0].replacementStartDate;
						var changeMsg = 'Are you sure you want to change</p><h4>'+currentPlanName+'</h4><p>for</p><h4>'+newPlanName+'</h4><p>starting on</p><h4>'+newPlanChangeDate+'?';
					}catch(err){
						console.error("current plans dfo not have a templatePlanApplicationDto");
						var changeMsg = 'Are you sure you want to change</p><h4>'+currentPlanName+'</h4><p>for</p><h4>'+newPlanName+'?</h4>';
					}
				}
				
				
				var $modalBody = 
					$('<div class="row">' +
						'<div class="col-md-12"> ' +
							'<p>'+changeMsg+'</h4>'+
						'</div> '+
					'</div>');
				
				//warn the user about changing plans
				bootbox.dialog({
					title: 'Confirm Change Plan',
					message: $modalBody,
					className: "info",
					buttons: {
						default: {
						  label: "Cancel",
						  className: "btn-default",
						  callback: plenty_admin.HELPER.hideLoadingOverlay
						},
						primary: {
						  label: "OK",
						  className: "btn-primary",
							callback: function(){
								plenty_admin.HELPER.showLoadingOverlay();
								
								console.log("templatePlanApplicationDto", templatePlanApplicationDto);
								templatePlanApplicationDto.commit = true;
								
								plenty_admin.REST.applyTemplatePlanToFieldCrops(templatePlanApplicationDto, function(planManifestationResultsDto){
									//remove active class from other plans 
									var activePlan = $this
									.closest("tbody")
									.find("tr.plan.active");
									
									var newState = planManifestationResultsDto.planManifestationResults[0].profitProjectionDto.planDto.state;
									var previousPlanState = (
																planManifestationResultsDto.planManifestationResults[0].replacedPlan ?
																planManifestationResultsDto.planManifestationResults[0].replacedPlan.state :
																null
															)
									
									if(planManifestationResultsDto.planManifestationResults[0].profitProjectionDtoForReplacedPlan){
										var previousPlanProfitProj = planManifestationResultsDto.planManifestationResults[0].profitProjectionDtoForReplacedPlan;
										var drilldownData = {
											plan: previousPlanProfitProj.planDto,
											field: previousPlanProfitProj.fieldDto,
											fieldCrop: previousPlanProfitProj.fieldCropDto,
											activities:previousPlanProfitProj.activityListDetailedFinancesDto,
											profitProjection:previousPlanProfitProj,
											manifestedPlan: {manifestedFromId: previousPlanProfitProj.planDto.manifestedFromId}
										};
									}
									
															
									if(previousPlanState){
										activePlan
										.removeClass("active "+statePossibilities)
										.addClass(previousPlanState)
										.data("profitProjection", previousPlanProfitProj)
										.data("drilldownData", drilldownData)
											.find("td.status")
											.removeClass(statePossibilities)
											.addClass(previousPlanState)
											.prop("title", "This plan is currently "+previousPlanState)
												.find("i.fa")
												.prop("class", "")
												.addClass("fa fa-"+plenty_admin.UI.plans.get_state_icon_class(previousPlanState))
											.end()
												.find("span.statusText")
												.text(previousPlanState);
									}
									
									//enable this plan for this field
									$this
										.closest("tr.plan")
										.removeClass(statePossibilities)
										.addClass("active "+newState)
											.find("i.fa")
												.prop("class", "")
												.addClass("fa fa-"+plenty_admin.UI.plans.get_state_icon_class(newState))
											.end()
											.find("span.statusText")
											.text(newState)
											.closest("td")
											.prop("title", "This plan is currently "+newState);
											
									$this
									.remove();
									
									plenty_admin.HELPER.hideLoadingOverlay();
								});
							}
						}
					}
				});
				return false;
			});
			
			$planHTML
			.find("td.useplan")
			.append($usePlan);
		}
		
		$planHTML
		.find("i.desc")
		.tooltip()
		.end()
		.click(function(e){
			e.stopPropagation();
			console.log("clicked a plan");
			var drilldownData = $(this).data("drilldownData");
			
			//build the breadcrumb trail object
			var plan_breadcrumb = [
				{
					class:"back",
					name:"Plans",
					clickHandler:function(){
						plenty_admin.UI.currentScreen
						.fadeOut("normal", function(){
							plenty_admin.UI.plan.clear();
							plenty_admin.UI.currentScreen = plenty_admin.UI.plans.DOM;
							plenty_admin.UI.currentScreen
							.fadeIn("normal");
						});
						return false;
					}
				},
				{
					class:"active",
					name:drilldownData.field.name+", "+drilldownData.plan.name,
					clickHandler:null
				}
			];
			
			plenty_admin.UI.plan.DOM
			.find(".breadcrumb-trail")
			.remove()
			.end()
			.prepend(plenty_admin.UI.build_breadcrumb_trail(plan_breadcrumb));
			
			plenty_admin.UI.plan.init(drilldownData);
		});
		
		//add polling to this plan if it is currently planning to check status
		if(statusClass === "planning"){
			$planHTML.checkStatus = setTimeout(function(){
				plenty_admin.REST.getPlan(profitProjection.planDto.id, function(plan){
					console.log("got plan from polling: ", plan);
				});
			}, 5000);
		}
		
		return $planHTML;
};

plenty_admin.UI.plans.create_field_tbody = function(field, profitProjection){
	var $tbody = $("<tbody class='fieldPlans fieldPlans_"+field.id+"'/>");
	//$tbody.data("profitProjection", profitProjection);
	return $tbody;
}

plenty_admin.UI.plans.create_field_row = function(field, fieldCrop, legendItems){
	$fieldHTML = $([
			"<tr class='field-row field-row-"+field.id+" category pointer' data-id='"+field.id+"' title='View the plan summary for this field'>",
				"<td width='7%' class='fieldPreview'><img src='' class='pointer pull-left field_thumb_"+field.id+"'/></th>",
				"<td width='19%'>",
					"<h4 class=''>"+field.name+"</h4>",
					"<span class='fieldDetails capitalize'>"+field.acres+"ac, "+plenty_admin.DATA.cropTypes[fieldCrop.cropTypeId].name+"</span>",
				"</td>",
				"<td width='12%' class='revenue'></td>",
				"<td width='12%' class='expense'></td>",
				"<td width='12%' class='profit'></td>",
				"<td width='12%' class='startDate'></td>",
				"<td width='18%'>",
					"<button class='btn btn-primary btn-inverted add-field-plan' title='Add plan(s) to compare cost projections'>",
						"<span class='glyphicon glyphicon-plus'></span>Add Plan(s)",
					"</button>",
				"</td>",
				"<td width='8%' class='text-right profitPerAcre' class='profitPerAcre'></td>",
			"</tr>"
	].join(""));
	
	$fieldHTML
	.data("fieldDto", field)
	.data("fieldCropDto", fieldCrop)
	.data("revenue", 0)
	.data("expense", 0)
	.data("profit", 0)
	.data("profitPerAcre", 0)
	.click(function(e){
		e.stopPropagation();
		plenty_admin.UI.filters.toggleFilters("close");	
		plenty_admin.UI.plans.farms_quickfilter.popover("hide");
		plenty_admin.UI.plans.orgs_quickfilter.popover("hide");
		var $fieldRow = $(this);
		var fieldDto = $fieldRow.data("fieldDto");
		
		console.log("clicked a field");
		var drilldownDatasArray = [];
		
		var activePlansForField = $fieldRow.closest("tbody").find("tr.plan:not(.UNSCHEDULED)");
		activePlansForField
		.each(function(){
			drilldownDatasArray.push($(this).data("drilldownData"));
		});
		
		if(activePlansForField.length == 0){
			bootbox.dialog({
				message: "There are currently no active plans for this field.",
				className: "info",
				buttons: {
					danger: {
					  label: "OK",
					  className: "btn-primary",
					  callback: function(){
							plenty_admin.HELPER.hideLoadingOverlay();
						}
					}
				}
			});
		}else{
			//build the breadcrumb trail object
			var plan_breadcrumb = [
				{
					class:"back",
					name:"Plans",
					clickHandler:function(){
						plenty_admin.UI.currentScreen
						.fadeOut("normal", function(){
							plenty_admin.UI.plan.clear();
							plenty_admin.UI.currentScreen = plenty_admin.UI.plans.DOM;
							plenty_admin.UI.currentScreen
							.fadeIn("normal");
						});
						return false;
					}
				},
				{
					class:"active",
					name:fieldDto.name+" Plan Summary",
					clickHandler:null
				}
			];
			
			plenty_admin.UI.plan.DOM
			.find(".breadcrumb-trail")
			.remove()
			.end()
			.prepend(plenty_admin.UI.build_breadcrumb_trail(plan_breadcrumb));
			
			plenty_admin.UI.plan.init(drilldownDatasArray);
		}
	})
	.find("button.add-field-plan")
	.click(function(e){
		console.log("add field plan");
		e.stopPropagation();
		var $this = $(this);
		var replacePlan = $this.closest("tbody").find(".plan.active").length == 1;
		
		if(replacePlan){
			plenty_admin.UI.plans.add_template_plan_modal
			.removeClass("addPlan");
		}else{
			plenty_admin.UI.plans.add_template_plan_modal
			.addClass("addPlan");
		}
		
		plenty_admin.UI.plans.add_template_plan_modal
		.data("fieldSet", $this.closest("tbody.fieldPlans"))
		.modal("show");
	});
	
	//create field thumbnail static map url
	plenty_admin.REST.fields.getAllBoundaryPointsByFieldAndBoundaryType(field.id, 2, function(boundaries, fieldId, cropTypeId){
		var bounds = new google.maps.LatLngBounds();	
		boundaries.forEach(function(xy, i) {
			bounds.extend(new google.maps.LatLng(xy.latitude, xy.longitude));
		});
		
		var fieldCenter = bounds.getCenter();
		var cropColor = legendItems[cropTypeId].color.substring(legendItems[cropTypeId].color.indexOf('#')+1);
		var pathString = "color:white|weight:2|fillcolor:0x"+cropColor;
		boundaries.forEach(function(boundary, b){
			pathString += "|" + boundary.latitude+","+boundary.longitude
		});
		
		staticMapParams = {
			center:fieldCenter.lat()+","+fieldCenter.lng(),
			size:"110x110",
			maptype:"hybrid",
			zoom: plenty_admin.MAPS.getBoundsZoomLevel(bounds, {width:110, height:110}),
			path:pathString
		};
		
		var thumb_url = plenty_admin.MAPS.get_static_maps_url(staticMapParams);
		
		var field_thumb = plenty_admin.UI.plans.plansTable.find(".fieldPlans.fieldPlans_"+fieldId+" .fieldPreview img");
		
		set_thumb_url(thumb_url, fieldId);
		
		field_thumb
		.popover({
				content:"<img src='"+thumb_url+"' style='width:110px; height:110px;'/>",
				title: field_thumb.closest("tr").data("fieldDto").name,
				html:true,
				id:"",
				placement:"right",
				container:"body"
		})
		.on("mouseenter", function () {
			var _this = this;
			$(this).popover("show");
			$(".popover").on("mouseleave", function () {
				$(_this).popover('hide');
			});
		}).on("mouseleave", function () {
			var _this = this;
			setTimeout(function () {
				if (!$(".popover:hover").length) {
					$(_this).popover("hide");
				}
			}, 300);
		});
		
		function set_thumb_url(thumb_url, fieldId){
			if(field_thumb.length > 0){
				field_thumb
				.prop("src", thumb_url);
				
				var field_thumb_clone = field_thumb.clone(true, true);
				field_thumb_clone
					.popover({
					content:"<img src='"+thumb_url+"' style='width:110px; height:110px;'/>",
					title: field_thumb.closest("tr").data("fieldDto").name,
					html:true,
					id:"",
					placement:"right",
					container:"body"
				})
				.on("mouseenter", function () {
					var _this = this;
					$(this).popover("show");
					$(".popover").on("mouseleave", function () {
						$(_this).popover('hide');
					});
				}).on("mouseleave", function () {
					var _this = this;
					setTimeout(function () {
						if (!$(".popover:hover").length) {
							$(_this).popover("hide");
						}
					}, 300);
				});
				
				var cloneContainer = field_thumb
				.closest(".flexbox-scroll_y")
				.find(".floating-header .field-row-"+fieldId+" .fieldPreview");
				
				cloneContainer
				.find("img.field_thumb_"+fieldId)
				.remove();
				
				cloneContainer
				.append(field_thumb_clone);
			}else{
				var to = setTimeout(function(){
					console.log("checking field dom element");
					set_thumb_url(thumb_url);
				}, 300);
			}
		}
	}, fieldCrop.cropTypeId);
	
	return $fieldHTML;
};

plenty_admin.UI.plans.populate = function(){
	plenty_admin.UI.plans.plansTable
	.find("tbody")
	.remove();
		
	var legendItems = {};
	var $fieldHTML = null;
	plenty_admin.UI.plans.allCropTypes = [];
	
	//loop fields in the filter and add tbody elements for each field
	for(var f=0; f<plenty_admin.DATA.fieldCrops.length; f++){
		var fieldCrop = plenty_admin.DATA.fieldCrops[f];
		var field = fieldCrop.fieldDto;
		console.log("field", field);
		
		var $fieldTBody = plenty_admin.UI.plans.create_field_tbody(field);
		plenty_admin.UI.plans.plansTable.append($fieldTBody);
	}
	
	//loop fields in the filter and add tbody elements with the field row for each
	for(var f=0; f<plenty_admin.DATA.fieldCrops.length; f++){
		var fieldCrop = plenty_admin.DATA.fieldCrops[f];
		var field = fieldCrop.fieldDto;
		console.log("fieldCrop", fieldCrop);
		console.log("field", field);
		
		if(!legendItems[fieldCrop.cropTypeId]){
			//plenty_admin.UI.map.allCropTypes[field.cropTypeName.replace(/ /g, "")] = field.cropTypeName;
			plenty_admin.UI.brand_palette.setNumberRange(0, (Object.keys(legendItems).length > 0 ? Object.keys(legendItems).length : 100));
			legendItems[fieldCrop.cropTypeId] = {
									color: "#"+plenty_admin.UI.brand_palette.colourAt(Object.keys(legendItems).length), 
									colour: "#"+plenty_admin.UI.brand_palette.colourAt(Object.keys(legendItems).length), 
									label : plenty_admin.DATA.cropTypes[fieldCrop.cropTypeId].name
								};
		}
		
		//add a legend to the map based on the filtered fields
		console.log("legendItems: ", legendItems);
		
		$fieldHTML = plenty_admin.UI.plans.create_field_row(field, fieldCrop, legendItems);
		
		plenty_admin.UI.plans.plansTable
		.find("tbody.fieldPlans_"+field.id)
		.prepend($fieldHTML);
	}
	
	//loop the field plans and add them to the appropriate tbody element
	for(var p=0; p<plenty_admin.DATA.plans.length; p++){
		var profitProjection = plenty_admin.DATA.plans[p];
		var plan = profitProjection.planDto;
		var field = profitProjection.fieldDto;
		var fieldCrop = profitProjection.fieldCropDto;
		
		var $planHTML = plenty_admin.UI.plans.create_plan_projection(profitProjection, "plan");
		
		//store the original object on the DOM element
		$planHTML
		.data("profitProjection", profitProjection);
		
		var tbody = plenty_admin.UI.plans.plansTable
		.find("tbody.fieldPlans_"+field.id);
		
		tbody
		.append($planHTML);
		
		var fieldRow = tbody.find("tr.field-row");
		
		//calculate field totals from plans
		fieldRow
		.data("revenue", fieldRow.data("revenue") + profitProjection.revenue)
		.data("expense", fieldRow.data("expense") + profitProjection.expense)
		.data("profit", fieldRow.data("profit") + profitProjection.profit)
		.data("profitPerAcre", fieldRow.data("profitPerAcre") + profitProjection.profitPerAcre);
	}
	
	plenty_admin.UI.plans.plansTable
	.find("tr.field-row")
	.each(function(field, f){
		console.log("field row: ", $(this), f);
		$(this)
		.find(".profit")
		.text(numeral($(f).data("profit")).format('$0,0.00'))
		.end()
		.find(".expense")
		.text(numeral($(f).data("expense")).format('$0,0.00'))
		.end()
		.find(".revenue")
		.text(numeral($(f).data("revenue")).format('$0,0.00'))
		.end()
		.find(".profitPerAcre")
		.text(numeral($(f).data("profitPerAcre")).format('$0,0.00'));
	});
	
	plenty_admin.HELPER.initFloatingHeaders(plenty_admin.UI.plans.plansTable, ".field-row", "#plans-wrapper");

	plenty_admin.HELPER.hideLoadingOverlay();
}

//get plans applicable to this filter
plenty_admin.REST.getPlansFiltered = function(filterId){
	plenty_admin.REST.plansFiltered = plenty_admin.api.one("plan/getPlanProfitProjectionsForFilter", filterId);
	plenty_admin.REST.plansFiltered.get()
	.then(
		function(plans){
			console.log("got plans filtered: ", plans().data);
			plenty_admin.DATA.plans = plans().data;
			plenty_admin.UI.plans.eventCollector.done("plans filtered");
		},
		function(err){
			console.error("getting filtered plans: ", err);
		}
	);
}

//get field and fieldCrops filtered
plenty_admin.REST.getFieldCropsByYearFiltered = function(filterId, year){
	plenty_admin.REST.fieldCropsByYearFiltered = plenty_admin.api.one("filters/getFieldCropsByYearFiltered/"+year, filterId);
	plenty_admin.REST.fieldCropsByYearFiltered.get()
	.then(
		function(fieldCrops){
			console.log("got field crops by year filtered: ", fieldCrops().data);
			plenty_admin.DATA.fieldCrops = fieldCrops().data;
			plenty_admin.UI.plans.eventCollector.done("field crops by year filtered");
		},
		function(err){
			console.error("getting filtered fieldCrops by year failed: ", err);
		}
	);
}

//get plans applicable to this filter
plenty_admin.REST.getPlan = function(planId, callback){
	plenty_admin.REST.plan = plenty_admin.api.one("plan/getPlan", planId);
	plenty_admin.REST.plan.get()
	.then(
		function(plan){
			console.log("got plan: ", plan().data);
			if(callback && typeof callback === "function"){
				callback(plan().data);
			}
		},
		function(err){
			console.error("getting filtered plans: ", err);
		}
	);
}

//calculate cost for a plan
plenty_admin.REST.getProfitProjectionForPlan = function(planDto, callback){
	plenty_admin.REST.profitProjectionForPlan = plenty_admin.api.one("plan/calculateCostForPlanDto", planDto.id);
	plenty_admin.REST.profitProjectionForPlan.get()
	.then(
		function(profitProjection){
			console.log("got profit projection: ", profitProjection().data);
			if(callback && typeof callback === "function"){
				callback(profitProjection().data);
			}
		},
		function(err){
			console.error("getting profit projection for plan dto failed:: ", err);
			
			/* HACK - return dummy profitProjectionDto for UI testing only */
			callback(plenty_admin.UI.plans.dummyProfitProj);
		}
	);
}

//get all template plans
plenty_admin.REST.getTemplatePlans = function(callback){
	plenty_admin.REST.templatePlans = plenty_admin.api.all("templatePlan/getAllTemplatePlans");
	plenty_admin.REST.templatePlans.getAll()
	.then(
		function(templatePlans){
			if(callback && typeof callback === "function"){
				callback(templatePlans().data);
			}
			plenty_admin.DATA.eventCollector.done("event 1");
		},
		function(err){
			console.error("getting templatePlans failed: ", err);
		}
	);
}

//change a plan
plenty_admin.REST.applyTemplatePlanToFieldCrops = function(templatePlanApplicationDto, callback){
	plenty_admin.REST.templatePlanToFieldCrops = plenty_admin.api.all("plan/applyTemplatePlanToFieldCrops");
	plenty_admin.REST.templatePlanToFieldCrops.post(templatePlanApplicationDto)
	.then(
		function(planManifestationResultsDto){
			console.log("planManifestationResultsDto: ", planManifestationResultsDto().data);
			if(callback && typeof callback === "function"){
				callback(planManifestationResultsDto().data);
			}
		},
		function(err){
			console.error("applyTemplatePlanToFieldCrops failed: ", err);
			bootbox.dialog({
				message: "Could not apply plan to field! - "+err.status+" - "+err.statusText,
				className: "danger",
				buttons: {
					danger: {
					  label: "OK",
					  className: "btn-danger",
					  callback: function(){
							//plenty_admin.HELPER.hideLoadingOverlay();
							plenty_admin.UI.plans.add_template_plan_modal
							.find("button.add-plan")
							.button('reset');
						}
					}
				}
			});
		}
	);
}


$( document ).on( "plans_data_ready", function( event ) {
	console.log("plans_data_ready");
	plenty_admin.DATA.eventCollector = window.eventcollector(3, 10000);
	plenty_admin.REST.getCropTypes();
	plenty_admin.REST.getActivityTypes();
	
	//get all template plans
	plenty_admin.REST.getTemplatePlans(function(templatePlans){
		console.log("got all template plans: ", templatePlans);
		plenty_admin.DATA.templatePlans = templatePlans;
	});
		
	plenty_admin.DATA.eventCollector.on('alldone', function(total) {
		plenty_admin.DATA.selectedTemplatePlans = [];
		var $tpBody = $("<tbody/>");
		
		plenty_admin.UI.plans.add_template_plan_modal
		.find("#templateplans-list")
		.append($tpBody);
		
		//populate the add plan modal
		for(var tp=0; tp<plenty_admin.DATA.templatePlans.length; tp++){
			var tplan = plenty_admin.DATA.templatePlans[tp];
			var $templatePlan = $([
				'<tr class="templatePlan templatePlan-'+tplan.id+' pointer">',
					'<td width="5%" class="select">',
						'<input type="checkbox" class="selectTemplatePlan pointer"></input>',
					'</td>',
					'<td width="35%">',
						tplan.name,
					'</td>',
					'<td width="60%">',
						tplan.description,
					'</td>',
				'</tr>'
			].join(""))
			.data("templatePlan", tplan)
			.find("input.selectTemplatePlan")
			.click(function(){
				var thisTP = $(this).closest("tr").data("templatePlan");
				if($(this).is(":checked")){
					//add from the selected templatePlans array
					plenty_admin.DATA.selectedTemplatePlans
					.push(thisTP);
					
					console.log("enable");
					
					$(this)
					.closest("tr")
					.addClass("alert-success");
					
					plenty_admin.UI.plans.add_template_plan_modal
					.find("button.add-plan, button.next")
					.prop('disabled', false)
					.end()
					.find('.nav-tabs a[data-target="#plans_criterea"]')
					.parent()
					.show();
				}else{
					//remove from the selected templatePlans array
					var index = null;
					for(var a=0; a<plenty_admin.DATA.selectedTemplatePlans.length; a++){
						var stp = plenty_admin.DATA.selectedTemplatePlans[a];
						if(stp.id == thisTP.id){
							plenty_admin.DATA.selectedTemplatePlans.splice(a, 1);
							if(plenty_admin.DATA.selectedTemplatePlans.length == 0){
								plenty_admin.UI.plans.add_template_plan_modal
								.find("button.add-plan, button.next")
								.prop('disabled', true)
								.end()
								.find('.nav-tabs a[data-target="#plans_criterea"]')
								.parent()
								.hide();
							}
							
							$(this)
							.closest("tr")
							.removeClass("alert-success");
					
							return;
						}
					}
					$(this)
					.closest("tr")
					.removeClass("alert-success");
				}
			})
			.end()
			.click(function(e){
				if(e.target.type !== "checkbox"){
					$(this)
					.find("input.selectTemplatePlan")
					.trigger("click");
				}
			});
			
			$tpBody
			.append($templatePlan);
		}
		
		plenty_admin.UI.plans.init();
	});
	
	//populate filter panel options based on current user filters
	plenty_admin.DATA.load_user_filters(function(filters){	
		//console.log("filters", filters);
		plenty_admin.DATA.userFilters = filters().data;
		plenty_admin.DATA.data_source = plenty_admin.DATA.userFilters.possibleFilteringEntitiesDtoList;
		plenty_admin.DATA.update_filters(function(){
			console.log("init filters");
			plenty_admin.UI.plans.toggleFilters
			.parent()
			.fadeIn("fast")
			.parent()
			.find(".filter_loader")
			.fadeOut("fast");
			
			//populate the organizations dropdown in Add Plan modal
			var organizationOptionsHTML = "";
			for(var o=0; o<plenty_admin.DATA.userFilters.possibleFilteringEntitiesDtoList.organizations.length; o++)
			{
				var org = plenty_admin.DATA.userFilters.possibleFilteringEntitiesDtoList.organizations[o];
				organizationOptionsHTML += "<option value='"+org.id+"'>"+org.name+"</option>";
			}
			
			plenty_admin.UI.plans.add_template_plan_modal
			.find("select#organizationList")
			.find("option")
			.remove()
			.end()
			.append(organizationOptionsHTML);
			
		}, true);
	});
});