import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import router from "./routes";
import path from "path";

import token_validation from "./middleware/token_validation.middleware";
import exclude_route from "./middleware/exclude_route.middleware";
import ApiError from "./services/ApiError";

var corsOptions = {
  origin: "http://example.com",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const app = express();

app.use(cors<Request>());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "build")));

// for exclude [files/:id] [GET] route
// For Production - Uncomment
app.use(exclude_route(token_validation));

app.use("/api", router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  let statusCode = 500;
  if (err instanceof ApiError) statusCode = err.statusCode;
  console.error(err);
  res.status(statusCode).json({ error: err.message });
});

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(3000, () => console.log("REST API server ready at: http://localhost:3000"));
