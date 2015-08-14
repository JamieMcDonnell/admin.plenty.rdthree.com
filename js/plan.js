//*********************** plan.js **************************//
//create namespace for field layout
plenty_admin.UI.plan = {
	DOM: 	$("#plan-container"),
	init: 	function(drilldownData){
		console.log("plan - init", drilldownData);
		plenty_admin.UI.currentScreen.fadeOut("normal");

		plenty_admin.UI.currentScreen = plenty_admin.UI.plan.DOM;
		
		plenty_admin.UI.currentScreen
		.addClass("fill-area-content flexbox-item-grow");
	
		plenty_admin.UI.plan.populate(drilldownData);
		plenty_admin.UI.plan.renderActivities(drilldownData);
		plenty_admin.UI.currentScreen.fadeIn("normal", function(){
			plenty_admin.UI.plan.renderActivityFinancesGraph(drilldownData);
		});
	},
	populate: function(drilldownData){
		console.log("plan - populate", drilldownData);
		if(Array.isArray(drilldownData)){
			var profit = 0;
			var expense = 0;
			var revenue = 0;
			var bushelsPerAcreTotal = 0;
			var cropPriceTotal = 0;
			var subsidyTotal = 0;
			var profitPerAcreTotal = 0;
			
			//loop active plans and total up values
			for(var a=0; a< drilldownData.length; a++){
				var plan = drilldownData[a];
				profit += plan.profitProjection.profit;
				expense += plan.profitProjection.expense;
				revenue += plan.profitProjection.revenue;
				bushelsPerAcreTotal += plan.profitProjection.avgBushlesPerAcre;
				cropPriceTotal += plan.profitProjection.cropPrice;
				subsidyTotal += plan.profitProjection.subsidy;
				profitPerAcreTotal += plan.profitProjection.profitPerAcre;
			}
			
			var bushelsPerAcreAvg = bushelsPerAcreTotal / drilldownData.length;
			var cropPriceAvg = cropPriceTotal / drilldownData.length;
			profitPerAcreAvg = profitPerAcreTotal / drilldownData.length;
			
			//populate fields with totalled data
			plenty_admin.UI.plan.DOM
			.find(".profit")
			.text(numeral(profit).format('$0,0.00'))
			.end()
			.find(".expense")
			.text(numeral(expense).format('$0,0.00'))
			.end()
			.find(".revenue")
			.text(numeral(revenue).format('$0,0.00'))
			.end()
			.find(".plan_field_acres")
			.text(drilldownData[0].field.acres)
			.end()
			.find(".plan_field_bushels_per_acre")
			.text(bushelsPerAcreAvg)
			.end()
			.find(".plan_field_price_per_bushel")
			.text(numeral(cropPriceAvg).format('$0,0.00'))
			.end()
			.find(".text-right.plan_field_subsidy_total")
			.text(numeral(subsidyTotal).format('$0,0.00'))
			.end()
			.find(".plan_field_profit_per_acre")
			.text(numeral(profitPerAcreAvg).format('$0,0.00'));
			
		}else{
			plenty_admin.UI.plan.DOM
			.find(".profit")
			.text(numeral(drilldownData.profitProjection.profit).format('$0,0.00'))
			.end()
			.find(".expense")
			.text(numeral(drilldownData.profitProjection.expense).format('$0,0.00'))
			.end()
			.find(".revenue")
			.text(numeral(drilldownData.profitProjection.revenue).format('$0,0.00'))
			.end()
			.find(".plan_field_acres")
			.text(drilldownData.field.acres)
			.end()
			.find(".plan_field_bushels_per_acre")
			.text(drilldownData.profitProjection.avgBushlesPerAcre)
			.end()
			.find(".plan_field_price_per_bushel")
			.text(numeral(drilldownData.profitProjection.cropPrice).format('$0,0.00'))
			.end()
			.find(".text-right.plan_field_subsidy_total")
			.text(numeral(drilldownData.profitProjection.subsidy).format('$0,0.00'))
			.end()
			.find(".plan_field_profit_per_acre")
			.text(numeral(drilldownData.profitProjection.profitPerAcre).format('$0,0.00'));
			
		}
	},
	clear: function(){
		console.log("plan - clear");
		if(plenty_admin.UI.plan.financesGraph){
			plenty_admin.UI.plan.financesGraph.destroy();
		}
	},
	renderActivityFinancesGraph: function(drilldownData){
		//console.log("renderActivityFinancesGraph", drilldownData, Array.isArray(drilldownData));
		if(Array.isArray(drilldownData)){
			var finances = [];
			for(var a=0; a< drilldownData.length; a++){
				for(var f=0; f<drilldownData[a].activities.activityFinances.length; f++){
					var finance = drilldownData[a].activities.activityFinances[f];
					finances.push(finance);
				}
			}
			//console.log("all finances: ", finances);
		}else{
			var finances = drilldownData.activities.activityFinances;
		}
		
		//holder for graph data set
		var financesData = [];
		
		//colour palette for graph segments
		var palette = new Rainbow();
		palette.setSpectrum("#0076b2", "#93b222", "#788912");
		palette.setNumberRange(0, (finances.length > 0 ? finances.length : 1));
		
		//for(index in finances){
		for(var a=0; a<finances.length; a++){
			var finance = finances[a];
			//console.log("finance", finance, plenty_admin.DATA.activityTypes[finance.activityTypeId]);
			finance.colour = "#"+palette.colourAt(a);
	
			var segment = {
				value:		finance.cost,
				color:		finance.colour,
				highlight:	plenty_admin.HELPER.colorLuminance(finance.colour, .4),
				label: 		plenty_admin.DATA.activityTypes[finance.activityTypeId].name,
			};
			
			financesData.push(segment);
		}
		
		var financeChartOptions = {
			legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend mrs\"><% for (var i=0; i<segments.length; i++){%><li data-segmentid=\"<%=i%>\" data-hovercolour=\"<%=segments[i].fillColor%>\" data-name=\"<%=segments[i].label.replace(/ /g, \"\").toLowerCase()%>\"><span class=\"swatch\" style=\"background-color:<%=segments[i].fillColor%>\"><i class=\"pif pif-<%=segments[i].label.toLowerCase().replace(/ /g, \"-\")%>\"></i></span><%if(segments[i].label){%><%=segments[i].label%><%}%> <span class=\"pct\"></span><span class=\"pull-right\"><%= numeral(segments[i].value).format('$0,0.00') %></span></li><%}%></ul>",
			tooltipTemplate: "<%=label%>: <%= numeral(value).format('$0,0.00') %> | <%= numeral(circumference / 6.283).format('00.00%') %>",
			animateRotate: true
		};
		
		var helpers = Chart.helpers;
		
		//console.log("helpers", helpers);
		
		plenty_admin.UI.plan.financesGraph = new Chart(plenty_admin.UI.plan.financesGraphEl.get(0).getContext("2d")).Doughnut(financesData,financeChartOptions);
		
		//console.log("render finances graph: ", plenty_admin.UI.plan.financesGraph, financesData);
		
		//add a legend for this graph
		var $legendHTML = $(plenty_admin.UI.plan.financesGraph.generateLegend());
		
		var legendHolder = 
		plenty_admin.UI.plan.financesGraphEl
		.parent()
		.parent()
		.parent()
		.find(".legend");
		
		legendHolder
		.html("")
		.append($legendHTML);
		
		var resetLegentStyle = function(legendHolder){
			$(legendHolder)
			.find("li")
			.css({"background-color": "transparent"})
			.removeClass("active")
			.find("span.swatch")
			.each(function(){
				$(this)
				.css({"background-color": $(this).closest("li").data("hovercolour")});
			})
			.end()
			.find("span.pct")
			.text("");
		}
		
		// Include a html legend template after the module doughnut itself
		helpers.each(legendHolder.get(0).firstChild.childNodes, function (legendNode, index) {
			helpers.addEvent(legendNode, 'mouseover', function () {
				var activeSegment = plenty_admin.UI.plan.financesGraph.segments[index];
				
				var pct = numeral(activeSegment.circumference / 6.283).format('00.00%');
				
				activeSegment.save();
				activeSegment.fillColor = activeSegment.highlightColor;
				activeSegment.innerRadius = 60;
				plenty_admin.UI.plan.financesGraph.showTooltip([activeSegment]);
				activeSegment.restore();
				
				$(legendNode)
				.css({"background-color": $(this).data("hovercolour")})
				.addClass("active")
				.find("span.swatch")
				.css({"background-color": activeSegment.highlightColor})
				.end()
				.find("span.pct")
				.text(pct);
			});
		});
		
		helpers.addEvent(legendHolder.get(0).firstChild, 'mouseout', function () {
			plenty_admin.UI.plan.financesGraph.draw();
			resetLegentStyle(legendHolder);
		});
		
		//highlight key element when hovering segment
		plenty_admin.UI.plan.financesGraphEl.on("mousemove", function(evt){
			var activePoints = plenty_admin.UI.plan.financesGraph.getSegmentsAtEvent(evt);
			if(activePoints.length > 0){
				//console.log("activePoints", activePoints, activePoints[0].label.replace(/ /g, "").toLowerCase());
				legendHolder
				.find("li")
				.removeClass("active");
				
				var labelId = activePoints[0].label.replace(/ /g, "").toLowerCase();
				var legendItem = legendHolder.find("li[data-name='"+labelId+"']");
				var pct = numeral(activePoints[0].circumference / 6.283).format('00.00%');
				
				resetLegentStyle(legendHolder);
				
				legendItem
				.addClass("active")
				.css({"background-color": legendItem.data("hovercolour")})
				.find("span.swatch")
				.css({"background-color": activePoints[0].highlightColor})
				.end()
				.find("span.pct")
				.text(pct);
			}else{
				resetLegentStyle(legendHolder);
			}
			// => activePoints is an array of segments on the canvas that are at the same position as the click event.
		});
		
		//clear segment highlight onMouseOut
		plenty_admin.UI.plan.financesGraphEl.on("mouseout", function(evt){
			resetLegentStyle(legendHolder);
		});
	},
	renderActivities: function(drilldownData){
		plenty_admin.UI.plan.activityListContainer
		.find("tr")
		.remove();
		
		function buildActivityFinances(activityFinances){
			//build the activity list item
			for(var a=0; a<activityFinances.length; a++){
				var activity = activityFinances[a].activityDto;
				activity.iconClass = plenty_admin.UI.field.getActivityIconClass(activity.activityTypeId);
				activity.startDate = plenty_admin.HELPER.formatJavaDate(activity.startTime);
				activity.endDate = plenty_admin.HELPER.formatJavaDate(activity.endTime);
				
				var activityItem = [
						"<tr class='activity pointer'>",
							"<td width='5%'>",
								"<i class='"+activity.iconClass+"'></i>",
							"</td>",
							"<td width='20%'>",
								activity.state,
							"</td>",
							"<td width='35%'>",
								plenty_admin.DATA.activityTypes[activity.activityTypeId].name,
							"</td>",
							"<td width='13.333%'>",
								activity.startDate.date,
							"</td>",
							"<td width='13.333%'>",
								plenty_admin.HELPER.daysFromHours(activity.durationInHours),
							"</td>",
							"<td width='13.333%' class='text-right'>",
								numeral(activity.cost).format('$0,0.00'),
							"</td>",
						"</tr>"
				].join("");
				
				var $activityItem = $(activityItem);
	
				$activityItem
				.data("activity", activity)
				.data("activityFinance", activityFinances[a])
				.click(function(){
					plenty_admin.UI.plan.show_activity_modal($(this).data("activity"), $(this).data("activityFinance").taskFinances, $(this));
				});
				
				plenty_admin.UI.plan.activityListContainer.append($activityItem);
			}
		}
		
		if(Array.isArray(drilldownData)){
			for(var a=0; a< drilldownData.length; a++){
				var activityFinances = drilldownData[a].activities.activityFinances;
				buildActivityFinances(activityFinances);
			}
		}else{
			var activityFinances = drilldownData.activities.activityFinances;
			buildActivityFinances(activityFinances);
		}
	},
	show_activity_modal: function(activity, taskFinances, el){
		console.log("show_activity_modal", activity, taskFinances);
		plenty_admin.UI.plan.MODAL_activity
		.find(".modal-title")
		.text(plenty_admin.DATA.activityTypes[activity.activityTypeId].name)
		.end()
		.find("button.delete")
		.off("click")
		.on("click", function(){
				plenty_admin.UI.plan.MODAL_activity
				.find(".modal-content")
				.addClass("blur")
				.end()
				.find(".confirmDelete")
				.show();
		})
		.end()
		.find("button.cancel")
		.off("click")
		.on("click", function(){
				plenty_admin.UI.plan.MODAL_activity
				.find(".modal-content")
				.removeClass("blur")
				.end()
				.find(".confirmDelete")
				.hide();
		})
		.end()
		.find(".confirmDelete button.delete")
		.off("click")
		.on("click", function(){
			plenty_admin.REST.deleteActivity
			.delete(activity.id)
			.then(function(data){
				console.log("Activity Deleted:", data);
				plenty_admin.UI.plan.MODAL_activity
				.modal("hide");
				
				el
				.remove();
			})
		})
		.end()
		.on("shown.bs.modal", function(){
			plenty_admin.UI.plan.renderTaskFinancesGraph(taskFinances);
			plenty_admin.UI.plan.renderTasks(taskFinances);
		})
		.on("hidden.bs.modal", function(){
			plenty_admin.UI.plan.taskFinancesGraph.destroy();
		})
		.modal("show");
	},
	renderTasks: function(taskFinances){
		var taskRows = "";
		
		for(var t=0; t<taskFinances.length; t++){
			var task = taskFinances[t];
			var taskStartDate = plenty_admin.HELPER.formatJavaDate(task.taskDto.startTime);
			console.log("taskStartDate - ", taskStartDate, task.taskDto.startTime);
			var taskRow = [
				"<tr class='pointer'>",
					"<td><span class='editable' data-type='text' data-pk='1' data-url='/post' data-title='Choose the task name'>",
						task.taskDto.name,
					"</span></td>",
					"<td>",
						task.taskDto.state,
					"</td>",
					"<td><span class='editable' data-type='date' data-pk='1' data-url='/post' data-title='Choose the start date'>",
						plenty_admin.HELPER.formatJavaDate(task.taskDto.startTime).date,
					"</span></td>",
					"<td>",
						plenty_admin.HELPER.daysFromHours(task.taskDto.durationInHours),
					"</td>",
					"<td class='text-right'>",
						task.taskDto.cost,
					"</td>",
				"</tr>",
			].join("");
			
			taskRows += taskRow;
		}
		
		$.fn.editable.defaults.mode = 'inline';
		
		plenty_admin.UI.plan.MODAL_activity
		.find(".activityTasksList table tbody tr")
		.remove()
		.end()
		.find(".activityTasksList table tbody")
		.append(taskRows)
		.find(".editable")
		.editable(plenty_admin.REST.inline_editing_options);
	},
	renderTaskFinancesGraph: function(taskFinances){
		console.log("renderTaskFinancesGraph", taskFinances);
		//colour palette for graph segments
		var palette = new Rainbow();
		palette.setSpectrum("#0076b2", "#93b222", "#788912");
		palette.setNumberRange(0, 2);
			
		//holder for graph data set
		var taskFinancesData = [
			//equipment
			{
				value:		0,
				color:		"#"+palette.colourAt(0),
				highlight:	plenty_admin.HELPER.colorLuminance("#"+palette.colourAt(0), .4),
				label: 		"Equipment",
			},
			//skill
			{
				value:		0,
				color:		"#"+palette.colourAt(1),
				highlight:	plenty_admin.HELPER.colorLuminance("#"+palette.colourAt(1), .4),
				label: 		"Labor",
			},
			//skill
			{
				value:		0,
				color:		"#"+palette.colourAt(2),
				highlight:	plenty_admin.HELPER.colorLuminance("#"+palette.colourAt(2), .4),
				label: 		"Products",
			},
		];
		
		//for(index in finances){
		for(var a=0; a<taskFinances.length; a++){
			//break the costs into equipment / skill / product
			var taskFinance = taskFinances[a];
			console.log("taskFinance", taskFinance);
			taskFinancesData[0].value += taskFinance.equipmentCost.cost;
			taskFinancesData[1].value += taskFinance.laborCost.cost;
			taskFinancesData[2].value += taskFinance.productsCost.cost;
		}
		
		var taskFinancesChartOptions = {
			legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend mts\"><% for (var i=0; i<segments.length; i++){%><li data-segmentid=\"<%=i%>\" data-hovercolour=\"<%=segments[i].fillColor%>\" data-name=\"<%=segments[i].label.replace(/ /g, \"\").toLowerCase()%>\" class=\"taskHeader\" style=\"border-top:2px solid <%=segments[i].fillColor%>\"><span class=\"swatch\" style=\"background-color:<%=segments[i].fillColor%>\"><i class=\"pif pif-<%=segments[i].label.toLowerCase().replace(/ /g, \"-\")%>\"></i></span><%if(segments[i].label){%><%=segments[i].label%><%}%> <span class=\"pct\"></span><span class=\"pull-right\"><%= numeral(segments[i].value).format('$0,0.00') %></span></li><%}%></ul>",
			tooltipTemplate: "<%=label%>: <%= numeral(value).format('$0,0.00') %> | <%= numeral(circumference / 6.283).format('00.00%') %>",
			animateRotate: true
		};
		
		var helpers = Chart.helpers;
		
		console.log("helpers", helpers);
		
		plenty_admin.UI.plan.taskFinancesGraph = new Chart(plenty_admin.UI.plan.taskFinancesGraphEl.get(0).getContext("2d")).Doughnut(taskFinancesData,taskFinancesChartOptions);
		
		console.log("render task finances graph: ", plenty_admin.UI.plan.taskFinancesGraph, taskFinancesData);
		
		//add a legend for this graph
		var $legendHTML = $(plenty_admin.UI.plan.taskFinancesGraph.generateLegend());
		
		var legendHolder = 
		plenty_admin.UI.plan.taskFinancesGraphEl
		.parent()
		.parent()
		.find(".legend");
		
		legendHolder
		.html("")
		.append($legendHTML);
		
		var equipmentItems = "";
		var laborItems = "";
		var productItems = "";
		
		//INJECT THE DIFFERENT TASK COST ELEMENTS INTO THE LEGEND ONCE BUILT
		//for(index in finances){
		for(var a=0; a<taskFinances.length; a++){
			//break the costs into equipment / skill / product
			var taskFinance = taskFinances[a];
			console.log("taskFinance", taskFinance);
			
			for(var e=0; e<taskFinance.equipmentCost.taskResourceTypeCosts.length; e++){
				var taskItem = taskFinance.equipmentCost.taskResourceTypeCosts[e];
				var bgColor = plenty_admin.HELPER.hexToRgb("#"+palette.colourAt(0));
				equipmentItems += "<li class='taskItem equipmentTaskItem' style='background-color:rgba("+bgColor.r+", "+bgColor.g+", "+bgColor.b+", .2);'>"+taskItem.resourceTypeName+"<span class='cost'>"+numeral(taskItem.cost).format('$0,0.00')+"</span></li>";
				
				//add task resource costs breakdown to task resource type costs (indented)
				for(var tr=0; tr<taskItem.taskResourceCosts.length; tr++){
					var resource = taskItem.taskResourceCosts[tr];
					equipmentItems += "<li class='taskResourceItem equipmentTaskResourceItem' style='background-color:rgba("+bgColor.r+", "+bgColor.g+", "+bgColor.b+", .2);'>"+resource.resourceName+"<span class='cost'>"+numeral(resource.cost).format('$0,0.00')+"</span></li>";
				}
			}
			
			for(var l=0; l<taskFinance.laborCost.taskResourceTypeCosts.length; l++){
				var taskItem = taskFinance.laborCost.taskResourceTypeCosts[l];
				var bgColor = plenty_admin.HELPER.hexToRgb("#"+palette.colourAt(1));
				laborItems += "<li class='taskItem laborTaskItem' style='background-color:rgba("+bgColor.r+", "+bgColor.g+", "+bgColor.b+", .2);'>"+taskItem.resourceTypeName+"<span class='cost'>"+numeral(taskItem.cost).format('$0,0.00')+"</span></li>";
				
				//add task resource costs breakdown to task resource type costs (indented)
				for(var tr=0; tr<taskItem.taskResourceCosts.length; tr++){
					var resource = taskItem.taskResourceCosts[tr];
					laborItems += "<li class='taskResourceItem laborTaskResourceItem' style='background-color:rgba("+bgColor.r+", "+bgColor.g+", "+bgColor.b+", .2);'>"+resource.resourceName+"<span class='cost'>"+numeral(resource.cost).format('$0,0.00')+"</span></li>";
				}
			}
			
			for(var p=0; p<taskFinance.productsCost.taskResourceTypeCosts.length; p++){
				var taskItem = taskFinance.productsCost.taskResourceTypeCosts[p];
				var bgColor = plenty_admin.HELPER.hexToRgb("#"+palette.colourAt(2));
				productItems += "<li class='taskItem productTaskItem' style='background-color:rgba("+bgColor.r+", "+bgColor.g+", "+bgColor.b+", .2);'>"+taskItem.resourceTypeName	+"<span class='cost'>"+numeral(taskItem.cost).format('$0,0.00')+"</span></li>";
				
				//add task resource costs breakdown to task resource type costs (indented)
				for(var tr=0; tr<taskItem.taskResourceCosts.length; tr++){
					var resource = taskItem.taskResourceCosts[tr];
					productItems += "<li class='taskResourceItem productTaskResourceItem' style='background-color:rgba("+bgColor.r+", "+bgColor.g+", "+bgColor.b+", .2);'>"+resource.resourceName+"<span class='cost'>"+numeral(resource.cost).format('$0,0.00')+"</span></li>";
				}
			}
		}
		
		console.log("equipmentItems", equipmentItems);
		console.log("laborItems", laborItems);
		console.log("productItems", productItems);
		
		legendHolder
		.find("li[data-name='equipment']")
		.after(equipmentItems)
		.end()
		.find("li[data-name='labor']")
		.after(laborItems)
		.end()
		.find("li[data-name='products']")
		.after(productItems)
		.end()
		.find(".equipmentTaskResourceItem")
		.last()
		.addClass("last")
		.end()
		.end()
		.find(".laborTaskResourceItem")
		.last()
		.addClass("last")
		.end()
		.end()
		.find(".productTaskResourceItem")
		.last()
		.addClass("last");
		
		var resetLegentStyle = function(legendHolder){
			$(legendHolder)
			.find("li:not(.taskItem):not(.taskResourceItem)")
			.css({"background-color": "transparent"})
			.removeClass("active")
			.find("span.swatch")
			.each(function(){
				$(this)
				.css({"background-color": $(this).closest("li").data("hovercolour")});
			})
			.end()
			.find("span.pct")
			.text("");
		}
		
		// Include a html legend template after the module doughnut itself
		helpers.each(legendHolder.get(0).firstChild.childNodes, function (legendNode, index) {
			helpers.addEvent(legendNode, 'mouseover', function () {
				console.log("hover legendNode: ", this, index, $(this).prop("class"));
				
				if($(this).hasClass("taskItem") || $(this).hasClass("taskResourceItem")){
					if($(this).hasClass("equipmentTaskItem") || $(this).hasClass("equipmentTaskResourceItem")){
						index = 0; //$(legendHolder).find("li[data-name='equipment']").index();
					}else if($(this).hasClass("laborTaskItem") || $(this).hasClass("laborTaskResourceItem")){
						index = 1; //$(legendHolder).find("li[data-name='labor']").index();
					}else if($(this).hasClass("productTaskItem") || $(this).hasClass("productTaskResourceItem")){
						index = 2; //$(legendHolder).find("li[data-name='products']").index();
					}
				}else{
					index = parseInt($(this).data("segmentid"));
				}
				
				console.log("index: ", index);
				
				if(!$(this).hasClass("taskItem") && !$(this).hasClass("taskResourceItem")){
					var activeSegment = plenty_admin.UI.plan.taskFinancesGraph.segments[index];
					
					var pct = numeral(activeSegment.circumference / 6.283).format('00.00%');
					
					activeSegment.save();
					activeSegment.fillColor = activeSegment.highlightColor;
					activeSegment.innerRadius = 60;
					plenty_admin.UI.plan.taskFinancesGraph.showTooltip([activeSegment]);
					activeSegment.restore();
					
					$(legendNode)
					.css({"background-color": $(this).data("hovercolour")})
					.addClass("active")
					.find("span.swatch")
					.css({"background-color": activeSegment.highlightColor})
					.end()
					.find("span.pct")
					.text(pct);
				}
			});
		});
		
		helpers.addEvent(legendHolder.get(0).firstChild, 'mouseout', function () {
			if($(this).hasClass("taskItem")){
				if($(this).hasClass("equipmentTaskItem") || $(this).hasClass("equipmentTaskResourceItem")){
					index = 0; //$(legendHolder).find("li[data-name='equipment']").index();
				}else if($(this).hasClass("laborTaskItem") || $(this).hasClass("laborTaskResourceItem")){
					index = 1; //$(legendHolder).find("li[data-name='labor']").index();
				}else if($(this).hasClass("productTaskItem") || $(this).hasClass("productTaskResourceItem")){
					index = 2; //$(legendHolder).find("li[data-name='products']").index();
				}
				//return; //no hover effect on task items just yet
			}
			plenty_admin.UI.plan.taskFinancesGraph.draw();
			if(!$(this).hasClass("taskItem") && !$(this).hasClass("taskResourceItem")){
				resetLegentStyle(legendHolder);
			}
		});
		
		//highlight key element when hovering segment
		plenty_admin.UI.plan.taskFinancesGraphEl.on("mousemove", function(evt){
			var activePoints = plenty_admin.UI.plan.taskFinancesGraph.getSegmentsAtEvent(evt);
			if(activePoints.length > 0){
				//console.log("activePoints", activePoints, activePoints[0].label.replace(/ /g, "").toLowerCase());
				legendHolder
				.find("li")
				.removeClass("active");
				
				var labelId = activePoints[0].label.replace(/ /g, "").toLowerCase();
				var legendItem = legendHolder.find("li[data-name='"+labelId+"']");
				var pct = numeral(activePoints[0].circumference / 6.283).format('00.00%');
				
				resetLegentStyle(legendHolder);
				
				legendItem
				.addClass("active")
				.css({"background-color": legendItem.data("hovercolour")})
				.find("span.swatch")
				.css({"background-color": activePoints[0].highlightColor})
				.end()
				.find("span.pct")
				.text(pct);
			}else{
				resetLegentStyle(legendHolder);
			}
			// => activePoints is an array of segments on the canvas that are at the same position as the click event.
		});
		
		//clear segment highlight onMouseOut
		plenty_admin.UI.plan.taskFinancesGraphEl.on("mouseout", function(evt){
			resetLegentStyle(legendHolder);
		});
	}
};

plenty_admin.UI.plan.activityListContainer = plenty_admin.UI.plan.DOM.find("table.planActivities tbody");
plenty_admin.UI.plan.financesGraphEl = plenty_admin.UI.plan.DOM.find("#plan_graph_wrapper canvas");
plenty_admin.UI.plan.MODAL_activity = $("body").find(".modal#activity");
plenty_admin.UI.plan.taskFinancesGraphEl = plenty_admin.UI.plan.MODAL_activity.find("canvas#taskGraph");
