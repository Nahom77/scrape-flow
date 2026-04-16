import { AppNode } from "@/types/app-node.type";
import { TaskRegistry } from "./task/registry";

export function CalculateWorklfowCost(nodes: AppNode[]) {
  return nodes.reduce((acc, node) => {
    return acc + TaskRegistry[node.data.type].credits;
  }, 0);
}
