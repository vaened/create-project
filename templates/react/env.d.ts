/// <reference types="vite/client" />

/**
 * Interface merging to add custom environment variables.
 * Use this to get autocomplete for import.meta.env.
 */
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
