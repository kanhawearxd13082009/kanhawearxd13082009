const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

async function loadProduct(){

const data = await getCachedProducts();

const product = data.find(p => String(p.id) === String(productId));

if(!product){
document.getElementById("productPage").innerHTML = "<h2>Product not found</h2>";
return;
}

// safe image split
const images = product.images
? product.images.split(",").map(i => i.trim())
: ["https://via.placeholder.com/300"];

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
function changeImage(index){
const allImages = document.querySelectorAll(".thumbs img");
const main = document.getElementById("mainImage");

main.src = allImages[index].src;
}

function goBack(){
window.history.back();
}

loadProduct();