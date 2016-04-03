var fs = require('fs');
var getPixels = require("get-pixels");
var ndarray = require("ndarray");
var img = process.argv[2];
var R = 0;
var G = 1;
var B = 2;
var A = 3;

function ndarrayToMultiArray(pixels) {
    var allData = [];
    var rowData;
    var pixelData;
    var row;
    var col;

    for (row = 0; row < pixels.shape[0]; row++) {
        rowData = [];
        for (col = 0; col < pixels.shape[1]; col++) {
            pixelData = [];
            pixelData.push(pixels.get(row, col, R));
            pixelData.push(pixels.get(row, col, G));
            pixelData.push(pixels.get(row, col, B));
            pixelData.push(pixels.get(row, col, A));
            rowData.push(pixelData);
        }
        allData.push(rowData);
    }
    return allData;
}

getPixels(img, function(err, pixels) {
    if (err) {
        console.log("Bad image path");
        return;
    }
    console.log(ndarrayToMultiArray(pixels));
    fs.writeFile(img + ".txt", JSON.stringify(ndarrayToMultiArray(pixels)), function(err) {
        if (err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });
});