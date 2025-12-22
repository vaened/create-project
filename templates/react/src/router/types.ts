/**
 * @author enea dhack <contact@vaened.dev>
 * @link https://vaened.dev DevFolio
 *
 * --------------------------------------------------------------------------------
 * ROUTING SYSTEM TYPE DEFINITIONS
 * --------------------------------------------------------------------------------
 * This file contains the TypeScript contracts (interfaces) used by the
 * Fractal/Distributed routing architecture.
 *
 * It defines how a route should be structured in the `app.routes.ts` files,
 * ensuring type safety for lazy loading, breadcrumbs, and data fetching.
 */

import type { ComponentType } from "react";
import type { LoaderFunction } from "react-router-dom";

/**
 * Represents the standard Promise returned by a dynamic import.
 *
 * This type enforces that the imported module MUST have a `default` export,
 * which corresponds to the React Page Component.
 *
 * @template T - The type of the React Component being imported.
 * @example () => import('./MyPage') // Returns DynamicImport<MyPage>
 */
export type DynamicImport<T> = Promise<{
  default: T;
}>;

/**
 * The Context Resolver (Loader).
 *
 * Executes before the route renders to fetch the **prerequisite configuration**
 * (metadata) needed for the page logic to function.
 *
 * Unlike a standard data fetch, this is intended for lightweight context
 * (like dropdown options or configs) rather than the primary massive content.
 *
 * @returns A promise containing the page context.
 */
export interface RouteLoaderResponse<T> {
  metadata?: T;
}

/**
 * The core configuration object for a single route in the architecture.
 *
 * This interface decouples the route definition from React Router's internal implementation,
 * allowing for custom logic like automatic lazy loading and breadcrumb generation.
 *
 * @template T - The React Component type (defaults to standard ComponentType).
 * @template M - The Metadata type used for breadcrumbs (crumb) and loaders (payload).
 */
export interface RouteDefinition<T extends ComponentType = ComponentType, M = unknown> {
  /**
   * The relative URL path for this route (e.g., "create", ":id").
   * Note: Do not use absolute paths (starting with /) in nested modules.
   */
  path: string;

  /**
   * The Lazy Loading function.
   * Must return a dynamic import of a component exported as `default`.
   *
   * @example () => import('./pages/MyPage')
   */
  entry: () => DynamicImport<T>;

  /**
   * A function to generate the "Breadcrumb" label for this route.
   * It receives the resolved metadata (from `payload`) to allow dynamic titles.
   *
   * @param metadata - The data returned by the payload loader.
   * @returns The string to display in the UI breadcrumb.
   */
  crumb: (metadata: M) => string;

  /**
   * The Asynchronous Data Resolver (Loader).
   *
   * This function executes **before** the route component is mounted.
   * Its purpose is to fetch and return the `metadata` (the essential state)
   * required for the page to initialize correctly.
   *
   * @returns A promise containing the essential data for the view.
   */
  payload?: (...args: Parameters<LoaderFunction>) => Promise<RouteLoaderResponse<M>>;

  /**
   * (Optional) Nested child routes.
   * Allows recursive definition of sub-modules.
   */
  children?: RouteDefinition[];
}

/**
 * Represents the structure of an `app.routes.ts` file.
 *
 * Every route module file must default export an array of `RouteDefinition`.
 * This is strict to ensure the `routes.ts` scanner can safely consume the file.
 */
export interface RouteFileModule {
  default: RouteDefinition[];
}
