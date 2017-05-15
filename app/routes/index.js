module.exports = function() {
    // Require controllers to start listeners
    require("../controllers/create");
    require("../controllers/update");
    require("../controllers/remove");
};
