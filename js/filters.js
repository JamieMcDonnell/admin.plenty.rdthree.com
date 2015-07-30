//*********************** filters.js **************************//
//create namespace for filters layout
plenty_admin.UI.filters = {};
plenty_admin.UI.filters.state = "closed"; // set to closed by default
plenty_admin.UI.filters.DOM = plenty_admin.UI.DOM.find("#filters-container");

plenty_admin.REST.update_filters = plenty_admin.api.all("filters/update");

//method to initiate the field page
plenty_admin.UI.filters.init = function(){
	//console.log("plenty_admin.UI.filters.init");
	
	//position the filters off the map
	plenty_admin.UI.filters.hide_filters();
	
	//ensure the filters stay hidden if closed when page gets resized
	$( window ).resize(function() {
		if(plenty_admin.UI.filters.toggleFilters.state === "closed"){
			plenty_admin.UI.filters.hide_filters();
		}
	});
	
	plenty_admin.UI.filters.DOM
	.find("button.save-filter")
	.click(function(){
		//save the filters
		
		//close the filter panel
		plenty_admin.UI.filters.toggleFilters("close");
		
		// stop default behaviour
		return false;
	});
	
	//once positioned, make the filters panel visible
	plenty_admin.UI.filters.DOM
	.show();
	
	plenty_admin.UI.filters.DOM
	.on("mouseenter", function(){
		clearTimeout(this.autohide);
	})
	.on("mouseleave", function(){
		this.autohide = setTimeout(function(){
			plenty_admin.UI.filters.toggleFilters("close");
		}, 3000);
	});
}

plenty_admin.UI.filters.add_selected_filter = function(filterData){
	//console.log(":", filter, filter.find("a").text());
	var $filter = $('<li class="filter" data-filterid="'+filterData.filter.toLowerCase()+filterData.id+'" data-id="'+filterData.id+'" data-name="'+filterData.name+'">'+filterData.name+' <a href="" class="remove-filter glyphicon glyphicon-remove pull-right alert alert-danger mbn"></a></li>');
	$filter
	.find("a.remove-filter")
	.click(function(e){
		var thisFilter = $(this).closest("li");
		
		var filterSet = $(this).closest(".filter-set");
		
		for(var f=0; f<plenty_admin.DATA.userFilters.filterDto[filterSet.data("filter")].length; f++){
			var filter = plenty_admin.DATA.userFilters.filterDto[filterSet.data("filter")][f];
			if(filter === parseInt(thisFilter.data("id"))){
				plenty_admin.DATA.userFilters.filterDto[filterSet.data("filter")].splice(f, 1);
			}
		}
		
		var current_filters = filterSet.find("ul.selected-filters li.filter:not(.all)");
		//if all filters have been removed, show All filter
		//console.log("current_filters", current_filters, current_filters.length);
		if(
			current_filters.length == 0
			|| current_filters.length === plenty_admin.DATA.userFilters.possibleFilteringEntitiesDtoList[filterSet.data("filter").replace("Ids", "s")].length
		){
			plenty_admin.UI.filters.select_all_filters(filterSet, true);
		}
		
		thisFilter
		.remove();
		
		plenty_admin.DATA.update_filters();
		
		return false;
	});
	
	var filterSet = plenty_admin.UI.filters.DOM.find(".filter-set."+filterData.filter.toLowerCase())
	
	var $allFilters = filterSet.find(".selected-filters li.all");
	
	$allFilters
	.hide();
	
	filterSet
	.find(".selected-filters")
	.append($filter);
}

plenty_admin.UI.filters.select_all_filters = function(filter, updateFilters){
	var filterId = filter.data("filter");
	
	plenty_admin.DATA.userFilters.filterDto[filterId] = [];
	
	if(updateFilters){
		plenty_admin.DATA.update_filters();
	}
}

plenty_admin.UI.filters.build_all_filters_entry = function(filterNormalized, active){
	var allFiltersDOM = '<li class="filter all'+(active ? " active" : "")+'" data-filterid="'+filterNormalized+'01">'+
							'<a href="">All <input type="checkbox"'+(active ? " checked" : "")+' class="pull-right"></a>'+
						'</li>';
						
	var $allFiltersDOM = $(allFiltersDOM);
	
	//deselect other checkboxes
	$allFiltersDOM
	.find("a")
	.click(function(e){
		e.stopPropagation();
		var filterToggle = $(e.target).find("input[type='checkbox']");
		if($(e.target).prop("type") !== "checkbox"){
			plenty_admin.UI.filters.select_all_filters($(e.target).closest(".filter-set"), true);
		}
		return false;
	})
	.find("input[type='checkbox']")
	.click(function(e){
		e.stopPropagation();
	})
	.on("change", function(e){
		plenty_admin.UI.filters.select_all_filters($(e.target).closest(".filter-set"), true);
	});
	
	return $allFiltersDOM;
}

plenty_admin.UI.filters.build_clear_filters_entry = function(){
	var $clearFilters = $('<li class="clear-filters">'+
							'<a href="">Clear</a>'+
						'</li>');
						
	//deselect other checkboxes
	$clearFilters
	.find("a")
	.click(function(e){
		e.stopPropagation();
		$(this)
		.closest(".selected-filters")
		.find(".filter")
		.remove();
		
		var filterSet = $(this).closest(".filter-set");
		
		plenty_admin.DATA.userFilters.filterDto[filterSet.data("filter")] = [];
		
		plenty_admin.DATA.update_filters();
		
		$(this)
		.parent()
		.remove();
		
		return false;
	});
	
	return $clearFilters;
}

plenty_admin.UI.filters.build_filter_entity = function(entityData, filter, active){
	var $filterHTML = $([
						'<li class="filter' + (active ? " active" : ""),
							'" data-filterid="' + filter.toLowerCase(), + entityData.id,
							'" data-id="' + entityData.id,
							'" data-name="' + entityData.name + '">',
							'<a href="">',
								entityData.name,
								' <input type="checkbox"',
								(active ? " checked" : ""),
								' class="pull-right">',
							'</a>',
						'</li>'].join(""));
	
	$filterHTML		
	.find("a")
	.click(function(e){
		e.stopPropagation();
		
		console.log("clicked a filter, is it a checkbox? ", e);
		
		if($(e.target).prop("type") === "checkbox"){
			return;
		}
		
		var filterToggle = $(e.target).find("input[type='checkbox']");
		
		filterToggle
		.prop("checked", !filterToggle.prop("checked"))
		.trigger("change");
		
		return false;
	})
	.find("input[type='checkbox']")
	.on("change", function(e){
		e.stopPropagation();
		
		var closestLI = $(this).closest("li");
		
		if(closestLI.hasClass("all") && $(this).is(":checked")){
			$(this).prop("checked", true);
			return;
		}
		
		closestLI
		.toggleClass("active");
		
		var hash = "";
		
		//set the filter in the filter panel
		if($(this).closest(".popover").length >0){
			//console.log("BEFORE: plenty_admin.DATA.userFilters:", plenty_admin.DATA.userFilters);
			if($(this).closest(".all-filters").hasClass("farms_quickfilter_popover")){
				hash = "farmIds";
			}else if($(this).closest(".all-filters").hasClass("orgs_quickfilter_popover")){
				hash = "organizationIds";
			}
		}else{
			hash = closestLI.closest(".filter-set").data("filter");
		}
		
		if($(this).is(":checked")){
			console.log("CHECKED");
			if(
				closestLI.hasClass("all")
			){
				plenty_admin.DATA.userFilters.filterDto[hash] = [];
			}else{
				plenty_admin.DATA.userFilters.filterDto[hash] = [];
				closestLI
				.closest("ul")
				.find("li.filter:not(.all) input[type='checkbox']:checked")
				.each(function(){
					plenty_admin.DATA.userFilters.filterDto[hash].push(parseInt($(this).closest("li").data("id")));
				});
				
				if(
					plenty_admin.DATA.userFilters.filterDto[hash] === plenty_admin.DATA.userFilters.possibleFilteringEntitiesDtoList[hash.replace("Ids", "s")]
				){
					plenty_admin.DATA.userFilters.filterDto[hash] = [];
				}
			}
		}else{
			console.log("UN-CHECKED");
			var index = plenty_admin.DATA.userFilters.filterDto[hash].indexOf(parseInt(closestLI.data("id")));
			//console.log("index", index);
			//console.log("plenty_admin.DATA.userFilters.filterDto[hash+'Ids']", plenty_admin.DATA.userFilters.filterDto[hash+"Ids"]);
			//console.log('parseInt(closestLI.data("id"))', parseInt(closestLI.data("id")));
			if (index > -1) {
				plenty_admin.DATA.userFilters.filterDto[hash].splice(index, 1);
			}
		}
		//console.log("AFTER: plenty_admin.DATA.userFilters:", plenty_admin.DATA.userFilters);
		plenty_admin.DATA.update_filters();
	});
	
	return $filterHTML;
}

plenty_admin.UI.filters.populate = function(init, callback){
	console.log("populate: ", plenty_admin.DATA.userFilters, init);
	for(filter in plenty_admin.DATA.userFilters.possibleFilteringEntitiesDtoList){
		if(
			plenty_admin.DATA.userFilters.possibleFilteringEntitiesDtoList.hasOwnProperty(filter)
			&& plenty_admin.UI[plenty_admin.context].applicableFilters.indexOf(filter.toLowerCase()) > -1
		){
			var filterName = filter.split(/(?=[A-Z])/).join(" ");
			var filterNormalized = filter.toLowerCase();
			var filterIDName = filter.substring(0, filter.length - 1)+"Ids";
			var possibleEntities = plenty_admin.DATA.userFilters.possibleFilteringEntitiesDtoList[filter];
			if(init === true){
				plenty_admin.UI.filters.build_filter_set(filterName, filterNormalized);
			}
			
			
			//check if all possible options are applied
			var allApplied = possibleEntities.length === plenty_admin.DATA.userFilters.filterDto[filterIDName].length || plenty_admin.DATA.userFilters.filterDto[filterIDName].length == 0;
			
			//console.log(filter+" - ARE ALL APPLIED? ", allApplied);
			
			plenty_admin.UI.filters.DOM
			.find(".filter-set."+filterNormalized +" .all-filters")
			.html("")
			.append(plenty_admin.UI.filters.build_all_filters_entry(filterNormalized, allApplied ));
			
			if(possibleEntities.length > 0){
				for(f=0; f<possibleEntities.length; f++){
					var entity = possibleEntities[f];
					//console.log("entity:", entity, filter, filterIDName);
					
					// add the filter element to the correct panel
					plenty_admin.UI.filters.DOM
					.find(".filter-set."+ filter.toLowerCase() +" .all-filters")
					.append(plenty_admin.UI.filters.build_filter_entity(entity, filter, (allApplied ? false : plenty_admin.DATA.userFilters.filterDto[filterIDName].indexOf(entity.id) > -1)));
				}
			}
		}
	}
	
	//reset active filters count
	var applied_filter_count = 0;
	
	for(filterId in plenty_admin.DATA.userFilters.filterDto){
		if(
			plenty_admin.DATA.userFilters.filterDto.hasOwnProperty(filterId)
			&& plenty_admin.UI[plenty_admin.context].applicableFilters.indexOf(filterId.replace("Ids", "s").toLowerCase()) > -1
		){
			//empty the selected filters container for this filter set
			plenty_admin.UI.filters.DOM
			.find(".filter-set[data-filter='"+filterId+"'] .selected-filters li.filter, .filter-set[data-filter='"+filterId+"'] .selected-filters li.clear-filters")
			.remove();
			
			var compareLength = plenty_admin.DATA.userFilters.possibleFilteringEntitiesDtoList[filterId.replace("Ids", "s")].length;
			//console.log("userFilters: ", plenty_admin.DATA.userFilters.filterDto[filterId].length, compareLength);
			if(
				plenty_admin.DATA.userFilters.filterDto[filterId].length > 0
				&& compareLength != plenty_admin.DATA.userFilters.filterDto[filterId].length
			){
				//need to render these applied filters
				var appliedFilter = plenty_admin.DATA.userFilters.filterDto[filterId];
				applied_filter_count += plenty_admin.DATA.userFilters.filterDto[filterId].length;
				
				console.log("appliedFilter", appliedFilter);
				console.log("applied_filter_count", applied_filter_count);
				
				var allApplied = false;
				var quickFilterText = "";
				
				switch(filterId){
					case "organizationIds":
					if(plenty_admin.DATA.userFilters.filterDto[filterId].length === 1){
						quickFilterText = plenty_admin.DATA.userFilters.possibleFilteringEntitiesDtoList[filterId.replace("Ids", "s")][0].name;
					}else if(compareLength === plenty_admin.DATA.userFilters.filterDto[filterId].length || plenty_admin.DATA.userFilters.filterDto[filterId].length == 0){
						quickFilterText = "All Organizations";
						allApplied = true;
					}else{
						quickFilterText = "Multiple Organizations";
					}
					break;
					
					case "farmIds":
						if(plenty_admin.DATA.userFilters.filterDto[filterId].length === 1){
							quickFilterText = plenty_admin.DATA.userFilters.possibleFilteringEntitiesDtoList[filterId.replace("Ids", "s")][0].name;
						}else if(compareLength === plenty_admin.DATA.userFilters.filterDto[filterId].length || plenty_admin.DATA.userFilters.filterDto[filterId].length == 0){
							quickFilterText = "All Farms";
							allApplied = true;
						}else{
							quickFilterText = "Multiple Farms";
						}
					break;
					
					default:
						console.log("CHECK!!", filterId, plenty_admin.DATA.userFilters.filterDto[filterId].length, plenty_admin.DATA.userFilters.possibleFilteringEntitiesDtoList[filterId.replace("Ids", "s")	].length);
						if(
							plenty_admin.DATA.userFilters.possibleFilteringEntitiesDtoList[filterId.replace("Ids", "s")	].length === plenty_admin.DATA.userFilters.filterDto[filterId].length 
							|| plenty_admin.DATA.userFilters.filterDto[filterId].length == 0
							|| plenty_admin.DATA.userFilters.filterDto[filterId].length > plenty_admin.DATA.userFilters.possibleFilteringEntitiesDtoList[filterId.replace("Ids", "s")	].length
						){
							allApplied = true;
						}
				}
				
				var addClear = false;
					
				for(var d=0; d<appliedFilter.length; d++){
					var entityData = {};
					entityData.id = appliedFilter[d];
					matchIt = $.grep(plenty_admin.DATA.userFilters.possibleFilteringEntitiesDtoList[filterId.replace("Ids", "s")], function(el, x){
						//console.log("GREP: ", el, appliedFilter[d]);
						return el.id == appliedFilter[d];
					});
					
					//console.log("matchIt", matchIt);
					
					if(matchIt.length >0 && !allApplied){
						entityData.name = matchIt[0].name;
						entityData.filter = filterId.replace("Ids", "s");
						plenty_admin.UI.filters.add_selected_filter(entityData);
						addClear = true;
					}
				}
				
				if(addClear){
					var filterSet = plenty_admin.UI.filters.DOM.find(".filter-set."+filterId.replace("Ids", "s").toLowerCase());
		
					filterSet
					.find(".selected-filters")
					.append(plenty_admin.UI.filters.build_clear_filters_entry());
				}
				
				
				//set the quickFilter to the selected farm / organization
				switch(filterId){
					case "organizationIds":
						plenty_admin.UI.map.orgs_quickfilter
						.text(quickFilterText);
					break;
					
					case "farmIds":
						plenty_admin.UI.map.farms_quickfilter
						.text(quickFilterText);
					break;
				}
			}else{
				plenty_admin.UI.filters.DOM
				.find(".filter-set[data-filter='"+filterId+"'] .selected-filters li.filter")
				.show();
				
				//set the quickFilter to All
				switch(filterId){
					case "organizationIds":
						plenty_admin.UI.map.orgs_quickfilter
						.text("All Organizations");
					break;
					
					case "farmIds":
						plenty_admin.UI.map.farms_quickfilter
						.text("All Farms");
					break;
				}
			}
		}
	}
	
	//set the number of applied filters
	if(applied_filter_count > 0){
		plenty_admin.UI.map.toggleFilters
		.find("span")
		.text("("+applied_filter_count+")");
	}else{
		plenty_admin.UI.map.toggleFilters
		.find("span")
		.text("");
	}
	
	//update the quickFilter panels if open
	var orgs_quickFilter_popover = plenty_admin.UI.map.orgs_quickfilter.parent().find(".orgs_quickfilter_popover");
	if(orgs_quickFilter_popover.is(":visible")){
		//update the orgs quickFilter panel
		var thePopover = orgs_quickFilter_popover.parent();
		orgs_quickFilter_popover
		.remove();
		
		plenty_admin.UI.filters.DOM
		.find(".filter-set.organizations .all-filters")
		.clone(true, true)
		.addClass("orgs_quickfilter_popover")
		.show()
		.appendTo(thePopover);
	}
	
	var farms_quickFilter_popover = plenty_admin.UI.map.farms_quickfilter.parent().find(".farms_quickfilter_popover");
	if(farms_quickFilter_popover.is(":visible")){
		//update the orgs quickFilter panel
		var thePopover = farms_quickFilter_popover.parent();
		
		farms_quickFilter_popover
		.remove();
		
		plenty_admin.UI.filters.DOM
		.find(".filter-set.farms .all-filters")
		.clone(true, true)
		.addClass("farms_quickfilter_popover")
		.show()
		.appendTo(thePopover);
	}
	
	
	if(callback && typeof callback === "function"){
		callback();
	}
	
	plenty_admin.UI.map.filterControls
	.find(".quickFilters")
	.fadeIn("fast");
}

plenty_admin.UI.filters.hide_filters = function(){
	plenty_admin.UI.filters.DOM
	.css("right", -(plenty_admin.UI.filters.DOM.outerWidth()));
}

plenty_admin.UI.filters.show_filter_selectors = function(el){
	//show this filter sets filters
	$(el.target)
	.closest(".filter-set")
	.find("ul.selected-filters")
	.slideUp("fast")
	.end()
	.find("ul.all-filters")
	.slideDown("fast");
}

plenty_admin.UI.filters.hide_filter_selectors = function(el){
	//show this filter sets filters
	$(el.target)
	.closest(".filter-set")
	.find("ul.selected-filters:not(:empty)")
	.slideDown("fast")
	.end()
	.find("ul.all-filters")
	.slideUp("fast");
}

plenty_admin.UI.filters.show_selected_filters = function(){
	plenty_admin.UI.filters.DOM
	.find("ul.all-filters")
	.slideUp("fast")
	.end()
	.find("ul.selected-filters:not(:empty)")
	.slideDown("fast");
}

plenty_admin.UI.filters.build_filter_set = function(filter, filterNormalized){
	var filterIDName = filterNormalized.slice(0, filterNormalized.lastIndexOf("s"))+"Ids";
	if(filterIDName == "croptypeIds"){
		filterIDName = "cropTypeIds";
	}
	
	var $filterSetHTML = $(['<div class="filter-set mbs '+filterNormalized+'" data-filter="'+filterIDName+'">',
							'<h3 class="title filter-title mbm">',
								'<a href="" class="show-filters pull-right">',
									'<span class="icon pull-left"></span> ',
									filter,
									'<i class="icon glyphicon glyphicon-triangle-right pull-right"></i>',
								'</a>',
							'</h3>'+
							'<ul class="selected-filters clear mbn overflowFix">',
								'<li class="filter all">',
									'<span class="pull-left">All</span>',
								'</li>',
							'</ul>',
							'<ul class="all-filters overflowFix clear mbn" style="display:none;">',
							'</ul>',
						'</div>'].join(""));
	
	//set up the filter toggle list
	$filterSetHTML
	.data("state", "closed")
	.find(".filter-title a")
	.click(function(e){
		e.stopPropagation();
		if($filterSetHTML.data("state") === "closed"){
			plenty_admin.UI.filters.show_filter_selectors(e);
			$filterSetHTML
			.data("state", "open")
			.addClass("open");
		}else{
			plenty_admin.UI.filters.hide_filter_selectors(e);
			$filterSetHTML
			.data("state", "closed")
			.removeClass("open");
		}
		
		return false;
	});
	
	plenty_admin.UI.filters.DOM
	.find("#filter-set-wrapper")
	.append($filterSetHTML);
}

plenty_admin.UI.filters.toggleFilters = function(force){
	//console.log("plenty_admin.UI.filters.toggleFilters: ", force);
	if(force === "open"){
		plenty_admin.UI.filters.state = "open";
		
		//plenty_admin.UI.filters.show_selected_filters();
		
		plenty_admin.UI.filters.DOM
		.stop()
		.clearQueue()
		.animate({"right":0});
	}else if(force === "close"){
		plenty_admin.UI.filters.state = "closed";
		
		plenty_admin.UI.filters.DOM
		.stop()
		.clearQueue()
		.animate({"right":-(plenty_admin.UI.filters.DOM.width())});
	}else if(plenty_admin.UI.filters.state === "closed"){
		plenty_admin.UI.filters.state = "open";
		
		plenty_admin.UI.filters.DOM
		.stop()
		.clearQueue()
		.animate({"right":0});
	}else if(plenty_admin.UI.filters.state === "open"){
		plenty_admin.UI.filters.state = "closed";
		
		plenty_admin.UI.filters.DOM
		.stop()
		.clearQueue()
		.animate({"right":-(plenty_admin.UI.filters.DOM.width())});
	}
}

plenty_admin.REST.get_x_by_filtered = function(x, callback){
	var parsedX = x.replace(/ /g, "");
	plenty_admin.REST["get"+parsedX+"Filtered"] = plenty_admin.api.one("filters/get"+parsedX+"Filtered", plenty_admin.DATA.userFilters.filterDto.id);
	
	plenty_admin.REST["get"+parsedX+"Filtered"].get().then(function(data){
			//console.log("data: ", data);
			if(callback && typeof callback === "function"){
				callback(data, x);
			}
		}
	);
}

plenty_admin.DATA.update_filters = function(callback, init, zoomFields, context){
	console.log("plenty_admin.DATA.update_filters", zoomFields);
	plenty_admin.HELPER.showLoadingOverlay();
	
	plenty_admin.REST.update_filters.post(plenty_admin.DATA.userFilters.filterDto).then(function(data){
			console.log("data: ", data.body());
			
			//update the local possible filter entities only
			//manage the filterDTO selected locally only as it differs from what is returned by the server
			plenty_admin.DATA.userFilters.possibleFilteringEntitiesDtoList = data.body().possibleFilteringEntitiesDtoList;
			
			plenty_admin.UI.filters.populate(init);
			
			switch(plenty_admin.context){
				case "map":
				plenty_admin.UI.map.populate(plenty_admin.DATA.userFilters.possibleFilteringEntitiesDtoList.fields, zoomFields);
				plenty_admin.UI.map.add_equipment_to_map();
				break;
				
				case "plans":
					plenty_admin.REST.getPlansFiltered(plenty_admin.DATA.userFilters.filterDto.id);
				break;
			}
			
			if(callback && typeof callback === "function"){
				callback(data);
			}
			
			//plenty_admin.HELPER.hideLoadingOverlay();
		}
	);
}

plenty_admin.UI.filters.init();