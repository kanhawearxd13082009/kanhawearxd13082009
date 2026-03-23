let products = [];
let filtered = [];
let currentPage = 1;
let selectedCategory = "all";
let selectedSeason = "all";
const perPage = 15;
let currentProduct = null;

/* LOAD PRODUCTS */
async function loadProducts(){

const loader = document.getElementById("loader");

if(loader){
loader.style.display = "flex";
loader.style.opacity = "1";
}

try{

const data = await getCachedProducts();

products = data.filter(p => p.visible === "yes");

products.sort((a,b)=> new Date(b.created_at) - new Date(a.created_at));

filtered = products;

const savedPage = Number(localStorage.getItem("current_page")) || 1;

renderPage(savedPage);

// restore scroll
const scroll = localStorage.getItem("scroll_position");
if(scroll){
setTimeout(() => window.scrollTo(0, scroll), 100);
}

}catch(err){

console.error("Load failed", err);

const container = document.getElementById("products");
if(container){
container.innerHTML = "<p style='text-align:center;'>⚠️ Failed to load products</p>";
}
}

/* ALWAYS HIDE LOADER */
setTimeout(()=>{
if(loader){
loader.style.opacity = "0";
setTimeout(()=> loader.style.display = "none", 300);
}
}, 300);

}

/* FILTER CATEGORY */
function filterCategory(cat, btn){

selectedCategory = cat;

document.querySelectorAll(".filters")[0]
?.querySelectorAll(".filter-btn")
.forEach(b => b.classList.remove("active"));

btn.classList.add("active");

updateFilters();
}

/* FILTER SEASON */
function filterSeason(season, btn){

selectedSeason = season;

document.querySelectorAll(".filters")[1]
?.querySelectorAll(".filter-btn")
.forEach(b => b.classList.remove("active"));

btn.classList.add("active");

updateFilters();
}

/* SEARCH */
function searchProducts(){
updateFilters();
}

/* MAIN FILTER SYSTEM */
function updateFilters(){

const query = document.getElementById("searchInput")?.value.toLowerCase().trim() || "";

filtered = products.filter(p => {

const matchCategory =
selectedCategory === "all" || p.category === selectedCategory;

const matchSeason =
selectedSeason === "all" || p.season === selectedSeason;

// SAFE TITLE
const title = (p.title || "").toLowerCase();

// SAFE PRICE
const price = String(p.price || "");

// ✅ SAFE TAG HANDLING
const tagsArray = (p.tags || "")
.toLowerCase()
.split(",")
.map(tag => tag.trim())
.filter(tag => tag !== "");

// TAG MATCH
const matchTags = tagsArray.some(tag => tag.includes(query));

// FINAL SEARCH MATCH
const matchSearch =
title.includes(query) ||
price.includes(query) ||
matchTags;

return matchCategory && matchSeason && matchSearch;

});

renderPage(1);
}

/* RENDER PRODUCTS */
function renderProducts(list){

const container = document.getElementById("products");
if(!container) return;

container.innerHTML = "";

list.forEach(p => {

const img = (p.images && p.images.trim() !== "")
? p.images.split(",")[0]
: "https://via.placeholder.com/300";

container.innerHTML += `
<div class="card glass">
<img loading="lazy" src="${img}" 
onerror="this.src='https://via.placeholder.com/300'" 
onclick="openProduct('${p.id}')">

<h3 title="${p.title}">${p.title}</h3>
<p>₹${p.price}</p>

<button class="btn glass-btn" onclick="openModal('${p.id}')">
Order Now
</button>
</div>
`;

});
}

/* PAGINATION */
function renderPage(page){

localStorage.setItem("current_page", page);

currentPage = page;

const start = (page-1)*perPage;
const end = start + perPage;

const pageData = filtered.slice(start,end);

renderProducts(pageData);
renderPagination();
}

function renderPagination(){

const totalPages = Math.ceil(filtered.length / perPage);

const container = document.getElementById("pagination");
if(!container) return;

container.innerHTML = "";

for(let i=1;i<=totalPages;i++){
container.innerHTML += `<button onclick="renderPage(${i})">${i}</button>`;
}
}

/* SCROLL SAVE */
window.addEventListener("scroll", () => {
localStorage.setItem("scroll_position", window.scrollY);
});

/* OPEN PRODUCT PAGE */
function openProduct(id){
location.href = `product.html?id=${id}`;
}

/* MODAL */
function openModal(id){

currentProduct = filtered.find(p => String(p.id) === String(id));

if(!currentProduct){
alert("Product not found");
return;
}

const modal = document.getElementById("orderModal");
if(modal) modal.style.display = "flex";

document.getElementById("name").value = localStorage.getItem("kanha_name") || "";
document.getElementById("address").value = localStorage.getItem("kanha_address") || "";
}

function closeModal(){
const modal = document.getElementById("orderModal");
if(modal) modal.style.display = "none";
}

function customDesign(){
const msg = encodeURIComponent("Hello, I want a custom design for KanhaWear.");
window.open(`https://wa.me/916353373418?text=${msg}`, "_blank");
}

/* ORDER */
function sendOrder(){

if(!currentProduct){
alert("Product not found ❌");
return;
}

const name = document.getElementById("name").value.trim();
const address = document.getElementById("address").value.trim();
const qty = document.getElementById("qty").value.trim();
const size = document.getElementById("size").value.trim();

// save for next time
localStorage.setItem("kanha_name", name);
localStorage.setItem("kanha_address", address);

const img = currentProduct.images
? currentProduct.images.split(",")[0]
: "";

const productLink = `${window.location.origin}/product.html?id=${currentProduct.id}`;

/* ✅ CLEAN MESSAGE (NO WEIRD FORMAT) */
const message =
"🛍️ *KanhaWear Order Request*\n\n" +

"Hello,\n\n" +

"I would like to place an order with the following details:\n\n" +

"━━━━━━━━━━━━━━━\n" +
"📦 *Product Details*\n" +
"━━━━━━━━━━━━━━━\n" +
"🔖 Item Code: " + currentProduct.id + "\n" +
"🧥 Product Name: " + currentProduct.title + "\n" +
"💰 Price: ₹" + currentProduct.price + "\n\n" +

"━━━━━━━━━━━━━━━\n" +
"👤 *Customer Details*\n" +
"━━━━━━━━━━━━━━━\n" +
"👤 Name: " + name + "\n" +
"📍 Address: " + address + "\n\n" +

"━━━━━━━━━━━━━━━\n" +
"📋 *Order Details*\n" +
"━━━━━━━━━━━━━━━\n" +
"🔢 Quantity: " + qty + "\n" +
"📏 Size (Kanha ji): " + size + "\n\n" +

"━━━━━━━━━━━━━━━\n" +
"🖼 *Product Preview*\n" +
"━━━━━━━━━━━━━━━\n" +
img + "\n\n" +

"🔗 *Product Link*\n" +
productLink + "\n\n" +

"━━━━━━━━━━━━━━━\n" +
"⏱ *Order Time*\n" +
"━━━━━━━━━━━━━━━\n" +
new Date().toLocaleString() + "\n\n" +

"Thank you 🙏";

const encoded = encodeURIComponent(message);

window.open(`https://wa.me/916353373418?text=${encoded}`, "_blank");

closeModal();
}

/* INIT */
document.addEventListener("DOMContentLoaded", () => {

if(!document.getElementById("products")) return;

// initial load
loadProducts();

// auto refresh
setInterval(async () => {

try{

const res = await fetch("https://hgqnqagyoatwcfihrjni.supabase.co/functions/v1/products");
const data = await res.json();

products = data.filter(p => p.visible === "yes");

products.sort((a,b)=> new Date(b.created_at) - new Date(a.created_at));

updateFilters();

}catch(err){
console.warn("Auto refresh failed");
}

}, 5000);

});
