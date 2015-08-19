//define an empty var for the sidebar HTML
plenty_admin.UI.sideBar = {};
plenty_admin.UI.sideBar.DOM = $("#sidebar");
plenty_admin.UI.sideBar.organizations = {};
plenty_admin.UI.sideBar.organizations.DOM = plenty_admin.UI.sideBar.DOM.find("#organizations");

// build a sidebar organization panel
plenty_admin.UI.sideBar.organizations.create = function(org){
	var $sidebar_org = $(['<div class="panel panel-default">',
							'<div role="tab" id="org_head_'+org.id+'">',
								'<h4 class="panel-title"> <a class="organization" data-orgid="'+org.id+'" data-toggle="collapse" data-parent="#organizations" href="#collapse_'+org.id+'" aria-expanded="true" aria-controls="collapse_'+org.id+'">'+org.name+'</a> </h4>',
							'</div>',
							'<div id="collapse_'+org.id+'" class="panel-collapse collapse" role="tabpanel" aria-labelledby="org_head_'+org.id+'" data-orgid="'+org.id+'">',
								'<div class="panel-body">',
									'<ul class="list-group">',
										'<li class="list-group-item sub farms"><span class="badge">'+(org.farms ? org.farms.length : 0)+'</span> <a href="#farms" class="farms" data-orgid="'+org.id+'">Farms</a></li>',
										'<li class="list-group-item sub fields"><span class="badge">'+(org.fields ? org.fields.length : 0)+'</span> <a href="#fields" class="fields" data-orgid="'+org.id+'">Fields</a></li>',
										'<li class="list-group-item sub users"><span class="badge">'+(org.users ? org.users.length : 0)+'</span> <a href="#users" class="users" data-orgid="'+org.id+'">Users</a> </li>',
										'<li class="list-group-item sub equipment"><span class="badge">'+(org.equipments ? org.equipments.length : 0)+'</span> <a href="#equipments" class="equipment" data-orgid="'+org.id+'">Equipment</a> </li>',
										'<li class="list-group-item sub products"><span class="badge">'+(org.products ? Object.keys(org.products).length : 0)+'</span> <a href="#products" class="products" data-orgid="'+org.id+'">Products</a> </li>',
										'<li class="list-group-item sub plans"><span class="badge">'+(org.plans ? org.plans.length : 0)+'</span> <a href="#plans" class="plans" data-orgid="'+org.id+'">Plans</a></li>',
										'<li class="list-group-item sub skills"><span class="badge">'+(org.skills ? org.skills.length : 0)+'</span> <a href="#skills" class="skills" data-orgid="'+org.id+'">Skills</a> </li>',
										'<li class="list-group-item sub payments"><span class="badge">'+(org.payments ? org.payments.length : 0)+'</span> <a href="#payments" class="payment" data-orgid="'+org.id+'">Payment</a></li>',
									'</ul>',
								'</div>',
							'</div>',
						'</div>'].join(""));
		
	$sidebar_org
	.find("li.sub a")
	.off("click")
	.on("click", function(e){
		//console.log("sub: ", e, e.currentTarget.href);
		//stop reloading the page on click
		e.preventDefault();
		
		var url = e.currentTarget.href;
		var hash = url.substring(url.indexOf('#'));
		//store ref to the event object
		var orgId = $(e.currentTarget).data("orgid");
		
		//trigger the change in selection
		plenty_admin.UI.sideBar.organizations.select_sub(orgId, hash);
		
		console.log(orgId, plenty_admin.UI.organization.DOM.data("orgId"));
		
		//show organization template if it is not visible
		if(!plenty_admin.UI.organization.DOM.is(":visible")){
			plenty_admin.UI.currentScreen
			.fadeOut("normal", function(){
				plenty_admin.UI.currentScreen = plenty_admin.UI.organization.DOM;
				if(orgId === plenty_admin.UI.organization.DOM.data("orgId")){
					// switch tab only
					plenty_admin.UI.organization.switchTab(hash);
				}else{
					//load the organization
					plenty_admin.HELPER.showLoadingOverlay("Loading", "Organization")
					plenty_admin.UI.organization.init(plenty_admin.DATA.organizations[orgId], e.currentTarget.hash);
				}
				plenty_admin.UI.organization.DOM.fadeIn("normal");
			});
		}else{
			if(orgId === plenty_admin.UI.organization.DOM.data("orgId")){
				// switch tab only
				plenty_admin.UI.organization.switchTab(hash);
			}else{
				//load the organization
				plenty_admin.HELPER.showLoadingOverlay("Loading", "Organization");
				plenty_admin.UI.organization.init(plenty_admin.DATA.organizations[orgId], e.currentTarget.hash);
			}
		}
		
		//store the selected organization ID
		store.set('filter::organization', orgId);
	});
	return $sidebar_org;
}

//loop organizations and create sidebar html
plenty_admin.UI.sideBar.organizations.init = function(orgs){
	plenty_admin.UI.sideBar.organizations.html = "";
	plenty_admin.UI.sideBar.organizations.DOM.html("");
	
	//loop organizations and inject Organizations DOM
	for(id in plenty_admin.DATA.organizations){
		if(
			plenty_admin.DATA.organizations.hasOwnProperty(id)
			&& id !== "length"
		){
			
			var org = plenty_admin.DATA.organizations[id];
			
			$sidebar_org = plenty_admin.UI.sideBar.organizations.create(org);
			
			//populate the side bar organizations panel
			plenty_admin.UI.sideBar.organizations.DOM
			.append($sidebar_org);
		}
	}
	
	var $new_org_link = $([
		'<button class="btn btn-success btn-block panel-title add-org mtm">',
			'<span class="glyphicon glyphicon-plus"></span> New Organization',
		'</button>'
	].join(""));
	
	$new_org_link
	.click(function(){
		//build the breadcrumb trail object
		console.log("new org clicked");
		var newOrg_breadcrumb = [
			{
				class:"back",
				name:"Settings",
				clickHandler:function(){
					plenty_admin.UI.currentScreen
					.fadeOut("normal", function(){
						plenty_admin.UI.newOrganization.clear();
						plenty_admin.UI.currentScreen = plenty_admin.UI.organization.DOM;
						plenty_admin.UI.currentScreen
						.fadeIn("normal");
					});
					return false;
				}
			},
			{
				class:"active",
				name:"Add Organization",
				clickHandler:null
			}
		];
		
		plenty_admin.UI.newOrganization.DOM
		.find(".breadcrumb-trail")
		.remove()
		.end()
		.prepend(plenty_admin.UI.build_breadcrumb_trail(newOrg_breadcrumb));
		
		plenty_admin.UI.newOrganization.init();
		
		plenty_admin.UI.currentScreen
		.fadeOut("normal", function(){
			plenty_admin.UI.currentScreen = plenty_admin.UI.newOrganization.DOM;
			plenty_admin.UI.currentScreen
			.fadeIn("normal");
		});
return false;
	});
	
	plenty_admin.UI.sideBar.organizations.DOM
	.append($new_org_link);
}

plenty_admin.UI.sideBar.organizations.select_sub = function(orgId, hash){
	// set the selected item
	plenty_admin.UI.sideBar.organizations.DOM
	.find("li.active")
	.removeClass("active")
	.end()
	.find("li.list-group-item.sub a[data-orgid='"+orgId+"'][href='"+hash+"']")
	.closest(".list-group-item")
	.addClass("active");
}

$( document ).on( "organization_data_ready", function( event, orgs ) {
    plenty_admin.UI.sideBar.organizations.init(orgs);
});