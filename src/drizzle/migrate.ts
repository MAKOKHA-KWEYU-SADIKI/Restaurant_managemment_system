import "dotenv/config";
import{migrate} from "drizzle-orm/node-postgres/migrator";
import db, {client} from "./db";
async function migration(){
    console.log("_______BEGINING OF MIGRATION_______")
    await migrate(db,{migrationsFolder: __dirname + "/migrations"})
    await client.end()
    console.log("_______END OF MIGRATION_______")
    process.exit(0)
}
migration().catch((errorr)=>{
    console.log(errorr)
    process.exit(0)
})