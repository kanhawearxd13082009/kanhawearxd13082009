async function addProduct(){

const product = {
id: "KW" + Date.now(),
title: document.getElementById("title").value,
price: document.getElementById("price").value,
description: document.getElementById("desc").value,
images: document.getElementById("images").value,
category: document.getElementById("category").value,
tags: "",
visible: document.getElementById("visible").value,
season: document.getElementById("season").value
};

try{

const res = await fetch("https://hgqnqagyoatwcfihrjni.supabase.co/functions/v1/add-product", {
method: "POST",
headers: {
"Content-Type": "application/json",
"x-admin": "kanha-secret"
},
body: JSON.stringify(product)
});

const data = await res.json();

if(data.success){
alert("✅ Product added successfully");

document.getElementById("title").value = "";
document.getElementById("price").value = "";
document.getElementById("desc").value = "";
document.getElementById("images").value = "";

}else{
alert("❌ Failed");
}

}catch(err){
alert("Error");
}
}

function logout(){
localStorage.clear();
window.location.replace("admin-login.html");
}