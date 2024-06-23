import { Client, types } from "pg";

// https://github.com/brianc/node-postgres/issues/811#issuecomment-488374261
types.setTypeParser(1700, function (val) {
  return parseFloat(val);
});
types.setTypeParser(20, function (val) {
  return parseInt(val);
});

const client = new Client({
  user: "staycation",
  host: "localhost",
  database: "staycation",
  password: "password",
  port: 5432,
});
client.connect();

export default client;
