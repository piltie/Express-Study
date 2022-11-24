import { Sequelize } from "sequelize"
import config from "config"

const dbUri = config.get<string>("dbUri");
export const database = new Sequelize(dbUri, {dialect: 'postgres'});

export default async function connect() {
  try {
    await database.sync();
    await database.authenticate();
    
    console.log("Connected to the database.")
  } catch (error: any) {
    console.error('An error occurred while trying to connect to the database:', error);
  }
}
