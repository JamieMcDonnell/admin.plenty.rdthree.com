//*********************** map.js **************************//
//create namespace for map layout
plenty_admin.UI.map = {};
plenty_admin.UI.map.DOM = plenty_admin.UI.DOM.find("#map-container");
plenty_admin.UI.map.filterControls = $(".filter_controls");
plenty_admin.UI.map.toggleFilters = plenty_admin.UI.map.filterControls.find(".toggleFilters a");
plenty_admin.UI.map.farms_quickfilter = plenty_admin.UI.map.filterControls.find(".quickFilter_farms");
plenty_admin.UI.map.orgs_quickfilter = plenty_admin.UI.map.filterControls.find(".quickFilter_organizations");
plenty_admin.UI.map.minCLUZoom = 15;
plenty_admin.UI.map.applicableFilters = ["organizations", "farms", "fields", "cropTypes", "plans"];
plenty_admin.UI.map.filtered_field_polygons = [];
//method to initiate the field page
plenty_admin.UI.map.init = function(){
	console.log("plenty_admin.UI.map.init");
	plenty_admin.UI.currentScreen = plenty_admin.UI.map.DOM;
	plenty_admin.MAPS.add_field_state = 1;
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
		
		//add the location search tools to the map
		//plenty_admin.MAPS.location_search(plenty_admin.MAPS.map, plenty_admin.UI.map.DOM);
		
		//update the map when the user finishes interacting with it
		plenty_admin.MAPS.set_on_idle_event(plenty_admin.MAPS.mainMap, function(e){
			console.log("map bounds changed");
			
			var zoom = plenty_admin.MAPS.mainMap.getZoom();
			//console.log("map bounds: ", bounds.getNorthEast(), bounds.getSouthWest());
			console.log("map zoom: ", zoom);
			
			//always show equipment pins when zoom or pan
			if(plenty_admin.DATA.userFilters){
				plenty_admin.UI.map.add_equipment_to_map();
			}
		});
		plenty_admin.MAPS.set_on_click_event(plenty_admin.MAPS.mainMap, function(e){
			console.log("map clicked");
			plenty_admin.UI.filters.toggleFilters("close");	
			plenty_admin.UI.map.farms_quickfilter.popover("hide");
			plenty_admin.UI.map.orgs_quickfilter.popover("hide");
		});
		
		plenty_admin.MAPS.add_field_control(plenty_admin.MAPS.mainMap);
		plenty_admin.MAPS.add_zoom_to_fields_control(plenty_admin.MAPS.mainMap);
		
		//prepare all data type lists and wait till they've loaded
		plenty_admin.DATA.eventCollector = window.eventcollector(4, 10000);
		plenty_admin.REST.getCropTypes();
		plenty_admin.REST.getTillageTypes();
		plenty_admin.REST.getIrrigationTypes();
		plenty_admin.REST.getEquipmentTypes();
		
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
	});
	
}

plenty_admin.UI.map.add_equipment_to_map = function(boundary){
	var bounds = plenty_admin.MAPS.mainMap.getBounds();
	var boundary = {};
	
	boundary.maxLongitude = bounds.getNorthEast().F;
	boundary.minLongitude = bounds.getSouthWest().F;
	boundary.maxLatitude = bounds.getNorthEast().A;
	boundary.minLatitude = bounds.getSouthWest().A;
	
	plenty_admin.REST.fields.getEquipmentLocationForFilter(boundary, function(equipmentData){
		console.log("Equipment", equipmentData);
		//get array of equipment elements
		var equipment = equipmentData;
		
		//loop the equipment
		equipment.forEach(function(equip, e){
			//get a google latlng object for each element
			var latlng = new google.maps.LatLng(equip.latitude, equip.longitude);
			
			//extend the map boundary to include all points
			boundaryLatLngs.push(latlng);
			plenty_admin.UI.map.latlngbounds.extend(boundaryLatLngs[i]);
			
			//create the equipment item object
			equip.image = "img/map-markers/default.png";
			
			//draw the pin on the map
			plenty_admin.MAPS.draw_pin(
				latlng, 
				function(event){ //mouseover event
					
				}, 
				function(event){ //mouseout event
					
				}, 
				function(event){ //click event
					
				}, 
				equip //the equipment object
			);
		});
		
		if(equipment.length > 0){
			plenty_admin.MAPS.mainMap.fitBounds(plenty_admin.UI.map.latlngbounds);
			var markerCluster = new MarkerClusterer(plenty_admin.MAPS.mainMap, plenty_admin.MAPS.equipment_pins);
		}
	});
}

plenty_admin.UI.map.populate = function(fieldIDs){
	// loop filtered fields and put them on the map
	//plenty_admin.MAPS.zoomToPolygon(polygon);
	console.log("plenty_admin.UI.map.populate", fieldIDs);
	plenty_admin.UI.map.latlngbounds = new google.maps.LatLngBounds();
	
	//get the boundary points, grouped by field ID for the current filter
	plenty_admin.REST.get_x_by_filtered("BoundaryPoints", function(boundaryPoints){
		console.log("boundaryPoints", boundaryPoints().data);
		var fieldBoundaries = boundaryPoints().data;
		
		//clear the map
		if(plenty_admin.MAPS.mainMap.clusterer){
			plenty_admin.MAPS.mainMap.clusterer.clearMarkers();
		}
		
		var allCropTypes =  {};
	
		//console.log("fields", fields);
		
		//extract unique crop types from provided field boundaries
		fieldBoundaries.forEach(function(field, p){
			var cropTypeExists = $.grep(allCropTypes, function(crop, c){
				return crop.label === field.cropTypeName;
			}).length > 0;
			
			
			if(!cropTypeExists){
				allCropTypes[field.cropTypeName.replace(/ /g, "")] = field.cropTypeName;
			}
		});
		
		
		console.log("allCropTypes", allCropTypes);
		
		//add a legend to the map based on the filtered fields
		plenty_admin.UI.brand_palette.setNumberRange(0, (Object.keys(allCropTypes).length > 0 ? Object.keys(allCropTypes).length : 100));
		
		var legendItems = {};
		var inc = 0;
		//for(var c=0; c<allCropTypes.length; c++){
		for(id in allCropTypes){
			if(allCropTypes.hasOwnProperty(id)){
				legendItems[id] = {color: "#"+plenty_admin.UI.brand_palette.colourAt(inc), colour: "#"+(allCropTypes[id].toLowerCase() === "none" || allCropTypes[id].toLowerCase() === "nocroptypesfound" ? "000000" : plenty_admin.UI.brand_palette.colourAt(inc)), label : allCropTypes[id]};
				inc += 1;
			}
		}
		
		if(plenty_admin.MAPS.legend){
			plenty_admin.MAPS.update_map_legend(legendItems);
		}else{
			plenty_admin.MAPS.add_map_legend(plenty_admin.MAPS.mainMap, legendItems);
		}
		
		plenty_admin.UI.map.filtered_field_polygons = [];
		
		fieldBoundaries.forEach(function(field,i){
			//console.log("field", field);
			var boundaryLatLngs = [];
			//console.log("sortedFieldBoundaryPoints", sortedFieldBoundaryPoints);
			
			field.boundaryPointDtos.forEach(function(xy,i){
				var latlng = new google.maps.LatLng(xy.latitude, xy.longitude, true);
				latlng.seqNumber = xy.seqNumber;
				boundaryLatLngs.push(latlng);
				plenty_admin.UI.map.latlngbounds.extend(boundaryLatLngs[i]);
			});
			
			console.log("processed boundary: ", boundaryLatLngs);
			
			//if the boundary has points, draew them and center the map on them
			if(boundaryLatLngs.length > 2){
				var fieldData = {
					boundaries: boundaryLatLngs,
					editable: false,
					fieldId: field.fieldId,
					id: field.fieldId,
					fieldName: $.grep(fieldIDs, function(_field, f){
						return field.fieldId === _field.id;
					})[0].name,
					isCoords: true,
					isCluster: true,
					cropType: field.cropTypeName
				};
				
				var poly_events = {
					onEdit: function(event){ //onEdit handler
						//console.log("Poly Drawn / edited: ", event);
					}, 
					onMouseOver: function(event){ //onMouseOver handler
						//console.log("poly mouseover: ", this, event);
						this.setOptions({
							strokeOpacity: 1,
							fillOpacity: .65
						});
						
						plenty_admin.MAPS.polygon_tooltip.show("<strong>"+fieldData.fieldName+"</strong><br /><p>Right click for options</p>");
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
					onRightClick: function(event){
						var lat = event.latLng.lat();
						var lng = event.latLng.lng();
						// populate yor box/field with lat, lng
						//alert("Show Add Equipment Option - Lat=" + lat + "; Lng=" + lng);
						plenty_admin.REST.fields.getFieldById(this.id, function(fieldObj){
							var fullFieldObject = $.extend(fieldData, fieldObj);
							fullFieldObject.rc_lat = event.latLng.lat();
							fullFieldObject.rc_lng = event.latLng.lng();
							
							console.log("fullFieldObject", fullFieldObject);
							plenty_admin.MAPS.show_polygon_context_menu(fullFieldObject, plenty_admin.MAPS.mainMap, "map_context_menu");
						});
						plenty_admin.MAPS.polygon_tooltip.hide();
					},
					onClick: function(event){ //onClick handler
						console.log("polygon clicked: ", this.getPath().getArray());
						var thisPoly = this;
						var polyPath = this.getPath().getArray();
						
						console.log("polyPath 111", polyPath);
						//get field by ID
						plenty_admin.REST.fields.getFieldById(this.id, function(fieldObj){
							fieldObj.fillColor = thisPoly.fillColor;
							fieldObj.strokeColor = thisPoly.strokeColor;
							fieldObj.boundaries = polyPath;
						
							//build the breadcrumb trail object
							var field_breadcrumb = [
								{
									class:"back",
									name:"Map",
									clickHandler:function(){
										plenty_admin.UI.currentScreen
										.fadeOut("normal", function(){
											plenty_admin.UI.currentScreen = plenty_admin.UI.map.DOM;
											plenty_admin.UI.currentScreen
											.closest(".fill-area")
											.fadeIn("normal")
											.parent()
											.find(".filter_controls")
											.fadeIn("fast");
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
				
				var polygon = plenty_admin.MAPS.draw_polygon(fieldData, poly_events);
			}	
		});
		
		if(fieldBoundaries.length > 0){
			//center and zoom the map to the bounds of the polygons
			plenty_admin.MAPS.mainMap.fitBounds(plenty_admin.UI.map.latlngbounds);
		}
		
		//cluster the polygons and render clusters on the map
		plenty_admin.MAPS.mainMap.clusterer = new MarkerClusterer(plenty_admin.MAPS.mainMap, plenty_admin.UI.map.filtered_field_polygons);
	});
}

$( document ).on( "map_data_ready", function( event, orgs ) {
    plenty_admin.UI.map.init();

	//populate filter panel options based on current user filters
	plenty_admin.DATA.load_user_filters(function(filters){	
		plenty_admin.DATA.userFilters = filters().data;
		plenty_admin.DATA.data_source = plenty_admin.DATA.userFilters.possibleFilteringEntitiesDtoList;
		plenty_admin.DATA.update_filters(function(){
			console.log("init filters");
			plenty_admin.UI.map.add_equipment_to_map();
		}, true);
	});
});