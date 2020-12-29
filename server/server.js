"use strict";
exports.__esModule = true;
var express = require("express");
var http = require("http");
var WebSocket = require("ws");
var path = require("path");
var fs = require("fs");
var app = express();
app.use(express.static(path.join(__dirname, 'public')));
//initialize a simple http server
var server = http.createServer(app);
//initialize the WebSocket server instance
var wss = new WebSocket.Server({ server: server });
wss.on('connection', function (ws) {
    //connection is up, let's add a simple simple event
    ws.on('message', function (message) {
        fs.readFile('public/chart.json', 'utf8', function (err, data) {
            if (err) {
                ws.send(JSON.stringify('could not read file'));
            }
            var arr = JSON.parse(data);
            var i = 0;
            var _loop_1 = function (obj) {
                var objArr = arr[i];
                setTimeout(function () {
                    ws.send(JSON.stringify(objArr));
                }, 1000 * i);
                i++;
            };
            for (var obj in arr) {
                _loop_1(obj);
            }
        });
        //-----------------------------------------------------------
    });
});
//start our server
server.listen(process.env.PORT || 3000, function () {
    console.log("Server started on port " + (process.env.PORT || 3000) + " :)");
});
