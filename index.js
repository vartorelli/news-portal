const params = {
  keyAPI: "0391f07dfbac4aefb7f1a739eb04e899",
  pageSize: 21,
  q: "keywords",
};

async function getData(params) {
  const url = `https://newsapi.org/v2/everything?q=${params.q}&apiKey=${params.keyAPI}&pageSize=${params.pageSize}`;
  let articles = {};
  console.log(params);
  console.log("cargando datos");
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Response status: ${response.status}`);
    const data = await response.json();
    articles = data.articles;
    if (articles.lenght !== 0) {
      createNewsDiv(articles);
    }
  } catch (err) {
    console.error(err.message);
  }
}

const createNewsDiv = (articles) => {
  const $divNews = document.querySelector(".noticias");
  $divNews.innerHTML = "";
  for (let i = 0; i < articles.length; i++) {
    const el = articles[i];
    const div = document.createElement("div");
    div.setAttribute("id", i);
    div.innerHTML = `<a href="${el.url}"><h2 class="title">${el.title}</h2><img src="${el.urlToImage}" alt="${el.author}"><p>${el.description}</p></a>`;
    $divNews.insertAdjacentElement("beforeend", div);
  }
};

const textToSearch = new String();

const $input = document.querySelector("input"),
  $btnSearch = document.querySelector(".submit-search");

$btnSearch.addEventListener("click", (e) => {
  if (e.target === $btnSearch) {
    params.q = $input.value;
    console.log("Click");
    console.log($input.value);
    console.log(params.q);
    getData(params)
  }
});

$input.addEventListener("keypress", (e) => {
  
  if (e.key === "Enter") {
    params.q = $input.value;
    console.log("Enter");
    console.log($input.value);
    console.log(params.q);
    getData(params)
  }
});

getData(params);
