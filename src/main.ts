import express from "express";

const PORT = 3100;
const app = express();

app.get("/api/hello", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
