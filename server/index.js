import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import path from "path";

const app = express();
const port = process.env.PORT || 3000; // Render usa `PORT`

app.use(cors());
app.use(express.json());

// 📌 Servir archivos estáticos (si tienes frontend)
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname))); // Cambia "public" por la carpeta donde esté tu frontend

// 📌 Rutas del servidor normal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// 📌 Proxy para la API de noticias
app.get("/news", async (req, res) => {
  const apiKey = "0391f07dfbac4aefb7f1a739eb04e899";
  const query = req.query.q || "keywords";

  const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}&pageSize=21`;

  try {
    const response = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo noticias" });
  }
});

// 📌 Iniciar el servidor
app.listen(port, () => console.log(`Servidor en http://localhost:${port}`));
