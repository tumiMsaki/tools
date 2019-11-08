const infinity = Number.MAX_SAFE_INTEGER;
const graph = {};
const costs = {};
const parents = {};
const processed = [];
graph["start"] = {};
graph["start"]["a"] = 6;
graph["start"]["b"] = 2;
graph["a"] = {};
graph["a"]["fin"] = 1;
graph["b"] = {};
graph["b"]["a"] = 3;
graph["b"]["fin"] = 5;
graph["fin"] = {};
costs["a"] = 6;
costs["b"] = 2;
costs["fin"] = infinity;
parents["a"] = "start";
parents["b"] = "start";
parents["fin"] = null;

const find_lowest_cost_node = costs => {
  let lowest_cost = infinity;
  let lowest_cost_node = null;
  for (let node in costs) {
    let cost = costs[node];
    if (cost < lowest_cost && processed.indexOf(node) == -1) {
      lowest_cost = cost;
      lowest_cost_node = node;
    }
  }
  return lowest_cost_node;
};

let node = find_lowest_cost_node(costs);
while (node !== null) {
  let cost = costs[node];
  let neighbors = graph[node];
  for (let n in neighbors) {
    let new_cost = cost + neighbors[n];
    if (costs[n] > new_cost) {
      costs[n] = new_cost;
      parents[n] = node;
    }
  }
  processed.push(node);
  node = find_lowest_cost_node(costs);
}
console.log(costs);
