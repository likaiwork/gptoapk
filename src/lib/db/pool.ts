import { createPool as createVercelPool } from "@vercel/postgres";
import { Pool as PgPool, type QueryResultRow } from "pg";

type Primitive = string | number | boolean | null | undefined;

export type SqlResult<T extends QueryResultRow> = {
  rows: T[];
  rowCount: number | null;
};

export type DbClient = {
  sql<T extends QueryResultRow>(
    strings: TemplateStringsArray,
    ...values: Primitive[]
  ): Promise<SqlResult<T>>;
  query<T extends QueryResultRow>(
    text: string,
    params?: Primitive[]
  ): Promise<{ rows: T[] }>;
  release(): void;
};

export type DbPool = {
  connect(): Promise<DbClient>;
};

function taggedQuery(strings: TemplateStringsArray, values: Primitive[]) {
  let text = strings[0] ?? "";
  const params: Primitive[] = [];
  for (let i = 0; i < values.length; i++) {
    params.push(values[i]);
    text += `$${i + 1}` + (strings[i + 1] ?? "");
  }
  return { text, params };
}

/** @vercel/postgres createPool() only accepts Neon pooled URLs; use node-postgres elsewhere. */
function useNodePg(url: string | undefined): boolean {
  if (!url) return false;
  if (process.env.POSTGRES_USE_PG === "1") return true;
  try {
    const u = new URL(url.replace(/^postgresql:/, "postgres:"));
    const host = u.hostname.toLowerCase();
    if (host === "127.0.0.1" || host === "localhost" || host === "::1") return true;
    return !host.includes("-pooler");
  } catch {
    return false;
  }
}

function createNodePgPool(): DbPool {
  const pgPool = new PgPool({ connectionString: process.env.POSTGRES_URL });

  return {
    async connect() {
      const client = await pgPool.connect();
      return {
        async sql<T extends QueryResultRow>(
          strings: TemplateStringsArray,
          ...values: Primitive[]
        ) {
          const { text, params } = taggedQuery(strings, values);
          const result = await client.query<T>(text, params as unknown[]);
          return { rows: result.rows, rowCount: result.rowCount };
        },
        async query<T extends QueryResultRow>(text: string, params: Primitive[] = []) {
          const result = await client.query<T>(text, params as unknown[]);
          return { rows: result.rows };
        },
        release() {
          client.release();
        },
      };
    },
  };
}

function wrapVercelPool(vercelPool: ReturnType<typeof createVercelPool>): DbPool {
  return {
    async connect() {
      const client = await vercelPool.connect();
      return {
        async sql<T extends QueryResultRow>(
          strings: TemplateStringsArray,
          ...values: Primitive[]
        ) {
          return client.sql<T>(strings, ...values);
        },
        async query<T extends QueryResultRow>(text: string, params: Primitive[] = []) {
          const result = await client.query<T>(text, params);
          return { rows: result.rows };
        },
        release() {
          client.release();
        },
      };
    },
  };
}

let pool: DbPool | null = null;

export function getDbPool(): DbPool {
  if (!pool) {
    const url = process.env.POSTGRES_URL;
    pool = useNodePg(url) ? createNodePgPool() : wrapVercelPool(createVercelPool());
  }
  return pool;
}
