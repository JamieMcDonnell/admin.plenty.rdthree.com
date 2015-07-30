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
		description:"dummy plan because getting profit projection failed"
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
	
	plenty_admin.UI.plans.add_template_plan_modal
	.find("input.datepicker").datepicker({
		autoclose:true, 
		startDate: '+0d'
	});
	
	plenty_admin.UI.plans.DOM
	.find(".btn.add-plan-to-displayed")
	.click(function(){
		plenty_admin.UI.plans.add_template_plan_modal
		.data("fieldSet", plenty_admin.UI.plans.DOM.find("tbody.fieldPlans"))
		.modal("show");
	});
	
	plenty_admin.UI.plans.add_template_plan_modal
	.find("button.add-plan")
	.click(function(){
		var selectedPlanTemplates = [];
		var $this = $(this);
		plenty_admin.UI.plans.add_template_plan_modal.find("input[type='checkbox']:checked:enabled").each(function(){
			selectedPlanTemplates.push($(this).closest("tr"));
		});
		
		console.log("selectedPlanTemplates", selectedPlanTemplates);
		for(var t=0; t<selectedPlanTemplates.length; t++){
			//calculateCostForPlan
			//get cost calculation to push into plans list
			var templatePlanDto = selectedPlanTemplates[t].data("templatePlan");
			
			var rDateObj = plenty_admin.UI.plans.add_template_plan_modal
							.find("#replaceStartingDate").data("datepicker").date;
			
			var replaceStartingDate = rDateObj.getUTCFullYear()+"-"+
										((rDateObj.getUTCMonth()+1) < 10 ? "0"+(rDateObj.getUTCMonth()+1) : rDateObj.getUTCMonth()+1)+"-"+
										(rDateObj.getUTCDate() < 10 ? "0"+rDateObj.getUTCDate() : rDateObj.getUTCDate());
										//(rDateObj.getUTCHours() < 10 ? "0"+rDateObj.getUTCHours() : rDateObj.getUTCHours())+":"+
										//(rDateObj.getUTCMinutes() < 10 ? "0"+rDateObj.getUTCMinutes() : rDateObj.getUTCMinutes());
			
			/*			
			var pDateObj = plenty_admin.UI.plans.add_template_plan_modal
							.find("#plantationDate").data("datepicker").date;
			
			var plantationDate = pDateObj.getUTCFullYear()+"-"+
										((pDateObj.getUTCMonth()+1) < 10 ? "0"+(pDateObj.getUTCMonth()+1) : pDateObj.getUTCMonth()+1)+"-"+
										(pDateObj.getUTCDate() < 10 ? "0"+pDateObj.getUTCDate() : pDateObj.getUTCDate())+" "+
										(pDateObj.getUTCHours() < 10 ? "0"+pDateObj.getUTCHours() : pDateObj.getUTCHours())+":"+
										(pDateObj.getUTCMinutes() < 10 ? "0"+pDateObj.getUTCMinutes() : pDateObj.getUTCMinutes());
			*/
			
			var activeFields = plenty_admin.UI.plans.add_template_plan_modal.data("fieldSet");
			for(var fs=0; fs<activeFields.length; fs++){
				var currentFS = activeFields[fs];
				var planReplacementDto = {
										organizationId: templatePlanDto.organizationId,
										planId: $(currentFS).data("profitProjection").planDto.id,
										templatePlanId: templatePlanDto.id, //this should be the ID of a newly added templatePlan
										requestingUserId: plenty_admin.DATA.userDetails.id,
										replaceStartingDate: replaceStartingDate,
										fieldCropToReplacePlanForId: $(currentFS).data("profitProjection").fieldCropDto.id,
										plantationDate: $(currentFS).data("profitProjection").planDto.plantationDate,
										commit: false
									}
										
				plenty_admin.REST.changePlan(planReplacementDto, function(profitProjection){
					plenty_admin.UI.plans.add_template_plan_modal
					.data("fieldSet")
					.each(function(){
						var $projectionPlanHTML = plenty_admin.UI.plans.create_plan_projection(profitProjection, "templatePlan");
						
						$projectionPlanHTML
						.data("planReplacementDto", planReplacementDto);
						
						$(this)
						.append($projectionPlanHTML);
					});
					
					plenty_admin.UI.plans.add_template_plan_modal
					.modal("hide");
				});
			}
		}
	});
}

plenty_admin.UI.plans.create_plan_projection = function(profitProjection, type){
	var plan = profitProjection.planDto;
	var field = profitProjection.fieldDto;
	var fieldCrop = profitProjection.fieldCropDto;
		
	var $planHTML = $([
			"<tr data-id='"+plan.id+"' class='plan"+(plan.active ? " active" : "")+" pointer "+type+"' title='View Plan Details'>",
				"<td width='6%' class='activeToggle'></th>",
				"<td width='10.66%'>"+plan.name+"</th>",
				"<td width='16.66%'>"+plan.description+"</th>",
				"<td width='8%'>"+plan.startTime+"</th>",
				"<td width='12.66%'>"+numeral(profitProjection.revenue).format('$0,0.00')+"</th>",
				"<td width='12.66%'>"+numeral(profitProjection.expense).format('$0,0.00')+"</th>",
				"<td width='16.66%'>"+numeral(profitProjection.profit).format('$0,0.00')+"</th>",
				"<td width='16.66%' class='text-right'>"+numeral(profitProjection.profitPerAcre).format('$0,0.00')+"</th>",
			"</tr>"
		].join("")).data("profitProjection", profitProjection);
		
		var $activeToggle = $("<i class=' glyphicon glyphicon-ok active "+(plan.active ? "true" : "false")+"' title='Use this plan' data-toggle='tooltip' data-placement='top'></i>");
		$activeToggle
		.click(function(e){
			e.stopPropagation();
			var $this = $(this);
			var profitProjection = $this.closest("tr").data("profitProjection");
			
			if($(this).hasClass("true")){
				//deactivate this plan from this field
				$(this)
				.removeClass("true")
				.addClass("false")
				.closest("tr.plan")
				.removeClass("active");
			}else{
				
				var $modalBody = 
					$('<div class="row">' +
						'<div class="col-md-12"> ' +
							'<p>Are you sure you want to change Plan X for Plan Y starting on MM/DD/YYYY?</p>'+
						'</div> '+
					'</div>');
				/*
				var $modalBody = 
					$('<div class="row">' +
					'<div class="col-md-12"> ' +
						'<form>' +
							'<div class="form-group col-md-12 mln">' +
								'<label class="col-md-12 control-label" for="replaceStartingDate">Replace Start Date</label>' +
								'<div class="col-md-12">' +
									'<input id="replaceStartingDate" name="replaceStartingDate" type="text" placeholder="Pick Start Date" class="datepicker form-control input-md">' +
								'</div>' +
							'</div>' +
							
							'<div class="form-group col-md-6 mrn">' +
								'<label class="col-md-12 control-label" for="plantationDate">Plantation Date</label>' +
								'<div class="col-md-12">' +
									'<input id="plantationDate" name="plantationDate" type="text" placeholder="Pick Plantation Date" class="datepicker form-control input-md">' +
								'</div>' +
							'</div>' +
							
						'</form>'+
					'</div> '+
				'</div>');
				*/
				
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
								
								console.log("profitProjection", profitProjection);
								/*	
								var rDateObj = $modalBody.find("#replaceStartingDate").data("datepicker").date;
								
								var replaceStartingDate = rDateObj.getUTCFullYear()+"-"+
															((rDateObj.getUTCMonth()+1) < 10 ? "0"+(rDateObj.getUTCMonth()+1) : rDateObj.getUTCMonth()+1)+"-"+
															(rDateObj.getUTCDate() < 10 ? "0"+rDateObj.getUTCDate() : rDateObj.getUTCDate());
															//(rDateObj.getUTCHours() < 10 ? "0"+rDateObj.getUTCHours() : rDateObj.getUTCHours())+":"+
															//(rDateObj.getUTCMinutes() < 10 ? "0"+rDateObj.getUTCMinutes() : rDateObj.getUTCMinutes());
								
												
								var pDateObj = $modalBody.find("#plantationDate").data("datepicker").date;
								
								var plantationDate = pDateObj.getUTCFullYear()+"-"+
															((pDateObj.getUTCMonth()+1) < 10 ? "0"+(pDateObj.getUTCMonth()+1) : pDateObj.getUTCMonth()+1)+"-"+
															(pDateObj.getUTCDate() < 10 ? "0"+pDateObj.getUTCDate() : pDateObj.getUTCDate())+" "+
															(pDateObj.getUTCHours() < 10 ? "0"+pDateObj.getUTCHours() : pDateObj.getUTCHours())+":"+
															(pDateObj.getUTCMinutes() < 10 ? "0"+pDateObj.getUTCMinutes() : pDateObj.getUTCMinutes());
															
								console.log("replaceStartingDate", replaceStartingDate);
								console.log("plantationDate", plantationDate);
								*/
								
								var planReplacementDto = {
									organizationId: profitProjection.planDto.organizationId,
									planId: profitProjection.planDto.id,
									templatePlanId: profitProjection.planDto.id, //this should be the ID of a newly added templatePlan
									requestingUserId: plenty_admin.DATA.userDetails.id,
									replaceStartingDate: replaceStartingDate,
									fieldCropToReplacePlanForId: profitProjection.fieldCropDto.id, 
									plantationDate: null,
									commit: true
								}
								
								console.log("planReplacementDto", planReplacementDto);
								
								$this.closest("tr.plan").data("planReplacementDto", planReplacementDto);
								
								plenty_admin.REST.changePlan(planReplacementDto, function(){
									//remove active class from other plans 
									$this
									.closest("tbody")
									.find("tr.plan")
									.removeClass("active")
									.find("i.active") 
									.removeClass("true")
									.addClass("false");
									
									//enable this plan for this field
									$this
									.removeClass("false")
									.addClass("true")
									.closest("tr.plan")
									.addClass("active");
									
									plenty_admin.HELPER.hideLoadingOverlay();
								});
							}
						}
					}
				});
			}
			return false;
		});
		
		$planHTML
		.find("td.activeToggle")
		.append($activeToggle)
		.end()
		.click(function(e){
			e.stopPropagation();
			console.log("clicked a plan");
			
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
					name:field.name+", "+plan.name,
					clickHandler:null
				}
			];
			
			plenty_admin.UI.plan.DOM
			.find(".breadcrumb-trail")
			.remove()
			.end()
			.prepend(plenty_admin.UI.build_breadcrumb_trail(plan_breadcrumb));
			
			plenty_admin.UI.plan.init(profitProjection, $(this).hasClass("templatePlan"));
		});
		
		return $planHTML;
}

plenty_admin.UI.plans.populate = function(){
	plenty_admin.UI.plans.plansTable
	.find("tbody")
	.remove();
		
		var legendItems = {};
		plenty_admin.UI.plans.allCropTypes = [];
		
	for(var f=0; f<plenty_admin.DATA.plans.length; f++){
		var profitProjection = plenty_admin.DATA.plans[f];
		var plan = profitProjection.planDto;
		var field = profitProjection.fieldDto;
		var fieldCrop = profitProjection.fieldCropDto;
			
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
		
		if(plenty_admin.UI.plans.plansTable.find(".fieldPlans_"+field.id).length == 0){
			var $tbody = $("<tbody class='fieldPlans fieldPlans_"+field.id+"'/>");
			$tbody.data("profitProjection", profitProjection);
			$fieldHTML = $([
					"<tr class='field-row category'>",
						"<td class='fieldPreview'><img src='' class='pointer'/></td>",
						"<td colspan='6'><h4 class='mbn mtn'>"+field.name+"</h4><span class='fieldDetails capitalize'>"+field.acres+"ac, "+plenty_admin.DATA.cropTypes[fieldCrop.cropTypeId].name+"</span></td>",
						"<td>",
							"<button class='btn btn-primary btn-inverted pull-right add-field-plan' title='Add a plan template to compare cost projections'>",
								"<span class='glyphicon glyphicon-plus'></span>Add Plan Template",
							"</button>",
						"</td>",
					"</tr>"
			].join(""));
			
			$fieldHTML
			.data("fieldDto", field)
			.click(function(){
				plenty_admin.UI.filters.toggleFilters("close");	
				plenty_admin.UI.plans.farms_quickfilter.popover("hide");
				plenty_admin.UI.plans.orgs_quickfilter.popover("hide");
			})
			.find("button.add-field-plan")
			.click(function(){
				console.log("add field plan");
				var $this = $(this);
				
				plenty_admin.UI.plans.add_template_plan_modal
				.data("fieldSet", $this.closest("tbody.fieldPlans"))
				.modal("show");
			});
			
			plenty_admin.UI.plans.plansTable
			.append($fieldHTML);
			
			$tbody
			.append($fieldHTML);
			
			//create field thumbnail static map url
			plenty_admin.REST.fields.getAllBoundaryPointsByFieldAndBoundaryType(profitProjection.fieldDto.id, 2, function(boundaries, fieldId, cropTypeId){
				//console.log("got boundaries for field: ", boundaries, fieldId);
				
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
				
				set_thumb_url(thumb_url);
				
				field_thumb
				.popover({
						content:"<img src='"+thumb_url+"' style='width:110px; height:110px;'/>",
						title: field_thumb.closest("tr").data("fieldDto").name,
						html:true,
						id:"",
						placement:"top",
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
			}, fieldCrop.cropTypeId);
		}else{
			var $tbody = plenty_admin.UI.plans.plansTable.find(".fieldPlans_"+field.id);
		}
		
		var $planHTML = plenty_admin.UI.plans.create_plan_projection(profitProjection);
		$tbody
		.append($planHTML);
		
		plenty_admin.UI.plans.plansTable
		.append($tbody);
	}

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
			plenty_admin.UI.plans.populate();
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
			console.error("getting profit proje tion for plan dto failed:: ", err);
			
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
plenty_admin.REST.changePlan = function(planReplacementDto, callback){
	plenty_admin.REST.changePlan = plenty_admin.api.all("plan/changePlan");
	plenty_admin.REST.changePlan.post(planReplacementDto)
	.then(
		function(changedPlan){
			console.log("changed plan: ", changedPlan().data);
			if(callback && typeof callback === "function"){
				callback(changedPlan().data);
			}
		},
		function(err){
			console.error("changing plan failed: ", err);
			bootbox.dialog({
				message: "Could not apply plan to field! - "+err.status+" - "+err.statusText,
				className: "danger",
				buttons: {
					danger: {
					  label: "OK",
					  className: "btn-danger",
					  callback: function(){
							plenty_admin.HELPER.hideLoadingOverlay();
							
							/* HACK - return dummy profitProjectionDto for UI testing only */
							callback(plenty_admin.UI.plans.dummyProfitProj);
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
				'<tr>',
					'<td width="5%">',
						'<input type="checkbox" class="selectTemplatePlan"></input>',
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
				}else{
					//remove from the selected templatePlans array
					var index = null;
					for(var a=0; a<plenty_admin.DATA.selectedTemplatePlans.length; a++){
						var stp = plenty_admin.DATA.selectedTemplatePlans[a];
						if(stp.id == thisTP.id){
							plenty_admin.DATA.selectedTemplatePlans.splice(a, 1);
							return;
						}
					}
				}
			})
			.end();
			
			console.log("$templatePlan", $templatePlan);
			
			$tpBody
			.append($templatePlan);
		}
		
		plenty_admin.UI.plans.init();
	});
	
	//populate filter panel options based on current user filters
	plenty_admin.DATA.load_user_filters(function(filters){	
		console.log("filters", filters);
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
		}, true);
	});
});