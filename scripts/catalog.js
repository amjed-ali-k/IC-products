import {
  currentPage,
  API_HEADER_URL,
  API_PRODUCTS_URL,
  fetchData,
} from "./common.js";

// Selectors
const productContainer = document.querySelector("#products");
const logoEl = document.getElementById("logo");
const footerEl = document.getElementById("footer");
const titleEl = document.getElementById("title");

// Render product list
const renderProductList = (data) => {
  productContainer.innerHTML = "";

  data.forEach((item) => {
    // Create img element
    const productImg = document.createElement("img");
    productImg.src = item.img;
    productImg.alt = "product img";

    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    // click event for eah product card
    productCard.addEventListener("click", () => {
      window.location.href = `/productDetail.html?id=${item.id}`;
    });

    const productTitle = document.createElement("h2");
    productTitle.textContent = item.title;

    const productDesc = document.createElement("div");
    productDesc.classList.add("desc-box");
    productDesc.textContent = item.short_desc;

    // just for long desc. => innerHTML

    const productPrice = document.createElement("span");
    productPrice.textContent = item.price;

    // Append elements to productCard
    productCard.appendChild(productImg);
    productCard.appendChild(productTitle);
    productCard.appendChild(productDesc);
    productCard.appendChild(productPrice);

    // Append productCard to productContainer
    productContainer.appendChild(productCard);
  });
};

// Render pagination
const renderPaginate = (pagination) => {
  const pageNumber = pagination.last_page;
  const paginationContainer = document.getElementById("pagination");

  for (let i = 1; i <= pageNumber; i++) {
    const pageNumberLink = document.createElement("a");
    pageNumberLink.classList.add("pagination-link");

    if (i == currentPage) {
      pageNumberLink.classList.add("active");
    } else {
      pageNumberLink.href = `/productCatalog.html?page=${i}`;
    }

    paginationContainer.appendChild(pageNumberLink);
  }
};

// Load product data
const loadProduct = async (page) => {
  const result = await fetchData(API_PRODUCTS_URL);
  const products = result.data;
  renderProductList(products);

  const pagination = result.pagination;
  renderPaginate(pagination);
};

// Load header data
const loadHeader = async () => {
  const data = await fetchData(API_HEADER_URL);
  logoEl.src = data.logo;
  footerEl.textContent = data.footer;
  titleEl.textContent = data.title;
};

// Initial load
loadProduct(0);
loadHeader();
