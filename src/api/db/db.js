import mysql2 from "mysql2/promise";
import environments from "../config/environments.js";

const connection = mysql2.createPool({
  host: environments.db.host,
  database: environments.db.name,
  user: environments.db.user,
  password: environments.db.password
});

export default connection;