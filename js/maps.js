// create the maps namespace in the admin object
plenty_admin.MAPS = {};
plenty_admin.MAPS.strokeColour = '#758e1b';
plenty_admin.MAPS.fillColour = '#758e1b';
plenty_admin.MAPS.selectedPolygon = {};
plenty_admin.MAPS.clu_boundaries = [];
plenty_admin.MAPS.equipment_pins = [];
plenty_admin.MAPS.add_field_state = 0; // 0=not editing, 1=clu chosen but not confirmed, 2=clu confirmed
plenty_admin.MAPS.edit_field_state = 0;
plenty_admin.MAPS.static_maps_url_base = "https://maps.googleapis.com/maps/api/staticmap?";
plenty_admin.MAPS.api_key = "AIzaSyDePtID2AxWnYcPJdCKTZd9b0jRIOrrj4E";

// method to init and set up a new add field map
plenty_admin.MAPS.add_field = function(mapId, location, zoom, map_search_target) {
	var MAPS = plenty_admin.MAPS;
	var mapOptions = {
			center: location,
			mapTypeId: google.maps.MapTypeId.HYBRID,
			zoom: (zoom ? zoom : 12),
			mapTypeControl:false,
			streetViewControl:false
		  }
	plenty_admin.MAPS.map = MAPS.create_map(mapId, mapOptions);
	plenty_admin.MAPS.set_on_idle_event(plenty_admin.MAPS.map, function(e){
		console.log("map bounds changed");
		plenty_admin.MAPS.show_clu_boundaries(plenty_admin.MAPS.map);
	});
	//MAPS.drawingManager.init(add_field_map);
	MAPS.location_search(plenty_admin.MAPS.map, map_search_target);
}

//get CLU boundaries for current map bounds
plenty_admin.MAPS.show_clu_boundaries = function(map){
	var bounds = map.getBounds();
	var zoom = map.getZoom();
	console.log("map bounds: ", bounds.getNorthEast(), bounds.getSouthWest());
	console.log("map zoom: ", zoom);
	
	//if add field state is good get the CLU data and render it to the map
	if(
		plenty_admin.MAPS.add_field_state == 0
	){
		var boundary = {};
		boundary.maxLongitude = bounds.getNorthEast().lng();
		boundary.minLongitude = bounds.getSouthWest().lng();
		boundary.maxLatitude = bounds.getNorthEast().lat();
		boundary.minLatitude = bounds.getSouthWest().lat();
		plenty_admin.HELPER.showLoadingOverlay("Loading", "Field Boundaries");
		plenty_admin.REST.fields.getCLUBoundaryPointsForBoundingBox(boundary, plenty_admin.MAPS.render_CLU_boundaries, map);
	}
}

plenty_admin.MAPS.edit_field = function(fieldData) {
	var MAPS = plenty_admin.MAPS;
	
	plenty_admin.MAPS.draw_field_on_map(fieldData, "edit-field-map-canvas", {
					//center: itemLatLng,
					mapTypeId: google.maps.MapTypeId.HYBRID,
					zoom:  12,
					//disableDefaultUI: true,
					//draggable: false, 
					//zoomControl: false, 
					//scrollwheel: false, 
					//disableDoubleClickZoom: true
				  }, function(map, fieldObj, polygon){
		//open infoWindow with the fields data for editing
		var paths = polygon.getPath();
		$.extend(fieldData, fieldObj);
		fieldData.boundaries = paths;
		console.log("fieldData", fieldData);
		plenty_admin.MAPS.showEditFieldForm(fieldData, map, polygon);
	}, false, "map");
}

// create the map at a given location and return it
plenty_admin.MAPS.create_map = function(mapId, mapOptions) {
	plenty_admin.MAPS.geocoder = new google.maps.Geocoder();
	google.maps.Polygon.prototype.getBounds = function() {
		var bounds = new google.maps.LatLngBounds();
		var paths = this.getPaths();
		var path;        
		for (var i = 0; i < paths.getLength(); i++) {
			path = paths.getAt(i);
			for (var ii = 0; ii < path.getLength(); ii++) {
				bounds.extend(path.getAt(ii));
			}
		}
		return bounds;
	}
	
	return new google.maps.Map(document.getElementById(mapId), mapOptions);
}

plenty_admin.MAPS.set_on_idle_event = function(map, handler){
	google.maps.event.addListener(map, 'idle', handler);
}
plenty_admin.MAPS.set_on_click_event = function(map, handler){
	google.maps.event.addListener(map, 'click', handler);
	google.maps.event.addListener(map, 'dragstart', handler);
}

plenty_admin.MAPS.render_CLU_boundaries = function(boundaries, map){
	console.log("render_CLU_boundaries: ", boundaries, map);
	plenty_admin.MAPS.hide_clu_polygons();
	for(var b=0; b<boundaries.length; b++){
		var boundary = boundaries[b];
		plenty_admin.MAPS.draw_CLU_polygon(boundary, true, null, map);
	}
	plenty_admin.HELPER.hideLoadingOverlay();
}

plenty_admin.MAPS.add_field_control = function(map){
	function AddFieldControl(controlDiv, map) {
		// Set CSS for the control border
		plenty_admin.MAPS.addFieldUI = document.createElement('div');
		plenty_admin.MAPS.addFieldUI.className = "addFieldMapCtrl";
		plenty_admin.MAPS.addFieldUI.style.backgroundColor = '#fff';
		plenty_admin.MAPS.addFieldUI.style.border = '2px solid #fff';
		plenty_admin.MAPS.addFieldUI.style.borderRadius = '3px';
		plenty_admin.MAPS.addFieldUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
		plenty_admin.MAPS.addFieldUI.style.cursor = 'pointer';
		plenty_admin.MAPS.addFieldUI.style.marginTop = '6px';
		plenty_admin.MAPS.addFieldUI.style.marginRight = '6px';
		plenty_admin.MAPS.addFieldUI.style.textAlign = 'center';
		plenty_admin.MAPS.addFieldUI.title = 'Add Field';
		controlDiv.appendChild(plenty_admin.MAPS.addFieldUI);
		
		// Set CSS for the control interior
		plenty_admin.MAPS.addFieldText = document.createElement('div');
		plenty_admin.MAPS.addFieldText.style.color = '#0094de';
		plenty_admin.MAPS.addFieldText.style.fontFamily = 'ff-enzo-web,Helvetica,Arial,sans-serif';
		plenty_admin.MAPS.addFieldText.style.fontSize = '16px';
		plenty_admin.MAPS.addFieldText.style.lineHeight = '20px';
		plenty_admin.MAPS.addFieldText.style.paddingLeft = '5px';
		plenty_admin.MAPS.addFieldText.style.paddingRight = '5px';
		plenty_admin.MAPS.addFieldText.innerHTML = 'Add Field';
		plenty_admin.MAPS.addFieldUI.appendChild(plenty_admin.MAPS.addFieldText);
		
		google.maps.event.addDomListener(plenty_admin.MAPS.addFieldUI, 'click', function(e) {
			var btn = $(e.target);
			
			if(btn.data("state") == "on"){
				btn.data("state", "off");
				
				plenty_admin.MAPS.addFieldUI
				.style.backgroundColor = '#fff';
				
				plenty_admin.MAPS.addFieldText
				.style.color = '#0094de';
				
				if(plenty_admin.MAPS.infoWindow){
					plenty_admin.MAPS.infoWindow.close();
				}
				plenty_admin.MAPS.selected_clu_polygon = null;
				plenty_admin.MAPS.add_field_state = 1;
				plenty_admin.MAPS.hide_clu_polygons();
				
				//show equipment
				plenty_admin.MAPS.show_equipment(plenty_admin.MAPS.equipment_pins, map);
			}else{
				btn.data("state", "on");
				
				plenty_admin.MAPS.addFieldUI
				.style.backgroundColor = '#0094de';
				
				plenty_admin.MAPS.addFieldText
				.style.color = '#fff';
				
				if(plenty_admin.MAPS.mainMap.getZoom() < plenty_admin.UI.map.minCLUZoom){
					plenty_admin.MAPS.mainMap.setZoom(plenty_admin.UI.map.minCLUZoom);
				}
				
				plenty_admin.MAPS.add_field_state = 0;
				plenty_admin.MAPS.show_clu_boundaries(map);
				
				//hide equipment
				plenty_admin.MAPS.hide_equipment(plenty_admin.MAPS.equipment_pins);
				
				plenty_admin.MAPS.set_on_idle_event(map, function(e){
					plenty_admin.MAPS.show_clu_boundaries(map);
				});
			}
		});
	}
	
	var addFieldControlDiv = document.createElement('div');
	var addField = new AddFieldControl(addFieldControlDiv, plenty_admin.MAPS.mainMap);
	
	addFieldControlDiv.index = 1;
	map.controls[google.maps.ControlPosition.TOP_RIGHT].push(addFieldControlDiv);
}

plenty_admin.MAPS.add_zoom_to_fields_control = function(map){
	function ZoomToFieldsControl(controlDiv, map) {
		// Set CSS for the control border
		var controlUI = document.createElement('div');
		controlUI.style.backgroundColor = '#fff';
		controlUI.style.border = '2px solid #fff';
		controlUI.style.borderRadius = '3px';
		controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
		controlUI.style.cursor = 'pointer';
		controlUI.style.marginTop = '6px';
		controlUI.style.marginRight = '6px';
		controlUI.style.textAlign = 'center';
		controlUI.title = 'All Fields';
		controlDiv.appendChild(controlUI);
		
		// Set CSS for the control interior
		var controlText = document.createElement('div');
		controlText.style.color = '#0094de';
		controlText.style.fontFamily = 'ff-enzo-web,Helvetica,Arial,sans-serif';
		controlText.style.fontSize = '16px';
		controlText.style.lineHeight = '20px';
		controlText.style.paddingLeft = '5px';
		controlText.style.paddingRight = '5px';
		controlText.innerHTML = 'All Fields';
		controlUI.appendChild(controlText);
		
		google.maps.event.addDomListener(controlUI, 'click', function() {
			plenty_admin.MAPS.mainMap.fitBounds(plenty_admin.UI.map.latlngbounds);
		});
	}
	
	var zoomToFieldsControlDiv = document.createElement('div');
	var zoomToFields = new ZoomToFieldsControl(zoomToFieldsControlDiv, map);
	
	zoomToFieldsControlDiv.index = 2;
	map.controls[google.maps.ControlPosition.TOP_RIGHT].push(zoomToFieldsControlDiv);
}

plenty_admin.MAPS.add_map_legend = function(map, legendItems){
	var legend_DOM = document.createElement("ul");
	legend_DOM.setAttribute("id", "map_legend");
	
	console.log("legendItems", legendItems, Object.keys(legendItems).length);
	
	if(Object.keys(legendItems).length > 0){
		map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legend_DOM);
		
		plenty_admin.MAPS.legend = $("#map_legend");
		
		plenty_admin.MAPS.update_map_legend(legendItems);
	}
}

plenty_admin.MAPS.update_map_legend = function(legendItems){
	//clear the current legend
	plenty_admin.MAPS.legend.html("");
	for(cropTypeKey in legendItems){
		if(legendItems.hasOwnProperty(cropTypeKey)){
			legendItem = legendItems[cropTypeKey];
			var legendItemDOM = document.createElement("li"); //$("<div id='map_legend'>Crop Types</div>");
			legendItemDOM.setAttribute("class", "legend_item");
			legendItemDOM.innerHTML = "<div class='legend_swatch' style='background-color:"+legendItem.colour+"'></div> "+legendItem.label;
			
			plenty_admin.MAPS.legend
			.append(legendItemDOM);
		}
	}
	
	plenty_admin.MAPS.legendItems = legendItems;
}


plenty_admin.MAPS.get_polygon_area = function(shape){
	var area = google.maps.geometry.spherical.computeArea(shape.getPath()) * 0.00024711;
	console.log("area", area);
	return (area).toFixed(2);
}

plenty_admin.MAPS.drawingManager = {
	selectedShape: null,
	acresField: null,
	acreage: null,
	centerPoint: null,
	that: this,
	MAPS: plenty_admin.MAPS,
	
	clearSelection: function() {
		var dm = plenty_admin.MAPS.drawingManager;
		if (dm.selectedShape) {
			dm.selectedShape.setEditable(false);
			dm.selectedShape = null;
		}
	},
	
	setSelection: function(shape) {
		var dm = plenty_admin.MAPS.drawingManager;
		dm.clearSelection();
		selectedShape = shape;
		shape.setEditable(true);
		google.maps.event.addListener(shape.getPath(), 'set_at', function() {
			MAPS.selectedPolygon.acreage = plenty_admin.MAPS.get_polygon_area(shape);
			dm.acresField.val(MAPS.selectedPolygon.acreage);
		});
	},
	
	deleteSelectedShape: function() {
		var dm = plenty_admin.MAPS.drawingManager;
		if (dm.selectedShape) {
			dm.selectedShape.setMap(null);
		}
	},
	
	init: function(map) {
		var MAPS = plenty_admin.MAPS;
		var dm = MAPS.drawingManager;
		
		dm.drawingManager = new google.maps.drawing.DrawingManager({
			drawingMode: google.maps.drawing.OverlayType.POLYGON,
			drawingControl: true,
			drawingControlOptions: {
				position: google.maps.ControlPosition.BOTTOM_LEFT,
				drawingModes: [
					//google.maps.drawing.OverlayType.MARKER,
					//google.maps.drawing.OverlayType.CIRCLE,
					google.maps.drawing.OverlayType.POLYGON,
					//google.maps.drawing.OverlayType.POLYLINE,
					google.maps.drawing.OverlayType.RECTANGLE
				]
			},
				polygonOptions: {
					fillColor: plenty_admin.MAPS.fillColour,
					strokeColor: plenty_admin.MAPS.strokeColour,
					fillOpacity: .5,
					strokeWeight: 2,
					clickable: false,
					editable: true,
					zIndex: 1
				},
				rectangleOptions: {
					fillColor: plenty_admin.MAPS.fillColour,
					strokeColor: plenty_admin.MAPS.strokeColour,
					fillOpacity: .5,
					strokeWeight: 2,
					clickable: false,
					editable: true,
					zIndex: 1
			}
		});
	  
		dm.drawingManager.setMap(map);
		
		google.maps.event.addListener(dm.drawingManager, 'overlaycomplete', function(event) {
			// switch off drawing mode
			dm.drawingManager.setDrawingMode(null);
			
			//process a polygon
			if (event.type == google.maps.drawing.OverlayType.POLYGON) {
				var newShape = event.overlay;
				newShape.type = event.type;
				google.maps.event.addListener(newShape, 'click', function() {
					console.log("clicked the polygon");
					that.setSelection(newShape);
					plenty_admin.MAPS.openInfoWindow(MAPS.selectedPolygon.centerPoint, map);
				}); 
				
				var shapePath = newShape.getPath();
				
				var area = google.maps.geometry.spherical.computeArea(shapePath);
				
				MAPS.selectedPolygon.acreage = (area).toFixed(2);
				
				dm.setSelection(newShape);
				
				MAPS.selectedPolygon.centerPoint = plenty_admin.MAPS.get_polygon_center(shapePath);
				
				console.log("MAPS.selectedPolygon.centerPoint: ", MAPS.selectedPolygon.centerPoint);
				
				MAPS.showAddFieldForm(area, event, map);
			}
		});
	}
}

plenty_admin.MAPS.get_polygon_center = function(shapePath){
	var bounds = new google.maps.LatLngBounds();
	shapePath.forEach(function(xy, i) {
		bounds.extend(xy);
	});
	return bounds.getCenter();
}

plenty_admin.MAPS.geocode = function(address, callback){
	// get lat lng from address
	var geocoder = new google.maps.Geocoder();
	geocoder.geocode({'address': address}, function(results, status) {
		console.log("geocode: ", results, status);
		if (status == google.maps.GeocoderStatus.OK) {
		  if(callback && typeof callback === "function"){
			  callback(results);  
		  }
		} else {
		  console.warn('Geocoder failed due to: ' + status);
		}
	  });
}

plenty_admin.MAPS.draw_CLU_polygon = function(points, editable, polygonId, map){
	// Define the LatLng coordinates for the polygon's path.
	var polygon_coords = [];
	points.cluBoundaryPoins.forEach(function(xy, i) {
		polygon_coords.push(new google.maps.LatLng(xy.latitude, xy.longitude));
	});
	
	// Construct the polygon.
	var CLU_polygon = new google.maps.Polygon({
		paths: polygon_coords,
		fillColor: "rgb(255,255,255)",
		strokeColor: "rgb(255,255,255)",
		strokeOpacity: 0,
		strokeWeight: 2,
		fillOpacity: 0,
		editable: false
	});
	
	CLU_polygon.id = points.cluBoundary.id;
	
	google.maps.event.addListener(CLU_polygon, "mouseover",function(){
		this.setOptions({
							strokeOpacity: .6,
							fillOpacity: .35
						});
	}); 
	
	plenty_admin.MAPS.selectedPolygon.clu_mouseout = google.maps.event.addListener(CLU_polygon, "mouseout",function(){
		this.setOptions({
							strokeOpacity: 0,
							fillOpacity: 0
						});
	});
	
	google.maps.event.addListener(CLU_polygon, "click",function(event){
		if(plenty_admin.MAPS.infoWindow){
			plenty_admin.MAPS.infoWindow.close();
		}
		this.setOptions({
							strokeOpacity: .6,
							fillOpacity: .35
						});
		plenty_admin.MAPS.suggest_clu_field(CLU_polygon, map);
	});
	
	CLU_polygon.setMap(map);
	
	plenty_admin.MAPS.clu_boundaries.push(CLU_polygon);
	return CLU_polygon;
}

plenty_admin.MAPS.draw_pin = function(pinData, pinEvents, map){
	//console.log("draw_pin:", pinData);
	var nameToClass = pinData.equipmentTypeIds[0].name.toLowerCase().replace(/ /g, "-");
	var markerIcon = plenty_admin.UI.fontIconClasses.indexOf(nameToClass) > -1 ? nameToClass : "unknown";
	var richMarker = new RichMarker({
          position: pinData.latlng,
          map: map,
		  anchor: RichMarkerPosition.BOTTOM,
		  flat: true,
          draggable: true,
          content: '<div class="marker" data-id="'+pinData.id+'" style="background:transparent url(img/map-markers/bg.svg) no-repeat 0 0"><i class="pif pif-'+markerIcon+'"></i><div>'
          });
		  
	if(pinEvents.onMouseOver){
		google.maps.event.addListener(richMarker, "mouseover", pinEvents.onMouseOver); 
	}
	
	if(pinEvents.onMouseOut){
		google.maps.event.addListener(richMarker, "mouseout", pinEvents.onMouseOut); 
	}
	
	if(pinEvents.onClick){
		google.maps.event.addListener(richMarker, "click", pinEvents.onClick); 
	}
	
	if(pinEvents.onDoubleClick){
		google.maps.event.addListener(richMarker, "dblclick", pinEvents.onDoubleClick); 
	}
	
	if(pinEvents.onDragEnd){
		google.maps.event.addListener(richMarker, "dragend", pinEvents.onDragEnd); 
	}
	
	google.maps.event.addListener(richMarker, "ready", function(){
		var that = this;
		var to = setTimeout(function(){
			$(that.markerContent_)
			.find(".marker")
			.addClass("in");
		}, 10);
		
	});
	
	richMarker.id = pinData.id;
	
	plenty_admin.MAPS.equipment_pins.push(richMarker);
	
	return richMarker;
}

plenty_admin.MAPS.draw_polygon = function(fieldData, events, map, pushPoly){	
	//console.log("draw polygon: ", fieldData, events, map);
	// Define the LatLng coordinates for the polygon's path.
	//console.log("draw_polygon:", points, Object.prototype.toString.call(points[0]));
	//console.log("points", points);
	
	var polygon_coords = [];
	
	if(fieldData.isCoords){
		polygon_coords = fieldData.boundaries;
	}else{
		fieldData.boundaries.forEach(function(xy, i) {
			polygon_coords.push(new google.maps.LatLng(xy.latitude, xy.longitude));
		});
	}
	
	var fillColor = (fieldData.fillColor ? fieldData.fillColor : (plenty_admin.MAPS.legendItems && fieldData.cropType ? plenty_admin.MAPS.legendItems[fieldData.cropType.replace(/ /g, "")].colour : plenty_admin.MAPS.strokeColour));
	var strokeColor = (fieldData.strokeColor ? fieldData.strokeColor : (plenty_admin.MAPS.legendItems && fieldData.cropType ? plenty_admin.MAPS.legendItems[fieldData.cropType.replace(/ /g, "")].colour : plenty_admin.MAPS.strokeColour));
	//console.log("polygon_coords", polygon_coords);
	
	// Construct the polygon.
	var field_polygon = new google.maps.Polygon({
		paths: polygon_coords,
		fillColor: fillColor,
		strokeColor: strokeColor,
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillOpacity: 0.35,
		editable: fieldData.editable,
		title: fieldData.fieldName,
		name: fieldData.fieldName
	});
	
	if(fieldData.fieldId){
		field_polygon.id = fieldData.fieldId;
	}
	
	if(fieldData.fieldName){
		field_polygon.name = fieldData.fieldName;
	}
	
	if(fieldData.cropType){
		field_polygon.cropType = fieldData.cropType;
	}
	
	if(fieldData.cluBoundaryId){
		field_polygon.cluBoundaryId = fieldData.cluBoundaryId;
	}
	
	google.maps.event.addListener(field_polygon, 'set_at', ( events.onEdit ? events.onEdit : function(){/*empty*/} ));
	google.maps.event.addListener(field_polygon, 'insert_at', ( events.onEdit ? events.onEdit : function(){/*empty*/} ));
	google.maps.event.addListener(field_polygon, "mouseover", ( events.onMouseOver ? events.onMouseOver : function(){/*empty*/} )); 
	google.maps.event.addListener(field_polygon, "mouseout", ( events.onMouseOut ? events.onMouseOut : function(){/*empty*/} )); 
	google.maps.event.addListener(field_polygon, "click", ( events.onClick ? events.onClick : function(){/*empty*/} )); 
	google.maps.event.addListener(field_polygon, "rightclick", ( events.onRightClick ? events.onRightClick : function(){/*empty*/} )); 
	google.maps.event.addListener(field_polygon, "dblclick", ( events.onDoubleClick ? events.onDoubleClick : function(){/*empty*/} )); 
	
	field_polygon.removePolygon = function(){
		this.setMap(null);
	}
	
	if(fieldData.isCluster){
		lastPath = null,
		lastCenter = null;
		field_polygon.getPosition = function() {
		  var path = this.getPath();
		  if (lastPath == path) {
			return lastCenter;
		  }
		  lastPath = path;
		  var bounds = new google.maps.LatLngBounds();
		  path.forEach(function(latlng, i) {
			bounds.extend(latlng);
		  });
	
		  lastCenter = bounds.getCenter();
		  return lastCenter;
		};
	}else{
		field_polygon.setMap(map);
	}
	
	if(pushPoly === null || pushPoly){
		plenty_admin.UI.map.filtered_field_polygons.push(field_polygon);
	}
	return field_polygon;
}

plenty_admin.MAPS.zoomToPolygon = function(polygon, map){
	map.fitBounds(polygon.getBounds());
}

plenty_admin.MAPS.getBoundsZoomLevel = function(bounds, mapDim) {
    var WORLD_DIM = { height: 256, width: 256 };
    var ZOOM_MAX = 21;

    function latRad(lat) {
        var sin = Math.sin(lat * Math.PI / 180);
        var radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
        return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
    }

    function zoom(mapPx, worldPx, fraction) {
        return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2);
    }

    var ne = bounds.getNorthEast();
    var sw = bounds.getSouthWest();

    var latFraction = (latRad(ne.lat()) - latRad(sw.lat())) / Math.PI;

    var lngDiff = ne.lng() - sw.lng();
    var lngFraction = ((lngDiff < 0) ? (lngDiff + 360) : lngDiff) / 360;

    var latZoom = zoom(mapDim.height, WORLD_DIM.height, latFraction);
    var lngZoom = zoom(mapDim.width, WORLD_DIM.width, lngFraction);

    return Math.min(latZoom, lngZoom, ZOOM_MAX);
}

plenty_admin.MAPS.get_static_maps_url = function(mapDetails){
	var mapUrl = plenty_admin.MAPS.static_maps_url_base;
	for(param in mapDetails){
		if(mapDetails.hasOwnProperty(param)){
			mapUrl += (param + "=" + mapDetails[param]) + "&";
		}
	}
	mapUrl += "key="+plenty_admin.MAPS.api_key;
	return mapUrl;
}

plenty_admin.MAPS.draw_field_on_map = function(fieldObj, map_DOM_id, mapOptions, callback, editable, mapID){
	console.log("draw_field_on_map: ", fieldObj, mapOptions);
	
	var itemLatLng = new google.maps.LatLng(fieldObj.latitude, fieldObj.longitude);
	//console.log("itemLatLng: ", itemLatLng);
	
	if(fieldObj.boundaries){
		//load map
		plenty_admin.MAPS[mapID] = plenty_admin.MAPS.create_map(map_DOM_id, mapOptions);
		
		fieldObj.editable = editable;
		
		var poly_events = {
			onEdit: function(){
				// onEdit handler
				var newArea = plenty_admin.MAPS.get_polygon_area(polygon);
				plenty_admin.MAPS.infoWindowContent
				.find("#edit_field_acres")
				.val(newArea);
			}
		};
		
		var polygon = plenty_admin.MAPS.draw_polygon(fieldObj, poly_events, plenty_admin.MAPS[mapID], mapOptions.pushPoly);
		
		plenty_admin.MAPS.zoomToPolygon(polygon, plenty_admin.MAPS[mapID]);
		
		google.maps.event.trigger(plenty_admin.MAPS[mapID], 'resize');
		
		if(callback && typeof callback === "function"){
			callback(plenty_admin.MAPS[mapID], fieldObj, polygon);  
		}
	}else{
		plenty_admin.REST.fields.getAllBoundaryPointsByFieldAndBoundaryType(fieldObj.id, 1 /* We are only interested in field boundaries here*/, function(boundaries){
			console.log("got boundaries for field: ", boundaries);
			
			//load map
			plenty_admin.MAPS[mapID] = plenty_admin.MAPS.create_map(map_DOM_id, mapOptions);
			
			fieldObj.boundaries = boundaries;
			fieldObj.editable = editable;
			
			var poly_events = {
				onEdit: function(){
					// onEdit handler
					var newArea = plenty_admin.MAPS.get_polygon_area(polygon);
					plenty_admin.MAPS.infoWindowContent
					.find("#edit_field_acres")
					.val(newArea);
					
				}
			};
			
			var polygon = plenty_admin.MAPS.draw_polygon(fieldObj, poly_events, plenty_admin.MAPS[mapID], mapOptions.pushPoly);
			
			plenty_admin.MAPS.zoomToPolygon(polygon, plenty_admin.MAPS[mapID]);
			
			if(callback && typeof callback === "function"){
				callback(plenty_admin.MAPS.map, fieldObj, polygon);  
			}
		});
	}
	
	return fieldObj;
}


plenty_admin.MAPS.processPoints = function(geometry, callback, thisArg) {
    if (geometry instanceof google.maps.LatLng) {
        callback.call(thisArg, geometry);
    } else if (geometry instanceof google.maps.Data.Point) {
        callback.call(thisArg, geometry.get());
    } else {
        geometry.getArray().forEach(function (g) {
            processPoints(g, callback, thisArg);
        });
    }
}

plenty_admin.MAPS.openInfoWindow = function(position, map){
	plenty_admin.MAPS.infoWindow.setContent(plenty_admin.MAPS.infoWindowContent);
	plenty_admin.MAPS.infoWindow.setPosition(position);
	plenty_admin.MAPS.infoWindow.open(map);
}

plenty_admin.MAPS.show_equipment_pin_context_menu = function(pinData, marker){
	console.log("show_equipment_pin_context_menu", pinData, marker);
	if(plenty_admin.MAPS.infoWindow)
	{
		plenty_admin.MAPS.infoWindow.close();
	}
	
	plenty_admin.MAPS.infoWindow = new google.maps.InfoWindow();
	
	$.get("ajax/equipment_pin_context.html", function(contentString){
		//store the returned html
		plenty_admin.MAPS.infoWindowContent = contentString;
		
		google.maps.event.addListener(plenty_admin.MAPS.infoWindow, 'domready', function(content){ 
			plenty_admin.MAPS.infoWindowContent = $(".context-menu");
			
			plenty_admin.MAPS.infoWindowContent
			.find(".delete_equipment a")
			.click(function(){
				//alert("insert equipment");
				plenty_admin.MAPS.delete_fixed_equipment(pinData, ev);
				return false;
			})
			.end()
			.find(".view_equipment_details a")
			.click(function(){
				//alert("insert equipment");
				plenty_admin.UI.field.show_equipment_modal(pinData);
				return false;
			});
		});
		
		plenty_admin.MAPS.openInfoWindow(marker.position, plenty_admin.MAPS.mainMap);
	});
}

plenty_admin.MAPS.show_polygon_context_menu = function(fieldData, map, menu_name, polygon){
	if(plenty_admin.MAPS.infoWindow)
	{
		plenty_admin.MAPS.infoWindow.close();
	}
	
	plenty_admin.MAPS.infoWindow = new google.maps.InfoWindow();
	
	$.get("ajax/"+menu_name+".html", function(contentString){
		//store the returned html
		plenty_admin.MAPS.infoWindowContent = contentString;
		
		google.maps.event.addListener(plenty_admin.MAPS.infoWindow, 'domready', function(content){ 
			plenty_admin.MAPS.infoWindowContent = $(".context-menu");
			
			switch(menu_name){
				case "map_context_menu":
					plenty_admin.MAPS.infoWindowContent
					.find(".edit_field a")
					.click(function(){
						//alert("edit field");
						//plenty_admin.MAPS.edit_field(fieldData);
						if(plenty_admin.MAPS.infoWindow){
							plenty_admin.MAPS.infoWindow.close();
						}
						
						//zoom to field
						plenty_admin.MAPS.zoomToPolygon(polygon, map);
						
						plenty_admin.MAPS.showEditFieldForm(fieldData, map, polygon);
						return false;
					})
					.end()
					.find(".insert_equipment a")
					.click(function(){
						//alert("insert equipment");
						plenty_admin.MAPS.add_fixed_equipment(fieldData, map);
						return false;
					})
					.end()
					.find(".view_field a")
					.click(function(){
						//alert("insert equipment");
						plenty_admin.HELPER.showLoadingOverlay("Loading", "Field");
						var polyPath = [];
						polygon.getPath().getArray().forEach(function(point, p){
							var latlng = {
								latitude: point.lat(),
								longitude: point.lng(),
								seqNumber: p
							}
							polyPath.push(latlng);
						});
						
						//get field by ID
						plenty_admin.REST.fields.getFieldById(polygon.id, function(fieldObj){
							//console.log("polyPath", polyPath);
							fieldObj.fillColor = polygon.fillColor;
							fieldObj.strokeColor = polygon.strokeColor;
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
						return false;
					});
				break;
			}
		});
		
		var clickPoint = new google.maps.LatLng(fieldData.rc_lat, fieldData.rc_lng);
		plenty_admin.MAPS.openInfoWindow(clickPoint, plenty_admin.MAPS.mainMap);
	});
}

plenty_admin.MAPS.delete_field_equipment = function(pinData, marker){
	if(plenty_admin.MAPS.infoWindow){
		plenty_admin.MAPS.infoWindow.close();
	}
	
	plenty_admin.MAPS.infoWindow = new google.maps.InfoWindow();
	
	$.get("ajax/delete-field-equipment.html", function(contentString){
		plenty_admin.MAPS.infoWindowContent = contentString;
		
		google.maps.event.addListener(plenty_admin.MAPS.infoWindow, 'domready', function(content){ 
			plenty_admin.MAPS.infoWindowContent = $(".updateEquipment");
			
			plenty_admin.MAPS.infoWindowContent
			.find("button.disassociate")
			.click(function(){
				
				plenty_admin.REST.deleteFieldEquipment.delete(pinData.fieldEquipmentDto.id)
				.then(
						function(deletedFieldEquipment){
							console.log("field equipment deleted: ", deletedFieldEquipment);
						}, function(){
							bootbox.dialog({
											message: "disassociating a field failed due to a server error",
											className: "danger",
											buttons: {
												danger: {
												  label: "OK",
												  className: "btn-danger",
												  callback: plenty_admin.HELPER.hideLoadingOverlay
												}
											}
										});
							var markerObj = plenty_admin.MAPS.get_pin_from_array(pinData);
							markerObj.marker.setPosition(pinData.latlng);
						}
					);
				
				plenty_admin.MAPS.infoWindow.close();
				return false;
			})
			.end()
			.find("button.cancel")
			.click(function(){
				var markerObj = plenty_admin.MAPS.get_pin_from_array(pinData);
				markerObj.marker.setPosition(pinData.latlng);
				plenty_admin.MAPS.infoWindow.close();
				return false;
			})
			.end()
			.find(".name")
			.text(pinData.name);
		});
		
		plenty_admin.MAPS.openInfoWindow(marker.position, plenty_admin.MAPS.mainMap);
	});
}

plenty_admin.MAPS.update_fixed_equipment_position = function(pinData, marker){
	console.log("update_fixed_equipment_position - pinData: ", pinData);
	if(plenty_admin.MAPS.infoWindow){
		plenty_admin.MAPS.infoWindow.close();
	}
	
	plenty_admin.MAPS.infoWindow = new google.maps.InfoWindow();
	
	$.get("ajax/update-equipment-position.html", function(contentString){
		plenty_admin.MAPS.infoWindowContent = contentString;
		
		google.maps.event.addListener(plenty_admin.MAPS.infoWindow,'closeclick',function(){
			var markerObj = plenty_admin.MAPS.get_pin_from_array(pinData);
			markerObj.marker.setPosition(pinData.latlng);
		});
		
		google.maps.event.addListener(plenty_admin.MAPS.infoWindow, 'domready', function(content){ 
			plenty_admin.MAPS.infoWindowContent = $(".updateEquipment");
			
			plenty_admin.MAPS.infoWindowContent
			.find("button.save")
			.click(function(){
				var markerObj = plenty_admin.MAPS.get_pin_from_array(pinData);
				
				var equipmentDto = pinData;
				equipmentDto.latitude = marker.position.A;
				equipmentDto.longitude = marker.position.F;
				delete equipmentDto.latlng;
				console.log("equipmentDto", equipmentDto);
				
				plenty_admin.REST.updateEquipment.post(equipmentDto)
				.then(
						function(updatedEquipment){
							console.log("equipment updated: ", updatedEquipment);
							
							//remove the pin from the map
							markerObj.marker.setMap(null);
							//remove the pin from the array
							plenty_admin.MAPS.equipment_pins.splice(markerObj.iconIndex, 1);
							//update the pin
							plenty_admin.UI.map.add_equipment_to_map();
							//plenty_admin.MAPS.equipment_pins[markerObj.iconIndex].latitude = marker.position.A;
							//plenty_admin.MAPS.equipment_pins[markerObj.iconIndex].longitude = marker.position.F;
						}
					);
				
				plenty_admin.MAPS.infoWindow.close();
				return false;
			})
			.end()
			.find("button.cancel")
			.click(function(){
				var markerObj = plenty_admin.MAPS.get_pin_from_array(pinData);
				markerObj.marker.setPosition(pinData.latlng);
				plenty_admin.MAPS.infoWindow.close();
				return false;
			})
			.end()
			.find(".lat")
			.text(marker.position.A)
			.end()
			.find(".lng")
			.text(marker.position.F)
			.end()
			.find(".name")
			.text(pinData.name);
		});
		
		plenty_admin.MAPS.openInfoWindow(marker.position, plenty_admin.MAPS.mainMap);
	});
}
plenty_admin.MAPS.get_pin_from_array = function(pinData){
	var iconIndex = null;
	$.grep(plenty_admin.MAPS.equipment_pins, function(pin, p){
		if(pinData.id === $(pin.markerContent_).find(".marker").data("id"))
		{
			iconIndex = p;
		}
	});
	
	return {
			marker: plenty_admin.MAPS.equipment_pins[iconIndex],
			iconIndex: iconIndex
		};
}

plenty_admin.MAPS.update_fixed_equipment_position_and_change_field = function(pinData, fieldData, marker){
	console.log("update_fixed_equipment_position_and_change_field - pinData: ", pinData);
	if(plenty_admin.MAPS.infoWindow){
		plenty_admin.MAPS.infoWindow.close();
	}
	
	plenty_admin.MAPS.infoWindow = new google.maps.InfoWindow();
	
	google.maps.event.addListener(plenty_admin.MAPS.infoWindow,'closeclick',function(){
		var markerObj = plenty_admin.MAPS.get_pin_from_array(pinData);
		markerObj.marker.setPosition(pinData.latlng);
	});
	
	$.get("ajax/change-equipment-position-and-field.html", function(contentString){
		plenty_admin.MAPS.infoWindowContent = contentString;
		
		google.maps.event.addListener(plenty_admin.MAPS.infoWindow, 'domready', function(content){ 
			plenty_admin.MAPS.infoWindowContent = $(".updateEquipment");
			
			plenty_admin.MAPS.infoWindowContent
			.find("button.save")
			.click(function(){
				var markerObj = plenty_admin.MAPS.get_pin_from_array(pinData);
				
				var equipmentDto = pinData;
				equipmentDto.latitude = marker.position.A;
				equipmentDto.longitude = marker.position.F;
				delete equipmentDto.latlng;
				console.log("equipmentDto", equipmentDto);
				
				plenty_admin.DATA.eventCollector = window.eventcollector(2, 10000);
				
				plenty_admin.REST.updateEquipment.post(equipmentDto)
				.then(
					function(updatedEquipment){
						console.log("equipment updated: ", updatedEquipment);
						
						plenty_admin.DATA.eventCollector.done("event 1");
					}
				);
				
				//update field equipment
				var feDto = pinData.fieldEquipmentDto;
				feDto.fieldId = fieldData.id;
				
				plenty_admin.REST.updateFieldEquipment
				.post(feDto)
				.then(function(returnedFE){
					console.log("field equipment updated: ", returnedFE);
					
					plenty_admin.DATA.eventCollector.done("event 2");
				});
					
				plenty_admin.DATA.eventCollector.on('alldone', function(total) {
					//remove the pin from the map
					//markerObj.marker.setMap(null);
					$(markerObj.marker.markerWrapper_).remove();
					//remove the pin from the array
					plenty_admin.MAPS.equipment_pins.splice(markerObj.iconIndex, 1);
					//update the pin
					plenty_admin.UI.map.add_equipment_to_map();
					
					plenty_admin.MAPS.infoWindow.close();
				});	
				
				
				return false;
			})
			.end()
			.find("button.cancel")
			.click(function(){var iconIndex = null;
				$.grep(plenty_admin.MAPS.equipment_pins, function(pin, p){
					//console.log("GREP: ", pin, p);
					if(pinData.id === pin.id)
					{
						iconIndex = p;
					}
				});
				plenty_admin.MAPS.equipment_pins[iconIndex].setPosition(pinData.latlng);
				plenty_admin.MAPS.infoWindow.close();
				return false;
			})
			.end()
			.find(".lat")
			.text(marker.position.A)
			.end()
			.find(".lng")
			.text(marker.position.F)
			.end()
			.find(".equipment_name")
			.text(pinData.name)
			.end()
			.find(".field_name")
			.text(fieldData.name)
		});
		
		plenty_admin.MAPS.openInfoWindow(marker.position, plenty_admin.MAPS.mainMap);
	});
}

plenty_admin.MAPS.add_fixed_equipment = function(fieldData, map){
	if(plenty_admin.MAPS.infoWindow){
		plenty_admin.MAPS.infoWindow.close();
	}
	
	plenty_admin.MAPS.infoWindow = new google.maps.InfoWindow();
	
	$.get("ajax/add-equipment-form.html", function(contentString){
		//store the returned html
		plenty_admin.MAPS.infoWindowContent = contentString;
		
		google.maps.event.addListener(plenty_admin.MAPS.infoWindow, 'domready', function(content){ 
			plenty_admin.MAPS.infoWindowContent = $("form.equipments");
			
			//Set the options in the farms list
			var $equipList = plenty_admin.MAPS.infoWindowContent.find("#add_equipment_type");
			//clear current options
			$equipList
			.find("option")
			.remove();
			
			var equipOptionsHTML = "";
			
			for(id in plenty_admin.DATA.equipmentTypes){
				if(plenty_admin.DATA.equipmentTypes.hasOwnProperty(id)){
					var equip = plenty_admin.DATA.equipmentTypes[id];
					equipOptionsHTML += "<option value='"+id+"'>"+equip.name+"</option>";
				}
			}
			
			$equipList.append(equipOptionsHTML);
			
			//Set the options in the brands list
			var $brandList = plenty_admin.MAPS.infoWindowContent.find("#add_equipment_brand");
			
			$brandList
			.find("option")
			.remove();
			
			//populate equipment type lists:
			var brandTypesHTML = "";
			for(index in plenty_admin.DATA.brandTypes){
				if(plenty_admin.DATA.brandTypes.hasOwnProperty(index)){
					var brand = plenty_admin.DATA.brandTypes[index];
					brandTypesHTML += "<option value='"+brand.id+"'>"+brand.name+"</option>";
				}
			}
			
			
			$brandList
			.append(brandTypesHTML);
			
			//render organization dropdown
			//Set the options in the brands list
			var $orgsList = plenty_admin.MAPS.infoWindowContent.find("#add_equipment_orgs");
			
			$orgsList
			.find("option")
			.remove();
			
			//populate equipment type lists:
			var orgsHTML = "";
			//for(index in plenty_admin.DATA.brandTypes){
			for(var o=0; o<plenty_admin.DATA.userFilters.possibleFilteringEntitiesDtoList.organizations.length; o++){
				var org = plenty_admin.DATA.userFilters.possibleFilteringEntitiesDtoList.organizations[o];
				orgsHTML += "<option value='"+org.id+"'>"+org.name+"</option>";
			}
			
			$orgsList
			.append(orgsHTML)
			.on("change", function(){
				console.log("changed org: ", $(this).val());
				plenty_admin.MAPS.infoWindowContent
				.find(".platformServices")
				.find(".ps_org")
				.hide()
				.end()
				.find(".ps_org_"+$(this).val())
				.show();
			});
			
			var psById = {};
			
			plenty_admin.REST.fields.getPlatformServicesForFilter(function(platformServices){
				//console.log("platformServices", platformServices);
				//render platform service dropdowns
				for(var s=0; s<platformServices.length; s++){
					var ps = platformServices[s];
					if(!psById[ps.organizationId]){
						psById[ps.organizationId] = [ps];
					}else{
						psById[ps.organizationId].push(ps);
					}
				}
				
				//console.log("psById", psById);
				
				var psListsHTML = "";
				var psIndex = 0;
				
				for(id in psById){
					if(psById.hasOwnProperty(id)){
						var _ps = psById[id];
						console.log("_ps", _ps);
						if(_ps.length == 1){
							//show as a label
							psListsHTML += "<input type='text' readonly class='form-control ps_org ps_org_"+_ps[0].organizationId+"'"+(psIndex === 0 ? "" : " style='display:none;'")+" data-id='"+id+"'";
							psListsHTML += " value='"+_ps[0].name+"'";
							psListsHTML += ">";
						}else{
							//show as a dropdown
							psListsHTML += "<select class='form-control equipment_platform_service ps_org ps_org_"+id+"'"+(psIndex === 0 ? "" : " style='display:none;'")+" required placeholder='Choose a platform service'>";
								for(var __ps = 0; __ps < _ps.length; __ps++){
									var ___ps = _ps[__ps];
									psListsHTML += "<option value='"+___ps.id+"'>"+___ps.name+"</option>";
								}
							psListsHTML += "</select>";
						}
						psIndex += 1;
					}
				}
				
				//console.log("psListsHTML", psListsHTML);
				
				plenty_admin.MAPS.infoWindowContent
				.find(".platformServices")
				.append(psListsHTML);
				
			});
			
			plenty_admin.MAPS.infoWindowContent
			.find("#add_equipment_latitude")
			.val(fieldData.rc_lat)
			.end()
			.find("#add_equipment_longitude")
			.val(fieldData.rc_lng)
			.end()
			.find("button.add-equipment")
			.click(function(e){
				var $this = $(this);
				$this.button("loading");
				var equipmentObj = {};
				equipmentObj.equipmentName = plenty_admin.MAPS.infoWindowContent.find("input#add_equipment_name").val();
				equipmentObj.equipmentTypeIds = [];
				plenty_admin.MAPS.infoWindowContent.find("select#add_equipment_type option:selected").each(function(){
					equipmentObj.equipmentTypeIds.push(parseInt($(this).val()));
				});
				equipmentObj.latitude = fieldData.rc_lat;
				equipmentObj.longitude = fieldData.rc_lng;
				equipmentObj.fieldId = parseInt(fieldData.id);
				equipmentObj.brandId = parseInt($brandList.val());
				equipmentObj.organizationId = parseInt($orgsList.val());
				equipmentObj.platformServiceId = parseInt(plenty_admin.MAPS.infoWindowContent.find(".platformServices option:selected").val());
				
				console.log("equipmentObj", equipmentObj);
				plenty_admin.REST.insertFieldEquipment.post(equipmentObj)
				.then(
					function(equipment){
						console.log("added new equipment:", equipment);
						
						plenty_admin.MAPS.infoWindowContent
						.fadeOut("fast", function(){
							plenty_admin.MAPS.infoWindowContent
							.parent()
							.find(".add_equipment_success_wrapper")
							.fadeIn("fast");
							
							plenty_admin.UI.map.add_equipment_to_map();
						});
					},
					function(){
						$this
						.button("reset");
					}
				)
				return false;
			})
			.end()
			.parent()
			.find("button.finish")
			.click(function(){
			plenty_admin.MAPS.infoWindow.close();
				return false;	
			})
			.end()
			.find("button.cancel")
			.click(function(){
				plenty_admin.MAPS.infoWindow.close();
				return false;	
			})
			.end()
			.find("button.newEquipment")
			.click(function(){
				plenty_admin.MAPS.infoWindowContent
				.parent()
				.find(".add_equipment_success_wrapper")
				.fadeOut("fast", function(){
					plenty_admin.MAPS.infoWindowContent
					.fadeIn("fast");
				});
				return false;	
			})
		});
		
		var clickPoint = new google.maps.LatLng(fieldData.rc_lat, fieldData.rc_lng);
		plenty_admin.MAPS.openInfoWindow(clickPoint, map);
	});
}

plenty_admin.MAPS.showEditFieldForm = function(fieldObj, map, polygon) {
	// Since this polygon has only one path, we can call getPath()
	// to return the MVCArray of LatLngs.
	console.log("showEditFieldForm", fieldObj, map);
	plenty_admin.MAPS.infoWindow = new google.maps.InfoWindow();
	plenty_admin.MAPS.polygonToEdit = polygon;
	var that = this;
	var MAPS = plenty_admin.MAPS;
	var originalPolyPath = [];
	function editFieldBoundary(){
		polygon
		.setOptions({
			editable: true
		});
		
		//hide edit form
		plenty_admin.MAPS.infoWindowContent
		.hide()
		.parent()
		.find(".editing_boundary")
		.show();
		
		//hide other polygons
		plenty_admin.MAPS.hide_polygons(plenty_admin.UI.map.filtered_field_polygons, polygon.id);
		
		//hide equipment
		plenty_admin.MAPS.hide_equipment(plenty_admin.MAPS.equipment_pins);
		
		plenty_admin.MAPS.edit_field_state = 1;
		
		return false;
	}
	function endEditFieldBoundary(){
		plenty_admin.MAPS.infoWindowContent
		.show()
		.parent()
		.find(".editing_boundary")
		.hide();
		
		//switch off editable
		polygon
		.setOptions({
			editable: false
		});
		
		//show polygons
		plenty_admin.MAPS.show_polygons(plenty_admin.UI.map.filtered_field_polygons, map);
		
		//show equipment
		plenty_admin.MAPS.show_equipment(plenty_admin.MAPS.equipment_pins, map);
		
		plenty_admin.MAPS.edit_field_state = 0;
	}
	
	polygon.getPath().getArray().forEach(function(point, p){
		originalPolyPath.push(new google.maps.LatLng(point.lat(), point.lng()));
	});
	
	$.get("ajax/edit-field-form.html", function(contentString){
		//store the returned html
		plenty_admin.MAPS.infoWindowContent = contentString;
		
		//when the infoWindow is ready, set up it's contents
		google.maps.event.addListener(plenty_admin.MAPS.infoWindow, 'domready', function(content){ 
			plenty_admin.MAPS.infoWindowContent = $(".edit_field_form_wrapper");
			var cropYearTable = plenty_admin.MAPS.infoWindowContent.find("table.cropYears");
			
			plenty_admin.REST.get_fieldCrops_order_by_year_descending(fieldObj.id, function(fieldData){
				console.log("get_field_order_by_year_descending: ", fieldData);
				
				var fieldCropsByYear = {};
				
				for(var f=0; f<fieldData.length; f++){
					fieldCrop = fieldData[f];
					fieldCropsByYear[parseInt(fieldCrop.year)] = fieldCrop;
				}
				
				fieldObj.cropsByYear = fieldCropsByYear;
			
				//populate all fields with the fieldObj
				plenty_admin.MAPS.infoWindowContent
				.find("input, textarea, checkbox, select")
				.filter(function() {
					return $(this).data('propname') != undefined;
				})
				.each(function(){
					$(this).val(fieldObj[$(this).data("propname")]);
				})
				.end()
				.end()
				.find(".btn.update-field")
				.click(function(){
					var $this = $(this);
					
					plenty_admin.MAPS.infoWindowContent
					.find("input, textarea, checkbox, select")
					.filter(function() {
						return $(this).data('propname') != undefined;
					})
					.each(function(){
						fieldObj[$(this).data("propname")] = $(this).val();
					});
					
					$(this).button("loading");
					
					fieldObj.latitude = polygonCenter.A;
					fieldObj.longitude = polygonCenter.F;
					fieldObj.farmId = parseInt(fieldObj.farmId);
					
					console.log("fieldObj:", fieldObj);
					
					var newFarmField = plenty_admin.MAPS.infoWindowContent.find("#edit_field_new_farm_name");
					
					if(newFarmField.val().length > 0){
						//add a new farm
						plenty_admin.REST.insertFarm.post({name:newFarmField.val()})
						.then(
						function(farm){
							var farm_body = farm.body();
							console.log("farmBody:", farm_body);
							//insert the field here
							fieldObj.farmId = farm_body.id;
							plenty_admin.UI.organization.updateX(fieldObj, "field", $(this), function(){
								plenty_admin.UI.organization.MODAL_edit_field.modal("hide");
							});
							
							if(plenty_admin.context === "settings"){
								//add field to the data set locally
								plenty_admin.DATA.data_source.farms.push(farm_body);
								plenty_admin.UI.updateBadges("farms", plenty_admin.DATA.data_source.farms.length);
							
							
								// add the new field to the table and to the data model
								var $farmTML = $(plenty_admin.UI.create_item(farm_body, "farms"));
								
								plenty_admin.UI.organization.DOM.find("table.farmsList")
								.find(".noItemsText")
								.remove()
								.end()
								.append($farmTML);
								
								plenty_admin.UI.organization.addItemFunctionality($farmTML);
							}else{
								//update the map
							}
						});
					}else{
						plenty_admin.UI.organization.updateX(fieldObj, "field", $(this), function(){
							plenty_admin.UI.organization.MODAL_edit_field.modal("hide");
						});
					}
					
					return false;
				})
				.end()
				.find(".btn.cancel")
				.click(function(){
					plenty_admin.MAPS.infoWindow.close();
					return false;
				})
				.end()
				.find(".btn.edit-boundary")
				.click(function(){
					//make polygon editable
					editFieldBoundary();
					
					// hide other polygons
					
					// hide equipment pins
					
					//center the polygon
					plenty_admin.MAPS.zoomToPolygon(polygon, map);
				})
				.end()
				.parent()
				.find(".btn.save-edited-boundary")
				.click(function(){
					var polygonBounds = polygon.getPath();
					var boundaryPointsArray = [];
					
					// Iterate over the polygonBounds vertices.
					polygonBounds.forEach(function(xy, i) {
						var boundaryPointObj = {};
						boundaryPointObj.seqNumber = i;
						boundaryPointObj.latitude = xy.lat();
						boundaryPointObj.longitude = xy.lng();
						boundaryPointsArray.push(boundaryPointObj);
					});
					
					var boundaryPointsDto = {
						fieldId: polygon.id,
						latLongPairs: boundaryPointsArray
					};
					
					console.log("boundaryPointsDto", boundaryPointsDto);
	
					plenty_admin.REST.updateBoundaryPointsArray.post(boundaryPointsDto).then(
						function(updatedBoundary){
							console.log("updatedBoundary: ", updatedBoundary().data);
							//show edit form
							endEditFieldBoundary();
						},
						function(err){
							bootbox.dialog({
								message: "Polygon Edits were not saved! - "+err.status+" - "+err.statusText,
								className: "danger",
								buttons: {
									danger: {
									  label: "OK",
									  className: "btn-danger",
									  callback: function(){
										 	plenty_admin.HELPER.hideLoadingOverlay();
											//show edit form
											polygon.setPaths(originalPolyPath);
											endEditFieldBoundary();
										}
									}
								}
							});
						}
					);
					
					return false;
				})
				.end()
				.find(".btn.cancel-editing-boundary")
				.click(function(){
					polygon.setPaths(originalPolyPath);
					
					//show edit form
					endEditFieldBoundary();
					
					return false;
				})
				.end()
				.end()
				.find(".showNewFarm")
				.click(function(){
					$(this)
					.hide()
					.parent()
					.find(".showExistingFarm")
					.show()
					.end()
					.closest(".form-group")
					.find(".newFarm")
					.show()
					.end()
					.find(".existingFarm")
					.hide();
					
					return false;
				})
				.end()
				.find(".showExistingFarm")
				.click(function(){
					$(this)
					.hide()
					.parent()
					.find(".showNewFarm")
					.show()
					.end()
					.closest(".form-group")
					.find(".existingFarm")
					.show()
					.end()
					.find(".newFarm")
					.hide();
					return false;
				})
				.end()
				.find("button.addCropYear")
				.click(function(){
					$(this)
					.hide()
					.parent()
					.find(".saveCropYear, .cancelCropYear")
					.show()
					.end()
					.closest(".tab-pane")
					.find("tr.new-crop-year")
					.show();
					return false;
				})
				.end()
				.find("button.cancelCropYear")
				.click(function(){
					$(this)
					.hide()
					.parent()
					.find(".saveCropYear")
					.hide()
					.end()
					.find(".addCropYear")
					.show()
					.end()
					.closest(".tab-pane")
					.find("tr.new-crop-year")
					.hide();
					return false;
				})
				.end()
				.find("button.saveCropYear")
				.click(function(e){
					//save the crop year for this field
					var fieldCropDto = {
						fieldId: fieldObj.id,
						cropTypeId: parseInt(plenty_admin.MAPS.infoWindowContent.find("#edit_field_crop_type option:selected").val()),
						irrigationTypeId: parseInt(plenty_admin.MAPS.infoWindowContent.find("#edit_field_irrigation_type option:selected").val()),
						tillageTypeId: parseInt(plenty_admin.MAPS.infoWindowContent.find("#edit_field_tillage_type option:selected").val()),
						year: plenty_admin.MAPS.infoWindowContent.find("#edit_field_crop_year option:selected").val(),
						growthMethodId: plenty_admin.MAPS.infoWindowContent.find("#edit_field_growthMethod_type option:selected").val()
					};
					
					
					plenty_admin.REST.fields.insertFieldCrop(fieldCropDto, function(fieldCrop){
						console.log("field crop inserted", fieldCrop);
						
						$(e.target)
						.hide()
						.parent()
						.find(".cancelCropYear")
						.hide()
						.end()
						.find(".addCropYear")
						.show()
						.end()
						.closest(".tab-pane")
						.find("tr.new-crop-year")
						.hide();
						
						var newCropYear = "<tr><td>"+fieldCrop.year+"</td>"+
											"<td>"+plenty_admin.DATA.cropTypes[fieldCrop.cropTypeId].name+"</td>"+
											"<td>"+plenty_admin.DATA.tillageTypes[fieldCrop.tillageTypeId].name+"</td>"+
											"<td>"+plenty_admin.DATA.irrigationTypes[fieldCrop.irrigationTypeId].name+"</td>"+
											"<td>"+plenty_admin.DATA.growthMethodTypes[fieldCrop.growthMethodId].name+"</td></tr>";
						cropYearTable
						.find("tbody .new-crop-year")
						.before(newCropYear);
					});
					return false;
				})
				
				//Set the options in the farms list
				var $farmList = plenty_admin.MAPS.infoWindowContent.find("#edit_field_farms");
				//clear current options
				$farmList
				.find("option")
				.remove();
				
				var farmOptionsHTML = "";
				for(var f=0; f<plenty_admin.DATA.data_source.farms.length; f++){
					var farm = plenty_admin.DATA.data_source.farms[f];
					farmOptionsHTML += "<option value='"+farm.id+"'>"+farm.name+"</option>";
				}
				
				$farmList.append(farmOptionsHTML);
				
				//populate crop / tillage / irrigation select lists
				var data_types = ["crop", "irrigation", "tillage", "growthMethod"];
				plenty_admin.UI.populate_type_lists(plenty_admin.MAPS.infoWindowContent, "edit_field", data_types);
				
				//populate the table of crop years already associated with this field
				var cropYearRowsHTML = "";
				for(year in fieldObj.cropsByYear){
					if(fieldObj.cropsByYear.hasOwnProperty(year)){
						console.log("fieldData.cropsByYear", fieldObj.cropsByYear, year, fieldObj.cropsByYear[year]);
						var cropYear = fieldObj.cropsByYear[year];
						var years = [2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005];
						
						cropYearRowsHTML += "<tr data-id='"+cropYear.id+"'><td class='editable' data-type='select' data-source='"+plenty_admin.UI.get_inline_editing_options(years)+"' data-name='year' data-pk='"+cropYear.id+"/fieldCrop/' data-title='Year'>"+year+"</td>"+
											"<td class='editable' data-type='select' data-source='"+plenty_admin.UI.get_inline_editing_options(plenty_admin.DATA.cropTypes)+"' data-name='cropTypeId' data-pk='"+cropYear.id+"/fieldCrop/"+cropYear.cropTypeId+"/"+cropYear.tillageTypeId+"/"+cropYear.irrigationTypeId+"/"+year+"/"+fieldObj.id+"' data-title='Year'>"+plenty_admin.DATA.cropTypes[cropYear.cropTypeId].name+"</td>"+
											"<td class='editable' data-type='select' data-source='"+plenty_admin.UI.get_inline_editing_options(plenty_admin.DATA.tillageTypes)+"' data-name='tillageTypeId' data-pk='"+cropYear.id+"/fieldCrop/"+cropYear.cropTypeId+"/"+cropYear.tillageTypeId+"/"+cropYear.irrigationTypeId+"/"+year+"/"+fieldObj.id+"' data-title='Tillage Type'>"+plenty_admin.DATA.tillageTypes[cropYear.tillageTypeId].name+"</td>"+
											"<td class='editable' data-type='select' data-source='"+plenty_admin.UI.get_inline_editing_options(plenty_admin.DATA.irrigationTypes)+"' data-name='irrigationTypeId' data-pk='"+cropYear.id+"/fieldCrop/"+cropYear.cropTypeId+"/"+cropYear.tillageTypeId+"/"+cropYear.irrigationTypeId+"/"+year+"/"+fieldObj.id+"' data-title='Irrigation Type'>"+plenty_admin.DATA.irrigationTypes[cropYear.irrigationTypeId].name+"</td>"+
											"<td class='editable' data-type='select' data-source='"+plenty_admin.UI.get_inline_editing_options(plenty_admin.DATA.growthMethodTypes)+"' data-name='growthMethodId' data-pk='"+cropYear.id+"/fieldCrop/"+cropYear.cropTypeId+"/"+cropYear.tillageTypeId+"/"+cropYear.irrigationTypeId+"/"+year+"/"+fieldObj.id+"' data-title='Growth Method'>"+plenty_admin.DATA.growthMethodTypes[cropYear.growthMethodId].name+"</td></tr>";
					}
				}
				//set inline editing as inline before setting up this window
				$.fn.editable.defaults.mode = 'inline';
				
				cropYearTable
				.find("tbody .new-crop-year")
				.before(cropYearRowsHTML)
				.end()
				.find(".editable")
				.editable(plenty_admin.REST.inline_editing_options);
			});
		
		});
		
		var polygonCenter = plenty_admin.MAPS.get_polygon_center(fieldObj.boundaries);
		
		plenty_admin.MAPS.openInfoWindow(polygonCenter, map);
	});
}

plenty_admin.MAPS.suggest_clu_field = function(area, map) {
	// Ask the user if they want to use the selected polygon
	//console.log("suggest_clu_field: ", area.latLngs.getArray()[0].getArray());
	plenty_admin.MAPS.infoWindow = new google.maps.InfoWindow();
	var that = this;
	var MAPS = plenty_admin.MAPS;
	var vertices = area.latLngs.getArray()[0].getArray();
	plenty_admin.MAPS.hide_clu_polygons(area);
	plenty_admin.MAPS.add_field_state = 1;
	plenty_admin.MAPS.selected_clu_polygon = area;
	//console.log("vertices: ", vertices);
	
	$.get("ajax/use-clu-field.html", function(contentString){
		//add functionality to the form inside the maps popup
		
		plenty_admin.MAPS.infoWindowContent = contentString;
		
		google.maps.event.addListener(plenty_admin.MAPS.infoWindow,'closeclick',function(){
		   plenty_admin.MAPS.infoWindow.close();
				plenty_admin.MAPS.add_field_state = 0;
				plenty_admin.MAPS.selected_clu_polygon = null;
				area
				.setOptions({
							strokeOpacity: 0,
							fillOpacity: 0
						});
						
				plenty_admin.MAPS.selectedPolygon.clu_mouseout = google.maps.event.addListener(area, "mouseout",function(){
					this.setOptions({
										strokeOpacity: 0,
										fillOpacity: 0
									});
				});
				
				if(plenty_admin.context === "map"){
					plenty_admin.MAPS.add_field_state = 1;
					plenty_admin.MAPS.hide_clu_polygons();
					
					plenty_admin.MAPS.addFieldUI
					.style.backgroundColor = '#fff';
					
					plenty_admin.MAPS.addFieldText
					.style.color = '#0094de';
					
					plenty_admin.UI.map.DOM
					.find(".addFieldMapCtrl div")
					.data("state", "off");
					//plenty_admin.MAPS.selected_clu_polygon.setMap(null);
					
					//show equipment
					plenty_admin.MAPS.show_equipment(plenty_admin.MAPS.equipment_pins, map);
				}else{
					plenty_admin.MAPS.show_clu_polygons();
				}
		});
		
		// Replace the info window's content and position.
		google.maps.event.addListener(plenty_admin.MAPS.infoWindow, 'domready', function(content){ 
			//populate the acres field
			plenty_admin.MAPS.infoWindowContent = $(".use_clu_field_options");
			
			//clear the mouseout event of the polygon while it is selected
			google.maps.event.clearListeners(area, "mouseout");
			
			//set up the add and cancel buttons
			plenty_admin.MAPS.infoWindowContent
			.find("button.yes")
			.click(function(){
				plenty_admin.MAPS.add_field_state = 2;
				$(this).button("loading");
				
				var fieldData = {
					boundaries:vertices,
					editable: true,
					isCoords: true,
					cluBoundaryId:area.id
				};
				
				console.log("fieldData", fieldData);
				
				var poly_events = {
					onMouseOver:function(){/*empty handler*/},
					onMouseOut: function(){/*empty handler*/},
					onEdit: function(event){
						MAPS.selectedPolygon.acreage = plenty_admin.MAPS.get_polygon_area(polygon);	
						var acresField = plenty_admin.MAPS.infoWindowContent.find("#add_field_acres");
						acresField.val(MAPS.selectedPolygon.acreage);
					}, 
					onClick: function(event){
						plenty_admin.MAPS.showAddFieldForm(polygon, event, map);
					}, //onClick handler
				};
				
				//copy the selected polygon to our map
				var polygon = plenty_admin.MAPS.draw_polygon(fieldData, poly_events, map);
				
				plenty_admin.MAPS.zoomToPolygon(polygon, map);
				//plenty_admin.MAPS.selected_clu_polygon.setMap(null);
				plenty_admin.MAPS.hide_clu_polygons();
				MAPS.selectedPolygon.acreage = plenty_admin.MAPS.get_polygon_area(polygon);	
				plenty_admin.MAPS.infoWindow.close();
				plenty_admin.MAPS.showAddFieldForm(polygon, event, map);
				
				// load the add field form into the popup
				return false;
			})
			.end()
			.find("button.no")
			.click(function(){
				plenty_admin.MAPS.infoWindow.close();
				plenty_admin.MAPS.add_field_state = 0;
				plenty_admin.MAPS.selected_clu_polygon = null;
				area
				.setOptions({
							strokeOpacity: 0,
							fillOpacity: 0
						});
						
				plenty_admin.MAPS.selectedPolygon.clu_mouseout = google.maps.event.addListener(area, "mouseout",function(){
					this.setOptions({
										strokeOpacity: 0,
										fillOpacity: 0
									});
				});
				
				if(plenty_admin.context === "map"){
					plenty_admin.MAPS.add_field_state = 1;
					plenty_admin.MAPS.hide_clu_polygons();
					
					plenty_admin.MAPS.addFieldUI
					.style.backgroundColor = '#fff';
					
					plenty_admin.MAPS.addFieldText
					.style.color = '#0094de';
					
					plenty_admin.UI.map.DOM
					.find(".addFieldMapCtrl div")
					.data("state", "off");
					//plenty_admin.MAPS.selected_clu_polygon.setMap(null);
				}else{
					plenty_admin.MAPS.show_clu_polygons();
				}
				
				return false;
			});
		}); 
		MAPS.selectedPolygon.centerPoint = plenty_admin.MAPS.get_polygon_center(vertices);
		plenty_admin.MAPS.openInfoWindow(MAPS.selectedPolygon.centerPoint, map);
	});
}

plenty_admin.MAPS.show_clu_polygons = function(except, map){
	//loop through the CLU boundaries on the map and set their map to null
	for(var b=0; b<plenty_admin.MAPS.clu_boundaries.length; b++){
		var boundary = plenty_admin.MAPS.clu_boundaries[b];
			boundary.setMap(map);
	}
}

plenty_admin.MAPS.hide_clu_polygons = function(except){
	//loop through the CLU boundaries on the map and set their map to null
	for(var b=0; b<plenty_admin.MAPS.clu_boundaries.length; b++){
		var boundary = plenty_admin.MAPS.clu_boundaries[b];
		if(!except){
			boundary.setMap(null);
		}else if(boundary.id !== except.id){
			boundary.setMap(null);
		}
	}
}

plenty_admin.MAPS.hide_polygons = function(polygons, except){
	//loop through the CLU boundaries on the map and set their map to null
	for(var b=0; b<polygons.length; b++){
		var poly = polygons[b];
		if(!except){
			poly.setMap(null);
		}else if(poly.id !== except){
			poly.setMap(null);
		}
	}
}

plenty_admin.MAPS.show_polygons = function(polygons, map){
	//loop through the CLU boundaries on the map and set their map to null
	for(var b=0; b<polygons.length; b++){
		var poly = polygons[b];
			poly.setMap(map);
	}
}

plenty_admin.MAPS.hide_equipment = function(equipment, except){
	//loop through the CLU boundaries on the map and set their map to null
	for(var b=0; b<equipment.length; b++){
		var equip = equipment[b];
		if(!except){
			equip.setMap(null);
		}else if(equip.id !== except){
			equip.setMap(null);
		}
	}
}

plenty_admin.MAPS.show_equipment = function(equipment, map){
	//loop through the CLU boundaries on the map and set their map to null
	for(var b=0; b<equipment.length; b++){
		var equip = equipment[b];
			equip.setMap(map);
	}
}

plenty_admin.MAPS.showAddFieldForm = function(area, event, map) {
	console.log("showAddFieldForm", area);
	// Since this polygon has only one path, we can call getPath()
	// to return the MVCArray of LatLngs.
	var vertices = area.getPaths();
	plenty_admin.MAPS.infoWindow = new google.maps.InfoWindow();
	var that = this;
	var MAPS = plenty_admin.MAPS;
	var dm = MAPS.drawingManager;
	MAPS.selectedPolygon.polygon = area;
	
	$.get("ajax/add-field-form.html", function(contentString){
		//add functionality to the form inside the maps popup
		
		plenty_admin.MAPS.infoWindowContent = contentString;
		
		// Replace the info window's content and position.
		google.maps.event.addListener(plenty_admin.MAPS.infoWindow, 'domready', function(content){ 
			//populate the acres field
			plenty_admin.MAPS.infoWindowContent = $(".add_field.add_to_org_form");
			acresField = plenty_admin.MAPS.infoWindowContent.find("#add_field_acres");
			acresField.val(MAPS.selectedPolygon.acreage);
			
			// get zip code of last point of polygon
			MAPS.geocoder.geocode({'latLng': MAPS.selectedPolygon.centerPoint}, function(results, status) {
				console.log("reverse geo: ", results, status);
				if (status == google.maps.GeocoderStatus.OK) {
				  if (results[0]) {
					//map.setZoom(11);
					var centerPointZIP = results[0].address_components[results[0].address_components.length-1].long_name;
					//populate the acres field
					postcodeField = plenty_admin.MAPS.infoWindowContent.find("#add_field_postalCode");
					postcodeField.val(centerPointZIP);
				  } else {
					console.warn('No reverse geo results found');
				  }
				} else {
				  console.warn('Geocoder failed due to: ' + status);
				}
			  });
			
			
			//set up the add and cancel buttons
			plenty_admin.MAPS.infoWindowContent
			.find(".add-field")
			.click(function(){
				var fieldObj = {};
				var newFarmField = plenty_admin.MAPS.infoWindowContent.find("#add_field_new_farm_name");
				
				function showFieldAddedSuccess(){
					//set the content of the infoWindow
					plenty_admin.MAPS.infoWindowContent
					.parent()
					.parent()
					.find(".btn.finish")
					.click(function(){
						plenty_admin.MAPS.infoWindow.close();
						switch(plenty_admin.context){
							case "map":
								plenty_admin.MAPS.selectedPolygon.polygon.setMap(null);
								plenty_admin.MAPS.selectedPolygon.polygon = null;
								plenty_admin.MAPS.add_field_state = 1;
								plenty_admin.MAPS.hide_clu_polygons();
								
								plenty_admin.MAPS.addFieldUI
								.style.backgroundColor = '#fff';
								
								plenty_admin.MAPS.addFieldText
								.style.color = '#0094de';
								
								plenty_admin.UI.map.DOM
								.find(".addFieldMapCtrl div")
								.data("state", "off");
							break;
							
							case "settings":
								plenty_admin.UI.organization.MODAL_add_field
								.modal("hide");
							break;
						}
						return false;
					})
					.end()
					.find(".btn.newField")
					.click(function(){
						plenty_admin.MAPS.infoWindow.close();
						plenty_admin.MAPS.selectedPolygon.polygon.setMap(null);
						plenty_admin.MAPS.selectedPolygon.polygon = null;
						plenty_admin.MAPS.show_clu_polygons(map);
						plenty_admin.MAPS.add_field_state = 0;
						
						plenty_admin.MAPS.selected_clu_polygon
						.setOptions({
									strokeOpacity: 0,
									fillOpacity: 0
								});
								
						google.maps.event.addListener(plenty_admin.MAPS.selected_clu_polygon, "mouseout",function(){
							this.setOptions({
												strokeOpacity: 0,
												fillOpacity: 0
											});
						});
						plenty_admin.MAPS.selected_clu_polygon = null;
						return false;
					})
					.end()
					.find(".add_field_form_wrapper")
					.fadeOut("fast", function(){
						plenty_admin.MAPS.infoWindowContent
						.parent()
						.parent()
						.find(".add_field_success_wrapper")
						.fadeIn("fast");
					})
				}
				
				plenty_admin.MAPS.infoWindowContent
				.find("input, textarea, checkbox, select")
				.filter(function() {
					return $(this).data('propname') != undefined;
				})
				.each(function(){
					fieldObj[$(this).data("propname")] = ($(this).val() && $(this).val() != undefined ? $(this).val() : 1);
				});
				
				$(this).button("loading");
				
				fieldObj.latitude = MAPS.selectedPolygon.centerPoint.A;
				fieldObj.longitude = MAPS.selectedPolygon.centerPoint.F;
				
				if(area.cluBoundaryId > -1){
					fieldObj.cluBoundaryId = area.cluBoundaryId;
				}
				
				console.log("fieldObj:", fieldObj);
				
				console.log("newFarmField:", newFarmField, newFarmField.val().length);

				if(newFarmField.val().length > 0){
					//add a new farm
					plenty_admin.REST.insertFarm.post({name:newFarmField.val()})
					.then(
						function(farm){
							var farm_body = farm.body();
							console.log("farmBody:", farm_body);
							
							//insert the field here
							fieldObj.farmId = parseInt(farm_body.id);
							plenty_admin.REST.fields.insertFieldWithInterestAndBoundaryPoints(fieldObj, 100, showFieldAddedSuccess);
							
							//add field to the data set locally
							plenty_admin.DATA.data_source.farms.push(farm_body);
							
							if(plenty_admin.context === "settings"){
								plenty_admin.UI.updateBadges("farms", plenty_admin.DATA.data_source.farms.length);
								
									// add the new field to the table and to the data model
								var $farmTML = $(plenty_admin.UI.create_item(farm_body, "farms"));
								
								plenty_admin.UI.organization.DOM
								.find("table.farmsList")
								.find(".noItemsText")
								.remove()
								.end()
								.append($farmTML);
								
								plenty_admin.UI.organization.addItemFunctionality($farmTML);
							}else{
								//update the map
								if(plenty_admin.context === "map"){
									plenty_admin.DATA.update_filters(function(returned_filters){
										//console.log("filters updated: ", returned_filters, returned_filters.body());
										plenty_admin.DATA.userFilters = returned_filters.body();
									}, null, false);
								}
							}
						}
					);
				}else{
					//use existing farm
					plenty_admin.REST.fields.insertFieldWithInterestAndBoundaryPoints(fieldObj, 100, showFieldAddedSuccess);
				}
				return false;
			})
			.end()
			.find(".cancel")
			.click(function(){
				plenty_admin.MAPS.infoWindow.close();
				plenty_admin.MAPS.selectedPolygon.polygon.setMap(null);
				plenty_admin.MAPS.selectedPolygon.polygon = null;
				plenty_admin.MAPS.show_clu_polygons(map);
				plenty_admin.MAPS.add_field_state = 0;
				
				plenty_admin.MAPS.selected_clu_polygon
				.setOptions({
							strokeOpacity: 0,
							fillOpacity: 0
						});
						
				google.maps.event.addListener(plenty_admin.MAPS.selected_clu_polygon, "mouseout",function(){
					this.setOptions({
										strokeOpacity: 0,
										fillOpacity: 0
									});
				});
				plenty_admin.MAPS.selected_clu_polygon = null;
				
				if(plenty_admin.context === "map"){
					plenty_admin.MAPS.add_field_state = 1;
					plenty_admin.MAPS.hide_clu_polygons();
					
					plenty_admin.MAPS.addFieldUI
					.style.backgroundColor = '#fff';
					
					plenty_admin.MAPS.addFieldText
					.style.color = '#0094de';
					
					plenty_admin.UI.map.DOM
					.find(".addFieldMapCtrl div")
					.data("state", "off");
					//plenty_admin.MAPS.selected_clu_polygon.setMap(null);
					
					//show equipment
					plenty_admin.MAPS.show_equipment(plenty_admin.MAPS.equipment_pins, map);
				}else{
					plenty_admin.MAPS.show_clu_polygons(map);
				}

				return false;
			})
			.end()
			.find(".showNewFarm")
			.click(function(){
				$(this)
				.hide()
				.parent()
				.find(".showExistingFarm")
				.show()
				.end()
				.closest(".form-group")
				.find(".newFarm")
				.show()
				.end()
				.find(".existingFarm")
				.hide();
				
				return false;
			})
			.end()
			.find(".showExistingFarm")
			.click(function(){
				$(this)
				.hide()
				.parent()
				.find(".showNewFarm")
				.show()
				.end()
				.closest(".form-group")
				.find(".existingFarm")
				.show()
				.end()
				.find(".newFarm")
				.hide();
				return false;
			})
			
			//Set the options in the farms list
			var $farmList = plenty_admin.MAPS.infoWindowContent.find("#add_field_farms");
			//clear current options
			$farmList
			.find("option")
			.remove();
			
			var farmOptionsHTML = "";
			for(var f=0; f<plenty_admin.DATA.data_source.farms.length; f++){
				var farm = plenty_admin.DATA.data_source.farms[f];
				farmOptionsHTML += "<option value='"+farm.id+"'>"+farm.name+"</option>";
			}
			
			$farmList.append(farmOptionsHTML);
			
			if(plenty_admin.DATA.data_source.farms.length <= 0){
				plenty_admin.MAPS.infoWindowContent
				.find(".showNewFarm")
				.trigger("click");
			}
			
			//set up the list of organizations
			if(plenty_admin.DATA.data_source.organizations){
				var orgOptionsHTML = "";
				for(var o=0; o<plenty_admin.DATA.data_source.organizations.length; o++){
					var org = plenty_admin.DATA.data_source.organizations[o];
					orgOptionsHTML += "<option value='"+org.id+"'>"+org.name+"</option>";
				}
			}else{
				orgOptionsHTML += "<option value='"+plenty_admin.DATA.data_source.id+"'>"+plenty_admin.DATA.data_source.name+"</option>";
			}
			var $orgList = plenty_admin.MAPS.infoWindowContent.find("#add_field_org_interest");
			$orgList.append(orgOptionsHTML);
			
			//populate the data type fields
			var data_types = ["crop", "irrigation", "tillage"];
			
			for(var d=0; d<data_types.length; d++){
				//set up the list of crop types
				if(plenty_admin.DATA[data_types[d]+"Types"]){
					var optionsHTML = "";
					//for(var o=0; o<plenty_admin.DATA[data_types[d]+"Types"].length; o++){
					for(id in plenty_admin.DATA[data_types[d]+"Types"]){
						if(plenty_admin.DATA[data_types[d]+"Types"].hasOwnProperty(id)){
							var el = plenty_admin.DATA[data_types[d]+"Types"][id];
							optionsHTML += "<option value='"+id+"'>"+el.name+"</option>";
						}
					}
				}
				
				var $elList = plenty_admin.MAPS.infoWindowContent.find("#add_field_"+data_types[d]);
				$elList.append(optionsHTML);
			}
			
			if(plenty_admin.DATA.growthMethods){
				var optionsHTML = "";
				//for(var o=0; o<plenty_admin.DATA[data_types[d]+"Types"].length; o++){
				for(id in plenty_admin.DATA.growthMethods){
					if(plenty_admin.DATA.growthMethods.hasOwnProperty(id)){
						var el = plenty_admin.DATA.growthMethods[id];
						optionsHTML += "<option value='"+id+"'>"+el.name+"</option>";
					}
				}
			}
			
			var $elList = plenty_admin.MAPS.infoWindowContent.find("#add_field_growthMethod");
			$elList.append(optionsHTML);
		
			if(plenty_admin.context === "map" && $orgList.find("option").length > 1){
				$orgList
				.closest(".form-group").show();
			}else{
				$orgList
				.find("option:eq(0)").prop("selected", true);
			}
		}); 
		 
		plenty_admin.MAPS.openInfoWindow(MAPS.selectedPolygon.centerPoint, map);
	});
}

plenty_admin.MAPS.remove_all_polygons = function(polygons){
	//loop through the field boundaries on the map and set their map to null
	for(var b=0; b<polygons.length; b++){
		var boundary = polygons[b];
		//console.log("boundary", boundary);
		boundary.removePolygon();
	}
}

plenty_admin.MAPS.location_search = function(map, target) {
	var setup_map_search = function(){
		var input = (document.getElementById('pac-input'));
		
		var types = document.getElementById('type-selector');
		
		var tools = document.getElementById('map_search_tools');
		
		map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
		map.controls[google.maps.ControlPosition.TOP_LEFT].push(types);
		
		var autocomplete = new google.maps.places.Autocomplete(input);
		autocomplete.bindTo('bounds', map);
		
		// var infowindow = new google.maps.InfoWindow();
		// var marker = new google.maps.Marker({
		//	map: map,
		//	anchorPoint: new google.maps.Point(0, -29)
		// });
		
		google.maps.event.addListener(autocomplete, 'place_changed', function() {
		//infowindow.close();
		//marker.setVisible(false);
		var place = autocomplete.getPlace();
		if (!place.geometry) {
			bootbox.dialog({
							message: "Autocomplete's returned place contains no geometry",
							className: "warning",
							buttons: {
								danger: {
								  label: "OK",
								  className: "btn-warning",
								  callback: plenty_admin.HELPER.hideLoadingOverlay
								}
							}
						});
			return;
		}
		
		// If the place has a geometry, then present it on a map.
		if (place.geometry.viewport) {
			map.fitBounds(place.geometry.viewport);
		} else {
			map.setCenter(place.geometry.location);
			map.setZoom(17);  // Why 17? Because it looks good.
		}
		/*
		marker.setIcon(({
		url: place.icon,
		size: new google.maps.Size(71, 71),
		origin: new google.maps.Point(0, 0),
		anchor: new google.maps.Point(17, 34),
		scaledSize: new google.maps.Size(35, 35)
		}));
		
		marker.setPosition(place.geometry.location);
		marker.setVisible(true);
		*/
		
		var address = '';
		if (place.address_components) {
			address = [
				(place.address_components[0] && place.address_components[0].short_name || ''),
				(place.address_components[1] && place.address_components[1].short_name || ''),
				(place.address_components[2] && place.address_components[2].short_name || '')
			].join(' ');
		}
		
		//infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
		//infowindow.open(map, marker);
		});
		
		// Sets a listener on a radio button to change the filter type on Places
		// Autocomplete.
		function setupClickListener(id, types) {
			var radioButton = document.getElementById(id);
			google.maps.event.addDomListener(radioButton, 'click', function() {
				autocomplete.setTypes(types);
			});
		}
		
		setupClickListener('changetype-all', []);
		setupClickListener('changetype-address', ['address']);
		setupClickListener('changetype-establishment', ['establishment']);
		setupClickListener('changetype-geocode', ['geocode']);
		
		$(tools).fadeIn("fast");
	}
	
	if($('#map_search_tools').length === 0){
		$.get("ajax/map-search-ui.html", function(mapSearchUI){
			target
			.prepend(mapSearchUI);
		
			setup_map_search();
		});
	}else{
		setup_map_search();
	}
}

plenty_admin.MAPS.polygon_tooltip = function(){
	var id = 'tt';
	var top = 3;
	var left = 3;
	var maxw = 300;
	var speed = 10;
	var timer = 20;
	var endalpha = 95;
	var alpha = 0;
	var tt,t,c,b,h;
	var ie = document.all ? true : false;
	return{
		show:function(v,w){
			if(tt == null){
				tt = document.createElement('div');
				tt.setAttribute('id',id);
				t = document.createElement('div');
				t.setAttribute('id',id + 'top');
				c = document.createElement('div');
				c.setAttribute('id',id + 'cont');
				b = document.createElement('div');
				b.setAttribute('id',id + 'bot');
				tt.appendChild(t);
				tt.appendChild(c);
				tt.appendChild(b);
				document.body.appendChild(tt);
				tt.style.opacity = 0;
				tt.style.filter = 'alpha(opacity=0)';
				document.onmousemove = this.pos;
			}
			tt.style.display = 'block';
			c.innerHTML = v;
			tt.style.width = w ? w + 'px' : 'auto';
			if(!w && ie){
				t.style.display = 'none';
				b.style.display = 'none';
				tt.style.width = tt.offsetWidth;
				t.style.display = 'block';
				b.style.display = 'block';
			}
			if(tt.offsetWidth > maxw){tt.style.width = maxw + 'px'}
			h = parseInt(tt.offsetHeight) + top;
			clearInterval(tt.timer);
			tt.timer = setInterval(function(){plenty_admin.MAPS.polygon_tooltip.fade(1)},timer);
		},
		pos:function(e){
			var u = ie ? event.clientY + document.documentElement.scrollTop : e.pageY;
			var l = ie ? event.clientX + document.documentElement.scrollLeft : e.pageX;
			tt.style.top = (u - h) + 'px';
			tt.style.left = (l + left) + 'px';
		},
		fade:function(d){
			var a = alpha;
			if((a != endalpha && d == 1) || (a != 0 && d == -1)){
				var i = speed;
				if(endalpha - a < speed && d == 1){
					i = endalpha - a;
				}else if(alpha < speed && d == -1){
					i = a;
				}
				alpha = a + (i * d);
				tt.style.opacity = alpha * .01;
				tt.style.filter = 'alpha(opacity=' + alpha + ')';
			}else{
				clearInterval(tt.timer);
				if(d == -1){tt.style.display = 'none'}
			}
		},
		hide:function(){
			clearInterval(tt.timer);
			tt.timer = setInterval(function(){plenty_admin.MAPS.polygon_tooltip.fade(-1)},timer);
		}
	};
}();