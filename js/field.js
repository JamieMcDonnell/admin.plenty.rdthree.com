//*********************** field.js **************************//
//create namespace for field layout
plenty_admin.UI.field = {
	DOM: $("#field-container"),
	weatherTabs:		{},
	assetTabs:	{},
	
	renderedGraphs: [],
	
	/* Set the start / End date ranges temporaraly until we get some real activity dates */
	dates: {
		start:	null,
		end:		null
	},
	
	hasLayout: false,
	
	init: function(fieldObj, context){
		console.log("plenty_admin.UI.field.init", fieldObj);
		plenty_admin.UI.field.fieldObj = fieldObj;
		//fieldObj.boundaries = polyPath;
		switch(context){
			case "settings":
				plenty_admin.HELPER.showLoadingOverlay("Loading", "Field");
	  
				  plenty_admin.UI.field.DOM.attrchange({
					trackValues: true,
					callback: function (event) { 
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
						//ensure if the window changes size the field is centered
						$(window).on("resize",function(){
							plenty_admin.MAPS.zoomToPolygon(polygon, plenty_admin.MAPS.map);
						});
					}, false, "map");
					
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
					
					plenty_admin.UI.currentScreen
					.addClass("fill-area-content flexbox-item-grow")
					plenty_admin.UI.currentScreen.fadeIn("normal", function(){
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
							//ensure if the window changes size the field is centered
							$(window).on("resize", function(){
								plenty_admin.MAPS.zoomToPolygon(polygon, plenty_admin.MAPS.map);
							});
							plenty_admin.MAPS.zoomToPolygon(polygon, plenty_admin.MAPS.map);
							
						}, false, "map");
					});
				})
				.parent()
				.find(".filter_controls")
				.fadeOut("fast");
			break;
		}
	},
	
	clear: function(){
		//destroy all graphs
		for(var g=0; g<plenty_admin.UI.field.renderedGraphs.length; g++){
			var graph = plenty_admin.UI.field.renderedGraphs[g];
			graph.destroy();
		}
		
		plenty_admin.UI.field.renderedGraphs = [];
		plenty_admin.UI.field.tempGraph = null;
		plenty_admin.UI.field.moistureGraph = null;
		plenty_admin.UI.field.precipGraph = null;
		plenty_admin.UI.field.gddGraph = null;
		
		//clear weatherEvents
		plenty_admin.UI.field.DOM
		.find(".weatherEvents")
		.each(function(){
			$(this)
			.find(".event")
			.remove();
		});
		
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
		
		//clear equipment
		if(plenty_admin.UI.field.equipmentListContainer){
			plenty_admin.UI.field.equipmentListContainer
			.find(".equipment")
			.remove();
		}
		
		//clear crop surveys
		if(plenty_admin.UI.field.cropSurveysContainer){
			plenty_admin.UI.field.cropSurveysContainer
			.find(".cropSurvey")
			.remove();
		}
		
		//clear the finance graph legend
		plenty_admin.UI.field.financesGraphEl
		.parent()
		.parent()
		.parent()
		.find(".legend")
		.find(".legendItem")
		.remove();
		
		//clear the finance values
		plenty_admin.UI.field.DOM
		.find(".topLine")
		.find(".profit, .cost, .revenue")
		.text("");
		
		if(plenty_admin.UI.field.financesGraph){
			plenty_admin.UI.field.financesGraph.destroy();
		}
	},
	
	fitFieldLayout: function(state){
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
	},
	
	populate: function(fieldObj){
		plenty_admin.REST.get_fieldCrops_order_by_year_descending(fieldObj.id, function(fieldData){
			console.log("get_field_order_by_year_descending: ", fieldData);
			
			var fieldCropsByYear = {};
			
			for(var f=0; f<fieldData.length; f++){
				fieldCrop = fieldData[f];
				fieldCropsByYear[parseInt(fieldCrop.year)] = fieldCrop;
			}
			
			console.log("fieldCropsByYear", fieldCropsByYear);
			
			plenty_admin.UI.field.field_year_slider = plenty_admin.UI.field.DOM.find(".field_year_slider");
			
			console.log("plenty_admin.UI.field.field_year_slider", plenty_admin.UI.field.field_year_slider.slider, typeof plenty_admin.UI.field.field_year_slider.slider);
			
			plenty_admin.UI.field.field_year_slider
			.slider({
				min: parseInt(fieldData[fieldData.length-1].year),
				max: parseInt(fieldData[0].year),
				value: parseInt(fieldData[0].year),
				//tooltip: "show",
				formatter: function(value){
					return value+" - "+plenty_admin.DATA.cropTypes[fieldCropsByYear[parseInt(value)].cropTypeId].name;
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
				plenty_admin.UI.field.clear();
				
				plenty_admin.UI.field.update_field_year(fieldObj.id, cropYear);
				
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
					plenty_admin.UI.field.renderActivityFinancesGraph();
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
			
			plenty_admin.UI.field.update_field_year(fieldObj.id, fieldCropsByYear[parseInt(plenty_admin.UI.field.field_year_slider.slider('getValue'))]);
			
			plenty_admin.UI.field.DOM
			.find(".current_year_crop")
			.text(plenty_admin.UI.field.field_year_slider.slider('getValue')+" - "+plenty_admin.DATA.cropTypes[fieldCropsByYear[parseInt(plenty_admin.UI.field.field_year_slider.slider('getValue'))].cropTypeId].name);
		});
	},
	
	updateWeatherGraph: function(hash){
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
		
		try{
			keyOffsetElement.width(plenty_admin.UI.field.currentGraph.datasets[0].points[0].x);
			plenty_admin.UI.field.positionToday(plenty_admin.UI.field.activitiesForCropType[0].startTime);
			//plenty_admin.UI.field.buildChartZoomer();
		}catch(err){
			console.error("something failed: ", err);
			bootbox.dialog({
								message: "Not enough activities (minimum of 2) to create weather graphs. Their start and end dates are calculated from the begining of the first, and the end of the last event.", 
								className: "danger",
								buttons: {
									danger: {
									  label: "OK",
									  className: "btn-danger",
									  callback: plenty_admin.HELPER.hideLoadingOverlay,
									}
								}
							});
		}
		
		plenty_admin.UI.field.renderWeatherEvents(plenty_admin.UI.field.weatherDays.weatherEvents.precip, "precip");
		plenty_admin.UI.field.renderWeatherEvents(plenty_admin.UI.field.weatherDays.weatherEvents.temp, "temp");
		plenty_admin.UI.field.renderWeatherEvents(plenty_admin.UI.field.weatherDays.weatherEvents.wind, "wind");
	
		plenty_admin.UI.field.scaleScale(plenty_admin.UI.field[graph+"El"]);
	},
	
	update_field_year: function (fieldId, cropYear){
		console.log("update_field_year", fieldId, cropYear);
		plenty_admin.HELPER.showLoadingOverlay("Loading", "Equipment");
		plenty_admin.REST.get_field_equipments_with_fieldId(fieldId, function(fieldEquipment){
			console.log("get_field_equipments_with_fieldId", fieldEquipment);
			plenty_admin.UI.field.renderEquipment(fieldEquipment);
		});
		
		//pull in activities once weatherDays have loaded	
		plenty_admin.REST.get_activities_by_field_crop_order_by_desc(cropYear.id, function(activitiesForCropType){
			console.log("get_activities_by_field_crop_order_by_desc", activitiesForCropType, activitiesForCropType.length);
			
			plenty_admin.UI.field.activitiesForCropType = activitiesForCropType;
			
			if(activitiesForCropType.length <= 0){
				bootbox.dialog({
								message: "No activities for this field - can not render weather graphs without at least 2 activities.", 
								className: "danger",
								buttons: {
									danger: {
									  label: "OK",
									  className: "btn-danger",
									  callback: plenty_admin.HELPER.hideLoadingOverlay
									}
								}
							});
				return;
			}
			
			var startDate = plenty_admin.HELPER.formatJavaDate(activitiesForCropType[0].startTime);
			plenty_admin.UI.field.dates.start = 	startDate.obj.getUTCFullYear()+
												"-"+
												((startDate.obj.getUTCMonth()+1) < 10 ? "0"+(startDate.obj.getUTCMonth()+1) : (startDate.obj.getUTCMonth()+1))+
												"-"+
												(startDate.obj.getUTCDate() < 10 ? "0"+startDate.obj.getUTCDate() : startDate.obj.getUTCDate())+
												" "+
												((startDate.obj.getUTCHours()) < 10 ? "0"+(startDate.obj.getUTCHours()) : (startDate.obj.getUTCHours()+1))+
												":"+
												(startDate.obj.getUTCMinutes() < 10 ? "0"+startDate.obj.getUTCMinutes() : startDate.obj.getUTCMinutes());
			
			
			var endDate = plenty_admin.HELPER.formatJavaDate(activitiesForCropType[activitiesForCropType.length -1].endTime);
			plenty_admin.UI.field.dates.end = 	endDate.obj.getUTCFullYear()+
												"-"+
												((endDate.obj.getUTCMonth()+1) < 10 ? "0" + (endDate.obj.getUTCMonth()+1) : (endDate.obj.getUTCMonth()+1))+
												"-"+
												(endDate.obj.getUTCDate() < 10 ? "0"+endDate.obj.getDate() : endDate.obj.getUTCDate())+
												" "+
												((endDate.obj.getUTCHours()) < 10 ? "0"+(endDate.obj.getUTCHours()) : (endDate.obj.getUTCHours()+1))+
												":"+
												(endDate.obj.getUTCMinutes() < 10 ? "0"+endDate.obj.getUTCMinutes() : endDate.obj.getUTCMinutes());
			
			console.log("plenty_admin.UI.field.dates: ", plenty_admin.UI.field.dates);
			
			//prepare all data type lists and wait till they've loaded
			plenty_admin.DATA.eventCollector = window.eventcollector(3, 10000);
			plenty_admin.REST.getActivityTypes();
			
			plenty_admin.REST.get_weather_days_with_dateRange(fieldId, plenty_admin.UI.field.dates.start, plenty_admin.UI.field.dates.end, function(weatherDays){
				console.log("get_weather_days_with_dateRange", weatherDays);
				
				plenty_admin.UI.field.weatherDays = {
						dates: [],
						months: [],
						labels: [],
						allLabels: [],
						weatherEvents: {
							precip: [],
							temp: [],
							wind: []
						}
				}
				
				var millisecondsPerDay = 24 * 60 * 60 * 1000;
				var lastWeatherDayDate = weatherDays[weatherDays.length-1].date;
				var lastActivityDate = activitiesForCropType[activitiesForCropType.length -1].endTime;

				
				for(var wO = 0; wO < weatherDays.length; wO++){
					weatherOb = weatherDays[wO];
					var obTime = plenty_admin.HELPER.formatJavaDate(weatherOb.date);
					
					//create labelling sets for graphs
					plenty_admin.UI.field.weatherDays.labels.push(obTime.date);
					plenty_admin.UI.field.weatherDays.allLabels.push(obTime.date);
					
					//process existing weather days
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
								//console.log("how many depths? :", prop, weatherOb[prop].length);
								for(var w=0; w<weatherOb[prop].length; w++){
									var moistureDepth = weatherOb[prop][w];
									//console.log("moisture depth: ", w, moistureDepth);
									if(!plenty_admin.UI.field.weatherDays.moisture[moistureDepth.depth]){
										plenty_admin.UI.field.weatherDays.moisture[moistureDepth.depth] = {};
									}
									
									plenty_admin.UI.field.weatherDays.moisture[moistureDepth.depth][wO] = moistureDepth.moisture;
								}
							}else if(prop === "cropSurvey"){
								if(!plenty_admin.UI.field.weatherDays["cropSurvey"]){
									plenty_admin.UI.field.weatherDays["cropSurvey"] = [];
								}
								if(weatherOb["cropSurvey"]){
									plenty_admin.UI.field.weatherDays["cropSurvey"].push(weatherOb["cropSurvey"]);
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
				
				try{
					keyOffsetElement.width(plenty_admin.UI.field.currentGraph.datasets[0].points[0].x);
				}catch(err){
					bootbox.dialog({
								message: "Not enough activities (minimum of 2) to create weather graphs. Their start and end dates are calculated from the begining of the first, and the end of the last event.", 
								className: "danger",
								buttons: {
									danger: {
									  label: "OK",
									  className: "btn-danger",
									  callback: plenty_admin.HELPER.hideLoadingOverlay
									}
								}
							});
				}
				
				plenty_admin.UI.field.scaleScale(plenty_admin.UI.field[graph+"El"]);
				
				plenty_admin.UI.field.renderWeatherEvents(plenty_admin.UI.field.weatherDays.weatherEvents.precip, "precip");
				plenty_admin.UI.field.renderWeatherEvents(plenty_admin.UI.field.weatherDays.weatherEvents.temp, "temp");
				plenty_admin.UI.field.renderWeatherEvents(plenty_admin.UI.field.weatherDays.weatherEvents.wind, "wind");
				
				//ensure if the window changes size the weather events are refitted
				$(window).on("resize",function(){
					plenty_admin.UI.field.renderWeatherEvents(plenty_admin.UI.field.weatherDays.weatherEvents.precip, "precip");
					plenty_admin.UI.field.renderWeatherEvents(plenty_admin.UI.field.weatherDays.weatherEvents.temp, "temp");
					plenty_admin.UI.field.renderWeatherEvents(plenty_admin.UI.field.weatherDays.weatherEvents.wind, "wind");
					
					plenty_admin.UI.field.scaleScale(plenty_admin.UI.field[graph+"El"]);
				});
				
				plenty_admin.DATA.eventCollector.done("event 1");
			});
			
			plenty_admin.REST.get_activity_finances_for_date_range(cropYear.id, plenty_admin.UI.field.dates.start, plenty_admin.UI.field.dates.end, function(fieldCropActivityFinances){
				console.log("get_activity_finances_for_date_range", fieldCropActivityFinances());
				plenty_admin.UI.field.fieldCropActivityFinances = fieldCropActivityFinances();
				plenty_admin.DATA.eventCollector.done("event 2");
			});
			
			plenty_admin.DATA.eventCollector.on('alldone', function(total) {
				plenty_admin.UI.field.renderActivities(activitiesForCropType);
				console.log("all data gathered: ", plenty_admin.UI.field.dayWidth);
				plenty_admin.UI.field.renderCropSurveys(plenty_admin.UI.field.weatherDays.cropSurvey);
				
				//ensure if the window changes size the activities are refitted
				$(window).on("resize",function(){
					plenty_admin.UI.field.renderActivities(activitiesForCropType);
					plenty_admin.UI.field.renderCropSurveys(plenty_admin.UI.field.weatherDays.cropSurvey);
				});
				
				plenty_admin.UI.field.renderActivityFinancesGraph();
				
				plenty_admin.HELPER.hideLoadingOverlay();
			});	
		});
	},
	
	renderWeatherEvents: function(events, hash){
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
	},
	
	getActivityIconClass: function(activityTypeId){
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
				
				case 4:
				case "Planting":
					iconClass = "pif pif-planting";
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
	},
	
	renderCropSurveys: function(cropSurveys){
		plenty_admin.UI.field.cropSurveysContainer = plenty_admin.UI.field.DOM.find(".tab-content .cropSurveys");
		
		//remove any existing events
		plenty_admin.UI.field.cropSurveysContainer
		.find(".cropSurvey")
		.remove();
		
		for(var e=0; e<cropSurveys.length; e++){
			var cS = cropSurveys[e];
			cS.startOffsetDays = Math.round(plenty_admin.HELPER.daydiff(plenty_admin.UI.field.activitiesForCropType[0].startTime, cS.observationTime));
			
			var leftPos = plenty_admin.UI.field.dayWidth*cS.startOffsetDays -17; //days from the beginning - half the width of a crop survey icon
			
			if(leftPos < 0){
				leftPos = 0;
			}
			
			if(leftPos > plenty_admin.UI.field.cropSurveysContainer.width()){
				leftPos = plenty_admin.UI.field.cropSurveysContainer.width() - 34;
			}
			
			var uom = "UOMId-"+cS.countUOMId;
			
			var tooltip = [
							"cropHeight: "+cS.cropHeight+"<br>",
							"cropTypeId: "+cS.cropTypeId+"<br>",
							"growthMethodId: "+cS.growthMethodId+"<br>",
							"growthStageId: "+cS.growthStageId,
						].join("");
			
			var cropSurveyHTML = $("<div class='cropSurvey alert alert-warning' data-toggle='tooltip' data-placement='top' title='"+tooltip+"' style='left:"+leftPos+"px'><i class='fa fa-file-text'></i><img class='growthStageImg' src=''/></div>");
			
			cropSurveyHTML
			.off("click")
			.on("click", function(){
				plenty_admin.UI.crop_survey.show(cS, plenty_admin.UI.field.fieldObj);
				return false;
			})
			.tooltip({
						container:"body",
						html:true
					});
			
			//get the crop stage image for this crop survey
			plenty_admin.REST.fields.getGrowthStageFile(cS.growthStageId, cropSurveyHTML, function(growthStageImageString, _cropSurveyHTML){
				//create a container for the image
				_cropSurveyHTML
				.find("img.growthStageImg")
				.prop("src", "data:image/jpeg;base64,"+growthStageImageString);
				//position it behind the crop survey element
				plenty_admin.UI.field.cropSurveysContainer.append(_cropSurveyHTML);
			});
		}
	},
	
	renderActivities: function(activities, timelineOnly){
		plenty_admin.UI.field.activityTimelineContainer = plenty_admin.UI.field.DOM.find(".activitiesTimeline .activities");
		plenty_admin.UI.field.activityListContainer = plenty_admin.UI.field.DOM.find(".field_asset_data .tab-content #activities-list tbody");
		
		//clear activity timeline
		plenty_admin.UI.field.activityTimelineContainer
		.add(plenty_admin.UI.field.activityListContainer)
		.find(".activity")
		.remove();
		
		var activityDays = Math.round(plenty_admin.HELPER.daydiff(activities[0].startTime, activities[activities.length-1].endTime));
		plenty_admin.UI.field.dayWidth = parseInt(plenty_admin.UI.field.activityTimelineContainer.width()) / plenty_admin.UI.field.weatherDays.length;
		var hourWidth = plenty_admin.UI.field.dayWidth /24;
		
		
		console.log("activityDays", plenty_admin.UI.field.dayWidth, hourWidth);
		
		if(activities.length === 0){
			console.warn("could not calculate weatherDay width as weatherDays is empty");
			bootbox.dialog({
					message: "Could not calculate weatherDay witdh - there are no weatherDays being returned.", 
					className: "danger",
					buttons: {
						danger: {
						  label: "OK",
						  className: "btn-danger",
						  callback: plenty_admin.HELPER.hideLoadingOverlay,
						}
					}
				});
				
			return;
		}
		
		for(var a=0; a<activities.length; a++){
			var activity = activities[a];
			
			activity.iconClass = plenty_admin.UI.field.getActivityIconClass(activity.activityTypeId);
			
			activity.startDate = plenty_admin.HELPER.formatJavaDate(activity.startTime);
			activity.endDate = plenty_admin.HELPER.formatJavaDate(activity.endTime);
			activity.startOffsetDays = Math.round(plenty_admin.HELPER.daydiff(activities[0].startTime, activity.startTime));
			
			//console.log("activity", activity);
	
			var leftPos = plenty_admin.UI.field.dayWidth*activity.startOffsetDays;
			var eventWidth = Math.round(hourWidth*activity.durationInHours);
			
			//console.log("eventWidth: ", eventWidth);
			
			if(eventWidth < 26){
				eventWidth = 26;
			}
			
			if(leftPos < 0){
				leftPos = 0;
			}
			
			if(leftPos + eventWidth > plenty_admin.UI.field.activityTimelineContainer.width()){
				leftPos = plenty_admin.UI.field.activityTimelineContainer.width() - eventWidth;
			}
			
			var activityHTML = $("<div class='activity' data-toggle='tooltip' data-placement='top' title='"+plenty_admin.UI.field.getActivityTooltipTitle(activity)+"' style='left:"+leftPos+"px; width:"+eventWidth+"px'><i class='"+plenty_admin.DATA.activityTypes[activity.activityTypeId].name.toLowerCase().replace(/ /g, "")+" "+activity.iconClass+"'></i></div>");
			
			var activityFinances = $.grep(plenty_admin.UI.field.fieldCropActivityFinances.activityFinances, function(activityFinance, a){
				return activityFinance.activityDto.id === activity.id;
			});
				
			activityHTML
			.tooltip({
				html:true,
				container:"body"
			})
			.data("activity", activity)
			.data("activityFinance", activityFinances[0])
			.click(function(){
				plenty_admin.UI.field.show_activity_modal($(this).data("activity"), $(this).data("activityFinance").taskFinances, $(this));
			});
			
			plenty_admin.UI.field.activityTimelineContainer.append(activityHTML);
			
			if(!timelineOnly){
				//build the activity list item
				var activityItem = [
						"<tr class='activity pointer'>",
							"<td width='5%'>",
								"<i class='"+activity.iconClass+"'></i>",
							"</td>",
							"<td width='25%'>",
								activity.state,
							"</td>",
							"<td width='25%'>",
								plenty_admin.DATA.activityTypes[activity.activityTypeId].name,
							"</td>",
							"<td width='20%'>",
								activity.startDate.date,
							"</td>",
							"<td width='20%'>",
								plenty_admin.HELPER.daysFromHours(activity.durationInHours),
							"</td>",
							"<td width='20%' class='text-right'>",
								numeral(activity.cost).format('$0,0.00'),
							"</td>",
						"</tr>"
				].join("");
				
				var $activityItem = $(activityItem);
	
				$activityItem
				.data("activity", activity)
				.data("activityFinance", activityFinances[0])
				.click(function(){
					plenty_admin.UI.field.show_activity_modal($(this).data("activity"), $(this).data("activityFinance").taskFinances, $(this));
				});
				
				plenty_admin.UI.field.activityListContainer.append($activityItem);
			}
		}
		
		var keyOffsetElements = plenty_admin.UI.field.DOM.find(".keyOffset");
		keyOffsetElements.width(plenty_admin.UI.field.currentGraph.datasets[0].points[0].x);
		
		plenty_admin.UI.field.positionToday(activities[0].startTime);
		//plenty_admin.UI.field.buildChartZoomer();
	},
	
	positionToday: function(startTime){
		var $futureDays = plenty_admin.UI.field.DOM.find(".futureDays");
		var $todayLabel = plenty_admin.UI.field.DOM.find(".todayLabel");
		
		var pastDays = Math.round(plenty_admin.HELPER.daydiff(startTime, new Date().getTime()));
		console.log("pastDays", pastDays);
		
		var fdKeyOffset = $futureDays.parent().find(".keyOffset");
		
		if(pastDays > 0){
			//var pastDaysWidth = plenty_admin.UI.field.dayWidth * pastDays;
			var pastDaysWidth = plenty_admin.UI.field.currentGraph.datasets[0].points[pastDays].x;
			console.log("pastDaysWidth", pastDaysWidth);
			
			fdKeyOffset
			.animate({width: pastDaysWidth});
			
			$todayLabel
			.css({
				right: - ($todayLabel.width()/2)
			});
			
			$futureDays
			.parent()
			.css({
				height: Math.round(plenty_admin.UI.field.currentGraph.scale.endPoint),
				bottom: Math.round(plenty_admin.UI.field.currentGraph.scale.height - plenty_admin.UI.field.currentGraph.scale.endPoint)
			})
			.fadeIn("fast");
		}else{
			$futureDays
			.parent()
			.hide();
		}
	},
	buildChartZoomer: function(){
		var $zoomInLayer = plenty_admin.UI.field.DOM.find(".zoomInLayer");
		console.log("buildChartZoomer", $zoomInLayer, plenty_admin.UI.field.currentGraph.scale);
		$zoomInLayer
		.css({
			height: Math.round(plenty_admin.UI.field.currentGraph.scale.endPoint),
			bottom: Math.round(plenty_admin.UI.field.currentGraph.scale.height - plenty_admin.UI.field.currentGraph.scale.endPoint)
		})
		.on("click", function(e){
			console.log("chartZoomer", $(this), e);
			var zoomInCtrl = $(this).find(".zoomInControl");
			var offset = $(this).offset();
			var ctrlPosition = e.pageX - offset.left - (zoomInCtrl.width()/2)
			
			zoomInCtrl
			.css({left:ctrlPosition})
			.fadeIn("fast");
		});
	},
	renderEquipment: function(equipment){
		plenty_admin.UI.field.equipmentListContainer = plenty_admin.UI.field.DOM.find(".field_asset_data .tab-content #equipment tbody");
		
		console.log("equipmentListContainer", plenty_admin.UI.field.equipmentListContainer);
		for(var a=0; a<equipment.length; a++){
			var equipmentObject = equipment[a]/*.equipmentDto*/;
			
			if(equipmentObject.fieldEquipmentDto === null){
				continue;
			}
			//console.log("equipmentObject", equipmentObject);
			
			//build the activity list item
			var equipmentItemHTML = [
					"<tr class='equipment pointer'>",
						"<td width='5%'>",
							"<i class='pif pif-"+equipmentObject.equipmentTypeIds[0].name.toLowerCase().replace(/ /g, "-")+"'></i>",
						"</td>",
						"<td width='25%'>",
							equipmentObject.equipmentTypeIds[0].name,
						"</td>",
						"<td width='30%'>",
							plenty_admin.DATA.brandTypes[equipmentObject.brandId].name,
						"</td>",
						"<td width='25%'>",
							equipmentObject.name,
						"</td>",
					"</tr>"
			].join("");
			
			var $equipmentItemHTML = $(equipmentItemHTML);
			$equipmentItemHTML
			.data("equipmentObject", equipmentObject)
			.on("click", function(){
				plenty_admin.UI.field.show_equipment_modal($(this).data("equipmentObject"));
			});
			
			plenty_admin.UI.field.equipmentListContainer.append($equipmentItemHTML);
			
			//add equipment pins to field map
			//get a google latlng object for each element
			var latlng = new google.maps.LatLng(equipmentObject.latitude, equipmentObject.longitude);
			
			equipmentObject.latlng = latlng;
			
			var pinEvents = {
				onMouseOver: function(event){ //mouseover event
					//console.log("hover marker: ", this, $(this.markerContent_));
					$(this.markerContent_)
					.find(".marker")
					.addClass("hover");
					
					$(this.markerWrapper_)
					.css({
						zIndex:10
					});
					
					plenty_admin.MAPS.polygon_tooltip.show("<strong>"+equipmentObject.name+"</strong>");
				}, 
				onMouseOut: function(event){ //mouseout event
					$(this.markerContent_)
					.find(".marker")
					.removeClass("hover");
					
					$(this.markerWrapper_)
					.css({
						zIndex:1
					});
					
					plenty_admin.MAPS.polygon_tooltip.hide();
				}, 
				onClick: function(event){ //click event
					//event.stopPropagation();
					plenty_admin.UI.field.show_equipment_modal(equipmentObject);
				}
			}
			//draw the pin on the map
			plenty_admin.MAPS.draw_pin(equipmentObject, pinEvents, plenty_admin.MAPS.map);
		}
	},

	getActivityTooltipTitle: function(activity){
		var title = plenty_admin.DATA.activityTypes[activity.activityTypeId].name+
					"<br/>"+
					activity.startDate.fullDate+
					"<br/>"+
					"$"+
					numeral(activity.cost).format('$0,0.00');
					
		console.log("activity tooltip title:", title);
		return title;
	},

	renderTempGraph: function(){
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
				multiTooltipTemplate: "<%= datasetLabel %>: <%=numeral(value).format('0,0.0')%>℉",
				pointHitDetectionRadius:0,
				scaleLabel: plenty_admin.UI.field.yAxisPadder
			};
			
			var helpers = Chart.helpers;
			
			if(plenty_admin.UI.field.tempGraph){
				plenty_admin.UI.field.tempGraph.destroy();
			}
			
			plenty_admin.UI.field.weatherDays.labels = plenty_admin.UI.field.weatherDays.allLabels.slice();
			
			plenty_admin.UI.field.tempGraph = new Chart(plenty_admin.UI.field.tempGraphEl.get(0).getContext("2d")).LineAlt(tempGraphData, tempGraphOptions);
			plenty_admin.UI.field.tempGraph.datasetId = "temp"; 
			plenty_admin.UI.field.renderedGraphs.push(plenty_admin.UI.field.tempGraph);
			
			return plenty_admin.UI.field.tempGraph;
	},
	
	scaleScale: function(graphEl){
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
	},

	renderMoistureGraph: function(){
		//create dynamic moisture datasets
		var datasets = [];
		var index = 0;
		var palette = new Rainbow();
		palette.setSpectrum("#0076b2", "#93b222", "#788912");
		palette.setNumberRange(0, Object.keys(plenty_admin.UI.field.weatherDays.moisture).length);
		
		//for(var m=0; m<plenty_admin.UI.field.weatherDays.moisture.length; m++){
		for(depth in plenty_admin.UI.field.weatherDays.moisture){
			if(plenty_admin.UI.field.weatherDays.moisture.hasOwnProperty(depth)){
				//console.log("colour: ", index, depth);
				var moistureDepth = plenty_admin.UI.field.weatherDays.moisture[depth];
				var depthDays = [];
				//loop through all days in range and create full data set for moisture dats
				for(var d=0; d<plenty_admin.UI.field.weatherDays.length; d++){
					if(moistureDepth[d]){
						depthDays.push(moistureDepth[d]);
					}else{
						if(index == 0){
							depthDays.push(0);
						}
					}
				}
				
				var colour = plenty_admin.HELPER.hexToRgb("#"+palette.colourAt(index));
				var label = depth.toString();
				var dataset = {
					label: label+"mm",
					fillColor: "rgba("+colour.r+","+colour.g+","+colour.b+",0.2)", //define
					strokeColor: "rgba("+colour.r+","+colour.g+","+colour.b+",1)", //define
					pointColor: "rgba("+colour.r+","+colour.g+","+colour.b+",1)", //define
					pointStrokeColor: "#fff",
					pointHighlightFill: "#fff",
					pointHighlightStroke: "rgba("+plenty_admin.HELPER.hexToRgb("#"+palette.colourAt(index))+",1)",
					data: depthDays
				};
				datasets.push(dataset);
				index +=1;
			}
		}
		
		//console.log("moisture datasets: ", datasets);
		
		var moistureGraphData = {
				labels: plenty_admin.UI.field.weatherDays.labels,
				datasets: datasets
			};
			
			var moistureGraphOptions = {
				multiTooltipTemplate: "<%= datasetLabel %>: <%=numeral(value).format('0,0.00')%>cb",
				pointHitDetectionRadius: 0,
				animation:false,
				scaleLabel: plenty_admin.UI.field.yAxisPadder
			};
			
			if(plenty_admin.UI.field.moistureGraph){
				plenty_admin.UI.field.moistureGraph.destroy();
			}
			
			plenty_admin.UI.field.weatherDays.labels = plenty_admin.UI.field.weatherDays.allLabels.slice();
			
			plenty_admin.UI.field.moistureGraph = new Chart(plenty_admin.UI.field.moistureGraphEl.get(0).getContext("2d")).LineAlt(moistureGraphData, moistureGraphOptions);
			plenty_admin.UI.field.moistureGraph.datasetId = "moisture";
			plenty_admin.UI.field.renderedGraphs.push(plenty_admin.UI.field.moistureGraph);
			
			return plenty_admin.UI.field.moistureGraph;
	},

	renderPrecipGraph: function(){
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
				//tooltipTemplate: "<%=label%>: <%=numeral(value).format('0,0.00')%>\"",
				tooltipTemplate: "<%= label %>: <%= Math.round(value) %>",
				pointHitDetectionRadius: 0,
				scaleLabel: plenty_admin.UI.field.yAxisPadder
			};
			
			if(plenty_admin.UI.field.precipGraph){
				plenty_admin.UI.field.precipGraph.destroy();
			}
			
			plenty_admin.UI.field.weatherDays.labels = plenty_admin.UI.field.weatherDays.allLabels.slice();
			
			plenty_admin.UI.field.precipGraph = new Chart(plenty_admin.UI.field.precipGraphEl.get(0).getContext("2d")).LineAlt(precipGraphData, precipGraphOptions);
			plenty_admin.UI.field.precipGraph.datasetId = "precipAmt";
			plenty_admin.UI.field.renderedGraphs.push(plenty_admin.UI.field.precipGraph);
			
			return plenty_admin.UI.field.precipGraph;
	},
	yAxisPadder: function(object){
		//console.log("value length: ", object.value, object.value.length, 12-object.value.length);
		var maxSpaces = 9;
		var addedSpace = "";
		var extraSpaces = maxSpaces-object.value.length;
		for(var s=0; s<extraSpaces; s++){
			addedSpace += " ";
		}
		return addedSpace + object.value;
	},
	renderGDDGraph: function(){
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
				tooltipTemplate: "<%= label %>: <%= Math.round(value) %>",
				pointHitDetectionRadius: 0,
				scaleLabel: plenty_admin.UI.field.yAxisPadder
			};
			
			if(plenty_admin.UI.field.gddGraph){
				plenty_admin.UI.field.gddGraph.destroy();
			}
			
			plenty_admin.UI.field.weatherDays.labels = plenty_admin.UI.field.weatherDays.allLabels.slice();
			
			plenty_admin.UI.field.gddGraph = new Chart(plenty_admin.UI.field.gddGraphEl.get(0).getContext("2d")).LineAlt(GDDGraphData, GDDGraphOptions);
			plenty_admin.UI.field.gddGraph.datasetId = "gddTotalToToday";
			
			plenty_admin.UI.field.gddGraphEl
			.onclick = function(evt){
				var activePoints = myLineChart.getPointsAtEvent(evt);
				console.log("graph clicked: ", activePoints);
				// => activePoints is an array of points on the canvas that are at the same position as the click event.
			};
			
			plenty_admin.UI.field.renderedGraphs.push(plenty_admin.UI.field.gddGraph);
			
			return plenty_admin.UI.field.gddGraph;
	},

	renderActivityFinancesGraph: function(){
		var finances = plenty_admin.UI.field.fieldCropActivityFinances;
		//holder for graph data set
		var financesData = [];
		
		//show profit / revenue / cost figures
		plenty_admin.UI.field.DOM
		.find(".topLine")
		.find(".profit")
		.text(numeral(finances.totalProfit).format('$0,0.00'))
		.end()
		.find(".cost")
		.text(numeral(finances.totalCost).format('$0,0.00'))
		.end()
		.find(".revenue")
		.text(numeral(finances.totalRevenue).format('$0,0.00'));
		
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
			legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend mts\"><% for (var i=0; i<segments.length; i++){%><li data-segmentid=\"<%=i%>\" data-hovercolour=\"<%=segments[i].fillColor%>\" data-name=\"<%=segments[i].label.replace(/ /g, \"\").toLowerCase()%>\" class=\"legendItem\"><span class=\"swatch\" style=\"background-color:<%=segments[i].fillColor%>\"><i class=\"pif pif-<%=segments[i].label.toLowerCase().replace(/ /g, \"-\")%>\"></i></span><%if(segments[i].label){%><%=segments[i].label%><%}%> <span class=\"pct\"></span><span class=\"pull-right\"><%= numeral(segments[i].value).format('$0,0.00') %></span></li><%}%></ul>",
			tooltipTemplate: "<%=label%>: <%= numeral(value).format('$0,0.00') %> | <%= numeral(circumference / 6.283).format('00.00%') %>",
			animateRotate: true
		};
		
		var helpers = Chart.helpers;
		
		console.log("helpers", helpers);
		
		if(plenty_admin.UI.field.financesGraph){
			plenty_admin.UI.field.financesGraph.destroy();
		}
			
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
				
				var pct = numeral(activeSegment.circumference / 6.283).format('00.00%');
				
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
		plenty_admin.UI.field.financesGraphEl.on("mouseout", function(evt){
			resetLegentStyle(legendHolder);
		});
		
		plenty_admin.UI.field.renderedGraphs.push(plenty_admin.UI.field.financesGraph);
		
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
		
		plenty_admin.UI.map.MODAL_activity
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
		
		plenty_admin.UI.field.taskFinancesGraph = new Chart(plenty_admin.UI.field.taskFinancesGraphEl.get(0).getContext("2d")).Doughnut(taskFinancesData,taskFinancesChartOptions);
		
		console.log("render task finances graph: ", plenty_admin.UI.field.taskFinancesGraph, taskFinancesData);
		
		//add a legend for this graph
		var $legendHTML = $(plenty_admin.UI.field.taskFinancesGraph.generateLegend());
		
		var legendHolder = 
		plenty_admin.UI.field.taskFinancesGraphEl
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
					var activeSegment = plenty_admin.UI.field.taskFinancesGraph.segments[index];
					
					var pct = numeral(activeSegment.circumference / 6.283).format('00.00%');
					
					activeSegment.save();
					activeSegment.fillColor = activeSegment.highlightColor;
					activeSegment.innerRadius = 60;
					plenty_admin.UI.field.taskFinancesGraph.showTooltip([activeSegment]);
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
			plenty_admin.UI.field.taskFinancesGraph.draw();
			if(!$(this).hasClass("taskItem") && !$(this).hasClass("taskResourceItem")){
				resetLegentStyle(legendHolder);
			}
		});
		
		//highlight key element when hovering segment
		plenty_admin.UI.field.taskFinancesGraphEl.on("mousemove", function(evt){
			var activePoints = plenty_admin.UI.field.taskFinancesGraph.getSegmentsAtEvent(evt);
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
		plenty_admin.UI.field.taskFinancesGraphEl.on("mouseout", function(evt){
			resetLegentStyle(legendHolder);
		});
		
		plenty_admin.UI.field.renderedGraphs.push(plenty_admin.UI.field.taskFinancesGraph);
	}
};

plenty_admin.UI.field.weatherTabs.DOM = plenty_admin.UI.field.DOM.find('.field_weather_data');
plenty_admin.UI.field.assetTabs.DOM = plenty_admin.UI.field.DOM.find('.field_asset_data');

/* define the field graph dom elements */
plenty_admin.UI.field.tempGraphEl = plenty_admin.UI.field.DOM.find(".tab-content .tab-pane#temp canvas");
plenty_admin.UI.field.moistureGraphEl = plenty_admin.UI.field.DOM.find(".tab-content .tab-pane#moisture canvas");
plenty_admin.UI.field.precipGraphEl = plenty_admin.UI.field.DOM.find(".tab-content .tab-pane#precip canvas");
plenty_admin.UI.field.gddGraphEl = plenty_admin.UI.field.DOM.find(".tab-content .tab-pane#gdd canvas");
plenty_admin.UI.field.financesGraphEl = plenty_admin.UI.field.DOM.find(".tab-content .tab-pane#finances canvas");

/* Set up the global properties of the charts plugin*/
Chart.defaults.global.responsive = true;
Chart.defaults.global.maintainAspectRatio = false;
Chart.defaults.global.scaleFontFamily = "'Lucida Console', Monaco, monospace";
Chart.defaults.Line.scaleShowHorizontalLines = true;
Chart.defaults.Line.scaleShowVerticalLines = true;
Chart.defaults.Line.scaleShowGridLines = true;
Chart.defaults.Line.pointHitDetectionRadius = 1;


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

//get image for growth stage
plenty_admin.REST.fields.getGrowthStageFile = function(growthStageId, html, callback){
	plenty_admin.REST.growthStageFile = plenty_admin.api.all("growthStageFile/getImage");
	plenty_admin.REST.growthStageFile.get(growthStageId)
	.then(
		function(growthStageImageString){
			console.log("growthStageImageString: ", growthStageImageString().data);
			if(callback && typeof callback == "function"){
				callback(growthStageImageString().data, html);
			}
		},
		function(){
			console.log("getting growth stage image failed: ");
			if(callback && typeof callback == "function"){
				callback("NO IMAGE AVAILABLE", html);
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
plenty_admin.REST.get_weather_days_with_dateRange = function(fieldCropId, fromDate, toDate, callback){
	plenty_admin.REST.getWatherDaysByFieldAndByDateRange = plenty_admin.api.one("fields/getWatherDaysByFieldAndByDateRange", fieldCropId+"/"+fromDate+"/"+toDate);
	plenty_admin.REST.getWatherDaysByFieldAndByDateRange.get().then(
		function(response){
			if(Array.isArray(response.body())){
				var returnData = plenty_admin.REST.get_array_from_data(response.body());
			}else{
				var returnData = response.body(); //"NO DATA";
			}
			if(callback && typeof callback === "function"){
				callback(returnData);
			}
		},
		function(err){
			console.error("plenty_admin.REST.get_weather_days_with_dateRange failed: ", err);
			bootbox.dialog({
							message: "plenty_admin.REST.get_weather_days_with_dateRange failed.", 
							className: "danger",
							buttons: {
								danger: {
								  label: "OK",
								  className: "btn-danger",
								  callback: plenty_admin.HELPER.hideLoadingOverlay
								}
							}
						});
		}
	);
}

//get equipment for a field
plenty_admin.REST.get_field_equipments_with_fieldId = function(fieldId, callback){
	plenty_admin.REST.getFieldEquipmentsWithFieldId = plenty_admin.api.one("equipment/getByField", fieldId);
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

plenty_admin.DATA.load_field_observation = function(observationId, callback){
	plenty_admin.REST.getObservationById = plenty_admin.api.one("observations/getObservation", observationId);
	plenty_admin.REST.getObservationById.get().then(function(observation){
			console.log("observation: ", observation);
			if(callback && typeof callback === "function"){
				callback(observation);
			}
		}
	);
}

