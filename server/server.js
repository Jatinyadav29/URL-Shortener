import "dotenv/config";
import app from "./src/app.js";
import config from "./src/config/config.js";
import connectDB from "./src/config/db.js";

const port = config.PORT;

await connectDB();

app.listen(port, () => {
  console.log("Server is running");
});
