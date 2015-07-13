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
}

plenty_admin.UI.filters.add_selected_filter = function(filterData){
	//console.log(":", filter, filter.find("a").text());
	var $filter = $('<li class="filter" data-filterid="'+filterData.filter.toLowerCase()+filterData.id+'" data-id="'+filterData.id+'" data-name="'+filterData.name+'">'+filterData.name+' <a href="" class="remove-filter glyphicon glyphicon-remove pull-right alert alert-danger mbn"></a></li>');
	$filter
	.find("a.remove-filter")
	.click(function(e){
		var thisFilter = $(this).closest("li");
		
		var filterSet = $(this).closest(".filter-set");
		
		filterSet
		.find(".all-filters li.filter[data-filterid='"+thisFilter.data("filterid")+"']")
		.removeClass("active")
		.find("input[type='checkbox']")
		.prop("checked", false);
		
		var current_filters = filterSet.find("ul.selected-filters li.filter:not(.all)");
		//if all filters have been removed, show All filter
		//console.log("current_filters", current_filters, current_filters.length);
		if(current_filters.length == 0){
			plenty_admin.UI.filters.select_all_filters(filterSet, true);
		}
		
		plenty_admin.UI.filters.update_filters();
		
		return false;
	});
	
	var filterSet = plenty_admin.UI.filters.DOM.find(".filter-set."+filterData.filter)
	
	var $showFilters = filterSet.find(".selected-filters li.show-filters");
	var $allFilters = filterSet.find(".selected-filters li.all");
	
	$allFilters
	.hide();
	
	$filter
	.insertBefore($showFilters);
}

plenty_admin.UI.filters.remove_selected_filter = function(filter){
	plenty_admin.UI.filters.DOM
	.find(".selected-filters li[data-filterid='"+filter.data("filterid")+"']")
	.remove();
	
	plenty_admin.UI.filters.update_filters();
}

plenty_admin.UI.filters.select_all_filters = function(filter, updateFilters){
	filter
	.find(".all-filters li.filter")
	.not(".all")
	.removeClass("active")
	.find("input[type='checkbox']")
	.prop("checked", false);
	
	filter
	.find(".all-filters li.filter.all")
	.addClass("active")
	.find("input[type='checkbox']")
	.prop("checked", true);
	
	filter
	.find(".selected-filters li.filter")
	.filter(":not(.all)")
	.remove()
	.end()
	.filter(".all")
	.show();
	
	if(updateFilters){
		plenty_admin.UI.filters.update_filters();
	}
}

plenty_admin.UI.filters.update_filters = function(){
	plenty_admin.UI.filters.DOM
	.find(".filter-set")
	.each(function(){
		var filterIds = {};
		var filterSet = $(this);
		plenty_admin.DATA.userFilters.filterDto[$(this).data("filter")] = [];
		
		var selectedFilters = $(this).find(".all-filters .filter:not(.all) input[type='checkbox']:checked");
		
		//console.log("selectedFilters", selectedFilters);
		
		selectedFilters
		.each(function(){
			var filterLI = $(this).closest("li.filter");
			//console.log("filterLI: ", filterLI);
			plenty_admin.DATA.userFilters.filterDto[filterSet.data("filter")].push(filterLI.data("id"));
			//console.log("filterIds", filterIds, $(this));
		});
	});
	
	//console.log("updated local filters: ", plenty_admin.DATA.userFilters);
	
	plenty_admin.DATA.update_filters(function(returned_filters){
		console.log("filters updated: ", returned_filters, returned_filters.body());
		plenty_admin.DATA.userFilters = returned_filters.body();
	});
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

plenty_admin.UI.filters.build_filter_entity = function(entityData, filter, active){
	var filterHTML = '<li class="filter'+(active ? " active" : "")+'" data-filterid="'+filter+entityData.id+'" data-id="'+entityData.id+'" data-name="'+entityData.name+'">'+
						'<a href="">'+entityData.name+' <input type="checkbox"'+(active ? " checked" : "")+' class="pull-right"></a>'+
					'</li>';
	
	var $filterHTML = $(filterHTML);
		
	$filterHTML		
	.find("a")
	.click(function(e){
		e.stopPropagation();
		var filterToggle = $(e.target).find("input[type='checkbox']");
		if($(e.target).prop("type") !== "checkbox"){
			filterToggle
			.prop("checked", !(filterToggle.prop("checked")))
			.closest("li")
			.toggleClass("active");
			
			$(e.target)
			.closest("ul")
			.find("li.all")
			.removeClass("active")
			.find("input[type='checkbox']")
			.prop("checked", false);
			
			//set the filter in the filter panel
			var closestLI = $(this).closest("li");
			
			if($(this).closest(".popover").length >0){
				var hash = "";
				
				if($(this).closest(".all-filters").hasClass("farms_quickfilter_popover")){
					hash = "farm";
				}else if($(this).closest(".all-filters").hasClass("orgs_quickfilter_popover")){
					hash = "organization";
				}
				if(closestLI.find("input[type='checkbox']").is(":checked")){
					if(closestLI.hasClass("all")){
						plenty_admin.DATA.userFilters.filterDto[hash+"Ids"] = [];
					}else{
						plenty_admin.DATA.userFilters.filterDto[hash+"Ids"].push(parseInt(closestLI.data("id")));
					}
				}else{
					var index = plenty_admin.DATA.userFilters.filterDto[hash+"Ids"].indexOf(parseInt(closestLI.data("id")));
					if (index > -1) {
						plenty_admin.DATA.userFilters.filterDto[hash+"Ids"].splice(index, 1);
					}
				}
				plenty_admin.DATA.update_filters(function(returned_filters){
					//console.log("filters updated: ", returned_filters, returned_filters.body());
					plenty_admin.DATA.userFilters = returned_filters.body();
				});
			}else{
				//plenty_admin.UI.filters.add_selected_filter($(e.target).closest("li"));
				plenty_admin.UI.filters.update_filters();
			}
		}
		return false;
	})
	.find("input[type='checkbox']")
	.click(function(e){
		e.stopPropagation();
		
		var closestLI = $(this).closest("li");
		
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
			if(closestLI.hasClass("all")){
				plenty_admin.DATA.userFilters.filterDto[hash] = [];
			}else{
				plenty_admin.DATA.userFilters.filterDto[hash] = [];
				closestLI
				.closest("ul")
				.find("li.filter:not(.all) input[type='checkbox']:checked")
				.each(function(){
					plenty_admin.DATA.userFilters.filterDto[hash].push(parseInt($(this).closest("li").data("id")));
				});
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
		plenty_admin.DATA.update_filters(function(returned_filters){
			//console.log("filters updated: ", returned_filters, returned_filters.body());
			plenty_admin.DATA.userFilters = returned_filters.body();
		});
	});
	
	return $filterHTML;
}

plenty_admin.UI.filters.populate = function(init, callback){
	console.log("populate: ", plenty_admin.DATA.userFilters, init);
	for(filter in plenty_admin.DATA.userFilters.possibleFilteringEntitiesDtoList){
		if(
			plenty_admin.DATA.userFilters.possibleFilteringEntitiesDtoList.hasOwnProperty(filter)
			&& plenty_admin.UI.map.applicableFilters.indexOf(filter) > -1
		){
			var filterName = filter.split(/(?=[A-Z])/).join(" ");
			var filterNormalized = filter.toLowerCase();
			var filterIDName = filter.substring(0, filter.length - 1)+"Ids";
			var possibleEntities = plenty_admin.DATA.userFilters.possibleFilteringEntitiesDtoList[filter];
			if(init === true){
				plenty_admin.UI.filters.build_filter_set(filterName, filterNormalized);
			}
			
			
			//check if all possible options are applied
			var allApplied = null;
			
			if(filter === "organizations"){	
				allApplied = Object.keys(plenty_admin.DATA.organizations).length === plenty_admin.DATA.userFilters.filterDto["organizationIds"].length || plenty_admin.DATA.userFilters.filterDto[filterIDName].length == 0;
				console.log("ORGANIZATIONS - ARE ALL APPLIED? ", allApplied);
			}else{
				allApplied = possibleEntities.length === plenty_admin.DATA.userFilters.filterDto[filterIDName].length || plenty_admin.DATA.userFilters.filterDto[filterIDName].length == 0;
				console.log(filter+" - ARE ALL APPLIED? ", allApplied);
			}
			
			plenty_admin.UI.filters.DOM
			.find(".filter-set."+filterNormalized +" .all-filters")
			.html("")
			.append(plenty_admin.UI.filters.build_all_filters_entry(filterNormalized, allApplied ));
			
			//we only want organizations for the current user in filters
			if(filter === "organizations"){
				for(id in plenty_admin.DATA.organizations){
					if(plenty_admin.DATA.organizations.hasOwnProperty(id)){
						var org = plenty_admin.DATA.organizations[id];
						//console.log("Got Organization: ", org, typeof org);
						
						if(typeof org === "object"){
							plenty_admin.UI.filters.DOM
							.find(".filter-set."+filterNormalized +" .all-filters")
							.append(plenty_admin.UI.filters.build_filter_entity(org, filterNormalized, (allApplied ? false : plenty_admin.DATA.userFilters.filterDto[filterIDName].indexOf(org.id) > -1) ));
						}
					}
				}
			}else{
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
	}
	
	//reset active filters count
	var applied_filter_count = 0;
	
	for(filterId in plenty_admin.DATA.userFilters.filterDto){
		if(
			plenty_admin.DATA.userFilters.filterDto.hasOwnProperty(filterId)
			&& plenty_admin.UI.map.applicableFilters.indexOf(filterId.replace("Ids", "s")) > -1
		){
			//empty the selected filters container for this filter set
			plenty_admin.UI.filters.DOM
			.find(".filter-set[data-filter='"+filterId+"'] .selected-filters li.filter:not(.all):not(.show-filters)")
			.remove();
			
			var compareLength = 0;
			switch(filterId){
					case "organizationIds":
					compareLength = Object.keys(plenty_admin.DATA.organizations).length;
					break;
					
					default:
					compareLength = plenty_admin.DATA.userFilters.possibleFilteringEntitiesDtoList[filterId.replace("Ids", "s")].length;
			}
			//console.log("userFilters: ", plenty_admin.DATA.userFilters.filterDto[filterId].length, applied_filter_count, filterId);
			if(
				plenty_admin.DATA.userFilters.filterDto[filterId].length > 0
				&& compareLength != plenty_admin.DATA.userFilters.filterDto[filterId].length
			){
				//need to render these applied filters
				var appliedFilter = plenty_admin.DATA.userFilters.filterDto[filterId];
				applied_filter_count += plenty_admin.DATA.userFilters.filterDto[filterId].length;
				
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
						if(plenty_admin.DATA.userFilters.possibleFilteringEntitiesDtoList["farms"].length === plenty_admin.DATA.userFilters.filterDto[filterId].length || plenty_admin.DATA.userFilters.filterDto[filterId].length == 0){
							allApplied = true;
						}
				}
				
					
				for(var d=0; d<appliedFilter.length; d++){
					var entityData = {};
					entityData.id = appliedFilter[d];
					matchIt = $.grep(plenty_admin.DATA.userFilters.possibleFilteringEntitiesDtoList[filterId.replace("Ids", "s")], function(el, x){
						//console.log("GREP: ", el, appliedFilter[d]);
						return el.id == appliedFilter[d];
					});
					
					//console.log("matchIt", matchIt);
					
					if(matchIt.length >0){
						entityData.name = matchIt[0].name;
					}
					
					entityData.filter = filterId.replace("Ids", "s");
					
					plenty_admin.UI.filters.add_selected_filter(entityData);
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
	var $elTarget = $(el.target); 
	//hide other filter sets
	/*
	plenty_admin.UI.filters.DOM
	.find("ul.all-filters")
	.hide()
	.end()
	.find("ul.selected-filters")
	.show();
	*/
	
	//show this filter sets filters
	$(el.target)
	.closest(".filter-set")
	.find("ul.selected-filters")
	.hide()
	.end()
	.find("ul.all-filters")
	.slideDown("fast");
}

plenty_admin.UI.filters.hide_filter_selectors = function(el){
	var $elTarget = $(el.target); 
	//hide other filter sets
	/*
	plenty_admin.UI.filters.DOM
	.find("ul.all-filters")
	.hide()
	.end()
	.find("ul.selected-filters")
	.show();
	*/
	
	//show this filter sets filters
	$(el.target)
	.closest(".filter-set")
	.find("ul.selected-filters")
	.slideDown("fast")
	.end()
	.find("ul.all-filters")
	.hide();
}

plenty_admin.UI.filters.show_selected_filters = function(){
	plenty_admin.UI.filters.DOM
	.find("ul.all-filters")
	.hide()
	.end()
	.find("ul.selected-filters")
	.slideDown("fast");
}

plenty_admin.UI.filters.build_filter_set = function(filter, filterNormalized){
	var filterIDName = filterNormalized.slice(0, filterNormalized.lastIndexOf("s"))+"Ids";
	if(filterIDName == "croptypeIds"){
		filterIDName = "cropTypeIds";
	}
	
	var filterSetHTML = '<div class="filter-set mbs '+filterNormalized+'" data-filter="'+filterIDName+'">'+
							'<h3 class="title filter-title mbm"><span class="icon pull-left"></span> '+filter+'<a href="" class="show-filters pull-right"><i class="icon glyphicon glyphicon-triangle-right pull-right"></i><i class="icon glyphicon glyphicon-triangle-bottom pull-right" style="display:none;	"></i></a></h3>'+
							'<ul class="selected-filters clear mbn">'+
								'<li class="filter all">'+
									'<span class="pull-left">All</span></a>'+
								'</li>'+
							'</ul>'+
							'<ul class="all-filters overflowFix clear mbn" style="display:none;">'+
							'</ul>'+
						'</div>';
	var $filterSetHTML = $(filterSetHTML);
	
	//set up the filter toggle list
	$filterSetHTML
	.data("state", "closed")
	.find(".show-filters")
	.click(function(e){
		e.stopPropagation();
		if($filterSetHTML.data("state") === "closed"){
			plenty_admin.UI.filters.show_filter_selectors(e);
			$filterSetHTML
			.data("state", "open")
		}else{
			plenty_admin.UI.filters.hide_filter_selectors(e);
			$filterSetHTML
			.data("state", "closed")
		}
		
		$filterSetHTML
		.find(".show-filters i")
		.toggle();
		
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
		.animate({"right":-(plenty_admin.UI.filters.DOM.width())}/*, function(){
			plenty_admin.UI.filters.show_selected_filters();
		}*/);
	}else if(plenty_admin.UI.filters.state === "closed"){
		plenty_admin.UI.filters.state = "open";
		
		//plenty_admin.UI.filters.show_selected_filters();
		
		plenty_admin.UI.filters.DOM
		.stop()
		.clearQueue()
		.animate({"right":0});
	}else if(plenty_admin.UI.filters.state === "open"){
		plenty_admin.UI.filters.state = "closed";
		
		plenty_admin.UI.filters.DOM
		.stop()
		.clearQueue()
		.animate({"right":-(plenty_admin.UI.filters.DOM.width())}/*, function(){
			plenty_admin.UI.filters.show_selected_filters();
		}*/);
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

plenty_admin.DATA.update_filters = function(callback, init, zoomFields){
	console.log("plenty_admin.DATA.update_filters", zoomFields);
	plenty_admin.REST.update_filters.post(plenty_admin.DATA.userFilters.filterDto).then(function(data){
			console.log("data: ", data.body());
			plenty_admin.DATA.userFilters = data.body();
			
			plenty_admin.UI.filters.populate(init);
			
			plenty_admin.UI.map.populate(plenty_admin.DATA.userFilters.possibleFilteringEntitiesDtoList.fields, zoomFields);
			
			if(callback && typeof callback === "function"){
				callback(data);
			}
		}
	);
}

plenty_admin.UI.filters.init();