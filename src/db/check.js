import db from "./database.js";
console.log(db.prepare("SELECT name FROM sqlite_master WHERE type = 'table'").all());
console.log("-------------------------------------------------------------");
console.log(db.prepare("SELECT * FROM users").all());

console.log("-------------------------------------------------------------");
console.log(db.prepare("SELECT * FROM items").all());

console.log("-------------------------------------------------------------");
console.log(db.prepare("SELECT * FROM categories").all());

console.log("-------------------------------------------------------------");
console.log(db.prepare("SELECT * FROM colors").all());

console.log("-------------------------------------------------------------");
console.log(db.prepare("SELECT * FROM itemType").all());

console.log("-------------------------------------------------------------");
console.log(db.prepare("SELECT * FROM itemStatus").all());

console.log("-------------------------------------------------------------");
console.log(db.prepare("SELECT * FROM claimStatus").all());