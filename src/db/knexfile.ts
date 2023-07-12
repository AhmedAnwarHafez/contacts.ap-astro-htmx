import { join } from "node:path";

import { dirname } from "path";
import { fileURLToPath } from "url";

//@ts-ignore
const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
  development: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: join(__dirname, "dev.sqlite3"),
    },
    pool: {
      afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb),
    },
  },

  test: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: ":memory:",
    },
    migrations: {
      directory: join(__dirname, "migrations"),
    },
    seeds: {
      directory: join(__dirname, "seeds"),
    },
    pool: {
      afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb),
    },
  },

  production: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: "/app/storage/prod.sqlite3",
    },
    pool: {
      afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb),
    },
  },
};