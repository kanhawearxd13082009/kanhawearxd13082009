async function login(){

const user = document.getElementById("username").value;
const pass = document.getElementById("password").value;

try{

const res = await fetch("https://hgqnqagyoatwcfihrjni.supabase.co/functions/v1/admin-login", {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({
username: user,
password: pass
})
});

const data = await res.json();

if(data.success){
localStorage.setItem("admin","true");
window.location.href = "admin-dashboard.html";
}else{
alert("Invalid credentials");
}

}catch(err){
console.error(err);
alert("Error connecting to server");
}

}