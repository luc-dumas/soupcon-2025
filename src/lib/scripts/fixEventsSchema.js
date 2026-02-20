import { Client } from 'pg'

async function main() {
  const connectionString = process.env.DATABASE_URI

  if (!connectionString) {
    throw new Error('DATABASE_URI is required to fix the events schema.')
  }

  const client = new Client({ connectionString })

  await client.connect()

  try {
    await client.query('BEGIN')

    await client.query(`
      CREATE TABLE IF NOT EXISTS events (
        id serial PRIMARY KEY
      );
    `)

    await client.query(`
      ALTER TABLE events
      ADD COLUMN IF NOT EXISTS title varchar,
      ADD COLUMN IF NOT EXISTS start_date timestamptz,
      ADD COLUMN IF NOT EXISTS summary varchar,
      ADD COLUMN IF NOT EXISTS slug varchar,
      ADD COLUMN IF NOT EXISTS slug_lock boolean DEFAULT true,
      ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now(),
      ADD COLUMN IF NOT EXISTS created_at timestamptz DEFAULT now();
    `)

    await client.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS events_slug_idx ON events (slug);
    `)

    await client.query('COMMIT')
    console.log('Events schema is ready.')
  } catch (error) {
    await client.query('ROLLBACK')
    throw error
  } finally {
    await client.end()
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
