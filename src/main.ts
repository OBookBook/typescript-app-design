import express from "express";
import morgan from "morgan"; // アクセスログを出力する
import "express-async-errors"; // 非同期エラーハンドリング
import path from "path";
import sassMiddleware from "node-sass-middleware";
import mysql from "mysql2/promise";

const EMPTY: number = 0;
const DARK: number = 1;
const LIGHT: number = 2;
const INITIAL_BOARD: Array<Array<number>> = [
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, DARK, LIGHT, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, LIGHT, DARK, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
];

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

// SQL: select * from games;
app.post("/api/games", async (req, res) => {
  const now = new Date();
  const connection = await mysql.createConnection({
    host: "localhost",
    database: "reversi",
    user: "reversi",
    password: "reversi",
  });

  try {
    await connection.beginTransaction();
    const gameInsertResult = await connection.execute<mysql.ResultSetHeader>(
      "insert into games (started_at) values (?)",
      [now]
    );

    const gameId = gameInsertResult[0].insertId;
    const turnInsertResult = await connection.execute<mysql.ResultSetHeader>(
      "insert into turns (game_id, turn_count, next_disc, end_at) values (?,?,?,?)",
      [gameId, 0, DARK, now]
    );

    const turnId = turnInsertResult[0].insertId;
    const squareCount = INITIAL_BOARD.map((line) => line.length).reduce(
      (v1, v2) => v1 + v2,
      0
    );

    const squaresInsertSql =
      `insert into squares (turn_id, x, y, disc) values ` +
      Array.from(Array(squareCount))
        .map(() => "(?,?,?,?)")
        .join(", ");

    const squaresInsertValues: any[] = [];
    INITIAL_BOARD.forEach((line, y) =>
      line.forEach((disc, x) => squaresInsertValues.push(turnId, x, y, disc))
    );

    await connection.execute(squaresInsertSql, squaresInsertValues);
    await connection.commit();
  } finally {
    await connection.end();
  }
  res.status(201).end();
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
