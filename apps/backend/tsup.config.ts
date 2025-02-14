import { defineConfig } from 'tsup';

export default defineConfig({
  // entry: ['src/**/*.ts'],
  entry: {
    main: 'src/index.ts',
    lambda: 'src/lambda/server.ts',
  },
  format: ['cjs'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  target: 'node18',
  external: ['better-sqlite3', 'sqlite3', 'pg-query-stream', 'tedious', 'mysql', 'mysql2', 'oracledb'],
  noExternal: [/^(?!better-sqlite3|sqlite3|pg-query-stream|tedious|mysql|mysql2|oracledb).*$/],
});
