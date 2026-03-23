let products = [];
let currentProduct = null;

/* GET PRODUCT ID */
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

/* LOAD PRODUCT */
async function loadProduct(){

const data = await getCachedProducts();
products = data;

// find product
const product = products.find(p => String(p.id) === String(productId));

if(!product){
document.getElementById("productPage").innerHTML = "<h2>Product not found</h2>";
return;
}

// save globally
currentProduct = product;

// images
const images = product.images
? product.images.split(",").map(i => i.trim())
: ["https://via.placeholder.com/300"];

// render UI
document.getElementById("productPage").innerHTML = `
<div class="product-container glass">

<div class="product-images">
<img src="${images[0]}" id="mainImage" class="main-img">

<div class="thumbs">
${images.map((img,i)=>`
<img src="${img}" onclick="changeImage(${i})">
`).join("")}
</div>
</div>

<div class="product-info">
<h2>${product.title}</h2>
<p class="price">₹${product.price}</p>
<p>${product.description}</p>

<button class="btn main-btn" onclick="openModal('${product.id}')">
Order Now
</button>
</div>

</div>
`;
}

/* CHANGE IMAGE */
function changeImage(index){
const allImages = document.querySelectorAll(".thumbs img");
const main = document.getElementById("mainImage");
main.src = allImages[index].src;
}

/* BACK */
function goBack(){
window.history.back();
}

/* OPEN MODAL */
function openModal(id){

currentProduct = products.find(p => String(p.id) === String(id));

if(!currentProduct){
alert("Product not found ❌");
return;
}

document.getElementById("orderModal").style.display = "flex";

// autofill saved data
document.getElementById("name").value = localStorage.getItem("kanha_name") || "";
document.getElementById("address").value = localStorage.getItem("kanha_address") || "";
}

/* CLOSE MODAL */
function closeModal(){
document.getElementById("orderModal").style.display = "none";
}

/* SEND ORDER (✅ FIXED) */
function sendOrder(){

if(!currentProduct){
alert("Product not found ❌");
return;
}

const name = document.getElementById("name").value;
const address = document.getElementById("address").value;
const qty = document.getElementById("qty").value;
const size = document.getElementById("size").value;

// save for next time
localStorage.setItem("kanha_name", name);
localStorage.setItem("kanha_address", address);

const img = currentProduct.images
? currentProduct.images.split(",")[0]
: "";

const productLink = `${window.location.origin}/product.html?id=${currentProduct.id}`;

/* ✅ PROFESSIONAL MESSAGE */
const message = `
🛍️ *KanhaWear Order Request*

Hello,

I would like to place an order with the following details:

━━━━━━━━━━━━━━━
📦 *Product Details*
━━━━━━━━━━━━━━━
🔖 Item Code: ${currentProduct.id}
🧥 Product Name: ${currentProduct.title}
💰 Price: ₹${currentProduct.price}

━━━━━━━━━━━━━━━
👤 *Customer Details*
━━━━━━━━━━━━━━━
👤 Name: ${name}
📍 Address: ${address}

━━━━━━━━━━━━━━━
📋 *Order Details*
━━━━━━━━━━━━━━━
🔢 Quantity: ${qty}
📏 Size (Kanha ji): ${size}

━━━━━━━━━━━━━━━
🖼 *Product Preview*
━━━━━━━━━━━━━━━
${img}

🔗 *Product Link*
${productLink}

━━━━━━━━━━━━━━━
⏱ *Order Time*
━━━━━━━━━━━━━━━
${new Date().toLocaleString()}

Thank you 🙏
`;

const encoded = encodeURIComponent(message);

window.open(`https://wa.me/916353373418?text=${encoded}`, "_blank");

closeModal();
}

/* INIT */
loadProduct();
