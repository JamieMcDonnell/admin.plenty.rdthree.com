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
Chart.defaults.global.maintainAspectRatio = false;
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

//method to initiate the field page
plenty_admin.UI.field.init = function(fieldObj, context, polyPath){
	console.log("plenty_admin.UI.field.init", fieldObj, polyPath);
	
	plenty_admin.UI.field.clear();
	
	switch(context){
		case "settings":
			plenty_admin.HELPER.showLoadingOverlay();
  
			  plenty_admin.UI.field.DOM.attrchange({
				trackValues: true, /* Default to false, if set to true the event object is 
							updated with old and new value.*/
				callback: function (event) { 
					//event               - event object
					//event.attributeName - Name of the attribute modified
					//event.oldValue      - Previous value of the modified attribute
					//event.newValue      - New value of the modified attribute
					//Triggered when the selected elements attribute is added/updated/removed
					//ceck for display none and remove position attributes
					//console.log("attr changed: ", event.attributeName, " --- ", event.newValue, parseFloat(event.newValue.slice(9)));
					if(
						event.newValue.indexOf("opacity") > -1 
					){
						var opacity = Math.round(parseFloat(event.newValue.slice(9)));
						if(opacity > .999 && !plenty_admin.UI.field.hasLayout){
							//field layout has been shown
							plenty_admin.UI.field.fitFieldLayout("fit");
							console.log("attr changed: ", event.attributeName, event.newValue);
						}
					}else if(event.newValue.indexOf("display") > -1 && event.newValue.indexOf("none") > -1){
						//field has been hidden, clear settings on body
						console.log("attr changed: ", event.attributeName, event.newValue);
						plenty_admin.UI.field.fitFieldLayout("clear");
					}
				}        
			});

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
				
				plenty_admin.UI.currentScreen.fadeIn("normal");
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
				}, false, polyPath);
				
				plenty_admin.UI.currentScreen
				.addClass("fill-area-content flexbox-item-grow")
				plenty_admin.UI.currentScreen.fadeIn("normal");
			})
			.parent()
			.find(".filter_controls")
			.fadeOut("fast");
		break;
	}
}

plenty_admin.UI.field.hasLayout = false;
plenty_admin.UI.field.fitFieldLayout = function(state){
	switch (state){
		case "fit":
			$("body")
			.height($(window).height())
			.css({"overflow":"hidden"});
			
			plenty_admin.UI.field.DOM
			.height($(window).height() - ($(".navbar").height() + $("footer.footer").height()));
			plenty_admin.UI.field.hasLayout = true;
		break;
		
		case "clear":
			$("body")
			.removeAttr("style");
			
			plenty_admin.UI.field.DOM
			.prop("style", "");
			plenty_admin.UI.field.hasLayout = false;
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
	plenty_admin.REST.getActivityFinancesForDateRange = plenty_admin.api.one("activities/getActivityFinancesForDateRange", /*fieldCropId*/1+"/"+fromDate+"/"+toDate);
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

plenty_admin.UI.field.clear = function(){
	//destroy all graphs
	for(var g=0; g<plenty_admin.UI.field.renderedGraphs.length; g++){
		var graph = plenty_admin.UI.field.renderedGraphs[g];
		graph.destroy();
	}
	
	//clear weatherEvents
	if(plenty_admin.UI.field.weatherEventsContainer){
		plenty_admin.UI.field.weatherEventsContainer
		.find(".event")
		.remove();
	}
	
	//clear activities
	if(plenty_admin.UI.field.activityTimelineContainer){
		plenty_admin.UI.field.activityTimelineContainer
		.find(".activity")
		.remove();
	}
	
	//clear activities
	if(plenty_admin.UI.field.activityListContainer){
		plenty_admin.UI.field.activityListContainer
		.find(".activity")
		.remove();
	}
	
	//clear crop surveys
	if(plenty_admin.UI.field.cropSurveysContainer){
		plenty_admin.UI.field.cropSurveysContainer
		.find(".cropSurvey")
		.remove();
	}
	
	//destroy the year slider
	if(plenty_admin.UI.field.field_year_slider){
		plenty_admin.UI.field.field_year_slider
		.slider("destroy");
	}
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
		
		plenty_admin.UI.field.field_year_slider = plenty_admin.UI.field.DOM.find(".field_year_slider");
		
		plenty_admin.UI.field.field_year_slider
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
		.off("slide")
		.on("slide", function(){
			//console.log("SLIDER SLIDE");
		})
		.off("slideStart")
		.on("slideStart", function(e){
			console.log("SLIDER SLIDESTART: ", $(this), e, e.target);
		})
		.off("slideStop")
		.on("slideStop", function(){
			console.log("SLIDER SLIDESTOP");
		})
		.off("change")
		.on("change", function(e){
			console.log("SLIDER CHANGE", e.value.newValue);
			//get initial activities for this crop Id
			var cropYear = fieldCropsByYear[e.value.newValue];
			var cropName = plenty_admin.DATA.cropTypes[cropYear.cropTypeId].name;
			
			//console.log("cropYear:", cropYear);
			//console.log("cropName:", cropName);
			
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
				if(plenty_admin.UI.field.financesGraph){
					plenty_admin.UI.field.financesGraph.destroy();
				}
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
		
		plenty_admin.UI.field.update_field_year(fieldCropsByYear[parseInt(plenty_admin.UI.field.field_year_slider.slider('getValue'))]);
		
		plenty_admin.UI.field.DOM
		.find(".current_year_crop")
		.text(plenty_admin.UI.field.field_year_slider.slider('getValue')+" - "+plenty_admin.DATA.cropTypes[fieldCropsByYear[parseInt(plenty_admin.UI.field.field_year_slider.slider('getValue'))].cropTypeId].name);
	});
}

plenty_admin.UI.field.updateWeatherGraph = function(hash){
	var graph = "";
	switch(hash){
		case "#temp":
			//create the temp graph object if it does not yet exist
			if(!plenty_admin.UI.field.tempGraph){
				plenty_admin.UI.field.currentGraph = plenty_admin.UI.field.renderTempGraph();
			}else{
				plenty_admin.UI.field.currentGraph = plenty_admin.UI.field.tempGraph;
			}
			graph = "tempGraph";
		break;
		
		case "#moisture":
			//create the moisture graph object if it does not yet exist
			if(!plenty_admin.UI.field.moistureGraph){
				plenty_admin.UI.field.currentGraph = plenty_admin.UI.field.renderMoistureGraph();
			}else{
				plenty_admin.UI.field.currentGraph = plenty_admin.UI.field.moistureGraph;
			}
			graph = "moistureGraph";
		break;
		
		case "#precip":
			//create the moisture graph object if it does not yet exist
			if(!plenty_admin.UI.field.precipGraph){
				plenty_admin.UI.field.currentGraph = plenty_admin.UI.field.renderPrecipGraph();
			}else{
				plenty_admin.UI.field.currentGraph = plenty_admin.UI.field.precipGraph;
			}
			graph = "precipGraph";
		break;
		
		case "#gdd":
			//create the moisture graph object if it does not yet exist
			if(!plenty_admin.UI.field.gddGraph){
				plenty_admin.UI.field.currentGraph = plenty_admin.UI.field.renderGDDGraph();
			}else{
				plenty_admin.UI.field.currentGraph = plenty_admin.UI.field.gddGraph;
			}
			graph = "gddGraph";
		break;
	}
	
	//set width of dom element that offsets the weather events and activities
	var keyOffsetElement = plenty_admin.UI.field.DOM.find(".keyOffset");
	keyOffsetElement.width(plenty_admin.UI.field.currentGraph.datasets[0].points[0].x);
	
	plenty_admin.UI.field.renderWeatherEvents(plenty_admin.UI.field.weatherDays.weatherEvents.precip, "precip");
	plenty_admin.UI.field.renderWeatherEvents(plenty_admin.UI.field.weatherDays.weatherEvents.temp, "temp");
	plenty_admin.UI.field.renderWeatherEvents(plenty_admin.UI.field.weatherDays.weatherEvents.wind, "wind");

	plenty_admin.UI.field.renderCropSurveys(plenty_admin.UI.field.weatherDays.cropSurvey);
	
	plenty_admin.UI.field.scaleScale(plenty_admin.UI.field[graph+"El"]);
	
	plenty_admin.UI.field.renderActivities(plenty_admin.UI.field.activitiesForCropType, true);
}

plenty_admin.UI.field.update_field_year = function (cropYear){
	console.log("update_field_year", cropYear);
	plenty_admin.HELPER.showLoadingOverlay();
	plenty_admin.REST.get_field_equipments_with_fieldId(cropYear.id, function(fieldEquipment){
		console.log("get_field_equipments_with_fieldId", fieldEquipment);
	});
	
	//pull in activities once weatherDays have loaded	
	plenty_admin.REST.get_activities_by_field_crop_order_by_desc(cropYear.cropTypeId, function(activitiesForCropType){
		console.log("get_activities_by_field_crop_order_by_desc", activitiesForCropType);
		
		plenty_admin.UI.field.activitiesForCropType = activitiesForCropType;
		
		var startDate = plenty_admin.HELPER.formateJavaDate(activitiesForCropType[0].startTime);
		plenty_admin.UI.field.dates.start = (startDate.obj.getFullYear())+"-"+(startDate.obj.getMonth()+1)+"-"+(startDate.obj.getDate() < 10 ? "0"+startDate.obj.getDate() : startDate.obj.getDate())+" "+(startDate.obj.getHours()+1)+":"+startDate.obj.getMinutes();
		
		var endDate = plenty_admin.HELPER.formateJavaDate(activitiesForCropType[activitiesForCropType.length -1].endTime);
		plenty_admin.UI.field.dates.end = (endDate.obj.getFullYear())+"-"+(endDate.obj.getMonth()+1)+"-"+(endDate.obj.getDate() < 10 ? "0"+endDate.obj.getDate() : endDate.obj.getDate())+" "+(endDate.obj.getHours()+1)+":"+endDate.obj.getMinutes();
		
		//prepare all data type lists and wait till they've loaded
		plenty_admin.DATA.eventCollector = window.eventcollector(2, 10000);
		plenty_admin.REST.getActivityTypes();
		
		plenty_admin.REST.get_weather_days_with_dateRange(cropYear.fieldId, plenty_admin.UI.field.dates.start, plenty_admin.UI.field.dates.end, function(weatherDays){
			console.log("get_weather_days_with_dateRange", weatherDays);
			
			plenty_admin.UI.field.weatherDays = {
					dates: [],
					months: [],
					labels: [],
					
					weatherEvents: {
						precip: [],
						temp: [],
						wind: []
					}
			}
			
			var label_inc = 0;
			var label_step = 3;
			
			for(var wO = 0; wO < weatherDays.length; wO++){
				weatherOb = weatherDays[wO];
				var obTime = plenty_admin.HELPER.formateJavaDate(weatherOb.date);
				
				//create labelling sets for graphs
				plenty_admin.UI.field.weatherDays.dates.push(obTime.date);
				
				if(plenty_admin.UI.field.weatherDays.months.indexOf(obTime.month) == -1){
					plenty_admin.UI.field.weatherDays.months.push(obTime.month);
				}else{
					plenty_admin.UI.field.weatherDays.dates.push("");
				}
				
				
				// !!! HACK to skip every other X axis label
				// Provides bad labels on chart
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
						//console.log("prop:", prop);
						if(prop === "weatherEvents"){
							if(!plenty_admin.UI.field.weatherDays[prop]){
								plenty_admin.UI.field.weatherDays[prop] = [];
							}
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
						}else if(prop === "moisture"){
							if(!plenty_admin.UI.field.weatherDays[prop]){
								plenty_admin.UI.field.weatherDays[prop] = {};
							}
							console.log("how many depths? :", prop, weatherOb[prop].length);
							for(var w=0; w<weatherOb[prop].length; w++){
								var moistureDepth = weatherOb[prop][w];
								//console.log("moisture depth: ", w, moistureDepth);
								if(!plenty_admin.UI.field.weatherDays.moisture[moistureDepth.depth]){
									plenty_admin.UI.field.weatherDays.moisture[moistureDepth.depth] = [];
								}
								
								plenty_admin.UI.field.weatherDays.moisture[moistureDepth.depth].push(moistureDepth.moisture /* !!! HACK !!!*/ + (Math.random() * (10 - 100) + 10));
							}
						}else{
							if(!plenty_admin.UI.field.weatherDays[prop]){
								plenty_admin.UI.field.weatherDays[prop] = [];
							}
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
			var graph = "";
			switch(hash){
				case "#temp":
					plenty_admin.UI.field.currentGraph = plenty_admin.UI.field.renderTempGraph();
					graph = "tempGraph";
				break;
				
				case "#moisture":
					plenty_admin.UI.field.currentGraph = plenty_admin.UI.field.renderMoistureGraph();
					graph = "moistureGraph";
				break;
				
				case "#precip":
					plenty_admin.UI.field.currentGraph = plenty_admin.UI.field.renderPrecipGraph();
					graph = "precipGraph";
				break;
				
				case "#gdd":
					plenty_admin.UI.field.currentGraph = plenty_admin.UI.field.renderGDDGraph();
					graph = "gddGraph";
				break;
			}
			
			//set width of dom element that offsets the weather events and activities
			var keyOffsetElement = plenty_admin.UI.field.DOM.find(".keyOffset");
			keyOffsetElement.width(plenty_admin.UI.field.currentGraph.datasets[0].points[0].x);
			
			plenty_admin.UI.field.scaleScale(plenty_admin.UI.field[graph+"El"]);
			
			plenty_admin.UI.field.renderWeatherEvents(plenty_admin.UI.field.weatherDays.weatherEvents.precip, "precip");
			plenty_admin.UI.field.renderWeatherEvents(plenty_admin.UI.field.weatherDays.weatherEvents.temp, "temp");
			plenty_admin.UI.field.renderWeatherEvents(plenty_admin.UI.field.weatherDays.weatherEvents.wind, "wind");
			
			plenty_admin.UI.field.renderCropSurveys(plenty_admin.UI.field.weatherDays.cropSurvey);
			
			//ensure if the window changes size the weather events are refitted
			$(window).on("resize",function(){
				plenty_admin.UI.field.renderWeatherEvents(plenty_admin.UI.field.weatherDays.weatherEvents.precip, "precip");
				plenty_admin.UI.field.renderWeatherEvents(plenty_admin.UI.field.weatherDays.weatherEvents.temp, "temp");
				plenty_admin.UI.field.renderWeatherEvents(plenty_admin.UI.field.weatherDays.weatherEvents.wind, "wind");
				
				plenty_admin.UI.field.renderCropSurveys(plenty_admin.UI.field.weatherDays.cropSurvey);
				
				plenty_admin.UI.field.scaleScale(plenty_admin.UI.field[graph+"El"]);
			});
			
			plenty_admin.DATA.eventCollector.done("event 1");
		});
		
		plenty_admin.DATA.eventCollector.on('alldone', function(total) {
			plenty_admin.UI.field.renderActivities(activitiesForCropType);
			
			//ensure if the window changes size the activities are refitted
			$(window).on("resize",function(){
				plenty_admin.UI.field.renderActivities(activitiesForCropType);
			});
			
			plenty_admin.HELPER.hideLoadingOverlay();
		});	
		
		plenty_admin.REST.get_activity_finances_for_date_range(cropYear.id, plenty_admin.UI.field.dates.start, plenty_admin.UI.field.dates.end, function(fieldCropActivityFinances){
			console.log("get_activity_finances_for_date_range", fieldCropActivityFinances);
			plenty_admin.UI.field.fieldCropActivityFinances = fieldCropActivityFinances;
			
			plenty_admin.UI.field.renderFinancesGraph();
		});
	});
}

plenty_admin.UI.field.renderWeatherEvents = function(events, hash){
	plenty_admin.UI.field.weatherEventsContainer = plenty_admin.UI.field.DOM.find(".tab-content .weatherEvents."+hash);
	
	//remove any existing events
	plenty_admin.UI.field.weatherEventsContainer
	.find(".event")
	.remove();
	
	for(var e=0; e<events.length; e++){
		var wE = events[e];
		var leftPos = ((parseInt(plenty_admin.UI.field.weatherEventsContainer.width()) / plenty_admin.UI.field.weatherDays.length)*wE.dayIndex)-8;
		
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
		.tooltip({container:"body"});
		
		plenty_admin.UI.field.weatherEventsContainer.append(weatherEventHTML);
	}
}

plenty_admin.UI.field.renderCropSurveys = function(cropSurveys){
	plenty_admin.UI.field.cropSurveysContainer = plenty_admin.UI.field.DOM.find(".tab-content .cropSurveys");
	var _cropSurveys = [];
	
	for (var i = 0; i < cropSurveys.length; i++) {
		if (cropSurveys[i]) {         
		  _cropSurveys.push(cropSurveys[i]);
		}
	  }
	console.log("_cropSurveys", _cropSurveys);
	//remove any existing events
	plenty_admin.UI.field.cropSurveysContainer
	.find(".cropSurvey")
	.remove();
	
	for(var e=0; e<_cropSurveys.length; e++){
		var cS = _cropSurveys[e];
		var leftPos = ((parseInt(plenty_admin.UI.field.cropSurveysContainer.width()) / plenty_admin.UI.field.weatherDays.length)*cS.count)-17;
		
		if(leftPos < 0){
			leftPos = 0;
		}
		
		var uom = "UOMId-"+cS.countUOMId;
		
		var tooltip = [
						"cropHeight: "+cS.cropHeight+"<br>",
						"cropTypeId: "+cS.cropTypeId+"<br>",
						"growthMethodId: "+cS.growthMethodId+"<br>",
						"growthStageId: "+cS.growthStageId,
					].join("");
		
		var cropSurveyHTML = $("<div class='cropSurvey alert alert-warning' data-toggle='tooltip' data-placement='top' title='"+tooltip+"' style='left:"+leftPos+"px'><i class='fa fa-file-text-o'></i></div>");
		
		cropSurveyHTML
		.tooltip({
					container:"body",
					html:true
				});
		
		plenty_admin.UI.field.cropSurveysContainer.append(cropSurveyHTML);
	}
}

plenty_admin.UI.field.getActivityIconClass = function(activityTypeId){
	console.log("getActivityIconClass", activityTypeId);
	var iconClass = null;
	switch(activityTypeId){
			case 1:
			case "SoilTest":
				iconClass = "pif pif-soil-test";
			break;
			
			case 2:
			case "StarterFertilizer":
			case "LateFertilizer":
				iconClass = "pif pif-fertilizer";
			break;
			
			case 3:
			case "Tilling":
				iconClass = "pif pif-tilling";
			break;
			
			case 5:
			case "EarlyNitrogen":
				iconClass = "pif pif-early-nitrogen";
			break;
			
			case 6:
			case "LateNitrogen":
				iconClass = "pif pif-late-nitrogen";
			break;
			
			case 7:
			case "PestControl":
				iconClass = "pif pif-pest-control";
			break;
			
			case 8:
			case "Harvest":
				iconClass = "pif pif-harvest";
			break;
		}
		
		return iconClass;
}

plenty_admin.UI.field.renderActivities = function(activities, timelineOnly){
	plenty_admin.UI.field.activityTimelineContainer = plenty_admin.UI.field.DOM.find(".activitiesTimeline .activities");
	plenty_admin.UI.field.activityListContainer = plenty_admin.UI.field.DOM.find(".field_asset_data .tab-content #activities tbody");
	
	//clear activity timeline
	plenty_admin.UI.field.activityTimelineContainer
	.find(".activity")
	.remove();
	
	for(var a=0; a<activities.length; a++){
		var activity = activities[a];
		
		activity.iconClass = plenty_admin.UI.field.getActivityIconClass(activity.activityTypeId);
		
		
		activity.startDate = plenty_admin.HELPER.formateJavaDate(activity.startTime);
		activity.endDate = plenty_admin.HELPER.formateJavaDate(activity.endTime);
		activity.duration = Math.round(plenty_admin.HELPER.daydiff(activity.startTime, activity.endTime));
		activity.startOffsetDays = Math.round(plenty_admin.HELPER.daydiff(plenty_admin.UI.field.dates.start, activity.startTime));
		
		console.log("activity", activity);
		
		var dayWidth = parseInt(plenty_admin.UI.field.activityTimelineContainer.width()) / plenty_admin.UI.field.weatherDays.length;
		var leftPos = dayWidth*activity.startOffsetDays;
		var eventWidth = dayWidth*activity.duration;
		
		if(eventWidth < 15){
			eventWidth = 15;
		}
		
		if(leftPos < 0){
			leftPos = 0;
		}
		
		if(leftPos + eventWidth > plenty_admin.UI.field.activityTimelineContainer.width()){
			leftPos = plenty_admin.UI.field.activityTimelineContainer.width() - eventWidth;
		}
		
		var activityHTML = $("<div class='activity' data-toggle='tooltip' data-placement='top' title='"+plenty_admin.UI.field.getActivityTooltipTitle(activity)+"' style='left:"+leftPos+"px; width:"+eventWidth+"px'><i class='"+plenty_admin.DATA.activityTypes[activity.activityTypeId].name.toLowerCase().replace(/ /g, "")+" "+activity.iconClass+"'></i></div>");
		
		activityHTML
		.tooltip({
			html:true,
			container:"body"
		});
		
		plenty_admin.UI.field.activityTimelineContainer.append(activityHTML);
		
		if(!timelineOnly){
			//build the activity list item
			var activityItem = [
					"<tr class='activity'>",
						"<td>",
							"<i class='"+activity.iconClass+"'></i>",
						"</td>",
						"<td>",
							activity.state,
						"</td>",
						"<td>",
							plenty_admin.DATA.activityTypes[activity.activityTypeId].name,
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
			
			plenty_admin.UI.field.activityListContainer.append(activityItem);
		}
	}
}

plenty_admin.UI.field.renderEquipment = function(equipment){
	var equipmentListContainer = plenty_admin.UI.field.DOM.find(".field_asset_data .tab-content #equipment tbody");
	
	console.log("equipmentListContainer", equipmentListContainer);
	for(var a=0; a<equipment.length; a++){
		var equipmentItem = equipment[a].equipmentDto;
		
		//set the icons for different equipment types
		switch(equipmentItem.equipmentTypeId){
			case 1:
				equipmentItem.iconClass = "pif pif-atv";
			break;
			
			case 2:
				equipmentItem.iconClass = "pif pif-tractor";
			break;
			
			case 3:
				equipmentItem.iconClass = "pif pif-spreader";
			break;
			
			case 4:
				equipmentItem.iconClass = "pif pif-offset-disk";
			break;
			
			case 5:
				equipmentItem.iconClass = "pif pif-planter";
			break;
			
			case 6:
				equipmentItem.iconClass = "pif pif-sprayer";
			break;
			
			case 7:
				equipmentItem.iconClass = "pif pif-combine";
			break;
			
			case 8:
				equipmentItem.iconClass = "pif pif-grain-cart";
			break;
			
			case 9:
				equipmentItem.iconClass = "pif pif-grain-truck";
			break;
			
			case 10:
				equipmentItem.iconClass = "pif pif-pipe";
			break;
			
			case 11:
				equipmentItem.iconClass = "pif pif-well";
			break;
		}
		
		console.log("equipmentItem", equipmentItem);
		
		//build the activity list item
		var equipmentItemHTML = [
				"<tr>",
					"<td>",
						"<i class='"+equipmentItem.iconClass+"'></i>",
					"</td>",
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
	var title = //'<i class=\''+activity.iconClass+'\' style=\'width:40px; height:40px; margin:0 auto;\'/>'+
				//"<br/>"+
				plenty_admin.DATA.activityTypes[activity.activityTypeId].name+
				"<br/>"+
				activity.startDate.date+
				"<br/>"+
				"$"+
				activity.cost;
	console.log("activity tooltip title:", title);
	return title;
}

plenty_admin.UI.field.renderTempGraph = function(){
	var tempGraphData = {
			labels: plenty_admin.UI.field.weatherDays.labels,
			datasets: [
				{
					label: "Min",
					fillColor: "rgba(142,220,244,0.2)",
					strokeColor: "rgba(142,220,244,1)",
					pointColor: "rgba(108,202,224,1)",
					pointStrokeColor: "#fff",
					pointHighlightFill: "#fff",
					pointHighlightStroke: "rgba(142,220,244,1)",
					data: plenty_admin.UI.field.weatherDays.minTemp
				},
				{
					label: "Max",
					fillColor: "rgba(249,216,110,0.2)",
					strokeColor: "rgba(249,216,110,1)",
					pointColor: "rgba(239,193,63,1)",
					pointStrokeColor: "#fff",
					pointHighlightFill: "#fff",
					pointHighlightStroke: "rgba(249,216,110,1)",
					data: plenty_admin.UI.field.weatherDays.maxTemp
				}
			]
		};
		
		
		var tempGraphOptions = {
		
		};
		
		/*
		var tempGraphOptions = {
			hoverMode: 'single',
			scales: {
				xAxes: [{
					scaleType: "linear", // scatter should not use a dataset axis
					display: true,
					position: "bottom",
					id: "x-axis-temp", // need an ID so datasets can reference the scale
	
					// label settings
					labels: {
						show: true,
						template: "<%=value%>",
						fontSize: 12,
						fontStyle: "normal",
						fontColor: "#666",
						fontFamily: "ff-enzo-web,Helvetica,Arial,sans-serif",
						 
						userCallback: function(tickValue, tickIndex, ticksArray) {
							console.log("tickValue", tickValue); // tickValue {number} : the numerical value that a label is needed for
							console.log("tickIndex", tickIndex); // tickIndex {number} : the index of the tick in the internal ticks array
							console.log("ticksArray", ticksArray); // ticksArray {array} : the array of all ticks in the scale
							
							return tickValue.toString();
						}
					},
				}]
			}
		};*/
		
		var helpers = Chart.helpers;
	
		plenty_admin.UI.field.tempGraph = new Chart(plenty_admin.UI.field.tempGraphEl.get(0).getContext("2d")).Line(tempGraphData, tempGraphOptions);
		plenty_admin.UI.field.tempGraph.datasetId = "temp"; 
		plenty_admin.UI.field.renderedGraphs.push(plenty_admin.UI.field.tempGraph);
		
		return plenty_admin.UI.field.tempGraph;
}
plenty_admin.UI.field.scaleScale = function(graphEl){
	console.log("graphEl", graphEl);
	var scaleWidth = graphEl.width();
	var scaleHeight = graphEl.height();
		
	graphEl
	.parent()
	.find("svg.scale")
	.prop("viewBox", "0 0 "+scaleWidth+" "+plenty_admin.UI.field.currentGraph.scale.endPoint)
	.width(scaleWidth - plenty_admin.UI.field.currentGraph.datasets[0].points[0].x)
	.height(plenty_admin.UI.field.currentGraph.scale.endPoint)
	.css({"left": plenty_admin.UI.field.currentGraph.datasets[0].points[0].x})
	.fadeIn("fast");
}

plenty_admin.UI.field.renderMoistureGraph = function(){
	//create dynamic moisture datasets
	var datasets = [];
	var index = 0;
	plenty_admin.UI.brand_palette.setNumberRange(0, Object.keys(plenty_admin.UI.field.weatherDays.moisture).length);
	
	//for(var m=0; m<plenty_admin.UI.field.weatherDays.moisture.length; m++){
	for(depth in plenty_admin.UI.field.weatherDays.moisture){
		if(plenty_admin.UI.field.weatherDays.moisture.hasOwnProperty(depth)){
			console.log("colour: ", index, "#"+plenty_admin.UI.brand_palette.colourAt(index), plenty_admin.HELPER.hexToRgb("#"+plenty_admin.UI.brand_palette.colourAt(index)));
			var moistureDepth = plenty_admin.UI.field.weatherDays.moisture[depth];
			var colour = plenty_admin.HELPER.hexToRgb("#"+plenty_admin.UI.brand_palette.colourAt(index));
			var dataset = {
				label: moistureDepth.depth,
				fillColor: "rgba("+colour.r+","+colour.g+","+colour.b+",0.2)", //define
				strokeColor: "rgba("+colour.r+","+colour.g+","+colour.b+",1)", //define
				pointColor: "rgba("+colour.r+","+colour.g+","+colour.b+",1)", //define
				pointStrokeColor: "#fff",
				pointHighlightFill: "#fff",
				pointHighlightStroke: "rgba("+plenty_admin.HELPER.hexToRgb("#"+plenty_admin.UI.brand_palette.colourAt(index))+",1)",
				data: moistureDepth
			};
			datasets.push(dataset);
			index +=1;
		}
	}
	
	console.log("moisture datasets: ", datasets);
	
	var moistureGraphData = {
			labels: plenty_admin.UI.field.weatherDays.labels,
			datasets: datasets
		};
		
		var moistureGraphOptions = {
			
		};
		
		plenty_admin.UI.field.moistureGraph = new Chart(plenty_admin.UI.field.moistureGraphEl.get(0).getContext("2d")).Line(moistureGraphData, moistureGraphOptions);
		plenty_admin.UI.field.moistureGraph.datasetId = "moisture";
		plenty_admin.UI.field.renderedGraphs.push(plenty_admin.UI.field.moistureGraph);
		
		return plenty_admin.UI.field.moistureGraph;
}

plenty_admin.UI.field.renderPrecipGraph = function(){
	var precipGraphData = {
			labels: plenty_admin.UI.field.weatherDays.labels,
			datasets: [
				{
					label: "Precipitation",
					fillColor: "rgba(136,242,201,0.2)",
					strokeColor: "rgba(136,242,201,1)",
					pointColor: "rgba(97,226,174,1)",
					pointStrokeColor: "#fff",
					pointHighlightFill: "#fff",
					pointHighlightStroke: "rgba(136,242,201,1)",
					data: plenty_admin.UI.field.weatherDays.percipTotalToToday
				}
			]
		};
		
		var precipGraphOptions = {
			
		};
		
		plenty_admin.UI.field.precipGraph = new Chart(plenty_admin.UI.field.precipGraphEl.get(0).getContext("2d")).Line(precipGraphData, precipGraphOptions);
		plenty_admin.UI.field.precipGraph.datasetId = "precipAmt";
		plenty_admin.UI.field.renderedGraphs.push(plenty_admin.UI.field.precipGraph);
		
		return plenty_admin.UI.field.precipGraph;
}

plenty_admin.UI.field.renderGDDGraph = function(){
	var GDDGraphData = {
			labels: plenty_admin.UI.field.weatherDays.labels,
			datasets: [
				{
					label: "GDD",
					fillColor: "rgba(185,244,146,0.2)",
					strokeColor: "rgba(185,244,146,1)",
					pointColor: "rgba(150,234,96,1)",
					pointStrokeColor: "#fff",
					pointHighlightFill: "#fff",
					pointHighlightStroke: "rgba(185,244,146,1)",
					data: plenty_admin.UI.field.weatherDays.gddTotalToToday
				}
			]
		};
		
		var GDDGraphOptions = {
			
		};
		
		plenty_admin.UI.field.gddGraph = new Chart(plenty_admin.UI.field.gddGraphEl.get(0).getContext("2d")).Line(GDDGraphData, GDDGraphOptions);
		plenty_admin.UI.field.gddGraph.datasetId = "gddTotalToToday";
		plenty_admin.UI.field.renderedGraphs.push(plenty_admin.UI.field.gddGraph);
		
		return plenty_admin.UI.field.gddGraph;
}

plenty_admin.UI.field.renderFinancesGraph = function(){
	var finances = plenty_admin.UI.field.fieldCropActivityFinances;
	
	//holder for graph data set
	var financesData = [];
	
	//colour palette for graph segments
	plenty_admin.UI.brand_palette.setNumberRange(0, finances.length);
	
	for(index in finances){
		if(finances.hasOwnProperty(index)){
			var finance = finances[index];
			console.log("finance", finance);
			finance.colour = "#"+plenty_admin.UI.brand_palette.colourAt(index);

			var segment = {
				value:		finance.cost,
				color:		finance.colour,
				highlight:	plenty_admin.HELPER.colorLuminance(finance.colour, .4),
				label: 		finance.activityTypeName,
			};
			
			financesData.push(segment);
		}
	}
	
	var financeChartOptions = {
		legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend mts\"><% for (var i=0; i<segments.length; i++){%><li data-segmentid=\"<%=i%>\" data-hovercolour=\"<%=segments[i].fillColor%>\" data-name=\"<%=segments[i].label.replace(/ /g, \"\").toLowerCase()%>\"><span class=\"swatch\" style=\"background-color:<%=segments[i].fillColor%>\"><i class=\"<%=plenty_admin.UI.field.getActivityIconClass(segments[i].label.replace(/ /g, \"\"))%>\"></i></span><%if(segments[i].label){%><%=segments[i].label%><%}%> <span class=\"pct\"></span><span class=\"pull-right\"><%= numeral(segments[i].value).format('($00[.]00)') %></span></li><%}%></ul>",
		tooltipTemplate: "<%=label%>: <%= numeral(value).format('($00[.]00)') %> | <%= numeral(circumference / 6.283).format('(0[.][00]%)') %>",
		animateRotate: true
	};
	
	var helpers = Chart.helpers;
	
	console.log("helpers", helpers);
	
	plenty_admin.UI.field.financesGraph = new Chart(plenty_admin.UI.field.financesGraphEl.get(0).getContext("2d")).Doughnut(financesData,financeChartOptions);
	
	console.log("render finances graph: ", plenty_admin.UI.field.financesGraph, financesData);
	
	//add a legend for this graph
	var $legendHTML = $(plenty_admin.UI.field.financesGraph.generateLegend());
	
	var legendHolder = 
	plenty_admin.UI.field.financesGraphEl
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
			var activeSegment = plenty_admin.UI.field.financesGraph.segments[index];
			
			var pct = numeral(activeSegment.circumference / 6.283).format('(0[.][00]%)');
			
			activeSegment.save();
			activeSegment.fillColor = activeSegment.highlightColor;
			activeSegment.innerRadius = 60;
			plenty_admin.UI.field.financesGraph.showTooltip([activeSegment]);
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
		plenty_admin.UI.field.financesGraph.draw();
		resetLegentStyle(legendHolder);
	});
	
	//highlight key element when hovering segment
	plenty_admin.UI.field.financesGraphEl.on("mousemove", function(evt){
		var activePoints = plenty_admin.UI.field.financesGraph.getSegmentsAtEvent(evt);
		if(activePoints.length > 0){
			//console.log("activePoints", activePoints, activePoints[0].label.replace(/ /g, "").toLowerCase());
			legendHolder
			.find("li")
			.removeClass("active");
			
			var labelId = activePoints[0].label.replace(/ /g, "").toLowerCase();
			var legendItem = legendHolder.find("li[data-name='"+labelId+"']");
			var pct = numeral(activePoints[0].circumference / 6.283).format('(0[.][00]%)');
			
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
	plenty_admin.UI.field.financesGraphEl.on("mouseout", function(evt){
		resetLegentStyle(legendHolder);
	});
	
	plenty_admin.UI.field.renderedGraphs.push(plenty_admin.UI.field.financesGraph);
	
}

