var math = require('mathjs');
var util = require('./getclosest.js');

function minRange(x, targets, occupied) {
    var min;
    var res;
    for (i in targets) {
        if (occupied[i])
            continue;
        dis = util.distance(x, targets[i]);
        if (!min || dis < min) {
            min = dis;
            res = i;
        }
    }
    return { indx: res, dis: min };
}

function closestByDepot(depots, targets, occupied) {
    var result, target, min;
    console.log(depots)
    for (var i in depots) {
        var range = minRange(depots[i], targets, occupied);
        if (!min || range.dis < min) {
            min = range.dis;
            result = i;
            console.log('get', i)
            target = range.indx;
        }
    }
    return { depot: result, target: target }
}
module.exports = function(req, res) {
    var raw = req.body.toString();
    var data = JSON.parse(raw);
    var cordinator = {};
    var tracks = [];
    var main = data.problem_data
    var depots = main.depots;
    var targets = main.customer_locations;

    // while still have target
    // while enough capacity

    //step 1: set depot is current
    //step 2: find closest fit capacity target
    //step 3: +capacity
    //step 4: check capacity if > than vehicle then return 
    //step 5: set current = target; pop target; repeat
    var occupied = {};
    for (i in depots) {
        tracks[i] = [];
    }
    while (targets.length > Object.keys(occupied).length) {
        var current_route = []; // duong di hien tai
        var dnt = closestByDepot(depots, targets, occupied);
        var current_track = dnt.depot //remember current depot
        current_route.push(parseInt(dnt.target)) // get current target to route;
        var current = targets[dnt.target]; //remember current target
        occupied[dnt.target] = true; // occupy current target
        var current_capacity = main.customer_demands[dnt.target];
        while (current_capacity < data.problem_data.vehicle_capacity && targets.length > Object.keys(occupied).length) {
            //	console.log('find close',occupied,current_capacity)
            var j = util.getClosest(current, targets, occupied);
            if (j !== undefined) {

                newcapa = main.customer_demands[j] + current_capacity;
                // if qua tai
                if (newcapa > main.vehicle_capacity) {
                    // finish the route, 
                    // return to depot
                    break;
                } else {
                    //enough capacity, continue to go
                    current_route.push(parseInt(j));
                    current = targets[j];
                    current_capacity=newcapa;
                    occupied[j] = true;
                    if (targets.length == Object.keys(occupied).length) {
                        break;
                    }
                }
            }
        }
        tracks[current_track].push(current_route);
        console.log(main.vehicle_capacity, current_capacity)
        console.log(current_route, 'end', Object.keys(occupied).length);
    }

    res.send({
        "routes": tracks
    });
}
