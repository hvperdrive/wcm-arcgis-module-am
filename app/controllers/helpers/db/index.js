var findExistingItems = require("./findExistingItems");
var findDeletedItems = require("./findDeletedItems");
var getAllProjects = require("./getAllProjects");
var removeAllItems = require("./removeAllItems");
var removeDeletedItems = require("./removeDeletedItems");
var updateExistingItems = require("./updateExistingItems");

module.exports = {
    findDeletedItems: findDeletedItems,
    findExistingItems: findExistingItems,
    getAllProjects: getAllProjects,
    removeAllItems: removeAllItems,
    removeDeletedItems: removeDeletedItems,
    updateExistingItems: updateExistingItems
};
