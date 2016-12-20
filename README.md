# Sample application

[![build status](https://gitlab.honestbee.com/binhngoc17/vrp_public/badges/master/build.svg)](https://gitlab.honestbee.com/binhngoc17/vrp_public/commits/master)

This is an example application that does not do much.

Read [First Round](first_round/) Instructions.


## Docker & Gitlab CI Overview:

### Local build

You may build the Docker image locally:
```
docker build -t myapp .
```

And start the application locally:
```
docker run -d -p 80:5000 --name myapp myapp
```

You can now test your application responses:
```
curl localhost
```

###First Problem: 1 depot

####Request API:

`POST localhost:3001/cvrp`

Postman JSON body:

```javascript
{problem_name:"name",problem_data:{vehicle_capacity:100,depot:[1,-1],customer_demands:[2,1,3,9,13,21,6,22,10,23,2,15,10,23,8,5,14,6,15,18,15,10,17,1,1,18,7,12,9,26,60,12,17,9,7,13,24,10,17,24,25,1,20,14,6,9,11,2,11,17,3,1,8,12,9,13],customer_locations:[[37,61],[77,81],[35,21],[1,93],[21,39],[63,7],[97,95],[3,7],[5,3],[36,22],[64,10],[6,8],[24,40],[86,82],[68,14],[28,46],[10,8],[8,14],[10,10],[104,104],[38,24],[80,82],[22,46],[26,40],[4,10],[10,12],[26,44],[4,10],[4,98],[78,82],[64,8],[98,98],[24,40],[10,8],[8,96],[8,8],[84,90],[8,8],[86,86],[6,94],[10,10],[80,82],[102,96],[36,26],[44,28],[22,46],[100,100],[28,42],[30,40],[78,84],[10,4],[78,84],[6,8],[10,94],[40,66],[10,16]]}};
```

###Second Problem: Multiple Depot

`localhost:3001/mdcvrp`

Postman JSON body

```
var data=JSON.stringify({problem_name:"name",problem_data:{vehicle_capacity:100,customer_locations:[[41,49],[35,17],[55,45],[55,20],[15,30],[25,30],[20,50],[10,43],[55,60],[30,60],[20,65],[50,35],[30,25],[15,10],[30,5],[10,20],[5,30],[20,40],[15,60],[45,65],[45,20],[45,10],[55,5],[65,35],[65,20],[45,30],[35,40],[41,37],[64,42],[40,60],[31,52],[35,69],[53,52],[65,55],[63,65],[2,60],[20,20],[5,5],[60,12],[40,25],[42,7],[24,12],[23,3],[11,14],[6,38],[2,48],[8,56],[13,52],[6,68],[47,47],[49,58],[27,43],[37,31],[57,29],[63,23],[53,12],[32,12],[36,26],[21,24],[17,34],[12,24],[24,58],[27,69],[15,77],[62,77],[49,73],[67,5],[56,39],[37,47],[37,56],[57,68],[47,16],[44,17],[46,13],[49,11],[49,42],[53,43],[61,52],[57,48],[56,37],[55,54],[15,47],[14,37],[11,31],[16,22],[4,18],[28,18],[26,52],[26,35],[31,67],[15,19],[22,22],[18,24],[26,27],[25,24],[22,27],[25,21],[19,21],[20,26],[18,18]],customer_demands:[10,7,13,19,26,3,5,9,16,16,12,19,23,20,8,19,2,12,17,9,11,18,29,3,6,17,16,16,9,21,27,23,11,14,8,5,8,16,31,9,5,5,7,18,16,1,27,36,30,13,10,9,14,18,2,6,7,18,28,3,13,19,10,9,20,25,25,36,6,5,15,25,9,8,18,13,14,3,23,6,26,16,11,7,41,35,26,9,15,3,1,2,22,27,20,11,12,10,9,17],depots:[[15,20],[50,20],[35,55]]}}),xhr=new XMLHttpRequest;xhr.withCredentials=!0,xhr.addEventListener("readystatechange",function(){4===this.readyState&&console.log(this.responseText)}),xhr.open("POST","http://localhost:3000/mdcvrp"),xhr.setRequestHeader("content-type","application/json"),xhr.setRequestHeader("cache-control","no-cache"),xhr.setRequestHeader("postman-token","f794c53a-8810-18a5-064e-46ed6bbf2e6f"),xhr.send(data);
```
### Gitlab CI

Alternatively, you may use the images built by gitlab.

1. Provide your docker engine with your gitlab repository credentials.

   Use your gitlab username and password:
   ```
   docker login glr.honestbee.com
   ```

1. Once you push code, Gitlab will run a build the CI pipeline.
   ```
   docker run -d -p 80:5000 --name vrp_sample glr.honestbee.com/binhngoc17/vrp_sample:master
   ```

## Grading

Once the application is successfully deployed, a grading stage will evaluate the deployed code.

The resulting score will be updated and published to the [leaderboard](http://leaderboard.honestbee.com)
