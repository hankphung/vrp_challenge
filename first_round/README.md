# honestbee Logistic Challenge -  First Round

In this challenge, we try to build a solver to Vehicle Routing Problem (VRP).

## About VRP

The vehicle routing problem (VRP) is a combinatorial optimization and integer programming problem which asks "What is the optimal set of routes for a fleet of vehicles to traverse in order to deliver to a given set of customers?". One application of VRP is to deliver goods located at a central depot to customers who have placed orders for such goods and minimize the total route cost. VRP is one of the most challenging combinatorial optimization task.

In this challenge, you are going to build the solver for various variation of VRP. Each variation has certain application in various context of logistic industry.

### Common terms

- Depot: Depot represents the location where the car will start the trip by picking up all the goods which are required to deliver to customers. After the trip ends, the car will need to come back to the depot to start the next trip.

- Customer Location: Customer Location is the place where goods should be delivered to or collected from.

For example, if honestbee needs to deliver goods from Metro to your house. Metro would be the *Depot* and your house would be *Customer Location*. Depot & Customer Location is represented by 2 numbers: (x, y) which is the cartisan coordinate of the place on the 2D plane.

- Vehicle Capacity: This unit represents how much a vehicle can carry.
- Customer Demand: This represents the amount of goods a Customer at Customer Location is expecting

For example, I want to deliver 3 packs of rices to Lan's house and my vehicle can carry 10 packs of rice. 10 is the vehicle capacity and 3 is the Customer Demand. In order to simplify the problem, we want to represent both Vehicle Capacity & Customer Demand as unit of goods. In real life, the customer will buy various products with different size & weight from the store. Therefore, there would be another step to standardize all the product size & weight into standard unit of goods.

- Distance travel: This allows us to calculate how long the vehicle needs to travel from point A to point B. Again for the simplicity of the problem, we use the length of the straightline from point A to point B to be the distance travel.

### Submission & Performance Evaluation

We test the performance of your solver using the following methods.
Step 1: You create a gitlab account at https://gitlab.honestbee.com. You can create a respository on gitlab & push your first commit using the template code we have here: <TBD>

Step 2: You push your application to gitlab with Dockerfile which represents how your web service will be packaged.

Step 3: gitlab will base on the yml file to run the build which would includes:
- Build the Docker image from Dockerfile of your application
- Start the container from docker image and map of 80 of the container to a seperate port on the host
- Advertise the service endpoint to all the load testing server
- Load testing server will test the server and get the score of your solver

Step 4: The evaluator will calculate both:
- The cost of the solution to the problem
- A solver is considered to be ineligible if the response time is greater than *1 minute* for any problem

We consider all problems have the same weight so the lower the sum of all cost, the higher the rank in the leaderboard

### Capacinated Vehicle Routing Problem (CVRP)


In CVRP, we assume:
- All delivery vehicles of uniform capacity have a fixed capacity (represented by X units of goods).
- The vehicle cannot carry more than their capacity (X units of goods) in one round of delivery.
- There is only 1 depot to deliver the goods from.

Optimization objective:
- To minimize the transit cost i.e. the total distance travelled by all the vehicles in order to deliver one batch of customers

Parameters:
- problem_name: Name of the problem / test case
- problem_data: Detail information about the problem
- customer_locations: The location of each customer representing by (x, y) coordinate in the 2D plane
- customer_demands: the standardized amount / size of goods & products needed to be delivered
- depot: location where we can pick up the goods and delivery to customers
- vehicle_capacity: how much all vehicles in the system can carry
- routes: the grouping of customers for delivery, each group is a list in order of customer ids (represent by the number between 0 to size of customer_demands array)

**Sizes of customer_demands, customer_demands are all the same**

## Specification
The HTTP request from the client to the server is based on the following format:

```
Request
    POST /cvrp HTTP/1.1
    Content-Type: application/json
    Content-Length: <length>
    {
        "problem_name": "name",
        "problem_data": {
            "vehicle_capacity": <INT>,
            "depot": [<x>, <y>],
            "customer_locations": [[<x>, <y>], ...],
            "customer_demands": [...]
        }
    }

Response
    {
        "routes": [
            [0, 2, 4],
            [1, 3]
        ]
    }
```

### Multi-Depot Vehicle Routing Problem (MDVRP)

Other assumptions:
- There are multiple depots that goods & services can be delivered from.
- The vehicle can choose to start from any of the depots and deliver the goods to customers.
- We will also assume that if the car leaves from one depot, they need to come back to that depot.
- All car has the same capacity

Optimization objective:
- To minimize the transit cost i.e. the total distance travelled by all the vehicles in order to deliver one batch of customers from all the depots

Parameters:
- problem_name: Name of the problem / test case
- problem_data: Detail information about the problem
- customer_locations: The location of each customer representing by (x, y) coordinate in the 2D plane
- customer_demands: the standardized amount / size of goods & products needed to be delivered
- depots: The list of locations where goods & service can be delivered from. Each location is representing by a (x, y) coordinate in the 2D plane
- vehicle_capacity: how much all vehicles in the system can carry
- routes: The route would be the list of size n (the size of the depots array ~ total number of depots). Each entry represents all the routes for each depot. One route is a list of customer whom we will goods in order

**Sizes of customer_demands, customer_demands are all the same**

```
Request
    POST /mdcvrp HTTP/1.1
    Content-Type: application/json
    Content-Length: <length>
    {
        "problem_name": "name",
        "problem_data": {
            "vehicle_capacity": <INT>,
            "depots": [[<x>, <y>], ...],
            "customer_locations": [[<x>, <y>], ...],
            "customer_demands": [...]
        }

    }

Response
    {
        "routes": [
            [[0, 2, 4]], # Routes from the first depot
            [[1, 3]],    # Routes from the second depot
        ]
    }
```
