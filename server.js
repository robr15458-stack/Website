const express = require("express");
const multer = require("multer");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.static("public"));

const uploadDir = path.join(__dirname, "public/uploads");

// ensure folder exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

app.post("/upload", upload.array("images"), (req, res) => {
  res.json({ success: true });
});

app.get("/images", (req, res) => {
  const files = fs.readdirSync(uploadDir);
  res.json(files.map(f => "/uploads/" + f));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Running on " + PORT));
