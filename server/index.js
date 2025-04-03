import express from "express";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "..")));

app.use((req, res, next) => {
  if (req.headers.upgrade) {
    res.status(400).send("Protocol upgrade not supported.");
    return;
  }
  next();
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./index.html"));
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Servidor funcionando en http://0.0.0.0:${port} - http://localhost:${port}
    ${(__dirname, __filename)}`);
});
