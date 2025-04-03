const params = {
  pageSize: 21,
  q: "keywords",
};

async function getData(params) {
  const SERVER_URL = "https://news-portal-70oh.onrender.com/";
  const url = `${SERVER_URL}news?q=${params.q}`;

  console.log("Cargando datos...");
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    const data = await response.json();

    console.log("Datos recibidos:", data);

    if (data.articles && data.articles.length > 0) {
      createNewsDiv(data.articles);
    } else {
      console.log("No hay artículos disponibles.");
    }
  } catch (err) {
    console.error("Error al obtener datos:", err.message);
  }
}

const createNewsDiv = (articles) => {
  const $divNews = document.querySelector(".noticias");
  $divNews.innerHTML = "";

  articles.forEach((el, i) => {
    const div = document.createElement("div");
    div.setAttribute("id", i);
    div.innerHTML = `
      <a href="${el.url}" target="_blank">
        <h2 class="title">${el.title}</h2>
        <img src="${el.urlToImage || "default.jpg"}" alt="${
      el.author || "Desconocido"
    }">
        <p>${el.description || "Sin descripción"}</p>
      </a>
    `;
    $divNews.appendChild(div);
  });
};

const $input = document.querySelector("input"),
  $btnSearch = document.querySelector(".submit-search");

const searchNews = () => {
  params.q = $input.value.trim();
  if (params.q === "") return;
  getData(params);
};

$btnSearch.addEventListener("click", searchNews);
$input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") searchNews();
});

// Cargar noticias por defecto
getData(params);
