//*********************** map.js **************************//
//create namespace for map layout
plenty_admin.UI.map = {};
plenty_admin.UI.map.allCropTypes =  {};
plenty_admin.UI.map.DOM = plenty_admin.UI.DOM.find("#map-container");
plenty_admin.UI.map.filterControls = $(".filter_controls");
plenty_admin.UI.map.toggleFilters = plenty_admin.UI.map.filterControls.find(".toggleFilters a");
plenty_admin.UI.map.farms_quickfilter = plenty_admin.UI.map.filterControls.find(".quickFilter_farms");
plenty_admin.UI.map.orgs_quickfilter = plenty_admin.UI.map.filterControls.find(".quickFilter_organizations");
plenty_admin.UI.map.minCLUZoom = 15;
plenty_admin.UI.map.applicableFilters = ["organizations", "farms", "fields", "croptypes", "plans"];
plenty_admin.UI.map.filtered_field_polygons = [];
plenty_admin.UI.map.MODAL_equipment = $("body").find(".modal#equipment");
plenty_admin.UI.map.MODAL_activity = $("body").find(".modal#activity");
plenty_admin.UI.field.taskFinancesGraphEl = plenty_admin.UI.map.MODAL_activity.find("canvas#taskGraph");
plenty_admin.UI.map.isInit = 0;

//method to initiate the field page
plenty_admin.UI.map.init = function(){
	console.log("plenty_admin.UI.map.init");
	plenty_admin.UI.currentScreen = plenty_admin.UI.map.DOM;
	plenty_admin.MAPS.add_field_state = 1;
	plenty_admin.MAPS.edit_field_state = 0;
	function loadMap(){
		var center = new google.maps.LatLng(38.017922, -95.494064);
		
		var mapOptions = {
			center: center,
			mapTypeId: google.maps.MapTypeId.HYBRID,
			zoom: plenty_admin.UI.map.minCLUZoom,
			mapTypeControl:false,
			streetViewControl:false
		}
		
		plenty_admin.MAPS.mainMap = plenty_admin.MAPS.create_map("map-container", mapOptions);
		
		//update the map when the user finishes interacting with it
		plenty_admin.MAPS.set_on_idle_event(plenty_admin.MAPS.mainMap, function(e){
			console.log("map bounds changed");
			
			var zoom = plenty_admin.MAPS.mainMap.getZoom();
			//console.log("map bounds: ", bounds.getNorthEast(), bounds.getSouthWest());
			console.log("map zoom: ", zoom);
			
			//always show equipment pins when zoom or pan
			if(
				plenty_admin.DATA.userFilters
				&& plenty_admin.MAPS.edit_field_state == 0
			){
				plenty_admin.UI.map.add_equipment_to_map();
			}
		});
		
		plenty_admin.MAPS.set_on_click_event(plenty_admin.MAPS.mainMap, function(e){
			console.log("map clicked", e);
			plenty_admin.UI.filters.toggleFilters("close");	
			plenty_admin.UI.map.farms_quickfilter.popover("hide");
			plenty_admin.UI.map.orgs_quickfilter.popover("hide");
		});
		
		plenty_admin.MAPS.add_field_control(plenty_admin.MAPS.mainMap);
		plenty_admin.MAPS.add_zoom_to_fields_control(plenty_admin.MAPS.mainMap);
		
		//prepare all data type lists and wait till they've loaded
		plenty_admin.DATA.eventCollector = window.eventcollector(8, 10000);
		plenty_admin.REST.getCropTypes();
		plenty_admin.REST.getTillageTypes();
		plenty_admin.REST.getIrrigationTypes();
		plenty_admin.REST.getEquipmentTypes();
		plenty_admin.REST.getBrandTypes();
		plenty_admin.REST.getGrowthMethods();
		
		plenty_admin.DATA.eventCollector.on('alldone', function(total) {
			plenty_admin.HELPER.hideLoadingOverlay();
		});	
	}
	if (typeof google === 'object' && typeof google.maps === 'object'){
		loadMap();
	}else{
		google.maps.event.addDomListener(window, 'load', loadMap);
	}
	
	//set up the map filter controls
	plenty_admin.UI.map.toggleFilters
	.click(function(){
		plenty_admin.UI.filters.toggleFilters();	
		return false;
	});
	
	plenty_admin.UI.map.farms_quickfilter
	.popover({
		content:function(){
			var $popover_content = plenty_admin.UI.filters.DOM.find(".filter-set.farms .all-filters").clone(true, true).addClass("farms_quickfilter_popover").show();
			
			return $popover_content;
		},
		title: '<button type="button" id="close" class="close" onclick="plenty_admin.UI.map.farms_quickfilter.popover(&quot;hide&quot;);">&times;</button>',
		html:true,
		id:"",
		placement:"bottom"
	})
	.parent().delegate('a, input[type="checkbox"]', 'click', function(e) {
		return false;
	})
	.end()
	.on('show.bs.popover', function (e) {
		plenty_admin.UI.map.orgs_quickfilter
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
	
	plenty_admin.UI.map.orgs_quickfilter
	.popover({
		content:function(){
			var $popover_content = plenty_admin.UI.filters.DOM.find(".filter-set.organizations .all-filters").clone(true, true).addClass("orgs_quickfilter_popover").show();
			
			return $popover_content;
		},
		html:true,
		title: '<button type="button" id="close" class="close" onclick="plenty_admin.UI.map.orgs_quickfilter.popover(&quot;hide&quot;);">&times;</button>',
		placement:"bottom"
	})
	.parent().delegate('a, input[type="checkbox"]', 'click', function(e) {
		return false;
	})
	.end()
	.on('show.bs.popover', function (e) {
		plenty_admin.UI.map.farms_quickfilter
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
	
}

plenty_admin.UI.map.add_equipment_to_map = function(){
	//only run one request at a time
	if(plenty_admin.UI.map.adding_map_equipment){
		return;
	}
	
	plenty_admin.UI.map.adding_map_equipment = true;
	
	var bounds = plenty_admin.MAPS.mainMap.getBounds();
	var boundary = {};
	
	boundary.maxLongitude = bounds.getNorthEast().lng();
	boundary.minLongitude = bounds.getSouthWest().lng();
	boundary.maxLatitude = bounds.getNorthEast().lat();
	boundary.minLatitude = bounds.getSouthWest().lat();
	
	console.log("BOUNDARY: ", bounds, bounds.getNorthEast(), boundary);
	
	plenty_admin.REST.fields.getEquipmentLocationForFilter(boundary, function(equipment){
		
		plenty_admin.UI.map.adding_map_equipment = false;
		
		console.log("Equipments", equipment);
		
		var boundaryLatLngs = [];
		
		//remove markers that are not in the returned set
		if(equipment.length < plenty_admin.MAPS.equipment_pins.length){ //the number of pins has reduced
			var markersToRemove = [];
			for(var eq=0; eq<plenty_admin.MAPS.equipment_pins.length; eq++){ //loop the existing pins
				var existingEq = plenty_admin.MAPS.equipment_pins[eq];
				
				var equipToRemove = $.grep(equipment, function(newEquip, nE){
					return existingEq.id === newEquip.id; // check this existing pin against those returned
				});
				
				if(equipToRemove.length == 0){ // if a pin exists already that is not in the returned set
					existingEq._index = eq;
					markersToRemove.push(existingEq); // add it to the pins to be removed
				}
			}
			
			//console.log("markersToRemove", markersToRemove);
			if(markersToRemove.length > 0){ // if there are poins to remove
				for(var f=markersToRemove.length-1; f>=0; f--){
					//console.log("remove marker: ", f, markersToRemove[f]);
					$(markersToRemove[f].markerWrapper_).remove(); // remove them from the DOM
					plenty_admin.MAPS.equipment_pins.splice(markersToRemove[f]._index, 1); // remove them from our pins array
				}
			}
		}
		
		if(plenty_admin.UI.map.isInit < 1){
			plenty_admin.UI.map.isInit += 1;
		}else{
			//loop the equipment
			equipment.forEach(function(equip, e){
				var iconExists = $.grep(plenty_admin.MAPS.equipment_pins, function(pin, p){
					return pin.id === equip.id;
				});
				
				if(iconExists.length === 0){
					//get a google latlng object for each element
					var latlng = new google.maps.LatLng(equip.latitude, equip.longitude);
					
					//extend the map boundary to include all points
					boundaryLatLngs.push(latlng);
					
					plenty_admin.UI.map.latlngbounds.extend(latlng);
					
					equip.latlng = latlng;
					
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
							
							plenty_admin.MAPS.polygon_tooltip.show("<strong>"+equip.name+"</strong><br /><p>Drag to reposition, right click to delete</p>");
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
						onClick: function(){ //click event
							console.log("event:", this, this.args);
							plenty_admin.UI.map.clickedEquipment = true;
							var t = setTimeout(function(){
								plenty_admin.UI.map.clickedEquipment = false;
							}, 300);
							//event.stop();
							plenty_admin.MAPS.show_equipment_pin_context_menu(equip, this);
							plenty_admin.MAPS.polygon_tooltip.hide();
						},
						onDragEnd: function(){ //drag end event
							var that = this;
							//console.log("onDragEnd:", equip, that);
							//check if the point has been moved to another polygon or is not in a polygon
							var matchedPoly = null;
							for(var p=0; p<plenty_admin.UI.map.filtered_field_polygons.length; p++){
								var polygon = plenty_admin.UI.map.filtered_field_polygons[p];
								if(google.maps.geometry.poly.containsLocation(that.position, polygon)){
									//console.log("Point is inside a polygon: ", polygon);
									matchedPoly = polygon;
									break;
								}
							}
							
							if(matchedPoly){
								if(matchedPoly.id === equip.fieldEquipmentDto.fieldId){
									//console.log("do you want top move this equipment within this field?");
									plenty_admin.MAPS.update_fixed_equipment_position(equip, that);
								}else{
									//console.log("Do you what to assosciate this equipment with a different field");
									plenty_admin.MAPS.update_fixed_equipment_position_and_change_field(equip, matchedPoly, that);
								}
							}else{
								//console.log("are you sure you want to disassociate this equipment with any fields???");
								plenty_admin.MAPS.update_fixed_equipment_position(equip, that);
								plenty_admin.MAPS.delete_field_equipment(equip, that);
							}
							return false;
						}
					}
					//draw the pin on the map
					plenty_admin.MAPS.draw_pin(equip, pinEvents, plenty_admin.MAPS.mainMap);
				}
			});
			
			plenty_admin.DATA.eventCollector.done("equipment");
		}
	});
}

plenty_admin.UI.field.show_activity_modal = function(activity, taskFinances, el){
	console.log("show_activity_modal", activity, taskFinances);
	plenty_admin.UI.map.MODAL_activity
	.find(".modal-title")
	.text(plenty_admin.DATA.activityTypes[activity.activityTypeId].name)
	.end()
	.find("button.delete")
	.off("click")
	.on("click", function(){
			plenty_admin.UI.map.MODAL_activity
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
			plenty_admin.UI.map.MODAL_activity
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
			plenty_admin.UI.map.MODAL_activity
			.modal("hide");
			
			el
			.remove();
		})
	})
	.end()
	.on("shown.bs.modal", function(){
		plenty_admin.UI.field.renderTaskFinancesGraph(taskFinances);
		plenty_admin.UI.field.renderTasks(taskFinances);
	})
	.modal("show");
};

plenty_admin.UI.field.show_equipment_modal = function(equip){
	console.log("show_equipment_modal", equip);
	
	plenty_admin.REST.fields.getEquipmentImage(equip.id, function(imageString){
		//console.log("imageString", imageString);
		plenty_admin.UI.map.MODAL_equipment
		.find(".image").html("<img src='data:image/jpeg;base64,"+ imageString +"' width='100%'/>");
	});
	
	var equipType = equip.equipmentObservationDto ? equip.equipmentObservationDto.type : "null";
	plenty_admin.UI.map.MODAL_equipment
	.removeClass("MOVEABLE WELL SOIL_MOISTURE null")
	.addClass(equipType)
	.find(".modal-title")
	.text(equip.equipmentTypeIds[0].name)
	.end()
	.find(".name")
	.text(equip.name)
	.end()
	.find(".lat")
	.text(equip.latitude)
	.end()
	.find(".lng")
	.text(equip.longitude)
	
	
	switch(equipType){
		case null:
			
		break;
		
		case "MOVEABLE":
			plenty_admin.UI.map.MODAL_equipment
			.find(".equipmentObservationHeaders.MOVEABLE")
			.find(".speed b")
			.text(equip.equipmentObservationDto.speed)
			.end()
			.find(".fuel b")
			.text(equip.equipmentObservationDto.fuelAmount);
		break;
		
		case "WELL":
			plenty_admin.UI.map.MODAL_equipment
			.find(".equipmentObservationHeaders.WELL")
			.find(".time b")
			.text(plenty_admin.HELPER.formatJavaDate(equip.equipmentObservationDto.observationTime).time)
			.end()
			.find(".reading b")
			.text(equip.equipmentObservationDto.meterReading);
		break;
		
		case "SOIL_MOISTURE":
			plenty_admin.UI.map.MODAL_equipment
			.find(".equipmentObservationHeaders.SOIL_MOISTURE")
			.find(".time b")
			.text(plenty_admin.HELPER.formatJavaDate(equip.equipmentObservationDto.observationTime).time)
			.end()
			.find(".soilDepthUOM")
			.text(equip.equipmentObservationDto.depthUOM.name)
			.end()
			.find(".moistureUOM")
			.text(equip.equipmentObservationDto.moistureUOM.name);
			
			for(var b=0; b<equip.equipmentObservationDto.readings.length; b++){
				var reading = equip.equipmentObservationDto.readings[b];
				var readingROW = [
					"<tr>",
						"<td>",
							reading.depth,
						"</td>",
						"<td>",
							reading.moisture,
						"</td>",
					"</tr>",
				].join("");
				
				plenty_admin.UI.map.MODAL_equipment
				.find(".equipmentObservationHeaders.SOIL_MOISTURE tbody")
				.append(readingROW);
			}
			
			//loop measuremends
			//create rows to add to the table
			
		break;
	}
	
	plenty_admin.UI.map.MODAL_equipment
	.find(".editable")
	.editable(plenty_admin.REST.inline_editing_options)
	.end()
	.modal("show");
}

plenty_admin.UI.map.populate = function(fieldIDs, zoomFields){
	// loop filtered fields and put them on the map
	console.log("plenty_admin.UI.map.populate", fieldIDs, zoomFields);
	plenty_admin.UI.map.latlngbounds = new google.maps.LatLngBounds();
	
	//get the boundary points, grouped by field ID for the current filter
	plenty_admin.REST.get_x_by_filtered("BoundaryPoints", function(boundaryPoints){
		console.log("boundaryPoints", boundaryPoints().data);
		var fieldBoundaries = boundaryPoints().data;
		
		//clear the map
		if(plenty_admin.MAPS.mainMap.clusterer){
			plenty_admin.MAPS.mainMap.clusterer.clearMarkers();
		}else{
			plenty_admin.MAPS.remove_all_polygons(plenty_admin.UI.map.filtered_field_polygons);
		}
		
		plenty_admin.UI.map.filtered_field_polygons = [];
	
		//console.log("fields", fields);
		
		//extract unique crop types from provided field boundaries
		fieldBoundaries.forEach(function(field, p){
			var cropTypeExists = $.grep(plenty_admin.UI.map.allCropTypes, function(crop, c){
				return crop.label === field.cropTypeName;
			}).length > 0;
			
			
			if(!cropTypeExists){
				plenty_admin.UI.map.allCropTypes[field.cropTypeName.replace(/ /g, "")] = field.cropTypeName;
			}
		});
		
		
		console.log("plenty_admin.UI.map.allCropTypes", plenty_admin.UI.map.allCropTypes);
		
		//add a legend to the map based on the filtered fields
		plenty_admin.UI.brand_palette.setNumberRange(0, (Object.keys(plenty_admin.UI.map.allCropTypes).length > 0 ? Object.keys(plenty_admin.UI.map.allCropTypes).length : 100));
		
		var legendItems = {};
		var inc = 0;
		//for(var c=0; c<allCropTypes.length; c++){
		for(id in plenty_admin.UI.map.allCropTypes){
			if(plenty_admin.UI.map.allCropTypes.hasOwnProperty(id)){
				legendItems[id] = {
									color: "#"+plenty_admin.UI.brand_palette.colourAt(inc), 
									colour: "#"+(plenty_admin.UI.map.allCropTypes[id].toLowerCase() === "none" || plenty_admin.UI.map.allCropTypes[id].toLowerCase() === "nocroptypesfound" ? "000000" : plenty_admin.UI.brand_palette.colourAt(inc)), 
									label : plenty_admin.UI.map.allCropTypes[id]
								};
				inc += 1;
			}
		}
		
		if(plenty_admin.MAPS.legend){
			plenty_admin.MAPS.update_map_legend(legendItems);
		}else{
			plenty_admin.MAPS.add_map_legend(plenty_admin.MAPS.mainMap, legendItems);
		}
		
		fieldBoundaries.forEach(function(field,i){
			//console.log("field", field);
			var boundaryLatLngs = [];
			//console.log("sortedFieldBoundaryPoints", sortedFieldBoundaryPoints);
			
			field.boundaryPointDtos.forEach(function(xy,i){
				var latlng = new google.maps.LatLng(xy.latitude, xy.longitude, true);
				latlng.seqNumber = xy.seqNumber;
				boundaryLatLngs.push(latlng);
				
				if(
					zoomFields === undefined 
					|| zoomFields === null 
					|| zoomFields === false
				){
					plenty_admin.UI.map.latlngbounds.extend(boundaryLatLngs[i]);
				}
			});
			
			//console.log("processed boundary: ", boundaryLatLngs);
			
			var fieldNameObj = $.grep(fieldIDs, function(_field, f){
				return field.fieldId === _field.id;
			});
			
			var fieldName = "NO NAME";
			(fieldNameObj.length > 0 ? fieldName = fieldNameObj[0].name : null);
			
			//if the boundary has points, draw them and center the map on them
			if(boundaryLatLngs.length > 2){
				var fieldData = {
					boundaries: boundaryLatLngs,
					editable: false,
					fieldId: field.fieldId,
					id: field.fieldId,
					fieldName: fieldName,
					isCoords: true,
					//isCluster: false,
					cropType: field.cropTypeName
				};
				
				var poly_events = {
					onEdit: function(event){ //onEdit handler
						//console.log("Poly Drawn / edited: ", event);
					}, 
					onMouseOver: function(event){ //onMouseOver handler
						//console.log("poly mouseover: ", this, event);
						var that = this;
						this.setOptions({
							strokeOpacity: 1,
							fillOpacity: .65
						});
						
						plenty_admin.MAPS.polygon_tooltip.show([
																"<div class='polyToolTip polyToolTip_"+fieldData.id+"'>",
																"<p>Name:<br><strong>",
																	fieldData.fieldName,
																"</strong></p>",
																"<p>",
																	"Crop:<br><strong>"+plenty_admin.HELPER.capitalizeFirstLetter(fieldData.cropType)+"</strong>",
																"</p>",
																"<p>Acreage:<br><strong>",
																	fieldData.acreage ? fieldData.acreage : plenty_admin.MAPS.get_polygon_area(that),
																"</strong></p>",
																"<p class='growthStage'>Growth Stage:<br><strong>",
																	(that.growthStage ? that.growthStage.name : plenty_admin.REST.fields
																			.getGrowthStageById(fieldData.growthStageId ? fieldData.growthStageId : 1, 								
																			function(growthStage){
																				that.growthStage = growthStage;
																				$("#tt .polyToolTip_"+fieldData.id+" .growthStage strong")
																				.text(growthStage.name);
																			})),
																"</strong></p>",
																"<p class='mbn'>Click for options</p>"
															].join(""));
					}, 
					onMouseOut: function(event){ //onMouseOut handler
						//console.log("poly mouseout: ", this, event);
						this.setOptions({
							strokeOpacity: .8,
							fillOpacity: .35
						});
						
						plenty_admin.MAPS.polygon_tooltip.hide();
					}, 
					onMouseMove: function(event){ //onMouseOut handler
						//console.log("poly mouseout: ", this, event);
						this.setOptions({
							strokeOpacity: .8,
							fillOpacity: .35
						});
					}, 
					onClick: function(event){
						//if a marker sitting on top of a field has been clicked
						//do not trigger the polygon click event
						if(plenty_admin.UI.map.clickedEquipment){
							plenty_admin.UI.map.clickedEquipment = false;
							return;
						}
						console.log("polygon clicked");
						var _this = this;
						var checkDouble = setTimeout(function(){
							if(!_this.isDblClick){
								var lat = event.latLng.lat();
								var lng = event.latLng.lng();
								$("body").addClass("loading");
								// populate yor box/field with lat, lng
								plenty_admin.REST.fields.getFieldById(_this.id, function(fieldObj){
									$("body").removeClass("loading");
									var fullFieldObject = $.extend(fieldData, fieldObj);
									fullFieldObject.rc_lat = event.latLng.lat();
									fullFieldObject.rc_lng = event.latLng.lng();
									
									//console.log("fullFieldObject", fullFieldObject);
									plenty_admin.MAPS.show_polygon_context_menu(fullFieldObject, plenty_admin.MAPS.mainMap, "map_context_menu", _this);
								});
								plenty_admin.MAPS.polygon_tooltip.hide();
							}else{
								_this.isDblClick = false;
							}
						}, 400);
					},
					onDoubleClick: function(event){ //onClick handler
						event.stop();
						this.isDblClick = true;
						console.log("polygon double clicked: ", event);
						
						plenty_admin.HELPER.showLoadingOverlay();
						var thisPoly = this;
						//var polyPath = this.getPath().getArray();
						
						
						var polyPath = [];
						thisPoly.getPath().getArray().forEach(function(point, p){
							var latlng = {
								latitude: point.lat(),
								longitude: point.lng(),
								seqNumber: p
							}
							polyPath.push(latlng);
						});
						
						var _MouseEvent = null;
						
						for(prop in event){
							if(event.hasOwnProperty(prop)){
								//console.log("event properties: ", prop, event[prop] instanceof MouseEvent);
								if( event[prop] instanceof MouseEvent){
									_MouseEvent = event[prop];
									break;
								}
							}
						}
						
						
						//only move to field screen
						//if a polygon has been clicked, not a marker
						if($(_MouseEvent && _MouseEvent.target).hasClass("marker")){
							console.log("marker clicked instead of poly - return!");
							return;
						}else{
							plenty_admin.HELPER.showLoadingOverlay();
						}
						
						//get field by ID
						plenty_admin.REST.fields.getFieldById(this.id, function(fieldObj){
							//console.log("polyPath", polyPath);
							fieldObj.fillColor = thisPoly.fillColor;
							fieldObj.strokeColor = thisPoly.strokeColor;
							fieldObj.boundaries = polyPath;
							fieldObj.isCoords = false;
						
							//build the breadcrumb trail object
							var field_breadcrumb = [
								{
									class:"back",
									name:"Map",
									clickHandler:function(){
										plenty_admin.UI.currentScreen
										.fadeOut("normal", function(){
											plenty_admin.UI.field.clear();
											plenty_admin.UI.currentScreen = plenty_admin.UI.map.DOM;
											plenty_admin.UI.currentScreen
											.closest(".fill-area")
											.fadeIn("normal")
											.parent()
											.find(".filter_controls")
											.fadeIn("fast", function(){
												google.maps.event.trigger(plenty_admin.MAPS.mainMap, 'resize'); 
												plenty_admin.MAPS.mainMap.fitBounds(plenty_admin.UI.map.latlngbounds);
											});
										});
										return false;
									}
								},
								{
									class:"active",
									name:fieldObj.name,
									clickHandler:null
								}
							];
							
							plenty_admin.UI.field.DOM
							.find(".breadcrumb-trail")
							.remove()
							.end()
							.prepend(plenty_admin.UI.build_breadcrumb_trail(field_breadcrumb));
							
							plenty_admin.UI.field.init(fieldObj, "map");
						});
					}
				};
				
				var polygon = plenty_admin.MAPS.draw_polygon(fieldData, poly_events, plenty_admin.MAPS.mainMap);
				
				plenty_admin.UI.map.filtered_field_polygons.push(polygon);
			}	
			
		});
		
		if(
			fieldBoundaries.length > 0){
				if(
					zoomFields === true
					|| zoomFields === undefined
					|| zoomFields === null
				){
					//center and zoom the map to the bounds of the polygons
					plenty_admin.MAPS.mainMap.fitBounds(plenty_admin.UI.map.latlngbounds);
				}
		}
		
		//recenter fields if map size changes
		$(window).on("resize",function(){
			if(plenty_admin.MAPS.edit_field_state == 1){
				plenty_admin.MAPS.zoomToPolygon(plenty_admin.MAPS.polygonToEdit, plenty_admin.MAPS.mainMap);
			}else{
				plenty_admin.MAPS.mainMap.fitBounds(plenty_admin.UI.map.latlngbounds);
			}
		});
		
		//plenty_admin.HELPER.hideLoadingOverlay();
		plenty_admin.DATA.eventCollector.done("boundary points");
		//cluster the polygons and render clusters on the map
		//plenty_admin.MAPS.mainMap.clusterer = new MarkerClusterer(plenty_admin.MAPS.mainMap, plenty_admin.UI.map.filtered_field_polygons);
	});
}

$( document ).on( "map_data_ready", function( event, orgs ) {
    plenty_admin.UI.map.init();

	//populate filter panel options based on current user filters
	plenty_admin.DATA.load_user_filters(function(filters){	
		console.log("filters", filters);
		plenty_admin.DATA.userFilters = filters().data;
		plenty_admin.DATA.data_source = plenty_admin.DATA.userFilters.possibleFilteringEntitiesDtoList;
		plenty_admin.DATA.update_filters(null, true);
	});
});