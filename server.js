const express = require("express");
const multer = require("multer");
const fs = require("fs");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.static("public"));

const upload = multer({ dest: "public/uploads/" });

app.post("/upload", upload.array("images"), (req, res) => {
  res.sendStatus(200);
});

app.get("/images", (req, res) => {
  const files = fs.readdirSync("public/uploads");
  const urls = files.map(f => "/uploads/" + f);
  res.json(urls);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));
