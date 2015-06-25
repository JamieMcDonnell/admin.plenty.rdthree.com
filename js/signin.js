
var plenty_admin = {};
plenty_admin.UI = {};
plenty_admin.UI.login = {};
plenty_admin.UI.login.signinForm = $(".form-signin");
plenty_admin.UI.login.usernameField = plenty_admin.UI.login.signinForm.find("#inputEmail");
plenty_admin.UI.login.passwordField = plenty_admin.UI.login.signinForm.find("#inputPassword");
plenty_admin.UI.login.signin = plenty_admin.UI.login.signinForm.find("button[type='submit']");

plenty_admin.REST = {};
plenty_admin.REST.URL = '52.5.118.250:8080/plenty';
plenty_admin.REST.fullURL = "http://"+plenty_admin.REST.URL;

plenty_admin.HELPER = {};
//pull params from the URL query string
plenty_admin.HELPER.getParameterByName = function(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(location.search);
	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var uid = plenty_admin.HELPER.getParameterByName('uid');

plenty_admin.REST.make_base_auth = function(user, password) {
  var tok = user + ':' + password;
  var hash = btoa(tok);
  var basicAuth = "Basic " + hash;
  console.log("basicAuth:", basicAuth);
  return basicAuth;
}

plenty_admin.api = restful(plenty_admin.REST.URL);

plenty_admin.UI.login.signin.click(function(){
	var un = plenty_admin.UI.login.usernameField.val();
	var pw = plenty_admin.UI.login.passwordField.val();
	var user = plenty_admin.api.one("users/getUserWithUsername", plenty_admin.UI.login.usernameField.val());
	user.header("Authorization", plenty_admin.REST.make_base_auth(un,pw));
	user.get().then(function(response) {
		var userEntity = response.body();
		var user_data = userEntity.data();
		console.log("user_data: ", user_data); // user logged in successfully
		store.set("basicAuth", plenty_admin.REST.make_base_auth(un,pw));
		store.set("plenty_username", un);
		location.href = "/dashboard.html";
	});
	return false;
});

if(uid){
	console.log("User Invited: ", uid);
}else{
	console.log("User Not Invited: ");
}

// clear console logs on successful login
// this signifies the beginning of a new user session
//store.remove('consoleLogs');