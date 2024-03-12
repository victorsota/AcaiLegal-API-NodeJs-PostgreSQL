import express, { Request, Response, NextFunction } from "express";
import "dotenv/config";
import path from "path";

import { router } from "./routes";

const app = express();
app.use(express.json());

app.use(router);

app.use("/files", express.static(path.resolve(__dirname, "..", "tmp")));

// Middleware que intercepta os erros
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    console.error(err.message);
    return res.status(400).json({
      error: err.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

app.listen(3333, () => {
  console.log("Servidor rodando na porta 3333...");
});
