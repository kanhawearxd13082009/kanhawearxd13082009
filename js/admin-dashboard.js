function convertDriveLinks(input){

if(!input) return "";

// split multiple links
return input.split(",").map(link => {

link = link.trim();

// extract FILE ID
const match = link.match(/\/d\/(.*?)\//);

if(match && match[1]){
return `https://lh3.googleusercontent.com/d/${match[1]}`;
}

// already correct format
if(link.includes("lh3.googleusercontent.com")){
return link;
}

// fallback
return link;

}).join(",");
}

async function addProduct(){

const product = {
id: "KW" + Date.now(),
title: document.getElementById("title").value,
price: document.getElementById("price").value,
description: document.getElementById("desc").value,
images: convertDriveLinks(document.getElementById("images").value),
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
document.getElementById("images").addEventListener("input", function(){

const val = this.value;
const converted = convertDriveLinks(val);

const first = converted.split(",")[0];

document.getElementById("previewImg").src = first;

});
