import { Client } from "pg";

const client = new Client({
  host: "localhost",
  port: 5432,
  database: "movies",
  user: "Pedro",
  password: "1234",
});

const connectDatabase = async () => {
  await client.connect();
  console.log("Database connected.");
};

export { connectDatabase, client };
