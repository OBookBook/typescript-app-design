import express from "express";
import morgan from "morgan"; // アクセスログを出力する
import "express-async-errors"; // 非同期エラーハンドリング
import path from "path";
import sassMiddleware from "node-sass-middleware";

const PORT = 3100;
const app = express();

app.use(morgan("dev"));

// SCSSミドルウェアの設定
app.use(
  sassMiddleware({
    src: path.join(__dirname, "../static"),
    dest: path.join(__dirname, "../static"),
    indentedSyntax: false, // trueの場合はsass、falseの場合はscss
    sourceMap: true,
    outputStyle: "compressed",
  })
);

// 静的ファイルの提供
app.use(express.static("static", { extensions: ["html"] }));

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
  console.log(`Server started at http://localhost:${PORT}`);
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
