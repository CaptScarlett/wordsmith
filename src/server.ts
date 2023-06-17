import express from "express";
import routes from "./routes";
import morgan from "morgan";
import cors from "cors";
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, _res, next) => {
  setTimeout(() => {
    next(new Error("hello"));
  }, 1);
});

app.use("/api", routes);

app.use((err, _req, res, _next) => {
  console.log(err);
  res.json({ message: `had an error: ${err.message}` });
});

export default app;
