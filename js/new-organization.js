//*********************** new-organization.js **************************//
//create namespace for new organization layout
plenty_admin.UI.newOrganization = {
	init: function(){
		if(plenty_admin.UI.newOrganization.DOM.data("ready")){
			return;
		}
		plenty_admin.UI.newOrganization.DOM
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
				plenty_admin.UI.newOrganization.DOM
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
						plenty_admin.UI.newOrganization.DOM
						.find(".alert-info")
						.fadeOut("fast", function(){
							plenty_admin.UI.newOrganization.DOM
							.find(".alert-success")
							.fadeIn("fast");
							
							var to = setTimeout(function(){
								plenty_admin.UI.newOrganization.DOM
								.find(".alert-success")
								.fadeOut("fast", function(){
									$form
									.fadeIn("fast");
								});
							}, 5000);
						});
						
						//populate the side bar organizations panel
						plenty_admin.UI.sideBar.organizations.DOM
						.find(".add-org")
						.before(plenty_admin.UI.sideBar.organizations.create(insertedOrg().data));
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
		
		plenty_admin.UI.newOrganization.DOM
		.data("ready", true);
	},
	clear: function(){
		
	}
	
};
plenty_admin.UI.newOrganization.DOM = plenty_admin.UI.main.DOM.find("#new-organization-container");