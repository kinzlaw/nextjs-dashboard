import { Pool, PoolClient, QueryResult, QueryResultRow } from 'pg';

// Initialize PostgreSQL connection pool
const db = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Extended PoolClient interface with `sql`
interface ExtendedPoolClient extends PoolClient {
    sql<T extends QueryResultRow = any>(strings: TemplateStringsArray, ...values: any[]): Promise<{ rows: T[] }>;
}

// Enhance a client with `sql`
const enhanceClient = (client: PoolClient): ExtendedPoolClient => {
    const enhancedClient = client as ExtendedPoolClient;

    enhancedClient.sql = async <T extends QueryResultRow = any>(
        strings: TemplateStringsArray,
        ...values: any[]
    ): Promise<{ rows: T[] }> => {
        const queryText = strings.reduce((prev, curr, i) => prev + curr + (i < values.length ? `$${i + 1}` : ''), '');
        const result: QueryResult<T> = await enhancedClient.query(queryText, values);
        return { rows: result.rows }; // Ensure the response has a `.rows` property
    };

    return enhancedClient;
};

// Override `db.connect` to always return an enhanced client
const originalConnect = db.connect.bind(db);
db.connect = async function (): Promise<ExtendedPoolClient> {
    const client = await originalConnect();
    return enhanceClient(client);
};

// Create a top-level `sql` function similar to Vercel Postgres
export const sql = async <T extends QueryResultRow = any>(
    strings: TemplateStringsArray,
    ...values: any[]
): Promise<{ rows: T[] }> => {
    const queryText = strings.reduce(
        (prev, curr, i) => prev + curr + (i < values.length ? `$${i + 1}` : ''),
        ''
    );

    // Log the query text and values
    console.log('Executing SQL query:');
    console.log('Query:', queryText);
    console.log('Values:', values);

    try {
        // Track query execution time
        const start = Date.now();
        const result: QueryResult<T> = await db.query(queryText, values);
        const end = Date.now();

        console.log('Query executed in:', end - start, 'ms');
        console.log('Query result:', result.rows);

        return { rows: result.rows };
    } catch (error) {
        console.error('Error executing query:', error);
        throw new Error('Failed to execute SQL query.');
    }
};

// export const sql = async <T extends QueryResultRow = any>(
//     strings: TemplateStringsArray,
//     ...values: any[]
// ): Promise<{ rows: T[] }> => {
//     const queryText = strings.reduce((prev, curr, i) => prev + curr + (i < values.length ? `$${i + 1}` : ''), '');
//     const result: QueryResult<T> = await db.query(queryText, values);
//     return { rows: result.rows }; // Ensure this matches Vercel Postgres
// };

// Export the pool
export { db };
