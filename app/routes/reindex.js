require("rootpath")();

var controller = require("../controllers");

// Get the configuration of the WCM
var config = require("@wcm/module-helper").getConfig();
// This is a helper middleware function to check if the user is logged in
var ProfileSecurity = require("@wcm/module-helper").profileSecurity;
// This is a helper middleware function to specify which method is used. This will be used in the PermissionsSecurity function.
// There are four methods available: read, create, update and delete.
var MethodSecurity = require("@wcm/module-helper").methodSecurity;
// This is a helper middleware function generator that returns a middleware function that can be injected into route as seen below.
// The function will check if the user has the right permissions to execute this action.
// You need to specify the operation type that needs to be checked against (in this case it is the operation type specified in our package.json file).
var PermissionsSecurity = require("@wcm/module-helper").permissionsSecurity("arcgis-am");
// Building the baseUrl based on the configuration. Every API call needs to be located after the api/ route
var baseUrl = "/" + config.api.prefix + config.api.version + "arcgis-am";

module.exports = function(app) {
	app.route(baseUrl + "/reindex").put(ProfileSecurity, MethodSecurity.update, PermissionsSecurity, controller.reindex);
};
