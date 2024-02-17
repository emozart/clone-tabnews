import database from "infra/database";

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const dbName = process.env.POSTGRES_DB;

  const dbVersion = await database.query("SHOW server_version;");
  const dbMaxConnections = await database.query("SHOW max_connections;");
  const dbOpenedConnections = await database.query({
    text: `SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;`,
    values: [dbName],
  });

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: dbVersion.rows[0].server_version,
        max_connections: parseInt(dbMaxConnections.rows[0].max_connections),
        opened_connections: dbOpenedConnections.rows[0].count,
      },
    },
  });
}

export default status;
