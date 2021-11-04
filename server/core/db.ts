import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME || "clubhouse",
  process.env.DB_USER || "postgres",
  process.env.DB_PASSWORD || "5432",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

export { sequelize };
