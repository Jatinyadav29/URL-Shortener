import express from "express";
import appRoute from "./routes/url.router.js";
import urlRoute from "./routes/redirect.route.js";

const app = express();
app.use(express.json());

app.use("/api/url", appRoute);
app.use("/api", urlRoute);

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Hello this is URL shortener!",
  });
});

export default app;
