import express from "express";
import morgan from "morgan"; // アクセスログを出力する

const PORT = 3100;
const app = express();

app.use(morgan("dev"));

app.get("/api/hello", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

// @comand: npx ts-node src/main.ts
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
