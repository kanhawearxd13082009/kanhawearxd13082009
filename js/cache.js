/*
FAST + SAFE CACHE SYSTEM
(no infinite loop)
*/

const CACHE_KEY = "kanha_products";

async function getCachedProducts(){

const cached = localStorage.getItem(CACHE_KEY);

// show instantly if cache exists
if(cached){
updateInBackground();
return JSON.parse(cached);
}

// first load
const data = await fetchProducts();
localStorage.setItem(CACHE_KEY, JSON.stringify(data));

return data;
}

/* BACKGROUND UPDATE (NO LOOP) */
async function updateInBackground(){
try{
const fresh = await fetchProducts();
localStorage.setItem(CACHE_KEY, JSON.stringify(fresh));
}catch(err){
console.warn("Background update failed");
}
}

/* FETCH */
async function fetchProducts(){

const res = await fetch("https://hgqnqagyoatwcfihrjni.supabase.co/functions/v1/products");

if(!res.ok){
throw new Error("API error");
}

return await res.json();
}