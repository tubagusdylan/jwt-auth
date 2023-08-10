import { Sequelize } from "sequelize";

export const db = new Sequelize("auth_jwt_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
});
