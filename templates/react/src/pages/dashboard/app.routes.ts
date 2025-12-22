/**
 * @author enea dhack <contact@vaened.dev>
 * @link https://vaened.dev DevFolio
 */
import type { RouteDefinition } from "@/router/types";

export default [
  {
    path: "/",
    crumb: () => "Dashboard",
    entry: () => import("./DashboardPage"),
  },
] satisfies RouteDefinition[];
