/**
 * @author enea dhack <contact@vaened.dev>
 * @link https://vaened.dev DevFolio
 */

import type { LoaderFunction, RouteObject } from "react-router-dom";
import type { RouteDefinition, RouteFileModule } from "./types";

const modules = import.meta.glob("./../pages/**/app.routes.ts", { eager: true });

const indexed = Object.entries(modules).reduce<Record<string, RouteFileModule[]>>((acc, [path, mod]) => {
  const match = path.match(/\/pages\/([^/]+)\//);

  if (!match) {
    return acc;
  }

  const key = match[1];

  acc[key] ??= [];
  acc[key].push(mod as RouteFileModule);

  return acc;
}, {});

export function collapse(module: string) {
  return (indexed[module] ?? []).flatMap((m) => m.default);
}

export function apply(payload: RouteDefinition["payload"]): RouteObject["loader"] {
  return payload === undefined
    ? undefined
    : async (...args: Parameters<LoaderFunction>) => {
        const { metadata } = await payload(...args);

        return {
          ...(metadata || {}),
        };
      };
}

export function resolver({ path, children, entry, payload, crumb }: RouteDefinition): RouteObject {
  return {
    path: path === "/" ? "" : path,
    children: children?.map(resolver),
    handle: {
      crumb,
    },
    loader: apply(payload),
    lazy: async () => {
      const { default: Component } = await entry();
      return { Component };
    },
  };
}
