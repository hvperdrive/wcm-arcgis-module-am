var reindex = require("./reindex");

module.exports = function(app) {
    // Require controllers to start listeners
    require("../controllers/create");
    require("../controllers/update");
    require("../controllers/remove");

    reindex(app);
};
