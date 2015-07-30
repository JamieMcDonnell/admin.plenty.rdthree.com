//*********************** plan.js **************************//
//create namespace for field layout
plenty_admin.UI.plan = {
	DOM: 	$("#plan-container"),
	init: 	function(profitProjection, templatePlan){
		console.log("plan - init", profitProjection);
		plenty_admin.UI.plan.getTemplatePlanActivities(profitProjection.planDto.id, function(templateActivities){
			plenty_admin.UI.currentScreen.fadeOut("normal");
	
			plenty_admin.UI.currentScreen = plenty_admin.UI.plan.DOM;
			
			plenty_admin.UI.currentScreen
			.addClass("fill-area-content flexbox-item-grow"+(templatePlan ? " templatePlan" : ""));
		
			plenty_admin.UI.plan.populate(profitProjection, templateActivities);
			plenty_admin.UI.plan.renderActivities(plenty_admin.UI.plan.dummyPlanActivities);
			plenty_admin.UI.currentScreen.fadeIn("normal", function(){
				plenty_admin.UI.plan.renderActivityFinancesGraph(plenty_admin.UI.plan.dummyPlanActivities);
			});
		});
	},
	populate: function(profitProjection, planActivities){
		console.log("plan - populate", profitProjection, planActivities);
		plenty_admin.UI.plan.DOM
		.find(".profit")
		.text(numeral(profitProjection.profit).format('$0,0.00'))
		.end()
		.find(".expense")
		.text(numeral(profitProjection.expense).format('$0,0.00'))
		.end()
		.find(".revenue")
		.text(numeral(profitProjection.revenue).format('$0,0.00'))
		.end()
		.find(".plan_field_acres")
		.text(profitProjection.fieldDto.acres)
		.end()
	},
	clear: function(){
		console.log("plan - clear");
	},
	//get all template plan activities and finances
	getTemplatePlanActivities: function(templatePlanId, callback){
	plenty_admin.REST.templateActivities = plenty_admin.api.all("templateActivities/getAllTemplateActivities");
		plenty_admin.REST.templateActivities.getAll()
		.then(
			function(templateActivities){
				console.log("templateActivities", templateActivities().data);
				if(callback && typeof callback === "function"){
					callback(templateActivities().data);
				}
			},
			function(err){
				console.error("getting templateActivities failed: ", err);
				plenty_admin.UI.plan.renderActivities(plenty_admin.UI.plan.dummyPlanActivities);
				plenty_admin.UI.plan.renderActivityFinancesGraph(plenty_admin.UI.plan.dummyPlanActivities);
			}
		);
	},
	//get all plan activities and finances
	getPlanActivities: function(planId, callback){
	plenty_admin.REST.planActivities = plenty_admin.api.all("activities/getPlanActivities");
		plenty_admin.REST.planActivities.getAll()
		.then(
			function(planActivities){
				console.log("planActivities", planActivities().data);
				if(callback && typeof callback === "function"){
					callback(planActivities().data);
				}
			},
			function(err){
				console.error("getting templateActivities failed: ", err);
				plenty_admin.UI.plan.renderActivities(plenty_admin.UI.plan.dummyPlanActivities);
				plenty_admin.UI.plan.renderActivityFinancesGraph(plenty_admin.UI.plan.dummyPlanActivities);
			}
		);
	},
	renderActivityFinancesGraph: function(finances){
		//holder for graph data set
		var financesData = [];
		
		//colour palette for graph segments
		var palette = new Rainbow();
		palette.setSpectrum("#0076b2", "#93b222", "#788912");
		palette.setNumberRange(0, (finances.activityFinances.length > 0 ? finances.activityFinances.length : 1));
		
		//for(index in finances){
		for(var a=0; a<finances.activityFinances.length; a++){
			var finance = finances.activityFinances[a];
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
		
		console.log("helpers", helpers);
		
		plenty_admin.UI.plan.financesGraph = new Chart(plenty_admin.UI.plan.financesGraphEl.get(0).getContext("2d")).Doughnut(financesData,financeChartOptions);
		
		console.log("render finances graph: ", plenty_admin.UI.plan.financesGraph, financesData);
		
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
	renderActivities: function(activities){
		//build the activity list item
		plenty_admin.UI.plan.activityListContainer
		.find("tr")
		.remove();
		
		for(var a=0; a<activities.activityFinances.length; a++){
			var activity = activities.activityFinances[a].activityDto;
			activity.iconClass = plenty_admin.UI.field.getActivityIconClass(activity.activityTypeId);
			activity.startDate = plenty_admin.HELPER.formatJavaDate(activity.startTime);
			activity.endDate = plenty_admin.HELPER.formatJavaDate(activity.endTime);
			
			var activityItem = [
					"<tr class='activity pointer'>",
						"<td width='5%'>",
							"<i class='"+activity.iconClass+"'></i>",
						"</td>",
						"<td width='10%'>",
							activity.state,
						"</td>",
						"<td width='60%'>",
							plenty_admin.DATA.activityTypes[activity.activityTypeId].name,
						"</td>",
						"<td width='10%'>",
							activity.startDate.date,
						"</td>",
						"<td width='10%'>",
							plenty_admin.HELPER.daysFromHours(activity.durationInHours),
						"</td>",
						"<td width='10%' class='text-right'>",
							numeral(activity.cost).format('$0,0.00'),
						"</td>",
					"</tr>"
			].join("");
			
			var $activityItem = $(activityItem);

			$activityItem
			.data("activity", activity)
			.data("activityFinance", activities.activityFinances[a])
			.click(function(){
				plenty_admin.UI.plan.show_activity_modal(activity, $(this).data("activityFinance").taskFinances, $(this));
			});
			
			plenty_admin.UI.plan.activityListContainer.append($activityItem);
		}
	},
	
	// HACK Dummy Activity Data
	dummyPlanActivities: {
	  "activityFinances": [
		{
		  "activityDto": {
			"id": 1,
			"created": 1438133870099,
			"lastModified": 1438133997409,
			"planId": 1,
			"indexInPlan": 8,
			"fieldCropId": 1,
			"organizationId": 4,
			"activityTypeId": 8,
			"startTime": 1446289200000,
			"endTime": 1447063200000,
			"durationInHours": 215,
			"state": "SCHEDULED",
			"cost": 33540,
			"duplicateOfId": 0,
			"bushlesPerAcre": 500
		  },
		  "activityTypeId": 8,
		  "revenue": 66640,
		  "cropPrice": 17,
		  "cost": 33540,
		  "profit": 33100,
		  "taskFinances": [
			{
			  "taskDto": {
				"id": 15,
				"created": 1438133869770,
				"lastModified": 1438133869770,
				"activityId": 1,
				"name": "harvest task1",
				"startTime": 1446289200000,
				"endTime": 1447063200000,
				"durationInHours": 215,
				"cost": 4290,
				"state": "UNSCHEDULED"
			  },
			  "cost": 16770,
			  "laborCost": {
				"cost": 12900,
				"taskResourceTypeCosts": [
				  {
					"resourceTypeId": 7,
					"resourceTypeName": "Combine Operator",
					"cost": 4300,
					"taskResourceCosts": [
					  {
						"resourceId": 24,
						"resourceName": "joe test combine operatorworking as a Combine Operator",
						"cost": 4300
					  }
					]
				  },
				  {
					"resourceTypeId": 8,
					"resourceTypeName": "Driver",
					"cost": 4300,
					"taskResourceCosts": [
					  {
						"resourceId": 25,
						"resourceName": "joe test driverworking as a Driver",
						"cost": 4300
					  }
					]
				  },
				  {
					"resourceTypeId": 3,
					"resourceTypeName": "Operator",
					"cost": 4300,
					"taskResourceCosts": [
					  {
						"resourceId": 20,
						"resourceName": "joe test operatorworking as a Operator",
						"cost": 4300
					  }
					]
				  }
				]
			  },
			  "equipmentCost": {
				"cost": 3870,
				"taskResourceTypeCosts": [
				  {
					"resourceTypeId": 10,
					"resourceTypeName": "Grain Cart",
					"cost": 1290,
					"taskResourceCosts": [
					  {
						"resourceId": 18,
						"resourceName": "Grain Cart #1",
						"cost": 1290
					  }
					]
				  },
				  {
					"resourceTypeId": 11,
					"resourceTypeName": "Grain Truck",
					"cost": 1505,
					"taskResourceCosts": [
					  {
						"resourceId": 19,
						"resourceName": "Grain Truck #1",
						"cost": 1505
					  }
					]
				  },
				  {
					"resourceTypeId": 9,
					"resourceTypeName": "Combine",
					"cost": 1075,
					"taskResourceCosts": [
					  {
						"resourceId": 17,
						"resourceName": "Combine #1",
						"cost": 1075
					  }
					]
				  }
				]
			  },
			  "productsCost": {
				"cost": 0,
				"taskResourceTypeCosts": []
			  }
			},
			{
			  "taskDto": {
				"id": 16,
				"created": 1438133870049,
				"lastModified": 1438133870049,
				"activityId": 1,
				"name": "harvest task2",
				"startTime": 1446289200000,
				"endTime": 1447063200000,
				"durationInHours": 215,
				"cost": 4290,
				"state": "UNSCHEDULED"
			  },
			  "cost": 16770,
			  "laborCost": {
				"cost": 12900,
				"taskResourceTypeCosts": [
				  {
					"resourceTypeId": 7,
					"resourceTypeName": "Combine Operator",
					"cost": 4300,
					"taskResourceCosts": [
					  {
						"resourceId": 26,
						"resourceName": "joe test combine operatorworking as a Combine Operator",
						"cost": 4300
					  }
					]
				  },
				  {
					"resourceTypeId": 8,
					"resourceTypeName": "Driver",
					"cost": 4300,
					"taskResourceCosts": [
					  {
						"resourceId": 27,
						"resourceName": "joe test driverworking as a Driver",
						"cost": 4300
					  }
					]
				  },
				  {
					"resourceTypeId": 3,
					"resourceTypeName": "Operator",
					"cost": 4300,
					"taskResourceCosts": [
					  {
						"resourceId": 21,
						"resourceName": "joe test operatorworking as a Operator",
						"cost": 4300
					  }
					]
				  }
				]
			  },
			  "equipmentCost": {
				"cost": 3870,
				"taskResourceTypeCosts": [
				  {
					"resourceTypeId": 10,
					"resourceTypeName": "Grain Cart",
					"cost": 1290,
					"taskResourceCosts": [
					  {
						"resourceId": 21,
						"resourceName": "Grain Cart #2",
						"cost": 1290
					  }
					]
				  },
				  {
					"resourceTypeId": 11,
					"resourceTypeName": "Grain Truck",
					"cost": 1505,
					"taskResourceCosts": [
					  {
						"resourceId": 22,
						"resourceName": "Grain Truck #2",
						"cost": 1505
					  }
					]
				  },
				  {
					"resourceTypeId": 9,
					"resourceTypeName": "Combine",
					"cost": 1075,
					"taskResourceCosts": [
					  {
						"resourceId": 20,
						"resourceName": "Combine #2",
						"cost": 1075
					  }
					]
				  }
				]
			  },
			  "productsCost": {
				"cost": 0,
				"taskResourceTypeCosts": []
			  }
			}
		  ],
		  "colour": "#0076b2"
		},
		{
		  "activityDto": {
			"id": 3,
			"created": 1438133870634,
			"lastModified": 1438133997461,
			"planId": 1,
			"indexInPlan": 2,
			"fieldCropId": 1,
			"organizationId": 4,
			"activityTypeId": 2,
			"startTime": 1422097200000,
			"endTime": 1422871200000,
			"durationInHours": 215,
			"state": "SCHEDULED",
			"cost": 7263.21,
			"duplicateOfId": 0
		  },
		  "activityTypeId": 2,
		  "revenue": 0,
		  "cropPrice": 17,
		  "cost": 7263.21,
		  "profit": -7263.21,
		  "taskFinances": [
			{
			  "taskDto": {
				"id": 19,
				"created": 1438133870507,
				"lastModified": 1438133870507,
				"activityId": 3,
				"name": "starter fertilizer",
				"startTime": 1422097200000,
				"endTime": 1422871200000,
				"durationInHours": 215,
				"cost": 1983.21,
				"state": "UNSCHEDULED"
			  },
			  "cost": 7263.21,
			  "laborCost": {
				"cost": 4300,
				"taskResourceTypeCosts": [
				  {
					"resourceTypeId": 3,
					"resourceTypeName": "Operator",
					"cost": 4300,
					"taskResourceCosts": [
					  {
						"resourceId": 20,
						"resourceName": "joe test operatorworking as a Operator",
						"cost": 4300
					  }
					]
				  }
				]
			  },
			  "equipmentCost": {
				"cost": 2795,
				"taskResourceTypeCosts": [
				  {
					"resourceTypeId": 5,
					"resourceTypeName": "Spreader",
					"cost": 1505,
					"taskResourceCosts": [
					  {
						"resourceId": 13,
						"resourceName": "Spreader",
						"cost": 1505
					  }
					]
				  },
				  {
					"resourceTypeId": 4,
					"resourceTypeName": "Tractor",
					"cost": 1290,
					"taskResourceCosts": [
					  {
						"resourceId": 12,
						"resourceName": "Tractor",
						"cost": 1290
					  }
					]
				  }
				]
			  },
			  "productsCost": {
				"cost": 168.21,
				"taskResourceTypeCosts": [
				  {
					"resourceTypeId": 4,
					"resourceTypeName": "Nitrogen",
					"cost": 71.98,
					"taskResourceCosts": [
					  {
						"resourceId": 14,
						"resourceName": "nitrogen",
						"cost": 71.98
					  }
					]
				  },
				  {
					"resourceTypeId": 3,
					"resourceTypeName": "Potassium",
					"cost": 16.16,
					"taskResourceCosts": [
					  {
						"resourceId": 13,
						"resourceName": "potassium",
						"cost": 16.16
					  }
					]
				  },
				  {
					"resourceTypeId": 2,
					"resourceTypeName": "Phosphorus",
					"cost": 80.07,
					"taskResourceCosts": [
					  {
						"resourceId": 12,
						"resourceName": "phosphorus",
						"cost": 80.07
					  }
					]
				  }
				]
			  }
			}
		  ],
		  "colour": "#2a8789"
		},
		{
		  "activityDto": {
			"id": 4,
			"created": 1438133870753,
			"lastModified": 1438133997479,
			"planId": 1,
			"indexInPlan": 3,
			"fieldCropId": 1,
			"organizationId": 4,
			"activityTypeId": 3,
			"startTime": 1422961200000,
			"endTime": 1423825200000,
			"durationInHours": 240,
			"state": "SCHEDULED",
			"cost": 7440,
			"duplicateOfId": 0
		  },
		  "activityTypeId": 3,
		  "revenue": 0,
		  "cropPrice": 17,
		  "cost": 7440,
		  "profit": -7440,
		  "taskFinances": [
			{
			  "taskDto": {
				"id": 20,
				"created": 1438133870729,
				"lastModified": 1438133870729,
				"activityId": 4,
				"name": "tilling",
				"startTime": 1422961200000,
				"endTime": 1423825200000,
				"durationInHours": 240,
				"cost": 1488,
				"state": "UNSCHEDULED"
			  },
			  "cost": 7440,
			  "laborCost": {
				"cost": 4800,
				"taskResourceTypeCosts": [
				  {
					"resourceTypeId": 3,
					"resourceTypeName": "Operator",
					"cost": 4800,
					"taskResourceCosts": [
					  {
						"resourceId": 20,
						"resourceName": "joe test operatorworking as a Operator",
						"cost": 4800
					  }
					]
				  }
				]
			  },
			  "equipmentCost": {
				"cost": 2640,
				"taskResourceTypeCosts": [
				  {
					"resourceTypeId": 6,
					"resourceTypeName": "Offset Disk",
					"cost": 1200,
					"taskResourceCosts": [
					  {
						"resourceId": 14,
						"resourceName": "Offset Disk",
						"cost": 1200
					  }
					]
				  },
				  {
					"resourceTypeId": 4,
					"resourceTypeName": "Tractor",
					"cost": 1440,
					"taskResourceCosts": [
					  {
						"resourceId": 12,
						"resourceName": "Tractor",
						"cost": 1440
					  }
					]
				  }
				]
			  },
			  "productsCost": {
				"cost": 0,
				"taskResourceTypeCosts": []
			  }
			}
		  ],
		  "colour": "#549860"
		},
		{
		  "activityDto": {
			"id": 5,
			"created": 1438133870924,
			"lastModified": 1438133997500,
			"planId": 1,
			"indexInPlan": 4,
			"fieldCropId": 1,
			"organizationId": 4,
			"activityTypeId": 4,
			"startTime": 1423825200000,
			"endTime": 1424516400000,
			"durationInHours": 192,
			"state": "SCHEDULED",
			"cost": 6149.01,
			"duplicateOfId": 0
		  },
		  "activityTypeId": 4,
		  "revenue": 0,
		  "cropPrice": 17,
		  "cost": 6149.01,
		  "profit": -6149.01,
		  "taskFinances": [
			{
			  "taskDto": {
				"id": 21,
				"created": 1438133870866,
				"lastModified": 1438133870866,
				"activityId": 5,
				"name": "planting",
				"startTime": 1423825200000,
				"endTime": 1424516400000,
				"durationInHours": 192,
				"cost": 1541.01,
				"state": "UNSCHEDULED"
			  },
			  "cost": 6149.01,
			  "laborCost": {
				"cost": 3840,
				"taskResourceTypeCosts": [
				  {
					"resourceTypeId": 5,
					"resourceTypeName": "Planter Operator",
					"cost": 3840,
					"taskResourceCosts": [
					  {
						"resourceId": 22,
						"resourceName": "joe test planter operatorworking as a Planter Operator",
						"cost": 3840
					  }
					]
				  }
				]
			  },
			  "equipmentCost": {
				"cost": 2304,
				"taskResourceTypeCosts": [
				  {
					"resourceTypeId": 7,
					"resourceTypeName": "Planter",
					"cost": 1152,
					"taskResourceCosts": [
					  {
						"resourceId": 15,
						"resourceName": "Planter",
						"cost": 1152
					  }
					]
				  },
				  {
					"resourceTypeId": 4,
					"resourceTypeName": "Tractor",
					"cost": 1152,
					"taskResourceCosts": [
					  {
						"resourceId": 12,
						"resourceName": "Tractor",
						"cost": 1152
					  }
					]
				  }
				]
			  },
			  "productsCost": {
				"cost": 5.01,
				"taskResourceTypeCosts": [
				  {
					"resourceTypeId": 5,
					"resourceTypeName": "Seed",
					"cost": 5.01,
					"taskResourceCosts": [
					  {
						"resourceId": 15,
						"resourceName": "seed",
						"cost": 5.01
					  }
					]
				  }
				]
			  }
			}
		  ],
		  "colour": "#7ea937"
		},
		{
		  "activityDto": {
			"id": 6,
			"created": 1438133871077,
			"lastModified": 1438133997532,
			"planId": 1,
			"indexInPlan": 5,
			"fieldCropId": 1,
			"organizationId": 4,
			"activityTypeId": 5,
			"startTime": 1434193200000,
			"endTime": 1434967200000,
			"durationInHours": 215,
			"state": "SCHEDULED",
			"cost": 5948.96,
			"duplicateOfId": 0
		  },
		  "activityTypeId": 5,
		  "revenue": 0,
		  "cropPrice": 17,
		  "cost": 5948.96,
		  "profit": -5948.96,
		  "taskFinances": [
			{
			  "taskDto": {
				"id": 22,
				"created": 1438133871025,
				"lastModified": 1438133871025,
				"activityId": 6,
				"name": "early nitrogen",
				"startTime": 1434193200000,
				"endTime": 1434967200000,
				"durationInHours": 215,
				"cost": 1628.96,
				"state": "UNSCHEDULED"
			  },
			  "cost": 5948.96,
			  "laborCost": {
				"cost": 4300,
				"taskResourceTypeCosts": [
				  {
					"resourceTypeId": 6,
					"resourceTypeName": "Spray Operator",
					"cost": 4300,
					"taskResourceCosts": [
					  {
						"resourceId": 23,
						"resourceName": "joe test spray operatorworking as a Spray Operator",
						"cost": 4300
					  }
					]
				  }
				]
			  },
			  "equipmentCost": {
				"cost": 1505,
				"taskResourceTypeCosts": [
				  {
					"resourceTypeId": 8,
					"resourceTypeName": "Sprayer",
					"cost": 1505,
					"taskResourceCosts": [
					  {
						"resourceId": 16,
						"resourceName": "Sprayer",
						"cost": 1505
					  }
					]
				  }
				]
			  },
			  "productsCost": {
				"cost": 143.96,
				"taskResourceTypeCosts": [
				  {
					"resourceTypeId": 4,
					"resourceTypeName": "Nitrogen",
					"cost": 143.96,
					"taskResourceCosts": [
					  {
						"resourceId": 14,
						"resourceName": "nitrogen",
						"cost": 143.96
					  }
					]
				  }
				]
			  }
			}
		  ],
		  "colour": "#8fac20"
		},
		{
		  "activityDto": {
			"id": 7,
			"created": 1438133871271,
			"lastModified": 1438133997552,
			"planId": 1,
			"indexInPlan": 6,
			"fieldCropId": 1,
			"organizationId": 4,
			"activityTypeId": 6,
			"startTime": 1435921200000,
			"endTime": 1436695200000,
			"durationInHours": 215,
			"state": "SCHEDULED",
			"cost": 6274.43,
			"duplicateOfId": 0
		  },
		  "activityTypeId": 6,
		  "revenue": 0,
		  "cropPrice": 17,
		  "cost": 6274.43,
		  "profit": -6274.43,
		  "taskFinances": [
			{
			  "taskDto": {
				"id": 23,
				"created": 1438133871181,
				"lastModified": 1438133871181,
				"activityId": 7,
				"name": "late nitrogen",
				"startTime": 1499079600000,
				"endTime": 1499853600000,
				"durationInHours": 215,
				"cost": 1954.43,
				"state": "UNSCHEDULED"
			  },
			  "cost": 6274.43,
			  "laborCost": {
				"cost": 4300,
				"taskResourceTypeCosts": [
				  {
					"resourceTypeId": 6,
					"resourceTypeName": "Spray Operator",
					"cost": 4300,
					"taskResourceCosts": [
					  {
						"resourceId": 23,
						"resourceName": "joe test spray operatorworking as a Spray Operator",
						"cost": 4300
					  }
					]
				  }
				]
			  },
			  "equipmentCost": {
				"cost": 1505,
				"taskResourceTypeCosts": [
				  {
					"resourceTypeId": 8,
					"resourceTypeName": "Sprayer",
					"cost": 1505,
					"taskResourceCosts": [
					  {
						"resourceId": 16,
						"resourceName": "Sprayer",
						"cost": 1505
					  }
					]
				  }
				]
			  },
			  "productsCost": {
				"cost": 469.43,
				"taskResourceTypeCosts": [
				  {
					"resourceTypeId": 4,
					"resourceTypeName": "Nitrogen",
					"cost": 287.31,
					"taskResourceCosts": [
					  {
						"resourceId": 14,
						"resourceName": "nitrogen",
						"cost": 287.31
					  }
					]
				  },
				  {
					"resourceTypeId": 6,
					"resourceTypeName": "Broadleaf Herbicide",
					"cost": 182.12,
					"taskResourceCosts": [
					  {
						"resourceId": 16,
						"resourceName": "Broadleaf Herbicide",
						"cost": 182.12
					  }
					]
				  }
				]
			  }
			}
		  ],
		  "colour": "#87a01b"
		},
		{
		  "activityDto": {
			"id": 8,
			"created": 1438133871408,
			"lastModified": 1438133997575,
			"planId": 1,
			"indexInPlan": 7,
			"fieldCropId": 1,
			"organizationId": 4,
			"activityTypeId": 7,
			"startTime": 1438513200000,
			"endTime": 1439287200000,
			"durationInHours": 215,
			"state": "SCHEDULED",
			"cost": 6120.57,
			"duplicateOfId": 0
		  },
		  "activityTypeId": 7,
		  "revenue": 0,
		  "cropPrice": 17,
		  "cost": 6120.57,
		  "profit": -6120.57,
		  "taskFinances": [
			{
			  "taskDto": {
				"id": 24,
				"created": 1438133871355,
				"lastModified": 1438133871355,
				"activityId": 8,
				"name": "pest control",
				"startTime": 1438513200000,
				"endTime": 1439287200000,
				"durationInHours": 215,
				"cost": 1800.57,
				"state": "UNSCHEDULED"
			  },
			  "cost": 6120.57,
			  "laborCost": {
				"cost": 4300,
				"taskResourceTypeCosts": [
				  {
					"resourceTypeId": 6,
					"resourceTypeName": "Spray Operator",
					"cost": 4300,
					"taskResourceCosts": [
					  {
						"resourceId": 23,
						"resourceName": "joe test spray operatorworking as a Spray Operator",
						"cost": 4300
					  }
					]
				  }
				]
			  },
			  "equipmentCost": {
				"cost": 1505,
				"taskResourceTypeCosts": [
				  {
					"resourceTypeId": 8,
					"resourceTypeName": "Sprayer",
					"cost": 1505,
					"taskResourceCosts": [
					  {
						"resourceId": 16,
						"resourceName": "Sprayer",
						"cost": 1505
					  }
					]
				  }
				]
			  },
			  "productsCost": {
				"cost": 315.57,
				"taskResourceTypeCosts": [
				  {
					"resourceTypeId": 7,
					"resourceTypeName": "Pesticide",
					"cost": 315.57,
					"taskResourceCosts": [
					  {
						"resourceId": 17,
						"resourceName": "pesticide",
						"cost": 315.57
					  }
					]
				  }
				]
			  }
			}
		  ],
		  "colour": "#809517"
		}
	  ],
	  "totalCost": 72736.18,
	  "totalRevenue": 66640,
	  "totalProfit": -6096.18
	}
};

plenty_admin.UI.plan.activityListContainer = plenty_admin.UI.plan.DOM.find("table.planActivities tbody");
plenty_admin.UI.plan.financesGraphEl = plenty_admin.UI.plan.DOM.find("#plan_graph_wrapper canvas");
