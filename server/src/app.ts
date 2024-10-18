import { join } from "path";
import dotenv from "dotenv";
import express, { Request, Response, Application } from "express";
import cookieParser from "cookie-parser";
import compression from "compression";
import router from "./routes";

// Initialize dotenv to load environment variables
dotenv.config();

const app: Application = express();
app.set("port", process.env.PORT || 8070);

// Middleware setup
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ limit: "15mb", extended: false }));
app.use(cookieParser());
app.use(compression());

// API routes
app.use("/api/v1", router);

// Disable 'x-powered-by' header for security
app.disable("x-powered-by");

const {
  env: { NODE_ENV },
} = process;

// Serve static files in production
if (NODE_ENV === "production") {
  app.use(express.static(join(__dirname, "..", "..", "client", "build")));
  app.get("*", (req: Request, res: Response) => {
    res.sendFile(join(__dirname, "..", "..", "client", "build", "index.html"));
  });
}

export default app;
