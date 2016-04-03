var fs = require('fs');
var getPixels = require("get-pixels");
var ndarray = require("ndarray");
var img = process.argv[2];
var R = 0;
var G = 1;
var B = 2;
var A = 3;

function makeShadow(row, col, r, g, b, a) {
    return row + "px " + col + "px 0px rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
}

function ndarrayToCSS(pixels) {
    var allData = "";
    var row;
    var col;
    var temp = "";

    for (row = 0; row < pixels.shape[0]; row++) {
        for (col = 0; col < pixels.shape[1]; col++) {
            if (allData) {
                allData += ", "
            }

            allData += makeShadow(
                row,
                col,
                pixels.get(row, col, R),
                pixels.get(row, col, G),
                pixels.get(row, col, B),
                pixels.get(row, col, A));
        }
    }
    allData = ".target {box-shadow:" + allData + "; height: 1px; width: 1px;}";
    return allData;
}

getPixels(img, function(err, pixels) {
    if (err) {
        console.log("Bad image path");
        return;
    }
    console.log(ndarrayToCSS(pixels));
    fs.writeFile(img + ".txt", JSON.stringify(ndarrayToCSS(pixels)), function(err) {
        if (err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });
});