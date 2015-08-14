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
				
				plenty_admin.REST.getEquipmentByOrgAndType(plenty_admin.DATA.current_organization.id, equip.id, function(equipment, el){
					console.log("equipments - ", equipment);
					el.data("items", equipment);
				}, $equipmentTypeOptionsHTML);
			}
		}
		
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
				
				plenty_admin.REST.getProductsByType(prod.id, function(products, el){
					console.log("products - ", products);
					el.data("items", products);
				}, $productTypeOptionsHTML);
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
			}
			
			if(
				$(this).find("option:selected").val()
				&& type === equipment
			){
				$(this)
				.closest(".tab-pane")
				.find(".component_qty")
				.val(1)
				.prop("disabled", true);
			}else{
				$(this)
				.closest(".tab-pane")
				.find(".component_qty")
				.prop("disabled", false);
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
			//console.log("selectedDto", selectedDto);
			
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
			}
			
			console.log("type", type);
			
			if(type){
				//list specific items for this type and show them
				var specificItemsHTML = "<option value='' selected'>Choose specific "+selected.text()+"</option>";
				//for(var s=0; s<specificItems.length; s++){
				for(id in specificItems){
					if(specificItems.hasOwnProperty(id)){
						var item = specificItems[id];
						specificItemsHTML += "<option value='"+item.id+"'>"+item.name+"</option>";
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
				
				//disable this type so it can only be added once
				$tp.find(".component_type option:selected").prop("disabled", true);
				$tp.find(".component_type option:eq(0)").show().prop("selected", true);
				
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
			var addActivityForm = plenty_admin.UI.add_template_plan.addActivityForm;
			
			var valid = plenty_admin.HELPER.validateForm(addActivityForm);
			
			if(valid){
				var activityDto = {
					templatePlanId:		null,
					activityTypeId:		parseInt(addActivityForm.find("#add_activity_type option:selected").val()),
					daysFromPlanting:	parseInt(addActivityForm.find("#add_activity_days_from_planting").val())
				}
				
				console.log("activityDto", activityDto);
				
				plenty_admin.UI.add_template_plan.build_activity_element(activityDto);
				
				$this
				.closest(".activities_management")
				.find(".alert.help-block:eq(0)")
				.hide()
				.end()
				.find("form")
				.slideUp("fast", function(){
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
					
					plenty_admin.UI.add_template_plan.taskListHolder
					.slideUp("fast");
					
					plenty_admin.UI.add_template_plan
					.modal
					.find(".noActivityForTasks")
					.slideUp("fast");
				});
				
				if(plenty_admin.UI.add_template_plan.activityListHolder.find("li.list-group-item.activity").length >1){
					plenty_admin.UI.add_template_plan.activityListHolder.sortable({
					  //group: 'simple_with_animation',
					  pullPlaceholder: false,
					  placeholder:'<li class="list-group-item placeholder"><a>MOVE HERE</a></li>',
					  // animation on drop
					  onDrop: function  ($item, container, _super) {
						var $clonedItem = $('<li/>').css({height: 0});
						$item.before($clonedItem);
						$clonedItem.animate({'height': $item.height()});
					
						$item.animate($clonedItem.position(), function  () {
						  $clonedItem.detach();
						  _super($item, container);
						});
					  },
					
					  // set $item relative to cursor position
					  onDragStart: function ($item, container, _super) {
						var offset = $item.offset(),
							pointer = container.rootGroup.pointer;
					
						adjustment = {
						  left: pointer.left - offset.left,
						  top: pointer.top - offset.top
						};
					
						_super($item, container);
					  },
					  onDrag: function ($item, position) {
						$item.css({
						  left: position.left - adjustment.left,
						  top: position.top - adjustment.top
						});
					  }
					});
				}
			}
			
			return false;
		})
		.end()
		.find("button.add_activity")
		.on("click", function(){
			var $this = $(this);
			
			$this
			.hide()
			.parent()
			.find(".activity_list")
			.slideUp("fast", function(){
				$this
				.parent()
				.find(".add_activity_form")
				.slideDown("fast");
			})
		})
		.end()
		.find("button.add_task")
		.on("click", function(){
			var $this = $(this);
			
			$this
			.slideUp("fast");
			
			plenty_admin.UI.add_template_plan.taskListHolder
			.slideUp("fast", function(){
				plenty_admin.UI.add_template_plan.addTaskAndTaskComponents
				.slideDown("fast");
			})
		})
		.end()
		.find("button.save_task")
		.on("click", function(){
			var $this = $(this);
			
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
				
				for(var l=0; l<labourComponents.length; l++){
					labourIds.push($(labourComponents[l]).data("task_component").id);
				}
				console.log("labourIds:", labourIds);
				
				//get the list of selected labour IDs
				var productAmountPairs = [];
				var anySpecificProductIds = [];
				for(var l=0; l<productComponents.length; l++){
					var taskComponent = $(productComponents[l]).data("task_component");
					var prod = {
						productTypeId:taskComponent.id,
						amount:taskComponent.qty
					};
					
					if(taskComponent.specificId){
						anySpecificProductIds.push(taskComponent.specificId);
					}else{
						productAmountPairs.push(prod);
					}
				}
				
				console.log("productAmountPairs:", productAmountPairs);
				console.log("anySpecificProductIds:", anySpecificProductIds);
				
				var templateTaskDto = {
					name:addTaskForm.find("#add_task_name").val(),
					templateActivityId:null,
					daysFromActivityStart:parseInt(addTaskForm.find("#add_task_days_from_start").val()),
					labourIds:labourIds,
					equipmentIds:equipmentIds,
					productAmountPairs:productAmountPairs,
					anySpecificEquipmentIds:anySpecificEquipmentIds,
					anySpecificProductIds:anySpecificProductIds
				}
				
				console.log("templateTaskDto", templateTaskDto);
				
				//add the task element to the DOM
				plenty_admin.UI.add_template_plan.build_task_element(templateTaskDto);
				
				addTaskAndTaskComponents
				.slideUp("fast", function(){
					plenty_admin.UI.add_template_plan.taskListHolder
					.slideDown("fast");
					
					plenty_admin.UI.add_template_plan.addTaskBtn
					.slideDown("fast");
					
					plenty_admin.UI.add_template_plan.clear_add_task_form();
				});
			}
			
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
			
			plenty_admin.UI.add_template_plan.addTaskAndTaskComponents
			.slideUp("fast", function(){
				plenty_admin.UI.add_template_plan.taskListHolder
				.slideDown("fast");
				
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
					
					var TemplatePlanCreationDto = {
							owningOrgId:plenty_admin.DATA.current_organization.id,//parseInt(owningOrgIdList.find("option:selected").val()),
							planName:addPlanForm.find("#add_plan_name").val(),
							planDescription:addPlanForm.find("#add_plan_desc").val(),
							activitiesAndTasks:activitiesAndTasks
					}
					
					console.log("TemplatePlanCreationDto", TemplatePlanCreationDto);
					
					plenty_admin.REST.plans.createTemplatePlan(TemplatePlanCreationDto, function(templatePlan){
						console.log("add this templatePlan to the list: ", templatePlan);
					});
				}
			}
			
			return false;
		})
		.end();
		
		plenty_admin.UI.add_template_plan.modal
		.data("ready", true);
	},
	show: function(){
		plenty_admin.UI.add_template_plan.modal
		.modal("show");
	},
	clear: function(){
		//clear activities
		plenty_admin.UI.add_template_plan.activityListHolder
		.find("li.activity")
		.remove()
		.end()
		.hide()
		.parent()
		.find("form.add_activity_form")
		.show()
		.end()
		.find("button.add_activity")
		.hide();
		
		//clear tasks
		plenty_admin.UI.add_template_plan.taskListHolder
		.find("li.task")
		.remove()
		.end()
		.hide()
		.parent()
		.find("form.add_task_form, button.add_task")
		.hide()
		.end()
		.find("p.noActivityForTasks")
		.show();
		
		//reset form elements
		plenty_admin.UI.add_template_plan.modal
		.find("input, textarea")
		.val("")
		.end()
		.find("select")
		.each(function(){
			$(this)
			.find("option:eq(0)")
			.prop("selected", true);
		})
		.end()
		.find(".uom")
		.hide();
		
		//remove any old task elements
		plenty_admin.UI.add_template_plan.modal
		.find("tr.task-element")
		.remove();
		
	},
	build_task_component: function(task_component, type){
		var $taskComponent = $([
			'<tr class="reveal-on-hover-wrap task-element">',
				'<td width="55%">'+plenty_admin.DATA[type+"Types"][task_component.id].name+'</td>',
				'<td width="20%">'+task_component.qty+'</td>',
				'<td width="25%"><button class="btn btn-sm btn-danger delete reveal-on-hover-element btn-block"><span class="fa fa-trash-o"></span> Delete</button></td>',
			'</tr>'
		].join(""))
		.data("task_component", task_component)
		.find("button.delete")
		.click(function(){
			$(this)
			.closest("tr")
			.remove();
			
			return false;
		})
		.end();
		
		return $taskComponent;
	},
	build_task_element: function(taskDto){
		console.log("build_task_element", taskDto);
		var $taskDOM = $([
			'<li class="list-group-item overflowFix reveal-on-hover-wrap task">',
				'<div class="col-md-12">',
					'<h4 class="pull-left">'+taskDto.name+'</h4>',
					'<button class="btn btn-sm btn-danger reveal-on-hover-element pull-right delete-task"><span class="fa fa-trash-o"></span> Delete</button>',
				'</div>',
				'<div class="col-md-4 equipment prn">',
					'<p><b>Equipment</b></p>',
				'</div>',
				'<div class="col-md-4 labour prn">',
					'<p><b>Labour</b></p>',
				'</div>',
				'<div class="col-md-4 product">',
					'<p><b>Product</b></p>',
				'</div>',
			'</li>'
		].join(""))
		.data("taskDto", taskDto);
		
		//build equipment taskItems
		for(var e=0; e<taskDto.equipmentIds.length; e++){
			var equip = taskDto.equipmentIds[e];
			$equipment_task_item = $('<p>'+plenty_admin.DATA.equipmentTypes[equip].name+' <a href="" class="remove pull-right ptn pbn pln prn"><i class="fa fa-trash-o"></i></a></p>');
			$equipment_task_item
			.find("a.remove")
			.click(function(){
				$(this)
				.closest("p")
				.remove();
			});
			
			$taskDOM
			.find(".equipment")
			.append($equipment_task_item);
		}
		
		//build labour taskItems
		for(var e=0; e<taskDto.labourIds.length; e++){
			var labour = taskDto.labourIds[e];
			$labour_task_item = $('<p>'+plenty_admin.DATA.labourTypes[labour].name+' <a href="" class="remove pull-right ptn pbn pln prn"><i class="fa fa-trash-o"></i></a></p>');
			$labour_task_item
			.find("a.remove")
			.click(function(){
				$(this)
				.closest("p")
				.remove();
			});
			
			$taskDOM
			.find(".labour")
			.append($labour_task_item);
		}
		
		//build product taskItems
		for(var e=0; e<taskDto.productAmountPairs.length; e++){
			var prod = taskDto.productAmountPairs[e];
			$product_task_item = $('<p>'+plenty_admin.DATA.productTypes[prod.productTypeId].name+' <a href="" class="remove pull-right ptn pbn pln prn"><i class="fa fa-trash-o"></i></a></p>');
			$product_task_item
			.find("a.remove")
			.click(function(){
				$(this)
				.closest("p")
				.remove();
			});
			
			$taskDOM
			.find(".product")
			.append($product_task_item);
		}
		
		$taskDOM
		.find("button.delete-task")
		.click(function(){
			$taskDOM
			.remove();
			
			return false;
		});
		
		var selectedActivityIndex = plenty_admin.UI.add_template_plan.activityListHolder.find(".activity.active").data("index");
		plenty_admin.UI.add_template_plan.taskListHolder
		.find("ul.task_list")
		.hide();
		
		plenty_admin.UI.add_template_plan.taskListHolder
		.find("ul.task_list.activity_tasks_"+selectedActivityIndex)
		.append($taskDOM)
		.show();
	},
	clear_add_task_form: function(){
		plenty_admin.UI.add_template_plan.addTaskAndTaskComponents
		.find("input")
		.val("")
		.end()
		.find("table.task-items tbody tr")
		.remove()
		.end()
		.parent()
		.find("select :nth-child(0)")
		.prop("selected", true);
	},
	build_activity_element: function(activityDto){
		console.log("build_activity_element", activityDto);
		var $activityDOM = $([
			'<li class="list-group-item reveal-on-hover-wrap active activity">',
				'<div class="help-block alert alert-danger error mtn mbs" style="display:none;"',
					'<h3>This activity has no tasks associated with it.</h3>',
					'<p>Either add tasks to it or remove this activity.</p>',
				'</div>',
				'<button class="btn btn-danger btn-sm reveal-on-hover-element pull-right delete-activity"><span class="fa fa-trash-o"></span>  Delete</button>',
				'<a href="">',
					plenty_admin.DATA.activityTypes[activityDto.activityTypeId].name,
				'</a>',
			'</li>'
		].join(""))
		.data("activityDto", activityDto)
		.data("templateTaskDtos", [])
		.data("tasks", [])
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
				
				//show the add task button
				plenty_admin.UI.add_template_plan.taskListHolder
				.slideDown("fast");
			}else{
				//hide the add task button
				plenty_admin.UI.add_template_plan.addTaskBtn
				.slideUp("fast");
				
				//hide the task list for this activity
				plenty_admin.UI.add_template_plan.taskListHolder
				.slideUp("fast");
				
				//show the add task form immediately
				plenty_admin.UI.add_template_plan.addTaskAndTaskComponents
				.slideDown("fast");
			}
			
			plenty_admin.UI.add_template_plan.activityListHolder
			.find("li.list-group-item.active")
			.removeClass("active");
			
			$(this)
			.parent()
			.addClass("active");
			
			return false;
		})
		.end()
		.find("button.delete-activity")
		.click(function(){
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
			}
		})
		.end();
		
		//add the activity element to the DOM
		plenty_admin.UI.add_template_plan.activityListHolder
		.find("li.list-group-item.active")
		.removeClass("active")
		.end()
		.append($activityDOM);
		
		$activityDOM
		.data("index", $activityDOM.index());
		
		//create a task container for this activity element
		var taskList = $('<ul class="task_list list-group activity_tasks_'+$activityDOM.data("index")+'" style="display:none;"></ul>');
		plenty_admin.UI.add_template_plan.taskListHolder
		.append(taskList);
	}
};

plenty_admin.UI.add_template_plan.activityListHolder = plenty_admin.UI.add_template_plan.modal.find(".activities_management .activity_list");
plenty_admin.UI.add_template_plan.addActivityForm = plenty_admin.UI.add_template_plan.modal.find("form.add_activity_form");
plenty_admin.UI.add_template_plan.addActivityBtn = plenty_admin.UI.add_template_plan.modal.find("button.add_activity");

plenty_admin.UI.add_template_plan.taskListHolder = plenty_admin.UI.add_template_plan.modal.find(".tasks_management .task_lists");
plenty_admin.UI.add_template_plan.addTaskForm = plenty_admin.UI.add_template_plan.modal.find("form.add_task_form");
plenty_admin.UI.add_template_plan.addTaskAndTaskComponents = plenty_admin.UI.add_template_plan.modal.find(".add_task_and_task_components");
plenty_admin.UI.add_template_plan.addTaskBtn = plenty_admin.UI.add_template_plan.modal.find("button.add_task");