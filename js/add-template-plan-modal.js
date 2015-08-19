/* add-template-plan-modal.js */
plenty_admin.UI.add_template_plan = {
	modal: $("body").find(".modal#add-template-plan"),
	init: function(){
		//check if it has already been INIT'd
		if(plenty_admin.UI.add_template_plan.modal.data("ready")){
			return;
		}
		//populate the organizations dropdown in Add Plan modal
		console.log("plenty_admin.UI.add_template_plan - INIT");
		var organizationOptionsHTML = "";
		for(id in plenty_admin.DATA.organizations)
		{
			if(
				plenty_admin.DATA.organizations.hasOwnProperty(id)
				&& id !== "length"
			){
				var org = plenty_admin.DATA.organizations[id];
				organizationOptionsHTML += "<option value='"+id+"'>"+org.name+"</option>";
			}
		}
		
		var owningOrgIdList = plenty_admin.UI.add_template_plan.modal
		.find("select#add_plan_owningOrgId");
		
		owningOrgIdList
		.find("option")
		.remove()
		.end()
		.append(organizationOptionsHTML);
		
		//get the equipmentEquipment types for this org and populate the equipment dropdowns
		var equipmentTypeList = plenty_admin.UI.add_template_plan.modal
		.find("select#add_task_equipment_types");
		
		equipmentTypeList
		.find("option")
		.remove()
		.end()
		.append("<option value='' disabled selected style='display:none;'>Choose equipment type</option>");
		
		//populate equipment types
		for(id in plenty_admin.DATA.equipmentTypes)
		{
			if(
				plenty_admin.DATA.equipmentTypes.hasOwnProperty(id)
				&& id !== "length"
			){
				var equip = plenty_admin.DATA.equipmentTypes[id];
				var $equipmentTypeOptionsHTML = $("<option value='"+id+"'>"+equip.name+"</option>");
				
				$equipmentTypeOptionsHTML
				.data("dto", equip);
				
				equipmentTypeList
				.append($equipmentTypeOptionsHTML);
				
				var specificEquipment = {};
				for(_id in plenty_admin.DATA.equipmentEquipmentTypes){
					if(plenty_admin.DATA.equipmentEquipmentTypes.hasOwnProperty(_id)){
						var et = plenty_admin.DATA.equipmentEquipmentTypes[_id];
						//console.log("equipment: ", et, id);
						if(et.equipmentTypeId === parseInt(id)){
							specificEquipment[et.id] = et;
						}
					}
				}
				$equipmentTypeOptionsHTML.data("items", specificEquipment);
			}
		}
		
		
		//populate product types
		var productTypeList = plenty_admin.UI.add_template_plan.modal
		.find("select#add_task_product_types");
		
		productTypeList
		.find("option")
		.remove()
		.end()
		.append("<option value='' disabled selected style='display:none;'>Choose product type</option>");
		
		for(id in plenty_admin.DATA.productTypes)
		{
			if(
				plenty_admin.DATA.productTypes.hasOwnProperty(id)
				&& id !== "length"
			){
				var prod = plenty_admin.DATA.productTypes[id];
				var $productTypeOptionsHTML = $("<option value='"+id+"'>"+prod.name+"</option>");
				
				$productTypeOptionsHTML.data("dto", prod);
				
				productTypeList
				.append($productTypeOptionsHTML);
				
				var specificProduct = {};
				for(_id in plenty_admin.DATA.allProducts){
					if(plenty_admin.DATA.allProducts.hasOwnProperty(_id)){
						var pt = plenty_admin.DATA.allProducts[_id];
						//console.log("product: ", pt, id);
						if(pt.productTypeId === parseInt(id)){
							specificProduct[pt.id] = pt;
						}
					}
				}
				$productTypeOptionsHTML.data("items", specificProduct);
			}
		}
		
		//populate activity types
		var activityTypeOptionsHTML = "";
		for(id in plenty_admin.DATA.activityTypes)
		{
			if(
				plenty_admin.DATA.activityTypes.hasOwnProperty(id)
				&& id !== "length"
			){
				var activity = plenty_admin.DATA.activityTypes[id];
				activityTypeOptionsHTML += "<option value='"+id+"'>"+activity.name+"</option>";
			}
		}
		
		var activityTypeList = plenty_admin.UI.add_template_plan.modal
		.find("select#add_activity_type");
		
		activityTypeList
		.find("option")
		.remove()
		.end()
		.append(activityTypeOptionsHTML);
		
		plenty_admin.UI.add_template_plan.modal
		.on('show.bs.modal', function () {
			$(this).find('.modal-content').css('height', $( window ).height()*0.9);
			
			//populate lists that are spicific to the selected organization
			//populate skill types
			var skillTypeList = plenty_admin.UI.add_template_plan.modal
			.find("select#add_task_labour_types");
			
			skillTypeList
			.find("option")
			.remove()
			.end()
			.append("<option value='' disabled selected style='display:none;'>Choose labour type</option>");
			
			for(id in plenty_admin.DATA.labourTypes)
			{
				if(
					plenty_admin.DATA.labourTypes.hasOwnProperty(id)
					&& id !== "length"
				){
					var skill = plenty_admin.DATA.labourTypes[id];
					var $skillTypeOptionsHTML = $("<option value='"+id+"'>"+skill.name+"</option>");
					
					$skillTypeOptionsHTML
					.data("dto", skill);
					
					skillTypeList
					.append($skillTypeOptionsHTML);
					
					var specificESkills = {};
					//for(var s=0; s<plenty_admin.DATA.current_organization.skills.length; s++){
					for(_id in plenty_admin.DATA.current_organization.skillsAndRates){
						if(plenty_admin.DATA.current_organization.skillsAndRates.hasOwnProperty(_id)){
							var _skill = plenty_admin.DATA.current_organization.skillsAndRates[_id];
							//console.log("_skill: ", _skill.skillId, id);
							if(_skill.skillId === parseInt(id)){
								specificESkills[_skill.id] = _skill;
							}
						}
					}
					$skillTypeOptionsHTML.data("items", specificESkills);
				}
			}
		})
		.on('hidden.bs.modal', function () {
			plenty_admin.UI.add_template_plan.clear();
		})
		.find(".task-types-tabs a")
		.click(function (e) {
		  e.preventDefault()
		  console.log("tab clicked", $(this));
		  $(this).tab('show');
		})
		.on('shown.bs.tab', function (e) {
			var url = $(e.target).prop("href");
			var hash = url.substring(url.indexOf('#')+1);
			console.log("hash", hash);
			plenty_admin.UI.add_template_plan.modal
			.find(".tab-content.task-types .tab-pane")
			.removeClass("active")
			.end()
			.find(".tab-content.task-types .tab-pane#"+hash)
			.addClass("active");
		})
		.end()
		.find("select.specific_items")
		.on("change", function(){
			var $this = $(this);
			var type = null;
			
			if($this.prop("id").indexOf("product") > -1){
				type = "product";
			}else if($this.prop("id").indexOf("equipment") > -1){
				type = "equipment";
			}else if($this.prop("id").indexOf("product") > -1){
				type = "product";
			}
			
			console.log("type", type);
			if(
				$(this).find("option:selected").val()
				&& type === "product"
			){
				$(this)
				.closest(".tab-pane")
				.find(".component_qty")
				.prop("disabled", false);
			}else{
				$(this)
				.closest(".tab-pane")
				.find(".component_qty")
				.val(1)
				.prop("disabled", true);
			}
			
		})
		.end()
		.find("select#add_activity_type")
		.on("change", function(){
			plenty_admin.UI.add_template_plan.addActivityForm
			.removeClass("harvest");
			
			if($(this).find("option:selected").text().toLowerCase() === "harvest"){
				plenty_admin.UI.add_template_plan.addActivityForm
				.addClass("harvest");
			}
		})
		.end()
		.find("select.component_type")
		.on("change", function(){
			var $this = $(this);
			var selected = $this.find("option:selected");
			var selectedDto = selected.data("dto");
			var specificItems = selected.data("items");
			var specificItemsList = $this.parent().find("select.specific_items");
			
			if(selectedDto.unitName){
				$this
				.closest(".tab-pane")
				.find(".uom")
				.text(selectedDto.unitName)
				.show();
			}
			
			var type = null;
			if($this.prop("id").indexOf("product") > -1){
				type = "product";
			}else if($this.prop("id").indexOf("equipment") > -1){
				type = "equipment";
			}else if($this.prop("id").indexOf("labour") > -1){
				type = "labour";
			}
			
			if(Object.keys(specificItems).length > 0){
				//list specific items for this type and show them
				var nameProp = "name";
				switch(type){
					case "product":
						nameProp = "productName";
					break;
					
					case "equipment":
						nameProp = "equipmentName";
					break;
					
					case "labour":
						nameProp = "userFirstAndLastName";
					break;
				}
				var specificItemsHTML = "<option value='' selected'>Choose specific "+selected.text()+"</option>";
				for(id in specificItems){
					if(specificItems.hasOwnProperty(id)){
						var item = specificItems[id];
						specificItemsHTML += "<option value='"+item.id+"'>"+item[nameProp]+"</option>";
					}
				}
				
				specificItemsList
				.find("option")
				.remove()
				.end()
				.append(specificItemsHTML)
				.show();
			}

			return false;
		})
		.end()
		.find("button.task_add_component")
		.on("click", function(){
			var $this = $(this);
			var $tp = $this.closest(".tab-pane");
			var valid = plenty_admin.HELPER.validateForm($tp);
			
			if(valid){
				var type = $tp.data("type");
				var $task_items_table = $tp.find("table.task-items tbody");
				
				//create the task item
				var task_component = {
					id: 		parseInt($tp.find(".component_type option:selected").val()),
					qty: 	parseInt($tp.find(".component_qty").val()),
				};
				
				//check if a specific item has been added - if so, add it to the task component
				if($tp.find("select.specific_items option:selected").length > 0){
					task_component.specificId = parseInt($tp.find("select.specific_items option:selected").val());
				}
				
				console.log("task_component", task_component);
				
				//disable this type so it can only be added once
				$tp
				.find(".component_type option:selected")
				.prop("disabled", true)
				.end()
				.find(".component_type option:eq(0)")
				.show()
				.prop("selected", true)
				.end()
				.find("select.specific_items, .uom")
				.hide();
				
				//add the task item to the correct DOM table
				var $taskComponent = plenty_admin.UI.add_template_plan.build_task_component(task_component, type);
				$task_items_table.append($taskComponent);
			}
			
			return false;
		})
		.end()
		.find("button.save_activity")
		.on("click", function(){
			var $this = $(this);
			plenty_admin.UI.add_template_plan.generate_activityDto($(this), false);
			return false;
		})
		.end()
		.find("button.update_activity")
		.on("click", function(){
			var index = $(this).data("activity").data("index");
			console.log("index", index);
			plenty_admin.UI.add_template_plan.generate_activityDto($(this), true, index);
			return false;
		})
		.end()
		.find("button.add_activity")
		.on("click", function(){
			var $this = $(this);
			
			$this
			.hide();
			
			plenty_admin.UI.add_template_plan.addActivityForm
			.find(".save_activity")
			.show()
			.end()
			.find(".update_activity")
			.hide()
			.end()
			.slideDown("fast");
		})
		.end()
		.find("button.add_task")
		.on("click", function(){
			var $this = $(this);
			
			$this
			.slideUp("fast");
			
			plenty_admin.UI.add_template_plan.minimise_all_tasks();
			
			plenty_admin.UI.add_template_plan.addTaskAndTaskComponents
			.slideDown("fast");
		})
		.end()
		.find("button.save_task")
		.on("click", function(){
			plenty_admin.UI.add_template_plan.generate_templateTaskDto($(this), false);
			return false;
		})
		.end()
		.find("button.update_task")
		.on("click", function(){
			plenty_admin.UI.add_template_plan.generate_templateTaskDto($(this), true);
			return false;
		})
		.end()
		.find("button.cancel_activity")
		.on("click", function(e){
			e.preventDefault();
			var $this = $(this);
			
			$this
			.closest(".activities_management")
			.find("form")
			.slideUp("fast", function(){
				plenty_admin.UI.add_template_plan.clear_add_activity_form();
				
				$this
				.closest(".activities_management")
				.find(".activity_list")
				.slideDown("fast")
				.end()
				.find("button.add_activity")
				.slideDown("fast");
			});
		})
		.end()
		.find("button.cancel_task")
		.on("click", function(e){
			e.preventDefault();
			var $this = $(this);
			
			//remove active class from all tasks
			plenty_admin.UI.add_template_plan.taskListHolder
			.find(".task.active")
			.removeClass("active");
			
			plenty_admin.UI.add_template_plan.addTaskAndTaskComponents
			.slideUp("fast", function(){
				plenty_admin.UI.add_template_plan.clear_add_task_form();
				
				plenty_admin.UI.add_template_plan.addTaskBtn
				.slideDown("fast");
			})
		})
		.end()
		.find("button.add")
		.on("click", function(){
			//collect all activities and their associated tasks
			var addPlanForm = plenty_admin.UI.add_template_plan.modal.find("form.add_plan_form");
			var valid = plenty_admin.HELPER.validateForm(addPlanForm);
			var $this = $(this);
			
			//hide any current errors in activities
			plenty_admin.UI.add_template_plan.modal.find(".activity .alert.help-block").slideUp("fast");
			
			if(valid){
				var activities = plenty_admin.UI.add_template_plan.modal.find(".activity");
				console.log("activities", activities, activities.length);
				if(activities.length <= 0){
					plenty_admin.UI.add_template_plan.activityListHolder
					.parent()
					.find(".alert.help-block:eq(0)")
					.slideDown("fast");
				}else{
					plenty_admin.UI.add_template_plan.activityListHolder
					.parent()
					.find(".alert.help-text:eq(0)")
					.hide();
					
					var activitiesAndTasks = [];
					for(var a=0; a<activities.length; a++){
						var $activity = $(activities[a]);
						var templateTaskDtos = [];
						var activityTasksList = plenty_admin.UI.add_template_plan.taskListHolder.find("ul.task_list.activity_tasks_"+$activity.data("index")+" .task");
						
						//alert the user if an activity has no tasks
						if(activityTasksList.length <= 0){
							$activity
							.find(".help-block.alert")
							.slideDown("fast");
							
							console.log("Activity Has No Tasks ;(");
							
							return false;
						}
						
						for(var t=0; t<activityTasksList.length; t++){
							var $task = $(activityTasksList[t]);
							templateTaskDtos.push($task.data("taskDto"));
						}
						
						$activity.data("activityDto").indexInPlan = $activity.index();
						
						var taskWithActivities = {
							templateActivityDto:$activity.data("activityDto"),
							templateTaskDtos:templateTaskDtos
						};
						activitiesAndTasks.push(taskWithActivities);
					}
					
					//all validation tests passed - disable the button
					$this
					.button("loading");
					
					plenty_admin.HELPER.showLoadingOverlay("New Plan");
					
					var TemplatePlanCreationDto = {
							owningOrgId:plenty_admin.DATA.current_organization.id,//parseInt(owningOrgIdList.find("option:selected").val()),
							planName:addPlanForm.find("#add_plan_name").val(),
							planDescription:addPlanForm.find("#add_plan_desc").val(),
							activitiesAndTasks:activitiesAndTasks
					}
					
					console.log("TemplatePlanCreationDto", TemplatePlanCreationDto);
					
					plenty_admin.REST.plans.createTemplatePlan(TemplatePlanCreationDto, function(templatePlan){
						console.log("add this templatePlan to the list: ", templatePlan);
						var $planHTML = plenty_admin.UI.organization.addItemFunctionality($(plenty_admin.UI.create_item(templatePlan, "plans")));
							
						plenty_admin.UI.organization.DOM.find("table.plansList")
						.find(".noItemsText")
						.remove()
						.end()
						.append($planHTML);
						
						var $tableHeader = plenty_admin.UI.organization.DOM.find("table.plansListHeader");
						
						//build the table header if it does not already exist 
						if($tableHeader.find("thead").length == 0){
							var headerHTML = plenty_admin.UI.create_header_row(templatePlan, "plans");
							
							$tableHeader
							.html("")
							.append(headerHTML);
						}
										
						plenty_admin.UI.add_template_plan.hide();
						
						plenty_admin.HELPER.hideLoadingOverlay();
					});
				}
			}
			
			return false;
		})
		.end();
		
		plenty_admin.UI.add_template_plan.modal
		.data("ready", true);
	},
	minimise_all_tasks: function(){
		//minimise all existing tasks
		plenty_admin.UI.add_template_plan.taskListHolder
		.find(".task_list .task")
		.removeClass("open")
		.find(".task-components")
		.slideUp("fast");
	},
	generate_activityDto: function($this, replaceEl, index){
		var addActivityForm = plenty_admin.UI.add_template_plan.addActivityForm;
		
		var valid = plenty_admin.HELPER.validateForm(addActivityForm);
		
		if(valid){
			var activityDto = {
				templatePlanId:		null,
				activityTypeId:		parseInt(addActivityForm.find("#add_activity_type option:selected").val()),
				daysFromPlanting:	parseInt(addActivityForm.find("#add_activity_days_from_planting").val())
			}
			
			if(addActivityForm.hasClass("harvest")){
				activityDto.expectedYieldPerAcre = addActivityForm.find("#add_activity_expected_yield").val();
				activityDto.uomId = 1;
				//need to add yield UOM here once DB supports it
			}
			
			console.log("activityDto", activityDto);
			
			if(replaceEl){
				$this.data("activity").replaceWith(plenty_admin.UI.add_template_plan.build_activity_element(activityDto, index));
			}else{
				plenty_admin.UI.add_template_plan.build_activity_element(activityDto);
			}
			
			$this
			.closest(".activities_management")
			.find(".alert.help-block:eq(0)")
			.hide()
			.end()
			.find("form")
			.slideUp("fast", function(){
				plenty_admin.UI.add_template_plan.clear_add_activity_form();
				
				$this
				.closest(".activities_management")
				.find(".activity_list")
				.slideDown("fast")
				.end()
				.find("button.add_activity")
				.slideDown("fast");
				
				plenty_admin.UI.add_template_plan.addTaskAndTaskComponents
				.slideDown("fast");
				
				plenty_admin.UI.add_template_plan.addTaskBtn
				.slideUp("fast")
				.prop("disabled", false);
				
				plenty_admin.UI.add_template_plan
				.modal
				.find(".noActivityForTasks")
				.slideUp("fast");
				
				plenty_admin.UI.add_template_plan.minimise_all_tasks();
			});
			
			if(plenty_admin.UI.add_template_plan.activityListHolder.find("li.list-group-item.activity").length >1){
				//sort the list based on days from activity start
				plenty_admin.UI.add_template_plan.order_activities_by_days_from_planting();
			}
		}
	},
	generate_templateTaskDto: function($this, replaceEl){
		var addTaskForm = plenty_admin.UI.add_template_plan.addTaskForm;
		var addTaskAndTaskComponents = plenty_admin.UI.add_template_plan.addTaskAndTaskComponents;
		
		var equipmentComponents = addTaskAndTaskComponents.find("table.equipment-items tbody tr.task-element");
		var labourComponents = addTaskAndTaskComponents.find("table.labour-items tbody tr.task-element");
		var productComponents = addTaskAndTaskComponents.find("table.product-items tbody tr.task-element");
		var numTaskElements = equipmentComponents.length + labourComponents.length + productComponents.length;
		
		var valid = plenty_admin.HELPER.validateForm(addTaskForm);
		
		if(
			valid
			&& numTaskElements >= 1
		){
			//get the list of selected equipment IDs
			var equipmentIds = [];
			var anySpecificEquipmentIds = [];
			for(var l=0; l<equipmentComponents.length; l++){
				var taskComponent = $(equipmentComponents[l]).data("task_component");
				
				if(taskComponent.specificId){
					anySpecificEquipmentIds.push(taskComponent.specificId);
				}else{
					equipmentIds.push(taskComponent.id);
				}
			}
			console.log("equipmentIds:", equipmentIds);
			console.log("anySpecificEquipmentIds:", anySpecificEquipmentIds);
			
			//get the list of selected labour IDs
			var labourIds = [];
			var anySpecificLabourIds = [];
			
			for(var l=0; l<labourComponents.length; l++){
				var taskComponent = $(labourComponents[l]).data("task_component");
				if(taskComponent.specificId){
					anySpecificLabourIds.push(taskComponent.specificId);
				}else{
					labourIds.push($(labourComponents[l]).data("task_component").id);
				}
				
			}
			console.log("labourIds:", labourIds);
			console.log("anySpecificLabourIds:", anySpecificLabourIds);
			
			//get the list of selected labour IDs
			var productAmountPairs = [];
			var anySpecificProductIds = [];
			for(var l=0; l<productComponents.length; l++){
				var taskComponent = $(productComponents[l]).data("task_component");
				var prod = {
					productTypeId:taskComponent.id,
					amount:taskComponent.qty
				};
				
				productAmountPairs.push(prod);
				
				if(taskComponent.specificId){
					anySpecificProductIds.push(taskComponent.specificId);
				}
			}
			console.log("productAmountPairs:", productAmountPairs);
			console.log("anySpecificProductIds:", anySpecificProductIds);
			
			var templateTaskDto = {
				id:null,
				created:null,
				lastModified:null,
				name:addTaskForm.find("#add_task_name").val(),
				templateActivityId:null,
				daysFromActivityStart:parseInt(addTaskForm.find("#add_task_days_from_start").val()),
				labourIds:labourIds,
				equipmentIds:equipmentIds,
				productAmountPairs:productAmountPairs,
				anySpecificEquipmentIds:anySpecificEquipmentIds,
				anySpecificProductIds:anySpecificProductIds,
				anySpecificLabourIds:anySpecificLabourIds
			}
			
			console.log("templateTaskDto", templateTaskDto);
			
			//add the task element to the DOM
			if(replaceEl){
				$this.data("task").replaceWith(plenty_admin.UI.add_template_plan.build_task_element(templateTaskDto));
			}else{
				plenty_admin.UI.add_template_plan.build_task_element(templateTaskDto);
			}
			
			var selectedActivityIndex = plenty_admin.UI.add_template_plan.activityListHolder.find(".activity.active").data("index");
			var task_list = plenty_admin.UI.add_template_plan.taskListHolder.find("ul.task_list.activity_tasks_"+selectedActivityIndex);
			
			if(task_list.find(".task").length >1){
				plenty_admin.UI.add_template_plan.order_tasks_by_days_from_activity_start(task_list);
			}
			
			//remove the active class
			if($this.data("task")){
				$this
				.data("task")
				.removeClass("active");
			}
			
			addTaskAndTaskComponents
			.slideUp("fast", function(){
				plenty_admin.UI.add_template_plan.addTaskBtn
				.slideDown("fast");
				
				plenty_admin.UI.add_template_plan.clear_add_task_form();
			});
		}
	},
	show: function(){
		plenty_admin.UI.add_template_plan.modal
		.modal("show");
	},
	hide: function(){
		plenty_admin.UI.add_template_plan.modal
		.modal("hide");
	},
	clear: function(){
		//clear activities
		plenty_admin.UI.add_template_plan.activityListHolder
		.find("li.activity")
		.remove()
		.end()
		.parent()
		.find("form.add_activity_form")
		.show()
		.end()
		.find("button.add_activity")
		.hide();
		
		//clear tasks
		plenty_admin.UI.add_template_plan.taskListHolder
		.find(".task, .task_list")
		.remove()
		.end()
		.parent()
		.find("button.add_task")
		.hide()
		.end()
		.find("p.noActivityForTasks")
		.show();
		
		//reset form elements
		plenty_admin.UI.add_template_plan.modal
		.find("input, textarea")
		.each(function(){
			if($(this).data("default") !== "undefined"){
				if($(this).prop("type") === "number"){
					$(this).val(parseInt($(this).data("default")));
				}else{
					$(this).val($(this).data("default"));
				}
			}else{
				$(this).val("");
			}
		})
		.end()
		.find("select")
		.each(function(){
			$(this)
			.find("option:eq(0)")
			.prop("selected", true);
			
			$(this)
			.find("option:gt(0)")
			.each(function(){
				$(this)
				.prop("disabled", false);
			});
		})
		.end()
		.find(".uom, .specific_items")
		.hide()
		.end()
		.find("button.add")
		.button("reset");
		
		//remove any old task elements
		plenty_admin.UI.add_template_plan.modal
		.find("tr.task-element")
		.remove();
		
		//hide the add task form
		plenty_admin.UI.add_template_plan
		.addTaskAndTaskComponents
		.hide();
		
		//remove activity type classes from add activity form
		plenty_admin.UI.add_template_plan.addActivityForm
		.removeClass("harvest");
		
	},
	build_task_component: function(task_component, type){
		console.log("build_task_component", task_component, type);
		var componentName = null;
		if(task_component.specificId){
			var specificComponentList = null;
			switch(type){
				case "product":
				componentName = plenty_admin.DATA.allProducts[task_component.specificId].productName;
				break;
				
				case "equipment":
				componentName = plenty_admin.DATA.equipmentEquipmentTypes[task_component.specificId].equipmentName;
				break;
				
				case "labour":
				componentName = plenty_admin.DATA.current_organization.skillsAndRates[task_component.specificId].userFirstAndLastName;
				break;
			}
		}else{
			componentName = plenty_admin.DATA[type+"Types"][task_component.id].name;
		}
		var $taskComponent = $([
			'<tr class="reveal-on-hover-wrap task-element">',
				'<td width="55%">'+componentName+'</td>',
				'<td width="20%">'+task_component.qty+'</td>',
				'<td width="25%"><button class="btn btn-sm btn-danger delete reveal-on-hover-element btn-block"><span class="fa fa-trash-o"></span> Delete</button></td>',
			'</tr>'
		].join(""))
		.data("task_component", task_component)
		.find("button.delete")
		.click(function(){
			var $this = $(this);
			var $tc = $this.closest("tr");
			var tcDto = $tc.data("task_component");
			
			$this
			.closest(".tab-pane")
			.find(".component_type option[value="+tcDto.id+"]").prop("disabled", false);
			
			$tc
			.remove();
			
			return false;
		})
		.end();
		
		return $taskComponent;
	},
	build_task_component_saved: function(component, type){
		switch(type){
			case "equipment":
			case "labour":
				return $('<p class="task-component well">'+component.name+' <a href="" class="remove pull-right ptn pbn pln prn"><i class="fa fa-trash-o"></i></a></p>');
			break;
			
			case "product":
				return $('<p class="task-component well">'+component.name+' | '+component.amount+' '+component.uom+' <a href="" class="remove pull-right ptn pbn pln prn"><i class="fa fa-trash-o"></i></a></p>');
			break;
		}
		
	},
	update_activity_cost: function(index){
		console.log("update_activity_cost", index);
		var activityCost = 0;
		var task_list = plenty_admin.UI.add_template_plan.taskListHolder.find(".activity_tasks_"+index);
		console.log("task_list", task_list);
		
		task_list
		.find(".task")
		.each(function(){
			console.log("task", $(this));
			activityCost += $(this).data("taskCost");
		});
		
		plenty_admin.UI.add_template_plan.activityListHolder
		.find(".activity_"+task_list.data("index"))
		.data("activityCost", activityCost)
		.find(".activityCost")
		.text(numeral(activityCost).format('$0,0.00'));
		
		//update the total plan cost
		plenty_admin.UI.add_template_plan.update_plan_cost();
	},
	update_plan_cost: function(){
		var planCost = 0;
		plenty_admin.UI.add_template_plan.activityListHolder
		.find(".activity")
		.each(function(){
			planCost += ($(this).data("activityCost") ? $(this).data("activityCost") : 0);
		});
		
		plenty_admin.UI.add_template_plan.activityListHolder
		.parent()
		.find(".plan_total")
		.text(numeral(planCost).format('$0,0.00'));
	},
	build_task_element: function(taskDto){
		console.log("build_task_element", taskDto);
		var $taskDOM = $([
			'<li class="list-group-item overflowFix reveal-on-hover-wrap task open">',
				'<div class="col-md-12">',
					'<h4 class="pull-left col-md-6 prn pln"><a class="pull-left pln twistie" href=""><span class="glyphicon glyphicon-triangle-right"></span><span class="glyphicon glyphicon-triangle-bottom"></span></a>'+taskDto.name+'</h4>',
					'<h4 class="pull-left col-md-3">+'+taskDto.daysFromActivityStart+' days</h4>',
					'<h4 class="col-md-3 prn text-right"><span class="task-cost">$00.00</span></h4>',
					'<p class="reveal-on-hover-element text-right fix-right-controls" role="group" aria-label="...">',
						'<button class="btn btn-sm btn-danger reveal-on-hover-element delete-task"><span class="fa fa-trash-o"></span> <span class="hidden-xs">Delete</span></button>',
						'<button type="button" class="btn btn-sm btn-primary edit-task mls"><span class="glyphicon glyphicon-edit"></span> <span class="hidden-xs">Edit</span></button>',
					'</p>',
				'</div>',
				'<div class="col-md-12 task-components">',
					'<div class="col-md-12 clear equipment prn pln">',
						'<p class="mbn"><b>Equipment</b></p>',
					'</div>',
					'<div class="col-md-12 labour prn pln">',
						'<p class="mbn"><b>Labour</b></p>',
					'</div>',
					'<div class="col-md-12 product prn pln">',
						'<p class="mbn"><b>Product</b></p>',
					'</div>',
				'</div>',
			'</li>'
		].join(""))
		.data("taskDto", taskDto);
		
		//calculate the costs for this task
		plenty_admin.REST.plans.getCostForTemplateTask(taskDto, $taskDOM, function(taskCosts, $el){
			console.log("got costs for task: ", taskCosts, $el);
			$el
			.data("taskCost", taskCosts)
			.find(".task-cost")
			.text(numeral(taskCosts).format('$0,0.00'));
			
			plenty_admin.UI.add_template_plan.update_activity_cost($el.closest(".task_list").data("index"));
		});
		
		//build equipment taskItems
		for(var e=0; e<taskDto.equipmentIds.length; e++){
			var equip = taskDto.equipmentIds[e];
			var componentData = {name: plenty_admin.DATA.equipmentTypes[equip].name};
			$equipment_task_item = plenty_admin.UI.add_template_plan.build_task_component_saved(componentData, "equipment");
			
			$equipment_task_item
			.data("id", equip)
			.data("type", "equipmentIds")
			.find("a.remove")
			.click(function(){
				var $this = $(this);
				var taskComponent = $this.parent();
				var idList = $this.closest(".task").data("taskDto")[taskComponent.data("type")];
				console.log("idList", idList);
				var index = -1;
				for(var i=0; i<idList.length; i++){
					if(parseInt(taskComponent.data("id")) === idList[i]){
						index = i;
					}
					break;
				}
				
				console.log("index", index);
				
				if(index >= -1){
					idList.splice(index, 1);
				}
				
				$(this)
				.closest("p")
				.remove();
				
				//calculate the costs for this task
				plenty_admin.REST.plans.getCostForTemplateTask(taskDto, $taskDOM, function(taskCosts, $el){
					console.log("got costs for task: ", taskCosts, $el);
					$el
					.data("taskCost", taskCosts)
					.find(".task-cost")
					.text(numeral(taskCosts).format('$0,0.00'));
					
					plenty_admin.UI.add_template_plan.update_activity_cost($el.closest(".task_list").data("index"));
				});
				
				return false;
			})
			.end();
			
			$taskDOM
			.find(".equipment")
			.append($equipment_task_item);
		}
		
		//build specific equipment taskItems
		for(var e=0; e<taskDto.anySpecificEquipmentIds.length; e++){
			var equip = taskDto.anySpecificEquipmentIds[e];
			var componentData = {name: plenty_admin.DATA.equipmentEquipmentTypes[equip].equipmentName};
			$equipment_task_item = plenty_admin.UI.add_template_plan.build_task_component_saved(componentData, "equipment");
			
			$equipment_task_item
			.data("id", equip)
			.data("type", "anySpecificEquipmentIds")
			.find("a.remove")
			.click(function(){
				$(this)
				.closest("p")
				.remove();
				
				//calculate the costs for this task
				plenty_admin.REST.plans.getCostForTemplateTask(taskDto, $taskDOM, function(taskCosts, $el){
					console.log("got costs for task: ", taskCosts, $el);
					$el
					.data("taskCost", taskCosts)
					.find(".task-cost")
					.text(numeral(taskCosts).format('$0,0.00'));
					
					plenty_admin.UI.add_template_plan.update_activity_cost($el.closest(".task_list").data("index"));
				});
				
				return false;
			});
			
			$taskDOM
			.find(".equipment")
			.append($equipment_task_item);
		}
		
		//build labour taskItems
		for(var e=0; e<taskDto.labourIds.length; e++){
			var labour = taskDto.labourIds[e];
			var componentData = {name: plenty_admin.DATA.labourTypes[labour].name};
			$labour_task_item = plenty_admin.UI.add_template_plan.build_task_component_saved(componentData, "labour");
			$labour_task_item
			.data("id", labour)
			.data("type", "labourIds")
			.find("a.remove")
			.click(function(){
				var $this = $(this);
				var taskComponent = $this.parent();
				var idList = $this.closest(".task").data("taskDto")[taskComponent.data("type")];
				console.log("idList", idList);
				var index = -1;
				for(var i=0; i<idList.length; i++){
					if(parseInt(taskComponent.data("id")) === idList[i]){
						index = i;
					}
					break;
				}
				
				console.log("index", index);
				
				if(index >= -1){
					idList.splice(index, 1);
				}
				
				$(this)
				.closest("p")
				.remove();
				
				//calculate the costs for this task
				plenty_admin.REST.plans.getCostForTemplateTask(taskDto, $taskDOM, function(taskCosts, $el){
					console.log("got costs for task: ", taskCosts, $el);
					$el
					.data("taskCost", taskCosts)
					.find(".task-cost")
					.text(numeral(taskCosts).format('$0,0.00'));
					
					plenty_admin.UI.add_template_plan.update_activity_cost($el.closest(".task_list").data("index"));
				});
				
				return false;
			});
			
			$taskDOM
			.find(".labour")
			.append($labour_task_item);
		}
		//build specific equipment taskItems
		for(var e=0; e<taskDto.anySpecificLabourIds.length; e++){
			var labour = taskDto.anySpecificLabourIds[e];
			var componentData = {name: plenty_admin.DATA.current_organization.skillsAndRates[labour].userFirstAndLastName};
			$labour_task_item = plenty_admin.UI.add_template_plan.build_task_component_saved(componentData, "labour");
			
			$labour_task_item
			.data("id", labour)
			.data("type", "labourIds")
			.find("a.remove")
			.click(function(){
				var $this = $(this);
				var taskComponent = $this.parent();
				var idList = $this.closest(".task").data("taskDto")[taskComponent.data("type")];
				console.log("idList", idList);
				var index = -1;
				for(var i=0; i<idList.length; i++){
					if(parseInt(taskComponent.data("id")) === idList[i]){
						index = i;
					}
					break;
				}
				
				console.log("index", index);
				
				if(index >= -1){
					idList.splice(index, 1);
				}
				
				$(this)
				.closest("p")
				.remove();
				
				//calculate the costs for this task
				plenty_admin.REST.plans.getCostForTemplateTask(taskDto, $taskDOM, function(taskCosts, $el){
					console.log("got costs for task: ", taskCosts, $el);
					$el
					.data("taskCost", taskCosts)
					.find(".task-cost")
					.text(numeral(taskCosts).format('$0,0.00'));
					
					plenty_admin.UI.add_template_plan.update_activity_cost($el.closest(".task_list").data("index"));
				});
				
				return false;
			});
			
			$taskDOM
			.find(".labour")
			.append($labour_task_item);
		}
		
		//build product taskItems
		for(var e=0; e<taskDto.productAmountPairs.length; e++){
			var prod = taskDto.productAmountPairs[e];
			var componentData = {
									name: plenty_admin.DATA.productTypes[prod.productTypeId].name,
									amount: prod.amount,
									uom: plenty_admin.DATA.productTypes[prod.productTypeId].unitName
								};
								
			if(taskDto.anySpecificProductIds.length > 0){
				for(var p=0; p<taskDto.anySpecificProductIds.length; p++){
					var specProd = taskDto.anySpecificProductIds[p];
					console.log("specProd", specProd, plenty_admin.DATA.allProducts[specProd], prod);
					if(plenty_admin.DATA.allProducts[specProd].productTypeId === prod.productTypeId){
						componentData.name += " ("+plenty_admin.DATA.allProducts[specProd].productName+")";
					}
				}
			}					
								
			$product_task_item = plenty_admin.UI.add_template_plan.build_task_component_saved(componentData, "product");
			
			$product_task_item
			.data("id", prod)
			.data("type", "productAmountPairs")
			.find("a.remove")
			.click(function(){
				var $this = $(this);
				var taskComponent = $this.parent();
				var idList = $this.closest(".task").data("taskDto")[taskComponent.data("type")];
				console.log("idList", idList);
				var index = -1;
				for(var i=0; i<idList.length; i++){
					if(parseInt(taskComponent.data("id").productTypeId) === idList[i]){
						index = i;
					}
					break;
				}
				
				console.log("index", index);
				
				if(index >= -1){
					idList.splice(index, 1);
				}
				
				$(this)
				.closest("p")
				.remove();
				
				//calculate the costs for this task
				plenty_admin.REST.plans.getCostForTemplateTask(taskDto, $taskDOM, function(taskCosts, $el){
					console.log("got costs for task: ", taskCosts, $el);
					$el
					.data("taskCost", taskCosts)
					.find(".task-cost")
					.text(numeral(taskCosts).format('$0,0.00'));
					
					plenty_admin.UI.add_template_plan.update_activity_cost($el.closest(".task_list").data("index"));
				});
				
				return false;
			});
			
			$taskDOM
			.find(".product")
			.append($product_task_item);
		}
		
		$taskDOM
		.find("button.delete-task")
		.click(function(){
			var allTasks = plenty_admin.UI.add_template_plan.taskListHolder
			.find("ul.task_list li.task");
			
			var index = $(this).closest(".task_list").data("index");
			
			$taskDOM
			.remove();
			
			plenty_admin.UI.add_template_plan.update_activity_cost(index);
			
			return false;
		})
		.end()
		.find("button.edit-task")
		.click(function(){
			plenty_admin.UI.add_template_plan.edit_task($(this).closest(".task"));
			return false;
		})
		.end()
		.find(".twistie")
		.click(function(){
			$taskDOM
			.find(".task-components")
			.slideToggle("fast");
			
			if($taskDOM.hasClass("open")){
				$taskDOM.removeClass("open");
			}else{
				$taskDOM.addClass("open");
			}
			
			return false;
		})
		.end()
		
		var selectedActivityIndex = plenty_admin.UI.add_template_plan.activityListHolder.find(".activity.active").data("index");
		plenty_admin.UI.add_template_plan.taskListHolder
		.find("ul.task_list")
		.hide();
		
		plenty_admin.UI.add_template_plan.taskListHolder
		.find("ul.task_list.activity_tasks_"+selectedActivityIndex)
		.append($taskDOM)
		.show();
	},
	clear_add_activity_form: function(){
		plenty_admin.UI.add_template_plan.addActivityForm
		.find("select option:eq(0)").prop("selected", true)
		.end()
		.find("input").each(function(){
			if($(this).data("default") !== "undefined"){
				if($(this).prop("type") === "number"){
					$(this).val(parseInt($(this).data("default")));
				}else{
					$(this).val($(this).data("default"));
				}
			}else{
				$(this).val("");
			}
		});
	},
	clear_add_task_form: function(){
		plenty_admin.UI.add_template_plan.addTaskAndTaskComponents
		.find("input")
		.each(function(){
			if($(this).data("default") !== "undefined"){
				if($(this).prop("type") === "number"){
					$(this).val(parseInt($(this).data("default")));
				}else{
					$(this).val($(this).data("default"));
				}
			}else{
				$(this).val("");
			}
		})
		.end()
		.find("table.task-items tbody tr")
		.remove()
		.end()
		.parent()
		.find("select :nth-child(0)")
		.prop("selected", true)
		.end()
		.find("select option:gt(0)")
		.prop("disabled", false)
		.end()
		.find("select.specific_items, .uom")
		.hide();
	},
	edit_activity: function($activity){
		console.log("edit_activity", $activity);
		var dto = $activity.data("activityDto");
		plenty_admin.UI.add_template_plan.addActivityBtn
		.hide();
		
		plenty_admin.UI.add_template_plan.addActivityForm
		.find(".save_activity")
		.hide()
		.end()
		.find(".update_activity")
		.data("activity", $activity)
		.show()
		.end()
		.find("#add_activity_type option[value="+dto.activityTypeId+"]")
		.prop("selected", true)
		.end()
		.find("#add_activity_days_from_planting")
		.val(dto.daysFromPlanting)
		.end()
		.slideDown("fast");
	},
	edit_task: function($task){
		console.log("edit_task", $task);
		var dto = $task.data("taskDto");
		
		$task.addClass("active");
		
		//render the task components
		plenty_admin.UI.add_template_plan.addTaskAndTaskComponents
		.find("#add_task_name")
		.val(dto.name)
		.end()
		.find("#add_task_days_from_start")
		.val(dto.daysFromActivityStart)
		.end()
		.find("button.save_task")
		.hide()
		.end()
		.find("button.update_task")
		.data("task", $task)
		.show();
		
		//loop dto and add task components to the table
		for(prop in dto){
			if(dto.hasOwnProperty(prop)){
				//we are only processing the arrays in this DTO
				if(Array.isArray(dto[prop])){
					var lcProp = prop.toLowerCase();
					var type = null;
					var specific = false;
					
					if(lcProp.indexOf("equipment") > -1){
						type = "equipment";
					}else if(lcProp.indexOf("labour") > -1){
						type = "labour";
					}else if(lcProp.indexOf("product") > -1){
						type = "product";
					}
					
					if(lcProp.indexOf("specific") > -1){
						specific = true;
					}
					
					var $task_items_table = plenty_admin.UI.add_template_plan.addTaskAndTaskComponents.find(".tab-pane#"+type+"_tab table."+type+"-items");
					
					for(var p=0; p<dto[prop].length; p++){
						//skip rendering specific products separately
						if(type == "product" && specific){
							continue;
						}
						
						var tc = dto[prop][p];
						//create the task item
						//console.log("typeof tc: ", typeof tc);
						if(typeof tc === "object"){
							var task_component = {
								id: 		tc.productTypeId,
								qty: 	tc.amount
							};
							if(specific){
								task_component.specificId = tc.productTypeId;
							}
						}else if(typeof tc === "number"){
							var task_component = {
								id: 		tc,
								qty: 	1 // NOTE - these should also be type/amount pairs as we do not currently have a record of how many labourers / equipments
							};
							if(specific){
								task_component.specificId = tc;
							}
						}
						var $taskComponent = plenty_admin.UI.add_template_plan.build_task_component(task_component, type);
						$task_items_table.append($taskComponent);
					}
				}
			}
		}
		
		//hide the add task button
		plenty_admin.UI.add_template_plan.addTaskBtn
		.slideUp("fast");
		
		//show the add task form immediately
		plenty_admin.UI.add_template_plan.addTaskAndTaskComponents
		.slideDown("fast");
		
		//minimise all current tasks
		plenty_admin.UI.add_template_plan.minimise_all_tasks();
	},
	order_activities_by_days_from_planting: function(){
		plenty_admin.UI.add_template_plan.activityListHolder
		.find(".activity")
		.sort(sort_activities)
		.appendTo(plenty_admin.UI.add_template_plan.activityListHolder);
		
		function sort_activities(a, b){
			return ($(b).data('activityDto').daysFromPlanting) < ($(a).data('activityDto').daysFromPlanting) ? 1 : -1;    
		}
	},
	order_tasks_by_days_from_activity_start: function(task_list){
		task_list
		.find(".task")
		.sort(sort_tasks)
		.appendTo(task_list);
		
		function sort_tasks(a, b){
			return ($(b).data('taskDto').daysFromActivityStart) < ($(a).data('taskDto').daysFromActivityStart) ? 1 : -1;    
		}
	},
	build_activity_element: function(activityDto, index){
		console.log("build_activity_element", activityDto);
		var $activityDOM = $([
			'<li class="list-group-item reveal-on-hover-wrap active activity col-md-12">',
				'<div class="help-block alert alert-danger error mtn mbs" style="display:none;"',
					'<h3>This activity has no tasks associated with it.</h3>',
					'<p>Either add tasks to it or remove this activity.</p>',
				'</div>',
				'<h4 class="mtn mbn">',
					'<a href="" class="overflowFix">',
						'<span class="col-md-6 pln prn">'+plenty_admin.DATA.activityTypes[activityDto.activityTypeId].name+'</span>',
						'<span class="col-md-3">'+(activityDto.daysFromPlanting >= 0 ? "+" : "")+activityDto.daysFromPlanting+' days</span>',
						'<span class="col-md-3 activityCost prn text-right">$00.00</span>',
						'<span class="reveal-on-hover-element fix-right-controls">',
							'<button class="btn btn-danger btn-sm delete-activity"><span class="fa fa-trash-o"></span> <span class="hidden-xs">Delete</span></button>',
							'<button type="button" class="btn btn-sm btn-primary edit-activity mls"><span class="glyphicon glyphicon-edit"></span> <span class="hidden-xs">Edit</span></button>',
						'</span>',
					'</a>',
				'</h4>',
			'</li>'
		].join(""))
		.data("activityDto", activityDto)
		.find("a")
		.click(function(){
			var selectedActivityIndex = $(this).closest("li").data("index");
			var allActivityTaskContainers = plenty_admin.UI.add_template_plan.taskListHolder.find("ul.task_list");
			var activityTasksContainer = plenty_admin.UI.add_template_plan.taskListHolder.find("ul.task_list.activity_tasks_"+selectedActivityIndex);
			var activityTasks = activityTasksContainer.find(".task");
			
			//hide all task containers
			allActivityTaskContainers
			.hide();
			
			//show the task container for this activity
			activityTasksContainer
			.show();
				
			if(activityTasks.length > 0){
				//hide the add task form
				plenty_admin.UI.add_template_plan.addTaskAndTaskComponents
				.slideUp("fast");
				
				//show the tasks for this activity
				plenty_admin.UI.add_template_plan.addTaskBtn
				.slideDown("fast");
				
			}else{
				//hide the add task button
				plenty_admin.UI.add_template_plan.addTaskBtn
				.slideUp("fast");
				
				//show the add task form immediately
				plenty_admin.UI.add_template_plan.addTaskAndTaskComponents
				.slideDown("fast");
			}
			
			plenty_admin.UI.add_template_plan.activityListHolder
			.find("li.list-group-item.active")
			.removeClass("active");
			
			$(this)
			.closest(".activity")
			.addClass("active");
			
			return false;
		})
		.end()
		.find("button.delete-activity")
		.click(function(){
			plenty_admin.UI.add_template_plan.taskListHolder.find(".task_list.list-group.activity_tasks_"+$activityDOM.data("index"))
			.remove();
			
			$(this)
			.closest("li")
			.remove();
			
			if($(this).closest(".activities_management").find("li.activity").length <= 0){
				plenty_admin.UI.add_template_plan
				.modal
				.find(".noActivityForTasks")
				.slideDown("fast");
				
				//hide the add task form immediately
				plenty_admin.UI.add_template_plan.addTaskAndTaskComponents
				.slideUp("fast");
				
				plenty_admin.UI.add_template_plan.addTaskBtn
				.slideUp("fast");
			}
			
			//update the total plan cost
			plenty_admin.UI.add_template_plan.update_plan_cost();
			
			return false;
		})
		.end()
		.find("button.edit-activity")
		.click(function(){
			plenty_admin.UI.add_template_plan.edit_activity($(this).closest(".activity"));
		})
		.end();
		
		//add the activity element to the DOM
		plenty_admin.UI.add_template_plan.activityListHolder
		.find("li.list-group-item.active")
		.removeClass("active")
		.end()
		.append($activityDOM);
		
		$activityDOM
		.data("index", (index != undefined ? index : $activityDOM.index()))
		.addClass("activity_" + (index != undefined ? index : $activityDOM.index()));
		
		//create a task container for this activity element
		if(plenty_admin.UI.add_template_plan.taskListHolder.find(".task_list.list-group.activity_tasks_"+$activityDOM.data("index")).length == 0){
			var taskList = $('<ul class="task_list list-group activity_tasks_'+$activityDOM.data("index")+' mbn" style="display:none;"></ul>');
			taskList.data("index", $activityDOM.data("index"));
			
			plenty_admin.UI.add_template_plan.taskListHolder
			.append(taskList);
		}
	}
};

plenty_admin.UI.add_template_plan.activityListHolder = plenty_admin.UI.add_template_plan.modal.find(".activities_management .activity_list");
plenty_admin.UI.add_template_plan.addActivityForm = plenty_admin.UI.add_template_plan.modal.find("form.add_activity_form");
plenty_admin.UI.add_template_plan.addActivityBtn = plenty_admin.UI.add_template_plan.modal.find("button.add_activity");

plenty_admin.UI.add_template_plan.taskListHolder = plenty_admin.UI.add_template_plan.modal.find(".tasks_management .task_lists");
plenty_admin.UI.add_template_plan.addTaskForm = plenty_admin.UI.add_template_plan.modal.find("form.add_task_form");
plenty_admin.UI.add_template_plan.addTaskAndTaskComponents = plenty_admin.UI.add_template_plan.modal.find(".add_task_and_task_components");
plenty_admin.UI.add_template_plan.addTaskBtn = plenty_admin.UI.add_template_plan.modal.find("button.add_task");