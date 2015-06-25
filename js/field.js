//*********************** field.js **************************//
//create namespace for organization layout
plenty_admin.UI.field = {};
plenty_admin.UI.field.DOM = $("#field-container");
plenty_admin.UI.field.weatherTabs = {};
plenty_admin.UI.field.weatherTabs.DOM = plenty_admin.UI.field.DOM.find('.field_weather_data');
plenty_admin.UI.field.assetTabs = {};
plenty_admin.UI.field.assetTabs.DOM = plenty_admin.UI.field.DOM.find('.field_asset_data');
plenty_admin.UI.field.renderedGraphs = [];

/* Define field graph DOM elements */
plenty_admin.UI.field.tempGraphEl = plenty_admin.UI.field.DOM.find(".tab-content .tab-pane#temp canvas");
plenty_admin.UI.field.moistureGraphEl = plenty_admin.UI.field.DOM.find(".tab-content .tab-pane#moisture canvas");
plenty_admin.UI.field.precipGraphEl = plenty_admin.UI.field.DOM.find(".tab-content .tab-pane#precip canvas");
plenty_admin.UI.field.gddGraphEl = plenty_admin.UI.field.DOM.find(".tab-content .tab-pane#gdd canvas");
plenty_admin.UI.field.financesGraphEl = plenty_admin.UI.field.DOM.find(".tab-content .tab-pane#finances canvas");

/* Set up the global properties of the charts plugin*/
Chart.defaults.global.responsive = true;
Chart.defaults.Line.scaleShowHorizontalLines = true;
Chart.defaults.Line.scaleShowVerticalLines = true;
Chart.defaults.Line.scaleShowGridLines = true;
Chart.defaults.Line.pointHitDetectionRadius = 1;

/* Set the start / End date ranges temporaraly until we get some real activity dates */
var d = new Date();
plenty_admin.UI.field.dates = {
	start:	null /*(d.getFullYear()-1)+"-"+(d.getMonth()+1)+"-"+d.getDate()+" "+(d.getHours()+1)+":"+d.getMinutes()*/,
	end:		null /*d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+" "+(d.getHours()+1)+":"+d.getMinutes()*/
};

/*
Chart.defaults.global.customTooltips = function(tooltip) {
	//console.log("tooltip: ", tooltip);
	var tooltipEl = $('#chartjs-tooltip');

	if (!tooltip) {
		tooltipEl.css({
			opacity: 0
		});
		return;
	}

	tooltipEl.removeClass('above below');
	tooltipEl.addClass(tooltip.yAlign);

	var innerHtml = '';
	
	if(tooltip.labels){
	for (var i = tooltip.labels.length - 1; i >= 0; i--) {
		innerHtml += [
			'<div class="chartjs-tooltip-section">',
			'	<span class="chartjs-tooltip-key" style="background-color:' + tooltip.legendColors[i].fill + '"></span>',
			'	<span class="chartjs-tooltip-value">' + tooltip.labels[i] + '</span>',
			'</div>'
		].join('');
	}
	}else{
		innerHtml = ['<div class="chartjs-tooltip-section">',
			'	<span class="chartjs-tooltip-value">' + tooltip.text + '</span>',
			'</div>'].join('');
	}
	
	tooltipEl.html(innerHtml);

	tooltipEl.css({
		opacity: 1,
		left: tooltip.chart.canvas.offsetLeft + tooltip.x + 'px',
		top: tooltip.chart.canvas.offsetTop + tooltip.y + 'px',
		fontFamily: tooltip.fontFamily,
		fontSize: tooltip.fontSize,
		fontStyle: tooltip.fontStyle,
	});
};
*/

//method to initiate the field page
plenty_admin.UI.field.init = function(fieldObj, context){
	console.log("plenty_admin.UI.field.init", fieldObj);
	
	switch(context){
		case "settings":
			plenty_admin.HELPER.showLoadingOverlay();
			plenty_admin.UI.currentScreen
			.fadeOut("normal", function(){
				plenty_admin.UI.currentScreen = plenty_admin.UI.field.DOM;
				plenty_admin.UI.field.populate(fieldObj);
				plenty_admin.UI.field.polygon = null;
				plenty_admin.MAPS.draw_field_on_map(fieldObj, "field_map", {
					mapTypeId: google.maps.MapTypeId.HYBRID,
					zoom:  12,
					disableDefaultUI: true,
					draggable: false, 
					zoomControl: false, 
					scrollwheel: false, 
					disableDoubleClickZoom: true
				  }, function(map, fieldObj, polygon){
					plenty_admin.UI.field.polygon = polygon;
				});
				plenty_admin.UI.currentScreen.fadeIn("normal", function(){
					plenty_admin.HELPER.hideLoadingOverlay();
				});
			});
		break;
		
		case "map":
			plenty_admin.UI.currentScreen
			.closest(".fill-area")
			.fadeOut("normal", function(){
				plenty_admin.UI.currentScreen = plenty_admin.UI.field.DOM;
				plenty_admin.UI.field.populate(fieldObj);
				plenty_admin.UI.field.polygon = null;
				
				plenty_admin.MAPS.draw_field_on_map(fieldObj, "field_map", {
					mapTypeId: google.maps.MapTypeId.HYBRID,
					zoom:  12,
					disableDefaultUI: true,
					draggable: false, 
					zoomControl: false, 
					scrollwheel: false, 
					disableDoubleClickZoom: true
				  }, function(map, fieldObj, polygon){
					plenty_admin.UI.field.polygon = polygon;
				});
				
				plenty_admin.UI.currentScreen
				.addClass("fill-area-content flexbox-item-grow")
				plenty_admin.UI.currentScreen.fadeIn("normal", function(){
					plenty_admin.HELPER.hideLoadingOverlay();
				});
			})
			.parent()
			.find(".filter_controls")
			.fadeOut("fast");
		break;
	}
}

//get field order by year
plenty_admin.REST.get_fieldCrops_order_by_year_descending = function(fieldId, callback){
	plenty_admin.REST.getByFieldOrderByYearDescending = plenty_admin.api.one("fieldCrops/getByFieldOrderByYearDescending", fieldId);
	plenty_admin.REST.getByFieldOrderByYearDescending.get().then(function(response){
		console.log("fieldCrops/getByFieldOrderByYearDescending", response.body());
		if(Array.isArray(response.body())){
			var returnData = plenty_admin.REST.get_array_from_data(response.body());
		}else{
			var returnData = response.body(); //"NO DATA";
		}
		if(callback && typeof callback === "function"){
			callback(returnData);
		}
	});
}

//get field crop order by descending
plenty_admin.REST.get_activities_by_field_crop_order_by_desc = function(fieldCropId, callback){
	plenty_admin.REST.getByFieldCropOrderByDateAsc = plenty_admin.api.one("activities/getByFieldCropOrderByDateAsc", fieldCropId);
	plenty_admin.REST.getByFieldCropOrderByDateAsc.get().then(function(response){
		console.log("activities/getByFieldCropOrderByDateAsc", response.body());
		if(Array.isArray(response.body())){
			var returnData = plenty_admin.REST.get_array_from_data(response.body());
		}else{
			var returnData = response.body(); //"NO DATA";
		}
		if(callback && typeof callback === "function"){
			callback(returnData);
		}
	});
}

//get activities for organization by date range
plenty_admin.REST.get_activity_finances_for_date_range = function(fieldCropId, fromDate, toDate, callback){
	plenty_admin.REST.getActivityFinancesForDateRange = plenty_admin.api.one("activities/getActivityFinancesForDateRange", fieldCropId+"/"+fromDate+"/"+toDate);
	plenty_admin.REST.getActivityFinancesForDateRange.get().then(function(response){
		console.log("activities/getActivityFinancesForDateRange", response.body());
		if(Array.isArray(response.body())){
			var returnData = plenty_admin.REST.get_array_from_data(response.body());
		}else{
			var returnData = response.body(); //"NO DATA";
		}
		if(callback && typeof callback === "function"){
			callback(returnData);
		}
	});
}

//get activities for organization by date range
plenty_admin.REST.get_weather_days_with_dateRange = function(fieldId, fromDate, toDate, callback){
	plenty_admin.REST.getWatherDaysByFieldAndByDateRange = plenty_admin.api.one("fields/getWatherDaysByFieldAndByDateRange", fieldId+"/"+fromDate+"/"+toDate);
	plenty_admin.REST.getWatherDaysByFieldAndByDateRange.get().then(function(response){
		if(Array.isArray(response.body())){
			var returnData = plenty_admin.REST.get_array_from_data(response.body());
		}else{
			var returnData = response.body(); //"NO DATA";
		}
		if(callback && typeof callback === "function"){
			callback(returnData);
		}
	});
}

//get equipment for a field
plenty_admin.REST.get_field_equipments_with_fieldId = function(fieldCropId, callback){
	plenty_admin.REST.getFieldEquipmentsWithFieldId = plenty_admin.api.one("fieldEquipment/getFieldEquipmentsWithFieldId", fieldCropId);
	plenty_admin.REST.getFieldEquipmentsWithFieldId.get().then(function(response){
		if(Array.isArray(response.body())){
			var returnData = plenty_admin.REST.get_array_from_data(response.body());
		}else{
			var returnData = response.body(); //"NO DATA";
		}
		if(callback && typeof callback === "function"){
			callback(returnData);
		}
	});
}

plenty_admin.UI.field.populate = function(fieldObj){
	plenty_admin.REST.get_fieldCrops_order_by_year_descending(fieldObj.id, function(fieldData){
		console.log("get_field_order_by_year_descending: ", fieldData);
		
		var fieldCropsByYear = {};
		
		for(var f=0; f<fieldData.length; f++){
			fieldCrop = fieldData[f];
			fieldCropsByYear[parseInt(fieldCrop.year)] = fieldCrop;
		}
		
		console.log("fieldCropsByYear", fieldCropsByYear);
		
		var field_year_slider = plenty_admin.UI.field.DOM.find(".field_year_slider");
		
		field_year_slider
		.slider({
			min: parseInt(fieldData[fieldData.length-1].year),
			max: parseInt(fieldData[0].year),
			value: parseInt(fieldData[0].year),
			//tooltip: "show",
			formatter: function(value){
				return value+" - "+plenty_admin.DATA.cropTypes[fieldCropsByYear[parseInt(value)].cropTypeId].name;
				//return 'Current value: ' + value;
			}
		}) //set up tooltip to show year and crop for that year
		.on("slide", function(){
			//console.log("SLIDER SLIDE");
		})
		.on("slideStart", function(e){
			console.log("SLIDER SLIDESTART: ", $(this), e, e.target);
		})
		.on("slideStop", function(){
			console.log("SLIDER SLIDESTOP");
		})
		.on("change", function(e){
			console.log("SLIDER CHANGE", e.value.newValue);
			//get initial activities for this crop Id
			var cropYear = fieldCropsByYear[e.value.newValue];
			var cropName = plenty_admin.DATA.cropTypes[cropYear.cropTypeId].name;
			
			console.log("cropYear:", cropYear);
			console.log("cropName:", cropName);
			
			plenty_admin.UI.field.update_field_year(cropYear);
			
			plenty_admin.UI.field.DOM
			.find(".current_year_crop")
			.text(e.value.newValue+" - "+plenty_admin.DATA.cropTypes[cropYear.cropTypeId].name);
			
			plenty_admin.UI.field.polygon.setOptions({fillColor: plenty_admin.MAPS.legendItems[cropName].colour, strokeColor: plenty_admin.MAPS.legendItems[cropName].colour});
		});
		
		//set up finance dohnut graph when switching asset tabs
		plenty_admin.UI.field.assetTabs.DOM
		.off("shown.bs.tab")
		.on('shown.bs.tab', function (e) {
			var url = e.target.href;
			var hash = url.substring(url.indexOf('#'));
			console.log("changed: ", hash);
			
			if(hash === "#finances"){
				plenty_admin.UI.field.renderFinancesGraph();
			}
		});
		
		//set up graph update when switching weather tab
		plenty_admin.UI.field.weatherTabs.DOM
		.off("shown.bs.tab")
		.on('shown.bs.tab', function (e) {
			var url = e.target.href;
			var hash = url.substring(url.indexOf('#'));
			console.log("changed: ", hash);
			plenty_admin.UI.field.updateWeatherGraph(hash);
		});
		
		plenty_admin.UI.field.update_field_year(fieldCropsByYear[parseInt(field_year_slider.slider('getValue'))]);
		
		plenty_admin.UI.field.DOM
		.find(".current_year_crop")
		.text(field_year_slider.slider('getValue')+" - "+plenty_admin.DATA.cropTypes[fieldCropsByYear[parseInt(field_year_slider.slider('getValue'))].cropTypeId].name);
	});
}

plenty_admin.UI.field.updateWeatherGraph = function(hash){
	switch(hash){
		case "#temp":
			//create the temp graph object if it does not yet exist
			if(!plenty_admin.UI.field.tempGraph){
				plenty_admin.UI.field.renderTempGraph();
			}
		break;
		
		case "#moisture":
			//create the moisture graph object if it does not yet exist
			if(!plenty_admin.UI.field.moistureGraph){
				plenty_admin.UI.field.renderMoistureGraph();
			}
		break;
		
		case "#precip":
			//create the moisture graph object if it does not yet exist
			if(!plenty_admin.UI.field.precipGraph){
				plenty_admin.UI.field.renderPrecipGraph();
			}
		break;
		
		case "#gdd":
			//create the moisture graph object if it does not yet exist
			if(!plenty_admin.UI.field.gddGraph){
				plenty_admin.UI.field.renderGDDGraph();
			}
		break;
	}
}

plenty_admin.UI.field.update_field_year = function (cropYear){
	plenty_admin.REST.get_field_equipments_with_fieldId(cropYear.id, function(fieldEquipment){
		console.log("get_field_equipments_with_fieldId", fieldEquipment);
	});
	
	//pull in activities once weatherDays have loaded	
	plenty_admin.REST.get_activities_by_field_crop_order_by_desc(cropYear.cropTypeId, function(activitiesForCropType){
		console.log("get_activities_by_field_crop_order_by_desc", activitiesForCropType);
		
		var startDate = plenty_admin.HELPER.formateJavaDate(activitiesForCropType[0].startTime);
		//HACK - Date ranges on activities provided to narrow to return results
		//Overriding with a year range to ensure data gets returned
		//plenty_admin.UI.field.dates.start = (startDate.obj.getFullYear()-1)+"-"+(startDate.obj.getMonth()+1)+"-"+startDate.obj.getDate()+" "+(startDate.obj.getHours()+1)+":"+startDate.obj.getMinutes();
		
		var d = new Date(); /* HACK!!! */
		plenty_admin.UI.field.dates.start = (d.getFullYear()-1)+"-"+(d.getMonth()+1)+"-"+d.getDate()+" "+(d.getHours())+":"+d.getMinutes();
		
		var endDate = plenty_admin.HELPER.formateJavaDate(activitiesForCropType[activitiesForCropType.length -1].endTime);
		//plenty_admin.UI.field.dates.end = (endDate.obj.getFullYear()-1)+"-"+(endDate.obj.getMonth()+1)+"-"+endDate.obj.getDate()+" "+(endDate.obj.getHours()+1)+":"+endDate.obj.getMinutes();
		plenty_admin.UI.field.dates.end = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+" "+(d.getHours())+":"+d.getMinutes();
		
		//prepare all data type lists and wait till they've loaded
		plenty_admin.DATA.eventCollector = window.eventcollector(2, 10000);
		plenty_admin.REST.getActivityTypes(); //HACK the fail event triggers done for this request 
		
		plenty_admin.REST.get_weather_days_with_dateRange(cropYear.fieldId, plenty_admin.UI.field.dates.start, plenty_admin.UI.field.dates.end, function(weatherDays){
			console.log("get_weather_days_with_dateRange", weatherDays);
			
			plenty_admin.UI.field.weatherDays = {
					dates: [],
					months: [],
					labels: [],
					
					gddToday: [],
					
					gddTotalToToday: [],
					
					maxTemp: [],
					
					minTemp: [],
					
					percipToday: [],
					
					percipTotalToToday: [],
					
					cropSurvey: [],
					
					moisture: [],
					
					weatherEvents: {
						precip: [],
						temp: [],
						wind: []
					}
			}
			
			var precipCumulative = 0;
			var label_inc = 0;
			var label_step = 3;
			
			for(var wO = 0; wO < weatherDays.length; wO++){
				weatherOb = weatherDays[wO];
				var obTime = plenty_admin.HELPER.formateJavaDate(weatherOb.observationTime);
				
				//create labelling sets for graphs
				plenty_admin.UI.field.weatherDays.dates.push(obTime.date);
				
				if(plenty_admin.UI.field.weatherDays.months.indexOf(obTime.month) == -1){
					plenty_admin.UI.field.weatherDays.months.push(obTime.month);
				}else{
					plenty_admin.UI.field.weatherDays.dates.push("");
				}
				
				if(label_inc == 0){
					plenty_admin.UI.field.weatherDays.labels.push(obTime.date);
					label_inc += 1;
					if(label_inc === label_step){
						label_inc = 0;
					}
				}else{
					plenty_admin.UI.field.weatherDays.labels.push("");
					label_inc += 1;
					if(label_inc === label_step){
						label_inc = 0;
					}
				}
				
				for(prop in weatherOb){
					if(weatherOb.hasOwnProperty(prop)){
						if(prop === "weatherEvents"){
							for(var w=0; w<weatherOb[prop].length; w++){
								var wEvent = weatherOb[prop][w];
								wEvent.weatherDayDate = obTime;
								wEvent.dayIndex = wO;
								
								switch(wEvent.type){
									case "HIGH_TEMP":
										wEvent.iconClass = "wi wi-hot";
										plenty_admin.UI.field.weatherDays[prop].temp.push(wEvent);
									break;
									
									case "FREEZE":
										wEvent.iconClass = "wi wi-thermometer-exterior";
										plenty_admin.UI.field.weatherDays[prop].temp.push(wEvent);
									break;
									
									case "SNOW":
										wEvent.iconClass = "wi wi-snow-wind";
										plenty_admin.UI.field.weatherDays[prop].precip.push(wEvent);
									break;
									case "RAIN":
										wEvent.iconClass = "wi wi-rain";
										plenty_admin.UI.field.weatherDays[prop].precip.push(wEvent);
									break;
									
									case "HIGH_WINDS":
										wEvent.iconClass = "wi wi-strong-wind";
										plenty_admin.UI.field.weatherDays[prop].wind.push(wEvent);
									break;
								}
							}
						}else{
							plenty_admin.UI.field.weatherDays[prop].push(weatherOb[prop]);
						}
					}
					
					plenty_admin.UI.field.weatherDays.length = weatherDays.length;
				}
			}
			
			console.log("plenty_admin.UI.field.weatherDays:", plenty_admin.UI.field.weatherDays);
			
			//update the graph in the currently visible tab
			var selectedGraph = plenty_admin.UI.field.weatherTabs.DOM.find(".nav-tabs li.active a").prop("href")
			var hash = selectedGraph.substring(selectedGraph.indexOf('#'));
			
			switch(hash){
				case "#temp":
					plenty_admin.UI.field.renderTempGraph();
				break;
				
				case "#moisture":
					plenty_admin.UI.field.renderMoistureGraph();
				break;
				
				case "#precip":
					plenty_admin.UI.field.renderPrecipGraph();
				break;
				
				case "#gdd":
					plenty_admin.UI.field.renderGDDGraph();
				break;
			}
			
			plenty_admin.UI.field.renderWeatherEvents(plenty_admin.UI.field.weatherDays.weatherEvents.precip, "precip");
			plenty_admin.UI.field.renderWeatherEvents(plenty_admin.UI.field.weatherDays.weatherEvents.temp, "temp");
			plenty_admin.UI.field.renderWeatherEvents(plenty_admin.UI.field.weatherDays.weatherEvents.wind, "wind");
			
			plenty_admin.DATA.eventCollector.done("event 1");
		});
		
		//ONE DONE EVENT CURRENTLY CALLED WHEN THIS REQUEST FAILS
		//THIS IS A HACK AND SHOULD BE REMOVED IN GLOBAL.JS ONCE THE API WORKS
		plenty_admin.DATA.eventCollector.on('alldone', function(total) {
			plenty_admin.UI.field.renderActivities(activitiesForCropType);
		});	
		
		plenty_admin.REST.get_activity_finances_for_date_range(cropYear.id, plenty_admin.UI.field.dates.start, plenty_admin.UI.field.dates.end, function(fieldCropActivityFinances){
			console.log("get_activity_finances_for_date_range", fieldCropActivityFinances);
			plenty_admin.UI.field.fieldCropActivityFinances = fieldCropActivityFinances;
		});
	});
}

plenty_admin.UI.field.renderWeatherEvents = function(events, hash){
	var eventsContainer = plenty_admin.UI.field.DOM.find(".tab-content .weatherEvents."+hash+"");
	
	for(var e=0; e<events.length; e++){
		var wE = events[e];
		var leftPos = ((parseInt(eventsContainer.width()) / plenty_admin.UI.field.weatherDays.length)*wE.dayIndex)-8;
		
		if(leftPos < 0){
			leftPos = 0;
		}
		
		var uom = "";
		switch(hash){
			case "temp":
				uom = "℉";
			break;
			
			case "precip":
				uom = '"';
			break;
			
			case "wind":
				uom = "mph";
			break;
		}
		var weatherEventHTML = $("<div class='event' data-toggle='tooltip' data-placement='top' title='"+(wE.detail ? wE.detail : wE.deatil)+": "+wE.amount.toFixed(2)+uom+"' style='left:"+leftPos+"px'><i class='"+wE.type+" "+wE.iconClass+"'></i></div>");
		
		weatherEventHTML
		.tooltip();
		
		eventsContainer.append(weatherEventHTML);
	}
}

plenty_admin.UI.field.renderActivities = function(activities){
	var timelineContainer = plenty_admin.UI.field.DOM.find(".activitiesTimeline .activities");
	var activityListContainer = plenty_admin.UI.field.DOM.find(".field_asset_data .tab-content #activities tbody");
	
	console.log("activityListContainer", activityListContainer);
	for(var a=0; a<activities.length; a++){
		var activity = activities[a];
		
		
		switch(activity.activityTypeId){
			case 1:
				activity.iconClass = "fa fa-car";
			break;
			
			case 2:
				activity.iconClass = "fa fa-rocket";
			break;
			
			case 3:
				activity.iconClass = "fa fa-ship";
			break;
		}
		
		activity.startDate = plenty_admin.HELPER.formateJavaDate(activity.startTime);
		activity.endDate = plenty_admin.HELPER.formateJavaDate(activity.endTime);
		activity.duration = Math.round(plenty_admin.HELPER.daydiff(activity.startTime, activity.endTime));
		activity.startOffsetDays = Math.round(plenty_admin.HELPER.daydiff(plenty_admin.UI.field.dates.start, activity.startTime)) /* !!!HACK!!!*/ - (400+(a*10));
		
		console.log("activity", activity);
		
		var dayWidth = parseInt(timelineContainer.width()) / plenty_admin.UI.field.weatherDays.length;
		var leftPos = dayWidth*activity.startOffsetDays;
		var eventWidth = dayWidth*activity.duration;
		
		if(eventWidth < 15){
			eventWidth = 15;
		}
		
		if(leftPos < 0){
			leftPos = 0;
		}
		
		var activityHTML = $("<div class='activity' data-toggle='tooltip' data-placement='top' title='"+plenty_admin.UI.field.getActivityTooltipTitle(activity)+"' style='left:"+leftPos+"px; width:"+eventWidth+"px'><i class='"+plenty_admin.DATA.activityTypes[activity.activityTypeId].toLowerCase()+" "+activity.iconClass+"'></i></div>");
		
		activityHTML
		.tooltip({
			html:true
		});
		
		timelineContainer.append(activityHTML);
		
		//build the activity list item
		var activityItem = [
				"<tr>",
					"<td>",
						activity.state,
					"</td>",
					"<td>",
						plenty_admin.DATA.activityTypes[activity.activityTypeId],
					"</td>",
					"<td>",
						activity.startDate.date,
					"</td>",
					"<td>",
						activity.duration,
					"</td>",
					"<td class='text-right'>",
						activity.cost,
					"</td>",
				"</tr>"
		].join("");
		
		activityListContainer.append(activityItem);
	}
}

plenty_admin.UI.field.renderEquipment = function(equipment){
	var equipmentListContainer = plenty_admin.UI.field.DOM.find(".field_asset_data .tab-content #equipment tbody");
	
	console.log("equipmentListContainer", equipmentListContainer);
	for(var a=0; a<equipment.length; a++){
		var equipmentItem = equipment[a];
		
		//set the icons for different equipment types
		switch(equipmentItem.equipmentTypeId){
			case 1:
				equipmentItem.iconClass = "fa fa-car";
			break;
			
			case 2:
				equipmentItem.iconClass = "fa fa-rocket";
			break;
			
			case 3:
				equipmentItem.iconClass = "fa fa-ship";
			break;
		}
		
		console.log("equipmentItem", equipmentItem);
		
		//build the activity list item
		var equipmentItemHTML = [
				"<tr>",
					"<td>",
						plenty_admin.DATA.equipmentTypes[equipmentItem.equipmentTypeId],
					"</td>",
					"<td>",
						equipmentItem.brand,
					"</td>",
					"<td>",
						equipmentItem.model,
					"</td>",
					"<td class='text-right'>",
						activity.liveData,
					"</td>",
				"</tr>"
		].join("");
		
		equipmentListContainer.append(equipmentItemHTML);
	}
}

plenty_admin.UI.field.getActivityTooltipTitle = function(activity){
	var title = plenty_admin.DATA.activityTypes[activity.activityTypeId]+
				"<br/>"+
				activity.startDate.date+
				"<br/>"+
				"$"+
				activity.cost;
	
	return title;
}

plenty_admin.UI.field.renderTempGraph = function(){
	var tempGraphData = {
			labels: plenty_admin.UI.field.weatherDays.labels,
			datasets: [
				{
					label: "Min",
					fillColor: "rgba(220,220,220,0.2)",
					strokeColor: "rgba(220,220,220,1)",
					pointColor: "rgba(220,220,220,1)",
					pointStrokeColor: "#fff",
					pointHighlightFill: "#fff",
					pointHighlightStroke: "rgba(220,220,220,1)",
					data: plenty_admin.UI.field.weatherDays.minTemp
				},
				{
					label: "Max",
					fillColor: "rgba(151,187,205,0.2)",
					strokeColor: "rgba(151,187,205,1)",
					pointColor: "rgba(151,187,205,1)",
					pointStrokeColor: "#fff",
					pointHighlightFill: "#fff",
					pointHighlightStroke: "rgba(151,187,205,1)",
					data: plenty_admin.UI.field.weatherDays.maxTemp
				}
			]
		};
		
		var tempGraphOptions = {
		
		};
		
		plenty_admin.UI.field.tempGraph = new Chart(plenty_admin.UI.field.tempGraphEl.get(0).getContext("2d")).Line(tempGraphData, tempGraphOptions);
		plenty_admin.UI.field.tempGraph.datasetId = "temp"; 
		plenty_admin.UI.field.renderedGraphs.push(plenty_admin.UI.field.tempGraph);
}

plenty_admin.UI.field.renderMoistureGraph = function(){
	var moistureGraphData = {
			labels: plenty_admin.UI.field.weatherDays.labels,
			datasets: [
				{
					label: "Min",
					fillColor: "rgba(220,220,220,0.2)",
					strokeColor: "rgba(220,220,220,1)",
					pointColor: "rgba(220,220,220,1)",
					pointStrokeColor: "#fff",
					pointHighlightFill: "#fff",
					pointHighlightStroke: "rgba(220,220,220,1)",
					data: plenty_admin.UI.field.weatherDays.dewPt.min
				},
				{
					label: "Max",
					fillColor: "rgba(151,187,205,0.2)",
					strokeColor: "rgba(151,187,205,1)",
					pointColor: "rgba(151,187,205,1)",
					pointStrokeColor: "#fff",
					pointHighlightFill: "#fff",
					pointHighlightStroke: "rgba(151,187,205,1)",
					data: plenty_admin.UI.field.weatherDays.dewPt.max
				},
				{
					label: "Avg",
					fillColor: "rgba(151,2,15,0.2)",
					strokeColor: "rgba(151,2,15,1)",
					pointColor: "rgba(151,2,15,1)",
					pointStrokeColor: "#fff",
					pointHighlightFill: "#fff",
					pointHighlightStroke: "rgba(151,2,15,1)",
					data: plenty_admin.UI.field.weatherDays.dewPt.avg
				}
			]
		};
		
		var moistureGraphOptions = {
			
		};
		
		plenty_admin.UI.field.moistureGraph = new Chart(plenty_admin.UI.field.moistureGraphEl.get(0).getContext("2d")).Line(moistureGraphData, moistureGraphOptions);
		plenty_admin.UI.field.moistureGraph.datasetId = "dewPt";
		plenty_admin.UI.field.renderedGraphs.push(plenty_admin.UI.field.moistureGraph);
}

plenty_admin.UI.field.renderPrecipGraph = function(){
	var precipGraphData = {
			labels: plenty_admin.UI.field.weatherDays.labels,
			datasets: [
				{
					label: "Precipitation",
					fillColor: "rgba(220,220,220,0.2)",
					strokeColor: "rgba(220,220,220,1)",
					pointColor: "rgba(220,220,220,1)",
					pointStrokeColor: "#fff",
					pointHighlightFill: "#fff",
					pointHighlightStroke: "rgba(220,220,220,1)",
					data: plenty_admin.UI.field.weatherDays.percipTotalToToday
				}
			]
		};
		
		var precipGraphOptions = {
			
		};
		
		plenty_admin.UI.field.precipGraph = new Chart(plenty_admin.UI.field.precipGraphEl.get(0).getContext("2d")).Line(precipGraphData, precipGraphOptions);
		plenty_admin.UI.field.precipGraph.datasetId = "precipAmt";
		plenty_admin.UI.field.renderedGraphs.push(plenty_admin.UI.field.precipGraph);
}

plenty_admin.UI.field.renderGDDGraph = function(){
	var GDDGraphData = {
			labels: plenty_admin.UI.field.weatherDays.labels,
			datasets: [
				{
					label: "GDD",
					fillColor: "rgba(220,220,220,0.2)",
					strokeColor: "rgba(220,220,220,1)",
					pointColor: "rgba(220,220,220,1)",
					pointStrokeColor: "#fff",
					pointHighlightFill: "#fff",
					pointHighlightStroke: "rgba(220,220,220,1)",
					data: plenty_admin.UI.field.weatherDays.gddTotalToToday
				}
			]
		};
		
		var GDDGraphOptions = {
			
		};
		
		plenty_admin.UI.field.gddGraph = new Chart(plenty_admin.UI.field.gddGraphEl.get(0).getContext("2d")).Line(GDDGraphData, GDDGraphOptions);
		plenty_admin.UI.field.gddGraph.datasetId = "gddTotalToToday";
		plenty_admin.UI.field.renderedGraphs.push(plenty_admin.UI.field.gddGraph);
}

plenty_admin.UI.field.renderFinancesGraph = function(){
	var finances = plenty_admin.UI.field.fieldCropActivityFinances;
	
	/* HACK - REMOVE WHEN FINANCES RETURN CORRECTLY */
	if(finances.length === 0){
		finances = [
			{
				amount: 6655.00,
				name: "Late Nitrogen"
			},
			{
				amount: 2758.80,
				name: "Starter Fertilizer"
			},
			{
				amount: 2656.92,
				name: "Planting"
			},
			{
				amount: 2411.54,
				name: "Harvest"
			},
			{
				amount: 2145.00,
				name: "Early Nitrogen"
			},
			{
				amount: 1587.14,
				name: "Tilling"
			},
			{
				amount: 825.00,
				name: "Pest COntrol"
			},
			{
				amount: 544.00,
				name: "Soil Test"
			}
		];
	}
	
	//set the canvas height
	plenty_admin.UI.field.financesGraphEl.height(plenty_admin.UI.field.financesGraphEl.parent().height());
	
	//holder for graph data set
	var financesData = [];
	
	//colour palette for graph segments
	plenty_admin.UI.brand_palette.setNumberRange(0, finances.length);
	
	for(var f=0; f<finances.length; f++){
		var finance = finances[f];
		finance.colour = "#"+plenty_admin.UI.brand_palette.colourAt(f);
		console.log("finance.colour", finance.colour);
		
		var segment = {
			value:		finance.amount,
			color:		finance.colour,
			highlight:	plenty_admin.HELPER.colorLuminance(finance.colour, .4),
			label: 		finance.name
		};
		
		financesData.push(segment);
	}
	
	var financeChartOptions = {
		legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li data-segmentid=\"<%=i%>\" data-hovercolour=\"<%=segments[i].fillColor%>\"><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>",
		animateRotate: true
	};
	
	var helpers = Chart.helpers;
	
	plenty_admin.UI.field.financesGraph = new Chart(plenty_admin.UI.field.financesGraphEl.get(0).getContext("2d")).Doughnut(financesData,financeChartOptions);
	
	console.log("render finances graph: ", plenty_admin.UI.field.financesGraph, financesData);
	
	//add a legend for this graph
	var $legendHTML = $(plenty_admin.UI.field.financesGraph.generateLegend());
	
	var legendHolder = 
	plenty_admin.UI.field.financesGraphEl
	.parent()
	.parent()
	.find(".legend");
	
	legendHolder
	.html("")
	.append($legendHTML);
	
	// Include a html legend template after the module doughnut itself
	helpers.each(legendHolder.get(0).firstChild.childNodes, function (legendNode, index) {
		helpers.addEvent(legendNode, 'mouseover', function () {
			var activeSegment = plenty_admin.UI.field.financesGraph.segments[index];
			activeSegment.save();
			activeSegment.fillColor = activeSegment.highlightColor;
			activeSegment.innerRadius = 60;
			plenty_admin.UI.field.financesGraph.showTooltip([activeSegment]);
			activeSegment.restore();
			
			$(this)
			.css({"background-color": $(this).data("hovercolour")})
			.addClass("active")
			.find("span")
			.css({"background-color": activeSegment.highlightColor})
		});
	});
	
	helpers.addEvent(legendHolder.get(0).firstChild, 'mouseout', function () {
		plenty_admin.UI.field.financesGraph.draw();
		$(legendHolder)
		.find("li")
		.css({"background-color": "transparent"})
		.removeClass("active")
		.find("span")
		.each(function(){
			$(this)
			.css({"background-color": $(this).closest("li").data("hovercolour")});
		});
		
	});
	
	plenty_admin.UI.field.renderedGraphs.push(plenty_admin.UI.field.financesGraph);
	
}

