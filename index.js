//use strict;
var math = require('mathjs');
var express = require('express');
var util= require('./getclosest.js');
var mdcvrp = require('./mdcvrp.js');
var express = require('express')
var app = express()
var concat = require('concat-stream');
app.use(function(req, res, next) {
    req.pipe(concat(function(data) {
        req.body = data;
        next();
    }));
});
app.get('/', function(req, res) {
    res.send("let's rock!")
})
app.post('/mdcvrp',mdcvrp);
app.post('/cvrp', function(req, res) {
    var raw = req.body.toString();
    var data = JSON.parse(raw);
    var cordinator = {};
    var tracks = [];
    var main = data.problem_data

    var targets = main.customer_locations;

    // while still have target
    // while enough capacity

    //step 1: set depot is current
    //step 2: find closest fit capacity target
    //step 3: +capacity
    //step 4: check capacity if > than vehicle then return 
    //step 5: set current = target; pop target; repeat
    var occupied={};
    while (targets.length > Object.keys(occupied).length) {
        var current_route = []; // duong di hien tai
        console.log(current_route);
        var current = main.depot;
        var current_capacity = 0;
        while (current_capacity < data.problem_data.vehicle_capacity && targets.length > Object.keys(occupied).length) {
        //	console.log('find close',occupied,current_capacity)
            var j = util.getClosest(current, targets ,occupied);
            if (j!==undefined) {
            	
                newcapa = main.customer_demands[j] + current_capacity;
                // if qua tai
                 //console.log('max',main.vehicle_capacity)
                if (newcapa > main.vehicle_capacity) {
                    // finish the route, 
                    // return to depot
                   break;
                } else {
                    //enough capacity, continue to go
                    current_route.push(parseInt(j));
                    //console.log('new cap',newcapa);
                    current_capacity=newcapa
                    current=targets[j]
                    occupied[j]=true;
                    if (targets.length == Object.keys(occupied).length) {
                       break;
                    }
                }
            }
        }
        tracks.push(current_route);
         console.log(current_route,current_capacity, 'end',Object.keys(occupied).length);
    }
		
    res.send({
        "routes": tracks
    });
})

app.listen(3000, function() {
    console.log('Example app listening on port 3000!')
})
