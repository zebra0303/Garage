import faunadb, { query as q } from "faunadb";
console.log(process.env);
const client = new faunadb.Client({ secret: process.env.REACT_APP_DB_KEY });

export { q, client }