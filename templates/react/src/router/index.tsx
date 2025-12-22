/**
 * @author enea dhack <contact@vaened.dev>
 * @link https://vaened.dev DevFolio
 *
 * --------------------------------------------------------------------------------
 * MAIN ROUTER ENTRY POINT
 * --------------------------------------------------------------------------------
 * This file constructs the central routing tree for the application using a
 * "Distributed/Fractal" routing strategy.
 *
 * Instead of manually importing every page here, we define high-level Layouts
 * (like Dashboard, Auth, Public) and inject their specific routes dynamically
 * using the `build()` helper.
 *
 * Architecture:
 * - Root: The global wrapper (Providers, Scroll, Toasts). No visual UI.
 * - Children: Distinct semantic areas (Layouts) that act as siblings.
 */

import Root from "@/pages/Root";
import DashboardLayout from "@/pages/dashboard/DashboardLayout";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { collapse, resolver } from "./routes";

/**
 * Hydrates and transforms the distributed routes for a specific module.
 *
 * This function retrieves all route definitions associated with the given `module` key
 * (the prefix, e.g., "dashboard") from the file system scan. It then maps over them
 * using the `resolver` to attach lazy loading, metadata, and handles, making them
 * compatible with React Router.
 *
 * @param module - The unique key identifying the module bucket (e.g., "dashboard").
 * This usually corresponds to the first folder name inside `src/pages`.
 * @returns An array of resolved `RouteObject`s ready to be injected as `children`.
 */
function build(module: string) {
  return collapse(module).map(resolver);
}

export const router = createBrowserRouter([
  /**
   * The "Root" is the absolute ancestor of the entire app.
   * It doesn't render a specific page, but provides the global context
   * required by all children.
   */
  {
    id: "root",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Navigate to="/dashboard" replace />,
      },

      /**
       * Dashboard Module
       *
       * The `DashboardLayout` acts as the visual wrapper (Sidebar, Header, Body).
       * The `children` are dynamically injected using `build("dashboard")`, which
       * gathers all `app.routes.ts` files found under `src/pages/dashboard/**`.
       */
      {
        id: "dashboard",
        path: "/dashboard",
        element: <DashboardLayout />,
        children: build("dashboard"),
      },
    ],
  },
]);

export default router;
