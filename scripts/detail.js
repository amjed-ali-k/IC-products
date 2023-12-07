import {
  productID,
  API_HEADER_URL,
  API_DETAILS_URL,
  fetchData,
} from "./common.js";

// Selectors
const productContainer = document.querySelector("#product-details");
const logoEl = document.getElementById("logo");
const footerEl = document.getElementById("footer");

const renderProductDetails = (data) => {
  productContainer.innerHTML = "";

  const productImg = document.createElement("img");
  productImg.src = data.img;
  productImg.alt = "product img";

  // general div
  const productCard = document.createElement("div");
  productCard.classList.add("product-card");

  const productTitle = document.createElement("h2");
  productTitle.textContent = data.title;

  // just for long desc. => innerHTML
  const productDesc = document.createElement("div");
  productDesc.innerHTML = data.desc;

  const productPrice = document.createElement("span");
  productPrice.textContent = data.price;

  const productNumber = document.createElement("span");
  productNumber.textContent = data.item_num;

  const productShipping = document.createElement("span");
  productShipping.textContent = data.shipping;

  // Append elements to productCard
  productCard.appendChild(productImg);
  productCard.appendChild(productNumber);
  productCard.appendChild(productTitle);
  productCard.appendChild(productDesc);
  productCard.appendChild(productPrice);
  productCard.appendChild(productShipping);

  // Append productCard to productContainer
  productContainer.appendChild(productCard);
};

// load product-details
const loadDetails = async (page) => {
  try {
    const result = await fetchData(API_DETAILS_URL);
    const details = result.data;

    if (details) {
      console.log("details=", details);
      renderProductDetails(details);
    } else {
      console.error("Error loading details: Data is undefined");
    }
  } catch (error) {
    console.error("Error loading details:", error);
  }
};

// Load header data
const loadHeader = async () => {
  const data = await fetchData(API_HEADER_URL);
  logoEl.src = data.logo;
  footerEl.textContent = data.footer;
};

// Initial load
loadHeader();
loadDetails(0);
