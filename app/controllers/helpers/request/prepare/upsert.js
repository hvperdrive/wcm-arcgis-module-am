module.exports = function(data) {
    data.shapes.forEach(function(item) {
        // Set create/update request
        item.options = {
            json: true,
            method: "POST",
            url: data.variables[item.ref.type + "Url"] + "/" + item.method,
            qs: {
                f: "json",
                features: JSON.stringify(item.geometry)
            }
        };
    });

    return data;
};
