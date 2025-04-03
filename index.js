const params = {
  keyAPI: "0391f07dfbac4aefb7f1a739eb04e899",
  pageSize: 21,
  q: "keywords",
};

async function getData(params) {
  if (params.q.trim() === "") return; // Evita consultas vacías
  
  const url = `https://newsapi.org/v2/everything?q=${params.q}&apiKey=${params.keyAPI}&pageSize=${params.pageSize}`;
  let articles = {};
  console.log("Cargando datos...");

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0", // Simula un navegador
        "Accept": "application/json"
      }
    });

    if (!response.ok) throw new Error(`Response status: ${response.status}`);
    const data = await response.json();
    articles = data.articles;

    if (articles.length !== 0) { // Corregido "lenght"
      createNewsDiv(articles);
    }
  } catch (err) {
    console.error("Error:", err.message);
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
        <img src="${el.urlToImage || "default.jpg"}" alt="${el.author || "Desconocido"}">
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