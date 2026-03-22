// Disable right click
document.addEventListener("contextmenu", e => e.preventDefault());

// Disable keyboard shortcuts
document.addEventListener("keydown", function(e){

// F12
if(e.key === "F12"){
e.preventDefault();
}

// Ctrl+U (view source)
if(e.ctrlKey && e.key.toLowerCase() === "u"){
e.preventDefault();
}

// Ctrl+Shift+I (inspect)
if(e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "i"){
e.preventDefault();
}

// Ctrl+C (copy)
if(e.ctrlKey && e.key.toLowerCase() === "c"){
e.preventDefault();
}

// Ctrl+V (paste)
if(e.ctrlKey && e.key.toLowerCase() === "v"){
e.preventDefault();
}

// Ctrl+S (save page) 🔥 NEW
if(e.ctrlKey && e.key.toLowerCase() === "s"){
e.preventDefault();
}

});