import { User } from "src/users/entities/user.entity";

module.exports = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "3880029",
    database: "NestApp",
    entities: [User],
    migrations: ["src/migrations"],
    migrationsTableName: "migrations"
  };