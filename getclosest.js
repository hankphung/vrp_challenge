var math= require('mathjs');
function distance(p1, p2) {
    return math.abs(p1[0] - p2[0]) + math.abs(p1[1] - p2[1]);
}

function getClosest(x, targets,occupied) {
    var min;
    var res;
    for (i in targets) {
    		if( occupied[i])
    			continue;
        dis = distance(x, targets[i]);
        if (!min || dis < min) {
            min = dis;
            res = i;
        }
    }
    return res;
}
module.exports={distance:distance,getClosest: getClosest}
