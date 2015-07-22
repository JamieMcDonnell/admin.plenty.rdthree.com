// Field Survey popup
plenty_admin.UI.crop_survey = {};
plenty_admin.UI.crop_survey.modal = $("body").find(".modal#crop-survey");

// wrapper to populate the crop survey and show it
plenty_admin.UI.crop_survey.show = function(crop_survey, fieldObj){
	console.log("plenty_admin.UI.crop_survey.show", crop_survey);
	if(typeof crop_survey === "object"){
		plenty_admin.UI.crop_survey.populate(crop_survey, fieldObj);
	}else if(typeof crop_survey === "number"){
		plenty_admin.DATA.load_field_observation(crop_survey, function(crop_survey_){
			plenty_admin.UI.crop_survey.populate(crop_survey_, fieldObj);
		});
	}
}
plenty_admin.UI.crop_survey.populate = function(crop_survey, fieldObj){
	plenty_admin.UI.crop_survey.modal
	.find(".mainTabs a[data-toggle='tab']")
	.on('shown.bs.tab', function (e) {
	  console.log("e.target", e.target); // newly activated tab
		var activeMap = plenty_admin.UI.crop_survey.modal
		.find(".tab-content.mainTabs .tab-pane.active:visible .map:visible:last");
		
		plenty_admin.UI.crop_survey.showMap(activeMap, fieldObj);
	})
	.end()
	.on("shown.bs.modal", function(){
		var activeMap = plenty_admin.UI.crop_survey.modal
		.find(".tab-content.mainTabs .tab-pane.active:visible .map:visible:last");
		
		plenty_admin.UI.crop_survey.showMap(activeMap, fieldObj);
	})
	.modal("show");
}

plenty_admin.UI.crop_survey.showMap = function(activeMap, fieldObj){
		var mapId = activeMap.prop("id");
		console.log("mapId", mapId);
		
		plenty_admin.MAPS.draw_field_on_map(fieldObj, mapId, {
			mapTypeId: google.maps.MapTypeId.HYBRID,
			zoom:  12,
			disableDefaultUI: true,
			draggable: false, 
			zoomControl: false, 
			scrollwheel: false, 
			disableDoubleClickZoom: true,
			pushPoly: false
		  }, function(map, fieldObj, polygon){
			//plenty_admin.UI.field.polygon = polygon;
			//ensure if the window changes size the field is centered
			console.log("Polygon: ", polygon);
			console.log("Map element: ", $("#"+mapId));
			
			$("#"+mapId)
			.data("polygon", polygon)
			.data("mapId", mapId);
			
			//plenty_admin.MAPS.zoomToPolygon(polygon, plenty_admin.MAPS[mapId]);
			$(window).on("resize",function(){
				plenty_admin.MAPS.zoomToPolygon(polygon, plenty_admin.MAPS[mapId]);
			});
		}, false, null, mapId);
}

