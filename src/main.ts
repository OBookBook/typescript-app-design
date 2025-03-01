import express from "express";
import morgan from "morgan"; // アクセスログを出力する
import "express-async-errors"; // 非同期エラーハンドリング

const PORT = 3100;
const app = express();

app.use(morgan("dev"));

app.use(express.static("public", { extensions: ["html"] }));

app.get("/api/hello", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

app.get("/api/error", async (req, res) => {
  throw new Error("Error endpoint");
});

app.use(errorHandler);

// @comand: npx ts-node src/main.ts
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

function errorHandler(
  err: any,
  _req: express.Request,
  res: express.Response,
  _next: express.NextFunction
): void {
  console.log("Unexpected error occurred", err);
  res.status(500).send({
    message: "Unexpected error occurred",
  });
}
