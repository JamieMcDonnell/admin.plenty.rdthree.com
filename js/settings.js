//*********************** settings.js **************************//
// send the user back to the login page if they have no auth token
if(!store.get("basicAuth")){
	//window.location = "http://admin.plenty.rdthree.com/";
}

// check if user should be forced to enter unique credentials
var setCreds = plenty_admin.HELPER.getParameterByName('setCreds');
if(setCreds){
	$('#setCreds').modal("show");
}

plenty_admin.UI.main = {};
plenty_admin.UI.main.DOM = $("#main-panel");
plenty_admin.UI.settings = {};
plenty_admin.UI.settings.organization = {};
plenty_admin.UI.settings.DOM = plenty_admin.UI.main.DOM.find("#settings");
plenty_admin.UI.currentScreen = plenty_admin.UI.settings.DOM;
plenty_admin.UI.settings.new_organization = plenty_admin.UI.settings.DOM.find(".newOrgContainer");


//create HTML for an organization element in the settings
plenty_admin.UI.settings.organization.create = function(org){
	console.log("plenty_admin.UI.settings.organization.create:", org, plenty_admin.DATA.organizationTypes, plenty_admin.DATA.organizationTypes[org.organizationTypeId]);
	var org_html = '<div class="col-xs-12 col-sm-6 col-md-4 organization" data-orgid="'+org.id+'">'+
			  		'<div class="panel panel-primary text-center">'+
						'<div class="panel-heading">'+
				  			'<h2 class="panel-title text-center editable" data-type="text" data-name="name" data-pk="'+org.id+'/organizations" data-title="Name this Organization">'+org.name+'</h2>'+
				  			'<p class="text-muted editable" data-type="select" data-name="organizationTypeId" data-pk="'+org.id+'/organizations" data-title="Choose the Organization Type" data-source="[{value: 0, text: \'Landowner\'}, {value: 2, text: \'Custom Farmer\'}, {value: 3, text: \'Service Provider\'}, {value: 4, text: \'Vendor\'}]">'+plenty_admin.DATA.organizationTypes[org.organizationTypeId].name+'</p>'+
						'</div>'+
						'<div class="panel-body">'+
				  			'<p class="text-left lead2 mbn"><span class="editable" data-type="text" data-name="addressLine1" data-pk="'+org.id+'/organizations" data-title="Edit Address Line 1">'+org.addressLine1+'</span>, <span class="editable" data-type="text" data-name="addressLine2" data-pk="'+org.id+'/organizations" data-title="Edit Address Line 2">'+org.addressLine2+'</span></p>'+
							'<p class="text-left lead2 mbn"><span class="editable" data-type="text" data-name="city" data-pk="'+org.id+'/organizations" data-title="Edit City">'+org.city+'</span>, <span class="editable" data-type="text" data-name="state" data-pk="'+org.id+'/organizations" data-title="Edit State">'+org.state+'</span></p>'+
							'<p class="text-left lead2"><span class="editable" data-type="text" data-name="zip" data-pk="'+org.id+'/organizations" data-title="Edit Zip">'+org.zip+'</span></p>'+
				  			'<div class="orgAssets">'+
				  				'<div class="equal">'+
									'<div class="col-xs-2 col-sm-6">'+
										'<a href="#farms" class="farms asset">Farms (<span class="count">'+(org.farms ? org.farms.length : 0)+'</span>)</a>'+
									'</div>'+
									'<div class="col-xs-2 col-sm-6">'+
										'<a href="#fields" class="fields asset">Fields (<span class="count">'+(org.fieldsAndCropTypes ? org.fieldsAndCropTypes.length : 0)+'</span>)</a>'+
									'</div>'+
								'</div>'+
								'<div class="equal">'+
									'<div class="col-xs-2 col-sm-6">'+
										'<a href="#users" class="users asset">Users (<span class="count">'+(org.users ? org.users.length : 0)+'</span>)</a>'+
									'</div>'+
									'<div class="col-xs-2 col-sm-6">'+
										'<a href="#equipments" class="equipment asset">Equipment (<span class="count">'+(org.equipments ? org.equipments.length : 0)+'</span>)</a>'+
									'</div>'+
								'</div>'+
								'<div class="equal">'+
									'<div class="col-xs-2 col-sm-6">'+
										'<a href="#products" class="products asset">Products (<span class="count">'+(org.products ? Object.keys(org.products).length : 0)+'</span>)</a>'+
									'</div>'+
									'<div class="col-xs-2 col-sm-6">'+
										'<a href="#plans" class="plans asset">Plans (<span class="count">'+(org.plans ? org.plans.length : 0)+'</span>)</a>'+
									'</div>'+
								'</div>'+
								'<div class="equal">'+	
									'<div class="col-xs-2 col-sm-6">'+
										'<a href="#skills" class="skills asset">Skills (<span class="count">'+(org.skills ? org.skills.length : 0)+'</span>)</a>'+
									'</div>'+
									'<div class="col-xs-2 col-sm-6">'+
										'<a href="#payments" class="payment asset">Payment (<span class="count">'+(org.payments ? org.payments.length : 0)+'</span>)</a>'+
									'</div>'+
								'</div>'+
							'</div>'+
						'</div>'+
					  '</div>'+
					'</div>'+
				'</div>';
	var $org_html = $(org_html);
	
	$org_html
	.find("a.asset")
	.off("click")
	.on("click", function(e){
		plenty_admin.HELPER.showLoadingOverlay();
		// get the organization ID
		var orgId = $(e.target).closest(".organization").data("orgid");
		// store it
		store.set('filter::organization', orgId);
		
		//build the breadcrumb trail object
		var field_breadcrumb = [
			{
				class:"back toSettings",
				name:"Settings",
				clickHandler:function(){
					plenty_admin.UI.currentScreen
					.fadeOut("normal", function(){
						plenty_admin.UI.currentScreen = plenty_admin.UI.settings.DOM;
						plenty_admin.UI.currentScreen.fadeIn("normal");
					});
					return false;
				}
			},
			{
				class:"active",
				name:plenty_admin.DATA.organizations[orgId].name,
				clickHandler:null
			}
		];
		
		plenty_admin.UI.organization.DOM
		.find(".breadcrumb-trail")
		.remove()
		.end()
		.prepend(plenty_admin.UI.build_breadcrumb_trail(field_breadcrumb));
							
							
		//build the organization panel
		plenty_admin.UI.organization.init(plenty_admin.DATA.organizations[orgId], e.currentTarget.hash);
		
		console.log("e.currentTarget.hash", e.currentTarget.hash);
		
		//show the selected item in the side nav
		plenty_admin.UI.sideBar.organizations.DOM
		.find(".panel-collapse.in")
		.removeClass("in")
		.end()
		.find(".panel-collapse[data-orgid='"+orgId+"']")
		.addClass("in")
		.find("li.sub")
		.removeClass("active")
		.end()
		.find("li.sub a[href='"+e.currentTarget.hash+"']")
		.parent()
		.addClass("active");
		
		return false;
	})
	.end()
	.find(".editable")
	.editable(plenty_admin.REST.inline_editing_options);
	
	return $org_html;
}

plenty_admin.UI.settings.init = function(){
	//store a ref to the organization items:
	plenty_admin.UI.settings.organizations = plenty_admin.UI.settings.DOM.find(".organizations");
	
	//empty it's current contents
	plenty_admin.UI.settings.organizations
	.find(".organization")
	.remove();
	
	//loop organizations and inject Organizations DOM
	for(id in plenty_admin.DATA.organizations){
		if(
			plenty_admin.DATA.organizations.hasOwnProperty(id)
			&& id !== "length"
		){
			
			var org = plenty_admin.DATA.organizations[id];
			
			//TODO: this should go before NEW ORGANIZATION and not PREPENDED
			plenty_admin.UI.settings.organizations.prepend(plenty_admin.UI.settings.organization.create(org));
		}
	}
	//build the breadcrumb trail object
	var fsettings_breadcrumb = [
		{
			class:"active",
			name:"Settings",
			clickHandler:null
		}
	];
	
	plenty_admin.UI.settings.DOM
	.find(".breadcrumb-trail")
	.remove()
	.end()
	.prepend(plenty_admin.UI.build_breadcrumb_trail(fsettings_breadcrumb));
	
	// enable editable on dynamic fields
	//$('.editable').editable(plenty_admin.REST.inline_editing_options);
};

$( document ).on( "organization_data_ready", function( event, orgs ) {
	plenty_admin.UI.settings.new_organization
	.find("button.newOrg")
	.off("click")
	.on("click", function(){
		var $form = $(this).closest(".panel").find("form");
		var organizationDto = {};
		organizationDto.name = $form.find("#new_org_name").val();
		organizationDto.organizationTypeId = parseInt($form.find("#new_org_type").val());
		organizationDto.addressLine1 = $form.find("#new_org_address_1").val();
		organizationDto.addressLine2 = $form.find("#new_org_address_2").val();
		organizationDto.city = $form.find("#new_org_city").val();
		organizationDto.state = $form.find("#new_org_state").val();
		organizationDto.zip = $form.find("#new_org_zip").val();
		
		console.log("organizationDto: ", organizationDto);
		
		$form
		.fadeOut("fast", function(){
			plenty_admin.UI.settings.new_organization
			.find(".alert-info")
			.fadeIn("fast");
		});
		plenty_admin.REST.insertOrganization.post(organizationDto).then(
			function(insertedOrg){
				console.log("organization inserted: ", insertedOrg().data);
				
				var roleData = {
					organizationId:insertedOrg().data.id,
					userId: plenty_admin.DATA.userDetails.id,
					roleTypeId:1
				};
				plenty_admin.REST.insertRole.post(roleData).then(function(newUser){
					plenty_admin.UI.settings.new_organization
					.find(".alert-info")
					.fadeOut("fast", function(){
						plenty_admin.UI.settings.new_organization
						.find(".alert-success")
						.fadeIn("fast");
						
						var to = setTimeout(function(){
							plenty_admin.UI.settings.new_organization
							.find(".alert-success")
							.fadeOut("fast", function(){
								$form
								.fadeIn("fast");
							});
						}, 5000);
					});
					
					//TODO: this should go before NEW ORGANIZATION and not PREPENDED
					plenty_admin.UI.settings.organizations.prepend(plenty_admin.UI.settings.organization.create(insertedOrg().data));
				});
			},
			function(){
				plenty_admin.UI.settings.new_organization
				.find(".alert-info")
				.fadeOut("fast", function(){
					plenty_admin.UI.settings.new_organization
					.find(".alert-danger")
					.fadeIn("fast");
					
					var to = setTimeout(function(){
						plenty_admin.UI.settings.new_organization
						.find(".alert-danger")
						.fadeOut("fast", function(){
							$form
							.fadeIn("fast");
						});
					}, 5000);
				});
			}
		)
		return false;
	})
	.end()
	.find("a.moreDetailsToggle")
	.off("click")
	.on("click", function(){
		$(this)
		.find("span")
		.toggle()
		.end()
		.parent()
		.find(".more-details")
		.slideToggle();
		return false;
	});
	
    plenty_admin.UI.settings.init();
});